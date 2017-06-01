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
                <Menu active-key="2-2" width="auto" :open-keys="['2']">

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
                        <Breadcrumb-item href="#">运营管理</Breadcrumb-item>
                        <Breadcrumb-item v-link="{path:'/back/purchaseMng'}">采购管理</Breadcrumb-item>
                        <Breadcrumb-item >采购单详情</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <!--购买单详情-->
                        <div class="order-detail">
                            <Row>
                                <i-col span="3" >采购单编码：</i-col>
                                <i-col sapn="4">{{procure.procureId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >采购日期：</i-col>
                                <i-col sapn="4">{{procure.procureTime}}</i-col>
                            </Row>

                            <Row>
                                <i-col span="3" >厂家名称：</i-col>
                                <i-col sapn="4" v-if="procure.factory">{{procure.factory.facName}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >厂家地址：</i-col>
                                <i-col sapn="4" v-if="procure.factory">{{procure.factory.facAddr}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >厂家联系电话：</i-col>
                                <i-col sapn="4" v-if="procure.factory">{{procure.factory.facTel}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >下单员工：</i-col>
                                <i-col sapn="12" v-if="procure.employee">{{procure.employee.empName}}</i-col>
                            </Row>

                            <Row>
                                <i-col span="3" >付款状态：</i-col>
                                <i-col sapn="4" v-if="procure.procureStatus=='paid'">已付款</i-col>
                                <i-col sapn="4" v-if="procure.procureStatus=='notpay'">未付款</i-col>
                            </Row>

                        </div>
                        <Row type="flex" align="middle" justify="left">
                            <i-col span="2" offset="22">
                                <i-button type="primary" @click="addModal=true">添加明细</i-button>
                            </i-col>
                        </Row>
                        <Row type="flex" align="middle" justify="center" class="sureOrder-title">
                            <i-col span="8">商品名</i-col>
                            <i-col span="4">进价</i-col>
                            <i-col span="4">数量</i-col>
                            <i-col span="4">型号</i-col>
                            <i-col span="4">小计</i-col>
                        </Row>
                        <div>
                            <div >
                                <div v-for="product in procureA.procureDetail">
                                    <Row type="flex" align="middle" justify="center" class="sureOrder-item">
                                        <i-col span="2">
                                            <img :src="product.product.proPicPath" alt="" class="sureOrder-pic">
                                        </i-col>
                                        <i-col span="6">{{product.product.proName}}</i-col>
                                        <i-col span="4">{{product.product.proBuyPrice}}</i-col>
                                        <i-col span="4">{{product.procureDetailCount}}</i-col>
                                        <i-col span="4">{{product.procureDetailType}}</i-col>
                                        <i-col span="4" class="main-color bold">{{product.product.proBuyPrice*product.procureDetailCount}}</i-col>
                                    </Row>
                                </div>
                            </div>
                            <div class="sureOrder-pay">
                                采购数量：
                                <span>{{procure.procureCount}}</span>
                                &nbsp&nbsp&nbsp
                                订单合计：
                                <span class="money-symbols">¥{{procure.procurePriceSum}}</span>
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
    <Spin fix v-if="isLoading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
    <Modal
            :visible.sync="addModal"
            title="添加采购信息"
            :loading="addLoading"
            @on-ok="insertProcureDetail"
            @on-cancel="addModal = false">
        <i-form :label-width="80">
            <Form-item label="商品">
                <i-select :model.sync="proId" filterable>
                    <i-option v-for="product in productList" :value="product.proId">{{product.proName }}</i-option>
                </i-select>
            </Form-item>
            <Form-item label="商品类型">
                <i-input type="text" :value.sync="proDetailData"></i-input>
            </Form-item>
            <Form-item label="采购数量">
                <i-input type="text" :value.sync="editProcureDetailCount"></i-input>
            </Form-item>
            <Form-item label="商品价格">
                <i-input type="text" :value.sync="editProcureDetailPrice"></i-input>
            </Form-item>
        </i-form>
    </Modal>
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
                procureId:this.$route.params.procureId,
                procure:'',
                procureA:'',
                isLogin:false,
                isLoading:true,
                addModal:false,
                addLoading:true,
                productList:[],
                proDetailList:[],
                editProcureDetailCount:'',
                editProcureDetailPrice:0,
                proId:'',
                proDetailData:'',
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
                localStorage.removeItem('EMPNAME');
                localStorage.removeItem('EMPID');
                self.$Message.success('退出成功！');
                setTimeout(()=>{
                    self.$router.go('/login');
                    self.isLogin = false;
                },1000);
            },
            queryBackProcureById(procureId){
                var self = this;
                self.isLoading = true;
                var data = {
                    procureId:procureId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryBackProcureById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.procure=res.data.data;
                        self.isLoading = false;
                        self.$Message.success('查询成功!');

                    }else{
                        self.$Message.error('查询失败！');
                    }
                })
            },
            queryProcureById(procureId){
                var self = this;
                self.isLoading = true;
                var data = {
                    procureId:procureId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryProcureById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.procureA=res.data.data;
                        self.isLoading = false;
                        self.$Message.success('查询成功!');

                    }else{
                        self.$Message.error('查询失败！');
                    }
                })
            },
            queryAllProduct(){
                var self = this
                self.isLoading = true
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryProduct'
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.productList = res.data.data;
                        self.isLoading = false
                    } else {
                        self.$Message.error('商品查询错误！');
                    }
                })
            },
            insertProcureDetail(){
                var self = this
                var proDetailId = 'P'+self.getNowFormatDate()
                var data = {
                    procureId:self.procureId,
                    proId:self.proId,
                    proDetailId:proDetailId,
                    procureDetailType:self.proDetailData,
                    procureDetailCount:self.editProcureDetailCount,
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/insertProcureDetail',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.proId='';
                        self.proDetailData='';
                        self.addProcureCount(self.editProcureDetailCount,(self.editProcureDetailPrice-0))
                    }else{
                        self.$Message.error('添加采购明细失败！');
                    }
                })
            },
            addProcureCount(proCount,proPrice){
                var self = this
                self.isLoading = true
                var data = {
                    procureId:self.procureId,
                    proCount:proCount,
                    proPrice:proPrice
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/addProcureCount',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.queryBackProcureById(self.procureId);
                        self.queryProcureById(self.procureId);
                        self.addLoading = false
                        self.addModal = false
                        self.isLoading = false
                    } else {
                        self.$Message.error('商品库存更新失败！');
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
            self.queryBackProcureById(self.procureId);
            self.queryProcureById(self.procureId);
            self.queryAllProduct();
        }

    }
</script>