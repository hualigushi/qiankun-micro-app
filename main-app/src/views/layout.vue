/* eslint-disable */
<template>
    <div class="main-box">
        <div class="left-box">
             <nav>
                <router-link to="/home">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <router-link to="/vue2-app/">vue2app</router-link>
            </nav>
        </div>
        <div class="right-box">
            <!-- 主应用容器 -->
            <router-view></router-view>

            <!-- 子应用容器 -->
            <div id="subappContainer"> </div>
        </div>
    </div>
</template>
<script>
 
export default {
    methods:{
        toPath(url){
            console.log(url);
            // this.$router.push('/vue2')
        }
    }
}
</script>

<style scoped>
    .main-box{
        display: flex;
        height: 100%;
    }

    .left-box{
        width: 100px;
        border-right: 1px solid #abcdef;

    }

    .right-box{
        flex: 1;
    }

    nav {
    padding: 30px;
    }

    nav a {
    font-weight: bold;
    color: #2c3e50;
    }

    nav a.router-link-exact-active {
    color: #42b983;
    }
</style>