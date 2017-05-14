<template>
    <Row justify="center" align="bottom" class="head-login">
        <i-col span="4" offset="3">
            <div class="front-login-logo">
                <!--<img src="../images/guyun_logo.png" class="front-nav-logopic">-->
                <img src="../images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="../images/guyun_logo.png" alt="logo" class="front-nav-logopic">
            </div>
        </i-col>
        <i-col span="11" class="login-nav-font">注册</i-col>
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
                <i-form v-ref:form-validate :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="用户名" prop="userName">
                        <i-input :value.sync="formValidate.userName" placeholder="请输入姓名"></i-input>
                    </Form-item>
                    <Form-item label="密码" prop="password" placeholder="请输入密码">
                        <i-input type="password" :value.sync="formValidate.password"></i-input>
                    </Form-item>
                    <Form-item label="确认密码" prop="surePassword">
                        <i-input type="password" :value.sync="formValidate.surePassword"></i-input>
                    </Form-item>
                    <Form-item label="性别" >
                        <Radio-group :model.sync="userSex">
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="地址">
                        <i-input :value.sync="userAddr" placeholder="请输入地址"></i-input>
                    </Form-item>
                    <Form-item label="联系电话" >
                        <i-input :value.sync="formValidate.userTel" placeholder="请输入手机号"></i-input>
                    </Form-item>
                    <Form-item>
                        <i-button type="primary" @click="register('formValidate')">提交</i-button>
                        <i-button type="ghost" style="margin-left: 5px" @click="reset('formValidate')">重置</i-button>
                    </Form-item>
                    <div class="clearfix">
                        <span v-link="{path:'/login'}" class="go-login">返回登录>>></span>
                    </div>
                </i-form>
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
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formValidate.surePassword !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('surePassword');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formValidate.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                search: '',
                userSex: '',
                userAddr: '',
                userTel: '',
                formValidate: {
                    userName: '',
                    password: '',
                    surePassword: ''
                },
                ruleValidate: {
                    userName: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    surePassword: [
                        {required: true, message: '确认密码不能为空', trigger: 'blur'},
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + month + strDate
                        + date.getHours() + date.getMinutes() + date.getSeconds();
                return currentdate;
            },
            reset(name){
                this.$refs[name].resetFields();
            },
            register(name){
                var self = this
                var userId = 'U'+self.getNowFormatDate();
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var data = {
                            userId:userId,
                            userName:self.formValidate.userName,
                            password:self.formValidate.password,
                            userTel:self.userTel,
                            userSex:self.userSex,
                            userAddr:self.userAddr
                        };
                        console.log(JSON.stringify(data),'222')
                        self.$http({
                            method:'GET',
                            url:'http://127.0.0.1:8080/Spring-study/insertUser',
                            params:data
                        }).then(function(res){
                            console.log(res.data)
                            if(res.data.code=="OK"){
                                this.$Message.success('注册成功!');
                                setTimeout(()=>{
                                    self.$router.go('/login');
                                },1000);
                            }else{
                                self.$Message.success('注册失败！');
                            }
                        })

                    } else {
                        this.$Message.error('注册信息填写有误!');
                    }
                })
            }
        },
        ready () {

        }
    }
</script>
