
<template>
  <header class="page-header">
    <div class="header-container">
      <router-link :to="{ name: 'index' }">
        <img src="../assets/img/logo.png" width="100" />
      </router-link>
      <div>
        <router-link :to="{ name: 'giud' }"> 组件 </router-link>
        <span class="qrcode-wrapper">
          <span class="preview-qrcode">扫码预览</span>
          <div class="image-qrcode">
            <img class="wx-qrcode" src="../assets/img/qrcode.jpg" />
          </div>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../assets/styles/var.scss";
.page-header {
  background-color: #fff;
  opacity: 0.98;
  position: relative !important;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  transition: all 0.3s;
  z-index: 100;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
  .header-container {
    padding: 0 $padding;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
  }
  .qrcode-wrapper {
    margin-left: 30px;
    position: relative;
    &:hover {
      .image-qrcode {
        display: block;
      }
    }
    .image-qrcode {
      display: none;
      position: absolute;
      right: 0;
      z-index: 100;
      margin-top: 10px;
      border: 1px solid #cccccc;
      padding: 10px;
      background-color: #fff;
      &::before {
        content: "";
        position: absolute;
        top: -5px;
        right: 28px;
        width: 8px;
        height: 8px;
        border: 1px solid #cccccc;
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform: rotate(45deg);
        background-color: #fff;
      }
    }
    .preview-qrcode {
      color: #888;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
