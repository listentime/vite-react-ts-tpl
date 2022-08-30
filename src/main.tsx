import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import API from './api'
import { useRequest } from 'ahooks'
import { fetcher } from './libs/fetcher'

interface Imessage {
  token: string;
  accountName: string;
  accountId: string;
  code: string;
  activeName: string;
  title: string;
}


const promise = ()=>{
  return new Promise((resolve, reject) =>{
    let obj: Record<string, string> = {}
    window.location.href.split("?")[1].split("&").forEach((item, index) => {
        obj[item.split("=")[0]] = item.split("=")[1]
    })
    resolve(obj)
  })
}

const startReact = async () => {
  try{
    
   let obj = await promise() as Imessage
   if(!obj.token){
    if ((window as any).__wxjs_environment === 'miniprogram') {
      (window as any).wx.miniProgram.switchTab({ url: localStorage.loginUrl })
    } else {
        window.parent.postMessage(JSON.stringify({
            code: "1001",
            msg: "返回登录页"
        }), '*');
        // window.location.href = "/pages/login/index"
    }
    return;
   }
    window.localStorage.setItem('tokenCodeAuth',obj.token)
    window.localStorage.setItem('code',obj.code)
    window.localStorage.setItem('title',obj.title)
    window.localStorage.setItem('activeName',obj.activeName)
    window.localStorage.setItem('loginUrl','/pages/login/index?type=microActivity&code='+ obj.code + '&title=' + obj.title + "&activeName=" + obj.activeName)
    document.getElementsByTagName('title')[0].innerHTML = obj.title
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )
  }catch(e){
    console.log(e)
  }
  
}

startReact()







