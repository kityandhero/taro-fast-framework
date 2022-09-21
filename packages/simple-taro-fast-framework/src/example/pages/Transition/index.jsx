import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { Space, Transition } from 'taro-fast-component/es/customComponents';
import { connect } from 'taro-fast-framework/es/utils/dva';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import PropertyBox from '../../../customComponents/PropertyBox';
import SimpleBox from '../../../customComponents/SimpleBox';

import './index.less';

const configCore = {
  show: true,
  className: 'block',
};

const config1 = {
  ...configCore,
  name: 'fade',
};

const config2 = {
  ...configCore,
  name: 'fade-up',
};

const config3 = {
  ...configCore,
  name: 'fade-down',
};

const config4 = {
  ...configCore,
  name: 'fade-left',
};

const config5 = {
  ...configCore,
  name: 'fade-right',
};

const config6 = {
  ...configCore,
  name: 'slide-up',
};

const config7 = {
  ...configCore,
  name: 'slide-down',
};

const config8 = {
  ...configCore,
  name: 'slide-left',
};

const config9 = {
  ...configCore,
  name: 'slide-right',
};

const config10 = {
  ...configCore,
  name: 'zoom',
};

const config11 = {
  ...configCore,
  name: 'punch',
};

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '变换动画',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
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
        header: 'fade',
        currentConfig: config1,
        inner: '内部内容',
      },
    };
  }

  establishControlList = () => {
    return [
      {
        header: 'Fade',
        config: config1,
        callback: this.onItemClick,
      },
      {
        header: 'Fade Up',
        config: config2,
        callback: this.onItemClick,
      },
      {
        header: 'Fade Down',
        config: config3,
        callback: this.onItemClick,
      },
      {
        header: 'Fade Left',
        config: config4,
        callback: this.onItemClick,
      },
      {
        header: 'Fade Right',
        config: config5,
        callback: this.onItemClick,
      },
      {
        header: 'Slide Up',
        config: config6,
        callback: this.onItemClick,
      },
      {
        header: 'Slide Down',
        config: config7,
        callback: this.onItemClick,
      },
      {
        header: 'Slide Left',
        config: config8,
        callback: this.onItemClick,
      },
      {
        header: 'Slide Right',
        config: config9,
        callback: this.onItemClick,
      },
      {
        header: 'Zoom',
        config: config10,
        callback: this.onItemClick,
      },
      {
        header: 'Punch',
        config: config11,
        callback: this.onItemClick,
      },
      {
        header: 'Custom',
        config: {
          show: true,
          name: '',
          duration: {
            enter: 300,
            leave: 1000,
          },
          className: 'block',
          enterClass: 'tfc-enter-class',
          enterActiveClass: 'tfc-enter-active-class',
          leaveActiveClass: 'tfc-leave-active-class',
          leaveToClass: 'tfc-leave-to-class',
          onBeforeEnter: this.onBeforeEnter,
          onEnter: this.onEnter,
          onAfterEnter: this.onAfterEnter,
          onBeforeLeave: this.onBeforeLeave,
          onLeave: this.onLeave,
          onAfterLeave: this.onAfterLeave,
        },
        callback: this.onClickCustom,
      },
    ];
  };

  // eslint-disable-next-line no-unused-vars
  buildSimpleItem = ({ key, config, inner }) => {
    return null;
  };

  onItemClick = (o) => {
    const {
      config: { name },
    } = {
      ...{
        config: {},
      },
      ...o,
    };

    if (!stringIsNullOrWhiteSpace(name)) {
      this.trigger(name);
    }
  };

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
    const {
      header,
      description,
      currentConfig,
      inner,
      showTransition,
      name,
      showTransitionCustom,
    } = this.state;

    return (
      <Space direction="vertical" fillWidth>
        <SimpleBox
          header={header}
          description={description}
          config={currentConfig}
          componentName="Transition"
          mockChildren={!!inner}
          useInnerBox={false}
          innerBoxCenterMode
          innerBoxPadding
          ignorePropertyList={['onClick']}
          controlBox={this.buildControlBox(this.establishControlList())}
        >
          {this.buildSimpleList()}
        </SimpleBox>

        <PropertyBox config={Transition.defaultProps} labelWidth={240} />

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
