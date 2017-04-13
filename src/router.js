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
    '/backIndex':{
        component (resolve) {
            require(['./views/back/backIndex.vue'], resolve);
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
};
export default routers;