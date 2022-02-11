import { Fragment } from 'react';
import { View } from '@tarojs/components';

import { transformSize, navigateTo } from 'taro-fast-common/es/utils/tools';
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
    webPage: false,
    path: pathCollection.example.basic.path,
  },
  {
    id: 'Element',
    title: '元件',
    content: '包含通告栏、标签、徽标等',
    icon: iconView,
    webPage: false,
    path: pathCollection.example.element.path,
  },
  {
    id: 'Form',
    title: '表单',
    content: '包含输入框、单选框、复选框等',
    icon: iconForm,
    webPage: false,
    path: pathCollection.example.form.path,
  },
  {
    id: 'Layout',
    title: '布局',
    content: '包含列表、浮层、卡片等',
    icon: iconLayout,
    webPage: false,
    path: pathCollection.example.layout.path,
  },
  {
    id: 'Action',
    title: '操作反馈',
    content: '包含对话框、进度条、动作面板等',
    icon: iconAction,
    webPage: false,
    path: pathCollection.example.action.path,
  },
  // {
  //   id: 'Navigation',
  //   title: '导航',
  //   content: '包含标签栏、导航栏、分段器等',
  //   icon: iconNavigation,
  //   path: pathCollection.example.navigation.path,
  // },
  {
    id: 'Extra',
    title: '扩展组件',
    content: '包含日历等',
    icon: iconHOC,
    webPage: false,
    path: pathCollection.example.extraComponent.path,
  },
  {
    id: 'Interact',
    title: '交互操作',
    content: '包含按钮操作等',
    icon: iconHOC,
    webPage: false,
    path: pathCollection.example.interact.path,
  },
  {
    id: 'News',
    title: '资讯小程序示例',
    content: '查看资讯小程序示例',
    icon: iconHOC,
    webPage: false,
    path: pathCollection.news.home.path,
  },
  {
    id: 'WebPage',
    title: 'H5版本组件',
    content: '查看H5版本组件展示',
    icon: iconHOC,
    webPage: true,
    path: pathCollection.example.webPage.path,
    webPageTitle: 'H5版本',
    webPageUrl: 'http://mtest.panduolakeji.com',
  },
  {
    id: 'CoreTools',
    title: '调用微信内核工具',
    content: '调用微信内核工具, 用于清除缓存等',
    icon: iconHOC,
    webPage: true,
    path: pathCollection.example.webPage.path,
    webPageTitle: '',
    webPageUrl: 'http://debugtbs.qq.com',
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
          navigateTo(path);
        }}
      />
    );
  };

  onShareAppMessage() {
    const o = {
      ...{
        path: pathCollection.example.main.path,
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
                const { webPage } = item;

                if (webPage) {
                  const { webPageTitle, webPageUrl } = item;

                  this.goToWebPage(
                    item.path,
                    webPageTitle || '',
                    webPageUrl || '',
                  );
                } else {
                  navigateTo(item.path);
                }
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
              path: pathCollection.example.utils.path,
            },
          ])}
        </Card>

        <Card header="内置色彩" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Color',
              path: pathCollection.example.color.path,
            },
          ])}
        </Card>

        <Card header="基础组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'ImageBox',
              path: pathCollection.example.imageBox.path,
            },
            {
              name: 'Button',
              path: pathCollection.example.button.path,
            },
            {
              name: 'InputItem',
              path: pathCollection.example.inputItem.path,
            },
            {
              name: 'Switch',
              path: pathCollection.example.switch.path,
            },
            {
              name: 'SwitchItem',
              path: pathCollection.example.switchItem.path,
            },
            {
              name: 'Radio',
              path: pathCollection.example.radio.path,
            },
            {
              name: 'RadioSelector',
              path: pathCollection.example.radioSelector.path,
            },
            {
              name: 'CheckBox',
              path: pathCollection.example.checkBox.path,
            },
            {
              name: 'CheckBoxSelector',
              path: pathCollection.example.checkBoxSelector.path,
            },
            {
              name: 'progress',
              path: pathCollection.example.progress.path,
            },
            {
              name: 'ProgressBox',
              path: pathCollection.example.progressBox.path,
            },
            {
              name: 'ProgressItem',
              path: pathCollection.example.progressItem.path,
            },
            {
              name: 'Stepper',
              path: pathCollection.example.stepper.path,
            },
            {
              name: 'StepperItem',
              path: pathCollection.example.stepperItem.path,
            },
            {
              name: 'TextAreaItem',
              path: pathCollection.example.textAreaItem.path,
            },
          ])}
        </Card>

        <Card header="布局组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Line',
              path: pathCollection.example.line.path,
            },
            {
              name: 'Space',
              path: pathCollection.example.space.path,
            },
            {
              name: 'Divider',
              path: pathCollection.example.divider.path,
            },
            {
              name: 'Layout',
              path: pathCollection.example.layout.path,
            },
            {
              name: 'HorizontalCenterBox',
              path: pathCollection.example.horizontalCenterBox.path,
            },
            {
              name: 'VerticalBox',
              path: pathCollection.example.verticalBox.path,
            },
            {
              name: 'CenterBox',
              path: pathCollection.example.centerBox.path,
            },
            {
              name: 'FlexBox',
              path: pathCollection.example.flexBox.path,
            },
            {
              name: 'Grid',
              path: pathCollection.example.grid.path,
            },
            {
              name: 'Card',
              path: pathCollection.example.card.path,
            },
            {
              name: 'Item',
              path: pathCollection.example.item.path,
            },
            {
              name: 'Popup',
              path: pathCollection.example.popup.path,
            },
            {
              name: 'Tabs',
              path: pathCollection.example.tabs.path,
            },
            {
              name: 'Overlay',
              path: pathCollection.example.overlay.path,
            },
            {
              name: 'Collapse',
              path: pathCollection.example.collapse.path,
            },
          ])}
        </Card>

        <Card header="操作反馈" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'ActionSheet',
              path: pathCollection.example.actionSheet.path,
            },
            {
              name: 'FloatAction',
              path: pathCollection.example.floatAction.path,
            },
            {
              name: 'Modal',
              path: pathCollection.example.modal.path,
            },
          ])}
        </Card>

        <Card header="功能组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Ellipsis',
              path: pathCollection.example.ellipsis.path,
            },
            {
              name: 'Loading',
              path: pathCollection.example.loading.path,
            },
            {
              name: 'ColorText',
              path: pathCollection.example.colorText.path,
            },
            {
              name: 'Price',
              path: pathCollection.example.price.path,
            },
            {
              name: 'Tag',
              path: pathCollection.example.tag.path,
            },
            {
              name: 'Countdown',
              path: pathCollection.example.countdown.path,
            },
            {
              name: 'Transition',
              path: pathCollection.example.transition.path,
            },
            {
              name: 'Notification',
              path: pathCollection.example.notification.path,
            },
            {
              name: 'Avatar',
              path: pathCollection.example.avatar.path,
            },
            {
              name: 'Badge',
              path: pathCollection.example.badge.path,
            },
            {
              name: 'NoticeBar',
              path: pathCollection.example.noticeBar.path,
            },
            {
              name: 'Footer',
              path: pathCollection.example.footer.path,
            },
            {
              name: 'HelpBox',
              path: pathCollection.example.helpBox.path,
            },
            {
              name: 'Swiper',
              path: pathCollection.example.swiper.path,
            },
            {
              name: 'Steps',
              path: pathCollection.example.steps.path,
            },
            {
              name: 'DataGrid',
              path: pathCollection.example.dataGrid.path,
            },
            {
              name: 'SearchBar',
              path: pathCollection.example.searchBar.path,
            },
            {
              name: 'Cascader',
              path: pathCollection.example.cascader.path,
            },
          ])}
        </Card>

        <Card header="扩展组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Circle',
              path: pathCollection.example.circle.path,
            },
            {
              name: 'Selector',
              path: pathCollection.example.selector.path,
            },
          ])}
        </Card>

        <Card header="交互展示" headerStyle={cardHeaderStyle} space={false}>
          {this.buildList([
            {
              name: 'Button Action',
              path: pathCollection.example.buttonAction.path,
            },
          ])}
        </Card>
      </Space>
    );
  }
}
