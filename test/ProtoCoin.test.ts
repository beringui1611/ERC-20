import {
  loadFixture
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ProtoCoin Tests", function () {

  async function deployFixture() {

    const [owner, otherAccount] = await ethers.getSigners();

    const ProtoCoin = await ethers.getContractFactory("ProtoCoin");
    const protoCoin = await ProtoCoin.deploy()

    return {protoCoin, owner, otherAccount}
  }

  it("Should have correct name", async function () {
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    const name = await protoCoin.name()
    expect(name).to.equal("ProtoCoin");
  });

  it('Should have correct symbol', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    const symbol = await protoCoin.symbol()
    expect(symbol).to.equal("PRC")
  })

  it('Should have correct decimals', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    const decimals = await protoCoin.decimals()
    expect(decimals).to.equal(18)
  })

  it('Should have correct totalSupply', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    const totalSupply = await protoCoin.totalSupply()
    expect(totalSupply).to.equal(1000n * 10n ** 18n)
  })

  it('Should getBalance', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    const balanceOf = await protoCoin.balanceOf(owner.address)
    expect(balanceOf).to.equal(1000n * 10n ** 18n)
  })

  it('Should transfer', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    const balanceOwnerBefore = await protoCoin.balanceOf(owner.address)
    const balanceOtherBefore = await protoCoin.balanceOf(otherAccount.address)
    await protoCoin.transfer(otherAccount, 1n)
    const balanceOtherAfter = await protoCoin.balanceOf(otherAccount.address)
    const balanceOwnerAfter = await protoCoin.balanceOf(owner.address)
    expect(balanceOwnerBefore).to.equal(1000n * 10n ** 18n);
    expect(balanceOwnerAfter).to.equal((1000n * 10n ** 18n) - 1n);
    expect(balanceOtherBefore).to.equal(0);
    expect(balanceOtherAfter).to.equal(1n);
  })

  it('Should NOT transfer', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);

    const instance = protoCoin.connect(otherAccount);
    await expect(instance.transfer(owner.address, 1n)).
    to.be.revertedWith('Insuficient balance')
  })

  it('Should Approve', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    await protoCoin.aprrove(otherAccount.address, 1n)
    const value = await protoCoin.allowance(owner.address, otherAccount.address)
    expect(value).to.equal(1n)
  })

  it('Should transfer FROM', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);

    const balanceOwnerBefore = await protoCoin.balanceOf(owner.address)
    const balanceOtherBefore = await protoCoin.balanceOf(otherAccount.address)

    await protoCoin.aprrove(otherAccount.address, 10n)

    const instance = protoCoin.connect(otherAccount)
    await instance.transferFrom(owner.address, otherAccount.address, 5n);
   

    const balanceOwnerAfter = await protoCoin.balanceOf(owner.address)
    const balanceOtherAfter = await protoCoin.balanceOf(otherAccount.address)
    const allowance = await protoCoin.allowance(owner.address, otherAccount.address);

    expect(balanceOwnerBefore).to.equal(1000n * 10n ** 18n);
    expect(balanceOwnerAfter).to.equal((1000n * 10n ** 18n) - 5n);
    expect(balanceOtherBefore).to.equal(0);
    expect(balanceOtherAfter).to.equal(5);
    expect(allowance).to.equal(5);
  })

  it('Should NOT transfer from (balance)', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    
    const instance = protoCoin.connect(otherAccount);
    await expect(instance.transferFrom(otherAccount.address, otherAccount.address, 1n)).
    to.be.revertedWith('Insufficient balance');
  })

  it('Should NOT transfer from (allowance)', async function (){
    const {protoCoin, owner, otherAccount} = await loadFixture(deployFixture);
    
    const instance = protoCoin.connect(otherAccount);
    await expect(instance.transferFrom(owner.address, otherAccount.address, 1n)).
    to.be.revertedWith('insuficient allowance');
  })





  

})

