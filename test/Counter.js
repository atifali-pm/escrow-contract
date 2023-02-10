const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('Counter', () => {

  let counter;
  beforeEach(async () =>{
    const Counter = await ethers.getContractFactory('Counter');
    counter = await Counter.deploy('My Counter', 1);

  })

  describe('Deployment', () => {
    it('sets initial counter', async () => {
      expect(await counter.count()).to.equal(1);
    })

    it('sets initial name', async () => {
      expect(await counter.name()).to.equal('My Counter');
    })
  })

  describe('Variables and Functions', async () =>{
    it('it reads the "count" from public variable', async () => {
      expect(await counter.count()).to.equal(1);
    })

    it('it reads the "count" from getCount() function', async () => {
      expect(await counter.getCount()).to.equal(1);
    })

    it('it reads the "name" from public variable', async () => {
      expect(await counter.name()).to.equal('My Counter');
    })

    it('it reads the "name" from getName() function', async () => {
      expect(await counter.getName()).to.equal('My Counter');
    })

    it('it sets the "name" using setName function', async () => {
      await counter.setName('New Name');

      expect(await counter.getName()).to.equal('New Name');
    })


  })

  describe('Counting', () => {

    let transaction;

    it('it increments the count', async () =>{
      transaction = await counter.increment();
      await transaction.wait();
      expect(await counter.count()).to.equal(2);

      transaction = await counter.increment();
      await transaction.wait();
      expect(await counter.count()).to.equal(3);

    })

    it('it decrements the count', async () =>{
      transaction = await counter.decrement();
      await transaction.wait();
      expect(await counter.count()).to.equal(0);

      await expect(counter.decrement()).to.be.reverted;
    })


  })

})
