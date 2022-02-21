import { connect } from 'react-redux';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  DataGrid,
  Divider,
  FadeInBox,
} from 'taro-fast-component/es/customComponents';

import {
  cardHeaderStyle,
  cardStyle,
} from '../../../../../customConfig/constants';
import ContentPageBase from '../../../../../customComponents/ContentPageBase';

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

@connect(({ news, global }) => ({
  news,
  global,
}))
export default class Index extends ContentPageBase {
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
        loadApiPath: 'news/get',
      },
    };
  }

  getApiData = (props) => {
    const {
      news: { data },
    } = props;

    return data;
  };

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

        <Card header="样式展示" style={style} headerStyle={cardHeaderStyle}>
          {this.buildInitialActivityIndicator({})}

          <Divider />

          {this.buildInitialActivityIndicator({
            type: 'ring',
            description: '正在努力加载哦',
          })}
        </Card>

        <Card header="使用说明" style={style} headerStyle={cardHeaderStyle}>
          <DataGrid
            list={descriptionList}
            border
            layout="row"
            size="small"
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card header="可用参数" style={style} headerStyle={cardHeaderStyle}>
          <DataGrid
            list={paramList}
            border
            size="small"
            column={1}
            emptyValue="暂无"
            labelStyle={{ width: transformSize(140) }}
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>
      </Space>
    );
  };
}
