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
        <a class="vue-ui" href="http://ui.linjiafu.top/" target="_blank"
          >vue组件库</a
        >
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
@import '../assets/styles/var.scss';

.page-header {
  position: relative !important;
  top: 0;
  left: 0;
  z-index: 100;
  box-sizing: border-box;
  width: 100%;
  height: $header-height;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  opacity: 0.98;
  transition: all 0.3s;

  .vue-ui {
    margin-left: 30px;
  }

  .header-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 $padding;
  }

  .qrcode-wrapper {
    position: relative;
    margin-left: 30px;

    &:hover {
      .image-qrcode {
        display: block;
      }
    }

    .image-qrcode {
      position: absolute;
      right: 0;
      z-index: 100;
      display: none;
      padding: 10px;
      margin-top: 10px;
      background-color: #fff;
      border: 1px solid #ccc;

      &::before {
        position: absolute;
        top: -5px;
        right: 28px;
        width: 8px;
        height: 8px;
        content: '';
        background-color: #fff;
        border: 1px solid #ccc;
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform: rotate(45deg);
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
