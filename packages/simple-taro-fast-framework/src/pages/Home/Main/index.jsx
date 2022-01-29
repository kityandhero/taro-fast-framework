import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { CenterBox, Card, Item } from 'taro-fast-component/es/customComponents';

import {
  pathCollection,
  cardHeaderStyle,
} from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  buildItem = ({ name, path }) => {
    return (
      <Item
        arrow
        clickable
        onClick={() => {
          this.navigateTo({
            url: path,
          });
        }}
      >
        {name}
      </Item>
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
      <View className="index">
        <View style={{ margin: `${transformSize(20)} 0` }}>
          <CenterBox> Welcome To Taro-Fast-Framework! </CenterBox>
        </View>

        <Card header="基础方法" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Utils',
            path: pathCollection.utils.path,
          })}
        </Card>

        <Card header="内置色彩" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Color',
            path: pathCollection.color.path,
          })}
        </Card>

        <Card header="基础组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Line',
            path: pathCollection.line.path,
          })}

          {this.buildItem({
            name: 'ImageBox',
            path: pathCollection.imageBox.path,
          })}

          {this.buildItem({
            name: 'Button',
            path: pathCollection.button.path,
          })}

          {this.buildItem({
            name: 'InputItem',
            path: pathCollection.inputItem.path,
          })}

          {this.buildItem({
            name: 'Switch',
            path: pathCollection.switch.path,
          })}

          {this.buildItem({
            name: 'SwitchItem',
            path: pathCollection.switchItem.path,
          })}

          {this.buildItem({
            name: 'Radio',
            path: pathCollection.radio.path,
          })}

          {this.buildItem({
            name: 'RadioSelector',
            path: pathCollection.radioSelector.path,
          })}

          {this.buildItem({
            name: 'CheckBox',
            path: pathCollection.checkBox.path,
          })}

          {this.buildItem({
            name: 'CheckBoxSelector',
            path: pathCollection.checkBoxSelector.path,
          })}

          {this.buildItem({
            name: 'progress',
            path: pathCollection.progress.path,
          })}

          {this.buildItem({
            name: 'ProgressBox',
            path: pathCollection.progressBox.path,
          })}

          {this.buildItem({
            name: 'ProgressItem',
            path: pathCollection.progressItem.path,
          })}

          {this.buildItem({
            name: 'Stepper',
            path: pathCollection.stepper.path,
          })}

          {this.buildItem({
            name: 'StepperItem',
            path: pathCollection.stepperItem.path,
          })}

          {this.buildItem({
            name: 'TextAreaItem',
            path: pathCollection.textAreaItem.path,
          })}
        </Card>

        <Card header="布局组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Space',
            path: pathCollection.space.path,
          })}

          {this.buildItem({
            name: 'Divider',
            path: pathCollection.divider.path,
          })}

          {this.buildItem({
            name: 'Layout',
            path: pathCollection.layout.path,
          })}

          {this.buildItem({
            name: 'HorizontalCenterBox',
            path: pathCollection.horizontalCenterBox.path,
          })}

          {this.buildItem({
            name: 'VerticalBox',
            path: pathCollection.verticalBox.path,
          })}

          {this.buildItem({
            name: 'CenterBox',
            path: pathCollection.centerBox.path,
          })}

          {this.buildItem({
            name: 'FlexBox',
            path: pathCollection.flexBox.path,
          })}

          {this.buildItem({
            name: 'Grid',
            path: pathCollection.grid.path,
          })}

          {this.buildItem({
            name: 'Card',
            path: pathCollection.card.path,
          })}

          {this.buildItem({
            name: 'Item',
            path: pathCollection.item.path,
          })}

          {this.buildItem({
            name: 'Popup',
            path: pathCollection.popup.path,
          })}

          {this.buildItem({
            name: 'Tabs',
            path: pathCollection.tabs.path,
          })}

          {this.buildItem({
            name: 'Overlay',
            path: pathCollection.overlay.path,
          })}
        </Card>

        <Card header="操作反馈" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'ActionSheet',
            path: pathCollection.actionSheet.path,
          })}

          {this.buildItem({
            name: 'FloatAction',
            path: pathCollection.floatAction.path,
          })}

          {this.buildItem({
            name: 'Modal',
            path: pathCollection.modal.path,
          })}
        </Card>

        <Card header="功能组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Ellipsis',
            path: pathCollection.ellipsis.path,
          })}

          {this.buildItem({
            name: 'Loading',
            path: pathCollection.loading.path,
          })}

          {this.buildItem({
            name: 'ColorText',
            path: pathCollection.colorText.path,
          })}

          {this.buildItem({
            name: 'Price',
            path: pathCollection.price.path,
          })}

          {this.buildItem({
            name: 'Tag',
            path: pathCollection.tag.path,
          })}

          {this.buildItem({
            name: 'Countdown',
            path: pathCollection.countdown.path,
          })}

          {this.buildItem({
            name: 'Transition',
            path: pathCollection.transition.path,
          })}

          {this.buildItem({
            name: 'Notification',
            path: pathCollection.notification.path,
          })}

          {this.buildItem({
            name: 'Avatar',
            path: pathCollection.avatar.path,
          })}

          {this.buildItem({
            name: 'Badge',
            path: pathCollection.badge.path,
          })}

          {this.buildItem({
            name: 'NoticeBar',
            path: pathCollection.noticeBar.path,
          })}

          {this.buildItem({
            name: 'Copyright',
            path: pathCollection.copyright.path,
          })}

          {this.buildItem({
            name: 'HelpBox',
            path: pathCollection.helpBox.path,
          })}

          {this.buildItem({
            name: 'Swiper',
            path: pathCollection.swiper.path,
          })}

          {this.buildItem({
            name: 'Steps',
            path: pathCollection.steps.path,
          })}

          {this.buildItem({
            name: 'DataGrid',
            path: pathCollection.dataGrid.path,
          })}

          {this.buildItem({
            name: 'SearchBar',
            path: pathCollection.searchBar.path,
          })}

          {this.buildItem({
            name: 'Cascader',
            path: pathCollection.cascader.path,
          })}
        </Card>

        <Card header="扩展组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Circle',
            path: pathCollection.circle.path,
          })}

          {this.buildItem({
            name: 'Selector',
            path: pathCollection.selector.path,
          })}
        </Card>

        <Card header="交互展示" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Button Action',
            path: pathCollection.buttonAction.path,
          })}
        </Card>
      </View>
    );
  }
}
