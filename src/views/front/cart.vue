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
                            :checked="checkAllBuyBox"
                            @click.prevent="CheckBuyAll">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="6" class="text-center">商品信息</i-col>
                        <i-col span="3" class="text-center">单价</i-col>
                        <i-col span="3" class="text-center">数量</i-col>
                        <i-col span="3" class="text-center">型号</i-col>
                        <i-col span="3" class="text-center">金额</i-col>
                        <i-col span="3" class="text-center">操作</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item"
                         v-if="buyList.length==0">
                        <i-col span="2">暂无商品</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item"
                         v-for="buy in buyList" v-else>
                        <i-col span="1">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="buy.isChecked"
                                    @click.prevent="checkBuy(buy)">
                            </Checkbox>
                        </i-col>
                        <i-col span="2">
                            <img :src="buy.proPicPath" alt="logo" class="front-cart-itempic">
                        </i-col>
                        <i-col span="6" class="text-center">{{buy.proName}}</i-col>
                        <i-col span="3" class="text-center">{{buy.proSellPrice}}</i-col>
                        <i-col span="3" class="text-center">{{buy.proDetailCount}}</i-col>
                        <i-col span="3" class="text-center">{{buy.proDetailType}}</i-col>
                        <i-col span="3" class="text-center">{{buy.priceSum}}</i-col>
                        <i-col span="3" class="text-center cursor">
                            <i-button type="text" class="cursor" @click="deleteBuyItem(buy)">删除</i-button>
                        </i-col>
                    </Row>
                    <Row type="flex" align="middle" class="front-cart-bottom">
                        <i-col span="2">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="checkboxBuy"
                                    @click.prevent="CheckBuyAll">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="text" class="cursor" @click="deleteBuyList()">删除</i-button>

                        </i-col>
                        <i-col span="3" offset="11" class="text-center">
                            已选择商品 {{buyItemCount}} 件
                        </i-col>
                        <i-col span="2" class="text-center">
                                订单合计：
                        </i-col>
                        <i-col span="2">
                            <span class="cart-money">¥{{buyPriceSum}}</span>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="primary" @click="buy()">结算</i-button>
                        </i-col>
                    </Row>
                </Tab-pane>
                <Tab-pane label="商品租赁">
                    <Row type="flex" align="middle" justify="center" class="front-cart-title">
                        <i-col span="3">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="checkAllRentBox"
                                    @click.prevent="CheckRentAll">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="6" class="text-center">商品信息</i-col>
                        <i-col span="2" class="text-center">租赁单价</i-col>
                        <i-col span="2" class="text-center">押金</i-col>
                        <i-col span="2" class="text-center">数量</i-col>
                        <i-col span="2" class="text-center">型号</i-col>
                        <i-col span="2" class="text-center">租期&nbsp;/&nbsp;天</i-col>
                        <i-col span="2" class="text-center">金额</i-col>
                        <i-col span="3" class="text-center">操作</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item"
                         v-if="rentList.length==0">
                        <i-col span="2">暂无商品</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item"
                         v-for="rent in rentList" v-else>
                        <i-col span="1">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="rent.isChecked"
                                    @click.prevent="checkRent(rent)">
                            </Checkbox>
                        </i-col>
                        <i-col span="2">
                            <img :src="rent.proPicPath" alt="logo" class="front-cart-itempic">
                        </i-col>
                        <i-col span="6" class="text-center">{{rent.proName}}</i-col>
                        <i-col span="2" class="text-center">{{rent.rentPrice}}</i-col>
                        <i-col span="2" class="text-center">{{rent.pledge}}</i-col>
                        <i-col span="2" class="text-center">{{rent.proDetailCount}}</i-col>
                        <i-col span="2" class="text-center">{{rent.proDetailType}}</i-col>
                        <i-col span="2" class="text-center">{{rent.rentTime}}</i-col>
                        <i-col span="2" class="text-center">{{rent.priceSum}}</i-col>
                        <i-col span="3" class="text-center cursor">
                            <i-button type="text" class="cursor" @click="deleteRentItem(rent)">删除</i-button>
                        </i-col>
                    </Row>
                    <Row type="flex" align="middle" class="front-cart-bottom">
                        <i-col span="2">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="checkboxRent"
                                    @click.prevent="CheckRentAll">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="text" class="cursor" @click="deleteRentList()">删除</i-button>

                        </i-col>
                        <i-col span="3" offset="11" class="text-center">
                            已选择商品 {{rentItemCount}} 件
                        </i-col>
                        <i-col span="2" class="text-center">
                            订单合计：
                        </i-col>
                        <i-col span="2">
                            <span class="cart-money">¥{{rentPriceSum}}</span>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="primary" @click="rent()">结算</i-button>
                        </i-col>
                    </Row>
                </Tab-pane>
                <Tab-pane label="商品定制">
                    <Row type="flex" align="middle" justify="center" class="front-cart-title">
                        <i-col span="3">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="checkAllCustomBox"
                                    @click.prevent="CheckCustomAll">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="6" class="text-center">商品信息</i-col>
                        <i-col span="3" class="text-center">单价</i-col>
                        <i-col span="3" class="text-center">数量</i-col>
                        <i-col span="3" class="text-center">型号</i-col>
                        <i-col span="3" class="text-center">金额</i-col>
                        <i-col span="3" class="text-center">操作</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item"
                         v-if="customList.length==0">
                        <i-col span="2">暂无商品</i-col>
                    </Row>
                    <Row type="flex" align="middle" justify="center" class="front-cart-item"
                         v-for="custom in customList" v-else>
                        <i-col span="1">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="custom.isChecked"
                                    @click.prevent="checkCustom(custom)">
                            </Checkbox>
                        </i-col>
                        <i-col span="2">
                            <img :src="custom.proPicPath" alt="logo" class="front-cart-itempic">
                        </i-col>
                        <i-col span="6" class="text-center">{{custom.proName}}</i-col>
                        <i-col span="3" class="text-center">{{custom.proSellPrice}}</i-col>
                        <i-col span="3" class="text-center">{{custom.proDetailCount}}</i-col>
                        <i-col span="3" class="text-center">{{custom.proDetailType}}</i-col>
                        <i-col span="3" class="text-center">{{custom.priceSum}}</i-col>
                        <i-col span="3" class="text-center cursor">
                            <i-button type="text" class="cursor" @click="deleteCustomItem(custom)">删除</i-button>
                        </i-col>
                    </Row>
                    <Row type="flex" align="middle" class="front-cart-bottom">
                        <i-col span="2">
                            <Checkbox
                                    :indeterminate="indeterminate"
                                    :checked="checkboxCustom"
                                    @click.prevent="CheckCustomAll">全选
                            </Checkbox>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="text" class="cursor" @click="deleteCustomList()">删除</i-button>

                        </i-col>
                        <i-col span="3" offset="11" class="text-center">
                            已选择商品 {{customItemCount}} 件
                        </i-col>
                        <i-col span="2" class="text-center">
                            订单合计：
                        </i-col>
                        <i-col span="2">
                            <span class="cart-money">¥{{customPriceSum}}</span>
                        </i-col>
                        <i-col span="2" class="text-center">
                            <i-button type="primary" @click="custom()">结算</i-button>
                        </i-col>
                    </Row>
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
                checkAllBuyBox:false,  //全选按钮
                checkboxBuy:false,
                checkAllRentBox:false,  //全选按钮
                checkboxRent:false,
                checkAllCustomBox:false,  //全选按钮
                checkboxCustom:false,
                buyList:[],         //购买单
                rentList:[],         //租赁单
                customList:[],         //租赁单
                buyItemCount:0,     //选择的数量
                rentItemCount:0,     //选择的数量
                customItemCount:0,     //选择的数量
                buyPriceSum:0,     //已选择的商品价格
                rentPriceSum:0,     //已选择的商品价格
                customPriceSum:0,     //已选择的商品价格
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
            loadCart(){
                var self = this
                var buy = localStorage.getItem('BUYLIST')
                if(buy){
                    self.buyList = JSON.parse(buy);
                    for(var i=0;i<self.buyList.length;i++){
                        if(self.buyList[i].isChecked){
                            self.buyItemCount++
                            self.buyPriceSum+=self.buyList[i].priceSum
                        }
                    }
                }
                var rent = localStorage.getItem('RENTLIST')
                if(rent){
                    self.rentList = JSON.parse(rent);
                    for(var i=0;i<self.rentList.length;i++){
                        if(self.rentList[i].isChecked){
                            self.rentItemCount++
                            self.rentPriceSum+=self.rentList[i].priceSum
                        }
                    }
                }
                var custom = localStorage.getItem('CUSTOMLIST')
                if(custom){
                    self.customList = JSON.parse(custom);
                    for(var i=0;i<self.customList.length;i++){
                        if(self.customList[i].isChecked){
                            self.customItemCount++
                            self.customPriceSum+=self.customList[i].priceSum
                        }
                    }
                }
            },
            CheckBuyAll(){
                var self = this;
                if(self.checkAllBuyBox==false){
                    self.checkAllBuyBox=true
                    self.buyItemCount=0
                    self.buyPriceSum=0
                    for(var i=0;i<self.buyList.length;i++){
                        self.buyList[i].isChecked = true
                        self.buyItemCount++
                        self.buyPriceSum+=self.buyList[i].priceSum
                    }
                    self.checkboxBuy=true
                }else{
                    self.checkAllBuyBox=false
                    for(var i=0;i<self.buyList.length;i++){
                        self.buyList[i].isChecked = false
                        self.buyItemCount=0
                        self.buyPriceSum=0
                    }
                    self.checkboxBuy=false
                }

            },
            CheckRentAll(){
                var self = this;
                if(self.checkAllRentBox==false){
                    self.checkAllRentBox=true
                    self.rentItemCount=0
                    self.rentPriceSum=0
                    for(var i=0;i<self.rentList.length;i++){
                        self.rentList[i].isChecked = true
                        self.rentItemCount++
                        self.rentPriceSum+=self.rentList[i].priceSum
                    }
                    self.checkboxRent=true
                }else{
                    self.checkAllRentBox=false
                    for(var i=0;i<self.rentList.length;i++){
                        self.rentList[i].isChecked = false
                        self.rentItemCount=0
                        self.rentPriceSum=0
                    }
                    self.checkboxRent=false
                }

            },
            CheckCustomAll(){
                var self = this;
                if(self.checkAllCustomBox==false){
                    self.checkAllCustomBox=true
                    self.customItemCount=0
                    self.customPriceSum=0
                    for(var i=0;i<self.customList.length;i++){
                        self.customList[i].isChecked = true
                        self.customItemCount++
                        self.customPriceSum+=self.customList[i].priceSum
                    }
                    self.checkboxCustom=true
                }else{
                    self.checkAllCustomBox=false
                    for(var i=0;i<self.customList.length;i++){
                        self.customList[i].isChecked = false
                        self.customItemCount=0
                        self.customPriceSum=0
                    }
                    self.checkboxCustom=false
                }

            },
            checkBuy(item){
                var self = this
                item.isChecked=!item.isChecked
                self.buyItemCount = 0
                self.buyPriceSum = 0
                for(var i=0;i<self.buyList.length;i++){
                    if(self.buyList[i].isChecked){
                        self.buyItemCount++
                        self.buyPriceSum+=self.buyList[i].priceSum
                    }
                }
                localStorage.setItem('BUYLIST',JSON.stringify(self.buyList));
            },
            checkRent(item){
                var self = this
                item.isChecked=!item.isChecked
                self.rentItemCount = 0
                self.rentPriceSum = 0
                for(var i=0;i<self.rentList.length;i++){
                    if(self.rentList[i].isChecked){
                        self.rentItemCount++
                        self.rentPriceSum+=self.rentList[i].priceSum
                    }
                }
                localStorage.setItem('RENTLIST',JSON.stringify(self.rentList));
            },
            checkCustom(item){
                var self = this
                item.isChecked=!item.isChecked
                self.customItemCount = 0
                self.customPriceSum = 0
                for(var i=0;i<self.customList.length;i++){
                    if(self.customList[i].isChecked){
                        self.customItemCount++
                        self.customPriceSum+=self.customList[i].priceSum
                    }
                }
                localStorage.setItem('CUSTOMLIST',JSON.stringify(self.customList));
            },
            deleteBuyList(){
                var self = this
                var sList = []
                for(var i=0;i<self.buyList.length;i++){
                    if(!self.buyList[i].isChecked){
                        sList.push(self.buyList[i])
                    }
                }
                self.buyList = sList
                if(self.buyList.length!=0){
                    localStorage.setItem('BUYLIST',JSON.stringify(self.buyList));
                }else{
                    localStorage.removeItem('BUYLIST');
                }            },
            deleteRentList(){
                var self = this
                var sList = []
                for(var i=0;i<self.rentList.length;i++){
                    if(!self.rentList[i].isChecked){
                        sList.push(self.rentList[i])
                    }
                }
                self.rentList = sList
                if(self.rentList.length!=0){
                    localStorage.setItem('RENTLIST',JSON.stringify(self.rentList));
                }else{
                    localStorage.removeItem('RENTLIST');
                }            },
            deleteCustomList(){
                var self = this
                var sList = []
                for(var i=0;i<self.customList.length;i++){
                    if(!self.customList[i].isChecked){
                        sList.push(self.customList[i])
                    }
                }
                self.customList = sList
                if(self.customList.length!=0){
                    localStorage.setItem('CUSTOMLIST',JSON.stringify(self.customList));
                }else{
                    localStorage.removeItem('CUSTOMLIST');
                }            },
            deleteBuyItem(item){
                var self = this
                self.buyList.$remove(item)
                if(self.buyList.length!=0){
                    localStorage.setItem('BUYLIST',JSON.stringify(self.buyList));
                }else{
                    localStorage.removeItem('BUYLIST');
                }
            },
            deleteRentItem(item){
                var self = this
                self.rentList.$remove(item)
                if(self.rentList.length!=0){
                    localStorage.setItem('RENTLIST',JSON.stringify(self.rentList));
                }else{
                    localStorage.removeItem('RENTLIST');
                }
            },
            deleteCustomItem(item){
                var self = this
                self.customList.$remove(item)
                if(self.customList.length!=0){
                    localStorage.setItem('CUSTOMLIST',JSON.stringify(self.customList));
                }else{
                    localStorage.removeItem('CUSTOMLIST');
                }
            },
            buy(){
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
            },
            rent(){
                var self = this
                var time = [], timeNew = []
                for(var i=0;i<self.rentList.length;i++){
                    if(self.rentList[i].isChecked){
                        time.push(self.rentList[i].rentTime)
                    }
                }
                console.log(JSON.stringify(time),'1')
                if(time.length>0){
                    for(var i=0;i<time.length;i++){
                        if(timeNew.indexOf(time[i])<0){
                            timeNew.push(time[i])
                        }
                    }
                    console.log(JSON.stringify(timeNew),'2')

                    if(timeNew.length==1){
                        self.$router.go('/front/sureOrder/rent/cart')
                    }else{
                        self.$Message.error('同一订单租期必须一致！');
                    }
                }else{
                    self.$Message.error('请选择至少一个商品！');
                }
            },
            custom(){
                var self = this
                for(var i=0;i<self.customList.length;i++){
                    if(self.customList[i].isChecked){
                        self.$router.go('/front/sureOrder/custom/cart')
                        break;
                    }
                    if(i==(self.customList.length-1)){
                        self.$Message.error('请选择至少一个商品！');
                        break;
                    }
                }
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
            self.loadCart()
        }
    }
</script>