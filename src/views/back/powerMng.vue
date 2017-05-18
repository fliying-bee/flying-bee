<template>
    <div>
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

                    <Menu active-key="2-6" width="auto" :open-keys="['2']">

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
                            <Breadcrumb-item>权限管理</Breadcrumb-item>
                        </Breadcrumb>
                        <div class="back-content">
                            <div class="back-order-search">
                                <Row type="flex" justify="center" align="middle">
                                    <i-col span="2">权限编码：</i-col>
                                    <i-col span="4">
                                        <i-input :value.sync="search"
                                                 icon="ios-search"
                                                 style="width: 200px"
                                                 @on-click="queryLimitById"></i-input>
                                    </i-col>
                                    <i-col span="2" offset="16">
                                        <i-button type="primary" @click="addModal=true">添加权限</i-button>
                                    </i-col>
                                </Row>
                                <Row type="flex" align="middle" class="front-order-item-title">
                                    <i-col span="5">权限编码</i-col>
                                    <i-col span="5">权限名</i-col>
                                    <i-col span="11">权限细则</i-col>
                                    <i-col span="3">操作</i-col>
                                </Row>

                                <Row type="flex" align="middle" justify="center"
                                     class="front-order-item-content" v-for="limit in limitList">
                                    <i-col span="5">
                                        {{limit.limId}}
                                    </i-col>
                                    <i-col span="5">
                                        {{limit.limName}}
                                    </i-col>
                                    <i-col span="11">
                                        {{limit.limDesc}}
                                    </i-col>
                                    <i-col span="3">
                                        <Icon type="edit" class="front-order-item-delete"
                                              @click="editModal=true,editLimName=limit.limName,
                                              editLimDesc=limit.limDesc,editLimId=limit.limId"></Icon>
                                        <Icon type="ios-trash" class="front-order-item-delete"
                                              @click="deleteModal=true,delItem=limit"></Icon>
                                    </i-col>
                                </Row>
                                <Page show-total class="page-position"
                                      :current="page.currentPage"
                                      :total="page.totalRow" :page-size="page.pageSize"
                                      @on-change="pageChange"></Page>
                            </div>

                        </div>
                        <div class="back-copy">
                            2016-2017 &copy; 古韵婚纱
                        </div>
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
                title="添加权限信息"
                :loading="addLoading"
                @on-ok="insertLimit"
                @on-cancel="addModal = false">
            <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="权限名" prop="limName">
                    <i-input type="text" :value.sync="formValidate.limName"></i-input>
                </Form-item>
                <Form-item label="权限细则">
                    <i-input type="text" :value.sync="limDesc"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <Modal
                :visible.sync="editModal"
                title="修改权限信息"
                :loading="editLoading"
                @on-ok="updateLimit"
                @on-cancel="editModal = false">
            <i-form v-ref:emp-form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="权限名" prop="limName">
                    <i-input type="text" :value.sync="editLimName"></i-input>
                </Form-item>
                <Form-item label="权限细则">
                    <i-input type="text" :value.sync="editLimDesc"></i-input>
                </Form-item>
            </i-form>
        </Modal>
        <Modal
                :visible.sync="deleteModal"
                title="删除权限信息"
                :loading="deleteLoading"
                @on-ok="deleteLimit"
                @on-cancel="deleteModal = false">
            <p>是否确认删除--{{delItem.limName}}</p>
        </Modal>
    </div>
</template>

<style scoped>

</style>

<script>
    export default {
        components: {},
        data () {
            return {
                //分页及其他固定项
                page:{
                    currentPage:1,
                    pageSize:6,
                    totalPage:1,
                    totalRow:0
                },
                search:'',
                empName:'',
                isLogin:false,
                isLoading:true,
                //模态框
                addModal:false,
                addLoading:true,
                deleteModal:false,
                deleteLoading:true,
                editModal:false,
                editLoading:true,
                //删除
                delItem:'',
                //修改
                editLimId:'',
                editLimDesc:'',
                editLimName:'',
                //插入及验证
                formValidate: {
                    limName: ''
                },
                ruleValidate: {
                    limName: [
                        {required: true, message: '权限名不能为空', trigger: 'blur'}
                    ]
                },
                limDesc:'',

                limitList:[],//权限列表
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
            queryAllLimit(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllLimitPage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.limitList = res.data.data.list;
                        self.page.currentPage = res.data.data.currentPage;
                        self.page.pageSize = res.data.data.pageSize;
                        self.page.totalPage = res.data.data.totalPage;
                        self.page.totalRow = res.data.data.totalRow;
                        self.isLoading = false
                    } else {
                        self.$Message.error('权限查询错误！');
                    }
                })
            },
            insertLimit(){
                var self = this
                var limId = 'L'+self.getNowFormatDate();
                var data = {
                    limId:limId,
                    limName:self.formValidate.limName,
                    limDesc:self.limDesc,
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/insertLimit',
                    params:data
                }).then(function(res){
                    console.log(JSON.stringify(res))
                    if(res.data.code=="OK"){
                        self.queryAllLimit();
                        self.addLoading = false;
                        self.addModal = false;
                        self.formValidate.limName='';
                        self.limDesc='';
                        self.$Message.success('添加成功!');
                    }else{
                        self.$Message.error('添加失败！');
                    }
                })
            },
            deleteLimit(){
                var self = this
                var data = {
                    limId:self.delItem.limId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/deleteLimit',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryAllLimit();
                        self.deleteLoading = false;
                        self.deleteModal = false;
                        self.$Message.success('删除成功!');
                    }else{
                        self.$Message.error('删除失败！');
                    }
                })
            },
            updateLimit(){
                var self = this
                var data = {
                    limId:self.editLimId,
                    limName:self.editLimName,
                    limDesc:self.editLimDesc,
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateLimit',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryAllLimit();
                        self.editLoading = false;
                        self.editModal = false;
                        self.$Message.success('修改成功!');
                    }else{
                        self.$Message.error('修改失败！');
                    }
                })
            },
            queryLimitById(){
                var self = this
                if(self.search==''){
                    self.queryAllLimit()
                }else{
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        limId:self.search
                    };
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/queryLimitById',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.limitList = [];
                            if(res.data.data!=null){
                                self.limitList.push(res.data.data)
                            }
                            self.page.totalRow = self.limitList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        }else{
                            self.$Message.error('查询失败！');
                        }
                    })
                }
            },
            pageChange(num){
                var self = this;
                self.page.currentPage = num;
                self.queryAllLimit();
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
            self.queryAllLimit();
        }
    }
</script>