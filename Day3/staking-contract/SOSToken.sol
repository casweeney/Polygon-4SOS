// SPDX-License-Idenfifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract SOSToken is ERC20 {

    address owner;

    uint public constant maxTotalSupply = 10000000 * 10 ** 18;

    constructor() ERC20("Fourdays of Solidity", "SOS") {
        owner = msg.sender;
        _mint(msg.sender, maxTotalSupply);
    }

    function mint(uint _amount) internal {
        _mint(msg.sender, _amount);
    }
}