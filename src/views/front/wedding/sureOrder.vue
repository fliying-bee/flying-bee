<template>
    <!--网页头部-->
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="14">
            <i-button v-link="{path:'/login'}" type="text" class="header-login" id="color">
                <span v-if="!isLogin">hi，请登录</span>
            </i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">
                <span v-if="!isLogin">免费注册</span>
            </i-button>
        </i-col>
        <i-col span="5">
            <!--<i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>-->
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
            <Dropdown v-if="isLogin">
                <i-button type="text" class="header-hover">
                    您好，{{userName}}
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list" class="header-drop">
                    <Dropdown-item v-link="{path:'/personCenter'}">个人中心</Dropdown-item>
                    <Dropdown-item @click="loginOut()">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <i-button v-else v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>

        </i-col>
    </Row>

    <!--首页nav-->
    <div class="front-nav">
        <Menu mode="horizontal" active-key="2-2">
            <div class="front-nav-logo">
                <img src="/src/images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="/src/images/guyun_logo.png" alt="logo" class="front-nav-logopic">
            </div>
            <div class="front-nav-item">
                <Menu-item key="1" v-link="{path:'/index'}">
                    <Icon type="home"></Icon>
                    首页
                </Menu-item>
                <Submenu key="2">
                    <template slot="title">
                        <Icon type="tshirt"></Icon>
                        婚纱礼服
                    </template>
                    <Menu-item key="2-1" v-link="{path:'/front/wedding/design'}">定制</Menu-item>
                    <Menu-item key="2-2" v-link="{path:'/front/wedding/buy'}">购买</Menu-item>
                    <Menu-item key="2-3" v-link="{path:'/front/wedding/rent'}">租赁</Menu-item>
                </Submenu>
                <Menu-item key="3" v-link="{path:'/front/design'}">
                    <Icon type="ios-copy"></Icon>
                    设计投稿
                </Menu-item>
                <Menu-item key="4" v-link="{path:'/front/events'}">
                    <Icon type="ios-flame"></Icon>
                    优惠活动
                </Menu-item>
                <Menu-item key="5" v-link="{path:'/contact'}">
                    <Icon type="android-call"></Icon>
                    联系我们
                </Menu-item>
            </div>
        </Menu>
    </div>
    <div class="sureOrder-wrap">
        <Row type="flex" align="middle" justify="center" class="sureOrder">
            <i-col span="4">
                确认收货地址
            </i-col>
            <i-col span="3" offset="17" class="font-normal">
                <a href="/front/personCen/personInformation" target="_blank">修改收货地址</a>
            </i-col>
        </Row>
        <div class="sureOrder-addr">
            <span class="main-color">
                <Icon type="ios-location"></Icon>
                寄送至：
            </span>
            XXXXXXXXXXXXXXXXXXXXX
        </div>

        <div class="sureOrder">
            确认订单
        </div>

        <Row type="flex" align="middle" justify="center" class="sureOrder-title">
            <i-col span="8">商品名</i-col>
            <i-col span="4">单价</i-col>
            <i-col span="4">数量</i-col>
            <i-col span="4">型号</i-col>
            <i-col span="4">小计</i-col>
        </Row>
        <div>
            <Row type="flex" align="middle" justify="center" class="sureOrder-item">
                <i-col span="2">
                    <img src="/src/images/yangtu.png" alt="" class="sureOrder-pic">
                </i-col>
                <i-col span="6">商品1xxxxxxxxxxxxxxxxxxxxx</i-col>
                <i-col span="4">299.90</i-col>
                <i-col span="4">1</i-col>
                <i-col span="4">L</i-col>
                <i-col span="4" class="main-color bold">299.90</i-col>
            </Row>
            <Row type="flex" align="middle" justify="center" class="sureOrder-item">
                <i-col span="2">
                    <img src="/src/images/yangtu.png" alt="" class="sureOrder-pic">
                </i-col>
                <i-col span="6">商品1xxxxxxxxxxxxxxxxxxxxx</i-col>
                <i-col span="4">299.90</i-col>
                <i-col span="4">1</i-col>
                <i-col span="4">L</i-col>
                <i-col span="4" class="main-color bold">299.90</i-col>
            </Row>
            <Row type="flex" align="middle" justify="center" class="sureOrder-sum">
                <i-col span="24">
                    留言：
                    <i-input :value.sync="value" type="textarea" placeholder="请输入..." style="width: 700px"></i-input>
                </i-col>
            </Row>
            <div class="sureOrder-pay">
                订单合计：<span class="money-symbols">¥169</span>
            </div>
            <div class="sureOrder-btn">
                <i-button type="primary">提交订单</i-button>
            </div>
        </div>
    </div>

    <Row class="front-footer">
        <i-col span="10">
            <div class="front-footer-logo">
                <img src="/src/images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="/src/images/guyun_logo.png" alt="logo" class="front-nav-logopic">
            </div>
        </i-col>
        <i-col span="14">
            <div class="front-footer-nav clearfix">
                <span class="front-footer-navitem" v-link="{path:'/index'}">首页</span>
                <span class="front-footer-navitem" v-link="{path:'/front/wedding/buy'}">婚纱礼服</span>
                <span class="front-footer-navitem" v-link="{path:'/front/design'}">设计投稿</span>
                <span class="front-footer-navitem" v-link="{path:'/front/events'}">优惠活动</span>
                <span class="front-footer-navitem" v-link="{path:'/contact'}">联系我们</span>
            </div>
            <div class="front-footer-address">
                古韵婚纱版权所有&nbsp;&nbsp;&nbsp;&nbsp;古韵婚纱有限公司 沪ICP备17001234号
                <br>
                地址:江西财经大学麦庐校区&nbsp;&nbsp;&nbsp;&nbsp;123号
            </div>
        </i-col>
    </Row>
    <Spin fix v-if="isLoading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
    <Back-top></Back-top>
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