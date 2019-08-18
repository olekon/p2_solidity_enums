const Storage = artifacts.require('Storage');
const StorageUser = artifacts.require('StorageUser');

const StorageUpd = artifacts.require('StorageUpd');
const StorageUserUpd = artifacts.require('StorageUserUpd');

const StateA = 0;
const StateB = 1;
const StateC = 2;

contract("Before update", function (accounts) {
    let storage;
    let storageUser;

    before(async function () {
        storage = await Storage.new();
        storageUser = await StorageUser.new(storage.address);
    });

    it("should change to StateB", async function () {
        await storageUser.changeStateB();
        assert.equal(await storage.states.call(accounts[0]), StateB, "state should equal to StateB (1)");
    });

    it("should change to StateA", async function () {
        await storageUser.changeStateA();
        assert.equal(await storage.states.call(accounts[0]), StateA, "state should equal to StateA (0)");
    });
});


contract("After update of ALL contracts", function (accounts) {

    let storage;
    let storageUser;

    before(async function () {
        storage = await StorageUpd.new();
        storageUser = await StorageUserUpd.new(storage.address);
    });

    it("should change to StateB", async function () {
        await storageUser.changeStateB();
        assert.equal(await storage.states.call(accounts[0]), StateB, "state should equal to StateB (1)");
    });

    it("should change to StateA", async function () {
        await storageUser.changeStateA();
        assert.equal(await storage.states.call(accounts[0]), StateA, "state should equal to StateA (0)");
    });

    it("should change to StateC", async function () {
        await storageUser.changeStateC();
        assert.equal(await storage.states.call(accounts[0]), StateC, "state should equal to StateC (2)");
    });
});

contract("Update only StorageUser, leads to bug", function (accounts) {
    let storage;
    let storageUserUpd;

    before(async function () {
        //use OLD version of Storage ...
        storage = await Storage.new();
        //... with NEW version of StorageUser
        storageUserUpd = await StorageUserUpd.new(storage.address);
    });

    it("try to apply new StateC, should fail", async function () {        
        try {
            //this will produce 'Error: VM Exception while processing transaction: revert'
            await storageUserUpd.changeStateC();
        } catch (e) {
            return true;
        }

        throw "Should fail";
    });
});