import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isArray } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { IconChevronDown } from '../Icon';
import { Item } from '../Item';

import './index.less';

const classPrefix = `tfc-collapse`;

const defaultProps = {
  style: {},
  options: [],
  border: true,
  iconUncheck: null,
  iconCheck: null,
  list: [],
  single: false,
};

class Collapse extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listStage: [],
      openList: [],
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { list: listNext, single } = nextProperties;
    const { listStage: listPrevious } = previousState;

    if (JSON.stringify(listNext) !== JSON.stringify(listPrevious)) {
      let firstOpen = false;

      const openList = (isArray(listNext) ? listNext : []).map((o) => {
        if (o.open && !firstOpen) {
          firstOpen = true;
        }

        return o.open ? (single && firstOpen ? false : true) : false;
      });

      return {
        listStage: listNext,
        openList,
      };
    }

    return {};
  }

  triggerClick = (o, index_) => {
    const { single } = this.props;
    let { openList } = this.state;

    if (single) {
      openList = openList.map((item, index) => {
        if (index_ !== index) {
          return false;
        }

        return item;
      });

      openList[index_] = !openList[index_];
    } else {
      openList[index_] = !openList[index_];
    }

    this.setState({ openList: [...openList] });
  };

  renderFurther() {
    const { style, border, list } = this.props;
    const { openList } = this.state;

    const listCount = list.length;

    return (
      <View style={style}>
        {(isArray(list) ? list : []).map((o, index) => {
          const {
            prefix,
            title,
            label,
            description,
            style: styleItem,
            disabled,
            body,
            extraContainerStyle,
          } = o;

          const key = `item_${index}`;

          const bodyVisible = openList[index];

          return (
            <Item
              key={key}
              prefix={prefix}
              title={title}
              label={label}
              style={styleItem}
              description={description}
              clickable
              arrow={false}
              disabled={disabled}
              showBody={bodyVisible}
              body={body}
              bodyAnimate
              border={border && index !== listCount - 1}
              extra={
                <View
                  className={classNames(classPrefix, {
                    [`${classPrefix}__arrow`]: true,
                    [`${classPrefix}__arrow__close`]: !bodyVisible,
                    [`${classPrefix}__arrow__open`]: bodyVisible,
                  })}
                >
                  <IconChevronDown size={38} color="#969799" />
                </View>
              }
              extraContainerStyle={extraContainerStyle}
              onClick={() => {
                this.triggerClick(o, index);
              }}
            />
          );
        })}
      </View>
    );
  }
}

Collapse.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Collapse };
