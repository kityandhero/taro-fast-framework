import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';

import { transformSize } from 'taro-fast-common';
import { CenterBox, Overlay, Space } from 'taro-fast-component';
import { Selector } from 'taro-fast-component-extra';

import {
  ContentPageBase,
  PropertyBox,
  SimpleBox,
} from '../../../customComponents';

const boxStyle = {
  width: transformSize(80),
  height: transformSize(80),
  backgroundColor: 'blue',
};

const colorList = [
  {
    label: '默认',
    value: '#000',
  },
  {
    label: '自定义',
    value: '#543202',
  },
];

const alphaList = [
  {
    label: '默认',
    value: '0.3',
  },
  {
    label: '自定义',
    value: '0.6',
  },
];

const durationList = [
  {
    label: '默认',
    value: '300',
  },
  {
    label: '自定义',
    value: '800',
  },
];

const zIndexList = [
  {
    label: '默认',
    value: '810',
  },
  {
    label: '自定义',
    value: '1200',
  },
];

const animalList = [
  {
    label: 'ease-in',
    value: 'ease-in',
  },
  {
    label: 'linear',
    value: 'linear',
  },
  {
    label: 'ease',
    value: 'ease',
  },
  {
    label: 'ease-out',
    value: 'ease-out',
  },
  {
    label: 'ease-in-out',
    value: 'ease-in-out',
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '遮罩',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Overlay',
    name: '遮罩容器',
    description: '遮罩容器组件',
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      show1: false,
      show2: false,
      show3: false,
      show4: false,
      color: ['#000'],
      alpha: ['0.5'],
      duration: ['300'],
      zIndex: ['810'],
      animal: ['ease-in'],
      header: '显示全局遮罩层',
      currentConfig: {
        visible: true,
        mode: 'fullScreen',
        color: '#000',
        alpha: '0.5',
        duration: '300',
        zIndex: '810',
        animal: 'ease-in',
      },
    };
  }

  establishControlList = () => {
    const { color, alpha, duration, zIndex, animal } = this.state;

    return [
      {
        span: 2,
        header: '显示全局遮罩层',
        config: {
          visible: true,
          mode: 'fullScreen',
          color: color[0],
          alpha: alpha[0],
          duration: duration[0],
          zIndex: zIndex[0],
          animal: animal[0],
        },
        callback: this.onClickShow1,
      },
      {
        span: 2,
        header: '显示嵌入内容的全局遮罩层',
        config: {
          visible: true,
          mode: 'fullScreen',
          color: color[0],
          alpha: alpha[0],
          duration: duration[0],
          zIndex: zIndex[0],
          animal: animal[0],
        },
        callback: this.onClickShow2,
        inner: <View style={boxStyle} />,
      },
      {
        span: 2,
        header: '显示容器遮罩层',
        config: {
          visible: true,
          mode: 'fullParent',
          color: color[0],
          alpha: alpha[0],
          duration: duration[0],
          zIndex: zIndex[0],
          animal: animal[0],
        },
        callback: this.onClickShow3,
      },
      {
        span: 2,
        header: '显示嵌入内容的容器遮罩层',
        config: {
          visible: true,
          mode: 'fullParent',
          color: color[0],
          alpha: alpha[0],
          duration: duration[0],
          zIndex: zIndex[0],
          animal: animal[0],
        },
        callback: this.onClickShow4,
        inner: <View style={boxStyle} />,
      },
    ];
  };

  // eslint-disable-next-line no-unused-vars
  buildSimpleItem = ({ key, config, inner }) => {
    return null;
  };

  setColor = (value) => {
    this.setState({
      color: value,
    });
  };

  setAlpha = (value) => {
    this.setState({
      alpha: value,
    });
  };

  setDuration = (value) => {
    this.setState({
      duration: value,
    });
  };

  setZIndex = (value) => {
    this.setState({
      zIndex: value,
    });
  };

  setAnimal = (value) => {
    this.setState({
      animal: value,
    });
  };

  onClickShow1 = () => {
    this.setState({
      show1: true,
    });
  };

  onClickHide1 = () => {
    this.setState({
      show1: false,
    });
  };

  onClickShow2 = () => {
    this.setState({
      show2: true,
    });
  };

  onClickHide2 = () => {
    this.setState({
      show2: false,
    });
  };

  onClickShow3 = () => {
    this.setState({
      show3: true,
    });
  };

  onClickHide3 = () => {
    this.setState({
      show3: false,
    });
  };

  onClickShow4 = () => {
    this.setState({
      show4: true,
    });
  };

  onClickHide4 = () => {
    this.setState({
      show4: false,
    });
  };

  renderContent = () => {
    const {
      header,
      description,
      currentConfig,
      inner,
      color,
      alpha,
      duration,
      zIndex,
      animal,
      show3,
      show4,
      show1,
      show2,
    } = this.state;

    return (
      <>
        <Space direction="vertical" fillWidth>
          <SimpleBox
            header={header}
            description={description}
            config={currentConfig}
            componentName="Overlay"
            mockChildren={!!inner}
            useInnerBox
            innerBoxCenterMode
            innerBoxPadding
            // ignorePropertyList={['icon', 'body', 'panel']}
            controlBox={this.buildControlBox(this.establishControlList())}
          >
            <View
              style={{
                width: '100%',
                height: transformSize(300),
                position: 'relative',
              }}
            >
              <CenterBox>父容器</CenterBox>

              <Overlay
                visible={show3}
                mode="fullParent"
                color={color[0]}
                alpha={alpha[0]}
                duration={duration[0]}
                zIndex={zIndex[0]}
                animal={animal[0]}
                onClick={this.onClickHide3}
              />

              <Overlay
                visible={show4}
                mode="fullParent"
                color={color[0]}
                alpha={alpha[0]}
                duration={duration[0]}
                zIndex={zIndex[0]}
                animal={animal[0]}
                onClick={this.onClickHide4}
              >
                <View style={boxStyle} />
              </Overlay>
            </View>
          </SimpleBox>

          <SimpleBox header="设置颜色" useInnerBox={false}>
            <Selector
              options={colorList}
              value={color}
              onChange={this.setColor}
            />
          </SimpleBox>

          <SimpleBox header="设置动画" useInnerBox={false}>
            <Selector
              options={animalList}
              value={animal}
              columns={2}
              onChange={this.setAnimal}
            />
          </SimpleBox>

          <SimpleBox header="设置透明度" useInnerBox={false}>
            <Selector
              options={alphaList}
              value={alpha}
              onChange={this.setAlpha}
            />
          </SimpleBox>

          <SimpleBox header="设置过渡时间" useInnerBox={false}>
            <Selector
              options={durationList}
              value={duration}
              onChange={this.setDuration}
            />
          </SimpleBox>

          <SimpleBox header="设置Z轴" useInnerBox={false}>
            <Selector
              options={zIndexList}
              value={zIndex}
              onChange={this.setZIndex}
            />
          </SimpleBox>

          <PropertyBox config={Overlay.defaultProps} labelWidth={240} />
        </Space>

        <Overlay
          visible={show1}
          mode="fullScreen"
          color={color[0]}
          alpha={alpha[0]}
          duration={duration[0]}
          zIndex={zIndex[0]}
          animal={animal[0]}
          onClick={this.onClickHide1}
        />

        <Overlay
          visible={show2}
          mode="fullScreen"
          color={color[0]}
          alpha={alpha[0]}
          duration={duration[0]}
          zIndex={zIndex[0]}
          animal={animal[0]}
          onClick={this.onClickHide2}
        >
          <View style={boxStyle} />
        </Overlay>
      </>
    );
  };
}
