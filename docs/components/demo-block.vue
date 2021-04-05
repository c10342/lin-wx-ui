<template>
  <div class="docs-demo-wrapper">
    <div :style="{ height: isExpand ? 'auto' : '0' }" class="demo-container">
      <div span="14">
        <div class="docs-demo docs-demo--expand">
          <div class="highlight-wrapper">
            <slot name="highlight"></slot>
          </div>
        </div>
      </div>
    </div>
    <span class="docs-trans docs-demo__triangle" @click="toggle">{{
      isExpand ? '隐藏代码' : '显示代码'
    }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpand: false,
    };
  },
  methods: {
    toggle() {
      this.isExpand = !this.isExpand;
    },
  },
};
</script>

<style lang="scss">
.docs-demo-wrapper {
  margin-top: 10px;
}

.demo-container {
  overflow: hidden;
  transition: all 0.5s;
}

.docs-demo {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  font-size: 14px;
  background-color: #f7f7f7;
  border: 1px solid #e2ecf4;
  // border-top: none;
  pre code {
    font-family: Consolas, Menlo, Courier, monospace;
    line-height: 22px;
    border: none;
  }
}

.docs-trans {
  display: inline-block;
  width: 100%;
  padding: 10px 0;
  font-size: 12px;
  color: #c5d9e8;
  text-align: center;
  cursor: pointer;
  background-color: #fafbfc;

  &:hover {
    color: #409eff;
  }
}

.docs-demo__code,
.highlight-wrapper,
.docs-demo__meta {
  padding: 0 20px;
  overflow-y: auto;
}

.docs-demo__code {
  border-bottom: 1px solid #eee;
}

.docs-demo.docs-demo--expand .docs-demo__meta {
  border-bottom: 1px dashed #e9e9e9;
}

.docs-demo.docs-demo--expand .docs-demo__triangle {
  transform: rotate(180deg);
}

.highlight-wrapper {
  display: none;

  p,
  pre {
    margin: 0;
  }

  .hljs {
    padding: 0;
  }
}

.docs-demo.docs-demo--expand .highlight-wrapper {
  display: block;
}

.docs-demo__code__mobi {
  height: 620px;
  margin: 20px 0;
}

.docs-demo__code__mobi__header {
  padding: 8px;
  text-align: center;
  background: -webkit-linear-gradient(rgba(55, 55, 55, 0.98), #545456);
  background: linear-gradient(rgba(55, 55, 55, 0.98), #545456);
  border-radius: 4px 4px 0 0;

  img {
    width: 100%;
  }

  .url-box {
    height: 28px;
    padding: 0 3px;
    margin: 10px auto 0;
    overflow-x: auto;
    line-height: 28px;
    color: #fff;
    white-space: nowrap;
    background-color: #a2a2a2;
    border-radius: 4px;
  }
}

.docs-demo__code__mobi__content {
  iframe {
    width: 100%;
    height: 548px;
    border: 0;
  }
}
</style>
