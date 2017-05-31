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
                        <Breadcrumb-item v-link="{path:'/back/collectDraftMng'}">设计收稿</Breadcrumb-item>
                        <Breadcrumb-item >稿件详情</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <div class="order-detail">
                            <Row>
                                <i-col span="3" >稿件编码：</i-col>
                                <i-col sapn="4">{{draft.draId}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >稿件名称：</i-col>
                                <i-col sapn="4">{{draft.draName}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >审核状态：</i-col>
                                <i-col sapn="4" v-if="draft.draCheck=='passed'">已通过</i-col>
                                <i-col sapn="4" v-if="draft.draCheck=='notpass'">未通过</i-col>
                                <i-col sapn="4" v-if="draft.draCheck=='notcheck'">未审核</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >稿件作者 ：</i-col>
                                <i-col sapn="4">{{draft.drAuthor}}</i-col>
                            </Row>
                            <Row>
                                <i-col span="3" >收购价格：</i-col>
                                <i-col sapn="12">{{draft.draPrice}}</i-col>
                            </Row>
                            <Row>
                                <img :src="draft.draPicPath" alt="" style="width: 400px">
                            </Row>
                        </div>
                        <Row type="flex" align="middle" justify="center" class="sureOrder-sum"">
                            <i-col span="24">
                                稿件描述：
                            </i-col>
                            <div class="orderdetail-custom">{{draft.draDesc}}</div>
                        </Row>
                        </div>
                    </div>
                </div>
                <div class="back-copy">
                    2016-2017 &copy; 古韵婚纱
                </div>
            </i-col>
        </Row>
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
                draId:this.$route.params.draId,
                customMsg:'',           //定制要求
                draft:'',
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
            queryBackDraftById(draId){
                var self = this
                var data = {
                    draId:draId
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/queryBackDraftById',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.draft ='';
                        if(res.data.data!=null){
                            self.draft=res.data.data;
                        }
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
            self.queryBackDraftById(self.draId);
        }

    }
</script>