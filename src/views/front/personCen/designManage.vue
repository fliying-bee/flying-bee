<template>
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="14">
            <i-button v-link="{path:'/login'}"  type="text" class="header-login" id="color">
                <span v-if="!isLogin">hi，请登录</span>
            </i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">
                <span v-if="!isLogin">免费注册</span>
            </i-button>
        </i-col>
        <i-col span="5">
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
            <Dropdown v-if="isLogin">
                <i-button type="text" class="header-hover">
                    您好，{{userName}}
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list" class="header-drop">
                    <Dropdown-item v-link="{path:'/personCenter'}">个人中心</Dropdown-item>
                    <Dropdown-item v-link="{path:'/index'}">返回首页</Dropdown-item>
                    <Dropdown-item @click="loginOut()">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <i-button v-else v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>

        </i-col>
    </Row>
    <div class="front-index-bg">
        <Row type="flex">
            <i-col span="5" class="back-menu-left">
                <Menu active-key="2-2" width="auto" :open-keys="['2']">

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
                        <Breadcrumb-item>定制管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <Row type="flex" align="middle" justify="center" class="front-order-title">
                            <i-col span="9">商品名</i-col>
                            <i-col span="5">单价</i-col>
                            <i-col span="5">数量</i-col>
                        </Row>
                        <div v-for="order in customList">
                            <div v-if="order.customStatus!='cancel'">
                                <Row type="flex" align="middle" class="front-order-item-title1">
                                    <i-col span="2">
                                    <span class="bold">
                                        {{order.customOrderTime}}
                                    </span>
                                    </i-col>
                                    <i-col span="4">
                                        订单号：<span>{{order.customId}}</span>
                                    </i-col>
                                    <i-col span="2">
                                        <span v-if="order.customCheck=='passed'">已审核通过</span>
                                        <span v-if="order.customCheck=='notpass'">未通过</span>
                                        <span v-if="order.customCheck=='notcheck'">未审核</span>

                                    </i-col>
                                    <i-col span="2" v-if="order.customCheck=='passed'">
                                        <span v-if="order.customStatus=='notpay'">未付款</span>
                                        <span v-if="order.customStatus=='paid'">已付款</span>
                                    </i-col>
                                    <i-col span="2" v-if="order.customCheck=='passed'&&order.customStatus=='paid'">
                                        <span v-if="order.logisStatus=='notsend'">未发货</span>
                                        <span v-if="order.logisStatus=='sended'">已发货</span>
                                        <span v-if="order.logisStatus=='received'">已收货</span>
                                    </i-col>
                                    <i-col span="3">
                                        金额：<span>￥{{order.customPriceSum}}</span>
                                    </i-col>
                                </Row>
                                <div class="front-order-item-addr">
                                    地址：{{order.customAddr}}
                                </div>

                                <Row type="flex" align="middle" justify="center" class="front-order-item-content"
                                     v-for="product in order.customDetail">
                                    <i-col span="2">
                                        <img :src="product.product.proPicPath" alt="" class="sureOrder-pic">
                                    </i-col>
                                    <i-col span="6">{{product.product.proName}}</i-col>
                                    <i-col span="4">￥{{product.product.proSellPrice}}</i-col>
                                    <i-col span="4">{{product.customDetailCount}}</i-col>
                                    <i-col span="4">{{product.customDetailType}}</i-col>
                                    <i-col span="4" class="main-color bold">￥{{product.product.proSellPrice*product.customDetailCount}}</i-col>
                                </Row>
                                <div class="front-order-title clearfix" style="border-top:none;">
                                    <div class="front-order-btn">
                                        <i-button type="primary"
                                                  v-if="order.customCheck=='passed'&&order.customStatus=='paid'&&order.logisStatus=='sended'"
                                                  @click="updateCustomLogisStatus(order.customId)">收货</i-button>
                                        <i-button type="primary" v-if="order.customCheck=='passed'&&order.customStatus=='notpay'"
                                                  @click="updateCustomStatus(order.customId,'paid')">付款</i-button>
                                        <i-button type="ghost" v-if="order.customCheck=='passed'&&order.customStatus=='notpay'"
                                                  @click="updateCustomStatus(order.customId,'cancel')">取消订单</i-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Page show-total class="page-position"
                              :current="page.currentPage"
                              :total="page.totalRow" :page-size="page.pageSize"
                              @on-change="pageChange"></Page>
                    </div>
                </div>
                <div class="back-copy">
                    2016-2017 &copy; 古韵婚纱
                </div>
            </i-col>
        </Row>
    </div>
    <Spin fix v-if="isLoading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
</template>

<style scoped>

</style>

<script>
    export default {
        components: {},
        data () {
            return {
                page:{
                    currentPage:1,
                    pageSize:6,
                    totalPage:1,
                    totalRow:0
                },
                userName:'',
                isLogin:false,
                isLoading:true,
                customList:[],
                userId:''
            }
        },
        methods: {
            loginOut(){
                var self = this;
                localStorage.removeItem('USERNAME');
                localStorage.removeItem('USERID');
                self.$Message.success('退出成功！');
                setTimeout(()=>{
                    self.$router.go('/login');
                    self.isLogin = false;
                },1000);
            },
            pageChange(num){
                var self = this;
                self.page.currentPage = num;
                self.queryAllFactory();
            },
            queryAllCustomPage(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize,
                    userId:self.userId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllCustomPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.customList = res.data.data.list;
                        self.page.currentPage = res.data.data.currentPage;
                        self.page.pageSize = res.data.data.pageSize;
                        self.page.totalPage = res.data.data.totalPage;
                        self.page.totalRow = res.data.data.totalRow;
                        self.isLoading = false
                    } else {
                        self.$Message.error('查询错误！');
                    }
                })
            },
            updateCustomLogisStatus(customId){
                var self = this;
                var data = {
                    customId:customId,
                    logisStatus:'sended'
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateCustomLogisStatus',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryAllCustomPage();
                        self.$Message.success('发货成功！');
                    }else{
                        self.$Message.error('发货失败！');
                    }
                })
            },
            updateCustomStatus(customId,status){
                var self = this;
                var data = {
                    customId:customId,
                    customStatus:status
                };
                console.log(data)
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateCustomStatus',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryAllCustomPage();
                        self.$Message.success('付款成功！');
                    }else{
                        self.$Message.error('付款失败！');
                    }
                })
            }
        },
        ready () {
            var self = this;
            if(localStorage.getItem('USERNAME')){
                self.userName = localStorage.getItem('USERNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            if(localStorage.getItem('USERID')) {
                self.userId = localStorage.getItem('USERID');
            }
            self.queryAllCustomPage()
        }
    }
</script>