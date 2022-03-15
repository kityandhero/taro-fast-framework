import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { FlexBox, Space } from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const autoStyle = {
  height: transformSize(80),
  backgroundColor: '#ccc',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: 'Flex布局',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'FlexBox',
    name: '自动布局',
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="仅左侧布局">
          <FlexBox left={<View style={boxStyle}></View>} />
        </SimpleBox>

        <SimpleBox header="左侧自动布局">
          <FlexBox
            left={<View style={autoStyle}></View>}
            right={<View style={boxStyle}></View>}
          />
        </SimpleBox>

        <SimpleBox header="右侧自自动布局">
          <FlexBox
            flexAuto="right"
            left={<View style={boxStyle}></View>}
            right={<View style={autoStyle}></View>}
          />
        </SimpleBox>

        <SimpleBox header="上下自动布局 , 下部固定高度">
          <FlexBox
            flexAuto="top"
            verticalHeight={300}
            top={
              <View
                style={{ ...autoStyle, ...{ width: '100%', height: '100%' } }}
              ></View>
            }
            bottom={
              <View
                style={{
                  ...boxStyle,
                  ...{ width: '100%', height: transformSize(80) },
                }}
              ></View>
            }
          />
        </SimpleBox>

        <SimpleBox header="上下自动布局 , 上部固定高度">
          <FlexBox
            flexAuto="bottom"
            verticalHeight={300}
            top={
              <View
                style={{
                  ...autoStyle,
                  ...{ width: '100%', height: transformSize(80) },
                }}
              ></View>
            }
            bottom={
              <View
                style={{
                  ...boxStyle,
                  ...{ width: '100%', height: '100%' },
                }}
              ></View>
            }
          />
        </SimpleBox>

        <PropertyBox config={FlexBox.defaultProps} labelWidth={170} />
      </Space>
    );
  };
}
