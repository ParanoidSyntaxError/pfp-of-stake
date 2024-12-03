// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "../../math/BancorFormula.sol";

import "./IPFPoSToken.sol";

contract PFPoSToken is BancorFormula, ERC20, IPFPoSToken {
    using SafeMath for uint256;

    string private _name;
    string private _symbol;

    uint256 private _reserveRatio;
    uint256 private _reserveBalance;

    constructor() public ERC20("", "") {}

    function initialize(
        string memory name,
        string memory symbol,
        uint256 reserveRatio
    ) external override {
        require(_reserveRatio == 0);

        _name = name;
        _symbol = symbol;

        _reserveRatio = reserveRatio;
        _reserveBalance = 10 ** 18;
        _mint(address(this), _reserveBalance);
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function calculateCurvedMint(
        uint256 ethAmount
    ) public view override returns (uint256) {
        return
            purchaseTargetAmount(
                totalSupply(),
                _reserveBalance,
                uint32(_reserveRatio),
                ethAmount
            );
    }

    function calculateCurvedBurn(
        uint256 tokenAmount
    ) public view override returns (uint256) {
        return
            saleTargetAmount(
                totalSupply(),
                _reserveBalance,
                uint32(_reserveRatio),
                tokenAmount
            );
    }

    function mint(
        address receiver
    ) public payable override returns (uint256 tokenOut) {
        require(msg.value > 0, "Amount must be non-zero!");

        tokenOut = calculateCurvedMint(msg.value);
        _mint(receiver, tokenOut);

        _reserveBalance = _reserveBalance.add(msg.value);
    }

    function burn(
        address receiver,
        uint256 tokenAmount
    ) public override returns (uint256 ethOut) {
        require(tokenAmount > 0, "Amount must be non-zero!");
        require(
            balanceOf(msg.sender) >= tokenAmount,
            "Sender does not have enough tokens to burn."
        );

        ethOut = calculateCurvedBurn(tokenAmount);
        _reserveBalance = _reserveBalance.sub(ethOut);

        _burn(receiver, tokenAmount);

        payable(receiver).transfer(ethOut);
    }
}
