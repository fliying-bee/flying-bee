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

                <Menu active-key="2-4" width="auto" :open-keys="['2']">

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
                        <Breadcrumb-item>员工管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <div class="back-order-search">
                            <Row type="flex" justify="center" align="middle">
                                <i-col span="2">员工编码：</i-col>
                                <i-col span="4">
                                    <i-input :value.sync="search" icon="ios-search"
                                             style="width: 200px" @on-click="queryEmployeeById"></i-input>
                                </i-col>
                                <i-col span="2" offset="16">
                                    <i-button type="primary" @click="addModal=true">添加员工</i-button>
                                </i-col>
                            </Row>
                            <Row type="flex" align="middle" class="front-order-item-title">
                                <i-col span="3">员工编码</i-col>
                                <i-col span="3">员工名</i-col>
                                <i-col span="3">密码</i-col>
                                <i-col span="3">性别</i-col>
                                <i-col span="3">联系方式</i-col>
                                <i-col span="6">权限</i-col>
                                <i-col span="3">操作</i-col>
                            </Row>
                            <Row type="flex" align="middle" justify="center"
                                 class="front-order-item-content" v-for="emp in empList">
                                <i-col span="3">{{emp.empId}}</i-col>
                                <i-col span="3">{{emp.empName}}</i-col>
                                <i-col span="3">***********</i-col>
                                <i-col span="3">
                                    <span v-if="emp.empSex==null">--</span>
                                    <span v-if="emp.empSex=='F'">女</span>
                                    <span v-if="emp.empSex=='M'">男</span>
                                </i-col>
                                <i-col span="3">
                                    <span v-if="emp.empTel==null">--</span>
                                    <span v-else>{{emp.empTel}}</span>
                                </i-col>
                                <i-col span="6">
                                    <span v-if="emp.empLimName==null">--</span>
                                    <span v-else>{{emp.empLimName}}</span>
                                </i-col>
                                <i-col span="3">
                                    <Icon type="edit" class="front-order-item-delete"
                                          @click="editModal=true,editEmpName=emp.empName,
                                          editEmpTel=emp.empTel,editAddLimitList=emp.empLimId.split(','),
                                          editEmpPassword=emp.empPassword,editEmpSex=emp.empSex,
                                          editEmpId=emp.empId,editLimitList=emp.empLimId.split(',')"></Icon>
                                    <Icon type="ios-trash" class="front-order-item-delete"
                                          @click="deleteModal=true,delItem=emp"></Icon>
                                </i-col>
                            </Row>
                            <Page show-total class="page-position"
                                  :current="page.currentPage"
                                  :total="page.totalRow" :page-size="page.pageSize"
                                  @on-change="pageChange"></Page>
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
            title="添加员工信息"
            :loading="addLoading"
            @on-ok="insertEmployee"
            @on-cancel="addModal = false">
        <i-form v-ref:emp-form-validate :model="empFormValidate" :rules="empRuleValidate" :label-width="80">
            <Form-item label="员工名" prop="empName">
                <i-input type="text" :value.sync="empFormValidate.empName"></i-input>
            </Form-item>
            <Form-item label="密码" prop="empPassword">
                <i-input type="password" :value.sync="empFormValidate.empPassword"></i-input>
            </Form-item>
            <Form-item label="性别">
                <Radio-group :model.sync="empSex">
                    <Radio value="M">男</Radio>
                    <Radio value="F">女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="联系方式">
                <i-input type="text" :value.sync="empTel"></i-input>
            </Form-item>
            <Form-item label="权限">
                <i-select :model.sync="addLimitList" multiple filterable>
                    <i-option v-for="limit in limitList" :value="limit.limId">{{ limit.limName }}</i-option>
                </i-select>
            </Form-item>
        </i-form>
    </Modal>
    <Modal
            :visible.sync="editModal"
            title="修改员工信息"
            :loading="editLoading"
            @on-ok="updateEmployee"
            @on-cancel="addModal = false">
        <i-form v-ref:emp-form-validate :model="empFormValidate" :rules="empRuleValidate" :label-width="80">
            <Form-item label="员工名" prop="empName">
                <i-input type="text" :value.sync="editEmpName"></i-input>
            </Form-item>
            <Form-item label="密码" prop="empPassword">
                <i-input type="password" :value.sync="editEmpPassword"></i-input>
            </Form-item>
            <Form-item label="性别">
                <Radio-group :model.sync="editEmpSex">
                    <Radio value="M">男</Radio>
                    <Radio value="F">女</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="联系方式">
                <i-input type="text" :value.sync="editEmpTel"></i-input>
            </Form-item>
            <Form-item label="权限">
                <i-select :model.sync="editLimitList" multiple filterable>
                    <i-option v-for="limit in limitList" :value="limit.limId">{{ limit.limName }}</i-option>
                </i-select>
            </Form-item>
        </i-form>
    </Modal>
    <Modal
            :visible.sync="deleteModal"
            title="删除员工信息"
            :loading="deleteLoading"
            @on-ok="deleteEmployee"
            @on-cancel="deleteModal = false">
        <p>是否确认删除--{{delItem.empName}}</p>
    </Modal>
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
                editEmpId:'',
                editEmpName:'',
                editEmpPassword:'',
                editEmpSex:'',
                editEmpTel:'',
                editLimitList:[],
                editAddLimitList:[],    //保存选择的权限以删除
                //插入
                empId:'',
                empFormValidate: {
                    empName: '',
                    empPassword: ''
                },
                empSex:'',
                empTel:'',
                addLimitList:[],    //选择的权限列表
                empRuleValidate: {
                    empName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    empPassword: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                },  //验证

                empList:[],     //员工列表
                limitList:[],   //所有权限列表

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
            queryAllEmployee(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllEmployeePage',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.empList = res.data.data.list;
                        self.page.currentPage = res.data.data.currentPage;
                        self.page.pageSize = res.data.data.pageSize;
                        self.page.totalPage = res.data.data.totalPage;
                        self.page.totalRow = res.data.data.totalRow;
                        self.isLoading = false
                    } else {
                        self.$Message.error('员工查询错误！');
                    }
                })
            },
            queryAllLimit(){
                var self = this
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryAllLimit',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.limitList = res.data.data;
                    } else {
                        self.$Message.error('权限查询错误！');
                    }
                })
            },
            insertEmployee(){
                var self = this
                var empId = 'E'+self.getNowFormatDate();
                var data = {
                    empId:empId,
                    empName:self.empFormValidate.empName,
                    empPassword:self.empFormValidate.empPassword,
                    empSex:self.empSex,
                    empTel:self.empTel
                };
                console.log(JSON.stringify(self.addLimitList))
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/insertEmployee',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        for(var i=0;i<self.addLimitList.length;i++){
                            self.insertEmpLimit(self.addLimitList[i],empId);
                        }
                        self.addLoading = false;
                        self.addModal = false;
                        self.empFormValidate.empName='';
                        self.empFormValidate.empPassword='';
                        self.empSex='';
                        self.empTel='';
                        self.addLimitList=[];
                        self.$Message.success('添加成功!');
                    }else{
                        self.$Message.error('添加员工失败！');
                    }
                })
            },
            insertEmpLimit(limId,empId){
                var self = this
                var edata = {
                    empId:empId,
                    limId:limId
                }
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/insertEmpLimit',
                    params:edata
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryAllEmployee();
                    }else{
                        self.$Message.error('添加员工权限失败！');
                    }
                })
            },
            updateEmployee(){
                var self = this
                var insertLimitList=[];
                var deleteLimitList=[];
                for(var i=0;i<self.editAddLimitList.length;i++){
                    if(self.editLimitList.indexOf(self.editAddLimitList[i])==-1){
                        deleteLimitList.push(self.editAddLimitList[i])
                    }
                }
                for (var j=0;j<self.editLimitList.length;j++){
                    if(self.editAddLimitList.indexOf(self.editLimitList[j])==-1){
                        insertLimitList.push(self.editLimitList[j])
                    }
                }

                var data = {
                    empId:self.editEmpId,
                    empName:self.editEmpName,
                    empPassword:self.editEmpPassword,
                    empSex:self.editEmpSex,
                    empTel:self.editEmpTel
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/updateEmployee',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        if(insertLimitList.length!=0){
                            for(var i=0;i<insertLimitList.length;i++){
                                self.insertEmpLimit(insertLimitList[i],self.editEmpId);
                            }
                        }
                        if(deleteLimitList.length!=0){
                            for(var i=0;i<deleteLimitList.length;i++){
                                self.deleteEmpLimit(deleteLimitList[i],self.editEmpId);
                            }
                        }

                        self.editLoading = false;
                        self.editModal = false;
                        self.$Message.success('修改成功！');
                    }else{
                        self.$Message.error('修改员工失败！');
                    }
                })
            },
            deleteEmpLimit(limId,empId){
                var self = this
                var data = {
                    empId:empId,
                    limId:limId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/deleteEmpLimit',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.queryAllEmployee();
                    }else{
                        self.$Message.error('删除员工权限失败！');
                    }
                })
            },
            deleteEmployee(){
                var self = this
                var deleteLimitList=self.delItem.empLimId.split(',');
                var data = {
                    empId:self.delItem.empId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/deleteEmployee',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        if(deleteLimitList.length!=0){
                            for(var i=0;i<deleteLimitList.length;i++){
                                self.deleteEmpLimit(deleteLimitList[i],self.delItem.empId);
                            }
                        }
                        self.queryAllLimit();
                        self.deleteLoading = false;
                        self.deleteModal = false;
                        self.$Message.success('删除成功!');
                    }else{
                        self.$Message.success('删除失败！');
                    }
                })
            },
            queryEmployeeById(){
                var self = this
                if(self.search==''){

                }else {
                    self.page.currentPage = 1;
                    self.isLoading = true
                    var data = {
                        empId:self.search
                    };
                    self.$http({
                        method: 'GET',
                        url: 'http://127.0.0.1:8080/Spring-study/queryEmployeeById',
                        params: data
                    }).then(function (res) {
                        if (res.data.code == "OK") {
                            self.empList = [];
                            if(res.data.data!=null){
                                self.empList.push(res.data.data)
                            }
                            self.page.totalRow = self.empList.length;
                            self.isLoading = false
                            self.$Message.success('查询成功!');
                        } else {
                            self.$Message.error('员工查询错误！');
                        }
                    })
                }
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
            self.queryAllEmployee();
            self.queryAllLimit();
        }
    }
</script>