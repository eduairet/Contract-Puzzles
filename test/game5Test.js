const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');
const { Wallet } = ethers;

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const threshold = parseInt('0x00ffffffffffffffffffffffffffffffffffffff');
    const addresses = await ethers.getSigners(),
      winner = addresses.find(a => parseInt(a.address) < threshold);
    return { game, winner };
  }
  it('should be a winner', async function () {
    const { game, winner } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const tx = await game.connect(winner).win();
    await tx.wait();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
