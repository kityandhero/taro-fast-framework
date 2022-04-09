import { connect } from 'react-redux';

import { Card, Space, DataGrid } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../../customConfig/constants';
import ContentPageBase from '../../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const configList = [
  {
    divider: true,
    dividerText: 'Auxiliary Config',
  },
  {
    label: 'showRenderCountInConsole',
    value: '在控制台中显示render的次数,用于调试优化, 生产环境不应开启',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'keyPrefix',
    value:
      '当前页面/继承紫框架的组件内置的key前缀, 用于优化在循环中构建唯一key',
    ellipsis: false,
    canCopy: true,
  },
  {
    divider: true,
    dividerText: 'Fade Spin Config',
  },
  {
    label: 'useFadeSpinWrapper',
    value: '页面是否使用渐显效果组件包裹',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'useSimulationFadeSpin',
    value: '是否模拟渐显效果, 需前置开启 useFadeSpinWrapper',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'simulationFadeSpinDuration',
    value: '模拟渐显效果的持续时间',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'hideFadeSpinWrapperAfterLoadRemoteRequest',
    value:
      '初始加载接口后自动渐显页面, 用于非静态页面, 需前置开启 useFadeSpinWrapper; 一般不要与 useSimulationFadeSpin 同时使用',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'loadRemoteRequestAfterMount',
    value: '渲染完成后是否立即请求默认加载接口',
    ellipsis: false,
    canCopy: true,
  },
  {
    divider: true,
    dividerText: 'Remote Request Config',
  },
  {
    label: 'loadRemoteRequestDelay',
    value: '请求接口时延迟的时间, 合理配置有助于优化用户体验, 默认为0',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'lastRequestingData',
    value: '最后一次默认接口请求的参数缓存',
    ellipsis: false,
    canCopy: true,
  },
  {
    divider: true,
    dividerText: 'Paging Config',
  },
  {
    label: 'pagingLoadMode',
    value:
      '是否使用分页加载模式, 分页加载模式下, 自动附加页码以及页面数等必要参数',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'pageNo',
    value: '分页请求时的请求页码, 一般不用操作此项, 框架会自动维护此值',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'pageSize',
    value: '分页请求时的请求页条目数, 一般不用操作此项, 框架会自动维护此值',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'total',
    value: '页面总条目数, 由接口返回',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'useListDataAttachMode',
    value: '是否列表数据附加模式, 上滑分页加载场景下开启',
    ellipsis: false,
    canCopy: true,
  },
  {
    divider: true,
    dividerText: 'Containor Config',
  },
  {
    label: 'viewStyle',
    value: '主容器的自定义 style',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'scrollViewMode',
    value: '是否使用ScrollView模式, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enablePullDownRefresh',
    value: '启用下拉刷新, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'refreshingBoxEffect',
    value: '配置下拉刷新提示器效果, 默认 "pull"',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enableAutoInitialLoadingIndicator',
    value:
      '启用初始化加载提示器自动显示, 默认开启, 需要自定义初始加载效果时候请关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enablePullDownRefreshSuccessNotification',
    value: '启用下拉刷新成功提示, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'enableLowerLoad',
    value: '启用触底部加载, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'lowerLoadingPosition',
    value: '触底加载提示器位置, 默认 "footer"',
    ellipsis: false,
    canCopy: true,
  },
  {
    divider: true,
    dividerText: 'Back Top Config',
  },
  {
    label: 'enableBackTop',
    value: '启用返回头部, 仅默认容器模式有效, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'backTopRight',
    value: '距右侧距离',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'backTopBottom',
    value: '距底部距离',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'backTopCircle',
    value: '启用圆形轮廓, 默认关闭',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'backTopOpacity',
    value: '不透明度, 默认0.6',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'backTopIconColor',
    value: '图标颜色',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'backTopBackgroundColor',
    value: '背景颜色',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '内置视图配置',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'config',
    name: '内置视图配置',
    description: '可配置的页面视图属性',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="可配置属性说明"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          <DataGrid
            list={configList}
            border
            layout="row"
            size="small"
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>
      </Space>
    );
  };
}
