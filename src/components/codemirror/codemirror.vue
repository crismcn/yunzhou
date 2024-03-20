<template>
  <div class="workspace">
    <Tabs />
    <!-- <div class="tools">
      <icon-palette class="active" />
      <icon-save />
      <icon-sync />
      <icon-search />
      <icon-swap />
    </div> -->
    <Editor class="editor" />

    <!-- <div class="status-bar">
      文件路径：/home/poc/AIoT-Web/Server/package-lock.json
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Editor from './editor.vue'
import Tabs from './tabs.vue'
</script>

<style lang="less" scoped>
.workspace {
  position: relative;
  width: 100%;
  height: 100%;

  .tools {
    position: absolute;
    top: 42px;
    right: 12px;
    width: 200px;
    box-sizing: border-box;
    background: #3b4252;
    box-shadow: #2e344080 2px 2px 10px 0px;
    border-radius: 10px;
    opacity: 0.9;
    z-index: 999;
    overflow: hidden;

    .arco-icon {
      cursor: pointer;
      color: aliceblue;
      margin-bottom: -2px;
      padding: 8px 10px;
      font-size: 20px;
    }

    .active {
      background: #4c566a;
    }
  }

  .editor {
    // height: calc(100% - 40px);
  }

  .status-bar {
    padding: 0 12px;
    box-sizing: border-box;
    width: 100%;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    color: #767d8c;
    background-color: #2e3440;
  }
}
</style>
