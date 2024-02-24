import {rewriteRouter} from "./rewriter-router";
import {handleRouter} from './handle-router'

let _apps=[]

export const getApps=()=>{
    return _apps
 }

export const registerMicroApps=(apps)=>{
    _apps=apps
}


export const start=()=>{
    //微前端运行原理

    //1监视路由变化 
    rewriteRouter()
    //页面刷新时，手动初始执行路由匹配
    handleRouter()
    
}