import { View } from '@tarojs/components';

import { BlockArea, NoticeBar } from 'taro-fast-component/es/customComponents';
import { Icon } from 'taro-fast-component-extra/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

const { IconVolumePlus } = Icon;
const { More } = NoticeBar;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="Icon">
          <NoticeBar icon={<IconVolumePlus size={19} />}>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>

        <BlockArea title="Closeable [single 模式非 marquee 下生效]">
          <NoticeBar single closeable>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>

        <BlockArea title="Marquee [marquee 将自动启用 single 模式]">
          <NoticeBar marquee>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>

        <BlockArea title="Extra [single 模式下生效]">
          <NoticeBar
            single
            extra={
              <View
                style={{
                  width: '100rpx',
                  height: '100%',
                  color: '#000',
                  padding: ' 0 10rpx',
                  fontSize: '28rpx',
                  textAlign: 'center',
                }}
              >
                extra
              </View>
            }
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>

        <BlockArea title="More [single 模式下生效]">
          <NoticeBar single extra={<More />}>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>

        <BlockArea title="MoreText [single 模式下生效]">
          <NoticeBar
            single
            extra={
              <More
                text="查看更多"
                onClick={() => {
                  console.log('click more');
                }}
              />
            }
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>

        <BlockArea title="Simple">
          <NoticeBar
            icon={<IconVolumePlus size={19} />}
            marquee
            single
            extra={<More />}
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>
      </View>
    );
  }
}
