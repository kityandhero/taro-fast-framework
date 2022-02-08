import { View, Text } from '@tarojs/components';

import { ImageBox, Icon } from 'taro-fast-component/es/customComponents';

import PageWrapper from '../PageWrapper';

import './index.less';

const { IconList, IconChevronRight } = Icon;

export default class ChannelPageBase extends PageWrapper {
  renderChannelView = (item) => {
    const { title, icon, list } = item;

    return (
      <View className="page">
        <View className="panel-header">
          <View className="panel-header__icon">
            {icon ? (
              <View className="img">
                <ImageBox src={icon} />
              </View>
            ) : (
              <IconList size={36} />
            )}
          </View>
          <View className="panel-header__title">{title}</View>
        </View>
        <View className="panel-body">
          <View className="component-list">
            {list.map((one, index) => (
              <View
                className="component-list__item"
                key={`${index}`}
                onClick={() => {
                  this.navigateTo({
                    url: one.path,
                  });
                }}
              >
                <Text className="name">{`${one.id} ${one.name}`}</Text>
                <IconChevronRight size={36} />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };
}
