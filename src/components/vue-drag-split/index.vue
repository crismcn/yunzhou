<template>
  <SplitWindow @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" :class="layoutClass">
    <slot v-if="showPlaceHolder && windowList.length <= 0">
      <div class="empty">
        <!-- <a-button @click="newWindow()">
          <template #icon>
            <icon-plus />
          </template>
          Session
        </a-button> -->
        <a-empty>
          <template #image>
            <icon-code />
          </template>
          {{ $t('no-terminal') }}
        </a-empty>
      </div>
    </slot>
    <div class="drag_modal_wrapper" v-if="dragData.isUpdating" :style="formatInsetCss(dragTargetModalElStyle)"></div>
  </SplitWindow>
</template>

<script setup lang="ts">
import { getCurrentInstance, h, onMounted, reactive, ref, render, useSlots, watch } from 'vue-demi'
import { getParentElByClname, formatInsetCss, dropPositionMap, splitDirectionMap } from './utils'
import Split from './splite.vue'
import SplitWindow from './split-window.vue'
// import { IconLayout } from '@arco-design/web-vue/es/icon';
import { themes, font } from './themes'

const componentIns: any = getCurrentInstance()

const { AddBtn, CloseBtn, Tab, TabActions, TabView } = useSlots()
const renderSlot = (slot: any, params?: any) => {
  return slot && slot(params)[0]
}

const { createTabActions, createAddBtn, createClose, createTab, createTabView, activeLabelClassName, onCloseWindow, canCloseWindow, activeTabKeySync, windowListSync, layoutClass, generateWindowConfig } = defineProps({
  showPlaceHolder: {
    type: Boolean,
    default: true,
  },
  createTabActions: {
    type: Function,
    default: (window: any) => {
      return null
    },
  },
  createAddBtn: {
    type: Function,
    default: (win: any) => null,
  },
  createClose: {
    type: Function,
    default: (win: any) => null,
  },
  createTab: {
    type: Function,
    default: (win: any) => null,
  },
  createTabView: {
    type: Function,
    default: (win: any) => null,
  },
  activeLabelClassName: {
    type: String,
    default: 'label_active',
  },
  canCloseWindow: {
    type: Function,
    default: async (win: any, e: any) => true,
  },
  onCloseWindow: {
    type: Function,
    default: (win: any, e: any) => {},
  },
  activeTabKeySync: {
    type: [String, Number],
    default: '1',
  },
  windowListSync: {
    type: Array,
    default: [],
  },
  layoutClass: {
    type: String,
    default: '',
  },
  generateWindowConfig: {
    type: Function,
    default: () => ({}),
    required: true,
  },
})

// 默认渲染的关闭标签dom
const closeDefault = h('div', { class: 'close_inner', title: '关闭窗口' }, 'x')
// 默认渲染的新建标签dom
const addBtnDefault = h('div', { class: 'add_btn' }, h('div', { title: '新建窗口' }, '+'))
// 默认渲染的标签dom
const tabDefault = (win: any) => {
  return h('span', { class: 'text-effect', 'data-text-effect-content': win.label }, win.label)
}
const SplitSvg = h(
  'svg',
  {
    t: '1671501618431',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '1517',
    width: '20',
    height: '20',
  },
  h('path', {
    d: 'M161.05472 919.3472h701.9008a58.71616 58.71616 0 0 0 58.65472-58.65472V180.40832a58.71616 58.71616 0 0 0-58.65472-58.65472H161.09568a58.03008 58.03008 0 0 0-41.4208 17.08032A58.1632 58.1632 0 0 0 102.4 180.30592v680.38656a58.64448 58.64448 0 0 0 58.65472 58.65472z m385.15712-589.568V190.08512h306.95424v660.93056H546.21184V329.7792zM170.83392 190.08512h306.95424v660.93056H170.83392V190.08512z',
    // fill: '#FFFFFF',
    'p-id': '1518',
  })
)

