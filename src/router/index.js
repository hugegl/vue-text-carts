import Vue from "vue";
import Router from "vue-router";
import Lists from "@/components/lists/Lists";
import Cart from "@/components/cart/Cart";
import Goodsinfo from "@/components/goods/Goodsinfo";

Vue.use(Router);

export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "/lists"
    },
    {
      path: "/lists",
      name: "Lists",
      component: Lists
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
    },
    {
      path: "/Goodsinfo/:id?",
      name: "Goodsinfo",
      component: Goodsinfo
    }
  ]
});
