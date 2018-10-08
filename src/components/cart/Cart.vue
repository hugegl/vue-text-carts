<template>
  <div class="cart-wrapper">
    <div class="cart-tittle">
      <table>
        <tbody>
          <tr>
            <td>收货人</td>
            <td>胡歌先生</td>
          </tr>
          <tr>
            <td>电　话</td>
            <td>153*********</td>
            <td class="update right-arrow">修改</td>
          </tr>
          <tr>
            <td>收货地址</td>
            <td>上海市永嘉庭永嘉路</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cart-cont">
      <p class="gray pl">
        <span class="fast-market border-left">闪送超市</span>
        <span class="piece-together red">凑单专区</span>
      </p>
      <p class="border-bottom gray pl">
        ￥0起送，22点后满￥69运费5元起，不满￥69运10元起
      </p>
      <p class="border-bottom pl">
        <span>收货时间</span>
        <span class="red">08:00-09:00</span>
        <span class="reserve right-arrow">可预订</span>
      </p>
      <p class="border-bottom pl remarks">
        <span>收货备注</span>
        <input type="text" placeholder="可输入100字以内特殊要求内容">
      </p>
    </div>
    <div>
      <ul class="right">
        <li v-for="item in productsChild" :key="item.id">
          <span :class="{btn:true,'li-btn':true,active:item.isShow}" @click="toggleCart({id:item.id})"></span>
          <a>
            <img :src="item.img"/>
            <div class="right-inner">
              <h4>{{item.name}}</h4>
              <p>{{item.specifics}}</p>
              <p><span class="newPrice">&yen;{{item.price}}</span><span class="oldPrice">&yen;{{item.market_price}}</span></p>
              <div class="right-span">
                <span class="reduce lists-btn" @click="delCart({id:item.id})">-</span>
                <span class="num">{{item.num}}</span>
                <span class="plus lists-btn" @click="addCart({id:item.id})">+</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="cart-footer">
      <!-- 用类名 active 控制是否选中 -->
      <span :class="{btn:true,active:activeAllCart}" @click="checkAllCarts({activeAllCart:activeAllCart})"></span>
      <span>全选</span>
      <span class="cart-footer-all">共:</span>
      <span class="red">&yen;{{allPrice}}</span>
      <span class="btn-sure">选好了</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      productsChild: [],
      activeAllCart: true
    };
  },
  //一进入页面就获取购物车的数据
  created() {
    this.getAllCarts();
  },
  methods: {
    //像后台发送数据,获取购物车的数据
    async getAllCarts() {
      //将id存在数组中
      let arrIds = [];
      this.cartList.forEach(item => {
        arrIds.push(item.id);
      });
      //根据商品id获取所有购物车的数据
      const ids = encodeURIComponent(arrIds.join(","));
      const res = await this.$axios.get(
        `/api/home?_r=${Math.random()}&cart_pids=${ids}&location=121.5721941391567%2C31.21168025925351`
      );

      let { cart_ids } = res.data.data;
      let newCarts = [];
      let noDelIds = [];
      cart_ids.forEach(item => {
        //返回的数据中,根据id获取到数据的,过滤出来,合并数组
        let arrItem = this.cartList.find(it => {
          if (it.id === item.id) {
            noDelIds.push(it);
            return it;
          }
        });
        const { num, isShow } = arrItem;
        newCarts.push({ ...item, num, isShow });
      });
      this.$store.commit("updateAllCarts", { allcart: noDelIds });
      this.productsChild = newCarts;
      // console.log(this.productsChild, this.cartList);
    },
    ...mapMutations(["addCart", "delCart", "toggleCart", "checkAllCarts"])
  },
  computed: {
    //根据选中的按钮,计算总价格
    allPrice() {
      let all = 0;
      let tureCarts = this.productsChild.filter(item => item.isShow === true);
      //根据选中的按钮的数量,控制总按钮是否被选中
      this.activeAllCart = tureCarts.length === this.productsChild.length;
      tureCarts.forEach(item => {
        all += item.num * item.price;
      });
      return all;
    },
    ...mapState(["cartList"])
  },
  watch: {
    //如果 cartList中发生改变,启动深度监听,控制 productsChild的数值一起发生改变
    cartList: {
      handler(newvalue) {
        this.productsChild.forEach((item, index) => {
          const arrItem = newvalue.find(it => it.id === item.id);
          if (!arrItem) {
            this.productsChild.splice(index, 1);
          } else {
            const { num, isShow } = arrItem;
            item.num = num;
            item.isShow = isShow;
          }
        });
      },
      deep: true
    }
  }
};
</script>

<style scope lang="less">
.cart-wrapper {
  background-color: #efefef;
  .cart-tittle {
    margin-top: 10px;
    border: 5px solid transparent;
    border-image: url(../../assets/images/place.png);
    border-image-slice: 5;
    border-image-repeat: round;
    background-color: #fff;
    padding: 5px 10px 5px 10px;
    table {
      width: 100%;
      tr {
        width: 100%;
        td {
          height: 27px;
          line-height: 27px;
        }
        .update {
          position: relative;
        }
      }
    }
  }
  .cart-cont {
    margin-top: 10px;
    background-color: #fff;
    padding-top: 18px;
    p {
      position: relative;
      height: 40px;
      line-height: 40px;
      .fast-market {
        padding-left: 10px;
        font-size: 12px;
      }
      .border-left::before {
        content: "";
        width: 4px;
        height: 15px;
        background-color: #ffd600;
        position: absolute;
        top: 14px;
        left: 18px;
        border-radius: 4px;
      }
      .piece-together {
        border: 1px solid #e64f1a;
        padding: 2px 5px 2px 5px;
        border-radius: 20px;
        position: absolute;
        top: -10px;
        right: 10px;
        height: 20px;
        line-height: 20px;
      }
    }
    .reserve {
      position: absolute;
      top: 0;
      right: 10px;
      padding-right: 30px;
    }
    .remarks {
      position: relative;
      padding-left: 80px;
      padding-right: 20px;
      span {
        position: absolute;
        top: 0;
        left: 15px;
      }
      input {
        border: 1px solid #ccc;
        text-indent: 5px;
        padding: 5px;
        width: 100%;
        border-radius: 5px;
      }
    }
  }
  .cart-footer {
    margin-top: 2px;
    margin-bottom: 50px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    padding-left: 40px;
    height: 55px;
    line-height: 55px;
    position: relative;
    font-size: 16px;
    .btn-sure {
      background-color: #ffd600;
      padding-left: 20px;
      padding-right: 20px;
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .cart-footer-all {
      margin-left: 50px;
    }
  }
  .li-btn {
    top: 40px;
  }
}
</style>
