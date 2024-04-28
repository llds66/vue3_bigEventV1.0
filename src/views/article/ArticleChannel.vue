<script setup>
import { ref } from 'vue'
// loading效果，通过自定义指令v-loading绑定到table组件上
const loading = ref(false)
/**
 * 获取文章
 */
const channelList = ref([]) //表单数据
import { artGetChannelsService } from '@/api/article'
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  // console.log(res.data.data)
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()
/**
 * 弹层
 */
import ChannelEdit from './components/ChannelEdit.vue'
const dialog = ref() //获取弹层组件DOM,操作其中的open方法
// 添加分类
const onAddChannel = () => {
  dialog.value.open({}) //通过open传参打开弹层 参数有id
}
// 编辑分类
const onEditChannel = (row) => {
  // console.log(row)
  dialog.value.open(row) //通过open传参打开弹层 参数无id
}

// 删除分类
import { artDelChannelService } from '@/api/article'
const onDelChannel = async (row) => {
  console.log(row)
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  // 重新获取
  getChannelList()
}

// 数据回显,子传父，子组件success=>重新请求分类数据
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>

    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="300">
        <!-- 每行的操作按钮，插槽传值 -->
        <!-- { row }是一个对象解构表达式，当前行数据作为一个对象传递给插槽的内容 -->
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            plain
            type="primary"
            @click="onEditChannel(row)"
            >编辑分类</el-button
          >
          <el-button
            :icon="Delete"
            plain
            type="danger"
            @click="onDelChannel(row)"
            >删除分类</el-button
          >
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
  <!-- 添加弹层组件 -->
  <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
</template>
