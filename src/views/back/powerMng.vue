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
                    <Dropdown-item v-link="{path:'/login'}">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <!--<i-button  >个人中心</i-button>-->
        </div>
    </div>

    <div class="front-index-bg">
        <Row type="flex">
            <i-col span="5" class="back-menu-left">

                <Menu active-key="2-6" width="auto" :open-keys="['2']">

                    <Submenu key="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            客户管理
                        </template>
                        <Menu-item key="1-1" v-link="{path:'/back/orderMng'}">订单管理</Menu-item>
                        <Menu-item key="1-2" v-link="{path:'/back/collectDraftMng'}">设计收稿</Menu-item>
                        <Menu-item key="1-3" v-link="{path:'/back/inforMng'}">信息管理</Menu-item>
                    </Submenu>
                    <Submenu key="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            运营管理
                        </template>
                        <Menu-item key="2-1" v-link="{path:'/back/commodityMng'}">商品管理</Menu-item>
                        <Menu-item key="2-2" v-link="{path:'/back/purchaseMng'}">采购管理</Menu-item>
                        <Menu-item key="2-3" v-link="{path:'/back/factoryMng'}">厂家管理</Menu-item>
                        <Menu-item key="2-4" v-link="{path:'/back/empMng'}">员工管理</Menu-item>
                        <Menu-item key="2-5" v-link="{path:'/back/formMng'}">报表管理</Menu-item>
                        <Menu-item key="2-6" v-link="{path:'/back/powerMng'}">权限管理</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="back-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">后台管理</Breadcrumb-item>
                        <Breadcrumb-item href="#">运营管理</Breadcrumb-item>
                        <Breadcrumb-item>权限管理</Breadcrumb-item>
                    </Breadcrumb>
                    <div class="back-content">
                        <div class="back-order-search">
                            <row>
                                <i-col span="2">权限</i-col>
                                <i-col span="4">
                                    <i-input type="text"></i-input>
                                </i-col>
                                <i-col span="1" offset="17">
                                    <Icon type="ios-trash" class="front-order-item-delete"></Icon>
                                    <!--<i-button type="text">付款</i-button>-->
                                </i-col>
                            </row>
                            <div>
                                <Row type="flex" align="middle" class="front-order-item-title">
                                    <i-col span="1">
                                        <Checkbox
                                                :indeterminate="indeterminate"
                                                :checked="checkAll"
                                                @click.prevent="handleCheckAll">
                                        </Checkbox>
                                    </i-col>
                                    <i-col span="4">权限</i-col>
                                    <i-col span="4">权限名</i-col>
                                    <i-col span="8">权限细则</i-col>
                                    <i-col span="2">操作</i-col>
                                    <i-col span="5">员工</i-col>
                                </Row>

                                <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                    <i-col span="1">
                                        <Checkbox
                                                :indeterminate="indeterminate"
                                                :checked="checkAll"
                                                @click.prevent="handleCheckAll">
                                        </Checkbox>
                                    </i-col>
                                    <i-col span="4">OD201704290001</i-col>
                                    <i-col span="4">订单操作</i-col>
                                    <i-col span="8">操作购买单、定制单、租赁单</i-col>
                                    <i-col span="2">
                                        <Icon type="edit"></Icon>
                                        <Icon type="ios-trash"></Icon>
                                    </i-col>
                                    <i-col span="5">
                                        张三；李四；
                                        <Icon type="edit"></Icon>
                                    </i-col>
                                </Row>
                                <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                    <i-col span="1">
                                        <Checkbox
                                                :indeterminate="indeterminate"
                                                :checked="checkAll"
                                                @click.prevent="handleCheckAll">
                                        </Checkbox>
                                    </i-col>
                                    <i-col span="4">OD201704290001</i-col>
                                    <i-col span="4">订单操作</i-col>
                                    <i-col span="8">操作购买单、定制单、租赁单</i-col>
                                    <i-col span="2">
                                        <Icon type="edit"></Icon>
                                        <Icon type="ios-trash"></Icon>
                                    </i-col>
                                    <i-col span="5">
                                        张三；李四；
                                        <Icon type="edit"></Icon>
                                    </i-col>
                                </Row>
                            </div>
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