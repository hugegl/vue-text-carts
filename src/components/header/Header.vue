<template>
  <div>
    <header class="header">{{headertext}}</header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headertext: "胡猫猫的小商铺"
    };
  }
};
</script>

<style lang="less">
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #ffd600;
  text-align: center;
  font-size: 40px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
