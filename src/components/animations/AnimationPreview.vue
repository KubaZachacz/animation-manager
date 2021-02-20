<template>
  <img
    v-svg-inline
    :src="require(`../../assets/${imgData.src}.svg`)"
    :id="imgData.id"
    :alt="imgData.alt"
    class="animate"
  />
</template>

<script>
import renderImage from "../../utils/renderImage";

export default {
  name: "AnimationPreview",
  props: {
    imgData: Object,
    imgState: Object,
  },
  data() {
    return {
      src: "FirstStart/pierwszy_start",
    };
  },
  mounted() {
    this.$nextTick(function () {
      renderImage(this.$props.imgData, this.$props.imgState);
    });
  },
  updated() {
      renderImage(this.$props.imgData, this.$props.imgState);
  },
};
</script>

<style>
</style>