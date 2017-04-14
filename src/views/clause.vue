<template>
    <Row justify="center" align="bottom" class="head-login">
        <i-col span="4" offset="3">
            <div class="front-login-logo">
                <!--<img src="../images/guyun_logo.png" class="front-nav-logopic">-->
                <img src="../images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="../images/guyun_logo.png" alt="logo" class="front-nav-logopic">
            </div>
        </i-col>
        <i-col span="11" class="login-nav-font">登录</i-col>
        <i-col span="4" class="login-nav">
            <i-button v-link="{path:'/index'}" type="text" id="color">返回首页</i-button>
            |
            <i-button v-link="{path:'/clause'}" type="text">服务条款</i-button>
        </i-col>
    </Row>
</template>

<style scoped>

</style>

<script>
    export default {
        components: {},
        data () {
            return {}
        },
        methods: {},
        ready () {

        }
    }
</script>