import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  HorizontalCenterBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const containorStyle = {
  border: `${transformSize(2)} solid #ccc`,
  height: transformSize(200),
};

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
  margin: transformSize(20),
};

const horizontalCenterBoxStyle = {
  backgroundColor: '#ccc',
};

const config1 = {
  style: horizontalCenterBoxStyle,
};

const config2 = {
  style: horizontalCenterBoxStyle,
  fillHeight: false,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '水平居中',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'HorizontalCenterBox',
    name: '水平居中',
    description: '水平居中',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="默认布局"
          config={config1}
          componentName="HorizontalCenterBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={containorStyle}>
            <HorizontalCenterBox {...config1}>
              <View style={boxStyle}></View>
            </HorizontalCenterBox>
          </View>
        </SimpleBox>

        <SimpleBox
          header="不自动使用父级高度"
          config={config2}
          componentName="HorizontalCenterBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={containorStyle}>
            <HorizontalCenterBox {...config2}>
              <View style={boxStyle}></View>
            </HorizontalCenterBox>
          </View>
        </SimpleBox>

        <PropertyBox
          config={HorizontalCenterBox.defaultProps}
          labelWidth={240}
        />
      </Space>
    );
  };
}