// 默认渲染的分屏按钮dom
const tabActionsDefault = (win: any) => {
  return [
    h(
      'div',
      {
        class: 'action_btn',
        title: '水平拆分',
        onClick: () => {
          splitWindow(null, splitDirectionMap.horizontal)
        },
      },
      SplitSvg
    ),
    h(
      'div',
      {
        class: 'action_btn',
        title: '竖直拆分',
        style: { Transform: 'rotate(90deg)' },
        onClick: () => {
          splitWindow(null, splitDirectionMap.vertical)
        },
      },
      SplitSvg
    ),
  ]
}
// 默认渲染的标签页dom
const tabViewDefault = (win: any) => {
  return h('div', null, [h('h3', null, 'THIS SHOW YOUR CONTENT..')])
}

const emits = defineEmits(['update:windowListSync', 'update:activeTabKeySync', 'resize', 'dragEnd', 'closeWindow'])

const windowList = ref<any[]>([])
watch(
  windowList,
  (nv) => {
    emits('update:windowListSync', nv)
  },
  { deep: true }
)
onMounted(() => {
  if (windowListSync?.length > 0) {
    for (const win of windowListSync) {
      newWindow(win)
    }
  }
})

const activeTabKey = ref<any>('')
activeTabKey.value = activeTabKeySync
watch(activeTabKey, (nv) => {
  emits('update:activeTabKeySync', nv)
})

const getActiveWindow = () => {
  return windowList.value.find((win: any) => win.key == activeTabKey.value)
}
const labelClick = (key: any, event: any) => {
  activeTab(key)
}

const activeTab = (key: any) => {
  activeTabKey.value = key
  const effectDom = componentIns.vnode.el.querySelector(`.split_view_content[tabviewkey='${key}']`)
  if (effectDom) {
    for (const contentEl of effectDom.parentElement.querySelectorAll('.split_view_content')) {
      if (contentEl.getAttribute('tabviewkey') == key) {
        contentEl.style.zIndex = 2
        continue
      }
      contentEl.style.zIndex = 1
    }
  }
  for (const tab of componentIns.vnode.el.querySelectorAll('.header_item[tabkey]')) {
    if (tab.getAttribute('tabkey') == key) {
      tab.classList.add('label_active', activeLabelClassName)
      continue
    }
    tab.classList.remove('label_active', activeLabelClassName)
  }
  if (windowList.value.length) emits('resize', {})
}

function bindRef(elRef: any) {
  elRef.__vueRef = elRef
}

function handleResize(event: any) {
  emits('resize', event)
}

// 模拟窗口位置蒙版偏移量
const dragTargetModalElStyle = ref({
  top: 0,
  left: 0,
  height: document.body.clientHeight,
  width: document.body.clientWidth,
})

const dragData = reactive<any>({
  isUpdating: false,
  dropPosition: dropPositionMap.right,
})

