<template>
  <div id="app" class="bigwrapper">
    <div v-if="$route.path.indexOf('Goodsinfo')===-1" class="height100">
      <Header />
      <router-view />
      <Footer />
    </div>
    <div v-else class="height100">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
.bigwrapper {
  padding-top: 50px;
  padding-bottom: 50px;
  height: 100%;
  width: 100%;
}
.height100 {
  height: 100%;
  width: 100%;
}
</style>
