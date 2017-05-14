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
                                    <i-input :value.sync="search" icon="ios-search" style="width: 200px"></i-input>
                                </i-col>
                                <i-col span="2" offset="16">
                                    <i-button type="primary" @click="addModal=true">添加员工</i-button>
                                </i-col>
                            </Row>
                            <div>
                                <Row type="flex" align="middle" class="front-order-item-title">
                                    <i-col span="4">员工编码</i-col>
                                    <i-col span="4">姓名</i-col>
                                    <i-col span="4">性别</i-col>
                                    <i-col span="3">联系方式</i-col>
                                    <i-col span="6">权限</i-col>
                                    <i-col span="3">操作</i-col>
                                </Row>
                                <Checkbox-group :model.sync="checkAllGroup" @on-change="checkAllGroupChange">
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="4">E201704290001</i-col>
                                        <i-col span="4">张三</i-col>
                                        <i-col span="4">男</i-col>
                                        <i-col span="3">1870260000</i-col>
                                        <i-col span="6">查看报表；查看厂家信息</i-col>
                                        <i-col span="3">
                                            <Icon type="edit" class="front-order-item-delete"></Icon>
                                            <Icon type="ios-trash" class="front-order-item-delete"></Icon>
                                        </i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="4">E201704290002</i-col>
                                        <i-col span="4">李四</i-col>
                                        <i-col span="4">男</i-col>
                                        <i-col span="3">1870260001</i-col>
                                        <i-col span="6">查看商品信息；查看客户信息；审核稿件；审核订单</i-col>
                                        <i-col span="3">
                                            <Icon type="edit" class="front-order-item-delete"></Icon>
                                            <Icon type="ios-trash" class="front-order-item-delete"></Icon>
                                        </i-col>
                                    </Row>
                                </Checkbox-group>

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
    <Modal
            :visible.sync="addModal"
            title="添加员工信息"
            :loading="addLoading"
            @on-ok="add"
            @on-cancel="addModal = false">
        <i-form v-ref:emp-form-validate :model="empFormValidate" :rules="empRuleValidate" :label-width="80">
            <Form-item label="员工名" prop="empName">
                <i-input type="text" :value.sync="empFormValidate.empName"></i-input>
            </Form-item>
            <Form-item label="密码" prop="empPassword">
                <i-input type="password" :value.sync="empFormValidate.empPassword"></i-input>
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
                search:'',
                empName:'',
                isLogin:false,
                addModal:false,
                addLoading:true,
                empFormValidate: {
                    empName: '',
                    empPassword: ''
                },
                empRuleValidate: {
                    empName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    empPassword: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
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
            add () {
                var self = this
                setTimeout(() => {
                    self.addLoading = false;
                    self.addModal = false;
                    self.$Message.info('添加成功');
                }, 2000);

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
        }
    }
</script>