import { Fragment } from 'react';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import {
  CenterBox,
  Card,
  Item,
  Space,
  ImageBox,
  Icon,
} from 'taro-fast-component/es/customComponents';

import {
  pathCollection,
  cardHeaderStyle,
} from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

import iconAction from '../../../assets/images/icon-list-action.png';
import iconBasic from '../../../assets/images/icon-list-basic.png';
import iconForm from '../../../assets/images/icon-list-form.png';
import iconHOC from '../../../assets/images/icon-list-hoc.png';
import iconLayout from '../../../assets/images/icon-list-layout.png';
// import iconNavigation from '../../../assets/images/icon-list-navigation.png';
import iconView from '../../../assets/images/icon-list-view.png';
import logoImg from '../../../assets/images/logo.png';

import './index.less';

const { IconChevronRight } = Icon;

const listData = [
  {
    id: 'Basic',
    title: '基础',
    content: '包含颜色、文本、图标等',
    icon: iconBasic,
    path: pathCollection.basic.path,
  },
  {
    id: 'Element',
    title: '元件',
    content: '包含通告栏、标签、徽标等',
    icon: iconView,
    path: pathCollection.element.path,
  },
  {
    id: 'Form',
    title: '表单',
    content: '包含输入框、单选框、复选框等',
    icon: iconForm,
    path: pathCollection.form.path,
  },
  {
    id: 'Layout',
    title: '布局',
    content: '包含列表、浮层、卡片等',
    icon: iconLayout,
    path: pathCollection.layout.path,
  },
  {
    id: 'Action',
    title: '操作反馈',
    content: '包含对话框、进度条、动作面板等',
    icon: iconAction,
    path: pathCollection.action.path,
  },
  // {
  //   id: 'Navigation',
  //   title: '导航',
  //   content: '包含标签栏、导航栏、分段器等',
  //   icon: iconNavigation,
  //   path: pathCollection.navigation.path,
  // },
  {
    id: 'Extra',
    title: '扩展组件',
    content: '包含日历等',
    icon: iconHOC,
    path: pathCollection.extraComponent.path,
  },
  {
    id: 'Interact',
    title: '交互操作',
    content: '包含按钮操作等',
    icon: iconHOC,
    path: pathCollection.interact.path,
  },
];

export default class Index extends PageWrapper {
  buildList = (list) => {
    const listCount = list.length;

    return list.map((o, index) => {
      return (
        <Fragment key={`${index}`}>
          {this.buildItem({
            ...o,
            ...(index === listCount - 1 ? { border: false } : {}),
          })}
        </Fragment>
      );
    });
  };

  buildItem = ({ name, border = true, path }) => {
    return (
      <Item
        label={name}
        arrow
        clickable
        border={border}
        onClick={() => {
          this.navigateTo({
            url: path,
          });
        }}
      />
    );
  };

  onShareAppMessage() {
    const o = {
      ...{
        path: pathCollection.main.path,
      },
    };

    return o;
  }

