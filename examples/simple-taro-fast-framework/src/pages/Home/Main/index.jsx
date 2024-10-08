import { View } from '@tarojs/components';

import { connect } from 'easy-soft-dva';
import { navigateTo } from 'easy-soft-utility';

import { checkWebEnvironment } from 'taro-fast-common';
import { CenterBox, IconChevronRight, ImageBox } from 'taro-fast-component';

import iconAction from '../../../assets/images/icon-list-action.png';
import iconBasic from '../../../assets/images/icon-list-basic.png';
import iconForm from '../../../assets/images/icon-list-form.png';
import iconHOC from '../../../assets/images/icon-list-hoc.png';
import iconLayout from '../../../assets/images/icon-list-layout.png';
// import iconNavigation from '../../../assets/images/icon-list-navigation.png';
import iconView from '../../../assets/images/icon-list-view.png';
import logoImg from '../../../assets/images/logo.png';
import { PageWrapperSimulation } from '../../../customComponents';
import { pathCollection } from '../../../customConfig';

import './index.less';

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
    id: 'VariableView',
    title: '开发框架',
    content: '查看开发框架内置功能',
    icon: iconHOC,
    webPage: false,
    path: pathCollection.framework.home.path,
  },
  {
    id: 'Template',
    title: '模板页面',
    content: '模板页面示例',
    icon: iconHOC,
    webPage: false,
    path: pathCollection.template.entry.path,
  },
  {
    id: 'Template',
    title: '远程模板页面',
    content: '远程模板页面示例',
    icon: iconHOC,
    webPage: false,
    path: pathCollection.templateRemote.entry.path,
  },
  {
    id: 'News',
    title: '资讯应用示例',
    content: '查看资讯应用示例',
    icon: iconHOC,
    webPage: false,
    path: pathCollection.news.entry.path,
  },
  {
    id: 'WebPage',
    title: 'H5版本组件',
    content: '查看H5版本组件展示',
    icon: iconHOC,
    webPage: true,
    path: pathCollection.example.webPage.path,
    webPageTitle: 'H5版本',
    webPageUrl: 'http://mtest.1010101.cc',
    hidden: checkWebEnvironment(),
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

// eslint-disable-next-line no-undef
definePageConfig({
  navigationBarTitleText: '首页',
});

@connect(({ entrance, session, global, schedulingControl }) => ({
  entrance,
  session,
  global,
  schedulingControl,
}))
class Index extends PageWrapperSimulation {
  onShareAppMessage() {
    const o = {
      path: pathCollection.root.main.path,
    };

    return o;
  }

  renderFurther() {
    // let r = '';

    // for (let i = 1000; i <= 2000; i = i + 10) {
    //   r += `--tfc-${i}: ${i}px;`;
    // }

    return (
      <View className="page page-index">
        <CenterBox>
          <View className="logo">
            <ImageBox src={logoImg} />
          </View>
        </CenterBox>
        <View className="page-title">Taro-Fast-Framework</View>
        <View className="module-list">
          {listData.map((item, index) => {
            const { hidden } = item;

            if (hidden) {
              return null;
            }

            return (
              <View
                className="module-list__item"
                key={index}
                onClick={() => {
                  const { webPage } = item;

                  if (webPage) {
                    const { webPageTitle, webPageUrl, path } = item;

                    this.goToWebPage(
                      path,
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
            );
          })}
        </View>
      </View>
    );
  }
}

export default Index;
