<script setup>
// 获取文章分类数据
// import artGetChannelsService from '@/api/article.js'
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'

// defineProps 是用于定义组件接收的属性（props）
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
// defineEmits 是用于定义组件可以触发的自定义事件
// 子组件想要更新 modelValue 的值时，它会触发这个事件，并将新的值作为事件的参数传递给父组件
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  // console.log(res.data.data)
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <!-- :modelValue="modelValue" 是一个 Vue.js 的 prop 绑定
  update:modelValue="emit('update:modelValue', $event)" 是一个事件监听器，
  它监听 el-select 组件的 update:modelValue 事件。当这个事件发生时（用户选择了一个选项），
  它会调用 emit 函数，触发子组件自身的 update:modelValue 事件，并传递选中的值（$event）给父组件。
  -->
  <el-select
    style="width: 150px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
