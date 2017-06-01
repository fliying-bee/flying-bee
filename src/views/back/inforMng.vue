<template>
    <!--网页头部-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="../../images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../../images/guyun_logo.png" alt="logo" class="back-header-logopic">
        </div>
        <div class="back-header-nav">
            <Dropdown v-if="isLogin">
                <i-button type="text" class="header-hover">
                    您好，{{empName}}
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list">
                    <Dropdown-item v-link="{path:'/back/backPersonInfor'}">个人中心</Dropdown-item>
                    <Dropdown-item @click="loginOut()">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <i-button v-else v-link="{path:'/back/backPersonInfor'}" type="text" class="header-hover">个人中心</i-button>
        </div>
    </div>

    <div class="front-index-bg">
        <Row type="flex">
            <i-col span="5" class="back-menu-left">

                <Menu active-key="1-3" width="auto" :open-keys="['1']">

                    <Submenu key="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            客户管理
                        </template>
                        <Menu-item key="1-1" v-link="{path:'/back/orderMng'}">订单管理</Menu-item>
                        <Menu-item key="1-2" v-link="{path:'/back/collectDraftMng'}">设计收稿</Menu-item>
                        <Menu-item key="1-3" v-link="{path:'/back/inforMng'}">信息管理</Menu-item>
                    </Submenu>
                    <Submenu key="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            运营管理
                        </template>
                        <Menu-item key="2-1" v-link="{path:'/back/commodityMng'}">商品管理</Menu-item>
                        <Menu-item key="2-2" v-link="{path:'/back/purchaseMng'}">采购管理</Menu-item>
                        <Menu-item key="2-3" v-link="{path:'/back/factoryMng'}">厂家管理</Menu-item>
                        <Menu-item key="2-4" v-link="{path:'/back/empMng'}">员工管理</Menu-item>
                        <Menu-item key="2-5" v-link="{path:'/back/formMng'}">报表管理</Menu-item>
                        <Menu-item key="2-6" v-link="{path:'/back/powerMng'}">权限管理</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="back-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">后台管理</Breadcrumb-item>
                        <Breadcrumb-item href="#">客户管理</Breadcrumb-item>
                        <Breadcrumb-item>信息管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <div class="back-order-search">
                            <Row type="flex"  align="middle">
                                <i-col span="2">用户编码：</i-col>
                                <i-col span="4">
                                    <i-input :value.sync="search"
                                             icon="ios-search"
                                             style="width: 200px"
                                             @on-click="queryUserById"></i-input>
                                </i-col>
                            </Row>
                            </div>
                            <div>
                                <Row type="flex" align="middle" class="front-order-item-title">
                                    <i-col span="4">用户编码</i-col>
                                    <i-col span="4">用户名</i-col>
                                    <i-col span="4">性别</i-col>
                                    <i-col span="4">联系方式</i-col>
                                    <i-col span="8">地址</i-col>
                                </Row>

                                <Row type="flex" align="middle" justify="center"
                                     class="front-order-item-content" v-for="user in userList">
                                    <i-col span="4">
                                        {{user.userId}}
                                    </i-col>
                                    <i-col span="4">
                                        {{user.userName}}
                                    </i-col>
                                    <i-col span="4">
                                        <span v-if="user.userSex==''">--</span>
                                        <span v-if="user.userSex=='female'">女</span>
                                        <span v-if="user.userSex=='male'">男</span>
                                    </i-col>
                                    <i-col span="4">
                                        <span v-if="user.userTel!=''">{{user.userTel}}</span>
                                        <span v-else>--</span>
                                    </i-col>
                                    <i-col span="8">
                                        <span v-if="user.userAddr!=''">{{user.userAddr}}</span>
                                        <span v-else>--</span>
                                    </i-col>
                                </Row>
                                <Page show-total class="page-position"
                                      :current="page.currentPage"
                                      :total="page.totalRow" :page-size="page.pageSize"
                                      @on-change="pageChange"></Page>
                            </div>
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
            return {
                //分页及其他固定项
                page:{
                    currentPage:1,
                    pageSize:6,
                    totalPage:1,
                    totalRow:0
                },
                search:'',
                empName:'',
                isLogin:false,
                isLoading:true,
                userList:[],//用户列表
            }
        },
        methods: {
            loginOut(){
                var self = this;
                localStorage.removeItem('EMPNAME');
                localStorage.removeItem('EMPID');
                self.$Message.success('退出成功！');
                setTimeout(()=>{
                    self.$router.go('/login');
                    self.isLogin = false;
                },1000);
            },
            queryAllUser(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllUserPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.userList = res.data.data.list;
                        self.page.currentPage = res.data.data.currentPage;
                        self.page.pageSize = res.data.data.pageSize;
                        self.page.totalPage = res.data.data.totalPage;
                        self.page.totalRow = res.data.data.totalRow;
                        self.isLoading = false
                    } else {
                        self.$Message.error('权限查询错误！');
                    }
                })
            },
            queryUserById(){
                var self = this
                if(self.search==''){
                    self.queryAllUser()
                }else{
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        userId:self.search
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/queryUserById',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.userList = [];
                            if(res.data.data!=null){
                                self.userList.push(res.data.data)
                            }
                            self.page.totalRow = self.userList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        }else{
                            self.$Message.error('查询失败！');
                        }
                    })
                }
            },
            pageChange(num){
                var self = this;
                self.page.currentPage = num;
                self.queryAllUser();
            }
        },
        ready () {
            var self = this;
            if(localStorage.getItem('EMPNAME')){
                self.empName = localStorage.getItem('EMPNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            self.queryAllUser();
        }
    }
</script>