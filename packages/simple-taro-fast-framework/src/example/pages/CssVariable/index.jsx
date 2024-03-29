import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { Space } from 'taro-fast-component';

import { ContentPageBase, SimpleBox } from '../../../customComponents';

const config1 = {
  style: {
    width: 'var(--tfc-120)',
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Css 全局变量',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Color',
    name: 'Css 全局变量',
    description: 'Css全局变量说明',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header="像素变量"
          config={config1}
          footer={[
            {
              text: '1000 ~ 2000 之间,步长变更为10',
            },
          ]}
          componentName="Box"
          mockChildren={false}
          useInnerBox
        >
          <Space wrap>
            <View>--tfc-1 ~ --tfc-2000</View>
          </Space>
        </SimpleBox>

        <SimpleBox header="其他">
          <View>请参阅 taro-fast-common/es/index.css</View>
        </SimpleBox>
      </Space>
    );
  };
}
