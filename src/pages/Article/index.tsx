import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import styles from './index.module.styl'
import { fetcher } from '../../libs/fetcher'
import API from '../../api'
interface IpointContent {
  accountStatus: string;
  accountId: string;
  consumerStatus: string;
  responseDesc: string;
  balance: string;
  accountName: string;
  totalBalance: string;
  frozenBalance: string;
  responseCode: string;
  status: string;
}

const Article: React.FC = () => {

  const [bpRest, setbpRest] = useState("")//剩余可用积分

  const [obj, setObj] = useState<Record<string, string>>({
    token: localStorage.accountToken,
    code: localStorage.code,
    title: localStorage.title,
  })
  // 临时token换取长期token
  const { data: accountToken, run: runAccountToken } = useRequest({
    tokenCode: localStorage.tokenCodeAuth
  }, {
    requestMethod: fetcher(API.getTokenByTempToken),
    manual: true,
    onSuccess: () => {
      if (JSON.parse(accountToken).STATUS === '1') {
        window.localStorage.setItem('accountToken', JSON.parse(accountToken).bizrt.token)
        setObj({
          ...obj,
          token: JSON.parse(accountToken).bizrt.token
        })
        localStorage.removeItem("tokenCodeAuth")
        runbalance()
      }
    }
  });
  // 
  useEffect(() => {
    if (!localStorage.tokenCodeAuth) {
      runbalance()
    } else {
      runAccountToken()
    }
  }, [localStorage.accountToken])

  // 获取剩余积分
  const { data: balancedata, run: runbalance } = useRequest<IpointContent>({
    token: obj.token
  }, {
    manual: true,
    requestMethod: fetcher(API.queryIntegralBalance),
    onSuccess: (res) => {
      setbpRest(res.balance)
      window.localStorage.setItem('accountName', res.accountName)
      window.localStorage.setItem('accountId', res.accountId)
    },

  });

  // 接口请求示例
  const { data, run: test } = useRequest({
    modelType: '03',
  }, {
    manual: true,
    requestMethod: fetcher(API.queryIconModelList),
    onSuccess: (res) => {
      console.log(res)
    }
  })

  useEffect(() => {
    test()
  }, [])
  return (
    <div>
      <h1 className={styles.title}>404</h1>
      <Link to={'/list'}>跳转</Link>
      <div>
        <Link to={'/luck'}>抽奖</Link>
      </div>
    </div>
  )
}

export default Article
