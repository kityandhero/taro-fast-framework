import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Row from '../Flex/Row';
import Col from '../Flex/Col';

const defaultProps = {
  style: {},
  fillHeight: true,
};

class HorizontalCenterBox extends ComponentBase {
  renderFurther() {
    const { style: styleSource, fillHeight } = this.props;

    const style = {
      ...styleSource,
      ...(!!fillHeight ? { height: '100%' } : {}),
    };

    return (
      <Row justify="center" style={style}>
        <Col auto style={style} />
        <Col style={style}>{this.props.children}</Col>
        <Col auto style={style} />
      </Row>
    );
  }
}

HorizontalCenterBox.defaultProps = {
  ...defaultProps,
};

export default HorizontalCenterBox;
