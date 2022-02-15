import ListCore from '../ListCore';

class MultiPageCore extends ListCore {
  pageNo = 1;

  pageSize = 10;

  initLoadRequestParams = () => {
    return {
      pageNo: this.pageNo || 1,
      pageSize: this.pageSize || 10,
    };
  };

  afterLoadSuccess = () => {
    this.pageNo = this.pageNo + 1;
    this.clearListDataBeforeAttach = false;
  };

  refreshData = () => {
    this.pageNo = 1;
    this.clearListDataBeforeAttach = true;

    this.reloadData({});
  };
}

export default MultiPageCore;
