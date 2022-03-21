import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  FlexBox,
  ImageBox,
  Space,
  CenterBox,
  Ellipsis,
  TranslucentBox,
  Grid,
} from 'taro-fast-component/es/customComponents';

import { colStyle } from '@/customConfig/constants';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

const imageModeCollection = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'widthFix',
  'heightFix',
  'top',
  'bottom',
  'center',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
];

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

const imageBoxContainerStyle = {
  display: 'block',
  width: transformSize(220),
};

const imageBoxContainerMiniStyle = {
  display: 'block',
  width: transformSize(80),
};

const imageContainerStyle = {
  padding: transformSize(2),
  backgroundColor: 'red',
};

const src =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643989392&t=18546318aa0f8e3e126ab26965ca6f45';

const config1 = {
  src,
};

const config2 = {
  src,
  imageBoxStyle: imageContainerStyle,
};

const config3 = {
  src,
  showMode: 'loading',
};

const config4 = {
  src,
  showOverlay: true,
  overlayText: '售罄',
};

const config5 = {
  src,
  decoration: {
    style: {
      color: 'blue',
    },
    text: '装饰文字',
  },
};

const config6 = {
  src,
  circle: true,
};

const config7 = {
  src,
  lazyLoad: true,
};

const config8 = {
  src,
  aspectRatio: 0.5,
};

const config9 = {
  src,
  decorationBuilder: () => {
    return (
      <TranslucentBox
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: transformSize(68),
        }}
        backgroundColor="#000"
        alpha={0.5}
      >
        <CenterBox>
          <Ellipsis
            line={1}
            style={{
              color: '#fff',
              opacity: 1,
              padding: `${transformSize(13)} ${transformSize(16)}`,
            }}
          >
            装饰文字
          </Ellipsis>
        </CenterBox>
      </TranslucentBox>
    );
  },
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '图片',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'ImageBox',
    name: '图片',
    description: '图片组件',
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
                    <View style={imageBoxContainerMiniStyle}>
                      <ImageBox imageMode={item} src={src} />
                    </View>
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
        <SimpleBox
          header="普通使用"
          config={config1}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <View
            style={imageBoxContainerStyle}
            componentName="ImageBox"
            mockChildren={false}
            useInnerBox
          >
            <ImageBox {...config1} />
          </View>
        </SimpleBox>

        <SimpleBox
          header="指定容器样式"
          config={config2}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <View style={imageBoxContainerStyle}>
            <ImageBox {...config2} />
          </View>
        </SimpleBox>

        <SimpleBox
          header="加载模式"
          config={config3}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <View style={imageBoxContainerStyle}>
            <ImageBox {...config3} />
          </View>
        </SimpleBox>

        <SimpleBox
          header="使用遮罩"
          config={config4}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <View style={imageBoxContainerStyle}>
            <ImageBox {...config4} />
          </View>
        </SimpleBox>

        <SimpleBox
          header="使用上层装饰"
          config={config5}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <View style={imageBoxContainerStyle}>
            <ImageBox {...config5} />
          </View>
        </SimpleBox>

        <SimpleBox
          header="使用上层装饰构建"
          config={config9}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
          ignorePropertyList={['decorationBuilder']}
        >
          <View style={imageBoxContainerStyle}>
            <ImageBox {...config9} />
          </View>
        </SimpleBox>

        <SimpleBox header="imageMode [取值等同于微信Image]">
          {this.buildGrid('imageMode', imageModeCollection)}
        </SimpleBox>

        <SimpleBox
          header="圆形轮廓"
          config={config6}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <View style={imageBoxContainerStyle}>
            <ImageBox {...config6} />
          </View>
        </SimpleBox>

        <SimpleBox
          header="LazyLoad"
          config={config7}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <View style={imageBoxContainerStyle}>
            <ImageBox {...config7} />
          </View>
        </SimpleBox>

        <SimpleBox
          header="指定长宽比"
          config={config8}
          componentName="ImageBox"
          mockChildren={false}
          useInnerBox
        >
          <Space wrap size={16}>
            <View style={imageBoxContainerStyle}>
              <ImageBox aspectRatio={0.5} src={src} />
            </View>
            <View style={imageBoxContainerStyle}>
              <ImageBox circle aspectRatio={0.5} src={src} />
            </View>
          </Space>
        </SimpleBox>

        <SimpleBox header="简单布局">
          <Space direction="vertical" fillWidth>
            <FlexBox
              flexAuto="right"
              left={
                <View style={{ width: transformSize(100) }}>
                  <ImageBox src={src} />
                </View>
              }
              leftStyle={{ paddingRight: transformSize(10) }}
              right="右侧"
              rightStyle={colStyle}
            />

            <FlexBox
              flexAuto="left"
              left="左侧"
              leftStyle={colStyle}
              right={
                <View style={{ width: transformSize(100) }}>
                  <ImageBox circle src={src} />
                </View>
              }
              rightStyle={{ paddingLeft: transformSize(10) }}
            />
          </Space>
        </SimpleBox>

        <PropertyBox config={ImageBox.defaultProps} labelWidth={220} />
      </Space>
    );
  };
}
