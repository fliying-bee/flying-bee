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

                <Menu active-key="1-1" width="auto" :open-keys="['1']">

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
                        <Breadcrumb-item href="#">客户管理</Breadcrumb-item>
                        <Breadcrumb-item>订单管理</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="back-content">
                    <div class="back-content-main">
                        <Tabs type="card">
                            <Tab-pane label="购买单">
                                <!--查询-->
                                <div class="back-order-search">
                                    <row>
                                        <i-col span="2">购买单</i-col>
                                        <i-col span="4">
                                            <i-input type="text"></i-input>
                                        </i-col>
                                        <i-col span="1" offset="17">
                                            <!--<Icon type="ios-plus-outline" class="front-order-item-delete"></Icon>-->
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
                                            <i-col span="4">购买单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="3">状态</i-col>
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
                                            <i-col span="4">B201704290001</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">u201310210001</i-col>
                                            <i-col span="3">￥2000.40</i-col>
                                            <i-col span="3">已发货</i-col>
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
                                            <i-col span="4">B201704290002</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">u201310210001</i-col>
                                            <i-col span="3">￥2000.40</i-col>
                                            <i-col span="3"><i-button>发货</i-button></i-col>
                                            <i-col span="5">
                                                <a href="#">查看详情</a>
                                            </i-col>
                                        </Row>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="定制单">
                                <div class="back-order-search">
                                    <row>
                                        <i-col span="2">定制单</i-col>
                                        <i-col span="4">
                                            <i-input type="text"></i-input>
                                        </i-col>
                                        <i-col span="1" offset="17">
                                            <!--<Icon type="ios-plus-outline" class="front-order-item-delete"></Icon>-->
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
                                            <i-col span="4">定制单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="3">状态</i-col>
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
                                            <i-col span="3">已发货</i-col>
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
                                            <i-col span="3"><i-button>发货</i-button></i-col>
                                            <i-col span="5">
                                                <a href="#">查看详情</a>
                                            </i-col>
                                        </Row>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="租赁单">
                                <div class="back-order-search">
                                    <row>
                                        <i-col span="2">租赁单</i-col>
                                        <i-col span="4">
                                            <i-input type="text"></i-input>
                                        </i-col>
                                        <i-col span="1" offset="17">
                                            <!--<Icon type="ios-plus-outline" class="front-order-item-delete"></Icon>-->
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
                                            <i-col span="4">租赁单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="3">状态</i-col>
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
                                            <i-col span="4">R201704290001</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">u201310210001</i-col>
                                            <i-col span="3">￥2000.40</i-col>
                                            <i-col span="3">已发货</i-col>
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
                                            <i-col span="4">R201704290002</i-col>
                                            <i-col span="4">
                                                <span class="bold">2017-04-29</span>
                                            </i-col>
                                            <i-col span="4">u201310210001</i-col>
                                            <i-col span="3">￥2000.40</i-col>
                                            <i-col span="3"><i-button>发货</i-button></i-col>
                                            <i-col span="5">
                                                <a href="#">查看详情</a>
                                            </i-col>
                                        </Row>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="定制单审核">

                                <div class="back-order-search">
                                    <row>
                                        <i-col span="2">定制单</i-col>
                                        <i-col span="4">
                                            <i-input type="text"></i-input>
                                        </i-col>
                                        <i-col span="1" offset="17">
                                            <!--<Icon type="ios-plus-outline" class="front-order-item-delete"></Icon>-->
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
                                            <i-col span="4">定制单</i-col>
                                            <i-col span="4">日期</i-col>
                                            <i-col span="4">用户</i-col>
                                            <i-col span="3">金额</i-col>
                                            <i-col span="3">状态</i-col>
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
                                            <i-col span="3">已通过</i-col>
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
                                            <i-col span="3"><i-button>通过</i-button><i-button>未通过</i-button></i-col>
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
            return {
                options1: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了今天');
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了昨天');
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了一周前');
                            }
                        }
                    ]
                },
                options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
            }
        },
        methods: {},
        ready () {

        }
    }
</script>