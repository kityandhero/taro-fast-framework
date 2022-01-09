import { View } from '@tarojs/components';

import {
  Space,
  AutoCenter,
  BlockArea,
} from 'taro-fast-component/es/customComponents';

import { pathCollection } from '@/customConfig/constants';
import PageWrapper from '@/customComponents/PageWrapper';

export default class Index extends PageWrapper {
  buildItem = ({ name, path }) => {
    return (
      <View
        style={{ padding: '4rpx 20rpx', border: '1rpx solid #ccc' }}
        onClick={() => {
          this.navigateTo({
            url: path,
          });
        }}
      >
        {name}
      </View>
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
              name: 'Switch',
              path: pathCollection.advanceSwitch.path,
            })}
          </Space>
        </BlockArea>
      </View>
    );
  }
}
