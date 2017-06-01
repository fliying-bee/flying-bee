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
                    <Dropdown-item v-link="{path:'/backIndex'}">返回首页</Dropdown-item>
                    <Dropdown-item @click="loginOut()">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <i-button v-else v-link="{path:'/back/backPersonInfor'}" type="text" class="header-hover">个人中心</i-button>

        </div>
    </div>
    <div style="border-bottom: 1px solid #D7DDE4"></div>
    <div class="back-content-main">
        <i-col span="24">
            <Card class="preson-info">
                <div class="preson-info-div">
                    <div class="person-item">
                        <div class="person-label">
                            <Icon type="social-snapchat"></Icon>
                            <span class="person-Info-span">用户名</span>
                        </div>
                        <span>{{empData.empName}}</span>
                    </div>
                    <div class="person-item">
                        <div class="person-label">
                            <Icon type="android-person"></Icon>
                            <span class="person-Info-span">性别</span>
                        </div>
                        <span v-if="empData.empSex==''||empData.empSex==null">--</span>
                        <span v-if="empData.empSex=='female'">女</span>
                        <span v-if="empData.empSex=='male'">男</span>
                    </div>
                    <div class="person-item">
                        <div class="person-label">
                            <Icon type="ios-locked"></Icon>
                            <span class="person-Info-span">密码</span>
                        </div>
                        <span>*******</span>
                    </div>
                    <div class="person-item">
                        <div class="person-label">
                            <Icon type="android-phone-portrait"></Icon>
                            <span class="person-Info-span">手机</span>
                        </div>
                        <span v-if="empData.empTel==''||empData.empTel==null">--</span>
                        <span v-else>{{empData.empTel}}</span>
                    </div>
                    <div class="person-item">
                        <div class="person-label">
                            <Icon type="star"></Icon>
                            <span class="person-Info-span">权限</span>
                        </div>
                        <span v-if="empData.empLimName==''||empData.empLimName==null">--</span>
                        <span v-else>{{empData.empLimName}}</span>
                    </div>
                </div>
            </Card>
        </i-col>
    </div>
    <Spin fix v-if="isLoading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
</template>

<style scoped>
    .preson-info{
        padding: 20px;
        font-size: 20px;
        margin: 0px 200px;
    }
    .preson-info-div{
        line-height: 40px;
    }
    .person-Info-span{
        width: 80px;
        display: inline-block;
    }
    .person-Info-address{
        display: inline-block;
    }
    .person-item{
        line-height: 32px;
        padding: 5px;
    }
    .person-label{
        width: 120px;
        display: inline-block;
    }
</style>

<script>
    export default {
        components: {},
        data () {
            return {
                empName:'',
                isLogin:false,
                isLoading:true,
                empId:'',
                empData:''
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
            queryEmployeeById(){
                var self = this
                var data = {
                    empId:self.empId
                };
                self.$http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/Spring-study/queryEmployeeById',
                    params: data
                }).then(function (res) {
                    if (res.data.code == "OK") {
                        self.empData = res.data.data;
                        self.isLoading = false
                    } else {
                        self.$Message.error('员工查询错误！');
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
            if(localStorage.getItem('EMPID')) {
                self.empId = localStorage.getItem('EMPID');
            }
            self.queryEmployeeById()
        }
    }
</script>