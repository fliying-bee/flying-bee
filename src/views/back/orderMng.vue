<template>
    <!--网页头部-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="../../images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../../images/guyun_logo.png" alt="logo" class="back-header-logopic">
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
                        <Breadcrumb-item>订单管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>`
                <div class="back-content">
                    <div class="back-content-main">
                        <Tabs type="card">
                            <Tab-pane label="购买单">
                                <!--查询-->
                                <div class="back-order-search">
                                    <Row type="flex" align="middle" justify="left">
                                        <i-col span="2">购买单编码：</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="searchBuy"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click="queryBackBuyById"></i-input>
                                        </i-col>
                                    </row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="4">购买单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="4">金额</i-col>
                                            <i-col span="3">状态</i-col>
                                            <i-col span="5">更多</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center"
                                             class="front-order-item-content" v-for="buy in buyList">
                                            <i-col span="4">
                                                {{buy.buyId}}
                                            </i-col>
                                            <i-col span="4">
                                                <span class="bold">{{buy.buyOrderTime}}</span>
                                            </i-col>
                                            <i-col span="4">
                                                {{buy.userId}}
                                            </i-col>
                                            <i-col span="4">
                                                {{buy.buyPriceSum}}
                                            </i-col>
                                            <i-col span="3">
                                                <span v-if="buy.buyStatus=='notpay'">未付款</span>
                                                <span v-if="buy.buyStatus=='paid'&buy.logisStatus=='sended'">已发货</span>
                                                <span v-if="buy.buyStatus=='paid'&buy.logisStatus=='received'">已收货</span>
                                                <i-button v-if="buy.buyStatus=='paid'&buy.logisStatus=='notsend'" @click="updateBuyLogisStatus(buy)">发货</i-button>
                                            </i-col>
                                            <i-col span="5">
                                                <a v-link="{path:'/back/orderDetail/buy/'+buy.buyId}">查看详情</a>
                                            </i-col>
                                        </Row>
                                        <Page show-total class="page-position"
                                              :current="page.currentPage"
                                              :total="page.totalRow" :page-size="page.pageSize"
                                              @on-change="pageChange"></Page>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="定制单">
                                <div class="back-order-search">
                                    <Row type="flex" align="middle" justify="left">
                                        <i-col span="2">定制单编码：</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="searchCustom"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click="queryBackCustomById"></i-input>
                                        </i-col>
                                    </row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="4">定制单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="4">金额</i-col>
                                            <i-col span="3">状态</i-col>
                                            <i-col span="5">更多</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center"
                                             class="front-order-item-content" v-for="custom in customList">
                                            <i-col span="4">
                                                {{custom.customId}}
                                            </i-col>
                                            <i-col span="4">
                                                <span class="bold">{{custom.customOrderTime}}</span>
                                            </i-col>
                                            <i-col span="4">{{custom.userId}}</i-col>
                                            <i-col span="4">{{custom.customPriceSum}}</i-col>
                                            <i-col span="3">
                                                <span v-if="custom.customStatus=='notpay'">未付款</span>
                                                <span v-if="custom.customStatus=='paid'&custom.logisStatus=='sended'">已发货</span>
                                                <span v-if="custom.customStatus=='paid'&custom.logisStatus=='received'">已收货</span>
                                                <i-button v-if="custom.customStatus=='paid'&custom.logisStatus=='notsend'" @click="updateCustomLogisStatus(custom)">发货</i-button>
                                            </i-col>
                                            <i-col span="5">
                                                <a v-link="{path:'/back/orderDetail/custom/'+custom.customId}">查看详情</a>
                                            </i-col>
                                        </Row>
                                        <Page show-total class="page-position"
                                              :current="page.currentPage"
                                              :total="page.totalRow" :page-size="page.pageSize"
                                              @on-change="pageChange"></Page>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="租赁单">
                                <div class="back-order-search">
                                    <Row type="flex" align="middle" justify="left">
                                        <i-col span="2">租赁单编码：</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="searchRent"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click="queryBackRentById"></i-input>
                                        </i-col>
                                    </row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="4">租赁单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="4">金额</i-col>
                                            <i-col span="3">状态</i-col>
                                            <i-col span="5">更多</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center"
                                             class="front-order-item-content" v-for="rent in rentList">
                                            <i-col span="4">
                                                {{rent.rentId}}
                                            </i-col>
                                            <i-col span="4">
                                                <span class="bold">{{rent.rentOrderTime}}</span>
                                            </i-col>
                                            <i-col span="4">{{rent.userId}}</i-col>
                                            <i-col span="4">{{rent.rentPriceSum}}</i-col>
                                            <i-col span="3">
                                                <span v-if="rent.rentStatus=='notpay'">未付款</span>
                                                <span v-if="(rent.rentStatus=='paid')&&(rent.logisStatus=='ssended')">已发货</span>
                                                <span v-if="(rent.rentStatus=='paid')&&(rent.logisStatus=='ureceived')">已收货</span>
                                                <span v-if="(rent.rentStatus=='paid')&&(rent.logisStatus=='usended')" @click="updateRentLogisStatus(rent,'sreceived')">用户已发货</span>
                                                <span v-if="(rent.rentStatus=='paid')&&(rent.logisStatus=='sreceived')">已归还</span>
                                                <i-button v-if="(rent.rentStatus=='paid')&&(rent.logisStatus=='snotsend')" @click="updateRentLogisStatus(rent,'ssended')">发货</i-button>
                                            </i-col>
                                            <i-col span="5">
                                                <a v-link="{path:'/back/orderDetail/rent/'+rent.rentId}">查看详情</a>
                                            </i-col>
                                        </Row>
                                        <Page show-total class="page-position"
                                              :current="page.currentPage"
                                              :total="page.totalRow" :page-size="page.pageSize"
                                              @on-change="pageChange"></Page>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="定制单审核">

                                <div class="back-order-search">
                                    <Row type="flex" align="middle" justify="left">
                                        <i-col span="2">定制单编码：</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="searchCustom"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click="queryBackCustomById"></i-input>
                                        </i-col>
                                    </row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="4">定制单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="6">状态</i-col>
                                            <i-col span="3">更多</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center"
                                             class="front-order-item-content" v-for="custom in customList">
                                            <i-col span="4">
                                                {{custom.customId}}
                                            </i-col>
                                            <i-col span="4">
                                                <span class="bold">{{custom.customOrderTime}}</span>
                                            </i-col>
                                            <i-col span="4">{{custom.userId}}</i-col>
                                            <i-col span="3">{{custom.customPriceSum}}</i-col>
                                            <i-col span="6">
                                                <span v-if="custom.customCheck=='passed'">已通过</span>
                                                <span v-if="custom.customCheck=='notpass'">未通过</span>
                                                <i-button v-if="custom.customCheck=='notcheck'" @click="updateCustomCheck(custom,'passed')">通过</i-button>
                                                <i-button v-if="custom.customCheck=='notcheck'" @click="updateCustomCheck(custom,'notpass')">未通过</i-button>
                                            </i-col>
                                            <i-col span="3">
                                                <a v-link="{path:'/back/orderDetail/custom/'+custom.customId}">查看详情</a>
                                            </i-col>
                                        </Row>
                                        <Page show-total class="page-position"
                                              :current="page.currentPage"
                                              :total="page.totalRow" :page-size="page.pageSize"
                                              @on-change="pageChange"></Page>
                                    </div>
                                </div>
                            </Tab-pane>
                        </Tabs>
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
</template>

<style scoped>

</style>

<script>
    export default {

        components: {},
        data () {
            return {
                options1: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了今天');
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了昨天');
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了一周前');
                            }
                        }
                    ]
                },
                options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
                page:{
                    currentPage:1,
                    pageSize:6,
                    totalPage:1,
                    totalRow:0
                },
                searchBuy:'',
                searchCustom:'',
                searchRent:'',
                empName:'',
                isLogin:false,
                isLoading:true,
                buyList:[],
                customList:[],
                rentList:[],
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
            queryBackAllBuy(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryBackAllBuyPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.buyList = res.data.data.list;
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
            queryBackBuyById(){
                var self = this
                if(self.searchBuy==''){
                    self.queryBackAllBuy()
                }else{
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        buyId:self.searchBuy
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/queryBackBuyById',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.buyList = [];
                            if(res.data.data!=null){
                                self.buyList.push(res.data.data)
                            }
                            self.page.totalRow = self.buyList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        }else{
                            self.$Message.error('查询失败！');
                        }
                    })
                }
            },
            updateBuyLogisStatus(buy){
                var self = this;
                var data = {
                    buyId:buy.buyId,
                    logisStatus:'sended'
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateBuyLogisStatus',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryBackAllBuy();
                        self.$Message.success('发货成功！');
                    }else{
                        self.$Message.error('发货失败！');
                    }
                })
            },
            queryBackAllCustom(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryBackAllCustomPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.customList = res.data.data.list;
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
            queryBackCustomById(){
                var self = this
                if(self.searchCustom==''){
                    self.queryBackAllCustom()
                }else{
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        customId:self.searchCustom
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/queryBackCustomById',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.customList = [];
                            if(res.data.data!=null){
                                self.customList.push(res.data.data)
                            }
                            self.page.totalRow = self.customList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        }else{
                            self.$Message.error('查询失败！');
                        }
                    })
                }
            },
            updateCustomLogisStatus(custom){
                var self = this;
                var data = {
                    customId:custom.customId,
                    logisStatus:'sended'
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateCustomLogisStatus',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryBackAllCustom();
                        self.$Message.success('发货成功！');
                    }else{
                        self.$Message.error('发货失败！');
                    }
                })
            },
            updateCustomCheck(custom,status){
                var self = this;
                var data = {
                    customId:custom.customId,
                    customCheck:status
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateCustomCheck',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryBackAllCustom();
                        self.$Message.success('已审核！');
                    }else{
                        self.$Message.error('审核失败！');
                    }
                })
            },
            queryBackAllRent(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryBackAllRentPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.rentList = res.data.data.list;
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
            queryBackRentById(){
                var self = this
                if(self.searchRent==''){
                    self.queryBackAllRent()
                }else{
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        rentId:self.searchRent
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/queryBackRentById',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.rentList = [];
                            if(res.data.data!=null){
                                self.rentList.push(res.data.data)
                            }
                            self.page.totalRow = self.rentList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        }else{
                            self.$Message.error('查询失败！');
                        }
                    })
                }
            },
            updateRentLogisStatus(rent,status){
                var self = this;
                var data = {
                    rentId:rent.rentId,
                    logisStatus:status
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateRentLogisStatus',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryBackAllRent();
                        self.$Message.success('发货成功！');
                    }else{
                        self.$Message.error('发货失败！');
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
            self.queryBackAllBuy();
            self.queryBackAllRent();
            self.queryBackAllCustom();
        }
    }
</script>