// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface IPFPoSNft {
    function initialize(
        string memory name,
        string memory symbol,
        string memory baseUri,
        uint256 maxSupply,
        uint256 stakeAmount,
        uint256 stakeDuration,
        address stakeToken
    ) external;

    function maxSupply() external view returns (uint256);

    function stakeAmount() external view returns (uint256);
    function stakeDuration() external view returns (uint256);
    function stakeToken() external view returns (address);

    function stake() external returns (uint256 tokenId);
    function unstake(uint256 tokenId) external;
}
