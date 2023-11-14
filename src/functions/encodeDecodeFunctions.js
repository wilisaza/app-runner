export const iterationNumber = () =>{
  let min = 9
  let max = 20
  return Math.floor(Math.random()*(max-min+1)+min)
}

export const encodeString = (iterations, value) => {
  let encode = value
  for(let i = 1; i<= iterations; i++)
    i === 1 ? encode = Buffer.from(encode).toString('hex') : encode = Buffer.from(encode).toString('base64')
  return encode
};

export const decodeString = (iterations, value) => {
  let decode = value
  for(let i = iterations; i > 0; i--)
    i === 1 ? decode = Buffer.from(decode,'hex').toString('ascii') : decode = Buffer.from(decode,'base64').toString('ascii')
  return decode
};


