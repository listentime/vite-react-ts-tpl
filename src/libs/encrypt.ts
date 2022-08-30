// @ts-ignore
import {JSEncrypt} from 'jsencrypt'


function addPreZero(num: string, length: number) {
  const t = (num + '').length;
  let s = '';
  for (let i = 0; i < length - t; i++) {
    s += '0';
  }
  return s + num;
}

class MyJSEncrypt extends JSEncrypt {
  
  encryptLong2 (string: string) {
    const k = this.getKey();
    try {
      let ct = '';
      // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
      // 1.获取字符串截取点
      const bytes:Array<number> = [];
      bytes.push(0);
      let byteNo = 0;
      let c;
      const len = string.length;
      let temp = 0;
      for (let i = 0; i < len; i++) {
        c = string.charCodeAt(i);
        // eslint-disable-next-line
        if (c >= 0x010000 && c <= 0x10ffff) {
          byteNo += 4;
          // eslint-disable-next-line
        } else if (c >= 0x000800 && c <= 0x00ffff) {
          byteNo += 3;
          // eslint-disable-next-line
        } else if (c >= 0x000080 && c <= 0x0007ff) {
          byteNo += 2;
        } else {
          byteNo += 1;
        }
        if (byteNo % 117 >= 114 || byteNo % 117 === 0) {
          if (byteNo - temp >= 114) {
            bytes.push(i);
            temp = byteNo;
          }
        }
      }
      // 2.截取字符串并分段加密
      if (bytes.length > 1) {
        for (let i = 0; i < bytes.length - 1; i++) {
          let str;
          if (i === 0) {
            str = string.substring(0, bytes[i + 1] + 1);
          } else {
            str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
          }
          const t1 = k.encrypt(str);
          ct += addPreZero(t1, 256);
        }
        if (bytes[bytes.length - 1] !== string.length - 1) {
          const lastStr = string.substring(bytes[bytes.length - 1] + 1);
          const rsaStr = k.encrypt(lastStr);
          ct += addPreZero(rsaStr, 256);
        }
        //
        return ct;
      }
      const t = k.encrypt(string);
      const y = t;
      return y;
    } catch (ex) {
      return false;
    }
  };
}


  // eslint-disable-next-line
// JSEncrypt.prototype.encryptLong2 = function(string: string) {
//   const k = this.getKey();
//   try {
//     let ct = '';
//     // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
//     // 1.获取字符串截取点
//     const bytes:Array<number> = [];
//     bytes.push(0);
//     let byteNo = 0;
//     let c;
//     const len = string.length;
//     let temp = 0;
//     for (let i = 0; i < len; i++) {
//       c = string.charCodeAt(i);
//       // eslint-disable-next-line
//       if (c >= 0x010000 && c <= 0x10ffff) {
//         byteNo += 4;
//         // eslint-disable-next-line
//       } else if (c >= 0x000800 && c <= 0x00ffff) {
//         byteNo += 3;
//         // eslint-disable-next-line
//       } else if (c >= 0x000080 && c <= 0x0007ff) {
//         byteNo += 2;
//       } else {
//         byteNo += 1;
//       }
//       if (byteNo % 117 >= 114 || byteNo % 117 === 0) {
//         if (byteNo - temp >= 114) {
//           bytes.push(i);
//           temp = byteNo;
//         }
//       }
//     }
//     // 2.截取字符串并分段加密
//     if (bytes.length > 1) {
//       for (let i = 0; i < bytes.length - 1; i++) {
//         let str;
//         if (i === 0) {
//           str = string.substring(0, bytes[i + 1] + 1);
//         } else {
//           str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
//         }
//         const t1 = k.encrypt(str);
//         ct += addPreZero(t1, 256);
//       }
//       if (bytes[bytes.length - 1] !== string.length - 1) {
//         const lastStr = string.substring(bytes[bytes.length - 1] + 1);
//         const rsaStr = k.encrypt(lastStr);
//         ct += addPreZero(rsaStr, 256);
//       }
//       //
//       return ct;
//     }
//     const t = k.encrypt(string);
//     const y = t;
//     return y;
//   } catch (ex) {
//     return false;
//   }
// };

const encryptData = (key: string) => (data: any) => {
  const encrypt = new MyJSEncrypt({});
  encrypt.setPublicKey(key);
  const encrypted = encrypt.encryptLong2(JSON.stringify(data));
  if (!encrypted) {
    throw new Error("Encrypt failed")
  }
  return encrypted;
};

export default encryptData;
