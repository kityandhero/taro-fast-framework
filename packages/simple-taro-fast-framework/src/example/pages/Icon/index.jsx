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

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

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

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Color',
    name: '颜色',
  };

  buildGrid = (keyPrefix = '', list = []) => {
    return (
      <Grid columns={3}>
        {list.map((item, index) => {
          return (
            <Grid.Item key={`${keyPrefix}_${index}`}>
              <FlexBox
                style={boxStyle}
                direction="vertical"
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
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card header="主要" style={style} headerStyle={cardHeaderStyle}>
            {this.buildGrid('main', icons.main)}
          </Card>

          <Card header="文件" style={style} headerStyle={cardHeaderStyle}>
            {this.buildGrid('file', icons.file)}
          </Card>

          <Card header="文本" style={style} headerStyle={cardHeaderStyle}>
            {this.buildGrid('text', icons.text)}
          </Card>

          <Card header="箭头" style={style} headerStyle={cardHeaderStyle}>
            {this.buildGrid('arrow', icons.arrow)}
          </Card>

          <Card header="媒体控制" style={style} headerStyle={cardHeaderStyle}>
            {this.buildGrid('mediaControl', icons.mediaControl)}
          </Card>

          <Card header="多媒体" style={style} headerStyle={cardHeaderStyle}>
            {this.buildGrid('media', icons.media)}
          </Card>

          <Card header="Logo" style={style} headerStyle={cardHeaderStyle}>
            {this.buildGrid('logo', icons.logo)}
          </Card>

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
      </View>
    );
  };
}
