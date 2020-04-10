import CryptoJS from 'crypto-js';
const KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');

// DES加密
export function encryptByDES(message, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// DES解密
export function decryptByDES(message, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.DES.decrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encrypt(word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  // console.log("-=-=-=-", encrypted.ciphertext)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function decrypt(word, keyStr, ivStr) {
  let key  = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);

  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/**
 * 将对象转化为get请求的url
 * @param {} obj
 */
export function converObjToUrl(obj) {
  if(obj) {
    let str = '?';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        str += key + '=' + element + '&'
      }
    }
    return str;
  }
}
/**
 * 清除输入框内容
 * @param {} obj
 */
export function clearInput(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = '';
    }
  }
}


