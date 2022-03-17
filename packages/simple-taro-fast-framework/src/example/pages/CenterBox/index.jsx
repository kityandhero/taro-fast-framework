import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { CenterBox, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const containorStyle = {
  height: transformSize(400),
  backgroundColor: '#ccc',
};

const config1 = {
  style: containorStyle,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '居中容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'CenterBox',
    name: '居中容器',
    description: '居中容器组件',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="布局展示" config={config1}>
          <View style={containorStyle}>
            <CenterBox {...config1}>
              <View style={boxStyle}></View>
            </CenterBox>
          </View>
        </SimpleBox>

        <PropertyBox config={CenterBox.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
