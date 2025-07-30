// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict actions to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Deposit function to receive Ether
    receive() external payable {}

    // Public fallback to accept Ether with no data
    fallback() external payable {}

    // Check contract balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Transfer Ether to another address
    function transfer(address payable _to, uint _amount) public onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");
        _to.transfer(_amount);
    }

    // Withdraw all Ether to owner's address
    function withdrawAll() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Change ownership (optional)
    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
