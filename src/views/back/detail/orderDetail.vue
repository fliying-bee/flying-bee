<template>
    <!--网页头部-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="/src/images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="/src/images/guyun_logo.png" alt="logo" class="back-header-logopic">
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
                <Menu active-key="1-1" width="auto" :open-keys="['1']">

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
                        <Breadcrumb-item v-link="{path:'/back/orderMng'}">订单管理</Breadcrumb-item>
                        <Breadcrumb-item v-if="type=='buy'">购买单详情</Breadcrumb-item>
                        <Breadcrumb-item v-if="type=='custom'">定制单详情</Breadcrumb-item>
                        <Breadcrumb-item v-if="type=='rent'">租赁单详情</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <!--购买单详情-->
                        <div v-if="type=='buy'" class="order-detail">
                            <Row>
                                <i-col span="3" >购买单编码：</i-col>
                                <i-col sapn="4">{{buy.buyId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >订单时间：</i-col>
                                <i-col sapn="4">{{buy.buyOrderTime}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >物流状态：</i-col>
                                <i-col sapn="4" v-if="buy.logisStatus=='sended'">已发货</i-col>
                                <i-col sapn="4" v-if="buy.logisStatus=='received'">已收货</i-col>
                                <i-col sapn="4" v-if="buy.logisStatus=='notsend'">未发货</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >下单用户：</i-col>
                                <i-col sapn="4">{{buy.userId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >收货地址：</i-col>
                                <i-col sapn="12">{{buy.buyAddr}}</i-col>
                            </Row>
                        </div>
                        <!--定制单详情-->
                        <div v-if="type=='custom'" class="order-detail">
                            <Row>
                                <i-col span="3" >定制单编码：</i-col>
                                <i-col sapn="4">{{custom.customId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >订单时间：</i-col>
                                <i-col sapn="4">{{custom.customOrderTime}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >物流状态：</i-col>
                                <i-col sapn="4" v-if="custom.logisStatus=='sended'">已发货</i-col>
                                <i-col sapn="4" v-if="custom.logisStatus=='received'">已收货</i-col>
                                <i-col sapn="4" v-if="custom.logisStatus=='notsend'">未发货</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >审核状态：</i-col>
                                <i-col sapn="4" v-if="custom.customCheck=='notpass'">未通过</i-col>
                                <i-col sapn="4" v-if="custom.customCheck=='passed'">已通过</i-col>
                                <i-col sapn="4" v-if="custom.customCheck=='notcheck'">未审核</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >下单用户：</i-col>
                                <i-col sapn="4">{{custom.userId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >收货地址：</i-col>
                                <i-col sapn="12">{{custom.customAddr}}</i-col>
                            </Row>
                        </div>
                        <!--租赁单详情-->
                        <div v-if="type=='rent'" class="order-detail">
                            <Row>
                                <i-col span="3" >租赁单编码：</i-col>
                                <i-col sapn="4">{{rent.rentId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >订单时间：</i-col>
                                <i-col sapn="4">{{rent.rentOrderTime}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >物流状态：</i-col>
                                <i-col sapn="4" v-if="rent.logisStatus=='snotsend'">未发货</i-col>
                                <i-col sapn="4" v-if="rent.logisStatus=='ssended'">已发货</i-col>
                                <i-col sapn="4" v-if="rent.logisStatus=='urecseived'">已收货</i-col>
                                <i-col sapn="4" v-if="rent.logisStatus=='usended'">用户已发货</i-col>
                                <i-col sapn="4" v-if="rent.logisStatus=='sreceived'">已归还</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >下单用户：</i-col>
                                <i-col sapn="4">{{rent.userId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >收货地址：</i-col>
                                <i-col sapn="12">{{rent.rentAddr}}</i-col>
                            </Row>
                        </div>

                        <Row type="flex" align="middle" justify="center" class="sureOrder-title"
                             v-if="type=='buy'||type=='custom'">
                            <i-col span="8">商品名</i-col>
                            <i-col span="4">单价</i-col>
                            <i-col span="4">数量</i-col>
                            <i-col span="4">型号</i-col>
                            <i-col span="4">小计</i-col>
                        </Row>
                        <Row type="flex" align="middle" justify="center" class="sureOrder-title" v-if="type=='rent'">
                            <i-col span="8">商品名</i-col>
                            <i-col span="3">租赁单价</i-col>
                            <i-col span="3">押金</i-col>
                            <i-col span="2">数量</i-col>
                            <i-col span="3">型号</i-col>
                            <i-col span="2">租期&nbsp;/&nbsp;天</i-col>
                            <i-col span="3">小计</i-col>
                        </Row>
                        <div>
                            <div v-if="type=='buy'">
                                <div v-for="product in buy.buyDetail">
                                    <Row type="flex" align="middle" justify="center" class="sureOrder-item">
                                        <i-col span="2">
                                            <img :src="product.product.proPicPath" alt="" class="sureOrder-pic">
                                        </i-col>
                                        <i-col span="6">{{product.product.proName}}</i-col>
                                        <i-col span="4">{{product.product.proSellPrice}}</i-col>
                                        <i-col span="4">{{product.buyDetailCount}}</i-col>
                                        <i-col span="4">{{product.buyDetailType}}</i-col>
                                        <i-col span="4" class="main-color bold">{{product.product.proSellPrice*product.buyDetailCount}}</i-col>
                                    </Row>
                                </div>
                            </div>
                            <div v-if="type=='rent'">
                                <div v-for="product in rent.rentDetail">
                                    <Row type="flex" align="middle" justify="center" class="sureOrder-item">
                                        <i-col span="2">
                                            <img :src="product.product.proPicPath" alt="" class="sureOrder-pic">
                                        </i-col>
                                        <i-col span="6">{{product.product.proName}}</i-col>
                                        <i-col span="3">{{(product.product.proSellPrice*0.07).toFixed(0)*rent.rentTime}}</i-col>
                                        <i-col span="3">{{(product.product.proSalePrice*0.5).toFixed(0)}}</i-col>
                                        <i-col span="2">{{product.rentDetailCount}}</i-col>
                                        <i-col span="3">{{product.rentDetailType}}</i-col>
                                        <i-col span="2">{{rent.rentTime}}</i-col>
                                        <i-col span="3" class="main-color bold">{{((product.product.proSellPrice*0.07).toFixed(0)*rent.rentTime-0)+((product.product.proSalePrice*0.5).toFixed(0)-0)}}</i-col>
                                    </Row>
                                </div>
                            </div>
                            <div v-if="type=='custom'">
                                <div v-for="product in custom.customDetail">
                                    <Row type="flex" align="middle" justify="center" class="sureOrder-item">
                                        <i-col span="2">
                                            <img :src="product.product.proPicPath" alt="" class="sureOrder-pic">
                                        </i-col>
                                        <i-col span="6">{{product.product.proName}}</i-col>
                                        <i-col span="4">{{product.product.proSellPrice}}</i-col>
                                        <i-col span="4">{{product.customDetailCount}}</i-col>
                                        <i-col span="4">{{product.customDetailType}}</i-col>
                                        <i-col span="4" class="main-color bold">{{product.product.proSellPrice*product.customDetailCount}}</i-col>
                                    </Row>
                                </div>
                            </div>
                            <Row type="flex" align="middle" justify="center" class="sureOrder-sum" v-if="type=='custom'">
                                <i-col span="24">
                                    定制要求：
                                </i-col>
                                <div class="orderdetail-custom">{{custom.customMsg}}</div>
                            </Row>

                            <div class="sureOrder-pay">
                                订单合计：<span class="money-symbols"  v-if="type=='buy'">¥{{buy.buyPriceSum}}</span>
                                <span class="money-symbols" v-if="type=='custom'">¥{{custom.customPriceSum}}</span>
                                <span class="money-symbols" v-if="type=='rent'">¥{{rent.rentPriceSum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back-copy">
                    2016-2017 &copy; 古韵婚纱
                </div>
            </i-col>
        </Row>
        <!--<Spin fix v-if="isLoading">-->
            <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
            <!--<div>Loading</div>-->
        <!--</Spin>-->
    </div>
</template>

<style scoped>
.order-detail{
    padding-left: 20px;
    font-size: 16px;
    font-weight: bolder;
    margin: 5px 0 30px;
    line-height: 32px;
}
.orderdetail-custom{
    padding: 10px 20px;
    width: 90%;
    word-wrap: break-word;
}
</style>

<script>
    export default {

        components: {},
        data () {
            return {
                empName:'',
                isLogin:false,
                isLoading:true,
                orderId:this.$route.params.orderId,
                type:this.$route.params.type,
                buy:'',   //购买
                rent:'',    //租赁
                custom:'',  //定制
                customMsg:'',           //定制要求
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
            queryBackBuyById(orderId){
                var self = this
                self.isLoading = true
                var data = {
                    buyId:orderId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryBackBuyById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.buy = '';
                        if(res.data.data!=null){
                            self.buy=res.data.data;
                            console.log(self.buy);
                        }
                        self.isLoading = false
                        self.$Message.success('查询成功!');
                    }else{
                        self.$Message.error('查询失败！');
                    }
                })
            },
            queryBackCustomById(orderId){
                var self = this
                self.isLoading = true
                var data = {
                    customId:orderId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryBackCustomById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.custom= '';
                        if(res.data.data!=null){
                            self.custom=res.data.data;
                        }
                        self.isLoading = false
                        self.$Message.success('查询成功!');
                    }else{
                        self.$Message.error('查询失败！');
                    }
                })
            },
            queryBackRentById(orderId){
                var self = this
                self.isLoading = true
                var data = {
                    rentId:orderId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryBackRentById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.rent = '';
                        if(res.data.data!=null){
                            self.rent=res.data.data;
                        }
                        self.isLoading = false
                        self.$Message.success('查询成功!');
                    }else{
                        self.$Message.error('查询失败！');
                    }
                })
            },
        },
        ready () {
            var self = this;
            if(localStorage.getItem('EMPNAME')){
                self.empName = localStorage.getItem('EMPNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            console.log(self.type,self.orderId);
            if(self.type=='buy'){
                self.queryBackBuyById(self.orderId);
            }
            else if(self.type=='custom'){
                self.queryBackCustomById(self.orderId);}
            else if(self.type=='rent'){
                self.queryBackRentById(self.orderId);
            }
        }

    }
</script>