// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
//引入lib-flexible,px转rem布局
import "lib-flexible/flexible";
//引入 axios
import Axios from "axios";
//引入 vuex
import Vuex from "vuex";
//将axios挂载到vue的原型上
Vue.prototype.$axios = Axios;
//引入自己写的 base.css样式
import "@/assets/base-for-mobile.css";
import "@/assets/common.css";

Vue.use(Vuex);
//初始化vuex的数据
const state = {
  cartList: JSON.parse(localStorage.getItem("carts")) || []
};
const mutations = {
  addCart(state, { id }) {
    const CurtCartList = state.cartList.find(item => item.id === id);
    if (!CurtCartList) {
      state.cartList.push({ id, num: 1, isShow: true });
    } else {
      CurtCartList.num = CurtCartList.num + 1;
    }
    localStorage.setItem("carts", JSON.stringify(state.cartList));
  },
  delCart(state, { id }) {
    const CurtCartList = state.cartList.find(item => item.id === id);
    const CurtCartListIndex = state.cartList.findIndex(item => item.id === id);
    if (CurtCartList.num === 1) {
      state.cartList.splice(CurtCartListIndex, 1);
    }
    CurtCartList.num = CurtCartList.num - 1;
    localStorage.setItem("carts", JSON.stringify(state.cartList));
  },
  toggleCart(state, { id }) {
    const CurtCartList = state.cartList.find(item => item.id == id);
    CurtCartList.isShow = !CurtCartList.isShow;
    localStorage.setItem("carts", JSON.stringify(state.cartList));
  },
  checkAllCarts(state, { activeAllCart }) {
    state.cartList.forEach(item => (item.isShow = !activeAllCart));
    localStorage.setItem("carts", JSON.stringify(state.cartList));
  },
  updateAllCarts(state, { allcart }) {
    state.cartList = allcart;
    localStorage.setItem("carts", JSON.stringify(state.cartList));
  }
};
const getters = {
  //监听总价格,计算属性
  allCartList: state => {
    if (state.cartList.length === 0) {
      return 0;
    } else {
      let allnum = 0;
      state.cartList.forEach(item => {
        allnum += item.num;
      });
      localStorage.setItem("carts", JSON.stringify(state.cartList));
      return allnum;
    }
  }
};
const store = new Vuex.Store({
  state,
  mutations,
  getters
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store
});
