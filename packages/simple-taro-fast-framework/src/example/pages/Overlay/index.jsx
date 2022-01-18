import { View } from '@tarojs/components';

import {
  Card,
  Item,
  Overlay,
  CenterBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const style = { backgroundColor: '#f5f7fa' };

const boxStyle = {
  width: '80rpx',
  height: '80rpx',
  backgroundColor: 'blue',
};

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
      },
    };
  }

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
    return (
      <View className="index">
        <Card
          header="展示容器"
          style={style}
          headerStyle={cardHeaderStyle}
          // space={false}
        >
          <View style={{ height: '300rpx', position: 'relative' }}>
            <CenterBox>父容器</CenterBox>

            <Overlay
              visible={this.state.show3}
              mode="fullParent"
              onClick={this.onClickHide3}
            />

            <Overlay
              visible={this.state.show4}
              mode="fullParent"
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

        <Overlay
          visible={this.state.show1}
          mode="fullScreen"
          onClick={this.onClickHide1}
        />

        <Overlay
          visible={this.state.show2}
          mode="fullScreen"
          onClick={this.onClickHide2}
        >
          <View style={boxStyle} />
        </Overlay>
      </View>
    );
  }
}
