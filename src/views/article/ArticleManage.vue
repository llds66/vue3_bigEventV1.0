<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { formatTime } from '@/utils/format'
import ChannelSelect from './components/ChannelSelect.vue'

// 传递给子组件下拉框
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 获取文章列表
import { artGetListService } from '@/api/article'
const articleList = ref([]) //文章列表数据
const total = ref(0)
const getArticleList = async () => {
  const res = await artGetListService(params.value)
  console.log(res)
  articleList.value = res.data.data
  total.value = res.data.total
}
getArticleList()

// 假数据
// const articleList = ref([
//   {
//     id: 5961,
//     title: '新的文章啊',
//     pub_date: '2022-07-10 14:53:52.604',
//     state: '已发布',
//     cate_name: '体育'
//   },
//   {
//     id: 5962,
//     title: '新的文章啊',
//     pub_date: '2022-07-10 14:54:30.904',
//     state: null,
//     cate_name: '体育'
//   }
// ])

// 编辑按钮
const onEditArticle = (row) => {
  console.log(row)
}

// 删除按钮
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>
<template>
  <!-- 文章管理页 -->
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>
    <!--  -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- 分类数据下拉框组件 -->
        <ChannelSelect v-model="params.cate_id"></ChannelSelect
      ></el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 150px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="padding-left: 100px">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
</template>
