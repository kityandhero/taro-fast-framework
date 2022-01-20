import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import AdvanceInput from '../AdvanceInput';
import VerticalBox from '../VerticalBox';
import CenterBox from '../CenterBox';
import Icon from '../Icon';

const { IconSearch } = Icon;

const modeCollection = ['search', 'navigate'];

const defaultProps = {
  style: {},
  align: 'left',
  icon: <IconSearch size={14} color="#6b6ead" />,
  placeholder: '请输入搜索关键词',
  disabled: false,
  hidden: false,
  valueStyle: {},
  placeholderStyle: {},
  showSearch: true,
  searchText: '搜索',
  searchStyle: {},
  clearSize: '16',
  mode: 'search',
  onSearch: null,
  onNavigate: null,
};

class SearchBar extends ComponentBase {
  searchText = '';

  getMode = () => {
    const { mode } = this.props;

    return inCollection(modeCollection, mode) ? mode : defaultProps.mode;
  };

  getShowSearch = () => {
    const { showSearch } = this.props;

    const mode = this.getMode();

    return mode == 'search' ? true : showSearch;
  };

  afterChange = (v) => {
    this.searchText = v;
  };

  triggerSearch = () => {
    if (stringIsNullOrWhiteSpace(this.searchText)) {
      return;
    }

    const { onSearch } = this.props;

    if (isFunction(onSearch)) {
      onSearch(this.searchText);
    }
  };

  triggerNavigate = () => {
    const { onNavigate } = this.props;

    if (isFunction(onNavigate)) {
      onNavigate();
    }
  };

  renderFurther() {
    const {
      align,
      style,
      icon,
      placeholder,
      disabled,
      hidden,
      valueStyle,
      placeholderStyle,
      showSearch,
      searchText,
      searchStyle,
      clearSize,
    } = this.props;

    if (hidden) {
      return null;
    }

    const mode = this.getMode();

    return (
      <View
        style={{
          ...{
            // padding: '12rpx 28rpx',
            backgroundColor: '#f7f8fa',
            overflow: 'hidden',
          },
          ...style,
          ...{
            position: 'relative',
          },
        }}
      >
        {mode !== 'navigate' ? null : (
          <View
            style={{
              position: 'absolute',
              zIndex: '10',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
            onClick={this.triggerNavigate}
          />
        )}

        <View
          style={{
            position: 'absolute',
            zIndex: '6',
            top: '0',
            left: '0',
            width: '70rpx',
            height: '100%',
          }}
          onClick={this.triggerNavigate}
        >
          <CenterBox>{icon}</CenterBox>
        </View>

        <AdvanceInput
          label={null}
          align={align}
          clearable
          placeholder={placeholder}
          placeholderStyle={{
            ...{
              fontSize: '28rpx',
            },
            ...placeholderStyle,
          }}
          style={{
            paddingLeft: '70rpx',
          }}
          valueStyle={{
            ...{
              padding: '10rpx 0 10rpx 0',
            },
            valueStyle,
          }}
          clearSize={clearSize}
          disabled={disabled}
          border={false}
          extra={
            showSearch ? (
              <VerticalBox>
                <View
                  style={{
                    ...{
                      fontSize: '28rpx',
                      paddingLeft: '20rpx',
                    },
                    ...searchStyle,
                  }}
                  onClick={this.triggerSearch}
                >
                  {searchText}
                </View>
              </VerticalBox>
            ) : null
          }
          extraContainerStyle={
            showSearch
              ? {
                  ...{
                    padding: '0 2rpx 0 0',
                  },
                }
              : {}
          }
          onChange={this.afterChange}
        />
      </View>
    );
  }
}

SearchBar.defaultProps = {
  ...defaultProps,
};

export default SearchBar;
