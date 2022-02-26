import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Space,
  DataGrid,
  HelpBox,
  Ellipsis,
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
    label: '开启滚动视图',
    value: 'viewScrollMode = true',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '配置处理加载',
    value: 'enablePullDownRefresh = true',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可配置加载提示组件显示模式',
    value: 'lowerLoadingPosition = footer/absolute/fixed',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '自定义外部提示加载组件',
    value: '重载覆写函数 buildLowerLoadingSuspendBox = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '自定义底部提示加载组件',
    value: '重载覆写函数 buildLowerLoadingFooterBox = () => { return null; }',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '下拉刷新 - 外部提示器效果',
});

@connect(({ simulation, global }) => ({
  simulation,
  global,
}))
export default class Index extends ContentPageBase {
  viewScrollMode = true;

  enableLowerLoad = true;

  lowerLoadingPosition = 'fixed';

  pagingLoadMode = true;

  headerData = {
    id: 'LowerLoad',
    name: '触底加载',
    description: '外部提示器效果',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'simulation/pageList',
      },
    };
  }

  getApiData = (props) => {
    const {
      simulation: { data },
    } = props;

    return data;
  };

  renderContent = () => {
    const { metaListData } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <View>
          <Space direction="vertical" fillWidth>
            {metaListData.map((o, index) => {
              const { title, description } = o;

              return (
                <FadeInBox key={`item_${index}`}>
                  <Card
                    header={title}
                    border
                    cardBorderRadiusMode={false}
                    style={style}
                  >
                    <Ellipsis
                      line={2}
                      style={{
                        height: transformSize(88),
                        fontSize: transformSize(28),
                        lineHeight: transformSize(44),
                      }}
                    >
                      {description}
                    </Ellipsis>
                  </Card>
                </FadeInBox>
              );
            })}
          </Space>
        </View>

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

        <Card header="备注" style={style} headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            useBackground={false}
            list={[
              {
                text: '使用下拉刷新需要前置开启滚动视图',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
