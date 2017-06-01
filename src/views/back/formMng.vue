<template>
    <!--网页头部-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="../../images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../../images/guyun_logo.png" alt="logo" class="back-header-logopic">
        </div>
        <div class="back-header-nav">
            <Dropdown v-if="isLogin">
                <i-button type="text" class="header-hover">
                    您好，{{empName}}
                    <Icon type="arrow-down-b"></Icon>
                </i-button>
                <Dropdown-menu slot="list">
                    <Dropdown-item v-link="{path:'/back/backPersonInfor'}">个人中心</Dropdown-item>
                    <Dropdown-item @click="loginOut()">退出</Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <i-button v-else v-link="{path:'/back/backPersonInfor'}" type="text" class="header-hover">个人中心</i-button>
        </div>
    </div>

    <div class="front-index-bg">
        <Row type="flex">
            <i-col span="5" class="back-menu-left">

                <Menu active-key="2-5" width="auto" :open-keys="['2']">

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
                        <Breadcrumb-item>员工管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <Tabs type="card">
                            <Tab-pane label="报表一">
                                <div>
                                    <Row type="flex" align="middle" class="front-order-item-title">
                                        <i-col span="24">报表一</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">当月成交量</i-col>
                                        <i-col span="12">2000</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">当月成交金额</i-col>
                                        <i-col span="12">￥40000</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">购买单成交量</i-col>
                                        <i-col span="12">1000</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">购买单成交金额</i-col>
                                        <i-col span="12">￥20000</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">定制单成交量</i-col>
                                        <i-col span="12">500</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">定制单成交金额</i-col>
                                        <i-col span="12">￥10000</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">租赁单成交量</i-col>
                                        <i-col span="12">500</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">租赁单成交金额</i-col>
                                        <i-col span="12">￥10000</i-col>
                                    </Row>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="报表二">
                                <div>
                                    <Row type="flex" align="middle" class="front-order-item-title">
                                        <i-col span="24">报表二</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">当月支出</i-col>
                                        <i-col span="12">￥30000</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">当月收入</i-col>
                                        <i-col span="12">￥40000</i-col>
                                    </Row>
                                    <Row type="flex" align="middle" justify="center" class="front-order-item-content">
                                        <i-col span="12">当月利润</i-col>
                                        <i-col span="12">￥10000</i-col>
                                    </Row>
                                </div>
                            </Tab-pane>
                            <!--<Tab-pane label="报表三">标签三的内容</Tab-pane>-->
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