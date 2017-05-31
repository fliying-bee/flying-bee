<template>
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="9">
            <i-button v-link="{path:'/login'}" type="text" class="header-login" id="color">hi，请登录</i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">免费注册</i-button>
        </i-col>
        <i-col span="6" offset="4">
            <i-button v-link="{path:'/index'}" type="text" id="color">返回首页</i-button>
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

                <Menu active-key="3-1" width="auto" :open-keys="['3']">

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
                        <Breadcrumb-item href="#">投稿管理</Breadcrumb-item>
                        <Breadcrumb-item>投稿管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <Row type="flex" align="middle" class="front-order-item-title">
                            <i-col span="2">稿件</i-col>
                            <i-col span="4">稿件名</i-col>
                            <i-col span="4">稿件作者</i-col>
                            <i-col span="14">描述</i-col>

                        </Row>
                        <div v-for="draft in draftList">
                            <div >
                                <Row type="flex" align="middle" class="front-order-item-title">
                                    <i-col span="4">
                                        稿件号：<span>{{draft.draId}}</span>
                                    </i-col>
                                    <i-col span="3">
                                        状态：
                                        <span v-if="draft.draCheck=='passed'">已通过</span>
                                        <span v-if="draft.draCheck=='notpass'">未通过</span>
                                        <span v-if="draft.draCheck=='notcheck'">未审核</span>
                                    </i-col>
                                    <i-col span="3">
                                        金额：<span>￥{{draft.draPrice}}</span>
                                    </i-col>
                                </Row>

                                <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                    <i-col span="2">
                                        <img :src="draft.draPicPath" alt="" class="sureOrder-pic">
                                    </i-col>
                                    <i-col span="4">{{draft.draName}}</i-col>
                                    <i-col span="4">{{draft.drAuthor}}</i-col>
                                    <i-col span="14">{{draft.draDesc}}</i-col>
                                </Row>
                                <div class="front-order-title" style="border-top:none;">

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
                search:'',
                draftList:[],
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
                self.queryAllDraft();
            },
            queryAllDraft(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize,
                    userId:self.userId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllDraftPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.draftList = res.data.data.list;
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
            self.queryAllDraft()
        }
    }
</script>