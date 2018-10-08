<template>
  <div class="goods-info">
    <div class="goods-header">
      <span class="back" @click="$router.go(-1)"></span>
      {{goods.long_name}}
    </div>
    <div class="goods-cont">
      <div class="tittle">
        <img :src="goods.img" alt="">
        <h2>{{goods.long_name}}</h2>
        <p>&yen;<span>{{goods.price.slice(0, goods.price.indexOf("."))}}</span></p>
      </div>
      <div class="details">
        <p class="details-tittle">商品详情</p>
        <p><span class="detail-cont">品种品牌</span><span>{{goods.brand_name}}</span></p>
        <p><span class="detail-cont">产品规格</span><span>{{goods.specifics}}</span></p>
      </div>
      <img src="../../assets/images/productDetailDefault.jpg" alt="">
    </div>
      <div class="top-radius"></div>
      <div class="goods-footer">
        <div class="left">
          <img src="../../assets/images/favor.png" alt="">
          <p>收藏</p>
        </div>
        <span>添加商品:</span>
        <div class="right">
          <img src="../../assets/images/cart-btn.png" alt="">
          <span class="num">1</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      goods: {}
    };
  },
  created() {
    if (this.$route.params.brand_name) {
      this.goods = this.$route.params;
      const str = JSON.stringify(this.$route.params);
      localStorage.setItem("goods", str);
    } else {
      const obj = JSON.parse(localStorage.getItem("goods"));
      this.goods = obj;
    }
  }
};
</script>

<style scope lang="less">
.goods-info {
  .goods-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    position: absolute;
    top: 0px;
    left: 0px;
    text-align: center;
    .back {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 0;
      left: 0;
      background-image: url(../../assets/images/icon-back.png);
    }
  }
  .goods-cont {
    background-color: #efefef;
    margin-bottom: 10px;
    .tittle {
      width: 100%;
      height: 704px;
      text-align: center;
      background-color: #fff;
      img {
        width: 80%;
        display: block;
        margin: 0 auto;
      }
      p {
        color: red;
        padding-top: 10px;
        font-size: 18px;
        span {
          font-size: 22px;
          font-weight: 700;
        }
      }
    }
    .details {
      margin-top: 10px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      background-color: #fff;
      font-size: 18px;
      p {
        margin-top: 5px;
      }
      .details-tittle {
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
        background-image: url(../../assets/images/title_bg.png);
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 30%;
        color: #e0bd6a;
      }
      .detail-cont {
        color: #ccc;
        margin: 30px;
      }
    }
    img {
      margin: 0 auto;
      width: 704px;
      display: block;
    }
  }
  .top-radius {
    position: fixed;
    bottom: 40px;
    right: 10px;
    width: 75px;
    height: 38px;
    border: 1px solid #ccc;
    border-radius: 38px 38px 0 0;
  }
  .goods-footer {
    height: 60px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
    border-top: 1px solid #ccc;
    padding-top: 20px;
    padding-left: 50px;
    background-color: #fff;
    .left {
      text-align: center;
      position: absolute;
      top: 10px;
      left: 10px;
      img {
        width: 20px;
        height: 18px;
      }
    }
    .right {
      position: absolute;
      top: -15px;
      right: 12px;
      background-color: #f7f7f7;
      width: 70px;
      height: 70px;
      border-radius: 70px;
      img {
        position: absolute;
        top: 4px;
        right: 9%;
        background-color: #ffd600;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .num {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: #ff4400;
        color: #fff;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 20px;
        text-align: center;
      }
    }
  }
}
</style>