function handleDragStart(event: any) {
  const { target, x, y } = event
  dragData.isUpdating = true
  dragData.target = target
  dragData.tabKey = target.getAttribute('tabKey')
  dragData.tabEls = [...target.parentNode.querySelectorAll('.header_item[tabkey]')]
}
function handleDragOver(event: any) {
  event.preventDefault()
  if (!dragData.isUpdating) return
  let { target, x, y } = event
  const nodeRect = target.getBoundingClientRect()
  const targetAvailible = getParentElByClname(target, 'split_view_label_wrapper') ?? getParentElByClname(target, 'split_view_content')
  if (!targetAvailible) return
  dragData.respectLayout = targetAvailible
  const targetAvailibleNodeRect = targetAvailible.getBoundingClientRect()
  const offsetElRect = componentIns.vnode.el.getBoundingClientRect()
  const offsetX = targetAvailibleNodeRect.x - offsetElRect.x
  const offsetY = targetAvailibleNodeRect.y - offsetElRect.y
  x = x - offsetElRect.x
  y = y - offsetElRect.y
  // 标签栏
  if (targetAvailible.className.includes('split_view_label_wrapper')) {
    dragTargetModalElStyle.value = {
      top: offsetY,
      left: offsetX,
      height: targetAvailibleNodeRect.height,
      width: targetAvailibleNodeRect.width,
    }
    dragData.dropPosition = 'inner'
    return
    // 内容区域
  } else if (targetAvailible.className.includes('split_view_content')) {
    const thirdHeight = targetAvailibleNodeRect.height / 3
    const thirdWidth = targetAvailibleNodeRect.width / 3
    // 上部分
    if (x > offsetX && x < offsetX + targetAvailibleNodeRect.width && y > offsetY && y < offsetY + thirdHeight) {
      dragTargetModalElStyle.value = {
        top: offsetY,
        left: offsetX,
        height: targetAvailibleNodeRect.height / 2,
        width: targetAvailibleNodeRect.width,
      }
      dragData.dropPosition = 'top'
      // 下部分
    } else if (x > offsetX && x < offsetX + targetAvailibleNodeRect.width && y > offsetY + thirdHeight * 2 && y < offsetY + targetAvailibleNodeRect.height) {
      dragTargetModalElStyle.value = {
        top: offsetY + targetAvailibleNodeRect.height / 2,
        left: offsetX,
        height: targetAvailibleNodeRect.height / 2,
        width: targetAvailibleNodeRect.width,
      }
      dragData.dropPosition = 'bottom'
      // 右边部分
    } else if (x > offsetX + thirdWidth * 2 && x < offsetX + targetAvailibleNodeRect.width && y > offsetY + thirdHeight && y < offsetY + thirdHeight * 2) {
      dragTargetModalElStyle.value = {
        top: offsetY,
        left: offsetX + targetAvailibleNodeRect.width / 2,
        height: targetAvailibleNodeRect.height,
        width: targetAvailibleNodeRect.width / 2,
      }
      dragData.dropPosition = 'right'
      // 左边部分
    } else if (x > offsetX && x < offsetX + thirdWidth && y > offsetY && y < offsetY + thirdHeight * 2) {
      dragTargetModalElStyle.value = {
        top: offsetY,
        left: offsetX,
        height: targetAvailibleNodeRect.height,
        width: targetAvailibleNodeRect.width / 2,
      }
      dragData.dropPosition = 'left'
    }
  }
}
const handleDragEnd = (event: any) => {
  // 获取鼠标在浏览器窗口中的坐标
  const mouseX = event.clientX
  const mouseY = event.clientY
  // 获取浏览器窗口的尺寸
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  // 判断鼠标是否超出浏览器窗口
  let inner = true
  if (mouseX < 0 || mouseX >= windowWidth || mouseY < 0 || mouseY >= windowHeight) {
    inner = false
  }
  emits('dragEnd', { event, inner })
}
const handleMouseUp = (event: any) => {
  handleDragDropPrevent(event)
}
const handleMouseLeave = (event: any) => {
  handleDragDropPrevent(event)
}
const handleDragDropPrevent = (event: any) => {
  event.preventDefault()
  dragData.isUpdating = false
  dragTargetModalElStyle.value = {
    top: 0,
    left: 0,
    height: document.body.clientHeight,
    width: document.body.clientWidth,
  }
}

