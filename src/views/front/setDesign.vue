<template>
    <!--网页头部-->
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="14">
            <i-button v-link="{path:'/login'}" type="text" class="header-login" id="color">
                <span v-if="!isLogin">hi，请登录</span>
            </i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">
                <span v-if="!isLogin">免费注册</span>
            </i-button>
        </i-col>
        <i-col span="5">
            <!--<i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>-->
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
        <Menu mode="horizontal" active-key="3">
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
                    <Icon type="ios-flame" ></Icon>
                    优惠活动
                </Menu-item>
                <Menu-item key="5" v-link="{path:'/contact'}">
                    <Icon type="android-call"></Icon>
                    联系我们
                </Menu-item>
            </div>
        </Menu>
    </div>

    <!--网页内容-->
    <div class="front-design">
        <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="稿件名称" prop="draName" class="frint-design-name">
                <i-input :value.sync="formValidate.draName" placeholder="请输入"></i-input>
            </Form-item>

            <Form-item label="作者" prop="drAuthor" class="frint-design-name">
                <i-input :value.sync="formValidate.drAuthor" placeholder="请输入"></i-input>
            </Form-item>

            <Form-item label="稿件描述" prop="draDesc">
                <i-input :value.sync="formValidate.draDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
            </Form-item>

            <Form-item label="稿件价格">
                <Input-number :min="1" :step="100" :value.sync="draPrice"></Input-number>
            </Form-item>

            <Form-item label="稿件设计图">
                <Upload action="">
                    <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                </Upload>
            </Form-item>

            <Form-item>
                <i-button type="primary" @click="insertDraft()">提交</i-button>
                <i-button type="ghost" style="margin-left: 8px" @click="reset()">重置</i-button>
            </Form-item>
        </i-form>
    </div>
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
</template>

<style scoped>

</style>

<script>
    export default {
        components: {},
        data () {
            return {
                userName:'',
                userId:'',
                isLogin:false,
                isLoading:true,
                draPicPath:'/src/images/draft/hunsha6.jpg',
                draPrice: 0,
                formValidate: {
                    draName: '',
                    drAuthor: '',
                    draDesc: ''

                },
                ruleValidate: {
                    draName: [
                        {required: true, message: '稿件名不能为空', trigger: 'blur'}
                    ],
                    drAuthor: [
                        {required: true, message: '稿件作者不能为空', trigger: 'blur'}
                    ],
                    draDesc: [
                        {required: true, message: '稿件描述不能为空', trigger: 'blur'}
                    ],
                    draPrice: [
                        {required: true, message: '稿件价格不能为空', trigger: 'blur'}
                    ]
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
                localStorage.removeItem('USERNAME');
                localStorage.removeItem('USERID');
                self.$Message.success('退出成功！');
                setTimeout(()=>{
                    self.$router.go('/login');
                    self.isLogin = false;
                },1000);
            },
            insertDraft(){
                var self = this
                if(self.userId!=''){
                    var draId = 'D'+self.getNowFormatDate()
                    var data={
                        draId:draId,
                        draName: self.formValidate.draName,
                        drAuthor: self.formValidate.drAuthor,
                        draDesc: self.formValidate.draDesc,
                        draPrice: self.draPrice,
                        draPicPath:self.draPicPath,
                        userId:self.userId
                    }
                    console.log(JSON.stringify(data))
                    self.$http({
                        method:'POST',
                        url:'http://127.0.0.1:8080/Spring-study/insertDraft',
                        params:data
                    }).then(function(res){
                        if(res.data.code=="OK"){
                            self.$router.go('/front/personCen/draftManage');
                            self.$Message.success('插入成功！');
                        }else{
                            self.$Message.error('插入失败！');
                        }
                    })
                }

            }

        },
        ready () {
            var self = this
            if(localStorage.getItem('USERNAME')){
                self.userName = localStorage.getItem('USERNAME');
                self.isLogin = true;
            }else{
                self.isLogin = false;
            }
            if(localStorage.getItem('USERID')){
                self.userId = localStorage.getItem('USERID');
            }
        }
    }
</script>