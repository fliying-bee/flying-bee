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

                <Menu active-key="2-1" width="auto" :open-keys="['2']">

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
                        <Breadcrumb-item href="#">商品管理</Breadcrumb-item>
                        <Breadcrumb-item>商品明细</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main ">
                        <div class="order-detail">
                            <Row type="flex" align="middle">
                                <i-col span="2">
                                    <img :src="proData.proPicPath" alt="" class="sureOrder-pic">
                                </i-col>
                                <i-col span="3" offset="19">
                                    <i-button type="primary" @click="addModal=true">添加商品明细</i-button>
                                </i-col>
                            </Row>
                            <Row type="flex" align="middle">
                                <i-col span="3" >
                                    <span class="bold">商品编码：</span>
                                    {{proData.proId}}
                                </i-col>
                            </Row>
                            <Row type="flex" align="middle">
                                <i-col span="22">
                                    <span class="bold">商品名：</span>
                                    {{proData.proName}}
                                </i-col>
                            </Row>
                            <Row type="flex" align="middle">
                                <i-col span="24">
                                    <span class="bold">商品描述：</span>
                                    {{proData.proDesc}}
                                </i-col>
                            </Row>
                            <Row type="flex" align="middle">
                                <i-col span="3" >
                                    <span class="bold">商品数量：</span>
                                    {{proData.proCount}}
                                </i-col>
                            </Row>
                        </div>
                        <Row type="flex" align="middle" justify="center" class="sureOrder-title">
                            <i-col span="6">商品明细编码</i-col>
                            <i-col span="6">商品数量</i-col>
                            <i-col span="6">商品型号</i-col>
                            <i-col span="6">操作</i-col>
                        </Row>
                        <Row type="flex" align="middle" justify="center" class="sureOrder-item"
                             v-for="detail in proDetailList">
                            <i-col span="6">{{detail.proDetailId}}</i-col>
                            <i-col span="6">{{detail.proDetailCount}}</i-col>
                            <i-col span="6">{{detail.proDetailType}}</i-col>
                            <i-col span="6">
                                <!--<Icon type="edit" class="front-order-item-delete"-->
                                      <!--@click=""></Icon>-->
                                <Icon type="ios-trash" class="front-order-item-delete"
                                      @click="delItem=detail,deleteModal=true"></Icon>
                            </i-col>
                        </Row>
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
            title="添加商品明细"
            :loading="addLoading"
            @on-ok="insertProductDetail"
            @on-cancel="addModal = false">
        <i-form :label-width="80">
            <Form-item label="商品型号">
                <i-input type="text" :value.sync="proDetailType"></i-input>
            </Form-item>
            <Form-item label="商品数量">
                <i-input type="text" :value.sync="proDetailCount"></i-input>
            </Form-item>
        </i-form>
    </Modal>
    <Modal
            :visible.sync="deleteModal"
            title="删除商品明细信息"
            :loading="deleteLoading"
            @on-ok="deleteProductDetail"
            @on-cancel="deleteModal = false">
        <p>是否确认删除--{{delItem.proDetailType}}</p>
    </Modal>
</template>

<style scoped>
    .order-detail{
        padding-left: 20px;
        font-size: 14px;
        margin: 5px 0 30px;
        line-height: 32px;
    }
</style>

<script>
    export default {
        components: {},
        data () {
            return {
                proId:this.$route.params.proId,
                proData:'',
                empName:'',
                isLogin:false,
                isLoading:true,
                proDetailList:[],
                addModal:false,
                addLoading:true,
                proDetailType:'',
                proDetailCount:'',
                deleteModal:false,
                deleteLoading:true,
                delItem:'',
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
            queryProductById(){
                var self = this
                self.isLoading = true
                var data = {
                    proId:self.proId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryProductById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.isLoading = false
                        self.proData = res.data.data;
                    }else{
                        self.$Message.error('查询商品失败！');
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
                        self.proDetailList = res.data.data;
                        self.isLoading = false
                    } else {
                        self.$Message.error('商品明细查询错误！');
                    }
                })
            },
            insertProductDetail(){
                var self = this
                var proDetailId = 'P'+self.getNowFormatDate()
                self.isLoading = true
                var data = {
                    proId:self.proId,
                    proDetailType:self.proDetailType,
                    proDetailCount:self.proDetailCount,
                    proDetailId:proDetailId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/insertProductDetail',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.addProductCount(self.proDetailCount)
                        self.isLoading = false
                    } else {
                        self.$Message.error('商品明细插入错误！');
                    }
                })
            },
            addProductCount(proCount){
                var self = this
                self.isLoading = true
                var data = {
                    proId:self.proId,
                    proCount:proCount
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/addProductCount',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.queryProductById()
                        self.queryProductDetailByProId()
                        self.addLoading = false
                        self.addModal = false
                        self.isLoading = false
                    } else {
                        self.$Message.error('商品库存更新失败！');
                    }
                })
            },
            deleteProductDetail(){
                var self = this
                self.isLoading = true
                var data = {
                    proDetailId:self.delItem.proDetailId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/deleteProductDetail',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.updateProductCount(self.delItem.proDetailCount)
                    } else {
                        self.$Message.error('商品明细删除失败！');
                    }
                })
            },
            updateProductCount(proCount){
                var self = this
                self.isLoading = true
                var data = {
                    proId:self.proId,
                    proCount:proCount
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/updateProductCount',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.queryProductById()
                        self.queryProductDetailByProId()
                        self.deleteLoading = false
                        self.deleteModal = false
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
            self.queryProductById()
            self.queryProductDetailByProId()
        }
    }
</script>