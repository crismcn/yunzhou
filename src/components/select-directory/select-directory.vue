<template>
  <a-input @click.prevent="selectDirectory" v-model="path" readonly :placeholder="dialogTitle" class="input-box">
    <template #append>
      <div class="select-btn">
        <icon-upload size="18" style="margin-right: 5px" /> package.json
      </div>
    </template>
  </a-input>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
// import { ChoseDirectory } from "../../../rpc";

const props = defineProps({
  modelValue: {
    type: String,
    default() {
      return ''
    }
  },
  dialogTitle: {
    type: String,
    default() {
      return '请选择目录'
    }
  },
});

const path = ref("");
const emit = defineEmits(["update:modelValue"]);
const selectDirectory = async () => {
  // TODO DEV : 文件真实路径
  // const { data, code  } = await ChoseDirectory(props.dialogTitle)
  // if (code == 200 && data) {
  //   path.value = data
  //   emit("update:modelValue", data);
  // }
};

onMounted(() => {
  path.value = props.modelValue
});
watch(() => props.modelValue, (newValue, _oldValue) => {
  path.value = newValue
})
</script>

<style lang="less" scoped>
.input-box {
  width: 100%;
}

.select-btn {
  cursor: pointer;
  width: 120px;
  text-align: center;
  color: var(--color-text-2);

  &:hover {
    color: var(--color-text-1);
  }
}

:deep(.arco-input-wrapper) {
  // background: white;
  background: var(--color-bg-1);
  border: solid 1px var(--color-neutral-3);
}

:deep(.arco-input-focus) {
  z-index: 2;
  border: solid 1px rgb(var(--primary-6));
}

:deep(.arco-input.arco-input-size-large) {
  line-height: 2;
}

:deep(.arco-input-prepend) {
  border: 1px solid var(--color-neutral-3);
  border-right: none;
  // background-image: linear-gradient(to bottom right, #fff, #f8f8f8);
  background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
}

:deep(.arco-input-append) {
  border: 1px solid var(--color-neutral-3);
  border-left: none;
  // background-image: linear-gradient(to bottom right, #fff, #f8f8f8);
  background-image: linear-gradient(to bottom right, var(--color-bg-1), var(--color-neutral-1));
}
</style>
