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
                        <Breadcrumb-item>商品管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <Tabs type="card">
                            <Tab-pane label="所有商品">
                                <div class="back-order-search">
                                    <Row type="flex" justify="center" align="middle">
                                        <i-col span="2">商品编码：</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="searchAll"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click=""></i-input>
                                        </i-col>
                                        <i-col span="2" offset="16">
                                            <i-button type="primary" @click="addModal=true">添加商品</i-button>
                                        </i-col>
                                    </Row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="2">商品编码</i-col>
                                            <i-col span="2">图片</i-col>
                                            <i-col span="5">名称</i-col>
                                            <i-col span="2">数量</i-col>
                                            <i-col span="2">进价</i-col>
                                            <i-col span="2">售价</i-col>
                                            <i-col span="2">标价</i-col>
                                            <i-col span="2">稿件</i-col>
                                            <i-col span="2">操作</i-col>
                                            <i-col span="3">商品明细</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                            <i-col span="2">Pt123456789</i-col>
                                            <i-col span="2">
                                                <img src="../../images/guyun_logo_z.png" alt="logo" class="back-cart-itempic">
                                            </i-col>
                                            <i-col span="5">商品一商品一商品一商品一商品一商品一商品一商品一</i-col>
                                            <i-col span="2">28</i-col>
                                            <i-col span="2">￥80</i-col>
                                            <i-col span="2">￥200</i-col>
                                            <i-col span="2">￥160</i-col>
                                            <i-col span="2">D123456789</i-col>
                                            <i-col span="2">
                                                <Icon type="edit" class="front-order-item-delete"
                                                      @click=""></Icon>
                                                <Icon type="ios-trash" class="front-order-item-delete"
                                                      @click=""></Icon>
                                            </i-col>
                                            <i-col span="3">
                                                <i-button>查看商品明细</i-button>
                                            </i-col>
                                        </Row>
                                        <Page show-total class="page-position"
                                              :current="page.currentPage"
                                              :total="page.totalRow" :page-size="page.pageSize"
                                              @on-change="pageChange"></Page>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="婚纱礼服">
                                <div class="back-order-search">
                                    <Row type="flex" justify="center" align="middle">
                                        <i-col span="2">商品编码：</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="searchDress"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click=""></i-input>
                                        </i-col>
                                        <i-col span="2" offset="16">
                                            <i-button type="primary" @click="addModal=true">添加商品</i-button>
                                        </i-col>
                                    </Row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="2">商品编码</i-col>
                                            <i-col span="2">图片</i-col>
                                            <i-col span="5">名称</i-col>
                                            <i-col span="2">数量</i-col>
                                            <i-col span="2">进价</i-col>
                                            <i-col span="2">售价</i-col>
                                            <i-col span="2">标价</i-col>
                                            <i-col span="2">稿件</i-col>
                                            <i-col span="2">操作</i-col>
                                            <i-col span="3">商品明细</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                            <i-col span="2">Pt123456789</i-col>
                                            <i-col span="2">
                                                <img src="../../images/guyun_logo_z.png" alt="logo" class="back-cart-itempic">
                                            </i-col>
                                            <i-col span="5">商品一商品一商品一商品一商品一商品一商品一商品一</i-col>
                                            <i-col span="2">28</i-col>
                                            <i-col span="2">￥80</i-col>
                                            <i-col span="2">￥200</i-col>
                                            <i-col span="2">￥160</i-col>
                                            <i-col span="2">D123456789</i-col>
                                            <i-col span="2">
                                                <Icon type="edit" class="front-order-item-delete"
                                                      @click=""></Icon>
                                                <Icon type="ios-trash" class="front-order-item-delete"
                                                      @click=""></Icon>
                                            </i-col>
                                            <i-col span="3">
                                                <i-button>查看商品明细</i-button>
                                            </i-col>
                                        </Row>
                                        <Page show-total class="page-position"
                                              :current="page.currentPage"
                                              :total="page.totalRow" :page-size="page.pageSize"
                                              @on-change="pageChange"></Page>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="配饰">
                                <div class="back-order-search">
                                    <Row type="flex" justify="center" align="middle">
                                        <i-col span="2">商品编码：</i-col>
                                        <i-col span="4">
                                            <i-input :value.sync="searchPart"
                                                     icon="ios-search"
                                                     style="width: 200px"
                                                     @on-click=""></i-input>
                                        </i-col>
                                        <i-col span="2" offset="16">
                                            <i-button type="primary" @click="addModal=true">添加商品</i-button>
                                        </i-col>
                                    </Row>
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="2">商品编码</i-col>
                                            <i-col span="2">图片</i-col>
                                            <i-col span="5">名称</i-col>
                                            <i-col span="2">数量</i-col>
                                            <i-col span="2">进价</i-col>
                                            <i-col span="2">售价</i-col>
                                            <i-col span="2">标价</i-col>
                                            <i-col span="2">稿件</i-col>
                                            <i-col span="2">操作</i-col>
                                            <i-col span="3">商品明细</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                            <i-col span="2">Pt123456789</i-col>
                                            <i-col span="2">
                                                <img src="../../images/guyun_logo_z.png" alt="logo" class="back-cart-itempic">
                                            </i-col>
                                            <i-col span="5">商品一商品一商品一商品一商品一商品一商品一商品一</i-col>
                                            <i-col span="2">28</i-col>
                                            <i-col span="2">￥80</i-col>
                                            <i-col span="2">￥200</i-col>
                                            <i-col span="2">￥160</i-col>
                                            <i-col span="2">D123456789</i-col>
                                            <i-col span="2">
                                                <Icon type="edit" class="front-order-item-delete"
                                                      @click=""></Icon>
                                                <Icon type="ios-trash" class="front-order-item-delete"
                                                      @click=""></Icon>
                                            </i-col>
                                            <i-col span="3">
                                                <i-button>查看商品明细</i-button>
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
</template>

<style scoped>
.back-cart-itempic{
    height: 50px;
}
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
                searchAll:'',
                searchDress:'',
                searchPart:'',
                empName:'',
                isLogin:false,
                isLoading:true,
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
            pageChange(num){
                var self = this;
                self.page.currentPage = num;
                self.queryAllEmployee();
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
        }
    }
</script>