// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "./SOSToken.sol";

contract NFTStaking is SOSToken {
    address public requiredNFT;

    struct Stake {
        uint stakeAmount;
        uint stakeTime;
    }

    mapping(address => Stake) stakes;

    constructor(address _requiredNFT){
        requiredNFT = _requiredNFT;
    }

    function stake() external payable {
        require(msg.sender != address(0), "can't stake with zero address");
        require(IERC721(requiredNFT).balanceOf(msg.sender) > 0, "You are not eligible to stake");
        require(msg.value > 0, "You can't stake zero value");

        Stake storage newStake = stakes[msg.sender];
        newStake.stakeAmount += msg.value;
        newStake.stakeTime = block.timestamp;

        mint(msg.value);
    }

    function withdraw() external {
        Stake storage userStake = stakes[msg.sender];
        uint sendingAmount = userStake.stakeAmount;
        require(msg.sender != address(0), "can't stake with zero address");
        require(IERC721(requiredNFT).balanceOf(msg.sender) > 0, "You are not eligible to stake");
        require(balanceOf(msg.sender) >= userStake.stakeAmount);
        require(userStake.stakeTime != 0, "You are a thief");
        require(userStake.stakeAmount > 0, "You don't have a stake");

        userStake.stakeAmount = 0;

        payable(msg.sender).transfer(sendingAmount);
        _transfer(msg.sender, address(this), sendingAmount);
    }

    receive() external payable {}
}