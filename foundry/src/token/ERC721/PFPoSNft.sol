// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./IPFPoSNft.sol";

contract PFPoSNft is ERC721, IPFPoSNft {
    string private _name;
    string private _symbol;

    string private _baseURI;

    uint256 private _maxSupply;

    uint256 private _stakeAmount;
    uint256 private _stakeDuration;
    address private _stakeToken;

    mapping(uint256 => uint256) private _timestamps;

    constructor() public ERC721("", "") { }

    function initialize(
        string memory name,
        string memory symbol,
        string memory baseUri,
        uint256 maxSupply,
        uint256 stakeAmount,
        uint256 stakeDuration,
        address stakeToken
    ) external override {
        require(_stakeToken == address(0));

        _name = name;
        _symbol = symbol;
        _baseURI = baseUri;

        _maxSupply = maxSupply;

        _stakeAmount = stakeAmount;
        _stakeDuration = stakeDuration;
        _stakeToken = stakeToken;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function baseURI() public view override returns (string memory) {
        return _baseURI;
    }

    function maxSupply() external view override returns (uint256) {
        return _maxSupply;
    }

    function stakeAmount() external view override returns (uint256) {
        return _stakeAmount;
    }

    function stakeDuration() external view override returns (uint256) {
        return _stakeDuration;
    }

    function stakeToken() external view override returns (address) {
        return _stakeToken;
    }

    function stake() external override returns (uint256 tokenId) {
        IERC20(_stakeToken).transferFrom(msg.sender, address(this), _stakeAmount);

        tokenId = totalSupply() + 1;
        require(tokenId <= _maxSupply);

        _timestamps[tokenId] = block.timestamp;
        _safeMint(msg.sender, tokenId);
    }

    function unstake(uint256 tokenId) external override {
        require(_timestamps[tokenId] != 0);
        require(block.timestamp - _timestamps[tokenId] >= _stakeDuration);

        _timestamps[tokenId] = 0;

        IERC20(_stakeToken).transfer(ownerOf(tokenId), _stakeAmount);
    }
}
