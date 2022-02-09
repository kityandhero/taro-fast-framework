import { View } from '@tarojs/components';

import {
  Card,
  Item,
  Transition,
  Space,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle, cardStyle } from '../../../customConfig/constants';
import ContentPageBase from '../../../customComponents/ContentPageBase';

import './index.less';

const style = {
  ...{
    backgroundColor: '#f5f7fa',
  },
  ...cardStyle,
};

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Transition',
    name: '变换动画',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show: false,
        name: 'fade',
        showCustom: false,
      },
    };
  }

  onClickFade = () => {
    this.trigger('fade');
  };

  onClickFadeUp = () => {
    this.trigger('fade-up');
  };

  onClickFadeDown = () => {
    this.trigger('fade-down');
  };

  onClickFadeLeft = () => {
    this.trigger('fade-left');
  };

  onClickFadeRight = () => {
    this.trigger('fade-right');
  };

  onClickSlideUp = () => {
    this.trigger('slide-up');
  };

  onClickSlideDown = () => {
    this.trigger('slide-down');
  };

  onClickSlideLeft = () => {
    this.trigger('slide-left');
  };

  onClickSlideRight = () => {
    this.trigger('slide-right');
  };

  onClickZoom = () => {
    this.trigger('zoom');
  };

  onClickPunch = () => {
    this.trigger('punch');
  };

  trigger = (name) => {
    this.setState({ name, show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 500);
  };

  onClickCustom = () => {
    this.setState({ showCustom: true });

    setTimeout(() => {
      this.setState({ showCustom: false });
    }, 1000);
  };

  onBeforeEnter = () => {
    console.log('before enter');
  };

  onEnter = () => {
    console.log('enter');
  };

  onAfterEnter = () => {
    console.log('after enter');
  };

  onBeforeLeave = () => {
    console.log('before leave');
  };

  onLeave = () => {
    console.log('leave');
  };

  onAfterLeave = () => {
    console.log('after leave');
  };

  renderContent = () => {
    const { show, name, showCustom } = this.state;

    return (
      <View className="index">
        <Space direction="vertical" fillWidth>
          <Card
            header="变换动画类型"
            style={style}
            headerStyle={cardHeaderStyle}
            space={false}
          >
            <Item label="Fade" arrow onClick={this.onClickFade} />
            <Item label="Fade Up" arrow onClick={this.onClickFadeUp} />
            <Item label="Fade Down" arrow onClick={this.onClickFadeDown} />
            <Item label="Fade Left" arrow onClick={this.onClickFadeLeft} />
            <Item label="Fade Right" arrow onClick={this.onClickFadeRight} />
            <Item label="Slide Up" arrow onClick={this.onClickSlideUp} />
            <Item label="Slide Down" arrow onClick={this.onClickSlideDown} />
            <Item label="Slide Left" arrow onClick={this.onClickSlideLeft} />
            <Item label="Slide Right" arrow onClick={this.onClickSlideRight} />
            <Item label="Zoom" arrow onClick={this.onClickZoom} />
            <Item label="Punch" arrow onClick={this.onClickPunch} />
            <Item
              label="Custom"
              arrow
              border={false}
              onClick={this.onClickCustom}
            />
          </Card>

          <Transition show={show} name={name} className="block"></Transition>
          <Transition
            show={showCustom}
            name=""
            duration={{
              enter: 300,
              leave: 1000,
            }}
            className="block"
            enterClass="tfc-enter-class"
            enterActiveClass="tfc-enter-active-class"
            leaveActiveClass="tfc-leave-active-class"
            leaveToClass="tfc-leave-to-class"
            onBeforeEnter={this.onBeforeEnter}
            onEnter={this.onEnter}
            onAfterEnter={this.onAfterEnter}
            onBeforeLeave={this.onBeforeLeave}
            onLeave={this.onLeave}
            onAfterLeave={this.onAfterLeave}
          ></Transition>
        </Space>
      </View>
    );
  };
}
