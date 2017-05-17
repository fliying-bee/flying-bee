/**
 * Created by aresn on 16/8/22.
 */
const routers = {
    '/index': {
        component (resolve) {
            require(['./views/index.vue'], resolve);
        }
    },
    '/login':{
        component (resolve) {
            require(['./views/login.vue'], resolve);
        }
    },
    '/register':{
        component (resolve) {
            require(['./views/register.vue'], resolve);
        }
    },
    '/personCenter':{
        component (resolve) {
            require(['./views/personCenter.vue'], resolve);
        }
    },
    '/cart':{
        component (resolve) {
            require(['./views/front/cart.vue'], resolve);
        }
    },
    '/clause':{
        component (resolve) {
            require(['./views/clause.vue'], resolve);
        }
    },
    '/contact':{
        component (resolve) {
            require(['./views/front/contact.vue'], resolve);
        }
    },
    '/front/design':{
        component (resolve) {
            require(['./views/front/setDesign.vue'], resolve);
        }
    },
    '/front/events':{
        component (resolve) {
            require(['./views/front/events.vue'], resolve);
        }
    },
    '/front/product/:proId':{
        component (resolve) {
            require(['./views/front/product.vue'], resolve);
        }
    },
    '/front/personCen/personInformation':{
        component (resolve) {
            require(['./views/front/personCen/personInformation.vue'], resolve);
        }
    },
    '/front/personCen/buyManage':{
        component (resolve) {
            require(['./views/front/personCen/buyManage.vue'], resolve);
        }
    },
    '/front/personCen/rentManage':{
        component (resolve) {
            require(['./views/front/personCen/rentManage.vue'], resolve);
        }
    },
    '/front/personCen/designManage':{
        component (resolve) {
            require(['./views/front/personCen/designManage.vue'], resolve);
        }
    },
    '/front/personCen/draftManage':{
        component (resolve) {
            require(['./views/front/personCen/draftManage.vue'], resolve);
        }
    },
    '/front/wedding/buy':{
        component (resolve) {
            require(['./views/front/wedding/buy.vue'], resolve);
        }
    },
    '/front/wedding/design':{
        component (resolve) {
            require(['./views/front/wedding/design.vue'], resolve);
        }
    },
    '/front/wedding/rent':{
        component (resolve) {
            require(['./views/front/wedding/rent.vue'], resolve);
        }
    },

    // 后台
    '/backIndex':{
        component (resolve) {
            require(['./views/back/backIndex.vue'], resolve);
        }
    },
    '/back/backPersonInfor':{
        component (resolve) {
            require(['./views/back/backPersonInfor.vue'], resolve);
        }
    },
    '/back/collectDraftMng':{
        component (resolve) {
            require(['./views/back/collectDraftMng.vue'], resolve);
        }
    },
    '/back/commodityMng':{
        component (resolve) {
            require(['./views/back/commodityMng.vue'], resolve);
        }
    },
    '/back/empMng':{
        component (resolve) {
            require(['./views/back/empMng.vue'], resolve);
        }
    },
    '/back/factoryMng':{
        component (resolve) {
            require(['./views/back/factoryMng.vue'], resolve);
        }
    },
    '/back/formMng':{
        component (resolve) {
            require(['./views/back/formMng.vue'], resolve);
        }
    },
    '/back/inforMng':{
        component (resolve) {
            require(['./views/back/inforMng.vue'], resolve);
        }
    },
    '/back/orderMng':{
        component (resolve) {
            require(['./views/back/orderMng.vue'], resolve);
        }
    },
    '/back/purchaseMng':{
        component (resolve) {
            require(['./views/back/purchaseMng.vue'], resolve);
        }
    },
    '/back/powerMng':{
        component (resolve) {
            require(['./views/back/powerMng.vue'], resolve);
        }
    },

};
export default routers;