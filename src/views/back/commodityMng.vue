<template>
    <!--网页头部-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="/src/images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
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
                                            <i-button type="primary" @click="addDressModal=true">添加商品</i-button>
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

                                        <Row type="flex" align="middle" justify="center"
                                             class="front-order-item-content" v-for="product in dressList">
                                            <i-col span="2">{{product.proId}}</i-col>
                                            <i-col span="2">
                                                <img :src="product.proPicPath" alt="logo" class="sureOrder-pic">
                                            </i-col>
                                            <i-col span="5">{{product.proName}}</i-col>
                                            <i-col span="2">{{product.proCount}}</i-col>
                                            <i-col span="2">￥{{product.proBuyPrice}}</i-col>
                                            <i-col span="2">￥{{product.proSalePrice}}</i-col>
                                            <i-col span="2">￥{{product.proSellPrice}}</i-col>
                                            <i-col span="2" v-if="product.draId!=null&product.draId!=''">{{product.draId}}</i-col>
                                            <i-col span="2" v-else>--</i-col>
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

                                        <Row type="flex" align="middle" justify="center"
                                             class="front-order-item-content" v-for="product in partList">
                                            <i-col span="2">{{product.proId}}</i-col>
                                            <i-col span="2">
                                                <img :src="product.proPicPath" alt="logo" class="sureOrder-pic">
                                            </i-col>
                                            <i-col span="5">{{product.proName}}</i-col>
                                            <i-col span="2">{{product.proCount}}</i-col>
                                            <i-col span="2">￥{{product.proBuyPrice}}</i-col>
                                            <i-col span="2">￥{{product.proSalePrice}}</i-col>
                                            <i-col span="2">￥{{product.proSellPrice}}</i-col>
                                            <i-col span="2" v-if="product.draId!=null&product.draId!=''">{{product.draId}}</i-col>
                                            <i-col span="2" v-else>--</i-col>
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
                                              :current="pagePart.currentPage"
                                              :total="pagePart.totalRow" :page-size="pagePart.pageSize"
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
    <Modal
            :visible.sync="addDressModal"
            title="添加婚纱礼服"
            :loading="addDressLoading"
            @on-ok="insertDress"
            @on-cancel="addDressModal = false">
        <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="商品名" prop="proName">
                <i-input type="text" :value.sync="proName"></i-input>
            </Form-item>
            <Form-item label="商品进价" prop="proBuyPrice">
                <i-input type="text" :value.sync="proBuyPrice"></i-input>
            </Form-item>
            <Form-item label="商品标价" prop="proSalePrice">
                <i-input type="text" :value.sync="proSalePrice"></i-input>
            </Form-item>
            <Form-item label="商品售价" prop="proSellPrice">
                <i-input type="text" :value.sync="proSellPrice"></i-input>
            </Form-item>
            <Form-item label="商品描述" prop="proDesc">
                <i-input type="textarea" :value.sync="formValidate.proDesc" style=""></i-input>
            </Form-item>
        </i-form>
    </Modal>
    <Modal
            :visible.sync="updateDressModal"
            title="修改婚纱礼服"
            :loading="updateDressLoading"
            @on-ok="updateDress"
            @on-cancel="updateDressModal = false">
        <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="商品名" prop="proName">
                <i-input type="text" :value.sync="formValidate.proName"></i-input>
            </Form-item>
            <Form-item label="图片">
                <Upload action="">
                    <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                </Upload>
            </Form-item>
            <Form-item label="商品进价" prop="proBuyPrice">
                <i-input type="text" :value.sync="formValidate.proBuyPrice"></i-input>
            </Form-item>
            <Form-item label="商品标价" prop="proSalePrice">
                <i-input type="text" :value.sync="formValidate.proSalePrice"></i-input>
            </Form-item>
            <Form-item label="商品售价" prop="proSellPrice">
                <i-input type="text" :value.sync="formValidate.proSellPrice"></i-input>
            </Form-item>
            <Form-item label="商品稿件">
                <i-input type="text" :value.sync="draId"></i-input>
            </Form-item>
            <Form-item label="商品描述" prop="proDesc">
                <i-input type="textarea" :value.sync="formValidate.proDesc" style=""></i-input>
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
                //分页及其他固定项
                page:{          //婚纱礼服
                    currentPage:1,
                    pageSize:8,
                    totalPage:1,
                    totalRow:0
                },
                pagePart:{      //配饰
                    currentPage:1,
                    pageSize:8,
                    totalPage:1,
                    totalRow:0
                },
                searchDress:'',
                searchPart:'',
                empName:'',
                isLogin:false,
                isLoading:true,
                dressList:[],   //婚纱列表
                partList:[],    //配饰列表

                addDressModal:false,
                addDressLoading:true,
                updateDressModal:false,
                updateDressLoading:true,

                proPicPath:'/src/images/yangtu.png',
                formValidate: {
                    proName: '',
                    proBuyPrice: '',
                    proDesc: '',
                    proSalePrice: '',
                    proSellPrice: ''
                },
                ruleValidate: {
                    proName: [
                        {required: true, message: '商品名不能为空', trigger: 'blur'}
                    ],
                    proBuyPrice: [
                        {required: true, message: '商品进价不能为空', trigger: 'blur'}
                    ],
                    proDesc: [
                        {required: true, message: '商品描述不能为空', trigger: 'blur'}
                    ],
                    proSalePrice: [
                        {required: true, message: '商品标价不能为空', trigger: 'blur'}
                    ],
                    proSellPrice: [
                        {required: true, message: '商品售价不能为空', trigger: 'blur'}
                    ],
                },
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
                self.queryProductDressPage();
            },
            pagePartChange(num){
                var self = this;
                self.page.currentPage = num;
                self.queryProductPartPage();
            },
            queryAllProduct(){

            },
            queryProductDressPage(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.page.currentPage,
                    pageSize:self.page.pageSize,
                    proType:'dress'
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryProductPageByType',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.dressList = res.data.data.list;
                        self.page.currentPage = res.data.data.currentPage;
                        self.page.pageSize = res.data.data.pageSize;
                        self.page.totalPage = res.data.data.totalPage;
                        self.page.totalRow = res.data.data.totalRow;
                        self.isLoading = false
                    } else {
                        self.$Message.error('婚纱查询错误！');
                    }
                })
            },
            queryProductPartPage(){
                var self = this
                self.isLoading = true
                var data = {
                    currentPage:self.pagePart.currentPage,
                    pageSize:self.pagePart.pageSize,
                    proType:'part'
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryProductPageByType',
                    params:data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.partList = res.data.data.list;
                        self.pagePart.currentPage = res.data.data.currentPage;
                        self.pagePart.pageSize = res.data.data.pageSize;
                        self.pagePart.totalPage = res.data.data.totalPage;
                        self.pagePart.totalRow = res.data.data.totalRow;
                        self.isLoading = false
                    } else {
                        self.$Message.error('配饰查询错误！');
                    }
                })
            },
            insertDress(){
                var self = this
                var proId = 'P'+self.getNowFormatDate();
                var data = {
                    proId:proId,
                    proName:self.formValidate.proName,
                    proDesc:self.formValidate.proDesc,
                    proBuyPrice:self.formValidate.proBuyPrice,
                    proSalePrice:self.formValidate.proSalePrice,
                    proSellPrice:self.formValidate.proSellPrice,
                    proPicPath:self.proPicPath,
                    proType:'dress'
                };
                self.$http({
                    method:'POST',
                    url:'http://127.0.0.1:8080/Spring-study/insertProduct',
                    params:data
                }).then(function(res){
                    if(res.data.code=="OK"){
                        self.addDressLoading = false
                        self.queryProductDressPage()
                        self.$Message.success('插入成功！');
                    }else{
                        self.$Message.error('插入失败！');
                    }
                })
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
            self.queryProductDressPage();
            self.queryProductPartPage();
        }
    }
</script>