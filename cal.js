const ethers = require ("ethers");
const eth = require('ethereumjs-util');

// 0xff ++ deployingAddress is fixed:
var string1 = '0xff' + 'contract_address without 0x'

// Hash of the bytecode is fixed. Calculated with eth.keccak256():
let bytecode = 'creation bytecode'
var string2 = ethers.utils.keccak256(bytecode).slice(2)

// In each loop, i is the value of the salt we are checking
for (var i = 0; i < 72057594037927936; i++) {
   // 1. Convert i to hex, and it pad to 32 bytes:
   var saltToBytes = i.toString(16).padStart(64, '0')

   // 2. Concatenate this between the other 2 strings
   var concatString = string1.concat(saltToBytes).concat(string2)

   // 3. Hash the resulting string
   var hashed = eth.bufferToHex(ethers.utils.keccak256(concatString))

   // 4. Remove leading 0x and 12 bytes
   // 5. Check if the result contains badc0de

   if (i >= 1e6 && i === 1e6) {
      console.log("over 1e6")
   }

   if (i >= 1e7 && i === 1e7) {
      console.log("over 1e7")
   }

   if (i >= 1e8 && i === 1e8) {
      console.log("over 1e8")
   }
   // change 'def1' to any vanity phrase you like in contract address
   if (hashed.substr(26).includes('def1')) {
      console.log(`${i} ${hashed.substr(26)}`)
      console.log(saltToBytes)
      break
   }
}
