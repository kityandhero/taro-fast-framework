import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { CenterBox, Watermark } from 'taro-fast-component';

import { ContentPageWrapper } from '../../../customComponents';

import { buildInteractiveConfigList } from './tools';

const configCore = {
  content: '水印',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '水印背景',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageWrapper {
  headerData = {
    id: 'Watermark',
    name: '水印背景',
    description: '水印背景组件',
  };

  targetComponentName = 'Watermark';

  constructor(properties) {
    super(properties, configCore);

    this.state = {
      ...this.state,
      header: '加载提示',
      inner: (
        <View
          style={{
            width: transformSize(200),
            height: transformSize(200),
          }}
        >
          <CenterBox>内部内容</CenterBox>
        </View>
      ),
    };
  }

  buildInteractiveConfig = () => {
    return buildInteractiveConfigList();
  };

  buildSimpleItem = ({ key, config, inner }) => {
    return (
      <View
        key={`${key}_Wrapper`}
        style={{
          border: 'var(--tfc-1) solid #ccc',
          height: transformSize(200),
          width: '100%',
        }}
      >
        <Watermark {...config}>{this.buildSimpleItemInner(inner)}</Watermark>
      </View>
    );
  };
}
