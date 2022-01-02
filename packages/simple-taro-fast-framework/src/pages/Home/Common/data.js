export const fieldData = {
  articleId: {
    label: '数据标识',
    name: 'articleId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '文章的标题',
  },
};

export const statusCollection = {
  /**
   * 已删除
   * value : -1
   */
  remove: -1,

  /**
   * 已下线
   * value : 0
   */
  offline: 0,

  /**
   * 已上线
   * value : 1
   */
  online: 1,
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
