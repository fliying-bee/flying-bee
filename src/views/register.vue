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
            <i-button v-link="{path:''}" type="text">服务条款</i-button>
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
                <i-form v-ref:form-validate :model="" :rules="" :label-width="80">
                    <Form-item label="用户名" >
                        <i-input :value.sync="" placeholder="请输入姓名"></i-input>
                    </Form-item>
                    <Form-item label="性别" >
                        <Radio-group :model.sync="">
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="密码" >
                        <i-input type="password" :value.sync=""></i-input>
                    </Form-item>
                    <Form-item label="确认密码" >
                        <i-input type="password" :value.sync=""></i-input>
                    </Form-item>
                    <Form-item label="邮箱" prop="mail">
                        <i-input :value.sync="" placeholder="请输入邮箱"></i-input>
                    </Form-item>
                    <Form-item label="联系电话" >
                        <i-input :value.sync="" placeholder="请手机号"></i-input>
                    </Form-item>
                    <Form-item>
                        <i-button type="primary">提交</i-button>
                        <i-button type="ghost" style="margin-left: 8px">重置</i-button>
                        <i-button type="ghost" v-link="{path:'/login'}" style="margin-left: 8px">返回登录</i-button>
                    </Form-item>
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
    .ivu-row.head-login{
        height: 86px;
        background-color: #F5F5F5;
        /*line-height: 86px;*/
    }
    .front-login-logo{
        height: 80px;
    }
    .login-nav-font{
        font-size: 24px;
        padding-top: 40px;
    }
    .login-nav{
        padding-top: 45px;
    }
    .login-body-left{
        background-color: #F5F5F5;
        padding: 10%;
        margin-right: 10px;
        height: 480px;
    }
    .front-login-logo-B{
        margin: 0 10%;
        width: 80%;
        height: 100%;
    }
    .login-body-right{
        background-color: #F5F5F5;
        padding: 50px;
        height: 480px;
    }

    .body-login{
        margin-top: 20px;
    }
    .login-footer{
        text-align: center;
        margin-top: 20px;
        color: #C1C1C1;
    }
</style>
<script>
    export default {
        components: {

        },
        data () {
            return {
                search:''
            }
        },
        methods: {

        },
        ready () {

        }
    }
</script>
