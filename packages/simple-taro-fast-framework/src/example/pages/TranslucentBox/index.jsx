import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Space,
  TranslucentBox,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const boxStyle = {
  height: transformSize(220),
  backgroundImage: 'var(--tfc-color-gradual-red)',
};

const textBoxStyle = {
  padding: `${transformSize(10)} ${transformSize(20)}`,
  color: '#fff',
};

const config1 = {
  style: {
    width: transformSize(200),
  },
  backgroundColor: '#000',
  alpha: 0.1,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '半透明容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'TranslucentBox',
    name: '半透明容器',
    description: '半透明容器组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="默认"
          config={config1}
          componentName="TranslucentBox"
          mockChildren
          useInnerBox={false}
        >
          <View style={boxStyle}>
            <CenterBox>
              <TranslucentBox {...config1}>
                <CenterBox style={textBoxStyle}>内容</CenterBox>
              </TranslucentBox>
            </CenterBox>
          </View>
        </SimpleBox>

        <PropertyBox config={TranslucentBox.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
