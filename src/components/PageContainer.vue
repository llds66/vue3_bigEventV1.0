<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <!-- 封装文章分类页与管理页主要模板 -->
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- extra插槽：操作按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 默认插槽：主要内容，展示表格组件 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
