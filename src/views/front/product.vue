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
        <Menu mode="horizontal" active-key="1">
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

    <!--商品详情-->
    <div class="front-product-wrap">
        <Row class="front-product-intro">
            <i-col span="8" offset="2">
                <div class="front-product-mpic-wrap">
                    <img src="/src/images/test0.jpg" alt="" class="front-product-mpic">
                </div>
            </i-col>
            <i-col span="12" class="front-product-introl">
                <div class="front-product-title">
                    honeyGIRL2017夏季新款女鞋粗跟高跟鞋女中跟鞋一字扣带凉鞋包跟
                </div>
                <div class="front-product-pricewrap">
                    <div class="front-product-price">
                        价格：
                        <span class="front-product-symbol">¥</span>
                        <span class="front-product-pricep">282.00</span>
                    </div>
                    <div class="front-product-prices">
                        促销价：
                        <span class="front-product-symbols">¥</span>
                        <span class="front-product-pricesp">169.00</span>
                    </div>
                </div>
                <div class="front-product-typewrap">
                    <span class="front-product-type">尺码：</span>
                    <span class="front-product-type-item front-product-type-selected">S</span>
                    <span class="front-product-type-item">M</span>
                    <span class="front-product-type-item">L</span>
                    <span class="front-product-type-item">X L</span>
                </div>
                <div class="front-product-sumwrap">
                    <span class="front-product-sum">数量：</span>
                    <span class="front-product-sum-item">
                    <Input-number :min="1" :value="1"></Input-number>
                </span>
                    <span class="front-product-sum-item">库存 5290 件</span>
                </div>
                <div class="front-product-btnwrap">
                    <a href="" class="front-product-btn">立刻购买</a>
                    <a href="" class="front-product-btncart">加入购物车</a>
                </div>
            </i-col>
        </Row>

        <Row class="front-product-intro">
            <i-col span="20" offset="2" class="front-product-introt">
                商品详情
            </i-col>
        </Row>
        <Row>
            <i-col span="20" offset="2" class="front-product-introd">
                <div>
                    <span>商品名：</span>
                    <span>
                    商品名1XXXXXXXXXXXXXXXX
                </span>
                </div>
                <div>
                    <span>商品描述：</span>
                    <span>
                    商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
                    商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
                </span>
                </div>
            </i-col>
        </Row>
        <Row>
            <i-col span="20" offset="2" class="front-product-introd">
                <div class="front-product-introdpic">
                    <img src="/src/images/test1.jpg" alt="">
                </div>
            </i-col>
        </Row>
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