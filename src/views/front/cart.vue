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
        <Menu mode="horizontal" active-key="1">
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

    <Row type="flex" justify="center" align="middle" class="sureOrder-wrap">
        <i-col span="24">
            <Tabs type="card" class="front-cart-tab">
                <Tab-pane label="商品购买">
                    <Row type="flex" align="middle" justify="center" class="front-cart-title">
                        <i-col span="3">
                            <Checkbox
                            :indeterminate="indeterminate"
                            :checked="checkAllBox"
                            @click.prevent="CheckAll">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="6" class="text-center">商品信息</i-col>
                        <i-col span="3" class="text-center">单价</i-col>
                        <i-col span="3" class="text-center">数量</i-col>
                        <i-col span="3" class="text-center">型号</i-col>
                        <i-col span="3" class="text-center">金额</i-col>
                        <i-col span="3" class="text-center">操作</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item" v-if="buyList.length==0">
                        <i-col span="2">暂无商品</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item"
                         v-for="buy in buyList" v-else>
                        <i-col span="1">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="buy.isChecked"
                                    @click.prevent="checkbox(buy)">
                            </Checkbox>
                        </i-col>
                        <i-col span="2">
                            <img :src="buy.proPicPath" alt="logo" class="front-cart-itempic">
                        </i-col>
                        <i-col span="6" class="text-center">{{buy.proName}}</i-col>
                        <i-col span="3" class="text-center">{{buy.proSellPrice}}</i-col>
                        <i-col span="3" class="text-center">
                            <span>{{buy.proDetailCount}}</span>
                            <!--<Input-number :min="1" :value="buy.proDetailCount"-->
                                          <!--on-change="changeCount" v-else></Input-number>-->
                        </i-col>
                        <i-col span="3" class="text-center">{{buy.proSellPrice*buy.proDetailCount}}</i-col>
                        <i-col span="3" class="text-center">{{buy.proDetailType}}</i-col>
                        <i-col span="3" class="text-center cursor">
                            <i-button type="text" class="cursor" @click="deleteItem(buy)">删除</i-button>
                            <!--<i-button type="text" class="cursor" @click="updateItem(buy,$index)">编辑</i-button>-->
                        </i-col>
                    </Row>
                    <Row type="flex" align="middle" class="front-cart-bottom">
                        <i-col span="2">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="checkbox2"
                                    @click.prevent="">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="text" class="cursor">删除</i-button>

                        </i-col>
                        <i-col span="3" offset="11" class="text-center">
                            已选择商品 {{buyItemCount}} 件
                        </i-col>
                        <i-col span="2" class="text-center">
                                订单合计：
                        </i-col>
                        <i-col span="2">
                            <span class="cart-money">¥{{cartPriceSum}}</span>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="primary" @click="cart()">结算</i-button>
                        </i-col>
                    </Row>
                </Tab-pane>
                <Tab-pane label="商品租赁">

                </Tab-pane>
                <Tab-pane label="商品定制">

                </Tab-pane>
            </Tabs>
        </i-col>
    </Row>

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
    <Back-top></Back-top>

</template>

<style scoped>

</style>

<script>
    export default {
        components: {},
        data () {
            return {
                search:'',
                userName:'',
                isLogin:false,
                isLoading:true,
                checkAllBox:false,  //全选按钮
                checkbox1:false,
                checkbox2:false,
                buyList:[],         //购买单
                buyItemCount:0,     //选择的数量
                isEdit:null,     //编辑index
                editItem:'',     //正在编辑的项目
                cartPriceSum:0,     //已选择的商品价格
            }
        },
        methods: {
            CheckAll(){
                var self = this;
                if(self.checkAllBox==false){
                    self.checkAllBox=true
                    for(var i=0;i<self.buyList.length;i++){
                        self.buyList[i].isChecked = true
                    }
                    self.checkbox2=true
                }else{
                    self.checkAllBox=false
                    for(var i=0;i<self.buyList.length;i++){
                        self.buyList[i].isChecked = false
                    }
                    self.checkbox2=false
                }

            },
            loadCart(){
                var self = this
                var buy = localStorage.getItem('BUYLIST')
                if(buy){
                    self.buyList = JSON.parse(buy);
                }

            },
            checkbox(item){
                var self = this
                item.isChecked=!item.isChecked
                self.buyItemCount = 0
                self.cartPriceSum = 0
                for(var i=0;i<self.buyList.length;i++){
                    if(self.buyList[i].isChecked){
                        self.buyItemCount++
                        self.cartPriceSum+=self.buyList[i].priceSum
                    }
                }
                localStorage.setItem('BUYLIST',JSON.stringify(self.buyList));
            },
            updateItem(buy,index){
                var self = this
                self.isEdit = index
            },
            deleteList(){
                var self = this
                for(var i=0;i<self.buyList.length;i++){
                    if(self.buyList[i].isChecked){
                        self.buyList.$remove(self.buyList[i])
                    }
                }
            },
            deleteItem(item){
                var self = this
                self.buyList.$remove(item)
                localStorage.setItem('BUYLIST',JSON.stringify(self.buyList));

            },
            cart(){
                var self = this
                for(var i=0;i<self.buyList.length;i++){
                    if(self.buyList[i].isChecked){
                        self.$router.go('/front/sureOrder/buy/cart')
                        break;
                    }
                    if(i==(self.buyList.length-1)){
                        self.$Message.error('请选择至少一个商品！');
                        break;
                    }
                }
            }
        },
        ready () {
            var self = this;
            if(localStorage.getItem('USERNAME')){
                self.userName = localStorage.getItem('USERNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            self.loadCart()
        }
    }
</script>