  renderFurther() {
    // let r = '';

    // for (let i = 1000; i <= 2000; i = i + 10) {
    //   r += `--tfc-${i}: ${i}px;`;
    // }

    // console.log(r);

    return (
      <View className="page page-index">
        <CenterBox>
          <View className="logo">
            <ImageBox src={logoImg} />
          </View>
        </CenterBox>
        <View className="page-title">Taro-Fast-Framework</View>
        <View className="module-list">
          {listData.map((item, index) => (
            <View
              className="module-list__item"
              key={index}
              onClick={() => {
                this.navigateTo({
                  url: item.path,
                });
              }}
            >
              <View className="module-list__icon">
                <View className="img">
                  <ImageBox src={item.icon} />
                </View>
              </View>
              <View className="module-list__info">
                <View className="title">{item.title}</View>
                <View className="content">{item.content}</View>
              </View>
              <View className="module-list__arrow">
                <IconChevronRight size={36} />
              </View>
            </View>
          ))}
        </View>
      </View>
    );

    return (
      <Space direction="vertical" fillWidth>
        <View style={{ margin: `${transformSize(20)} 0` }}>
          <CenterBox> Welcome To Taro-Fast-Framework! </CenterBox>
        </View>

        <Card header="基础方法" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Utils',
              path: pathCollection.utils.path,
            },
          ])}
        </Card>

        <Card header="内置色彩" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Color',
              path: pathCollection.color.path,
            },
          ])}
        </Card>

        <Card header="基础组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'ImageBox',
              path: pathCollection.imageBox.path,
            },
            {
              name: 'Button',
              path: pathCollection.button.path,
            },
            {
              name: 'InputItem',
              path: pathCollection.inputItem.path,
            },
            {
              name: 'Switch',
              path: pathCollection.switch.path,
            },
            {
              name: 'SwitchItem',
              path: pathCollection.switchItem.path,
            },
            {
              name: 'Radio',
              path: pathCollection.radio.path,
            },
            {
              name: 'RadioSelector',
              path: pathCollection.radioSelector.path,
            },
            {
              name: 'CheckBox',
              path: pathCollection.checkBox.path,
            },
            {
              name: 'CheckBoxSelector',
              path: pathCollection.checkBoxSelector.path,
            },
            {
              name: 'progress',
              path: pathCollection.progress.path,
            },
            {
              name: 'ProgressBox',
              path: pathCollection.progressBox.path,
            },
            {
              name: 'ProgressItem',
              path: pathCollection.progressItem.path,
            },
            {
              name: 'Stepper',
              path: pathCollection.stepper.path,
            },
            {
              name: 'StepperItem',
              path: pathCollection.stepperItem.path,
            },
            {
              name: 'TextAreaItem',
              path: pathCollection.textAreaItem.path,
            },
          ])}
        </Card>

        <Card header="布局组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Line',
              path: pathCollection.line.path,
            },
            {
              name: 'Space',
              path: pathCollection.space.path,
            },
            {
              name: 'Divider',
              path: pathCollection.divider.path,
            },
            {
              name: 'Layout',
              path: pathCollection.layout.path,
            },
            {
              name: 'HorizontalCenterBox',
              path: pathCollection.horizontalCenterBox.path,
            },
            {
              name: 'VerticalBox',
              path: pathCollection.verticalBox.path,
            },
            {
              name: 'CenterBox',
              path: pathCollection.centerBox.path,
            },
            {
              name: 'FlexBox',
              path: pathCollection.flexBox.path,
            },
            {
              name: 'Grid',
              path: pathCollection.grid.path,
            },
            {
              name: 'Card',
              path: pathCollection.card.path,
            },
            {
              name: 'Item',
              path: pathCollection.item.path,
            },
            {
              name: 'Popup',
              path: pathCollection.popup.path,
            },
            {
              name: 'Tabs',
              path: pathCollection.tabs.path,
            },
            {
              name: 'Overlay',
              path: pathCollection.overlay.path,
            },
            {
              name: 'Collapse',
              path: pathCollection.collapse.path,
            },
          ])}
        </Card>

        <Card header="操作反馈" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'ActionSheet',
              path: pathCollection.actionSheet.path,
            },
            {
              name: 'FloatAction',
              path: pathCollection.floatAction.path,
            },
            {
              name: 'Modal',
              path: pathCollection.modal.path,
            },
          ])}
        </Card>

        <Card header="功能组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Ellipsis',
              path: pathCollection.ellipsis.path,
            },
            {
              name: 'Loading',
              path: pathCollection.loading.path,
            },
            {
              name: 'ColorText',
              path: pathCollection.colorText.path,
            },
            {
              name: 'Price',
              path: pathCollection.price.path,
            },
            {
              name: 'Tag',
              path: pathCollection.tag.path,
            },
            {
              name: 'Countdown',
              path: pathCollection.countdown.path,
            },
            {
              name: 'Transition',
              path: pathCollection.transition.path,
            },
            {
              name: 'Notification',
              path: pathCollection.notification.path,
            },
            {
              name: 'Avatar',
              path: pathCollection.avatar.path,
            },
            {
              name: 'Badge',
              path: pathCollection.badge.path,
            },
            {
              name: 'NoticeBar',
              path: pathCollection.noticeBar.path,
            },
            {
              name: 'Footer',
              path: pathCollection.footer.path,
            },
            {
              name: 'HelpBox',
              path: pathCollection.helpBox.path,
            },
            {
              name: 'Swiper',
              path: pathCollection.swiper.path,
            },
            {
              name: 'Steps',
              path: pathCollection.steps.path,
            },
            {
              name: 'DataGrid',
              path: pathCollection.dataGrid.path,
            },
            {
              name: 'SearchBar',
              path: pathCollection.searchBar.path,
            },
            {
              name: 'Cascader',
              path: pathCollection.cascader.path,
            },
          ])}
        </Card>

        <Card header="扩展组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Circle',
              path: pathCollection.circle.path,
            },
            {
              name: 'Selector',
              path: pathCollection.selector.path,
            },
          ])}
        </Card>

        <Card header="交互展示" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Button Action',
              path: pathCollection.buttonAction.path,
            },
          ])}
        </Card>
      </Space>
    );
  }
}
