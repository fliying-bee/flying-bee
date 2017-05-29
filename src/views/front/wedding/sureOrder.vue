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

        <Row type="flex" align="middle" justify="center" class="sureOrder-title"
             v-if="proType=='buy'||proType=='custom'">
            <i-col span="8">商品名</i-col>
            <i-col span="4">单价</i-col>
            <i-col span="4">数量</i-col>
            <i-col span="4">型号</i-col>
            <i-col span="4">小计</i-col>
        </Row>
        <Row type="flex" align="middle" justify="center" class="sureOrder-title" v-if="proType=='rent'">
            <i-col span="8">商品名</i-col>
            <i-col span="3">租赁单价</i-col>
            <i-col span="3">押金</i-col>
            <i-col span="2">数量</i-col>
            <i-col span="3">型号</i-col>
            <i-col span="2">租期&nbsp;/&nbsp;天</i-col>
            <i-col span="3">小计</i-col>
        </Row>
        <div>
            <div v-if="proType=='buy'">
                <div v-for="product in buyList">
                    <Row type="flex" align="middle" justify="center" class="sureOrder-item"
                         v-if="product.isChecked">
                        <i-col span="2">
                            <img :src="product.proPicPath" alt="" class="sureOrder-pic">
                        </i-col>
                        <i-col span="6">{{product.proName}}</i-col>
                        <i-col span="4">{{product.proSellPrice}}</i-col>
                        <i-col span="4">{{product.proDetailCount}}</i-col>
                        <i-col span="4">{{product.proDetailType}}</i-col>
                        <i-col span="4" class="main-color bold">{{product.priceSum}}</i-col>
                    </Row>
                </div>
            </div>
            <div v-if="proType=='rent'">
                <div v-for="product in rentList">
                    <Row type="flex" align="middle" justify="center" class="sureOrder-item"
                         v-if="product.isChecked">
                        <i-col span="2">
                            <img :src="product.proPicPath" alt="" class="sureOrder-pic">
                        </i-col>
                        <i-col span="6">{{product.proName}}</i-col>
                        <i-col span="3">{{product.rentPrice}}</i-col>
                        <i-col span="3">{{product.pledge}}</i-col>
                        <i-col span="2">{{product.proDetailCount}}</i-col>
                        <i-col span="3">{{product.proDetailType}}</i-col>
                        <i-col span="2">{{product.rentTime}}</i-col>
                        <i-col span="3" class="main-color bold">{{product.priceSum}}</i-col>
                    </Row>
                </div>
            </div>
            <div v-if="proType=='custom'">
                <div v-for="product in customList">
                    <Row type="flex" align="middle" justify="center" class="sureOrder-item"
                         v-if="product.isChecked">
                        <i-col span="2">
                            <img :src="product.proPicPath" alt="" class="sureOrder-pic">
                        </i-col>
                        <i-col span="6">{{product.proName}}</i-col>
                        <i-col span="4">{{product.proSellPrice}}</i-col>
                        <i-col span="4">{{product.proDetailCount}}</i-col>
                        <i-col span="4">{{product.proDetailType}}</i-col>
                        <i-col span="4" class="main-color bold">{{product.priceSum}}</i-col>
                    </Row>
                </div>
            </div>
            <Row type="flex" align="middle" justify="center" class="sureOrder-sum" v-if="proType=='custom'">
                <i-col span="24">
                    定制要求：
                    <i-input :value.sync="customMsg" type="textarea" placeholder="请输入..." style="width: 700px"></i-input>
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
                buyList:[],   //购买列表
                rentList:[],    //租赁列表
                customList:[],  //定制列表
                fromType:this.$route.params.fromType,   //从什么网页来（购物车，商品）
                proType:this.$route.params.proType,   //订单类型（购买租赁定制）
                orderPriceSum:0,            //订单总价
                userData:'',            //用户信息
                customMsg:'',           //定制要求
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
                if(self.proType=='buy'){
                    if(self.fromType=='product'){
                        var buyItem = sessionStorage.getItem('BUYITEM');
                        if(buyItem){
                            self.buyList.push(JSON.parse(buyItem));
                        }
                    }else if(self.fromType=='cart'){
                        var buyList = localStorage.getItem('BUYLIST');
                        if(buyList){
                            self.buyList = JSON.parse(buyList);
                        }
                    }
                    for(var i=0;i<self.buyList.length;i++){
                        if(self.buyList[i].isChecked){
                            self.orderPriceSum+=self.buyList[i].priceSum;
                        }
                    }
                }else if(self.proType=='rent'){
                    if(self.fromType=='product'){
                        var rentItem = sessionStorage.getItem('RENTITEM');
                        if(rentItem){
                            self.rentList.push(JSON.parse(rentItem));
                        }
                    }else if(self.fromType=='cart'){
                        var rentList = localStorage.getItem('RENTLIST');
                        if(rentList){
                            self.rentList = JSON.parse(rentList);
                        }
                    }
                    for(var i=0;i<self.rentList.length;i++){
                        if(self.rentList[i].isChecked){
                            self.orderPriceSum+=self.rentList[i].priceSum;
                        }
                    }
                }else if(self.proType=='custom'){
                    if(self.fromType=='product'){
                        var customItem = sessionStorage.getItem('CUSTOMITEM');
                        if(customItem){
                            self.customList.push(JSON.parse(customItem));
                        }
                    }else if(self.fromType=='cart'){
                        var customList = localStorage.getItem('CUSTOMLIST');
                        if(customList){
                            self.customList = JSON.parse(customList);
                        }
                    }
                    for(var i=0;i<self.customList.length;i++){
                        if(self.customList[i].isChecked){
                            self.orderPriceSum+=self.customList[i].priceSum;
                        }
                    }
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
                            for(var i=0;i<self.buyList.length;i++){
                                if(self.buyList[i].isChecked){
                                    var detailData = {
                                        buyId:buyId,
                                        proDetailId:self.buyList[i].proDetailId,
                                        proId:self.buyList[i].proId,
                                        buyDetailCount:self.buyList[i].proDetailCount,
                                        buyDetailType:self.buyList[i].proDetailType
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
                                        proDetailId:self.buyList[i].proDetailId,
                                        proDetailCount:self.buyList[i].proDetailCount,
                                        proDetailType:self.buyList[i].proDetailType
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/updateProductDetailCount',
                                        params:storeData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('更新商品明细库存失败！');
                                        }
                                    })
                                    var storePData = {
                                        proId:self.buyList[i].proId,
                                        proCount:self.buyList[i].proDetailCount
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/updateProductCount',
                                        params:storePData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('更新商品库存失败！');
                                        }
                                    })
                                }

                            }
                            self.$Message.success('提交成功！');
                            if(self.fromType=='product'){
                                sessionStorage.removeItem('BUYITEM');
                            }else if(self.fromType=='cart'){
                                var sList = []
                                for(var i=0;i<self.buyList.length;i++){
                                    if(!self.buyList[i].isChecked){
                                        sList.push(self.buyList[i])
                                    }
                                }
                                localStorage.setItem('BUYLIST',JSON.stringify(sList));
                            }
                            self.$router.go('/front/personCen/buyManage');
                        }else{
                            self.$Message.error('提交失败！');
                        }
                    })
                }else if(self.proType=='rent'){
                    var rentId = 'R'+self.getNowFormatDate();
                    var data = {
                        userId:localStorage.getItem('USERID'),
                        rentId:rentId,
                        rentPriceSum:self.orderPriceSum,
                        rentAddr:self.userData.userAddr+'('+self.userData.userName+'收)  '+self.userData.userTel,
                        rentTime:self.rentList[0].rentTime
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/insertRent',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.isLoading = false
                            for(var i=0;i<self.rentList.length;i++){
                                if(self.rentList[i].isChecked){
                                    var detailData = {
                                        rentId:rentId,
                                        proDetailId:self.rentList[i].proDetailId,
                                        proId:self.rentList[i].proId,
                                        rentDetailCount:self.rentList[i].proDetailCount,
                                        rentDetailType:self.rentList[i].proDetailType
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/insertRentDetail',
                                        params:detailData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('插入明细失败！');
                                        }
                                    })
                                    var storeData = {
                                        proDetailId:self.rentList[i].proDetailId,
                                        proDetailCount:self.rentList[i].proDetailCount,
                                        proDetailType:self.rentList[i].proDetailType
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/updateProductDetailCount',
                                        params:storeData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('更新商品明细库存失败！');
                                        }
                                    })
                                    var storePData = {
                                        proId:self.rentList[i].proId,
                                        proCount:self.rentList[i].proDetailCount
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/updateProductCount',
                                        params:storePData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('更新商品库存失败！');
                                        }
                                    })
                                }

                            }
                            self.$Message.success('提交成功！');
                            if(self.fromType=='product'){
                                sessionStorage.removeItem('RENTITEM');
                            }else if(self.fromType=='cart'){
                                var sList = []
                                for(var i=0;i<self.rentList.length;i++){
                                    if(!self.rentList[i].isChecked){
                                        sList.push(self.rentList[i])
                                    }
                                }
                                localStorage.setItem('RENTLIST',JSON.stringify(sList));
                            }
                            self.$router.go('/front/personCen/rentManage');
                        }else{
                            self.$Message.error('提交失败！');
                        }
                    })
                }else if(self.proType=='custom'){
                    var customId = 'C'+self.getNowFormatDate();
                    var data = {
                        userId:localStorage.getItem('USERID'),
                        customId:customId,
                        customPriceSum:self.orderPriceSum,
                        customAddr:self.userData.userAddr+'('+self.userData.userName+'收)  '+self.userData.userTel,
                        customMsg:self.customMsg
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/insertCustom',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.isLoading = false
                            for(var i=0;i<self.customList.length;i++){
                                if(self.customList[i].isChecked){
                                    var detailData = {
                                        customId:customId,
                                        proDetailId:self.customList[i].proDetailId,
                                        proId:self.customList[i].proId,
                                        customDetailCount:self.customList[i].proDetailCount,
                                        customDetailType:self.customList[i].proDetailType
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/insertCustomDetail',
                                        params:detailData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('插入明细失败！');
                                        }
                                    })
                                    var storeData = {
                                        proDetailId:self.customList[i].proDetailId,
                                        proDetailCount:self.customList[i].proDetailCount,
                                        proDetailType:self.customList[i].proDetailType
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/updateProductDetailCount',
                                        params:storeData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('更新商品明细库存失败！');
                                        }
                                    })
                                    var storePData = {
                                        proId:self.customList[i].proId,
                                        proCount:self.customList[i].proDetailCount
                                    };
                                    self.$http({
                                        method:'POST',
                                        url:'http://127.0.0.1:8080/Spring-study/updateProductCount',
                                        params:storePData
                                    }).then(function(res){
                                        if(res.data.code=="OK"){
                                            self.isLoading = false
                                        }else{
                                            self.$Message.error('更新商品库存失败！');
                                        }
                                    })
                                }

                            }
                            self.$Message.success('提交成功！');
                            if(self.fromType=='product'){
                                sessionStorage.removeItem('CUSTOMITEM');
                            }else if(self.fromType=='cart'){
                                var sList = []
                                for(var i=0;i<self.customList.length;i++){
                                    if(!self.customList[i].isChecked){
                                        sList.push(self.customList[i])
                                    }
                                }
                                localStorage.setItem('CUSTOMLIST',JSON.stringify(sList));
                            }
                            self.$router.go('/front/personCen/designManage');
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