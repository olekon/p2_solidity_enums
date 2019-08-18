# README
Source code for post about Solidity enums
LINK

This code demonstrates an example of error-prone Solidity enums usage.

`Storage` contract uses `enum RecordState` for its state variable. 

`StorageUser` contract is meant to be able to update `Storage` state variable.   

If `enum` is populated with new options and only `StorageUser` is redeployed, it becomes impossible to update `Storage` using these new options.

## Folders
Standard truffle folders structure is used.
1. contracts - Solidity source code
2. test - truffle JS tests
3. build/contracts - `truffle compile` outputs. 

Inside the `build` folder there are StorageUpd.json and StorageUserUpd.json - contracts that represent 'updated' versions with new enum options. Tests show their incompatibility with the previously deployed versions.

## In case you want to play with the code ...
 ... you might want to rebuild 'updated' versions of contracts for tests. This is how to get StorageUpd.json and StorageUserUpd.json.
1. Open file IStorage.sol. Comment the line with 

    `enum RecordState {StateA, StateB}` 

    Uncomment the line just below it with 

    `enum RecordState {StateA, StateB, StateC}`

2. Then, open StorageUser.sol. Uncomment the `changeStateC` function.

3. `truffle compile --all`
4. Rename Storage.json to StorageUpd.json and StorageUser.json to StorageUserUpd.json inside `build\contracts\` folder. 
5. Comment `changeStateC` function in StorageUser.sol file again. Also comment the enum with 3 options and uncomment enum with 2 options in IStorage.sol file.
6. `truffle compile --all`

Now you can `truffle test`