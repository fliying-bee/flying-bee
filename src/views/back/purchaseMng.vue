<template>
    <!--网页头部-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="../../images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../../images/guyun_logo.png" alt="logo" class="back-header-logopic">
        </div>
        <div class="back-header-nav">
            <i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>
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
                        <Breadcrumb-item>采购管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <div class="back-order-search">
                            <Row type="flex" align="middle" justify="left">
                                <i-col span="2">采购单编码：</i-col>
                                <i-col span="4">
                                    <i-input :value.sync="searchProcure"
                                             icon="ios-search"
                                             style="width: 200px"
                                             @on-click="queryBackProcureById"></i-input>
                                </i-col>
                                <i-col span="2" offset="16">
                                    <i-button type="primary" @click="addModal=true">采购下单</i-button>
                                </i-col>
                            </Row>
                            <div>
                                <Row type="flex" align="middle" class="front-order-item-title">
                                    <i-col span="4">采购单</i-col>
                                    <i-col span="3">采购日期</i-col>
                                    <i-col span="4">厂家</i-col>
                                    <i-col span="2">金额</i-col>
                                    <i-col span="2">数量</i-col>
                                    <i-col span="3">状态</i-col>
                                    <i-col span="3">下单员工</i-col>
                                    <i-col span="3">更多</i-col>
                                </Row>

                                <Row type="flex" align="middle" justify="center"
                                     class="front-order-item-content" v-for="procure in procureList">
                                    <i-col span="4">{{procure.procureId}}</i-col>
                                    <i-col span="3">
                                        <span class="bold">{{procure.procureTime}}</span>
                                    </i-col>
                                    <i-col span="4">{{procure.factory.facName}}</i-col>
                                    <i-col span="2">{{procure.procurePriceSum}}</i-col>
                                    <i-col span="2">{{procure.procureCount}}</i-col>
                                    <i-col span="3">
                                        <span v-if="procure.procureStatus=='paid'">已付款</span>
                                        <i-button v-if="procure.procureStatus=='notpay'" @click="updateProcureStatus(procure.procureId,'paid')">付款</i-button>

                                    </i-col>
                                    <i-col span="3">{{procure.employee.empName}}</i-col>
                                    <i-col span="3">
                                        <a v-link="{path:'/back/procureDetail/'+procure.procureId}">查看详情</a>
                                    </i-col>
                                </Row>
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
            @on-ok="insertProcure"
            @on-cancel="addModal = false">
        <i-form :label-width="80">
            <Form-item label="厂家">
                <i-select :model.sync="facId" filterable>
                    <i-option v-for="factory in factoryList" :value="factory.facId">{{factory.facName }}</i-option>
                </i-select>
            </Form-item>
        </i-form>
    </Modal>
</template>

<style scoped>

</style>

<script>
    export default {
        components: {},
        data () {
            return {
                page:{
                    currentPage:1,
                    pageSize:6,
                    totalPage:1,
                    totalRow:0
                },
                empName:'',
                empId:'',
                facId:'',
                isLogin:false,
                isLoading:true,
                procureList:[],
                searchProcure:'',
                addModal:false,
                addLoading:true,
                //插入
                procureId:'',
                procureTime:'',
                addProcureList:[],
                factoryList:[],     //员工列表
            }
        },
        methods: {
            queryAllEmpLimitById(){
                var self = this
                self.isLoading = true
                var data = {
                    empId:self.empId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllEmpLimitById',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        var empLimitList = res.data.data;
                        for(var i=0;i<empLimitList.length;i++){
                            if(empLimitList[i].limId=='L20170601093152'){
                                break;
                            }
                            if(i==empLimitList.length-1){
                                self.$Message.error('暂无权限！');
                                self.$router.go('/backIndex');
                            }
                        }
                        self.isLoading = false
                    } else {
                        self.$Message.error('查询员工权限失败！');
                    }
                })
            },
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
            queryBackAllProcure(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryBackAllProcurePage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.procureList = res.data.data.list;
                        self.page.currentPage = res.data.data.currentPage;
                        self.page.pageSize = res.data.data.pageSize;
                        self.page.totalPage = res.data.data.totalPage;
                        self.page.totalRow = res.data.data.totalRow;
                        self.isLoading = false
                    } else {
                        self.$Message.error('查询错误！');
                    }
                })
            },
            queryBackProcureById(){
                var self = this
                if(self.searchProcure==''){
                    self.queryBackAllProcure()
                }else{
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        procureId:self.searchProcure
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/queryBackProcureById',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.procureList = [];
                            if(res.data.data!=null){
                                self.procureList.push(res.data.data)
                            }
                            self.page.totalRow = self.procureList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        }else{
                            self.$Message.error('查询失败！');
                        }
                    })
                }
            },
            updateProcureStatus(procureId,procureStatus){
                var self = this;
                var data = {
                    procureId:procureId,
                    procureStatus:procureStatus
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateProcureStatus',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryBackAllProcure();
                        self.$Message.success('付款成功！');
                    }else{
                        self.$Message.error('付款失败！');
                    }
                })
            },
            queryAllFactory(){
                var self = this
                self.isLoading = true
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllFactory'
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.factoryList = res.data.data;
                        self.isLoading = false
                    } else {
                        self.$Message.success('厂家查询错误！');
                    }
                })
            },
            insertProcure(){
                var self = this
                var procureId = 'P'+self.getNowFormatDate();
                var data = {
                    procureId:procureId,
                    empId:self.empId,
                    facId:self.facId,
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/insertProcure',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.addLoading = false;
                        self.addModal = false;
                        self.facId='';
                        self.$Message.success('添加成功!');
                    }else{
                        self.$Message.error('添加采购失败！');
                    }
                })
            },
            pageChange(num){
                var self = this;
                self.page.currentPage = num;
                self.queryAllFactory();
            }

        },
        ready () {
            var self = this;
            if(localStorage.getItem('EMPNAME')){
                self.empName = localStorage.getItem('EMPNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            if(localStorage.getItem('EMPID')) {
                self.empId = localStorage.getItem('EMPID');
            }
            self.queryAllEmpLimitById()
            self.queryBackAllProcure();
            self.queryAllFactory();

        }
    }
</script>