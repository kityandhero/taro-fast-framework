import { View } from '@tarojs/components';

import {
  Card,
  Item,
  Overlay,
  CenterBox,
} from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = { backgroundColor: '#f5f7fa' };

const boxStyle = {
  width: 'var(--tfc-px-80)',
  height: 'var(--tfc-px-80)',
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

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        color: ['#000'],
        alpha: ['0.3'],
        duration: ['300'],
        zIndex: ['810'],
        animal: ['ease-in'],
      },
    };
  }

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

  renderFurther() {
    const { color, alpha, duration, zIndex, animal } = this.state;

    return (
      <View className="index">
        <Card header="展示容器" style={style} headerStyle={cardHeaderStyle}>
          <View style={{ height: '300rpx', position: 'relative' }}>
            <CenterBox>父容器</CenterBox>

            <Overlay
              visible={this.state.show3}
              mode="fullParent"
              color={color[0]}
              alpha={alpha[0]}
              duration={duration[0]}
              zIndex={zIndex[0]}
              animal={animal[0]}
              onClick={this.onClickHide3}
            />

            <Overlay
              visible={this.state.show4}
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
        </Card>

        <Card
          header="遮罩层操控"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item arrow onClick={this.onClickShow1}>
            显示全局遮罩层
          </Item>
          <Item arrow onClick={this.onClickShow2}>
            显示嵌入内容的全局遮罩层
          </Item>

          <Item arrow onClick={this.onClickShow3}>
            显示容器遮罩层
          </Item>
          <Item arrow onClick={this.onClickShow4}>
            显示嵌入内容的容器遮罩层
          </Item>
        </Card>

        <Card header="设置颜色" headerStyle={cardHeaderStyle}>
          <Selector
            options={colorList}
            value={color}
            onChange={this.setColor}
          />
        </Card>

        <Card header="设置颜色" headerStyle={cardHeaderStyle}>
          <Selector
            options={animalList}
            value={animal}
            onChange={this.setAnimal}
          />
        </Card>

        <Card header="设置透明度" headerStyle={cardHeaderStyle}>
          <Selector
            options={alphaList}
            value={alpha}
            onChange={this.setAlpha}
          />
        </Card>

        <Card header="设置过渡时间" headerStyle={cardHeaderStyle}>
          <Selector
            options={durationList}
            value={duration}
            onChange={this.setDuration}
          />
        </Card>

        <Card header="设置Z轴" headerStyle={cardHeaderStyle}>
          <Selector
            options={zIndexList}
            value={zIndex}
            onChange={this.setZIndex}
          />
        </Card>

        <Overlay
          visible={this.state.show1}
          mode="fullScreen"
          color={color[0]}
          alpha={alpha[0]}
          duration={duration[0]}
          zIndex={zIndex[0]}
          animal={animal[0]}
          onClick={this.onClickHide1}
        />

        <Overlay
          visible={this.state.show2}
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
      </View>
    );
  }
}
