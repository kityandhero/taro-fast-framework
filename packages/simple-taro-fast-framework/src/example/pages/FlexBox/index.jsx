import { View } from '@tarojs/components';

import {
  Space,
  AutoCenter,
  Card,
  FlexBox,
} from 'taro-fast-component/es/customComponents';

import { pathCollection } from '@/customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class Index extends PageWrapper {
  renderFurther() {
    console.log(this.state);

    const rowStyle = {
      backgroundColor: '#cdd1d5bf',
    };

    const colStyle = {
      textAlign: 'center',
      backgroundColor: '#0092ffbf',
    };

    return (
      <View className="index">
        <AutoCenter> Welcome To Taro-Fast-Framework! </AutoCenter>

        <Card header="组件示例">
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
              name: 'Flex',
              path: pathCollection.flex.path,
            })}
          </Space>
        </Card>

        <Card header="FlexBox">
          <FlexBox left="仅左侧" />

          <FlexBox
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            flexAuto="right"
            left="左侧"
            leftStyle={rowStyle}
            right="右侧"
            rightStyle={colStyle}
          />

          <FlexBox
            style={{ height: '200rpx' }}
            direction="vertical"
            vertical={{
              bottomHeight: '80rpx',
            }}
            top="上侧"
            topStyle={rowStyle}
            bottom="下侧"
            bottomStyle={colStyle}
          />
        </Card>
      </View>
    );
  }
}
