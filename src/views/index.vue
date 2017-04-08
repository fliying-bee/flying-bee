
<template>
    <!--网页头部-->
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="11">
            <i-button v-link="{path:'/login'}" type="text" class="header-login" id="color">hi，请登录</i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">免费注册</i-button>
        </i-col>
        <i-col span="8">
            <i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>
            <i-button v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
        </i-col>
    </Row>

</template>
<style scoped>

</style>
<script>
    export default {
        components: {

        },
        data () {
            return {
                search:''
            }
        },
        methods: {

        },
        ready () {

        }
    }
</script>
