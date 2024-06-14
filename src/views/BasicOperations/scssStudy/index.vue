<template>
  <div class="whStyle box-padding scss-box">
    <h2>SCSS-Study</h2>
    <br />
    <div>
      <p>局部设置变量</p>
      <span class="part-scss">test</span>
    </div>
    <br />
    <div>
      <p>全局引入样式文件</p>
      <span>test</span>
    </div>
    <br />
    <div class="part-import-scss">
      <p>局部引入样式文件</p>
      <span>test</span>
    </div>
    <br />
    <div>
      <p>mixin混入</p>
      <span class="mixin-scss">test</span>
    </div>
    <br />
    <div>
      <p>extend继承</p>
      <span class="extend-scss">test</span>
    </div>
    <br />
  </div>
</template>

<script setup lang="ts" name="ScssStudy">

</script>

<style scoped lang="scss">
@import './importScss.scss';

@mixin border-style ($size) {
  border-radius: $size * 3;
  border: $size solid #ff5e00;
  font-size: $size + 15;
}

$color: #f00;
%extend-scss {
  font-style: italic;
}

.scss-box {
  .part-scss {
    color: $color;
  }
  .part-import-scss {
    @import './partScss.scss';
  }
  .mixin-scss {
    @include border-style(5px);
  }
  .extend-scss {
    @extend %extend-scss;
  }
}
</style>
