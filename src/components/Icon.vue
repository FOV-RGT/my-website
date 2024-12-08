<template>
  <i class="iconfont" :class="[iconclass, extraclass]"></i>
</template>

<script>
var map = {
  user:"icon-USER",
  home:"icon-home",
  pyq:"icon-pengyouquan",
};
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    extraclass: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconclass() {
      return map[this.type];
    },
  },
};
</script>

<style scoped>
@import '//at.alicdn.com/t/c/font_4765393_kd669ydnbni.css';
</style>