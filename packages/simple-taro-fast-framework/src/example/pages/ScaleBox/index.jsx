import { View } from '@tarojs/components';

import { Space, ScaleBox } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const style = {
  backgroundColor: '#ccc',
};

const config1 = { style };

const config2 = { style, aspectRatio: 0.5 };

const config3 = { style, aspectRatio: 1.3, padding: 30 };

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '比例容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'FadeInBox',
    name: '比例容器',
    description: '根据父容器大小，按照设定的长宽比等比例改变',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="默认展示"
          description="默认长宽比为1, 即为正方形"
          config={config1}
        >
          <ScaleBox {...config1} />
        </SimpleBox>

        <SimpleBox header="设置长宽比" config={config2}>
          <ScaleBox {...config2} />
        </SimpleBox>

        <SimpleBox header="设置padding" config={config3}>
          <ScaleBox {...config3}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
              }}
            />
          </ScaleBox>
        </SimpleBox>

        <PropertyBox config={ScaleBox.defaultProps} labelWidth={140} />
      </Space>
    );
  };
}
