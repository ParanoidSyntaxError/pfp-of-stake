// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface IPFPoSToken {
    function initialize(
        string memory name,
        string memory symbol,
        uint256 reserveRatio
    ) external;

    function calculateCurvedMint(
        uint256 ethAmount
    ) external view returns (uint256 tokenOut);

    function calculateCurvedBurn(
        uint256 tokenAmount
    ) external view returns (uint256 ethOut);

    function mint(address receiver) external payable returns (uint256 tokenOut);
    function burn(
        address receiver,
        uint256 tokenAmount
    ) external returns (uint256 ethOut);
}
