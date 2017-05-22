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
                <a href="/front/personCen/personInformation" target="_blank">管理收货地址</a>
            </i-col>
        </Row>
        <div class="sureOrder-addr">
            <span class="main-color">
                <Icon type="ios-location"></Icon>
                寄送至：
            </span>
            <span v-if="userData.userAddr!=null&userData.userTel!=null">
                {{userData.userAddr}}&nbsp;({{userData.userName}}收)&nbsp;&nbsp;&nbsp;{{userData.userTel}}
            </span>
            <span v-else>
                尚无地址，请填写地址
            </span>
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
            <Row type="flex" align="middle" justify="center" class="sureOrder-item"
                 v-for="product in orderList">
                <i-col span="2">
                    <img :src="product.proPicPath" alt="" class="sureOrder-pic">
                </i-col>
                <i-col span="6">{{product.proName}}</i-col>
                <i-col span="4">{{product.proSellPrice}}</i-col>
                <i-col span="4">{{product.proDetailCount}}</i-col>
                <i-col span="4">{{product.proDetailType}}</i-col>
                <i-col span="4" class="main-color bold">{{product.priceSum}}</i-col>
            </Row>

            <Row type="flex" align="middle" justify="center" class="sureOrder-sum">
                <i-col span="24">
                    留言：
                    <i-input :value.sync="value" type="textarea" placeholder="请输入..." style="width: 700px"></i-input>
                </i-col>
            </Row>
            <div class="sureOrder-pay">
                订单合计：<span class="money-symbols">¥{{orderPriceSum}}</span>
            </div>
            <div class="sureOrder-btn">
                <i-button type="primary" @click="order()">提交订单</i-button>
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
            return {
                userName:'',
                isLogin:false,
                isLoading:true,
                orderList:[],   //商品列表
                fromType:this.$route.params.fromType,   //从什么网页来（购物车，商品）
                proType:this.$route.params.proType,   //订单类型（购买租赁定制）
                orderPriceSum:0,            //订单总价
                userData:'',            //用户信息
            }
        },
        methods: {
            getNowFormatDate() {
                var date = new Date();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var second = date.getSeconds();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                if (minute >= 0 && minute <= 9) {
                    minute = "0" + minute;
                }
                if (second >= 0 && second <= 9) {
                    second = "0" + second;
                }
                var currentdate = date.getFullYear() + month + strDate
                        + hour + minute + second;
                return currentdate;
            },
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
            loadOrder(){
                var self = this
                if(self.fromType=='product'){
                    var orderItem = sessionStorage.getItem('ORDERITEM');
                    if(orderItem){
                        self.orderList.push(JSON.parse(orderItem));
                    }
                }
                for(var i=0;i<self.orderList.length;i++){
                    self.orderPriceSum+=self.orderList[i].priceSum;
                }
            },
            queryUserInfo(){
                var self = this
                self.isLoading = true
                var data = {
                    userId:localStorage.getItem('USERID')
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryUserById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.userData = res.data.data;
                        self.isLoading = false
                    }else{
                        self.$Message.error('查询失败！');
                    }
                })
            },
            order(){
                var self = this
                self.isLoading = true
                if(self.proType=='buy'){
                    var buyId = 'B'+self.getNowFormatDate();
                    var data = {
                        userId:localStorage.getItem('USERID'),
                        buyId:buyId,
                        buyPriceSum:self.orderPriceSum,
                        buyAddr:self.userData.userAddr+'('+self.userData.userName+'收)  '+self.userData.userTel
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/insertBuy',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.isLoading = false
                            for(var i=0;i<self.orderList.length;i++){
                                var detailData = {
                                    buyId:buyId,
                                    proId:self.orderList[i].proId,
                                    buyDetailCount:self.orderList[i].proDetailCount,
                                    buyDetailType:self.orderList[i].proDetailType
                                };
                                self.$http({
                                    method:'POST',
                                    url:'http://127.0.0.1:8080/Spring-study/insertBuyDetail',
                                    params:detailData
                                }).then(function(res){
                                    if(res.data.code=="OK"){
                                        self.isLoading = false
                                    }else{
                                        self.$Message.error('插入明细失败！');
                                    }
                                })
                                var storeData = {
                                    proId:self.orderList[i].proDetail.proId,
                                    proDetailId:self.orderList[i].proDetail.proDetailId,
                                    proDetailCount:self.orderList[i].proDetail.proDetailCount-self.orderList[i].proDetailCount,
                                    proDetailType:self.orderList[i].proDetail.proDetailType
                                };
                                self.$http({
                                    method:'POST',
                                    url:'http://127.0.0.1:8080/Spring-study/updateProductDetail',
                                    params:storeData
                                }).then(function(res){
                                    if(res.data.code=="OK"){
                                        self.isLoading = false
                                    }else{
                                        self.$Message.error('更新库存失败！');
                                    }
                                })
                            }
                            self.$Message.success('提交成功！');
                            sessionStorage.removeItem('ORDERITEM');
                            self.$router.go('/front/personCen/buyManage');
                        }else{
                            self.$Message.error('提交失败！');
                        }
                    })
                }
            }
        },
        ready () {
            var self = this
            if(localStorage.getItem('USERNAME')){
                self.userName = localStorage.getItem('USERNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            self.loadOrder();
            self.queryUserInfo();
        }
    }
</script>