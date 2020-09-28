import CryptoJS from 'crypto-js';

export default {
	/**
	 * @description 加密
	 */
	encrypt(word, keyStr) {
		var key = CryptoJS.enc.Utf8.parse(keyStr);
		  var iv = CryptoJS.enc.Utf8.parse(keyStr);
		  var encrypted = '';
		  var srcs = ''
		  if (typeof(word) == 'string') {
		      srcs = word
		  } else if (typeof(word) == 'object') {//对象格式的转成json字符串
		      srcs = CryptoJS.enc.Utf8.parse(word);
		  }
		  encrypted = CryptoJS.AES.encrypt(srcs, key, {
		      iv: key,
		      mode: CryptoJS.mode.CBC,
		      padding: CryptoJS.pad.Pkcs7
		  })
		  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	},
	
	//解密
	decrypt(word, keyStr) {
		var key = CryptoJS.enc.Utf8.parse(keyStr);
		  var iv = CryptoJS.enc.Utf8.parse(keyStr);
		  var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
		  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
		  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
		      iv: iv,
		      mode: CryptoJS.mode.CBC,
		      padding: CryptoJS.pad.Pkcs7
		  });
		  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
		  return decryptedStr.toString();
	}
}