import { fetchResource } from "./fetch-resource"

export const importHTML=async (url)=>{
    const html=await fetchResource(url)
    const template=document.createElement('div')
    //将获取到的子应用的html文件字符串内容专为DOM
    template.innerHTML=html 

    //从DOM中查找到script标签
    const scripts=template.querySelectorAll('script')

    //获取所有的 script 标签的代码：[代码，代码]
    function getExternalScripts() {
        return Promise.all(Array.from(scripts).map(script=>{
            const src=script.getAttribute('src')
            if(!src){
                return Promise.resolve(script.innerHTML)
            }else{
                return fetchResource(
                    src.startsWith('http')?src:`${url}${src}`
                )
            }
        }))
        
    }

    //执行script中的代码
    //eval或 new Funciton
    //实现一个import-entery-html 库
    //获取并执行所有的 script 脚本代码
    async function execScripts() {
        const scripts=await getExternalScripts()
        console.log(scripts);

        //手动创建一个支持umd模块的环境
        const module={exports:{}}
        const exports=module.exports

        scripts.forEach(code=>{
            eval(code)
        })

        console.log('module.exports=',module.exports);
        return module.exports //将代码执行后的导出模块结果返回出去
    }

    return {
        template,
        getExternalScripts,
        execScripts
    }
}