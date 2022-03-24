import { isArray } from 'taro-fast-common/es/utils/typeCheck';
import PageWrapper from '../../../customComponents/PageWrapper';

export default class BasePageWrapper extends PageWrapper {
  getSectionList = () => {
    const { global } = this.props;

    const { sectionList } = {
      ...{
        sectionList: [],
      },
      ...global,
    };

    return isArray(sectionList) ? sectionList : [];
  };
}
