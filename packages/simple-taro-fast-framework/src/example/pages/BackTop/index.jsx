import { View } from '@tarojs/components';

import {
  getSystemInfo,
  transformSize,
  pageScrollTo,
} from 'taro-fast-common/es/utils/tools';
import {
  Space,
  Card,
  BackTop,
  HorizontalCenterBox,
  DataGrid,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

const configList = [
  {
    label: 'visible',
    value: '是否显示, 默认 false',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'bodyStyle',
    value: '包裹容的样式 默认 {}',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'opacity',
    value: '不透明不 默认 0.8',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'icon',
    value: '使用的图标, 默认 ""',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'iconSize',
    value: '图标大小, 默认 40',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'size',
    value: '整体尺寸, 默认 80',
    ellipsis: false,
    canCopy: true,
  },

  {
    label: 'zIndex',
    value: '垂直层次, 默认 100',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'bottom',
    value: '距离窗口底部距离, 默认 160',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'right',
    value: '距离窗口右侧距离, 默认 40',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'transparent',
    value: '容器是否透明, 默认 false',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'backgroundColor',
    value: '容器背景色, 默认 var(--tfc-color-light)',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'circle',
    value: '原型轮廓, 默认 true',
    ellipsis: false,
    canCopy: true,
  },
  {
    label: 'onClick',
    value: '点击事件, 默认 null',
    ellipsis: false,
    canCopy: true,
  },
];

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Badge',
    name: '徽记',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible1: false,
      },
    };

    const { screenHeight } = getSystemInfo();

    this.thresholdDistance = screenHeight / 2;
  }

  onPageScroll(e) {
    const { visible1 } = this.state;

    if (!visible1 && e.scrollTop >= this.thresholdDistance) {
      this.setState({
        visible1: true,
      });
    }

    if (visible1 && e.scrollTop < this.thresholdDistance) {
      this.setState({
        visible1: false,
      });
    }
  }

  scrollToTop = () => {
    // console.log({
    //   info: 'scrollToTop',
    //   v: typeof pageScrollTo,
    // });

    pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
  };

  renderContent = () => {
    const { visible1 } = this.state;

    return (
      <View>
        <Space direction="vertical" fillWidth>
          <View
            style={{
              height: transformSize(600),
              border: 'var(--tfc-2) solid #ccc',
              backgroundColor: '#ccc',
            }}
          >
            <HorizontalCenterBox>
              <View>向下滚动</View>
            </HorizontalCenterBox>
          </View>

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

          <BackTop visible={visible1} onClick={this.scrollToTop} />

          <BackTop
            visible={visible1}
            right={120}
            opacity={0.4}
            circle
            onClick={this.scrollToTop}
          />

          <BackTop visible={visible1} bottom={400} onClick={this.scrollToTop} />
        </Space>
      </View>
    );
  };
}
