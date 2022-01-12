import { View } from '@tarojs/components';

import {
  Space,
  AutoCenter,
  BlockArea,
  Button,
} from 'taro-fast-component/es/customComponents';

import { pathCollection } from '@/customConfig/constants';
import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  buildItem = ({ name, path }) => {
    return (
      <Button
        block
        // size="large"
        onClick={() => {
          this.navigateTo({
            url: path,
          });
        }}
      >
        {name}
      </Button>
    );
  };

  renderFurther() {
    return (
      <View className="index">
        <AutoCenter> Welcome To Taro-Fast-Framework! </AutoCenter>

        <BlockArea title="组件示例">
          <Space wrap>
            {this.buildItem({
              name: 'ImageBox',
              path: pathCollection.imageBox.path,
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
              name: 'Layout',
              path: pathCollection.layout.path,
            })}

            {this.buildItem({
              name: 'Steps',
              path: pathCollection.steps.path,
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
              name: 'AutoCenter',
              path: pathCollection.autoCenter.path,
            })}

            {this.buildItem({
              name: 'Divider',
              path: pathCollection.divider.path,
            })}

            {this.buildItem({
              name: 'Tag',
              path: pathCollection.tag.path,
            })}

            {this.buildItem({
              name: 'AdvanceInput',
              path: pathCollection.advanceInput.path,
            })}

            {this.buildItem({
              name: 'Stepper',
              path: pathCollection.stepper.path,
            })}

            {this.buildItem({
              name: 'AdvanceSwitch',
              path: pathCollection.advanceSwitch.path,
            })}

            {this.buildItem({
              name: 'AdvanceProgress',
              path: pathCollection.advanceProgress.path,
            })}

            {this.buildItem({
              name: 'AdvanceProgressBox',
              path: pathCollection.advanceProgressBox.path,
            })}

            {this.buildItem({
              name: 'Notification',
              path: pathCollection.notification.path,
            })}

            {this.buildItem({
              name: 'Grid',
              path: pathCollection.grid.path,
            })}

            {this.buildItem({
              name: 'Selector',
              path: pathCollection.selector.path,
            })}

            {this.buildItem({
              name: 'Tabs',
              path: pathCollection.tabs.path,
            })}

            {this.buildItem({
              name: 'Transition',
              path: pathCollection.transition.path,
            })}
          </Space>
        </BlockArea>
      </View>
    );
  }
}
