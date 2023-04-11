const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const adresses = await ethers.getSigners();

    return { game, adresses};
  }
  it('should be a winner', async function () {
    const { game, adresses } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const winner = adresses[Math.trunc(Math.random() * adresses.length)];
    await game.write(winner.address);
    await game.connect(winner).win(adresses[0].address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
