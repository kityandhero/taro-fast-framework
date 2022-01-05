import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Row from '../Flex/Row';
import Col from '../Flex/Col';

const defaultProps = {
  fillHeight: true,
};

class CenterBox extends ComponentBase {
  render() {
    const { fillHeight } = {
      ...defaultProps,
      ...this.props,
    };

    const style = !!fillHeight ? { height: '100%' } : {};

    return (
      <Row justify="center" style={style}>
        <Col auto style={style} />
        <Col style={style}>{this.props.children}</Col>
        <Col auto style={style} />
      </Row>
    );
  }
}

CenterBox.defaultProps = {
  ...defaultProps,
};

export default CenterBox;