const targetDomTypeMap = {
  tab: 'tab',
  tabView: 'tabView',
}
function handleDragDrop(event: any) {
  handleDragDropPrevent(event)
  const { target, x, y } = event
  // 计算拖拽目标dom类型
  let targetCalc, targetDomType
  if (getParentElByClname(target, 'split_view_label_wrapper')) {
    targetCalc = getParentElByClname(target, 'split_view_label_wrapper')
    targetDomType = targetDomTypeMap.tab
  } else if (getParentElByClname(target, 'split_view_content_wrapper')) {
    targetCalc = getParentElByClname(target, 'split_view_label_wrapper')
    targetDomType = targetDomTypeMap.tabView
  }
  // 获取拖拽的tab tabview
  const originSplitViewContentWrapper = getParentElByClname(dragData.target, 'split_content_wrapper')
  let elNodes = originSplitViewContentWrapper.querySelectorAll('.split_view_content')
  const dragEl = [...elNodes].find((el) => el.getAttribute('tabViewKey') === dragData.tabKey)
  dragData.tabView = dragEl
  // 目标dom和源dom相同 && 仅有一个标签页
  if (dragData.tabEls.length == 1 && dragData.tabView == dragData.respectLayout) {
    return
  }
  // 目标dom和源dom相同
  if (targetDomType == targetDomTypeMap.tab && targetCalc == getParentElByClname(dragData.target, 'split_view_label_wrapper')) {
    return
  }
  // 删除无效dom
  closeWindowPost({ type: 'drag' }, dragData.target)

  // 激活活动tab
  activeTab(dragData.tabKey)

  // const emit = () => {
  //   requestAnimationFrame(() => {
  //     emits('dragEnd', { event, inner: true })
  //   })
  // }
  switch (targetDomType) {
    case targetDomTypeMap.tab:
      addTabEl(targetCalc, dragData.target)
      targetCalc.nextElementSibling.appendChild(dragData.tabView)
      // emit()
      return
    case targetDomTypeMap.tabView:
      createAndMove(target, dragData)
      // emit()
      break
  }
}
function addTabEl(tabWrapper: any, tab: any) {
  tabWrapper = tabWrapper.firstElementChild
  const addBtnEl = Array.from(tabWrapper?.children ?? []).find((item: any) => item.className.includes('add_btn_wrapper'))
  if (addBtnEl) {
    tabWrapper.insertBefore(tab, addBtnEl)
  } else {
    tabWrapper.appendChild(tab)
  }

  // console.log("tabWrapper :>> ", [tabWrapper]);
  // console.log("tabWrapper :>> ", [tabWrapper.parentElement]);
}

// 创建布局 移动目标dom
function createAndMove(target: any, dragData: any) {
  let targetElClass = '.horizontal.split_pane'
  let targetPane = getParentElByClname(target, 'split_pane')
  let dropSplitViewViewWrapper = getParentElByClname(target, 'split_container')
  let paneL = dropSplitViewViewWrapper.querySelector(targetElClass + '.split_paneL')
  let paneR = dropSplitViewViewWrapper.querySelector(targetElClass + '.split_paneR')
  let paneVnodeSplit
  if (['left', 'right'].includes(dragData.dropPosition)) {
    paneVnodeSplit = splitDirectionMap.horizontal
  } else if (['top', 'bottom'].includes(dragData.dropPosition)) {
    paneVnodeSplit = splitDirectionMap.vertical
  }
  const paneVnode = h(
    Split,
    {
      onResize: handleResize,
      minPercent: 20,
      split: paneVnodeSplit,
      defaultPercent: 50,
    },
    { paneR: () => templateSplitView(null, null) }
  )
  paneVnode.appContext = componentIns.appContext
  let paneEl: any = vnode2dom(paneVnode)
  paneEl.querySelector(`.${paneVnodeSplit}.split_pane.split_paneL`).appendChild(targetPane.children[0])
  addTabEl(paneEl.querySelector('.split_paneR .split_view_label_wrapper'), dragData.target)
  paneEl.querySelector('.split_paneR .split_view_content_wrapper').appendChild(dragData.tabView)
  // 将布局插入到页面中
  targetPane.appendChild(paneEl)
  paneL = paneEl.children[0]
  paneR = paneEl.children[2]
  requestAnimationFrame(() => {
    switch (dragData.dropPosition) {
      case dropPositionMap.top:
        swapElChild(paneL, paneR)
        break
      case dropPositionMap.bottom:
        break
      case dropPositionMap.left:
        swapElChild(paneL, paneR)
        break
      case dropPositionMap.right:
        break
    }
  })
}

