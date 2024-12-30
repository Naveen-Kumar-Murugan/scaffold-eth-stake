//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


contract YourContract {

    uint public constant threshold  = 1 ether;
    mapping (address => uint) public stakelog;
    uint256 public deadline = block.timestamp + 120000;
    address[] public stakelogarr;
    address public owner;

    constructor () {
        owner=msg.sender; 
    } 

    function stake() public payable {
        timeleft();
        (bool success,) = address(this).call{value: msg.value}("");
        require(success, "Failed to send Ether");
        if(stakelog[msg.sender] == 0){
            stakelogarr.push(msg.sender);
        }
        stakelog[msg.sender] += msg.value;
    }

    function balanceof() public view returns(uint){
        timeleft();
        return owner.balance;
    }

    function withdraw() public {
        timeleft();
        for(uint i=0;i<stakelogarr.length;i++){
            (bool success,) = stakelogarr[i].call{value: stakelog[stakelogarr[i]]}("");
            require(success, "Failed to send Ether");
        }
    }

    modifier onlyOwner(){
        require(msg.sender==owner,"This function is authorised only for the owner");
        _;
    }
    
    function timeleft() public view returns (uint){
        require(block.timestamp<=deadline,"The deadline is passed.");
        return (deadline-block.timestamp);
    }

    receive() external payable {}
}
