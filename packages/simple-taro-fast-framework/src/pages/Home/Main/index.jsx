import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-component/es/utils/tools';
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
    let r = '';

    for (let i = 1; i <= 200; i = i + 1) {
      r += `--tfc-${i}: ${i}px;`;
    }

    console.log(r);

    return (
      <View className="index">
        <View style={{ margin: `${transformSize(20)} 0` }}>
          <CenterBox> Welcome To Taro-Fast-Framework! </CenterBox>
        </View>

        <Card header="基础组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'ImageBox',
            path: pathCollection.imageBox.path,
          })}

          {this.buildItem({
            name: 'Button',
            path: pathCollection.button.path,
          })}

          {this.buildItem({
            name: 'AdvanceButton',
            path: pathCollection.advanceButton.path,
          })}

          {this.buildItem({
            name: 'AdvanceInput',
            path: pathCollection.advanceInput.path,
          })}

          {this.buildItem({
            name: 'AdvanceSwitch',
            path: pathCollection.advanceSwitch.path,
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
            name: 'AdvanceProgress',
            path: pathCollection.advanceProgress.path,
          })}

          {this.buildItem({
            name: 'Divider',
            path: pathCollection.divider.path,
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

        <Card header="功能组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Ellipsis',
            path: pathCollection.ellipsis.path,
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
            name: 'AdvanceProgressBox',
            path: pathCollection.advanceProgressBox.path,
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
            name: 'FloatAction',
            path: pathCollection.floatAction.path,
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
            name: 'Circle',
            path: pathCollection.circle.path,
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
        </Card>

        <Card header="扩展组件" headerStyle={cardHeaderStyle} space={false}>
          {this.buildItem({
            name: 'Selector',
            path: pathCollection.selector.path,
          })}
        </Card>
      </View>
    );
  }
}
