'use strict';

const crypto = require('crypto');

// MD5/SHA1
const hash = crypto.createHash('md5');
hash.update('Hello, world!');
hash.update('Hello, nodejs');

console.log(hash.digest('hex'));

// Hmac
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex'));

// AES(对称加密)
function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text:' + data);
console.log('Encrypted text:' + encrypted);
console.log('Decrypted text:' + decrypted);

// Diffie-Hellman(密钥交换协议)
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();
console.log('Prime:' + prime.toString('hex'));
console.log('Generator:' + generator.toString('hex'));

var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

console.log('Secret of ming:' + ming_secret.toString('hex'));
console.log('Secret of hong:' + hong_secret.toString('hex'));

// RSA(非对称加密)
// 生成密钥对：openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
// 导出公钥：openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
// 导出密钥：openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem

// 从文件加载key:
function loadKey(file) {
  // key实际上就是PEM编码的字符串:
  return fs.readFileSync(file, 'utf8');
}

let
  prvKey = loadKey('./rsa-prv.pem'),
  pubKey = loadKey('./rsa-pub.pem'),
  message = 'Hello, world!';

// 使用私钥加密:
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));

// 使用私钥解密:
let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));

// 使用公钥加密:
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

// 使用私钥解密:
let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));