import {
  Card,
  Divider,
  FadeInBox,
  Space,
} from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import CodePageBox from '../../../../../customComponents/CodePageBox';
import ContentPageBase from '../../../../../customComponents/ContentPageBase';
import {
  cardHeaderStyle,
  cardStyle,
} from '../../../../../customConfig/constants';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const descriptionList = [
  {
    label: '辅助判断是否显示初次加载提示',
    value: 'this.judgeInitialActivityIndicatorVisible()',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '调用方法',
    value:
      'this.buildInitialActivityIndicator({ type: "ring/comet", ,description: "提示文字" })',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '支持自定义重载',
    value:
      '重载覆写函数 buildInitialActivityIndicator = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
];

const paramList = [
  {
    label: 'type',
    value: '图标模式, ring/comet, 默认值 "comet"',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'description',
    value: '文字描述, string, 默认值 "加载中"',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'buildInitialActivityIndicator',
});

@connect(({ simulation, global }) => ({
  simulation,
  global,
}))
@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  enableAutoInitialLoadingIndicator = false;

  headerData = {
    id: 'buildInitialActivityIndicator',
    name: '',
    description: '构建初始加载提示',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'simulation/get',
      },
    };
  }

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card
          header="示例: 接口请求联用"
          style={style}
          headerStyle={cardHeaderStyle}
        >
          {this.judgeInitialActivityIndicatorVisible() ? (
            this.buildInitialActivityIndicator({})
          ) : (
            <FadeInBox>请求成功</FadeInBox>
          )}
        </Card>

        <CodePageBox
          list={paramList}
          usageList={descriptionList}
          renderCodeList={[
            'this.buildInitialActivityIndicator({})',
            `this.buildInitialActivityIndicator({
              type: 'ring',
              description: '正在努力加载哦',
            })`,
          ]}
        >
          {this.buildInitialActivityIndicator({})}

          <Divider />

          {this.buildInitialActivityIndicator({
            type: 'ring',
            description: '正在努力加载哦',
          })}
        </CodePageBox>
      </Space>
    );
  };
}
