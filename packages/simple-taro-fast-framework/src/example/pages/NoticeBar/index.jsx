import { View } from '@tarojs/components';

import {
  BlockArea,
  NoticeBar,
  Icon,
} from 'taro-fast-component/es/customComponents';

import PageWrapper from '@/customComponents/PageWrapper';

const { IconVolumePlus } = Icon;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <BlockArea title="NoticeBar">
          <NoticeBar
            icon={<IconVolumePlus size={19} />}
            close
            marquee
            single
            showMore
            moreText="详情"
            afterClose={() => {
              console.log('afterClose');
            }}
            afterClickMore={() => {
              console.log('afterClickMore');
            }}
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </BlockArea>
      </View>
    );
  }
}
