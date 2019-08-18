pragma solidity ^0.4.24;

contract IStorage {

    //swap with the the second enum definition to use 'updated version'
    enum RecordState {StateA, StateB}
    //enum RecordState {StateA, StateB, StateC}

    function setState(address user, RecordState newState) public;
}