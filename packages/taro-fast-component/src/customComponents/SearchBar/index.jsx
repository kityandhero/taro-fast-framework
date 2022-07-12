import { View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';
import Icon from '../Icon';
import InputItem from '../InputItem';
import VerticalBox from '../VerticalBox';

const { IconSearch } = Icon;

const modeCollection = ['search', 'navigate'];

const defaultProps = {
  style: {},
  align: 'left',
  icon: <IconSearch size={28} color="#6b6ead" />,
  placeholder: '请输入搜索关键词',
  disabled: false,
  valueStyle: {},
  placeholderStyle: {},
  showSearch: true,
  searchText: '搜索',
  searchStyle: {},
  clearSize: 32,
  mode: 'search',
  clearable: false,
  onSearch: null,
  onNavigate: null,
};

class SearchBar extends BaseComponent {
  searchValue = '';

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
    this.searchValue = v;
  };

  triggerSearch = () => {
    const { onSearch } = this.props;

    if (isFunction(onSearch)) {
      onSearch(this.searchValue || '');
    }
  };

  triggerNavigate = () => {
    const { onNavigate } = this.props;

    if (isFunction(onNavigate)) {
      onNavigate(this.searchValue || '');
    }
  };

  renderFurther() {
    const {
      align,
      style,
      icon,
      placeholder,
      disabled,
      valueStyle,
      placeholderStyle,
      showSearch,
      searchText,
      searchStyle,
      clearSize,
      clearable,
    } = this.props;

    const mode = this.getMode();

    return (
      <View
        style={{
          ...{
            // padding: `${transformSize(12)} ${transformSize(28)}`,
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
            width: transformSize(70),
            height: '100%',
          }}
          onClick={this.triggerNavigate}
        >
          <CenterBox>{icon}</CenterBox>
        </View>

        <InputItem
          label={null}
          align={align}
          clearable={clearable}
          placeholder={placeholder}
          placeholderStyle={{
            ...{
              fontSize: transformSize(28),
            },
            ...placeholderStyle,
          }}
          style={{
            paddingLeft: transformSize(70),
          }}
          valueStyle={{
            ...{
              padding: `${transformSize(10)} 0 ${transformSize(10)} 0`,
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
                      fontSize: transformSize(28),
                      paddingLeft: transformSize(20),
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
                    padding: `0 ${transformSize(2)} 0 0`,
                  },
                }
              : {}
          }
          afterChange={this.afterChange}
        />
      </View>
    );
  }
}

SearchBar.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default SearchBar;
