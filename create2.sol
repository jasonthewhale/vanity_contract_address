// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/utils/Strings.sol";

// example of contract with vanity address
contract deployWithCreate2 {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function name() public pure returns (string memory){
        return "Jason's contract";      
    }

    function destroy() external onlyOwner{
        selfdestruct(payable(owner));
    }
}

// Factory to create the vanity contract
contract Create2Factory {     
    // parameter of vanity contract constructor
    address internal wallet = 0x0000000000000000000000000000000000000000;
    event Deploy(address addr);

    function deploy(uint _salt) external {
        deployWithCreate2 _contract = new deployWithCreate2{salt: bytes32(_salt)}(wallet);
        emit Deploy(address(_contract));
    }

    function getAddr(bytes memory bytecode, uint _salt)
        public
        view
        returns (address)
    {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff), address(this), _salt, keccak256(bytecode)
            )
        );
        return address(uint160(uint(hash)));
    }

    function getBytecode() public view returns (bytes memory) {
        bytes memory bytecode = type(deployWithCreate2).creationCode;
        return abi.encodePacked(bytecode, abi.encode(wallet));
    }
}