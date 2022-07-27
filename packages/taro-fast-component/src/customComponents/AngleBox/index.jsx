import { View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';

const positionCollection = {
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottomRight',
};

const defaultProps = {
  style: {},
  angle: null,
  angleSize: 60,
  fontSize: 26,
  color: '#fff',
  position: positionCollection.topLeft,
  backgroundColor: 'green',
  onClick: null,
};

class AngleBox extends BaseComponent {
  getPosition = () => {
    const { position } = this.props;

    return inCollection(
      [
        positionCollection.topLeft,
        positionCollection.topRight,
        positionCollection.bottomLeft,
        positionCollection.bottomRight,
      ],
      position,
    )
      ? position
      : positionCollection.topLeft;
  };

  getStyle = () => {
    const { style } = this.props;

    return {
      ...style,
      ...{
        position: 'relative',
      },
    };
  };

  getAngleStyle = () => {
    const { angleSize, backgroundColor } = this.props;

    const position = this.getPosition();

    let style = {};

    switch (position) {
      case positionCollection.topLeft:
        style = {
          top: '0',
          left: '0',
          background: `linear-gradient(135deg, ${backgroundColor} 50%, transparent 50%)`,
        };
        break;

      case positionCollection.topRight:
        style = {
          top: '0',
          right: '0',
          background: `linear-gradient(-135deg, ${backgroundColor} 50%, transparent 50%)`,
        };
        break;

      case positionCollection.bottomLeft:
        style = {
          bottom: '0',
          left: '0',
          background: `linear-gradient(45deg, ${backgroundColor} 50%, transparent 50%)`,
        };
        break;

      case positionCollection.bottomRight:
        style = {
          bottom: '0',
          right: '0',
          background: `linear-gradient(-45deg, ${backgroundColor} 50%, transparent 50%)`,
        };
        break;
    }

    return {
      ...style,
      ...{
        position: 'absolute',
        overflow: 'hidden',
        zIndex: '1',
        width: transformSize(angleSize),
        height: transformSize(angleSize),
      },
    };
  };

  getAngleInnerBoxStyle = () => {
    return {
      position: 'relative',
      width: '100%',
      height: '100%',
    };
  };

  getAngleInnerStyle = () => {
    const position = this.getPosition();

    let style = {};

    switch (position) {
      case positionCollection.topLeft:
        style = {
          transform: 'rotate(-45deg)',
        };
        break;

      case positionCollection.topRight:
        style = {
          transform: 'rotate(45deg)',
        };
        break;

      case positionCollection.bottomLeft:
        style = {
          transform: 'rotate(-135deg)',
        };
        break;

      case positionCollection.bottomRight:
        style = {
          transform: 'rotate(135deg)',
        };
        break;
    }

    return {
      ...style,
      ...{
        position: 'absolute',
        top: '-10.5%',
        left: '-10.5%',
        width: '121.4%',
        height: '121.4%',
      },
    };
  };

  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { angle, color, fontSize, children } = this.props;

    const style = this.getStyle();
    const angleStyle = this.getAngleStyle();
    const angleInnerBoxStyle = this.getAngleInnerBoxStyle();
    const angleInnerStyle = this.getAngleInnerStyle();

    return (
      <View style={style} onClick={this.triggerClick}>
        {angle == null ? null : (
          <View style={angleStyle}>
            <View style={angleInnerBoxStyle}>
              <View style={angleInnerStyle}>
                <View
                  style={{
                    height: '50%',
                    color: color,
                    fontSize: transformSize(fontSize),
                  }}
                >
                  <CenterBox>{angle}</CenterBox>
                </View>
                <View
                  style={{
                    height: '50%',
                  }}
                ></View>
              </View>
            </View>
          </View>
        )}

        {children}
      </View>
    );
  }
}

AngleBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default AngleBox;
