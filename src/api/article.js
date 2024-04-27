import request from '@/utils/request'
/**
 * 文章分类列表
 */
export const artGetChannelsService = () => {
  return request.get('my/cate/list')
}
