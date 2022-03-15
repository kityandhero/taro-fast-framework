import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  HorizontalScrollBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const itemStyle = {
  backgroundColor: '#ccc',
};

const item = {
  width: 400,
  style: {
    ...itemStyle,
  },
};

const config1 = {
  style: {
    height: transformSize(280),
  },
  list: [item, item, item, item, item, item, item, item, item, item],
  itemBuilder: () => {
    return <View style={{ width: transformSize(280) }}></View>;
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '水平滚动容器',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'HorizontalScrollBox',
    name: '水平滚动容器',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="默认布局" config={config1}>
          <HorizontalScrollBox {...config1} />
        </SimpleBox>

        <PropertyBox
          config={HorizontalScrollBox.defaultProps}
          labelWidth={170}
        />
      </Space>
    );
  };
}