// 交换两个dom子节点
function swapElChild(el1: any, el2: any) {
  let elCache = el1.children[0]
  el1.appendChild(el2.children[0])
  el2.appendChild(elCache)
}

// 关闭按钮
const templateClose = (win: any) => {
  return h(
    'div',
    {
      class: 'close_btn',
      onclick: (event: any) => {
        closeWindow(win, event)
      },
    },
    renderSlot(CloseBtn, win) || createClose(win) || closeDefault
  )
}

// 标题栏标签
const templateLabel = (win: any) => {
  return h(
    'div',
    {
      class: 'header_item flex a-c',
      ondragstart: handleDragStart,
      draggable: true,
      onclick: (event: any) => {
        labelClick(win.key, event)
      },
      tabKey: win.key,
    },
    [renderSlot(Tab, win) || createTab(win) || tabDefault(win), templateClose(win)]
  )
}
const templateContent = (win: any) => {
  return h(
    'div',
    {
      class: 'split_view_content',
      tabViewKey: win.key,
      onclick: (event: any) => {
        labelClick(win.key, event)
      },
    },
    [renderSlot(TabView, win) || createTabView(win) || tabViewDefault(win)]
  )
}
const svgArrowRight = h(
  'svg',
  {
    t: '1679533237927',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '2333',
    width: '18',
    height: '18',
  },
  h('path', {
    d: 'M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z',
    fill: '#ffffff',
    'p-id': '2334',
  })
)
const templateSplitView = (label: any, content: any) => {
  return h('div', { class: 'split_view' }, [
    h('div', { class: 'split_content_wrapper flex column' }, [
      h(
        'div',
        {
          class: 'split_view_label_wrapper flex',
          ondragover: handleDragOver,
          ondrop: handleDragDrop,
          ondragend: handleDragEnd,
        },
        [
          // h(
          // 	"div",
          // 	{
          // 		class: "split_nav_pre_btn",
          // 		onclick: (e) => {
          // 			scrollLabelBox(e, "pre");
          // 		}
          // 	},
          // 	[svgArrowRight]
          // ),
          h('div', { class: 'split_view_label_box flex' }, [
            label,
            h(
              'div',
              {
                class: 'add_btn_wrapper',
                onclick: (e: any) => {
                  newWindow()
                },
              },
              [renderSlot(AddBtn) || createAddBtn(getActiveWindow()) || addBtnDefault]
            ),
          ]),
          // h(
          // 	"div",
          // 	{
          // 		class: "split_nav_next_btn",
          // 		onclick: (e) => {
          // 			scrollLabelBox(e, "next");
          // 		}
          // 	},
          // 	[svgArrowRight]
          // ),
          h('div', { class: 'split_view_label_action_wrapper flex' }, renderSlot(TabActions, getActiveWindow()) || createTabActions(getActiveWindow()) || tabActionsDefault(getActiveWindow())),
        ]
      ),
      h(
        'div',
        {
          class: 'split_view_content_wrapper',
          ondragover: handleDragOver,
          ondrop: handleDragDrop,
          // ondragend: handleDragEnd,
        },
        [content]
      ),
    ]),
  ])
}
const templateLayout = (win: any) => {
  const split_view = templateSplitView(templateLabel(win), templateContent(win))
  const paneVnode = h(
    Split,
    {
      onResize: handleResize,
      minPercent: 20,
      split: splitDirectionMap.horizontal,
      defaultPercent: 100,
      layout: true,
    },
    { paneL: () => split_view }
  )
  paneVnode.appContext = componentIns.appContext
  return paneVnode
}

