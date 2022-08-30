import encryptData from './libs/encrypt';
import { map, concat, __ } from 'ramda'

let baseOrigin: string
let baseRequestUrl:string
let baseExchangeUrl: string
let ed: (str: any) => string 
let pN: string

 
if (import.meta.env.MODE === 'development') {
  baseOrigin = `http://192.168.80.65:5149`
  //baseRequestUrl = "http://192.168.70.160:18089/api"
   baseRequestUrl = `http://10.1.20.124:18089/api`
  //TODO 平台目前都一致，上线前要改。
  // if (process.env.TARO_ENV === "h5") {
  //   pN = 'MALL_APP_NEWH5_20210113'
  //   ed = encryptData('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCed3Bh1cWskhy7hmC0QqqxJXADuUmueBInuDzdspCu27ibITKMIEWiIwro96f3H6xWhUvGc+WQSzcXj6AJ+1QXL0PfsRwmNbPZkpFk/hb3Q99bvTMfDtSFlUJptYUvd6Y75XnsCxdsKWhzFwQhWI1YMb/O0FVNgntrI5by3lF9bQIDAQAB')
  // } else {
    pN = 'MALL_APP190802'
    ed = encryptData('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJzVrIbWglXWAm0S+mVTqxOFGz2/wEWgu/oM4XBQ9RVavKTcn24PHJpLAY+s7tzJixUMV1Vvhfv9pVwGqxvG9uH3NcHg2pn1vDOPX98hgBjbT0BfEG+5TR3hP7qMgw+etiblnC1uaL+4VqyW9oLdC/e0MiUktd0eSNRQA8HQKEaQIDAQAB')
  // }
} else {
  baseOrigin = Boolean(import.meta.env.VITE_GRAY_API) ? `https://grayjfyj.esgcc.com.cn` : "https://jfyj.esgcc.com.cn"
  baseRequestUrl = (Boolean(import.meta.env.VITE_GRAY_API) ?  `https://grayjfpts.esgcc.com.cn`: `https://jfpts.esgcc.com.cn`) + "/api"
  baseExchangeUrl = `https://bpeplus.esgcc.com.cn`
  // 平台目前都一致，上线前要改。
  // if (process.env.TARO_ENV === "h5") {
  //   pN = 'MALL_APP_NEWH5_20210113'
  //   ed = encryptData('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyS2e9y5LsC27zJI48BKPMR60CR71v3B/WoJ9pjGjgZY4Sh4TOHSSB4Otj1zoeKV02y25VsWangfYkWeCRqgPLP/+F38AbjQCPlV8cYB6yoG6JqJNGKc2hr6St7QhXJt8qTidLvnv/9dRqmLrH2KXUR40TLawvLgQGeywnD1LEbQIDAQAB')
  // } else {
    pN = 'MALL_APPGWJF20191019'
    ed = encryptData('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqtx8bDzHZiXsug8Bvu3QZ9C+q88mZDDoJRA7NBh72Lhyl9N13BoobAdnZ5RR7cjRzDvXXvW61W+Yk6r6518HHxt0HMIFp9/dT6elIY8w5g00mmn6a7GcyoWFDJsprrj//R7takA60BIeh5VPMmlWuEBwEekNc9NZjMCjW6lUCwQIDAQAB')
  // }
}


// 通用
const platformNo = pN

export {
  baseOrigin,
  baseRequestUrl,
  baseExchangeUrl,
  ed,
  pN,
  platformNo,
}