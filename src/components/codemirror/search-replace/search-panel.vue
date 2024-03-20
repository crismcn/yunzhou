<template>
  <div class="search-panel" @keydown.esc="closeSearchPanel(view)">
    <a-space>
      <IconExpand @click="toggleExpand" />
      <a-space direction="vertical">
        <a-space>
          <a-space size="mini">
            <Input v-model="search.searchText" @onSearch="onSearch(view)" @keydown.enter.prevent="enter" ref="inputRef" main-field="true" placeholder="Find" />
            <a-space class="options" size="mini">
              <IconFont @click.prevent="onRefresh(`caseSensitive`)" :class="{ checked: search.caseSensitive }" name="icon-match-case" :size="20" />
              <IconFont @click.prevent="onRefresh(`wholeWord`)" :class="{ checked: search.wholeWord }" name="icon-match-word" :size="20" />
              <IconFont @click.prevent="onRefresh(`regexp`)" :class="{ checked: search.regexp }" name="icon-regexp" :size="20" />
            </a-space>
          </a-space>
          <div class="result">{{ results.total ? `${results.current} of ${results.total}` : `No results` }}</div>
          <icon-arrow-up @click.prevent="findPrevious(view), onSearch(view)" class="option-icon" :size="18" />
          <icon-arrow-down @click.prevent="findNext(view), onSearch(view)" class="option-icon" :size="18" />
          <icon-find-replace @click.prevent="selectSelectionMatches(view)" class="option-icon" :size="18" />
          <icon-close @click.prevent="onCloseSearchPanel(view)" class="option-icon" :size="18" />
        </a-space>
        <a-space v-if="search.isReplace">
          <Input v-model="search.replaceText" placeholder="Replace" :hasPadding="false" :hanldelFocusIn="false" />
          <IconFont @click.prevent="onReplaceNext" class="option-icon" name="icon-replace" :size="19"></IconFont>
          <IconFont @click.prevent="onReplaceAll" class="option-icon" name="icon-replace-all" :size="19"></IconFont>
        </a-space>
      </a-space>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { h, inject, nextTick, onMounted, ref } from 'vue'
import { closeSearchPanel, findNext, findPrevious, selectSelectionMatches, replaceNext, replaceAll } from '@codemirror/search'
import type { EditorView } from '@codemirror/view'
import Input from './input.vue'
import IconFont from '@/components/iconfont/iconfont.vue'
import { IconDown, IconRight } from '@arco-design/web-vue/es/icon'

import { search, results, useSearchReplace } from './search-replace'

const { onCloseSearchPanel, onSearch } = useSearchReplace()

const IconExpand = {
  render: () => (search.value.isReplace ? h(IconDown) : h(IconRight)),
}
const toggleExpand = () => {
  search.value.isReplace = !search.value.isReplace
}

const view = inject<EditorView>('view')!
const inputRef = ref()

// 刷新控件状态
const onRefresh = (e: string) => {
  if (`caseSensitive` == e || `wholeWord` == e || `regexp` == e) {
    search.value[e] = !search.value[e]
  }
  onSearch(view)
}

// 逐步替换
const onReplaceNext = () => {
  onSearch(view)
  replaceNext(view)
}
// 全部替换
const onReplaceAll = () => {
  onSearch(view)
  replaceAll(view)
}

// 上、下一项
const enter = (e: KeyboardEvent) => {
  e.shiftKey ? findPrevious(view) : findNext(view)
}

onMounted(() => {
  nextTick(() => {
    inputRef.value.select()
  })
})
</script>

<style lang="less" scoped>
.search-panel {
  padding: 5px;
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  right: 12px;
  max-width: 500px;
  background-color: #2e3440;
  border-radius: 4px;
  animation: enter 0.25s forwards;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform-origin: top;
  box-shadow: rgba(15, 17, 21, 0.2) 0px 3px 6px 0px;

  .result {
    width: 72px;
    font-size: 13px;
  }

  .arco-icon {
    padding: 3px;
    cursor: pointer;

    &:hover {
      border-radius: 4px;
      background-color: #4c566a80;
    }
  }

  .option-icon {
    color: #fff;
  }
}

@keyframes enter {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.options {
  margin-left: -100px;

  .checked {
    border-radius: 4px;
    background-color: #4c566a !important;
  }

  .arco-icon {
    padding: 3px;
    cursor: pointer;

    &:hover {
      border-radius: 4px;
      background-color: #434c5e;
    }
  }
}
</style>
