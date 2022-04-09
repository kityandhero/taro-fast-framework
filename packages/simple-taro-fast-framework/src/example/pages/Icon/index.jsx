import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import {
  Card,
  Space,
  HelpBox,
  Grid,
  FlexBox,
  Icon,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import logoImg from '../../../assets/images/logo.png';

const icons = {
  main: [
    'analytics',
    'bell',
    'blocked',
    'bookmark',
    'bullet-list',
    'calendar',
    'add-circle',
    'subtract-circle',
    'check-circle',
    'close-circle',
    'add',
    'subtract',
    'check',
    'close',
    'clock',
    'credit-card',
    'download-cloud',
    'download',
    'equalizer',
    'external-link',
    'eye',
    'filter',
    'folder',
    'heart',
    'heart-2',
    'star',
    'star-2',
    'help',
    'alert-circle',
    'home',
    'iphone-x',
    'iphone',
    'lightning-bolt',
    'link',
    'list',
    'lock',
    'mail',
    'map-pin',
    'menu',
    'message',
    'money',
    'numbered-list',
    'phone',
    'search',
    'settings',
    'share-2',
    'share',
    'shopping-bag-2',
    'shopping-bag',
    'shopping-cart',
    'streaming',
    'tag',
    'tags',
    'trash',
    'upload',
    'user',
    'loading',
    'loading-2',
    'loading-3',
  ],
  file: [
    'file-audio',
    'file-code',
    'file-generic',
    'file-jpg',
    'file-new',
    'file-png',
    'file-svg',
    'file-video',
  ],
  text: [
    'align-center',
    'align-left',
    'align-right',
    'edit',
    'font-color',
    'text-italic',
    'text-strikethrough',
    'text-underline',
  ],
  arrow: [
    'arrow-up',
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'chevron-up',
    'chevron-down',
    'chevron-left',
    'chevron-right',
  ],
  mediaControl: [
    'play',
    'pause',
    'stop',
    'prev',
    'next',
    'reload',
    'repeat-play',
    'shuffle-play',
    'playlist',
    'sound',
    'volume-off',
    'volume-minus',
    'volume-plus',
  ],
  media: ['camera', 'image', 'video'],
  logo: ['sketch'],
};

const boxStyle = {
  padding: 'var(--tfc-20) 0',
  height: 'var(--tfc-120)',
  color: 'var(--tfc-color-grey)',
};

const nameStyle = {
  width: '100%',
  fontSize: 'var(--tfc-28)',
  height: 'var(--tfc-36)',
  lineHeight: 'var(--tfc-36)',
  textAlign: 'center',
  margin: 'var(--tfc-20) 0',
};

const config1 = {
  size: 24,
  value: 'sketch',
};

const config2 = {
  size: 42,
  imageMode: true,
  value: logoImg,
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '图标',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Color',
    name: '内置图标',
    description: '内置图标',
  };

  buildGrid = (keyPrefix = '', list = []) => {
    return (
      <Grid columns={3}>
        {list.map((item, index) => {
          return (
            <Grid.Item key={`${keyPrefix}_${index}`}>
              <FlexBox
                style={boxStyle}
                flexAuto="top"
                top={
                  <CenterBox>
                    <Icon value={item} size={40} />
                  </CenterBox>
                }
                bottom={<View style={nameStyle}>{item}</View>}
              />
            </Grid.Item>
          );
        })}
      </Grid>
    );
  };

  renderContent = () => {
    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="主要" mockChildren={false} useInnerBox={false}>
          {this.buildGrid('main', icons.main)}
        </SimpleBox>

        <SimpleBox header="文件" mockChildren={false} useInnerBox={false}>
          {this.buildGrid('file', icons.file)}
        </SimpleBox>

        <SimpleBox header="文本" mockChildren={false} useInnerBox={false}>
          {this.buildGrid('text', icons.text)}
        </SimpleBox>

        <SimpleBox header="箭头" mockChildren={false} useInnerBox={false}>
          {this.buildGrid('arrow', icons.arrow)}
        </SimpleBox>

        <SimpleBox header="媒体控制" mockChildren={false} useInnerBox={false}>
          {this.buildGrid('mediaControl', icons.mediaControl)}
        </SimpleBox>

        <SimpleBox header="多媒体" mockChildren={false} useInnerBox={false}>
          {this.buildGrid('media', icons.media)}
        </SimpleBox>

        <SimpleBox
          header="Logo"
          config={config1}
          componentName="Icon"
          mockChildren={false}
          useInnerBox={false}
        >
          {this.buildGrid('logo', icons.logo)}
        </SimpleBox>

        <SimpleBox
          header="图片模式"
          config={config2}
          componentName="Icon"
          mockChildren={false}
          useInnerBox={false}
        >
          <Grid columns={3}>
            <Grid.Item>
              <FlexBox
                style={boxStyle}
                flexAuto="top"
                top={
                  <CenterBox>
                    <Icon {...config2} />
                  </CenterBox>
                }
                bottom={<View style={nameStyle}>外部图片</View>}
              />
            </Grid.Item>
          </Grid>
        </SimpleBox>

        <PropertyBox config={Icon.defaultProps} labelWidth={240} />

        <Card
          header="使用说明 :"
          style={cardStyle}
          headerStyle={cardHeaderStyle}
        >
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: '导入组件: import { Icon } from "taro-fast-component/es/customComponents".',
              },
              {
                text: '导入图标: 例如 const { IconAdd } = Icon.',
              },
              {
                text: '导入方法: 例如 const { buildIcon } = Icon.',
              },
              {
                text: '按名称使用: 例如 <Icon value={add} size={40} />.',
              },
              {
                text: '导出使用: 例如 <IconAdd size={40} />.',
              },
              {
                text: '函数使用: 例如 buildIcon({size:40},"add").',
              },
            ]}
          />
        </Card>
      </Space>
    );
  };
}