// 滚动标签栏
const scrollLabelBox = (e: any, direction = 'pre') => {
  const labelParentWrapper = getParentElByClname(e.target, 'split_view_label_wrapper')
  const labelWrapper = labelParentWrapper.querySelector('.split_view_label_box.flex')
  // console.log("labelWrapper :>> ", labelWrapper);
  // console.log("offsetX :>> ", labelWrapper.offsetX);
  // console.log("left :>> ", labelWrapper.left);
  // console.log("getBoundingClientRect :>> ", labelWrapper.getBoundingClientRect());
  switch (direction) {
    case 'pre':
      labelWrapper.style.transform = `translateX(200px)`

      break
    case 'next':
      labelWrapper.style.transform = `translateX(-200px)`
      break
  }
}

// vnode2dom
function vnode2dom(vnode: any) {
  let domEl = document.createElement('div')
  render(vnode, domEl)
  return domEl.firstElementChild
}
// 新建窗口
const newWindow = (win?: any) => {
  win = win || generateWindowConfig()
  if (!win || !win['key']) throw new Error('params win is invalid')
  windowList.value.push(win)
  win = windowList.value.find((_win: any) => _win.key === win.key)
  const split_container = document.querySelector('.split_container')
  // 当前视图中没有split_container
  if (!split_container) {
    const splitContainer = vnode2dom(templateLayout(win))
    componentIns.vnode.el.appendChild(splitContainer)
  } else {
    // 当前视图中有split_container
    // 插入到正在活动的视图
    const splitContentWrapper = getParentElByClname(componentIns.vnode.el.querySelector(`.header_item[tabkey='${activeTabKey.value}']`), 'split_content_wrapper')
    addTabEl(splitContentWrapper.querySelector('.split_view_label_wrapper.flex'), vnode2dom(templateLabel(win)))
    splitContentWrapper.querySelector('.split_view_content_wrapper').appendChild(vnode2dom(templateContent(win)))
  }
  activeTab(win.key)
}
// 水平垂直拆分
function splitWindow(win: any, type = splitDirectionMap.vertical) {
  if (windowList.value.length <= 0) return
  win = win || generateWindowConfig()
  if (!win || !win['key']) throw new Error('params win is invalid')
  const tab = vnode2dom(templateLabel(win))
  const tabView = vnode2dom(templateContent(win))
  const splitContentWrapper = getParentElByClname(componentIns.vnode.el.querySelector(`.header_item[tabkey='${activeTabKey.value}']`), 'split_content_wrapper')
  createAndMove(splitContentWrapper, {
    dropPosition: type == splitDirectionMap.vertical ? dropPositionMap.bottom : dropPositionMap.right,
    target: tab,
    tabView: tabView,
  })
  windowList.value.push(win)
  activeTab(win.key)
}
defineExpose({
  windowList,
  newWindow,
  splitWindow,
  getActiveWindow,
  closeWindow,
  activeTab,
})
// 关闭窗口
async function closeWindow(win: any, event: any, force = false) {
  event?.stopPropagation?.call(event)
  event = event || {
    target: componentIns.vnode.el.querySelector(`.header_item[tabkey='${win.key}']`),
  }
  if (!force && !(await canCloseWindow(win, event))) return
  closeWindowPost(win, event.target)
  const tab = getParentElByClname(event.target, 'header_item')
  const tabKey = tab.getAttribute('tabkey')
  const tabView: any = Array.from(tab.parentNode.parentNode.nextElementSibling?.children ?? []).find((item: any) => item.getAttribute('tabviewkey') == tabKey)
  tab.parentNode.removeChild(tab)
  tabView.parentNode.removeChild(tabView)
  // 重置activeTabKey
  resetActiveTabKey(win)
  emits('closeWindow', win, event)
  if (windowList.value.length) emits('resize', {})
}
// 关闭窗口 后置操作 删除无效dom
function closeWindowPost(params: any, target: any) {
  const splitContainer = getParentElByClname(target, 'split_container')
  const splitContainerParent = splitContainer.parentNode
  // 获取分屏面板
  const splitPane = getParentElByClname(target, 'split_pane')

  // 获取面板方向
  const splitPaneDirection = splitPane.className.includes(splitDirectionMap.vertical) ? splitDirectionMap.vertical : splitDirectionMap.horizontal
  const splitPanePosition = splitPane.className.includes('split_paneL') ? 'left' : 'right'

  requestAnimationFrame(() => {
    if (!splitPane?.querySelector('.split_view_content_wrapper')?.firstElementChild) {
      // 获取剩下的元素
      const respectElIndex = splitPanePosition == 'left' ? 2 : 0
      const respectEl = splitContainer.children[respectElIndex]
      if (respectEl) {
        switch (splitPaneDirection) {
          case splitDirectionMap.vertical:
            splitPane.style.height = '100%'
            respectEl.style.height = '100%'
            break
          case splitDirectionMap.horizontal:
            splitPane.style.width = '100%'
            respectEl.style.width = '100%'
            break
        }
        // 移除resizeBar
        const resizeBar = [...splitContainer.children].find((el) => el.className.includes('Resizer'))
        if (resizeBar) splitContainer.removeChild(resizeBar)
        // 删除的时候永远都是删除右边的Pane，拖拽时除外
        if (splitPanePosition == 'left' && params.type != 'drag') {
          splitPane.removeChild(splitPane.firstElementChild)
          splitPane.appendChild(respectEl.firstElementChild)
          splitPane.parentNode.removeChild(respectEl)
        } else {
          splitPane.parentNode.removeChild(splitPane)
        }
      }
    }

    // 删除split_container
    if (isEmptySplitContainerEl(splitContainer)) {
      try {
        splitContainerParent.removeChild(splitContainer)
      } catch (error) {}
    }

    // 清理多余布局
    clearUselessLayout(splitContainerParent)
  })
}
// 重置activeTabKey
function resetActiveTabKey(win: any) {
  windowList.value = windowList.value.filter((_win: any) => _win.key != win.key)
  if (win.key != activeTabKey.value) return
  activeTab(windowList.value.at(-1)?.key ?? '-1')
}

