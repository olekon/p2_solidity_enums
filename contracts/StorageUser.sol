pragma solidity ^0.4.24;

import './IStorage.sol';

contract StorageUser {

    IStorage public recordStorage;

    constructor(IStorage _recordStorage) public {
        recordStorage = _recordStorage;
    }

    function changeStateA() external {
        recordStorage.setState(msg.sender, IStorage.RecordState.StateA);
    }

    function changeStateB() external {
        recordStorage.setState(msg.sender, IStorage.RecordState.StateB);
    }

    //uncomment this method to use 'updated version' of contract
    // function changeStateC() external {
    //     recordStorage.setState(msg.sender, IStorage.RecordState.StateC);
    // }
}