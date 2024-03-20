<template>
  <h1 class="text-effect" data-text-effect-content="Hello Juejin!☺">Hello Juejin!☺</h1>
</template>

<script setup lang="ts"></script>

<style lang="less">
.text-effect {
  /* 特效颜色 */
  --effect-color: #2e84d8;
  /* 无特效时的普通文本颜色 */
  --normal-color: #2a323d;
  position: relative;
  color: var(--normal-color);
}

.text-effect::before {
  content: attr(data-text-effect-content);
  position: absolute;
  color: var(--effect-color);
  width: 0;
  height: 120%;
  white-space: nowrap;
  overflow: hidden;
  animation: text-effect 4s linear infinite;
  border-right: 1rem solid var(--effect-color);
  filter: drop-shadow(0 0 30px var(--effect-color)) drop-shadow(0 0 60px var(--effect-color));
}

@keyframes text-effect {
  0%,
  100% {
    width: 0;
  }

  50% {
    width: 100%;
  }
}
</style>
