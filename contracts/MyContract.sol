// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyContract {
    uint256 public value;

    function set(uint256 _val) public {
        value = _val;
    }

    function get() public view returns (uint256) {
        return value;
    }
}
