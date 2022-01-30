import { View } from '@tarojs/components';

import { Card, Item, Popup } from 'taro-fast-component/es/customComponents';
import { Selector } from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

import './index.less';

const style = { backgroundColor: '#f5f7fa' };

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

export default class Index extends PageWrapper {
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
      },
    };
  }

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

  renderFurther() {
    const {
      show,
      arcTop,
      arcBottom,
      mode,
      showClose,
      closeWhenOverlayClick,
      scroll: scrollData,
    } = this.state;

    console.log(show);

    return (
      <View className="index">
        <Card
          header="弹出位置"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <Item label="中部弹出" arrow onClick={this.showBasic} />
          <Item label="顶部弹出" arrow onClick={this.showTop} />
          <Item
            label="底部弹出"
            arrow
            onClick={this.showBottom}
            headerStyle={cardHeaderStyle}
            space={false}
          />
          <Item
            label="左侧弹出"
            arrow
            onClick={this.showLeft}
            headerStyle={cardHeaderStyle}
            space={false}
          />
          <Item
            label="右侧弹出"
            arrow
            onClick={this.showRight}
            headerStyle={cardHeaderStyle}
            space={false}
          />
        </Card>

        <Card header="变更上圆角" headerStyle={cardHeaderStyle}>
          <Selector
            options={arcTopList}
            value={arcTop}
            onChange={this.setArcTop}
          />
        </Card>

        <Card header="变更下圆角" headerStyle={cardHeaderStyle}>
          <Selector
            options={arcBottomList}
            value={arcBottom}
            onChange={this.setArcBottom}
          />
        </Card>

        <Card header="变更模式" headerStyle={cardHeaderStyle}>
          <Selector options={modeList} value={mode} onChange={this.setMode} />
        </Card>

        <Card header="关闭按钮" headerStyle={cardHeaderStyle}>
          <Selector
            options={showCloseList}
            value={showClose}
            onChange={this.setShowClose}
          />
        </Card>

        <Card header="点击遮罩关闭面板" headerStyle={cardHeaderStyle}>
          <Selector
            options={closeWhenOverlayClickList}
            value={closeWhenOverlayClick}
            onChange={this.setCloseWhenOverlayClick}
          />
        </Card>

        <Card header="显示区域容器" headerStyle={cardHeaderStyle}>
          <Selector
            options={scrollList}
            value={scrollData}
            onChange={this.setScroll}
          />
        </Card>

        <Popup
          visible={show.basic}
          header="面板"
          position="center"
          mode={mode[0]}
          showClose={showClose[0] === 'yes'}
          scroll={scrollData[0] === 'yes'}
          closeWhenOverlayClick={closeWhenOverlayClick[0] === 'yes'}
          arcTop={arcTop[0] === '上圆角'}
          arcBottom={arcBottom[0] === '下圆角'}
          onClose={this.hideBasic}
        >
          内容
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
          内容
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
          内容
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
          内容
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
          内容
        </Popup>
      </View>
    );
  }
}
