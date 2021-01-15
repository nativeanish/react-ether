//SPDX-License-Identifier: UNDEFINED

pragma solidity ^ 0.8.0;

contract WavePortal {
  constructor() payable {}

  struct Wave {
    address waver;
    string message;
    uint timestamp;
  }

  uint totalWave;

  Wave [] wave;

  event NewWave(address indexed _from, string message, uint timestamp); 

  function WaveMe(string memory _message) public{
    totalWave += 1;
    wave.push(Wave(msg.sender, _message, block.timestamp));
    emit NewWave(msg.sender, _message, block.timestamp);
  }

  function getWave() public view returns(Wave [] memory){
    return wave;
  }

  function getWaveNo() public view returns(uint){
    return totalWave;
  }
  
  function getBalance () public view returns(uint){
      return address(this).balance;
  }
}
