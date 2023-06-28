import crypto from 'crypto'

const AES_SECRET_KEY = process.env['NEXT_PUBLIC_AES_SECRET_KEY']!
const AES_SECRET_IV = process.env['NEXT_PUBLIC_AES_SECRET_IV']!

// 加密算法
export function encrypt(password: string) {
  let decipher = crypto.createCipheriv('aes-256-cbc', AES_SECRET_KEY, AES_SECRET_IV)
  return decipher.update(password, 'binary', 'hex') + decipher.final('hex')
}
// 解密算法
export function decrypt(crypted: string) {
  crypted = Buffer.from(crypted, 'hex').toString('binary')
  let decipher = crypto.createDecipheriv('aes-256-cbc', AES_SECRET_KEY, AES_SECRET_IV)
  return decipher.update(crypted, 'binary', 'utf-8') + decipher.final('utf-8')
}
