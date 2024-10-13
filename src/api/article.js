import request from '@/utils/requset'
// 分类：
export const getChannelService = () => {
  return request.get('/my/cate/list')
}
export const updateChannelList = ({ id, cate_name, cate_alias }) => {
  return request.put('/my/cate/info', { id, cate_name, cate_alias })
}
export const addChannelList = ({ id, cate_name, cate_alias }) => {
  return request.post('/my/cate/add', { id, cate_name, cate_alias })
}
export const delChannerList = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
// 文章: 获取文章列表
export const getArticle = (params) => {
  return request.get('/my/article/list', {
    params
  })
}
export const addArticle = (data) => {
  return request.post('/my/article/add', data)
}
export const getArticleDetail = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}
export const updateArticle = (data) => {
  console.log(data, '更新编辑')
  return request.put('/my/article/info', data)
}
export const deleteArticle = (id) =>
  request.delete('/my/article/info', { params: { id } })
