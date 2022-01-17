import { View } from '@tarojs/components';

import { Card, Item, Popup } from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

import './index.less';

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show: {
          basic: false,
          top: false,
          bottom: false,
          left: false,
          right: false,
          round: false,
          closeIcon: false,
          customCloseIcon: false,
          customIconPosition: false,
        },
      },
    };
  }

  toggle = (type, show) => {
    this.setState({
      show: {
        ...this.state.show,
        [type]: show,
      },
    });
  };

  showBasic = () => {
    this.toggle('basic', true);
  };

  hideBasic = () => {
    this.toggle('basic', false);
  };

  showTop = () => {
    this.toggle('top', true);
  };

  hideTop = () => {
    this.toggle('top', false);
  };

  showLeft = () => {
    this.toggle('left', true);
  };

  hideLeft = () => {
    this.toggle('left', false);
  };

  showRight = () => {
    this.toggle('right', true);
  };

  hideRight = () => {
    this.toggle('right', false);
  };

  showBottom = () => {
    this.toggle('bottom', true);
  };

  hideBottom = () => {
    this.toggle('bottom', false);
  };

  showRound = () => {
    this.toggle('round', true);
  };

  hideRound = () => {
    this.toggle('round', false);
  };

  showCloseIcon = () => {
    this.toggle('closeIcon', true);
  };

  hideCloseIcon = () => {
    this.toggle('closeIcon', false);
  };

  showCustomCloseIcon = () => {
    this.toggle('customCloseIcon', true);
  };

  hideCustomCloseIcon = () => {
    this.toggle('customCloseIcon', false);
  };

  showCustomIconPosition = () => {
    this.toggle('customIconPosition', true);
  };

  hideCustomIconPosition = () => {
    this.toggle('customIconPosition', false);
  };

  renderFurther() {
    const { show } = this.state;

    return (
      <View className="index">
        <Card header="展示弹出层" style={style} headerStyle={cardHeaderStyle}>
          <Item arrow onClick={this.showBasic}>
            展示弹出层
          </Item>
        </Card>
        <Card header="弹出位置" style={style} headerStyle={cardHeaderStyle}>
          <Item arrow onClick={this.showTop}>
            顶部弹出
          </Item>
          <Item arrow onClick={this.showBottom} headerStyle={cardHeaderStyle}>
            底部弹出
          </Item>
          <Item arrow onClick={this.showLeft} headerStyle={cardHeaderStyle}>
            左侧弹出
          </Item>
          <Item arrow onClick={this.showRight} headerStyle={cardHeaderStyle}>
            右侧弹出
          </Item>
        </Card>
        <Card header="关闭图标" style={style} headerStyle={cardHeaderStyle}>
          <Item arrow onClick={this.showCloseIcon}>
            关闭图标
          </Item>
          <Item arrow onClick={this.showCustomCloseIcon}>
            自定义图标
          </Item>
          <Item arrow onClick={this.showCustomIconPosition}>
            图标位置
          </Item>
        </Card>
        <Card header="圆角弹窗" style={style} headerStyle={cardHeaderStyle}>
          <Item arrow onClick={this.showRound}>
            圆角弹窗
          </Item>
        </Card>

        <Popup
          show={show.basic}
          style={{ padding: '30px 50px' }}
          onClose={this.hideBasic}
        >
          内容
        </Popup>
        <Popup
          show={show.top}
          position="top"
          style={{ height: '20%' }}
          onClose={this.hideTop}
        ></Popup>
        <Popup
          show={show.bottom}
          position="bottom"
          style={{ height: '20%' }}
          onClose={this.hideBottom}
        ></Popup>
        <Popup
          show={show.left}
          position="left"
          style={{ width: '20%', height: '100%' }}
          onClose={this.hideLeft}
        ></Popup>
        <Popup
          show={show.right}
          position="right"
          style={{ width: '20%', height: '100%' }}
          onClose={this.hideRight}
        ></Popup>
        <Popup
          show={show.closeIcon}
          closeable
          position="bottom"
          style={{ height: '20%' }}
          onClose={this.hideCloseIcon}
        ></Popup>
        <Popup
          show={show.customCloseIcon}
          closeable
          closeIcon="close"
          position="bottom"
          style={{ height: '20%' }}
          onClose={this.hideCustomCloseIcon}
        ></Popup>
        <Popup
          show={show.customIconPosition}
          closeable
          closeIconPosition="top-left"
          position="bottom"
          style={{ height: '20%' }}
          onClose={this.hideCustomIconPosition}
        ></Popup>
        <Popup
          show={show.round}
          round
          position="bottom"
          style={{ height: '20%' }}
          onClose={this.hideRound}
        ></Popup>
      </View>
    );
  }
}
