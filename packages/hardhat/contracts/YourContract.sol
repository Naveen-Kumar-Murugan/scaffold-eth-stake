//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


contract YourContract {

    uint public amount = msg.value;
    uint public constant threshold  = 1 ether;
    mapping (address => uint) public stakelog;
    address[] stakelogarr;
    address owner;

    constructor() {
        owner=msg.sender; 
    } 

    function stake() public payable {
        (bool success,) = address(this).call{value: msg.value}("");
        require(success, "Failed to send Ether");
        if(stakelog[msg.sender] != 0){
            stakelogarr.push(msg.sender);
        }
        stakelog[msg.sender] += msg.value;
    }

    function balanceof() public view returns(uint){
        return owner.balance;
    }

    function wihtdraw() public onlyOwner() {
        for(uint i=0;i<stakelogarr.length;i++){
            (bool success,) = stakelogarr[i].call{value: stakelog[stakelogarr[i]]}("");
            require(success, "Failed to send Ether");
        }
    }

    modifier onlyOwner(){
        require(msg.sender==owner,"This function is authorised only for the owner");
        _;
    }
    

    receive() external payable {}
}
