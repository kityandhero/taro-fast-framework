import { View } from '@tarojs/components';

import {
  BlockArea,
  Button,
  Transition,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

import './index.less';

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
        <BlockArea title="基础用法" padding>
          <Button onClick={this.onClickFade}>Fade</Button>
          <Button onClick={this.onClickFadeUp}>Fade Up</Button>
          <Button onClick={this.onClickFadeDown}>Fade Down</Button>
          <Button onClick={this.onClickFadeLeft}>Fade Left</Button>
          <Button onClick={this.onClickFadeRight}>Fade Right</Button>
          <Button onClick={this.onClickSlideUp}>Slide Up</Button>
          <Button onClick={this.onClickSlideDown}>Slide Down</Button>
          <Button onClick={this.onClickSlideLeft}>Slide Left</Button>
          <Button onClick={this.onClickSlideRight}>Slide Right</Button>
          <Button onClick={this.onClickCustom}>Custom</Button>
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
        </BlockArea>
      </View>
    );
  }
}
