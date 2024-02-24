
import {handleRouter} from './handle-router'

let prevRoute='' // 上一个路由
let nextRoute=window.location.pathname // 下一个路由

export const getPrevRoute=()=>prevRoute
export const getNextRoute=()=>nextRoute

window.getPrevRoute=getPrevRoute
window.getNextRoute=getNextRoute


//路由监听有两种方式：
//第一种针对hash路由: window.onhashchange
//第二种 通过history监视路由变化
export const rewriteRouter=()=>{
    
    //history.go 浏览器前进, history.back 后退,  history.forward 使用popstate事件：window.onpopstate
    //通过脚本触发的页面跳转方法pushState,replaceState 需要通过函数重写的方式进行劫持
    //addEventListener是追加事件侦听，不会覆盖别人写的，onpopstate会覆盖掉之前定义的事件侦听
    window.addEventListener('popstate',()=>{
        prevRoute=nextRoute
        nextRoute=window.location.pathname
        handleRouter()
    })

    const rawPushState=window.history.pushState //原生方法备份
    window.history.pushState=(...args)=>{

        prevRoute=window.location.pathname
        rawPushState.apply(window.history,args)
        nextRoute=window.location.pathname

        handleRouter()

    }

    const rawReplaceState=window.history.replaceState
    window.history.replaceState=(...args)=>{

        prevRoute=window.location.pathname
        rawReplaceState.apply(window.history,args)
        nextRoute=window.location.pathname

        handleRouter()

    }
}