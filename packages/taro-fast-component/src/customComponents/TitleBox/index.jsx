import { checkInCollection, isFunction } from 'easy-soft-utility';
import { View } from '@tarojs/components';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';
import Col from '../Flex/Col';
import Row from '../Flex/Row';

const positionCollection = ['left', 'right'];

const defaultProps = {
  style: {},
  titleStyle: {},
  subtitleStyle: {},
  title: null,
  subtitle: null,
  onClick: null,
};

class ExtraBox extends BaseComponent {
  getExtraPosition = () => {
    const { extraPosition } = this.props;

    return checkInCollection(positionCollection, extraPosition)
      ? extraPosition
      : defaultProps.extraPosition;
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

  getTitleStyle = () => {
    const { titleStyle } = this.props;

    return {
      ...titleStyle,
      ...{},
    };
  };

  getSubtitleStyle = () => {
    const { subtitleStyle } = this.props;

    return {
      ...subtitleStyle,
      ...{},
    };
  };

  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { title, subtitle } = this.props;

    const style = this.getStyle();
    const titleStyle = this.getTitleStyle();
    const subtitleStyle = this.getSubtitleStyle();

    return (
      <View style={style}>
        <CenterBox>
          <Row align="end" justify="start">
            {title == null ? null : <Col style={titleStyle}>{title}</Col>}

            {subtitle == null ? null : (
              <Col style={subtitleStyle}>{subtitle}</Col>
            )}
          </Row>
        </CenterBox>
      </View>
    );
  }
}

ExtraBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ExtraBox;
