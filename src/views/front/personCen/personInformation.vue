<template>
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="9">
            <i-button v-link="{path:'/login'}" type="text" class="header-login" id="color">hi，请登录</i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">免费注册</i-button>
        </i-col>
        <i-col span="10">
            <i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>
            <i-button v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
            <i-button v-link="{path:'/index'}" type="text" id="color">返回首页</i-button>
        </i-col>
    </Row>
    <div class="front-index-bg">
        <Row type="flex">
            <i-col span="5" class="back-menu-left">

                <Menu active-key="1-1" width="auto" :open-keys="['1']">

                    <Submenu key="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            信息管理
                        </template>
                        <Menu-item key="1-1" v-link="{path:'/front/personCen/personInformation'}">个人基本信息管理</Menu-item>
                    </Submenu>
                    <Submenu key="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            订单管理
                        </template>
                        <Menu-item key="2-1" v-link="{path:'/front/personCen/buyManage'}">购买管理</Menu-item>
                        <Menu-item key="2-2" v-link="{path:'/front/personCen/designManage'}">定制管理</Menu-item>
                        <Menu-item key="2-3" v-link="{path:'/front/personCen/rentManage'}">租赁管理</Menu-item>
                    </Submenu>
                    <Submenu key="3">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            投稿管理
                        </template>
                        <Menu-item key="3-1" v-link="{path:'/front/personCen/draftManage'}">投稿管理</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="back-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">个人中心</Breadcrumb-item>
                        <Breadcrumb-item href="#">信息管理</Breadcrumb-item>
                        <Breadcrumb-item>个人基本信息管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <i-col span="24">
                            <Card class="preson-info">
                                <div class="preson-info-div">
                                    <div >
                                        <Icon type="social-snapchat"></Icon>
                                        <span class="person-Info-span">用户名</span>
                                        <span></span>
                                        <Icon type="edit"></Icon>
                                    </div>
                                    <div>
                                        <Icon type="android-person"></Icon>
                                        <span class="person-Info-span">性别</span>
                                        <span></span>
                                        <Icon type="female"></Icon>
                                        <Icon type="male"></Icon>
                                        <span></span>
                                        <Icon type="edit"></Icon>
                                    </div>
                                    <div>
                                        <Icon type="ios-locked"></Icon>
                                        <span class="person-Info-span">密码</span>
                                        <span></span>
                                        <Icon type="edit"></Icon>
                                    </div>
                                    <div>
                                        <Icon type="email"></Icon>
                                        <span class="person-Info-span">邮箱</span>
                                        <span></span>
                                        <Icon type="edit"></Icon>
                                    </div>
                                    <div>
                                        <Icon type="android-phone-portrait"></Icon>
                                        <span class="person-Info-span">手机</span>
                                        <span></span>
                                        <Icon type="edit"></Icon>
                                    </div>
                                </div>
                                <div>
                                    <Icon type="ios-home"></Icon>
                                    <span class="person-Info-span">地址</span>
                                    <span class="person-Info-address"></span>
                                    <div>
                                        <i-form v-ref:form-dynamic :model="formDynamic" :label-width="80">
                                            <Form-item
                                                    v-for="item in formDynamic.items"
                                                    :label="'地址' + ($index + 1)"
                                                    :prop="'items.' + $index + '.value'"
                                                    :rules="{required: true, message: '项目' + ($index + 1) +'不能为空', trigger: 'blur'}">
                                                <Row>
                                                    <i-col span="18">
                                                        <i-input type="text" :value.sync="item.value" placeholder="请输入..."></i-input>
                                                    </i-col>
                                                    <i-col span="4" offset="1">
                                                        <i-button type="ghost" @click="handleRemove(item)">删除</i-button>
                                                    </i-col>
                                                </Row>
                                            </Form-item>
                                            <Form-item>
                                                <Row>
                                                    <i-col span="12">
                                                        <i-button type="dashed" long @click="handleAdd" icon="plus-round">新增</i-button>
                                                    </i-col>
                                                </Row>
                                            </Form-item>
                                            <Form-item>
                                                <i-button type="primary" @click="handleSubmit('formDynamic')">提交</i-button>
                                                <i-button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</i-button>
                                            </Form-item>
                                        </i-form>
                                    </div>
                                    <Icon type="edit"></Icon>
                                    <Icon type="ios-plus-outline"></Icon>
                                </div>
                            </Card>
                        </i-col>
                    </div>
                </div>
                <div class="back-copy">
                    2016-2017 &copy; 古韵婚纱
                </div>
            </i-col>
        </Row>
    </div>
</template>

<style scoped>
.preson-info{
    padding: 20px;
    font-size: 20px;
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
</style>

<script>
    export default {
        components: {},
        data () {
            return {
                formDynamic: {
                    items: [
                        {
                            value: ''
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove (item) {
                this.formDynamic.items.$remove(item);
            }
        },
        ready () {

        }
    }
</script>