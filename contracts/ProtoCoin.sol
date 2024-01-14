// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ProtoCoin {
    string public name = "ProtoCoin";
    string public symbol = "PRC";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000 * 10 ** decimals;

 

    event Transfer(address indexed _from, address _to, uint256 _value );
    event Approval(address indexed _owner, address indexed _spender, uint _value);


       mapping(address => uint256) private _balances;
       mapping (address => mapping (address => uint)) private _allowances;

       constructor(){
        _balances[msg.sender] = totalSupply; //define que o sender no caso quem fez o deploy fique com todo saldo quando encaminhado para a blockchain
       }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf(msg.sender) >= _value, "Insuficient balance");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function aprrove(address _spender, uint256 _value) public returns (bool success){
        _allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 renaining){
       return _allowances[_owner][_spender];
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(balanceOf(_from) >= _value, 'Insufficient balance');
        require(allowance(_from, msg.sender) >= _value, 'insuficient allowance');

        _balances[_from] -= _value;
        _allowances[_from][msg.sender] -= _value;
        _balances[_to] += _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}
