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

                <Menu active-key="2-2" width="auto" :open-keys="['2']">

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
                        <Breadcrumb-item>采购管理</Breadcrumb-item>
                    </Breadcrumb>
                <div class="back-content">
                    <div class="back-content-main">
                        <Tabs type="card">
                            <Tab-pane label="已有采购单">
                                <div class="back-order-search">
                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="1">
                                                <Checkbox
                                                        :indeterminate="indeterminate"
                                                        :checked="checkAll"
                                                        @click.prevent="handleCheckAll">
                                                </Checkbox>
                                            </i-col>
                                            <i-col span="4">采购单</i-col>
                                            <i-col span="4">采购日期</i-col>
                                            <i-col span="4">厂家</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="3">操作</i-col>
                                            <i-col span="5">更多</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                            <i-col span="1">
                                                <Checkbox
                                                        :indeterminate="indeterminate"
                                                        :checked="checkAll"
                                                        @click.prevent="handleCheckAll">
                                                </Checkbox>
                                            </i-col>
                                            <i-col span="4">PeDxxxxxxxx1</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">F201310210001</i-col>
                                            <i-col span="3">￥20000.40</i-col>
                                            <i-col span="3">
                                                <Icon type="edit"></Icon>
                                                <Icon type="ios-trash"></Icon>
                                            </i-col>
                                            <i-col span="5">
                                                <a href="#">查看详情</a>
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
                                            <i-col span="4">PeDxxxxxxxx2</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">F201310214511</i-col>
                                            <i-col span="3">￥255620.40</i-col>
                                            <i-col span="3">
                                                <Icon type="edit"></Icon>
                                                <Icon type="ios-trash"></Icon>
                                            </i-col>
                                            <i-col span="5">
                                                <a href="#">查看详情</a>
                                            </i-col>
                                        </Row>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="自主采购"></Tab-pane>
                            <Tab-pane label="定制单采购">
                                <div class="back-order-search">

                                    <div>
                                        <Row type="flex" align="middle" class="front-order-item-title">
                                            <i-col span="1">
                                                <Checkbox
                                                        :indeterminate="indeterminate"
                                                        :checked="checkAll"
                                                        @click.prevent="handleCheckAll">
                                                </Checkbox>
                                            </i-col>
                                            <i-col span="4">定制单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="3">下单</i-col>
                                            <i-col span="5">更多</i-col>
                                        </Row>

                                        <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                            <i-col span="1">
                                                <Checkbox
                                                        :indeterminate="indeterminate"
                                                        :checked="checkAll"
                                                        @click.prevent="handleCheckAll">
                                                </Checkbox>
                                            </i-col>
                                            <i-col span="4">C201704290001</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">u201310210001</i-col>
                                            <i-col span="3">￥2000.40</i-col>
                                            <i-col span="3"><i-button>下单</i-button></i-col>
                                            <i-col span="5">
                                                <a href="#">查看详情</a>
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
                                            <i-col span="4">C201704290002</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">u201310210001</i-col>
                                            <i-col span="3">￥2000.40</i-col>
                                            <i-col span="3"><i-button>下单</i-button></i-col>
                                            <i-col span="5">
                                                <a href="#">查看详情</a>
                                            </i-col>
                                        </Row>
                                    </div>
                                </div>
                            </Tab-pane>
                        </Tabs>
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