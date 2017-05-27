<template>
    <Row justify="center" align="bottom" class="head-login">
        <i-col span="4" offset="3">
            <div class="front-login-logo">
                <!--<img src="../images/guyun_logo.png" class="front-nav-logopic">-->
                <img src="../images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="../images/guyun_logo.png" alt="logo" class="front-nav-logopic">
            </div>
        </i-col>
        <i-col span="11" class="login-nav-font">登录</i-col>
        <i-col span="4" class="login-nav">
            <i-button v-link="{path:'/index'}" type="text" id="color">返回首页</i-button>
            |
            <i-button v-link="{path:'/clause'}" type="text">服务条款</i-button>
        </i-col>
    </Row>
    <Row class="body-login">
        <i-col span="11" offset="3" >
            <div class="login-body-left">
                <img src="../images/guyun_logo_B.png" class="front-login-logo-B">
            </div>
        </i-col>
        <i-col span="7" class="login-body-right">
            <div >
                <Tabs active-key="key1">
                    <Tab-pane label="用户登录" key="key1">
                        <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <Form-item label="用户名" prop="userName">
                                <i-input type="text" :value.sync="formValidate.userName"></i-input>
                            </Form-item>
                            <Form-item label="密码" prop="password">
                                <i-input type="password" :value.sync="formValidate.password"></i-input>
                            </Form-item>
                            <Form-item>
                                <i-button type="primary" size="large" @click="login('formValidate')">登录</i-button>
                                <i-button type="ghost" v-link="{path:'/register'}"style="margin-left: 8px"  size="large">注册</i-button>
                            </Form-item>
                        </i-form>
                    </Tab-pane>
                    <Tab-pane label="员工登录" key="key2">
                        <i-form v-ref:emp-form-validate :model="empFormValidate" :rules="empRuleValidate" :label-width="80">
                            <Form-item label="员工名" prop="empName">
                                <i-input type="text" :value.sync="empFormValidate.empName"></i-input>
                            </Form-item>
                            <Form-item label="密码" prop="empPassword">
                                <i-input type="password" :value.sync="empFormValidate.empPassword"></i-input>
                            </Form-item>
                            <Form-item>
                                <i-button type="primary" @click="emLogin('empFormValidate')">登录</i-button>
                            </Form-item>
                        </i-form>
                    </Tab-pane>
                </Tabs>
            </div>
            <div>

            </div>
            <div></div>
        </i-col>
    </Row>
    <div class="login-footer">
        古韵婚纱版权所有&nbsp;&nbsp;&nbsp;&nbsp;古韵婚纱有限公司 沪ICP备17001234号
    </div>
</template>
<style scoped>

</style>
<script>
    export default {
        components: {

        },
        data () {
            return {
                search:'',
                formValidate: {
                    userName: '',
                    password: ''
                },
                ruleValidate: {
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
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
                },
            }
        },
        methods: {
            login(name){
                var self = this;
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        var data = {
                            username: self.formValidate.userName,
                            password: self.formValidate.password
                        };
                        self.$http({
                            method: 'GET',
                            url: 'http://127.0.0.1:8080/Spring-study/queryUserByName',
                            params: data
                        }).then(function (res) {
                            if (res.data.code == "OK") {
                                self.$Message.success('登录成功！');
                                localStorage.setItem('USERID', res.data.data.userId);
                                localStorage.setItem('USERNAME', res.data.data.userName);
                                setTimeout(()=> {
                                    self.$router.go('/index');
                                }, 1000);
                            } else {
                                self.$Message.success('用户名或密码错误！');
                            }
                        })
                    } else {
                        self.$Message.error('登录信息填写有误!');
                    }
                })
            },
            emLogin(name){
                var self = this;
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        var data = {
                            empName: self.empFormValidate.empName,
                            empPassword: self.empFormValidate.empPassword
                        };
                        self.$http({
                            method: 'GET',
                            url: 'http://127.0.0.1:8080/Spring-study/queryEmployeeByName',
                            params: data
                        }).then(function (res) {
                            if (res.data.code == "OK") {
                                self.$Message.success('登录成功！');
                                localStorage.setItem('EMPID', res.data.data.empId);
                                localStorage.setItem('EMPNAME', res.data.data.empName);
                                setTimeout(() => {
                                    self.$router.go('/backIndex');
                                }, 1000);
                            } else {
                                self.$Message.success('用户名或密码错误！');
                            }
                        })
                    } else {
                        this.$Message.error('登录信息填写有误!');
                    }
                })
            }
        },
        ready () {

        }
    }
</script>
