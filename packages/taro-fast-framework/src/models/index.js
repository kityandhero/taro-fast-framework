import schedulingControl from './schedulingControl';

export function embedModelCollection(...models) {
  return [...models, schedulingControl];
}

// 这里记得export的是数组, 不是对象
export default [schedulingControl];
