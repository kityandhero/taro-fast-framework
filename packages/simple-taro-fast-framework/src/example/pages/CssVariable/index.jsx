import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { Space } from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';

const config1 = {
  style: {
    width: transformSize(120),
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
          <View>请参阅 taro-fast-common/es/constants.css</View>
        </SimpleBox>
      </Space>
    );
  };
}
