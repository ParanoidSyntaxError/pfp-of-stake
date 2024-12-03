// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/proxy/Clones.sol";

import "./token/ERC20/PFPoSToken.sol";
import "./token/ERC20/IPFPoSToken.sol";

import "./token/ERC721/PFPoSNft.sol";
import "./token/ERC721/IPFPoSNft.sol";

import "./IPFPoSFactory.sol";

contract PFPoSFactory is IPFPoSFactory {
    address pfposToken;
    address pfposNft;

    constructor() public {
        pfposToken = address(new PFPoSToken());
        pfposNft = address(new PFPoSNft());
    }

    function deploy(
        string memory name,
        string memory symbol,
        string memory baseUri,
        uint256 maxSupply
    ) external override returns (address token, address nft) {
        token = Clones.clone(pfposToken);
        IPFPoSToken(token).initialize(name, symbol, 200_000);

        nft = Clones.clone(pfposNft);
        IPFPoSNft(nft).initialize(
            name,
            symbol,
            baseUri,
            maxSupply,
            1_000 * (10 ** 18), // Stake amount
            31_536_000, // Stake duration (1 year)
            token
        );
    }
}