//清理多余布局
function clearUselessLayout(elNode: any) {
  const multiSplitContainer: any = document.querySelectorAll('.split_container:has(.split_container)')
  for (const elOut of multiSplitContainer) {
    if (elOut.children.length == 1) {
      elOut.parentNode.appendChild(elOut.querySelector('.split_container'))
      elOut.parentNode.removeChild(elOut)
    }
  }
  const multiSplitPane: any = document.querySelectorAll('.split_pane:has(.split_pane)')
  for (const elOut of multiSplitPane) {
    if (elOut.firstElementChild.children.length == 1) {
      elOut.appendChild(elOut.querySelector('.split_view'))
      elOut.removeChild(elOut.querySelector('.split_container'))
    }
  }
  // const splitPanes = elNode.querySelectorAll('.split_pane');
  // if (splitPanes.length == 1) {
  //   elNode.appendChild(splitPanes[0].firstElementChild);
  //   elNode.removeChild(elNode.firstElementChild);
  // }
}

// 计算splitContainer是否无效
function isEmptySplitContainerEl(splitContainer: any) {
  const adjoinEls = [...splitContainer.children]
  const paneL = adjoinEls.find((el) => el.className.includes('split_paneL'))
  const paneR = adjoinEls.find((el) => el.className.includes('split_paneR'))
  const paneLInnerHtmlIsEmpty = !paneL?.querySelector('.split_view_content_wrapper')?.firstElementChild
  const paneRInnerHtmlIsEmpty = !paneR?.querySelector('.split_view_content_wrapper')?.firstElementChild
  if ((!paneL && !paneR) || (!paneR && paneLInnerHtmlIsEmpty) || (!paneL && paneRInnerHtmlIsEmpty) || (paneLInnerHtmlIsEmpty && paneRInnerHtmlIsEmpty)) {
    return true
  }
  return false
}
</script>

