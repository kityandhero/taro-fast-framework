import { View } from '@tarojs/components';

import { Card, NoticeBar, Icon } from 'taro-fast-component/es/customComponents';
import {} from 'taro-fast-component-extra/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconVolumePlus } = Icon;
const { More } = NoticeBar;

export default class Index extends PageWrapper {
  renderFurther() {
    return (
      <View className="index">
        <Card header="Icon" headerStyle={cardHeaderStyle}>
          <NoticeBar icon={<IconVolumePlus size={19} />}>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="Closeable [single 模式非 marquee 下生效]"
          headerStyle={cardHeaderStyle}
        >
          <NoticeBar single closeable>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="Marquee [marquee 将自动启用 single 模式]"
          headerStyle={cardHeaderStyle}
        >
          <NoticeBar marquee>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card header="Extra [single 模式下生效]" headerStyle={cardHeaderStyle}>
          <NoticeBar
            single
            extra={
              <View
                style={{
                  width: 'var(--tfc-100)',
                  height: '100%',
                  color: '#000',
                  padding: ' 0 var(--tfc-10)',
                  fontSize: 'var(--tfc-28)',
                  textAlign: 'center',
                }}
              >
                extra
              </View>
            }
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card header="More [single 模式下生效]" headerStyle={cardHeaderStyle}>
          <NoticeBar single extra={<More />}>
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>

        <Card
          header="MoreText [single 模式下生效]"
          headerStyle={cardHeaderStyle}
        >
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
        </Card>

        <Card header="Simple" headerStyle={cardHeaderStyle}>
          <NoticeBar
            icon={<IconVolumePlus size={19} />}
            marquee
            single
            extra={<More />}
          >
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </NoticeBar>
        </Card>
      </View>
    );
  }
}
