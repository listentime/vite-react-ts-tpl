import React from 'react'
import ReactDom from "react-dom";
import Toast from "./toast";
interface noticeFun {
    (content:string,duration:number,onClose?:any):ReturnType<typeof notice>;
}

type toastType = Record<string, noticeFun>

const render = ReactDom.render
const notice = (type:string, content:string, duration = 4000, onClose?:any) => {
    const div = document.createElement('div');
    div.className = `react-toast ${type}`;
    document.body.appendChild(div);
    let _toastTime:number | undefined;
    let delDom = () => {
        ReactDom.unmountComponentAtNode(div);
        document.body.removeChild(div);
        clearTimeout(_toastTime);
        _toastTime = undefined;
        // onClose()
    };
    // 当 duration 为 -1 时，显示伪不自动关闭
    if (duration !== -1) _toastTime = setTimeout(delDom, duration + 300); // +300 为离开动画所需要的时间
    render(React.createElement(Toast, {
        callback: delDom,
        notice: {
            content: content,
            type: type
        },
        onClose: onClose,
        duration: duration
    }), div);
};


const ToastDefault: toastType = {
    info(content = "Info", duration, onClose) {
        return notice('info', content, duration, onClose);
    },
    success(content = '操作成功', duration, onClose) {
        return notice('success', content, duration, onClose);
    },
    danger(content = "发送错误", duration, onClose) {
        return notice('danger', content, duration, onClose);
    },
    loading(content = 'Loading...', duration, onClose) {
        return notice('loading', content, duration, onClose);
    },
    warning(content = '警告', duration, onClose) {
        return notice('warning', content, duration, onClose);
    },
    primary(content = 'OK', duration, onClose) {
        return notice('primary', content, duration, onClose);
    }
}
export default ToastDefault


