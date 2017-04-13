<template>
    <!--网页头部-->
    <Row justify="center" align="middle" class="header-bg">
        <i-col span="3" offset="2">
            您好，欢迎来到古韵婚纱店
        </i-col>
        <i-col span="11">
            <i-button v-link="{path:'/login'}" type="text" class="header-login" id="color">hi，请登录</i-button>
            <i-button v-link="{path:'/register'}" type="text" class="header-hover">免费注册</i-button>
        </i-col>
        <i-col span="8">
            <i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>
            <i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>
            <Dropdown>
                <i-button type="text" class="header-hover">
                    您好，XXX
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list" class="header-drop">
                    <Dropdown-item v-link="{path:'/personCenter'}">个人中心</Dropdown-item>
                    <Dropdown-item>退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <!--<i-button v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>-->

        </i-col>
    </Row>

    <!--首页nav-->
    <div class="front-nav">
        <Menu mode="horizontal" active-key="1">
            <div class="front-nav-logo">
                <img src="../../images/guyun_logo_z.png" alt="logo" class="front-nav-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
                <img src="../../images/guyun_logo.png" alt="logo" class="front-nav-logopic">
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
                    <Menu-item key="2-1">定制</Menu-item>
                    <Menu-item key="2-2">购买</Menu-item>
                    <Menu-item key="2-3">租赁</Menu-item>
                </Submenu>
                <Menu-item key="3" v-link="{path:'/front/design'}">
                    <Icon type="ios-copy"></Icon>
                    设计投稿
                </Menu-item>
                <Menu-item key="4">
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

    <!--网页内容-->
    <div class="front-design">
        <i-form :model="formItem" :label-width="80">
            <Form-item label="稿件名称" class="frint-design-name">
                <i-input :value.sync="" placeholder="请输入"></i-input>
            </Form-item>

            <Form-item label="稿件描述">
                <i-input :value.sync="" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
            </Form-item>

            <Form-item label="稿件价格">
                <Input-number :max="10" :min="1" :step="100" :value="0"></Input-number>
            </Form-item>

            <Form-item label="稿件设计图">
                <Upload
                        v-ref:upload
                        :show-upload-list="true"
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        style="display: inline-block;width:150px;">
                    <div style="width: 150px;height:100px;line-height: 100px;font-size: 50px;">
                        <Icon type="ios-plus-empty"></Icon>
                    </div>
                </Upload>
            </Form-item>

            <Form-item>
                <i-button type="primary">提交</i-button>
                <i-button type="ghost" style="margin-left: 8px">取消</i-button>
            </Form-item>
        </i-form>
    </div>

</template>

<style scoped>
    .front-design{
        padding: 50px 300px;
    }
    .frint-design-name{
        width: 50%;
    }
</style>

<script>
    export default {
        components: {},
        data () {
            return {}
        },
        methods: {},
        ready () {

        }
    }
</script>