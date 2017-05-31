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
                                            <Icon type="edit" style="font-size: 22px;float: right;"></Icon>
                                        </div>
                                        <div >
                                            <Icon type="social-snapchat"></Icon>
                                            <span class="person-Info-span">用户名</span>
                                            <span>test01</span>
                                        </div>
                                        <div>
                                            <Icon type="android-person"></Icon>
                                            <span class="person-Info-span">性别</span>
                                            <span>女</span>
                                            <Icon type="female"></Icon>
                                        </div>
                                        <div>
                                        <Icon type="ios-locked"></Icon>
                                        <span class="person-Info-span">密码</span>
                                        <span>*************</span>
                                        </div>
                                        <div>
                                            <Icon type="email"></Icon>
                                            <span class="person-Info-span">邮箱</span>
                                            <span>test@163.com</span>
                                        </div>
                                        <div>
                                            <Icon type="android-phone-portrait"></Icon>
                                            <span class="person-Info-span">手机</span>
                                            <span>139XXXXXXXX</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Icon type="ios-home"></Icon>
                                        <span class="person-Info-span">地址</span>
                                        <span class="person-Info-address">江西省南昌市昌北经济技术开发区麦庐校区</span>
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
</template>

<style scoped>
.preson-info{
    padding: 20px;
    font-size: 20px;
}
.preson-info-div{
    line-height: 40px;
}
.person-Info-span{
    width: 80px;
    display: inline-block;
}
.person-Info-address{
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
        }
    }
</script>