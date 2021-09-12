<template>
  <div class="demo-image-container">
    <div class="demo-inner-container">
      <div class="demo-content">
        <img class="demo-image" :src="src" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        src:{
            type:String
        }
    }
};
</script>

<style lang="scss">
$demo-width: 320px !default;
.demo-image-container {
  position: fixed;
  top: 100px;
  right: 20px;
  width: $demo-width;
  height: 80vh;
  overflow: hidden;
  z-index: 10;
  display: none;

  .demo-content {
    width: $demo-width;
    height: 80vh;
  }

  .demo-image {
    width: 100%;
  }

  .demo-inner-container {
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;

    /* for Chrome */
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>