pragma solidity ^0.4.24;

import './IStorage.sol';

contract Storage is IStorage {

    mapping(address=>RecordState) public states;

    constructor() public {
    }

    function setState(address user, RecordState newState) public {
        states[user] = newState;
    }
}