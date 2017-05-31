<template>
    <!--网页头部-->
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
                    <Dropdown-item @click="loginOut()">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <i-button v-else v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>

        </i-col>
    </Row>

    <!--首页nav-->
    <div class="front-nav">
        <Menu mode="horizontal" active-key="4">
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
                    <Menu-item key="2-1">定制</Menu-item>
                    <Menu-item key="2-2">购买</Menu-item>
                    <Menu-item key="2-3">租赁</Menu-item>
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
    <Row justify="start" align="middle" class="front-content">
        <Card class="product-card-event">
            <i-col span="13">
                <div>
                    <img src="/src/images/newevent.png" class="product-card-eventpic">
                </div>
            </i-col>
            <i-col span="11">
                <div class="product-card-event-content">
                    <div class="product-card-event-title">最新活动一</div>
                    <div class="product-card-event-desc">一套基于 Vue.js 的高质量UI组件库一套基于 Vue.js 的高质量UI组件库一套基于 Vue.js 的高质量UI组件库一套基于 Vue.js 的高质量UI组件库</div>
                </div>
            </i-col>
        </Card>
    </Row>
    <Row justify="start" align="middle" class="front-content">
        <i-col span="6">
            <Card class="product-card">
                <div>
                    <img src="/src/images/yangtu.png" class="product-cardpic">
                    <div class="product-card-title">
                        一套基于 Vue.js 的高质量UI组件库
                    </div>
                    <div class="product-card-desc">
                        一套基于 Vue.js 的高质量UI组件库一套基于 Vue.js 的高质量UI组件库
                    </div>
                </div>
            </Card>
        </i-col>
        <i-col span="6">
            <Card class="product-card">
                <div>
                    <img src="/src/images/yangtu.png" class="product-cardpic">
                    <div class="product-card-title">
                        一套基于 Vue.js 的高质量UI组件库
                    </div>
                    <div class="product-card-desc">
                        一套基于 Vue.js 的高质量UI组件库一套基于 Vue.js 的高质量UI组件库
                    </div>
                </div>
            </Card>
        </i-col>
        <i-col span="6">
            <Card class="product-card">
                <div>
                    <img src="/src/images/yangtu.png" class="product-cardpic">
                    <div class="product-card-title">
                        一套基于 Vue.js 的高质量UI组件库
                    </div>
                    <div class="product-card-desc">
                        一套基于 Vue.js 的高质量UI组件库一套基于 Vue.js 的高质量UI组件库
                    </div>
                </div>
            </Card>
        </i-col>
        <i-col span="6">
            <Card class="product-card">
                <div>
                    <img src="/src/images/yangtu.png" class="product-cardpic">
                    <div class="product-card-title">
                        一套基于 Vue.js 的高质量UI组件库1111
                    </div>
                    <div class="product-card-desc">
                        一套基于 Vue.js 的高质量UI组件库一套基于 Vue.js 的高质量UI组件库
                    </div>
                </div>
            </Card>
        </i-col>
    </Row>
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

</template>

<style scoped>

</style>

<script>
    export default {
        components: {},
        data () {
            return {
                userName:'',
                isLogin:false
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
        }
    }
</script>