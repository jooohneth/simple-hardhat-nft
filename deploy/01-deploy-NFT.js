const {network} = require("hardhat")
const { modules } = require("web3")

const {developmentChains} = require("../helper-hardhat-config")

const {verify} = require("../utils/verify")

module.exports = async function({getNamedAccounts, deployments}) {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    log("---------------------------------------------------")

    const args = []

    const NFT = await deploy("NFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,

    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...........")
        await verify(NFT.address, args)
    }

    log("---------------------------------------------------")
}

