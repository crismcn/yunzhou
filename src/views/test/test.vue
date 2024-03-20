<template>
  <div class="center" style="--webkit-app-region: drag">
    <div class="test-text" style="--webkit-app-region: drag">Jump To About View</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.center {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .test-text {
    font-size: @size-42;
    background: rgb(var(--red-5));
  }
}
</style>
