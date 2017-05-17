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
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
            <Dropdown>
                <i-button type="text" class="header-hover">
                    您好，XXX
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list" class="header-drop">
                    <Dropdown-item v-link="{path:'/personCenter'}">个人中心</Dropdown-item>
                    <Dropdown-item>退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <!--<i-button v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>-->

        </i-col>
    </Row>

    <!--首页nav-->
    <div class="front-nav">
        <Menu mode="horizontal" active-key="2-3">
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

    <!--类型一-->
    <Row justify="center" align="middle">
        <i-col span="24">
            <div class="content-title">
                婚纱礼服
            </div>
        </i-col>
    </Row>
    <div class="product-card-wrap clearfix">
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
    </div>

    <!--类型二-->
    <Row justify="center" align="middle">
        <i-col span="24">
            <div class="content-title">
                唯美配饰
            </div>
        </i-col>
    </Row>
    <div class="product-card-wrap clearfix">
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
        <Card class="product-card">
            <div>
                <img src="/src/images/yangtu.png" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">¥169.00</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">282.00</span>
                </div>
                <div class="product-card-desc">
                    商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一商品一
                </div>
            </div>
        </Card>
    </div>

    <Back-top></Back-top>
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
            return {}
        },
        methods: {},
        ready () {

        }
    }
</script>