/**
 * 处理路由变化
 */
import { importHTML } from "./import-html";
import { getApps } from "./index";
import { getNextRoute, getPrevRoute } from "./rewriter-router";
export const handleRouter=async ()=>{

    //2匹配子应用 通过路由匹配到子应用
    const apps=getApps()

    //获取上一个应用
    const prevApp=apps.find(item=>{
       return getPrevRoute().startsWith(item.activeRule)
    })

    //获取下一个应用 
    const app=apps.find(item=>getNextRoute().startsWith(item.activeRule))
    
    //如果有上一个，先销毁
    if (prevApp&&(app&&prevApp.name!==app.name)) {
       await unmount(prevApp)
    }

    if (!app) {
        return
    }

    //3加载子应用
    // 请求获取子应用的资源：html css js
   
    // const html=await fetch(app.entry).then(res=>res.text())

    // const container=document.querySelector(app.container)

    // // console.log('container==',container); //为什么刷新页面的时候没有获取到DOM？？  因为vue还没挂载完 $mount
    // //1.客户端需要通过执行JavaScript来生成内容
    // //2.浏览器出于安全考虑 innerHTML中的script不会加载执行
    // container.innerHTML=html  //innerHTML 

    const {template,getExternalScripts,execScripts}=await importHTML(app.entry)
    const container=document.querySelector(app.container)

    //将子应用的入口html放入主应用的预留子应用处
    container.appendChild(template)

    //配置全局环境变量
    window.__POWERED_BY_QIANKUN__=true
    //配置子应用webpack运行时的publicPath,这样主应用中的子应用图片等的资源路径地址域名会指向子应用本身的域名，不会导致404
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__=app.entry+'/'

    const appExports=await execScripts()
    console.log('appExports',appExports);

    app.bootstrap=appExports.bootstrap
    app.mount=appExports.mount
    app.unmount=appExports.unmount

    //4渲染子应用

    await bootstrap(app)

    await mount(app)

}

async function bootstrap(app) {
    app.bootstrap&&(await app.bootstrap())
}

async function mount(app) {
    app.mount&&(await app.mount({
        container:document.querySelector(app.container)
    }))
}

async function unmount(app) {
    app.unmount&&(await app.unmount())
}