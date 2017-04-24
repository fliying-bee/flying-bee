<template>
    <!--网页头部-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="../../images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../../images/guyun_logo.png" alt="logo" class="back-header-logopic">
        </div>
        <div class="back-header-nav">
            <i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>
            <Dropdown>
                <i-button type="text" class="header-hover">
                    您好，XXX
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list">
                    <Dropdown-item v-link="{path:'/back/backPersonInfor'}">个人中心</Dropdown-item>
                    <Dropdown-item v-link="{path:'/backIndex'}">返回后台首页</Dropdown-item>
                    <Dropdown-item v-link="{path:'/login'}">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <!--<i-button  >个人中心</i-button>-->

        </div>
    </div>
    <hr style="color: #D7DDE4">
    <div class="back-content-main">
        <i-col span="24">
            <Card class="preson-info">
                <div class="preson-info-div">
                    <div >
                        <Icon type="social-snapchat"></Icon>
                        <span class="person-Info-span">用户名</span>
                        <span>张三</span>
                        <Icon type="edit"></Icon>
                    </div>
                    <div>
                        <Icon type="android-person"></Icon>
                        <span class="person-Info-span">性别</span>
                        <span>男</span>

                        <!--<Icon type="female"></Icon>-->
                        <Icon type="male"></Icon>
                        <span></span>
                        <Icon type="edit"></Icon>
                    </div>
                    <div>
                        <Icon type="ios-locked"></Icon>
                        <span class="person-Info-span">密码</span>
                        <span>*******</span>
                        <Icon type="edit"></Icon>
                    </div>
                    <div>
                        <Icon type="email"></Icon>
                        <span class="person-Info-span">邮箱</span>
                        <span>1870260xxxx@163.com</span>
                        <Icon type="edit"></Icon>
                    </div>
                    <div>
                        <Icon type="android-phone-portrait"></Icon>
                        <span class="person-Info-span">手机</span>
                        <span>187-0260-xxxx</span>
                        <Icon type="edit"></Icon>
                    </div>
                </div>
                <div>
                    <Icon type="star"></Icon>
                    <span class="person-Info-span">权限</span>
                    <span class="person-Info-address">
                        权限一：查看订单
                        <br>
                        权限二：审核稿件
                    </span>
                    <!--<div>-->
                        <!--<i-form v-ref:form-dynamic :model="formDynamic" :label-width="80">-->
                            <!--<Form-item-->
                                    <!--v-for="item in formDynamic.items"-->
                                    <!--:label="'地址' + ($index + 1)"-->
                                    <!--:prop="'items.' + $index + '.value'"-->
                                    <!--:rules="{required: true, message: '项目' + ($index + 1) +'不能为空', trigger: 'blur'}">-->
                                <!--<Row>-->
                                    <!--<i-col span="18">-->
                                        <!--<span v-if="!it">dizji===</span>-->
                                        <!--<i-input type="text" :value.sync="" v-if="it" placeholder="请输入..."></i-input>-->
                                    <!--</i-col>-->
                                    <!--<i-col span="4" offset="1">-->
                                        <!--<i-button type="ghost" @click="handleRemove(item)">删除</i-button>-->
                                    <!--</i-col>-->
                                <!--</Row>-->
                            <!--</Form-item>-->
                            <!--<Form-item>-->
                                <!--<Row>-->
                                    <!--<i-col span="12">-->
                                        <!--<i-button type="dashed" long @click="handleAdd" icon="plus-round">新增</i-button>-->
                                    <!--</i-col>-->
                                <!--</Row>-->
                            <!--</Form-item>-->
                            <!--<Form-item>-->
                                <!--<i-button type="primary" @click="handleSubmit('formDynamic')">提交</i-button>-->
                                <!--<i-button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</i-button>-->
                            <!--</Form-item>-->
                        <!--</i-form>-->
                    <!--</div>-->
                    <!--<Icon type="edit" @click="it=!it"></Icon>-->
                    <!--<Icon type="ios-plus-outline"></Icon>-->
                </div>
            </Card>
        </i-col>
    </div>
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
</style>

<script>
    export default {
        components: {},
        data () {
            return {
                    it:false,
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