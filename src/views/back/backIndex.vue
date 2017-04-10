<template>
    <!--网页头部-->
    <!--<Row justify="center" align="middle" class="header-bg">-->
        <!--<i-col span="5">-->

        <!--</i-col>-->
        <!--<i-col span="19">-->
            <!--<i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>-->
            <!--<i-button v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>-->
            <!--<i-button v-link="{path:'/cart'}" type="text" class="header-hover">我的购物车</i-button>-->
        <!--</i-col>-->
    <!--</Row>-->
    <div class="back-index-header clearfix">
        <div class="back-header-logo">
            <img src="../../images/guyun_logo_z.png" alt="logo" class="back-header-logopic">&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="../../images/guyun_logo.png" alt="logo" class="back-header-logopic">
        </div>
        <div class="back-header-nav">
            <i-input :value.sync="search" icon="ios-search" placeholder="请输入关键字" style="width: 200px"></i-input>
            <i-button v-link="{path:'/personCenter'}" type="text" class="header-hover">个人中心</i-button>
            个人中心</i-button>
        </div>
    </div>
</template>

<style scoped>
    .back-index-header{
        background: #464c5b;
        padding: 10px 0;
    }
    .back-header-logo{
        height: 40px;
        float: left;
    }
    .back-header-logopic{
        height: 40px;
    }
    .back-header-nav{
        float: right;
        line-height: 40px;
    }
</style>

<script>
    export default {
        components: {

        },
        data () {
            return {

            }
        },
        methods: {

        },
        ready () {

        }
    }
</script>