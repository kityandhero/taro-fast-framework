import {
  Item,
  Transition,
  Space,
} from 'taro-fast-component/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';
import CodeBox from '../../../customComponents/CodeBox';

import './index.less';

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '变换动画',
});

export default class Index extends ContentPageBase {
  headerData = {
    id: 'Transition',
    name: '变换动画',
    description: '变换动画容器',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showTransition: false,
        name: 'fade',
        showTransitionCustom: false,
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
    this.setState({ name, showTransition: true });

    setTimeout(() => {
      this.setState({ showTransition: false });
    }, 500);
  };

  onClickCustom = () => {
    this.setState({ showTransitionCustom: true });

    setTimeout(() => {
      this.setState({ showTransitionCustom: false });
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
    const { showTransition, name, showTransitionCustom } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox header="变换动画类型">
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
        </SimpleBox>

        <CodeBox
          config={{
            show: true,
            name,
            className: 'block',
          }}
          componentName="Transition"
          mockChildren
          useInnerBox={false}
        />

        <PropertyBox config={Transition.defaultProps} labelWidth={230} />

        <Transition
          show={showTransition}
          name={name}
          className="block"
        ></Transition>

        <Transition
          show={showTransitionCustom}
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
    );
  };
}
