import { View } from '@tarojs/components';

import { showInfoMessage } from 'taro-fast-common/es/utils/tools';
import {
  Card,
  Icon,
  SearchBar,
  HelpBox,
} from 'taro-fast-component/es/customComponents';

import { cardHeaderStyle } from '../../../customConfig/constants';
import PageWrapper from '../../../customComponents/PageWrapper';

const { IconSketch } = Icon;

const style = { backgroundColor: '#f5f7fa' };

export default class Index extends PageWrapper {
  handleClick = (type) => {
    this.bannerNotify({
      message: '消息通知',
      type: type,
    });
  };

  handleSearch = (v) => {
    showInfoMessage({
      message: `触发搜索 ${v}`,
    });
  };

  handleNavigate = () => {
    showInfoMessage({
      message: `触发跳转`,
    });
  };

  renderFurther() {
    return (
      <View className="index" style={{ backgroundColor: '#453e21' }}>
        <Card
          header="搜索模式"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <SearchBar
            style={{
              margin: '40rpx',
            }}
            mode="search"
            onSearch={this.handleSearch}
          />

          <SearchBar
            style={{
              margin: '40rpx',
              borderRadius: '100rpx',
            }}
            mode="search"
            onSearch={this.handleSearch}
          />
        </Card>

        <Card
          header="跳转模式"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <SearchBar
            style={{
              margin: '40rpx',
              borderRadius: '100rpx',
            }}
            mode="navigate"
            searchStyle={{}}
            onNavigate={this.handleNavigate}
          />

          <SearchBar
            style={{
              margin: '40rpx',
              borderRadius: '100rpx',
            }}
            mode="navigate"
            showSearch={false}
            onNavigate={this.handleNavigate}
          />
        </Card>

        <Card
          header="自定义样式"
          style={style}
          headerStyle={cardHeaderStyle}
          space={false}
        >
          <SearchBar
            style={{
              margin: '40rpx',
              borderRadius: '100rpx',
            }}
            align="center"
            icon={<IconSketch size={14} color="#6b6ead" />}
            placeholder="搜索商品"
            mode="navigate"
            searchStyle={{
              color: '#4532e5',
            }}
            valueStyle={{
              color: '#4532e5',
              align: 'center',
            }}
            placeholderStyle={{
              color: '#4532e5',
            }}
            onNavigate={this.handleNavigate}
          />
        </Card>

        <Card header="属性说明 :" headerStyle={cardHeaderStyle}>
          <HelpBox
            showTitle={false}
            showNumber={false}
            list={[
              {
                text: '支持搜索与跳转模式，具体属性参考源代码与样例.',
              },
            ]}
          />
        </Card>
      </View>
    );
  }
}
