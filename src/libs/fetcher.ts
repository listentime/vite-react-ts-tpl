import * as R from 'ramda';
import { baseRequestUrl, ed, platformNo } from '../config';
import Toast from '../components/Toast'
import { isNil } from 'ramda';
import API from '../api';
import React from 'react';
import ReactDOM from 'react-dom';
import Loading from '../components/loading'

type headerKeys = "captchaKey" | "captchaValue";
type FetchOptions = RequestInit & {
  [key in headerKeys]?: string
} & {
  prefix?: string;
  method?: "POST";
  loading?: boolean,
  failToast?: boolean,
}
// let history = useHistory()

let getUrl = (prefix: string | undefined, url: string) => R.cond([
  [R.isNil, R.always(baseRequestUrl + url)],
  [R.T, R.always(prefix + url)]
])()
let requestCount = 0
const showLoading = ()=>{
  if(requestCount === 0){
    let dom = document.createElement('div')
    dom.setAttribute('id','loading')
    document.body.appendChild(dom)
    // @ts-ignore
    ReactDOM.render(Loading(), dom)
  }
  requestCount++
}

const hideLoading = ()=>{
  requestCount--
  let loadNode  = document.getElementById('loading')
  if(requestCount === 0 && loadNode){
    document.body.removeChild(loadNode)
  }
}

const Fetch = async (url: string, data = {}, options: FetchOptions = {}) => {
  showLoading()
  let realUrl = getUrl(options.prefix, url)

  let { prefix, method, loading = true, failToast = true, ...restHeaders } = options

  let realHeaders = {
    'Content-Type': 'application/json',
    platformNo,
    ...restHeaders
  }
  let incomeChannel = "";
  let finalData = {
    ...data,
  }
  return fetch(realUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      platformNo
    },
    body: JSON.stringify({
      platformNo: platformNo,
      ver: "1.0",
      content: ed(finalData)
    })
  }).then(async (res) => {
    let result = await res.json()
    return result
  }).catch((e) => {
    hideLoading()
    throw e
  })
}
const fetcher = (url: string, options: FetchOptions = {}) => (data: any = {}) => {
  // hideLoading()
  let plugin = plugins.get(url)
  let pluginResult = plugin?.apply(data)
  let { failToast = true } = data
  return pluginResult || Fetch(url, data, options).then((result) => {
    hideLoading()
    // ????????????????????????
    if (
      result?.content?.responseCode == '0003' ||
      result?.content?.responseCode == '0002' ||
      result?.content?.responseCode == '0001'
      ) {
       Toast.success(result?.content?.content || result?.content?.responseDesc || result?.content?.msg,2000)
        setTimeout(()=>{
          // ???????????? ??????????????????
          if ((window as any).__wxjs_environment === 'miniprogram') {
            (window as any).wx.miniProgram.switchTab({ url: localStorage.loginUrl })
          } else {
            window.parent.postMessage(JSON.stringify({
              code:"1001",
              msg:"???????????????"
          }),'*');
            //window.location.href= "/pages/login/index"
          }
        },1000)
        return Promise.reject()
      // ??????
      // ??????????????????responseCode????????????
      } else if (result.code === 1 &&
        (!result.content.responseCode || result.content.responseCode === '0000' || result.content.responseCode === '4000')) {
            // Toast????????????????????????????????? ????????????success?????????????????????h5??????????????????
            // Toast.success("Info", 1000,()=>{
            //   console.log('do something')
            // });
            // Toast.info("????????????", 2000);
            // Toast.danger("????????????", 2000);
            // Toast.loading("Loading", 2000);
            // Toast.warning("??????", 2000);
            // Toast.primary("OK", 2000);
        return result.content
      } else {
       Toast.warning(result.content?.responseDesc || result.msg,2000)
        throw result
      }
  })
}
const getSubordinate = {
  apply: (data: any) => {
    if (isNil(data.superiorId)) {
      return Promise.resolve(provinceList)
    }
  }
}
type IPlugin = {
  apply: (data: any) => Promise<any> | void
}

type PluginsMap = Map<string, IPlugin>

const plugins: PluginsMap = new Map()

plugins.set(API.getSubordinate, getSubordinate)

const provinceList = { "responseDesc": "????????????", "regionList": [{ "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "320000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "510000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "350000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "???????????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "540000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "220000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "370000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "610000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "??????????????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "150000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "340000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "530000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "630000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "620000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "360000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "440000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "????????????????????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "650000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "420000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "120000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "110000", "regionNum": 110100, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "140000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "430000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????????????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "640000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "130000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "410000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "????????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "230000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "310000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "460000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "210000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "330000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "520000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????????????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "450000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }, { "createUserId": null, "regionLv": "02", "updateUserId": null, "versionNum": 1, "regionName": "?????????", "updateTime": "2020-05-09 00:00:00", "parentId": "-1", "regionStatus": "01", "createTime": "2020-05-09 00:00:00", "fullRegionName": null, "numStore": "0", "id": "500000", "regionNum": null, "isDel": 0, "regionLvCN": null, "regionStatusCN": "??????" }], "responseCode": "0000" }

export { fetcher, Fetch as fetch };