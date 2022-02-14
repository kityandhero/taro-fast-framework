import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  DataGrid,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Normal',
    name: '滚动视图下拉刷新',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollView: true,
        pullDownRefresh: true,
        refreshColor: 'red',
        refreshBackgroundColor: 'green',
      },
    };
  }

  onReload = () => {
    console.log('onReload');
  };

  onLoadMore = () => {
    console.log('onLoadMore');
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <Card header="视图说明" style={style} headerStyle={cardHeaderStyle}>
          <DataGrid
            list={[
              // {
              //   label: '开启滚动视图',
              //   value: 'this.setState({scrollView: true})',
              //   span: 2,
              // },
              {
                label: '产地',
                value:
                  '杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州杭州',
                span: 2,
                ellipsis: true,
                canCopy: true,
                ellipsisLine: 1,
                ellipsisLineHeight: transformSize(40),
                ellipsisHeight: transformSize(80),
              },
              {
                label: '酸度',
                value: '普通',
              },
              {
                label: '质保',
                value: '21天',
              },
              {
                span: 2,
                label: '奶源',
                value: '新疆',
              },
              {
                span: 2,
                label: '厂家',
                value: 'XXXX食品有限公司',
              },
              {
                span: 2,
                label: '供应',
                value: '浙江省XX市',
              },
            ]}
            bordered
            column={2}
            size="small"
            labelStyle={{ width: transformSize(80) }}
            emptyValue="暂无"
            emptyStyle={{ color: '#ccc' }}
          />
        </Card>

        <Card header="视图说明" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            useBackground={false}
            list={[
              {
                text: '开启滚动视图: this.setState({scrollView: true})',
              },
              {
                text: '开启下拉刷新式: this.setState({pullDownRefresh: true})',
              },
              {
                text: '配置颜色: this.setState({refreshColor: "red",refreshBackgroundColor: "green"})',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
