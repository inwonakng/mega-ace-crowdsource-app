export const stringToUint8 = (inputString) => {
  return new Uint8Array(
    Buffer.from(inputString, 'base64')
    )
}


export const parseResultLog = (result) => Buffer.from(result.logs[0]).toString('hex').slice(8)

// export const numberToUint