<style lang="less">
#split_window {
  width: 100%;
  height: 100%;
  // background-color: var(--color-bg-1);
  background-color: #ffffff00; // lottie-bg
  transform: translate(0, 0);
  box-sizing: border-box;

  .flex {
    display: flex;
    gap: 10px;
  }

  .column {
    flex-direction: column;
  }

  .a-c {
    align-items: center;
  }

  .j-c {
    justify-content: center;
  }

  .split_view {
    height: 100%;
    width: 100%;

    .split_content_wrapper {
      width: 100%;
      height: 100%;
      align-items: stretch;
      gap: 0;
      overflow: hidden;

      .split_view_label_wrapper {
        height: 42px;
        border-bottom: solid 1px @color-border-1;
        overflow: hidden;
        clear: both;
        gap: 0;

        .split_view_label_box {
          gap: 0;
          flex: 1;
          overflow: hidden;
          transition: transform 0.25s ease;

          .header_item {
            cursor: pointer;
            flex: 1;
            padding: 0 12px;
            max-width: 200px;
            font-size: 13px;
            color: var(--color-text-3);
            gap: 5px;
            overflow: hidden;

            p,
            span {
              text-overflow: ellipsis;
              overflow: hidden;
              box-sizing: border-box;
              width: 100%;
              white-space: nowrap;
            }

            &:hover {
              background-color: var(--color-fill-1);

              .close_btn {
                opacity: 1;
                pointer-events: fill;
              }
            }

            &.label_active {
              color: var(--color-text-2);
              background-color: var(--color-fill-2);
              transition: all 0.15s;

              &:hover {
                background-color: var(--color-fill-1);
              }

              .close_btn {
                opacity: 1;
                pointer-events: fill;
              }
            }

            .close_btn {
              height: 30px;
              line-height: 30px;
              color: var(--color-text-2);
              transition: opacity 0.2s ease-out;
              pointer-events: none;
              opacity: 0;

              .close_inner {
                line-height: 14px;
                width: 16px;
                height: 16px;
                text-align: center;
                font-size: 14px;
                border-radius: 50%;
                transition: all 0.2s ease-out;
                transform: translate(2px, 5px);

                &:hover {
                  background: var(--color-fill-4);
                }
              }
            }
          }

          .add_btn {
            cursor: pointer;
            height: 100%;
            line-height: 36px;
            padding: 0 8px;
            font-size: 20px;
            color: var(--color-text-2);

            &:hover {
              transition: all 0.2s;
              background: var(--color-fill-3);
            }
          }
        }

        .split_view_label_action_wrapper {
          gap: 0;
          z-index: 1;
          color: @color-text-2;
          padding: 0 12px;

          .action_btn {
            cursor: pointer;
            width: 26px;
            height: 42px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              fill: @color-text-2;

              &:hover {
                fill: @color-text-1;
              }
            }
          }
        }

        .split_nav_pre_btn,
        .split_nav_next_btn {
          cursor: pointer;
          line-height: 26px;
          width: 26px;
          height: 26px;
          color: white;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: #ffffff2f;
          }
        }

        .split_nav_pre_btn {
          position: absolute;
          left: 0;
          transform: rotate(180deg);
        }

        .split_nav_next_btn {
          right: 0;
        }
      }

      .split_view_content_wrapper {
        flex: 1;
        position: relative;

        .split_view_content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          // color: white;
          // background-color: #282a36;
          overflow: hidden;
          clear: both;
        }
      }
    }
  }

  .drag_modal_wrapper {
    pointer-events: none;
    position: fixed;
    transition: all 0.2s ease-out;
    top: 20px;
    left: 40px;
    height: 300px;
    width: 100px;
    background-color: @color-fill-4;
    z-index: 2000;
    opacity: 0.35;
  }

  .placeholder_default {
    width: 100%;
    height: 100%;
  }
}

.empty {
  width: 100%;
  padding-top: calc(39vh - 1px);
  text-align: center;
}
</style>
