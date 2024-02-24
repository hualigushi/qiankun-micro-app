(function webpackUniversalModuleDefinition(root, factory) {

    // root=>window 
    //兼容CommonJs模块 node.js环境中运行
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    //兼容AMD模块
    else if(typeof define === 'function' && define.amd)
        define([], factory);

    //兼容CommonJs
    else if(typeof exports === 'object')
        exports["vue2-app-app"] = factory();

    //windw[xxx]=factory()
    else
        root["vue2-app-app"] = factory();
    })(window, function() {

        //入口文件app.js内部代码 

        //最后会返回导出的结果 即入口文件export出去的变量等
        return {
            bootstrap:'bootstrap',
            mount:'mount',
            unmount:'unmount',
        }

    });