import React, { useState } from 'react'


function ArticleList() {
  return (
    <div onClick={()=>{
      if ((window as any).__wxjs_environment === 'miniprogram') {
        (window as any).wx.miniProgram.switchTab({ url: '/pages/index/index' })
      } else {
        window.parent.postMessage(JSON.stringify({
          code:"1002",
          msg:"返回首页"
      }),'*');
         // window.location.href = "/"
      }
    }}>
      返回首页
    </div>
  )

}

export default ArticleList
