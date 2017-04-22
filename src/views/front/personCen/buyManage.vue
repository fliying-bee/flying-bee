<template>
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="9">
            <i-button v-link="{path:'/login'}" type="text" class="header-login" id="color">hi，请登录</i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">免费注册</i-button>
        </i-col>
        <i-col span="10">
            <i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>
            <i-button v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
            <i-button v-link="{path:'/index'}" type="text" id="color">返回首页</i-button>
        </i-col>
    </Row>
    <div class="front-index-bg">
        <Row type="flex">
            <i-col span="5" class="back-menu-left">
                <Menu active-key="2-1" width="auto" :open-keys="['2']">
                    <Submenu key="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            信息管理
                        </template>
                        <Menu-item key="1-1" v-link="{path:'/front/personCen/personInformation'}">个人基本信息管理</Menu-item>
                    </Submenu>
                    <Submenu key="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            订单管理
                        </template>
                        <Menu-item key="2-1" v-link="{path:'/front/personCen/buyManage'}">购买管理</Menu-item>
                        <Menu-item key="2-2" v-link="{path:'/front/personCen/designManage'}">定制管理</Menu-item>
                        <Menu-item key="2-3" v-link="{path:'/front/personCen/rentManage'}">租赁管理</Menu-item>
                    </Submenu>
                    <Submenu key="3">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            投稿管理
                        </template>
                        <Menu-item key="3-1" v-link="{path:'/front/personCen/draftManage'}">投稿管理</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="back-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">个人中心</Breadcrumb-item>
                        <Breadcrumb-item href="#">订单管理</Breadcrumb-item>
                        <Breadcrumb-item>购买管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <Row type="flex" align="middle" justify="center" class="front-order-title">
                            <i-col span="9">商品名</i-col>
                            <i-col span="5">单价</i-col>
                            <i-col span="5">数量</i-col>
                            <i-col span="5">型号</i-col>
                        </Row>
                        <div>
                            <Row type="flex" align="middle" class="front-order-item-title">
                                <i-col span="1">
                                    <Checkbox
                                            :indeterminate="indeterminate"
                                            :checked="checkAll"
                                            @click.prevent="handleCheckAll">
                                    </Checkbox>
                                </i-col>
                                <i-col span="2">
                                    <span class="bold">
                                        2017-04-22
                                    </span>
                                </i-col>
                                <i-col span="4">
                                    订单号：<span>D201704220001</span>
                                </i-col>
                                <i-col span="2">
                                    已付款
                                </i-col>
                                <i-col span="3">
                                    金额：<span>599.80</span>
                                </i-col>
                                <i-col span="1" offset="9">
                                    <Icon type="ios-trash" class="front-order-item-delete"></Icon>
                                    <!--<i-button type="text">付款</i-button>-->
                                </i-col>
                            </Row>

                            <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                <i-col span="9">商品1xxxxxxxxxxxxxxxxxxxxx</i-col>
                                <i-col span="5">299.90</i-col>
                                <i-col span="5">1</i-col>
                                <i-col span="5">L</i-col>
                            </Row>
                            <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                <i-col span="9">商品2xxxxxxxxxxxxxxxxxxxxx</i-col>
                                <i-col span="5">299.90</i-col>
                                <i-col span="5">1</i-col>
                                <i-col span="5">M</i-col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div class="back-copy">
                    2016-2017 &copy; 古韵婚纱
                </div>
            </i-col>
        </Row>
    </div>

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