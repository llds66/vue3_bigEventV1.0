<script setup>
import { ref } from 'vue'
/**
 * 表单数据与规则
 */
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}
// 弹层的开关
const dialogVisible = ref(false)

// 开启弹层的方法,父组件调用传值
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } //数据回显
  // console.log(row)
}
// 暴露open方法
defineExpose({
  open
})

// 确认添加或编辑事件
const emit = defineEmits(['success']) //成功调用触发success
const fromRef = ref()
import { artAddChannelService, artEditChannelService } from '@/api/article'
const onSubmit = async () => {
  await fromRef.value.validate()
  //添加或编辑(根据id)
  formModel.value.id
    ? await artEditChannelService(formModel.value)
    : await artAddChannelService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success') //成功调用触发success=>父组件从新请求分类数据
}
</script>

<template>
  <!-- 【文章分类】封装弹层组件 标题基于是否有id-->
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <div>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="fromRef"
        label-width="100px"
        style="padding-right: 30px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="formModel.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="formModel.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
