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
                <Tabs active-key="key1">
                    <Tab-pane label="用户登录" key="key1">
                        <i-form v-ref:form-custom :model="" :rules="" :label-width="80">
                            <Form-item label="用户名">
                                <i-input type="text" :value.sync="" number></i-input>
                            </Form-item>
                            <Form-item label="密码">
                                <i-input type="password" :value.sync=""></i-input>
                            </Form-item>
                            <Form-item>
                                <i-button type="primary" size="large">登录</i-button>
                                <i-button type="ghost" v-link="{path:'/register'}"style="margin-left: 8px"  size="large">注册</i-button>
                            </Form-item>
                        </i-form>
                    </Tab-pane>
                    <Tab-pane label="员工登录" key="key2">
                        <i-form v-ref:form-custom :model="" :rules="" :label-width="80">
                            <Form-item label="员工名" >
                                <i-input type="text" :value.sync="" number></i-input>
                            </Form-item>
                            <Form-item label="密码" >
                                <i-input type="password" :value.sync=""></i-input>
                            </Form-item>
                            <Form-item>
                                <i-button type="primary" >登录</i-button>
                            </Form-item>
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
                search:''
            }
        },
        methods: {

        },
        ready () {

        }
    }
</script>
