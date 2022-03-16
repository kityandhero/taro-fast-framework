import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Space, Avatar, Badge } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const config1 = {
  content: '5',
};

const config2 = {
  dot: true,
};

const config3 = {
  content: '新',
  color: '#108ee9',
};

const config4 = {
  content: '99+',
  style: { border: `${transformSize(1)} solid green` },
};

const config5 = {
  dot: true,
  color: '#108ee9',
  position: 'topLeft',
};

const config6 = {
  dot: true,
  color: '#87d068',
  position: 'topRight',
};

const config7 = {
  dot: true,
  position: 'bottomLeft',
};

const config8 = {
  dot: true,
  color: 'orange',
  position: 'bottomRight',
};

const config9 = {
  content: '99+',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '徽记',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Badge',
    name: '徽记',
    description: '徽记组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="包裹模式 文字" config={config1}>
          <Badge {...config1}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="包裹模式 圆点" config={config2}>
          <Badge {...config2}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="包裹模式 设置颜色" config={config3}>
          <Badge {...config3}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="包裹模式 设置样式" config={config4}>
          <Badge {...config4}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="包裹模式 位于左上角" config={config5}>
          <Badge {...config5}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="包裹模式 位于右上角" config={config6}>
          <Badge {...config6}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="包裹模式 位于左下角" config={config7}>
          <Badge {...config7}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="包裹模式 位于右下角" config={config8}>
          <Badge {...config8}>
            <Avatar text="图" />
          </Badge>
        </SimpleBox>

        <SimpleBox header="单独使用" config={config9}>
          <Badge {...config9} />
        </SimpleBox>

        <PropertyBox config={Badge.defaultProps} labelWidth={230} />
      </Space>
    );
  };
}
