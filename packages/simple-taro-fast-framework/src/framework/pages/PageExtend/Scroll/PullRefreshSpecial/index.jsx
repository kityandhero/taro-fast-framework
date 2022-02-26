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
    label: '开启下拉刷新式',
    value: 'enablePullDownRefresh = true',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可配置下拉刷新提示器颜色',
    value: 'refreshColor = "red"',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: '可配置下拉刷新提示器背景颜色',
    value: 'refreshBackgroundColor = "green"',
    ellipsis: false,
    canCopy: true,
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '下拉刷新 - 提示器缩放效果',
});

@connect(({ simulation, global }) => ({
  simulation,
  global,
}))
export default class Index extends ContentPageBase {
  viewScrollMode = true;

  enablePullDownRefresh = true;

  enableAutoInitialLoadingIndicator = false;

  refreshingBoxEffect = 'scale';

  headerData = {
    id: 'PullRefresh',
    name: '下拉刷新',
    description: '提示器缩放效果',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'simulation/singleList',
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
        {this.judgeInitialActivityIndicatorVisible() ? (
          this.buildInitialActivityIndicator({})
        ) : (
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
        )}

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
