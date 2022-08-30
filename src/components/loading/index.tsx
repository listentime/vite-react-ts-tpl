import React from 'react';
import ReactDOM from 'react-dom';
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

let Loading: React.FC<any> = ()=>{
  
  return (
    <Spin tip="加载中" size="default" />  
    )

}
export default Loading