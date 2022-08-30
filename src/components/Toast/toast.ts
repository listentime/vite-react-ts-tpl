import React from 'react';
import './toast.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";

type toastParams = {
    notice: {
        content: string,
        type: string
    },
    callback:() => void,
    duration: number,
    onClose: () => void
}

const icons = {
    info: 'icon-info',
    success: 'icon-success',
    danger: 'icon-circle',
    primary: 'icon-zan',
    warning: 'icon-warning'
};
const Toast = ({notice, callback, duration, onClose}: toastParams) => {
    const [show, setShow] = React.useState(true);
    // 执行退场动画
    // if (duration !== -1) {
    //     let _timer = setTimeout(() => {
    //         setShow(false);
    //         clearTimeout(_timer);
    //         _timer = null;
    //     }, duration);
    // }
    return React.createElement(React.Fragment, null,
        React.createElement(TransitionGroup, {
            component: null,
            appear: true
        }, show ?
            React.createElement(CSSTransition, {
                    timeout: 300,
                    classNames: "down",
                    appear: true
                },
                React.createElement("div", {
                        className: notice.type
                    },
                    notice.content)) : null));
};
export default Toast;