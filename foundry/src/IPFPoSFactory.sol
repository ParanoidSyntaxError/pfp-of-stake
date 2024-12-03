// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface IPFPoSFactory {
    function deploy(
        string memory name,
        string memory symbol,
        string memory baseUri,
        uint256 maxSupply
    ) external returns (address token, address nft);
}