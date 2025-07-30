// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {
    uint public count;

    function getCount() public view returns (uint) {
        return count;
    }

    function increment() public {
        count++;
    }

    function decrement() public {
        require(count > 0, "Count is already zero");
        count--;
    }
}
