<template>
  <footer class="footer">
    <ul>
      <!-- 点击的图片 用active 控制 -->
      <li>
        <router-link to="Home" class="navs01">首页</router-link>
      </li>
      <li>
        <router-link to="Lists" class="navs02">闪送超市</router-link>
      </li>
      <li>
        <router-link to="Cart" class="navs03">
          <div class="num">{{allCartList}}</div>
          购物车
        </router-link>
      </li>
      <li>
        <router-link to="Mine" class="navs04">我的</router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allCartList"])
  }
};
</script>

<style lang="less">
.footer {
  width: 100%;
  height: 50px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f6f6f6;
  z-index: 3;
  ul {
    height: 100%;
    li {
      float: left;
      width: 25%;
      height: 100%;
      text-align: center;
      a {
        display: block;
        height: 100%;
        display: block;
        margin: 0 auto;
        padding-top: 28px;
        background-repeat: no-repeat;
        background-position: 50% 5px;
        background-size: 12.5%;
        font-size: 12px;
        color: #868686;
      }
      .num {
        width: 20px;
        height: 20px;
        line-height: 20px;
        background-color: #ff4400;
        position: absolute;
        top: 0px;
        right: 55px;
        border-radius: 20px;
        color: #fff;
      }
      .navs01 {
        background-image: url("../../assets/images/footer-navs/navs-item-home.png");
      }
      .navs02 {
        background-image: url("../../assets/images/footer-navs/navs-item-menu.png");
      }
      .navs03 {
        background-image: url("../../assets/images/footer-navs/navs-item-cart.png");
        position: relative;
      }
      .navs04 {
        background-image: url("../../assets/images/footer-navs/navs-item-mine.png");
      }
      .navs01.active {
        background-image: url("../../assets/images/footer-navs/navs-item-home-active.png");
      }
      .navs02.active {
        background-image: url("../../assets/images/footer-navs/navs-item-menu-active.png");
      }
      .navs03.active {
        background-image: url("../../assets/images/footer-navs/navs-item-cart-active.png");
      }
      .navs04.active {
        background-image: url("../../assets/images/footer-navs/navs-item-mine-active.png");
      }
    }
  }
}
</style>
