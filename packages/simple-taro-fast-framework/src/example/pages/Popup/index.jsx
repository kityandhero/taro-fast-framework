import { connect } from 'react-redux';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  Popup,
  Space,
  CenterBox,
  TranslucentBox,
} from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import ContentPageBase from '../../../customComponents/ContentPageBase';
import SimpleBox from '../../../customComponents/SimpleBox';
import PropertyBox from '../../../customComponents/PropertyBox';

import './index.less';

const boxStyle = {
  height: transformSize(220),
  backgroundImage: 'var(--tfc-color-gradual-red)',
  borderRadius: transformSize(10),
};

const arcTopList = [
  {
    label: '上直角',
    value: '上直角',
  },
  {
    label: '上圆角',
    value: '上圆角',
  },
];

const arcBottomList = [
  {
    label: '下直角',
    value: '下直角',
  },
  {
    label: '下圆角',
    value: '下圆角',
  },
];

const modeList = [
  {
    label: '通栏',
    value: 'through',
  },
  {
    label: '卡片',
    value: 'card',
  },
];

const showCloseList = [
  {
    label: '显示',
    value: 'yes',
  },
  {
    label: '隐藏',
    value: 'no',
  },
];

const closeWhenOverlayClickList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];

const scrollList = [
  {
    label: '滚动',
    value: 'yes',
  },
  {
    label: '普通',
    value: 'no',
  },
];

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '弹出容器',
});

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
export default class Index extends ContentPageBase {
  headerData = {
    id: 'Popup',
    name: '弹出容器',
    description: '弹出容器组件',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        arcTop: ['上直角'],
        arcBottom: ['下直角'],
        mode: ['through'],
        showClose: ['no'],
        closeWhenOverlayClick: ['yes'],
        scroll: ['no'],
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
        header: '',
        currentConfig: {},
      },
    };
  }

  establishControlList = () => {
    const {
      arcTop,
      arcBottom,
      mode,
      showClose,
      closeWhenOverlayClick,
      scroll: scrollData,
    } = this.state;

    return [
      {
        header: '上部面板',
        config: {
          visible: true,
          header: '上部面板',
          position: 'top',
          mode: mode[0],
          showClose: showClose[0] === 'yes',
          scroll: scrollData[0] === 'yes',
          closeWhenOverlayClick: closeWhenOverlayClick[0] === 'yes',
          arcTop: arcTop[0] === '上圆角',
          arcBottom: arcBottom[0] === '下圆角',
          onClose: this.hideTop,
        },
        callback: this.showTop,
      },
      {
        header: '下部面板',
        config: {
          visible: true,
          header: '下部面板',
          position: 'bottom',
          mode: mode[0],
          showClose: showClose[0] === 'yes',
          scroll: scrollData[0] === 'yes',
          closeWhenOverlayClick: closeWhenOverlayClick[0] === 'yes',
          arcTop: arcTop[0] === '上圆角',
          arcBottom: arcBottom[0] === '下圆角',
          onClose: this.hideBottom,
        },
        callback: this.showBottom,
      },
      {
        header: '左侧面板',
        config: {
          visible: true,
          header: '左侧面板',
          position: 'left',
          mode: mode[0],
          showClose: showClose[0] === 'yes',
          scroll: scrollData[0] === 'yes',
          closeWhenOverlayClick: closeWhenOverlayClick[0] === 'yes',
          arcTop: arcTop[0] === '上圆角',
          arcBottom: arcBottom[0] === '下圆角',
          onClose: this.hideLeft,
        },
        callback: this.showLeft,
      },
      {
        header: '右侧面板',
        config: {
          visible: true,
          header: '右侧面板',
          position: 'right',
          mode: mode[0],
          showClose: showClose[0] === 'yes',
          scroll: scrollData[0] === 'yes',
          closeWhenOverlayClick: closeWhenOverlayClick[0] === 'yes',
          arcTop: arcTop[0] === '上圆角',
          arcBottom: arcBottom[0] === '下圆角',
          onClose: this.hideRight,
        },
        callback: this.showRight,
      },
      {
        header: '弹出面板',
        config: {
          visible: true,
          header: '弹出面板',
          position: 'center',
          mode: mode[0],
          showClose: showClose[0] === 'yes',
          scroll: scrollData[0] === 'yes',
          closeWhenOverlayClick: closeWhenOverlayClick[0] === 'yes',
          arcTop: arcTop[0] === '上圆角',
          arcBottom: arcBottom[0] === '下圆角',
          onClose: this.hideBasic,
        },
        callback: this.showBasic,
      },
    ];
  };

  // eslint-disable-next-line no-unused-vars
  buildSimpleItem = ({ key, config, inner }) => {
    return null;
  };

  setArcTop = (value) => {
    this.setState({
      arcTop: value,
    });
  };

  setArcBottom = (value) => {
    this.setState({
      arcBottom: value,
    });
  };

  setMode = (value) => {
    this.setState({
      mode: value,
    });
  };

  setShowClose = (value) => {
    this.setState({
      showClose: value,
    });
  };

  setCloseWhenOverlayClick = (value) => {
    this.setState({
      closeWhenOverlayClick: value,
    });
  };

  setScroll = (value) => {
    this.setState({
      scroll: value,
    });
  };

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

  renderContent = () => {
    const {
      header,
      description,
      currentConfig,
      inner,
      show,
      arcTop,
      arcBottom,
      mode,
      showClose,
      closeWhenOverlayClick,
      scroll: scrollData,
    } = this.state;

    const innerTranslucentBox = (
      <View
        style={boxStyle}
        onClick={() => {
          console.log('click');
        }}
      >
        <CenterBox>
          <TranslucentBox
            style={{
              width: transformSize(200),
            }}
            backgroundColor="#000"
            alpha={0.1}
          >
            <CenterBox
              style={{
                padding: `${transformSize(10)} ${transformSize(20)}`,
                color: '#fff',
              }}
            >
              内容
            </CenterBox>
          </TranslucentBox>
        </CenterBox>
      </View>
    );

    return (
      <>
        <Space direction="vertical" fillWidth>
          <SimpleBox
            header={header}
            description={description}
            config={currentConfig}
            componentName="Popup"
            mockChildren={!!inner}
            useInnerBox={false}
            innerBoxCenterMode
            innerBoxPadding
            ignorePropertyList={['onClose']}
            controlBox={this.buildControlBox(this.establishControlList())}
          >
            {this.buildSimpleList()}
          </SimpleBox>

          <SimpleBox header="变更上圆角" useInnerBox={false}>
            <Selector
              options={arcTopList}
              value={arcTop}
              onChange={this.setArcTop}
            />
          </SimpleBox>

          <SimpleBox header="变更下圆角" useInnerBox={false}>
            <Selector
              options={arcBottomList}
              value={arcBottom}
              onChange={this.setArcBottom}
            />
          </SimpleBox>

          <SimpleBox header="变更模式" useInnerBox={false}>
            <Selector options={modeList} value={mode} onChange={this.setMode} />
          </SimpleBox>

          <SimpleBox header="关闭按钮" useInnerBox={false}>
            <Selector
              options={showCloseList}
              value={showClose}
              onChange={this.setShowClose}
            />
          </SimpleBox>

          <SimpleBox header="点击遮罩关闭面板" useInnerBox={false}>
            <Selector
              options={closeWhenOverlayClickList}
              value={closeWhenOverlayClick}
              onChange={this.setCloseWhenOverlayClick}
            />
          </SimpleBox>

          <SimpleBox header="显示区域容器" useInnerBox={false}>
            <Selector
              options={scrollList}
              value={scrollData}
              onChange={this.setScroll}
            />
          </SimpleBox>
        </Space>

        <PropertyBox config={Popup.defaultProps} labelWidth={310} />

        <Popup
          visible={show.basic}
          header="中部面板"
          position="center"
          mode={mode[0]}
          showClose={showClose[0] === 'yes'}
          scroll={scrollData[0] === 'yes'}
          closeWhenOverlayClick={closeWhenOverlayClick[0] === 'yes'}
          arcTop={arcTop[0] === '上圆角'}
          arcBottom={arcBottom[0] === '下圆角'}
          onClose={this.hideBasic}
        >
          {innerTranslucentBox}
        </Popup>

        <Popup
          visible={show.left}
          header="面板"
          position="left"
          mode={mode[0]}
          showClose={showClose[0] === 'yes'}
          scroll={scrollData[0] === 'yes'}
          closeWhenOverlayClick={closeWhenOverlayClick[0] === 'yes'}
          arcTop={arcTop[0] === '上圆角'}
          arcBottom={arcBottom[0] === '下圆角'}
          onClose={this.hideLeft}
        >
          {innerTranslucentBox}
        </Popup>

        <Popup
          visible={show.right}
          header="面板"
          position="right"
          mode={mode[0]}
          showClose={showClose[0] === 'yes'}
          scroll={scrollData[0] === 'yes'}
          closeWhenOverlayClick={closeWhenOverlayClick[0] === 'yes'}
          arcTop={arcTop[0] === '上圆角'}
          arcBottom={arcBottom[0] === '下圆角'}
          onClose={this.hideRight}
        >
          {innerTranslucentBox}
        </Popup>

        <Popup
          visible={show.top}
          header="面板"
          position="top"
          mode={mode[0]}
          showClose={showClose[0] === 'yes'}
          scroll={scrollData[0] === 'yes'}
          closeWhenOverlayClick={closeWhenOverlayClick[0] === 'yes'}
          arcTop={arcTop[0] === '上圆角'}
          arcBottom={arcBottom[0] === '下圆角'}
          onClose={this.hideTop}
        >
          {innerTranslucentBox}
        </Popup>

        <Popup
          visible={show.bottom}
          header="面板"
          position="bottom"
          mode={mode[0]}
          showClose={showClose[0] === 'yes'}
          scroll={scrollData[0] === 'yes'}
          closeWhenOverlayClick={closeWhenOverlayClick[0] === 'yes'}
          arcTop={arcTop[0] === '上圆角'}
          arcBottom={arcBottom[0] === '下圆角'}
          onClose={this.hideBottom}
        >
          {innerTranslucentBox}
        </Popup>
      </>
    );
  };
}
