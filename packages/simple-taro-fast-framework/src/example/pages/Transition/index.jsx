import { View } from '@tarojs/components';

import {
  Card,
  Item,
  Transition,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '../../../customComponents/PageWrapper';

import './index.less';

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
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

  renderFurther() {
    const { show, name, showCustom } = this.state;

    return (
      <View className="index">
        <Card header="Transition 动画" style={style}>
          <Item arrow onClick={this.onClickFade}>
            Fade
          </Item>
          <Item arrow onClick={this.onClickFadeUp}>
            Fade Up
          </Item>
          <Item arrow onClick={this.onClickFadeDown}>
            Fade Down
          </Item>
          <Item arrow onClick={this.onClickFadeLeft}>
            Fade Left
          </Item>
          <Item arrow onClick={this.onClickFadeRight}>
            Fade Right
          </Item>
          <Item arrow onClick={this.onClickSlideUp}>
            Slide Up
          </Item>
          <Item arrow onClick={this.onClickSlideDown}>
            Slide Down
          </Item>
          <Item arrow onClick={this.onClickSlideLeft}>
            Slide Left
          </Item>
          <Item arrow onClick={this.onClickSlideRight}>
            Slide Right
          </Item>
          <Item arrow onClick={this.onClickZoom}>
            Zoom
          </Item>
          <Item arrow onClick={this.onClickPunch}>
            Punch
          </Item>
          <Item arrow onClick={this.onClickCustom}>
            Custom
          </Item>
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
      </View>
    );
  }
}
