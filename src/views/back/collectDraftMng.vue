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

                <Menu active-key="1-2" width="auto" :open-keys="['1']">

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
                        <Breadcrumb-item>设计收稿</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <Tabs type="card">
                            <Tab-pane label="所有稿件">
                                <div class="back-order-search">
                                    <row>
                                        <i-col span="2"></i-col>
                                        <i-col span="2">稿件</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="search"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click="queryBackDraftById"></i-input>
                                        </i-col>
                                    </row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="4">稿件</i-col>
                                            <i-col span="4">稿件名</i-col>
                                            <i-col span="4">稿件作者</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="6">状态</i-col>
                                            <i-col span="3">更多</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center"
                                             class="front-order-item-content" v-for="draft in draftList">
                                            <i-col span="4">{{draft.draId}}</i-col>
                                            <i-col span="4">{{draft.draName}}</i-col>
                                            <i-col span="4">{{draft.drAuthor}}</i-col>
                                            <i-col span="3">{{draft.draPrice}}</i-col>
                                            <i-col span="6">
                                                <span v-if="draft.draCheck=='passed'">已通过</span>
                                                <span v-if="draft.draCheck=='notpass'">未通过</span>
                                                <i-button v-if="draft.draCheck=='notcheck'" @click="updateDraftCheck(draft,'passed')">通过</i-button>
                                                <i-button v-if="draft.draCheck=='notcheck'" @click="updateDraftCheck(draft,'notpass')">未通过</i-button>
                                            </i-col>
                                            <i-col span="3">
                                                <a v-link="{path:'/back/draftDetail/'+draft.draId}">查看详情</a>
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
        <Spin fix v-if="isLoading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
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
                isLogin:false,
                isLoading:true,
                search:'',
                draftList:[],
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
            queryBackAllDraft(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryBackAllDraftPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.draftList = res.data.data.list;
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
            queryBackDraftById(){
                var self = this
                if(self.search==''){
                    self.queryBackAllDraft()
                }else{
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        draId:self.search
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/queryBackDraftById',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.draftList = [];
                            if(res.data.data!=null){
                                self.draftList.push(res.data.data)
                            }
                            self.page.totalRow = self.draftList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        }else{
                            self.$Message.error('查询失败！');
                        }
                    })
                }
            },
//            queryBackDraftByCheck(check){
//                var self = this
//                self.page.currentPage = 1;
//                self.isLoading = true
//                var data = {
//                    draId:self.search
//                };
//                self.$http({
//                    method:'POST',
//                    url:'http://127.0.0.1:8080/Spring-study/queryBackDraftById',
//                    params:data
//                }).then(function(res){
//                    if(res.data.code=="OK"){
//                        self.draftList = [];
//                        if(res.data.data!=null){
//                            self.draftList.push(res.data.data)
//                        }
//                        self.page.totalRow = self.draftList.length;
//                        self.isLoading = false
//                        self.$Message.success('查询成功!');
//                    }else{
//                        self.$Message.error('查询失败！');
//                    }
//                })
//            },
            updateDraftCheck(draft,status){
                var self = this;
                var data = {
                    draId:draft.draId,
                    draCheck:status
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateDraftCheck',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryBackAll();
                        self.$Message.success('已审核！');
                    }else{
                        self.$Message.error('审核失败！');
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
            self.queryBackAllDraft();
        }
    }
</script>