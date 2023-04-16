export const stringToUint8 = (inputString) => {
  return new Uint8Array(
    Buffer.from(inputString, 'base64')
  )
}

export const numToUint8 = (num) => {
  const arr = new Uint8Array(8);
  for(let i = 0; i < 8; i++)
    arr.set([num/0x100**i], 7-i)
  return arr;
}

export const parseResultLog = (result) => Buffer.from(result.logs[0]).toString('hex').slice(8)

// export const uint8ArrayToNum = (arr) => {
//    let num = 0;
   
//    for(let i = 0; i < 8; i++)
//       num += (0x100**i) * arr[7-i];
//    return num;
// }