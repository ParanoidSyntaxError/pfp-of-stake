// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

import "forge-std/Test.sol";

import "src/PFPoSFactory.sol";

contract TestPFPoSFactory is Test {
    PFPoSFactory pfposFactory;

    function setUp() public {
        pfposFactory = new PFPoSFactory();
    }

    function testDeploy() public {
        pfposFactory.deploy("NAME", "SYMBOL", "BASE URI", 10_000);
    }
}