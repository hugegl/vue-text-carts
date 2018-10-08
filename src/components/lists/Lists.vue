<template>
  <div class="list-wrapper">
    <div class="left">
      <ul>
        <li v-for="item in categories" :key="item.id">
          <!-- 需要根据数据让类名 new 展示,即显示new上标 -->
          <a href="#" :class="{new:104751 == item.id,active: curId == item.id}" @click="getCurId(item.id)">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="right-wrapper">
      <listsChild></listsChild>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import jsonp from "jsonp";
import { mapState, mapMutations } from "vuex";
const bus = new Vue();
const listsChild = {
  template: `
    <ul  class="right">
      <li  v-for="(item,index) in productsChild" :key="item.id">
       <a>
        <img :src="item.img"/>
        <div class="right-inner">
          <h4 @click="goGoodsinfo(index)">{{item.name}}</h4>
          <p>{{item.specifics}}</p>
          <p><span class="newPrice">&yen;{{item.price}}</span><span class="oldPrice">&yen;{{item.market_price}}</span></p>
          <div class="right-span">
          <span v-show="cartList.find(it=> it.id==item.id)">
            <span class="reduce lists-btn" @click="delCart({id:item.id})">-</span>
            <span class="num">
            {{ cartList.find(it=> it.id==item.id)?cartList.find(it=> it.id==item.id).num : 1}}
            </span>
            </span>
            <span class="plus lists-btn" @click="addCart({id:item.id})">+</span>
          </div>
        </div>
       </a>
      </li>
    </ul>
  `,
  data() {
    return {
      productsChild: []
    };
  },
  created() {
    bus.$on("getProduct", res => {
      this.productsChild = res;
    });
  },
  methods: {
    goGoodsinfo(index) {
      this.$router.push({
        name: "Goodsinfo",
        params: this.productsChild[index]
      });
    },
    ...mapMutations(["addCart", "delCart"])
  },
  computed: {
    ...mapState(["cartList"])
  }
};
Vue.component("listsChild", listsChild);
export default {
  data() {
    return {
      categories: [],
      products: {},
      curId: 104751
    };
  },
  created() {
    this.getAllLists();
  },
  methods: {
    getAllLists() {
      jsonp("http://localhost:3008/list", null, (err, res) => {
        if (err) {
          return err;
        } else {
          const { categories, products } = res.data;
          this.products = products;
          this.categories = categories;
          bus.$emit("getProduct", this.products[104751]);
        }
      });
    },
    getCurId(id) {
      this.curId = id;
      bus.$emit("getProduct", this.products[id]);
    }
  },
  computed: mapState(["cartList"])
};
</script>

<style scope lang="less">
.list-wrapper {
  overflow: hidden;
  height: 100%;
  .left {
    height: 100%;
    float: left;
    width: 80px;
    overflow: auto;
    li {
      border-bottom: 2px solid #cccccc;
      position: relative;
      a {
        line-height: 50px;
        display: block;
        border-left: 4px solid transparent;
        text-align: center;
        &.active {
          border-left: 4px solid #ffd600;
        }
        &.new {
          background-image: url(../../assets/images/new.jpg);
          background-repeat: no-repeat;
          background-size: 35%;
          background-position: 50px 0px;
        }
      }
      img {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0px;
        right: 0px;
      }
    }
  }
  .right-wrapper {
    height: 100%;
    overflow: auto;
  }
}
</style>
