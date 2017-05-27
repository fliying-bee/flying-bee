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

    <!--商品详情-->
    <div class="front-product-wrap">
        <Row class="front-product-intro">
            <i-col span="8" offset="2">
                <div class="front-product-mpic-wrap">
                    <img :src="productData.proPicPath" alt="" class="front-product-mpic">
                </div>
            </i-col>
            <i-col span="12" class="front-product-introl">
                <div class="front-product-title">
                    {{productData.proName}}
                </div>
                <div class="front-product-pricewrap" v-if="proType=='buy'||proType=='custom'">
                    <div class="front-product-price">
                        价格：
                        <span class="front-product-symbol">¥</span>
                        <span class="front-product-pricep">{{productData.proSalePrice}}</span>
                    </div>
                    <div class="front-product-prices">
                        促销价：
                        <span class="front-product-symbols">¥</span>
                        <span class="front-product-pricesp">{{productData.proSellPrice}}</span>
                    </div>
                </div>
                <div class="front-product-pricewrap" v-if="proType=='rent'">
                    <div class="front-product-price">
                        价格：
                        <span class="front-product-symbol">¥</span>
                        <span class="front-product-pricep">{{(productData.proSalePrice*0.07).toFixed(0)}}&nbsp;/&nbsp;天</span>
                    </div>
                    <div class="front-product-prices">
                        促销价：
                        <span class="front-product-symbols">¥</span>
                        <span class="front-product-pricesp">{{(productData.proSellPrice*0.07).toFixed(0)}}&nbsp;/&nbsp;天</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        押金：
                        <span class="front-product-symbols">¥</span>
                        <span class="front-product-pricesp">{{(productData.proSalePrice*0.5).toFixed(0)}}&nbsp;/&nbsp;天</span>
                    </div>
                </div>
                <div class="front-product-typewrap">
                    <span class="front-product-type">尺码：</span>
                    <div style="display: inline-block" id="proDetailType">
                       <span class="front-product-type-item"
                             :class="{'front-product-type-selected':($index==isFirst)}"
                             v-for="productDetail in productDetailData"
                             @click="changeProDetail(productDetail,$index)">
                        {{productDetail.proDetailType}}
                    </span>
                    </div>
                </div>
                <div class="front-product-sumwrap" v-if="proType=='buy'||proType=='custom'">
                    <span class="front-product-sum">数量：</span>
                    <span class="front-product-sum-item">
                        <Input-number :min="1" :value.sync="detailCount"></Input-number>
                    </span>
                    <span class="front-product-sum-item">库存 {{proDetailCount}} 件</span>
                </div>
                <div class="front-product-sumwrap" v-if="proType=='rent'">
                    <span class="front-product-sum">数量：</span>
                    <span class="front-product-sum-item">
                        <Input-number :min="1" :value.sync="detailCount"></Input-number>
                    </span>
                    <span class="front-product-sum-item">库存 {{proDetailCount}} 件</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="front-product-sum">租期：</span>
                    <span class="front-product-sum-item">
                        <Input-number :min="1" :max="7" :value.sync="rentTime"></Input-number>
                    </span>
                    <span class="front-product-sum-item">天</span>
                </div>
                <div class="front-product-btnwrap">
                    <span class="front-product-btn" v-if="proType=='buy'" @click="buy()">立刻购买</span>
                    <span class="front-product-btn" v-if="proType=='rent'" @click="rent()">立刻租赁</span>
                    <span class="front-product-btn" v-if="proType=='custom'" @click="custom()">立刻定制</span>
                    <span class="front-product-btncart" @click="cart()">加入购物车</span>
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
                        {{productData.proName}}
                    </span>
                </div>
                <div>
                    <span>商品描述：</span>
                    <span>
                        {{productData.proDesc}}
                    </span>
                </div>
                <div>
                    <span>商品总数：</span>
                    <span>
                        {{productData.proCount}}&nbsp;件
                    </span>
                </div>
                <div v-if="proType=='buy'||proType=='custom'">
                    <span>商品标价：</span>
                    <span>
                        ¥&nbsp;{{productData.proSalePrice}}
                    </span>
                </div>
                <div v-if="proType=='buy'||proType=='custom'">
                    <span>商品售价：</span>
                    <span>
                        ¥&nbsp;{{productData.proSellPrice}}
                    </span>
                </div>
                <div v-if="proType=='rent'">
                    <span>商品租金：</span>
                    <span>
                        ¥&nbsp;{{(productData.proSalePrice*0.07).toFixed(0)}}&nbsp;&nbsp;/&nbsp;天
                    </span>
                </div>
                <div v-if="proType=='rent'">
                    <span>商品租金促销价：</span>
                    <span>
                        ¥&nbsp;{{(productData.proSellPrice*0.07).toFixed(0)}}&nbsp;&nbsp;/&nbsp;天
                    </span>
                </div>
                <div v-if="proType=='rent'">
                    <span>商品押金：</span>
                    <span>
                        ¥&nbsp;{{(productData.proSalePrice*0.5).toFixed(0)}}&nbsp;&nbsp;/&nbsp;天
                    </span>
                </div>
                <div>
                    <span>商品类型：</span>
                    <span v-if="productData.proType=='dress'">
                        婚纱礼服
                    </span>
                    <span v-if="productData.proType=='part'">
                        唯美配饰
                    </span>
                </div>
            </i-col>
        </Row>
        <Row>
            <i-col span="20" offset="2" class="front-product-introd">
                <div class="front-product-introdpic">
                    <img :src="productData.proPicPath" alt="">
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
                search:'',
                userName:'',
                isLogin:false,
                isLoading:true,
                proId:this.$route.params.proId,
                proType:this.$route.params.type,
                productData:'',         //商品详情
                productDetailData:[],   //商品明细详情
                proDetailCount:0,       //当前选择的商品明细库存
                proDetailType:'',       //选择的商品类型
                proDetail:'',         //选择的商品详情
                isFirst:0,
                detailCount:1,          //商品件数
                rentTime:1,             //租期
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
            queryProductById(){
                var self = this
                self.isLoading = true
                var data = {
                    proId:self.proId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryProductById',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.productData = res.data.data;
                        self.isLoading = false
                    } else {
                        self.$Message.error('商品查询错误！');
                    }
                })
            },
            queryProductDetailByProId(){
                var self = this
                self.isLoading = true
                var data = {
                    proId:self.proId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryProductDetailByProId',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.productDetailData = res.data.data;
                        if(self.productDetailData.length!=0){
                            self.proDetail = self.productDetailData[0]
                            self.proDetailCount = self.productDetailData[0].proDetailCount;
                            self.proDetailType = self.productDetailData[0].proDetailType;
                            self.isFirst=0;
                            }
                        self.isLoading = false
                    } else {
                        self.$Message.error('商品明细查询错误！');
                    }
                })
            },
            changeProDetail(proDetail,index){
                var self = this
                self.proDetailCount = proDetail.proDetailCount;
                self.proDetailType = proDetail.proDetailType;
                self.proDetail = proDetail;
                var proDetailTypeWrap = document.getElementById('proDetailType');
                var spanList = proDetailTypeWrap.getElementsByTagName('span');
                var chooseSpan = spanList[index];
                for(var i=0;i<spanList.length;i++){
                    spanList[i].className = 'front-product-type-item'
                }
                chooseSpan.className = 'front-product-type-item front-product-type-selected'
                self.isFirst=null;
            },
            buy(){
                var self = this
                var buyItem={
                    proId:self.productData.proId,
                    proPicPath:self.productData.proPicPath,
                    proName:self.productData.proName,
                    proSellPrice:self.productData.proSellPrice,
                    proDetailId:self.proDetail.proDetailId,
                    proDetailCount:self.detailCount,
                    proDetailType:self.proDetailType,
                    priceSum:self.detailCount*self.productData.proSellPrice,
                    isChecked:true
                }
                sessionStorage.setItem('BUYITEM',JSON.stringify(buyItem));
                self.$router.go('/front/sureOrder/buy/product')
            },
            rent(){
                var self = this
                var rentItem={
                    proId:self.productData.proId,
                    proPicPath:self.productData.proPicPath,
                    proName:self.productData.proName,
                    rentPrice:(self.productData.proSellPrice*0.07).toFixed(0)-0,
                    pledge:(self.productData.proSellPrice*0.5).toFixed(0)-0,
                    proDetailId:self.proDetail.proDetailId,
                    proDetailCount:self.detailCount-0,
                    proDetailType:self.proDetailType,
                    rentTime:self.rentTime,
                    priceSum:(((self.productData.proSellPrice*0.07).toFixed(0))*self.detailCount*self.rentTime-0)+
                             ((self.productData.proSellPrice*0.5).toFixed(0)-0),
                    isChecked:true
                }

                sessionStorage.setItem('RENTITEM',JSON.stringify(rentItem));
                self.$router.go('/front/sureOrder/rent/product')
            },
            custom(){
                var self = this
                var customItem={
                    proId:self.productData.proId,
                    proPicPath:self.productData.proPicPath,
                    proName:self.productData.proName,
                    proSellPrice:self.productData.proSellPrice,
                    proDetailId:self.proDetail.proDetailId,
                    proDetailCount:self.detailCount,
                    proDetailType:self.proDetailType,
                    priceSum:self.detailCount*self.productData.proSellPrice,
                    isChecked:true
                }
                sessionStorage.setItem('CUSTOMITEM',JSON.stringify(customItem));
                self.$router.go('/front/sureOrder/custom/product')
            },
            cart(){
                var self = this
                if(self.proType=='buy'){
                    var buyItem = {
                        proId:self.productData.proId,
                        proPicPath:self.productData.proPicPath,
                        proName:self.productData.proName,
                        proSellPrice:self.productData.proSellPrice,
                        proDetailId:self.proDetail.proDetailId,
                        proDetailCount:self.detailCount,
                        proDetailType:self.proDetailType,
                        priceSum:self.detailCount*self.productData.proSellPrice,
                        isChecked:false
                    }
                    var buy=localStorage.getItem('BUYLIST');
                    if(buy){
                        var buyList = JSON.parse(buy);
                        for(var i=0;i<buyList.length;i++){
                            if(buyList[i].proDetailId==self.proDetail.proDetailId){
                                buyList[i].proDetailCount+=self.detailCount
                                buyList[i].priceSum+=self.detailCount*self.productData.proSellPrice
                                break;
                            }
                            if(i==(buyList.length-1)){
                                buyList.push(buyItem);
                                break;
                            }
                        }
                    }else{
                        var buyList = [];
                        buyList.push(buyItem);
                    }

                    localStorage.setItem('BUYLIST',JSON.stringify(buyList));
                    self.$Message.success('添加成功！');
                }else if(self.proType=='rent'){
                    var rentItem = {
                        proId:self.productData.proId,
                        proPicPath:self.productData.proPicPath,
                        proName:self.productData.proName,
                        rentPrice:(self.productData.proSellPrice*0.07).toFixed(0)-0,
                        pledge:(self.productData.proSellPrice*0.5).toFixed(0)-0,
                        proDetailId:self.proDetail.proDetailId,
                        proDetailCount:self.detailCount-0,
                        proDetailType:self.proDetailType,
                        rentTime:self.rentTime,
                        priceSum:(((self.productData.proSellPrice*0.07).toFixed(0))*self.detailCount*self.rentTime-0)+
                        ((self.productData.proSellPrice*0.5).toFixed(0)-0),
                        isChecked:false
                    }
                    var rent=localStorage.getItem('RENTLIST');
                    if(rent){
                        var rentList = JSON.parse(rent);
                        for(var i=0;i<rentList.length;i++){
                            if(rentList[i].proDetailId==self.proDetail.proDetailId){
                                rentList[i].proDetailCount+=self.detailCount
                                rentList[i].priceSum+=((self.productData.proSellPrice*0.07).toFixed(0))*self.detailCount+(self.productData.proSellPrice*0.5).toFixed(0)
                                break;
                            }
                            if(i==(rentList.length-1)){
                                rentList.push(rentItem);
                                break;
                            }
                        }
                    }else{
                        var rentList = [];
                        rentList.push(rentItem);
                    }
                    localStorage.setItem('RENTLIST',JSON.stringify(rentList));
                    self.$Message.success('添加成功！');
                }else if(self.proType=='custom'){
                    var customItem = {
                        proId:self.productData.proId,
                        proPicPath:self.productData.proPicPath,
                        proName:self.productData.proName,
                        proSellPrice:self.productData.proSellPrice,
                        proDetailId:self.proDetail.proDetailId,
                        proDetailCount:self.detailCount,
                        proDetailType:self.proDetailType,
                        priceSum:self.detailCount*self.productData.proSellPrice,
                        isChecked:false
                    }
                    var custom=localStorage.getItem('CUSTOMLIST');
                    if(custom){
                        var customList = JSON.parse(custom);
                        for(var i=0;i<customList.length;i++){
                            if(customList[i].proDetailId==self.proDetail.proDetailId){
                                customList[i].proDetailCount+=self.detailCount
                                customList[i].priceSum+=self.detailCount*self.productData.proSellPrice
                                break;
                            }
                            if(i==(customList.length-1)){
                                customList.push(customItem);
                                break;
                            }
                        }
                    }else{
                        var customList = [];
                        customList.push(customItem);
                    }

                    localStorage.setItem('CUSTOMLIST',JSON.stringify(customList));
                    self.$Message.success('添加成功！');
                }
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
            self.queryProductById();
            self.queryProductDetailByProId();
        }
    }
</script>