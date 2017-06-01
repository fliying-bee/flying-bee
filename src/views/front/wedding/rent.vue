<template>
    <!--网页头部-->
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="14">
            <i-button v-link="{path:'/login'}"  type="text" class="header-login" id="color">
                <span v-if="!isLogin">hi，请登录</span>
            </i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">
                <span v-if="!isLogin">免费注册</span>
            </i-button>
        </i-col>
        <i-col span="5">
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
            <Dropdown v-if="isLogin">
                <i-button type="text" class="header-hover">
                    您好，{{userName}}
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list" class="header-drop">
                    <Dropdown-item v-link="{path:'/personCenter'}">个人中心</Dropdown-item>
                    <Dropdown-item @click="loginOut()">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <i-button v-else v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>

        </i-col>
    </Row>

    <!--首页nav-->
    <div class="front-nav">
        <Menu mode="horizontal" active-key="2-3">
            <div class="front-nav-logo">
                <img src="/src/images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="/src/images/guyun_logo.png" alt="logo" class="front-nav-logopic">
            </div>
            <div class="front-nav-item">
                <Menu-item key="1" v-link="{path:'/index'}">
                    <Icon type="home"></Icon>
                    首页
                </Menu-item>
                <Submenu key="2">
                    <template slot="title">
                        <Icon type="tshirt"></Icon>
                        婚纱礼服
                    </template>
                    <Menu-item key="2-1" v-link="{path:'/front/wedding/design'}">定制</Menu-item>
                    <Menu-item key="2-2" v-link="{path:'/front/wedding/buy'}">购买</Menu-item>
                    <Menu-item key="2-3" v-link="{path:'/front/wedding/rent'}">租赁</Menu-item>
                </Submenu>
                <Menu-item key="3" v-link="{path:'/front/design'}">
                    <Icon type="ios-copy"></Icon>
                    设计投稿
                </Menu-item>
                <Menu-item key="4" v-link="{path:'/front/events'}">
                    <Icon type="ios-flame"></Icon>
                    优惠活动
                </Menu-item>
                <Menu-item key="5" v-link="{path:'/contact'}">
                    <Icon type="android-call"></Icon>
                    联系我们
                </Menu-item>
            </div>
        </Menu>
    </div>

    <!--类型一-->
    <Row justify="center" align="middle">
        <i-col span="24">
            <div class="content-title">
                婚纱礼服
            </div>
        </i-col>
    </Row>
    <div class="product-card-wrap clearfix">
        <Card class="product-card" v-for="dress in dressList">
            <a v-link="{path:'/front/product/rent/'+dress.proId}" target="_blank">
                <img :src="dress.proPicPath" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-price">{{(dress.proSalePrice*0.07).toFixed(0)}}/天</span>
                    <span class="front-buy-symbolp">¥</span>
                    <span class="front-buy-pricep">{{(dress.proSellPrice*0.07).toFixed(0)}}/天</span>
                </div>
                <div class="product-card-desc">
                    {{dress.proName}}
                </div>
            </a>
        </Card>
    </div>
    <Row type="flex" justify="center" align="middle" class="page-position-center">
        <Page show-total
              :current="page.currentPage"
              :total="page.totalRow" :page-size="page.pageSize"
              @on-change="pageChange"></Page>
    </Row>


    <!--类型二-->
    <Row justify="center" align="middle">
        <i-col span="24">
            <div class="content-title">
                唯美配饰
            </div>
        </i-col>
    </Row>
    <div class="product-card-wrap clearfix">
        <Card class="product-card" v-for="part in partList">
            <a v-link="{path:'/front/product/rent/'+dress.proId}" target="_blank">
                <img :src="part.proPicPath" class="product-cardpic">

                <div class="product-card-title">
                    <span class="front-buy-price">{{(part.proSalePrice*0.07).toFixed(0)}}/天</span>
                    <span class="front-buy-symbol">¥</span>
                    <span class="front-buy-pricep">{{(part.proSellPrice*0.07).toFixed(0)}}/天</span>
                </div>
                <div class="product-card-desc">
                    {{part.proName}}
                </div>
            </a>
        </Card>
    </div>
    <Row type="flex" justify="center" align="middle" class="page-position-center">
        <Page show-total
              :current="pagePart.currentPage"
              :total="pagePart.totalRow" :page-size="pagePart.pageSize"
              @on-change="pagePartChange"></Page>
    </Row>

    <Back-top></Back-top>
    <Row class="front-footer">
        <i-col span="10">
            <div class="front-footer-logo">
                <img src="/src/images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="/src/images/guyun_logo.png" alt="logo" class="front-nav-logopic">
            </div>
        </i-col>
        <i-col span="14">
            <div class="front-footer-nav clearfix">
                <span class="front-footer-navitem" v-link="{path:'/index'}">首页</span>
                <span class="front-footer-navitem" v-link="{path:'/front/wedding/buy'}">婚纱礼服</span>
                <span class="front-footer-navitem" v-link="{path:'/front/design'}">设计投稿</span>
                <span class="front-footer-navitem" v-link="{path:'/front/events'}">优惠活动</span>
                <span class="front-footer-navitem" v-link="{path:'/contact'}">联系我们</span>
            </div>
            <div class="front-footer-address">
                古韵婚纱版权所有&nbsp;&nbsp;&nbsp;&nbsp;古韵婚纱有限公司 沪ICP备17001234号
                <br>
                地址:江西财经大学麦庐校区&nbsp;&nbsp;&nbsp;&nbsp;123号
            </div>
        </i-col>
    </Row>
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
                search:'',
                userName:'',
                isLogin:false,
                isLoading:true,

                dressList:[],   //婚纱列表
                partList:[],    //配饰列表
            }
        },
        methods: {
            loginOut(){
                var self = this;
                localStorage.removeItem('USERNAME');
                localStorage.removeItem('USERID');
                self.$Message.success('退出成功！');
                setTimeout(()=>{
                    self.$router.go('/login');
                    self.isLogin = false;
                },1000);
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
        },
        ready () {
            var self = this;
            if(localStorage.getItem('USERNAME')){
                self.userName = localStorage.getItem('USERNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            self.queryProductDressPage();
            self.queryProductPartPage();
        }
    }
</script>