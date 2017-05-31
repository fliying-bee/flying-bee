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

                <Menu active-key="1-1" width="auto" :open-keys="['1']">

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
                        <Breadcrumb-item href="#">信息管理</Breadcrumb-item>
                        <Breadcrumb-item>个人基本信息管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <i-col span="24">
                            <Card class="preson-info">
                                <div>
                                    <div class="preson-info-div">
                                        <div class="clearfix">
                                            <Icon type="edit" style="font-size: 22px;float: right;"
                                                  @click="isEdit=true" v-if="isEdit==false"></Icon>
                                            <Icon type="ios-undo" style="font-size: 22px;float: right;"
                                                  @click="isEdit=false" v-if="isEdit==true"></Icon>
                                        </div>
                                        <div class="person-item">
                                            <div class="person-label">
                                                <Icon type="social-snapchat"></Icon>
                                                <span class="person-Info-span">用户名</span>
                                            </div>
                                            <span v-if="isEdit==false">{{userData.userName}}</span>
                                            <i-input type="text" :value.sync="userNameE" v-else class="width80"></i-input>
                                        </div>
                                        <div class="person-item">
                                            <div class="person-label">
                                                <Icon type="android-person"></Icon>
                                                <span class="person-Info-span">性别</span>
                                            </div>
                                            <span v-if="userData.userSex=='female'&&isEdit==false">女</span>
                                            <span v-if="userData.userSex=='male'&&isEdit==false">男</span>
                                            <Radio-group :model.sync="userSexE" v-if="isEdit==true">
                                                <Radio value="male">男</Radio>
                                                <Radio value="female">女</Radio>
                                            </Radio-group>
                                        </div>
                                        <div class="person-item">
                                            <div class="person-label">
                                                <Icon type="ios-locked"></Icon>
                                                <span class="person-Info-span">密码</span>
                                            </div>
                                            <span v-if="isEdit==false">*************</span>
                                            <i-input type="text" :value.sync="passwordE" v-else class="width80"></i-input>
                                        </div>
                                        <div class="person-item">
                                            <div class="person-label">
                                                <Icon type="android-phone-portrait"></Icon>
                                                <span class="person-Info-span">手机</span>
                                            </div>
                                            <span v-if="isEdit==false">{{userData.userTel}}</span>
                                            <i-input type="text" :value.sync="userTelE" v-else class="width80"></i-input>
                                        </div>
                                    </div>
                                    <div class="person-item">
                                        <div class="person-label">
                                            <Icon type="ios-home"></Icon>
                                            <span class="person-Info-span">地址</span>
                                        </div>
                                        <span class="person-Info-address" v-if="isEdit==false">{{userData.userAddr}}</span>
                                        <i-input type="text" :value.sync="userAddrE" v-else class="width80"></i-input>
                                    </div>
                                    <div class="person-item" style="padding-left: 300px" v-if="isEdit==true">
                                        <i-button type="primary" @click="updateUser()">提交</i-button>
                                        <i-button type="ghost" style="margin-left: 5px" @click="isEdit=false">取消</i-button>
                                    </div>
                                </div>
                            </Card>
                        </i-col>
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
    .width80{
        width: 580px;
    }
    .preson-info{
        padding: 20px;
        font-size: 20px;
    }
    .preson-info-div{
        line-height: 32px;
    }
    .person-Info-span{
        width: 80px;
        display: inline-block;
    }
    .person-Info-address{
        display: inline-block;
    }
    .person-item{
        line-height: 32px;
        padding: 5px;
    }
    .person-label{
        width: 120px;
        display: inline-block;
    }
</style>

<script>
    export default {
        components: {},
        data () {
            return {
                userName:'',
                isLogin:false,
                isLoading:true,
                userId:'',
                userData:'',
                isEdit:false,
                userNameE:'',
                passwordE:'',
                userTelE:'',
                userAddrE:'',
                userSexE:''
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
            queryUserById(){
                var self = this;
                self.isLoading = true
                var data = {
                    userId:self.userId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryUserById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.userData = res.data.data
                        self.userNameE = self.userData.userName
                        self.passwordE = self.userData.password
                        self.userTelE = self.userData.userTel
                        self.userAddrE = self.userData.userAddr
                        self.userSexE = self.userData.userSex
                        self.isLoading = false
                    }else{
                        self.$Message.error('查询失败！');
                    }
                })
            },
            updateUser(){
                var self = this;
                self.isLoading = true
                var data = {
                    userId:self.userId,
                    userName:self.userNameE,
                    password:self.passwordE,
                    userTel:self.userTelE,
                    userAddr:self.userAddrE,
                    userSex:self.userSexE
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateUser',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryUserById();
                        self.$Message.success('修改成功！');
                        self.isEdit = false
                        self.isLoading = false
                    }else{
                        self.$Message.error('修改失败！');
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
            self.queryUserById();
        }
    }
</script>