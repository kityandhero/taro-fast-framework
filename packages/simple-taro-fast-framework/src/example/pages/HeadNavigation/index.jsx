import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import {
  buildLinearGradient,
  getMenuButtonBoundingClientRect,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  ColorText,
  FlexBox,
  HeadNavigation,
  ImageBox,
  Space,
} from 'taro-fast-component/es/customComponents';

import logoImage from '../../../assets/images/logo.png';
import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

const config1 = {
  backboardStyle: {
    width: '100%',
    height: '100%',
    backgroundImage: buildLinearGradient({
      direct: 45,
      list: ['#ff9700', '#ed1c24'],
    }),
  },
  backboardChildren: (
    <ImageBox
      src="https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF"
      aspectRatio={0.468}
      borderRadius={false}
    />
  ),
};

const config2 = {
  ...config1,
  ...{
    bottom: (
      <FlexBox
        style={{ width: '100%' }}
        flexAuto="right"
        leftStyle={{
          marginLeft: transformSize(24),
          marginRight: transformSize(24),
        }}
        left={
          <View
            style={{
              width: transformSize(120),
              borderRadius: transformSize(10),
              backgroundColor: '#fff',
            }}
          >
            <ImageBox src={logoImage} />
          </View>
        }
        right={
          <FlexBox
            flexAuto="bottom"
            style={{
              height: '100%',
            }}
            top={
              <View
                style={{
                  height: transformSize(40),
                  paddingTop: transformSize(10),
                }}
              >
                <ColorText color="#fff" fontSize={30} text="用户昵称" />
              </View>
            }
            bottom={
              <ColorText
                color="#fff"
                fontSize={24}
                textPrefix="账号"
                separatorStyle={{
                  margin: '0 var(--tfc-6)',
                }}
                textStyle={{
                  marginLeft: transformSize(10),
                }}
                text="123456789"
              />
            }
          />
        }
      />
    ),
  },
};

const config3 = {
  fixed: true,
  backboardStyle: {
    width: '100%',
    height: '100%',
    backgroundImage: buildLinearGradient({
      direct: 45,
      list: ['#ff9700', '#ed1c24'],
    }),
  },
  backboardChildren: (
    <ImageBox
      src="https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF"
      aspectRatio={0.468}
      borderRadius={false}
    />
  ),
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '头部导航',
  navigationStyle: 'custom',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'HelpBox',
    name: '帮助提示',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        header: '简易头部',
        currentConfig: config1,
        inner: (
          <View
            style={{
              paddingLeft: transformSize(30),
              color: '#fff',
            }}
          >
            头部标题
          </View>
        ),
      },
    };
  }

  doWorkAdjustDidMount = () => {
    setTimeout(() => {
      const c = getMenuButtonBoundingClientRect();

      console.log(c);
    }, 1200);
  };

  establishControlList = () => {
    return [
      {
        header: '简易头部',
        config: config1,
        inner: (
          <View
            style={{
              paddingLeft: transformSize(30),
              color: '#fff',
            }}
          >
            头部标题
          </View>
        ),
      },
      {
        header: '额外底部',
        config: config2,
        inner: (
          <View
            style={{
              paddingLeft: transformSize(30),
              color: '#fff',
            }}
          >
            头部标题
          </View>
        ),
      },
      {
        header: 'Fixed模式',
        config: config3,
        inner: (
          <View
            style={{
              paddingLeft: transformSize(30),
              color: '#fff',
            }}
          >
            头部标题
          </View>
        ),
      },
    ];
  };

  // eslint-disable-next-line no-unused-vars
  buildSimpleItem = ({ key, config, inner }) => {
    return null;
  };

  buildHeadNavigation = () => {
    const { currentConfig, inner } = this.state;

    return <HeadNavigation {...currentConfig}>{inner}</HeadNavigation>;
  };

  renderContent = () => {
    const { header, description, currentConfig, inner } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="HeadNavigation"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['backboardChildren', 'bottom']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={HeadNavigation.defaultProps} labelWidth={240} />
      </Space>
    );
  };
}
