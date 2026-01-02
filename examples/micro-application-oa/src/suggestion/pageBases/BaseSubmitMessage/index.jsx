import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  isArray,
  isEmptyArray,
  isNull,
  showSimpleErrorMessage,
  showSimpleWarningMessage,
  showSimpleWarnMessage,
  toString,
  whetherNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  Button,
  ImagePicker,
  InputItem,
  Line,
  Modal,
  RadioPopup,
} from 'taro-fast-component';

import { PageNeedSignInWrapper } from '../../../customComponents';
import { getSubsidiaryIdCache, HeadNavigationBox } from '../../../utils';
import { viewStyle } from '../../customConfig';
import { fieldDataSubsidiary } from '../../fieldDataCollection';
import {
  getSubsidiaryAction,
  singleListComplaintCategoryAction,
  singleListSubsidiaryAction,
} from '../assist/action';

import { SubmitConfirm } from './submitConfirm';

const titleHeaderStyle = {
  fontSize: transformSize(40),
  fontWeight: 'bold',
  color: '#333',
  paddingLeft: transformSize(10),
  paddingTop: transformSize(38),
  paddingBottom: transformSize(38),
};

const inputBoxStyle = {
  color: '#333',
  backgroundColor: '#fff',
  borderRadius: transformSize(36),
  paddingLeft: transformSize(32),
  paddingRight: transformSize(32),
  paddingTop: transformSize(32),
  paddingBottom: transformSize(32),
};

const titleInputBoxStyle = {
  ...inputBoxStyle,
};

const descriptionInputBoxStyle = {
  ...inputBoxStyle,
  lineHeight: transformSize(44),
};

const buttonBoxStyle = {
  borderRadius: transformSize(24),
  overflow: 'hidden',
  marginLeft: transformSize(16),
  marginRight: transformSize(16),
};

const placeholderColor = '#979797';

const lineHeight = 52;

let fileWaitUploadCollection = [];

class BaseSubmitMessage extends PageNeedSignInWrapper {
  // showCallTrack = true;

  // showCallTrace = true;

  viewStyle = {
    ...viewStyle,
    paddingLeft: transformSize(24),
    paddingRight: transformSize(24),
    paddingTop: transformSize(24),
  };

  enableAutoInitialLoadingIndicator = false;

  enableBackTop = true;

  messagePageTitle = '';

  selectComplaintCategorySwitch = false;

  selectSubsidiarySwitch = true;

  selectSubsidiaryHeaderText = '问题归属';

  selectSubsidiaryPlaceholder = '请选择问题归属的公司';

  selectComplaintCategoryHeaderText = '问题分类';

  selectComplaintCategoryPlaceholder = '请选择问题分类';

  titleHeaderText = '';

  titlePlaceholder = '';

  descriptionPlaceholder = '';

  subsidiaryId = '';

  subsidiaryComplaintCategoryId = '';

  title = '';

  description = '';

  uploadImageApiAddress = '';

  fileList = [];

  attachmentCollection = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      customer: null,
      verifyPhoneModalVisible: false,
      subsidiaryList: [],
      complaintCategoryList: [],
      canSubmit: true,
      subsidiaryIdFromCache: false,
      subsidiaryShortNameFromCache: '',
    };
  }

  doWorkAdjustDidMount = () => {
    this.buildCurrentOperatorData();
  };

  doWorkWhenRepeatedShow = () => {
    this.buildCurrentOperatorData();
  };

  doAfterGetCurrentOperatorOnSignInSilent = (data) => {
    this.setState({
      currentCustomer: data,
    });
  };

  doOtherRemoteRequest = () => {
    this.loadSubsidiaryList();

    this.checkSubsidiary();

    this.loadComplaintCategoryList();
  };

  loadSubsidiaryList = () => {
    const subsidiaryId = getSubsidiaryIdCache();

    if (!checkStringIsNullOrWhiteSpace(subsidiaryId)) {
      return;
    }

    const data = this.buildSubsidiaryListParams();

    singleListSubsidiaryAction({
      target: this,
      handleData: {
        ...data,
      },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          subsidiaryList: remoteListData,
        });
      },
    });
  };

  buildCurrentOperatorData = () => {
    const { currentCustomer } = this.state;

    const that = this;

    if ((currentCustomer || null) == null) {
      const signInSuccess = this.checkSignInSuccess();

      if (signInSuccess) {
        that.getCurrentOperator({
          successCallback: (data) => {
            const { whetherPhoneVerify, phoneVerifyMode } = {
              whetherPhoneVerify: whetherNumber.no,
              phoneVerifyMode: '',
              ...data,
            };

            that.setState({
              currentCustomer: data,
              verifyPhoneModalVisible: whetherPhoneVerify === whetherNumber.no,
              phoneVerifyMode,
            });
          },
        });
      }
    } else {
      const { whetherPhoneVerify } = {
        whetherPhoneVerify: whetherNumber.no,
        ...currentCustomer,
      };

      that.setState({
        verifyPhoneModalVisible: whetherPhoneVerify === whetherNumber.no,
      });
    }
  };

  checkSubsidiary = () => {
    const subsidiaryId = getSubsidiaryIdCache();

    if (checkStringIsNullOrWhiteSpace(subsidiaryId)) {
      return;
    }

    getSubsidiaryAction({
      target: this,
      handleData: {
        subsidiaryId: subsidiaryId || '',
      },
      successCallback: ({ target, remoteData }) => {
        const checkResult = target.checkSwitch(remoteData);

        if (!checkResult) {
          showSimpleWarningMessage('该功能尚未开启');
        }

        const subsidiaryShortNameFromCache = getValueByKey({
          data: remoteData,
          key: fieldDataSubsidiary.shortName.name,
          defaultValue: '',
        });

        target.subsidiaryId = subsidiaryId;

        target.setState({
          canSubmit: checkResult,
          subsidiaryIdFromCache: true,
          subsidiaryShortNameFromCache,
        });
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  checkSwitch = (o) => {
    throw new Error(
      `checkSwitch need overrode to implement in ${this.componentName}`,
    );
  };

  loadComplaintCategoryList = () => {
    if (!this.selectComplaintCategorySwitch) {
      return;
    }

    singleListComplaintCategoryAction({
      target: this,
      handleData: {},
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          complaintCategoryList: remoteListData,
        });
      },
    });
  };

  buildSubsidiaryListParams = () => {
    throw new Error('buildSubsidiaryListParams need overrode to implement');
  };

  buildMessageData = () => {
    const result = {
      subsidiaryId: this.subsidiaryId,
      title: this.title,
      description: this.description,
      attachmentCollection:
        isArray(this.attachmentCollection) &&
        !isEmptyArray(this.attachmentCollection)
          ? this.attachmentCollection.join(',')
          : '',
      ...(this.selectComplaintCategorySwitch
        ? {
            subsidiaryComplaintCategoryId: this.subsidiaryComplaintCategoryId,
          }
        : {}),
    };

    return result;
  };

  uploadMessageAttachment = ({ successCallback }) => {
    if (checkStringIsNullOrWhiteSpace(this.uploadImageApiAddress)) {
      throw new Error('uploadImageApiAddress need set');
    }

    if (
      !isArray(fileWaitUploadCollection) ||
      isEmptyArray(fileWaitUploadCollection)
    ) {
      successCallback();

      return;
    }

    const that = this;

    const fileData = fileWaitUploadCollection.shift();

    if (isNull(fileData)) {
      that.uploadMessageAttachment({ successCallback });

      return;
    }

    const { file } = fileData;

    const { path = '' } = {
      path: '',
      ...file,
    };

    if (checkStringIsNullOrWhiteSpace(path)) {
      that.uploadMessageAttachment({ successCallback });

      return;
    }

    that.uploadSingleImage({
      uploadUrl: that.uploadImageApiAddress,
      filePath: path,
      name: 'file',
      successCallback: ({ data }) => {
        const { uploadHistoryId } = {
          uploadHistoryId: '',
          ...data,
        };

        that.attachmentCollection = [
          ...that.attachmentCollection,
          uploadHistoryId,
        ];

        that.uploadMessageAttachment({ successCallback });
      },
    });
  };

  submitMessage = () => {
    throw new Error('submitMessage need overrode to implement');
  };

  submit = () => {
    fileWaitUploadCollection = this.fileList;

    const that = this;

    that.uploadMessageAttachment({
      successCallback: () => {
        that.submitMessage();
      },
    });
  };

  confirmSubmit = () => {
    if (checkStringIsNullOrWhiteSpace(this.subsidiaryId)) {
      showSimpleWarnMessage(this.selectSubsidiaryPlaceholder);

      return;
    }

    if (
      this.selectComplaintCategorySwitch &&
      checkStringIsNullOrWhiteSpace(this.subsidiaryComplaintCategoryId)
    ) {
      showSimpleWarnMessage(this.selectComplaintCategoryPlaceholder);

      return;
    }

    if (checkStringIsNullOrWhiteSpace(this.title)) {
      showSimpleWarnMessage(this.titlePlaceholder);

      return;
    }

    if (checkStringIsNullOrWhiteSpace(this.description)) {
      showSimpleWarnMessage(this.descriptionPlaceholder);

      return;
    }

    SubmitConfirm.open();
  };

  triggerTitleChanged = (value) => {
    this.title = value;
  };

  triggerDescriptionChanged = (value) => {
    this.description = value;
  };

  // eslint-disable-next-line no-unused-vars
  triggerSubsidiaryChanged = (value, option) => {
    this.subsidiaryId = value;
  };

  // eslint-disable-next-line no-unused-vars
  triggerComplaintCategoryChanged = (value, option) => {
    this.subsidiaryComplaintCategoryId = value;
  };

  // eslint-disable-next-line no-unused-vars
  triggerImagePickerChanged = ({ fileList, fileChangedList, type }) => {
    this.fileList = [...fileList];
  };

  buildHeadNavigation = () => {
    return (
      <HeadNavigationBox title={this.messagePageTitle || '缺少页面标题'} />
    );
  };

  renderSubsidiarySelectView = () => {
    if (!this.selectSubsidiarySwitch) {
      return null;
    }

    const {
      subsidiaryIdFromCache,
      subsidiaryShortNameFromCache,
      subsidiaryList,
    } = this.state;

    const selectOption = subsidiaryList.map((o) => {
      const { shortName, fullName, subsidiaryId } = {
        shortName: '',
        subsidiaryId: '',
        ...o,
      };

      return {
        label: shortName,
        value: subsidiaryId,
        description: fullName,
      };
    });

    return (
      <>
        <View style={titleHeaderStyle}>
          {this.selectSubsidiaryHeaderText || '标题缺失'}
        </View>

        {subsidiaryIdFromCache ? (
          <View style={titleInputBoxStyle}>
            <View
              style={{
                lineHeight: transformSize(46),
                ...(checkStringIsNullOrWhiteSpace(subsidiaryShortNameFromCache)
                  ? {
                      color: placeholderColor,
                    }
                  : {
                      color: '#333',
                    }),
              }}
            >
              {subsidiaryShortNameFromCache || this.selectSubsidiaryPlaceholder}
            </View>
          </View>
        ) : (
          <RadioPopup
            placeholder={this.selectSubsidiaryPlaceholder}
            options={selectOption}
            viewBuilder={(value, option) => {
              const { label } = {
                label: '',
                ...option,
              };

              return (
                <View style={titleInputBoxStyle}>
                  <View
                    style={{
                      lineHeight: transformSize(46),
                      ...(checkStringIsNullOrWhiteSpace(value)
                        ? {
                            color: placeholderColor,
                          }
                        : {
                            color: '#333',
                          }),
                    }}
                  >
                    {label || this.selectSubsidiaryPlaceholder}
                  </View>
                </View>
              );
            }}
            afterChange={this.triggerSubsidiaryChanged}
          />
        )}

        <Line transparent height={30} />
      </>
    );
  };

  renderComplaintCategorySelectView = () => {
    if (!this.selectComplaintCategorySwitch) {
      return null;
    }

    const { complaintCategoryList } = this.state;

    const selectOption = complaintCategoryList.map((o) => {
      const { name, subsidiaryComplaintCategoryId } = {
        name: '',
        subsidiaryComplaintCategoryId: '',
        ...o,
      };

      return {
        label: name,
        value: subsidiaryComplaintCategoryId,
      };
    });

    return (
      <>
        <View style={titleHeaderStyle}>
          {this.selectComplaintCategoryHeaderText || '标题缺失'}
        </View>

        <RadioPopup
          placeholder={this.selectComplaintCategoryPlaceholder}
          options={selectOption}
          viewBuilder={(value, option) => {
            const { label } = {
              label: '',
              ...option,
            };

            return (
              <View style={titleInputBoxStyle}>
                <View
                  style={{
                    lineHeight: transformSize(46),
                    ...(checkStringIsNullOrWhiteSpace(value)
                      ? {
                          color: placeholderColor,
                        }
                      : {
                          color: '#333',
                        }),
                  }}
                >
                  {label || this.selectComplaintCategoryPlaceholder}
                </View>
              </View>
            );
          }}
          afterChange={this.triggerComplaintCategoryChanged}
        />

        <Line transparent height={30} />
      </>
    );
  };

  renderFurther() {
    const { canSubmit } = this.state;

    return (
      <View>
        {this.renderSubsidiarySelectView()}

        {this.renderComplaintCategorySelectView()}

        <View style={titleHeaderStyle}>
          {this.titleHeaderText || '标题缺失'}
        </View>

        <View style={titleInputBoxStyle}>
          <InputItem
            fontSize={36}
            placeholder={this.titlePlaceholder || '请输入标题'}
            border={false}
            clearable={false}
            placeholderStyle={{
              color: placeholderColor,
              lineHeight: transformSize(lineHeight),
            }}
            valueStyle={{
              lineHeight: transformSize(lineHeight),
            }}
            afterChange={this.triggerTitleChanged}
          />
        </View>

        <Line transparent height={30} />

        <View style={descriptionInputBoxStyle}>
          <View
            style={{
              fontSize: transformSize(36),
              lineHeight: transformSize(lineHeight),
              color: placeholderColor,
            }}
          >
            正文：
          </View>

          <InputItem
            fontSize={36}
            placeholder={this.descriptionPlaceholder || '请输入简介描述'}
            border={false}
            clearable={false}
            placeholderStyle={{
              color: placeholderColor,
              lineHeight: transformSize(lineHeight),
            }}
            valueStyle={{
              lineHeight: transformSize(lineHeight),
            }}
            areaMode
            areaHeight={460}
            afterChange={this.triggerDescriptionChanged}
          />

          <Line transparent height={20} />

          <Line color="#ccc" height={2} />

          <Line transparent height={20} />

          <ImagePicker
            multiple
            count={10}
            files={[]}
            // eslint-disable-next-line no-unused-vars
            afterChange={({ fileList, fileChangedList, type }) => {
              this.triggerImagePickerChanged({
                fileList,
                fileChangedList,
                type,
              });
            }}
            // eslint-disable-next-line no-unused-vars
            onFail={(message) => {
              // this.selectFileFail(message);
            }}
          />
        </View>

        <Line transparent height={120} />

        <View style={buttonBoxStyle}>
          <Button
            text="提交"
            fontColor="#fff"
            backgroundColor={['#3e84bc', '#396aae']}
            paddingTop={20}
            paddingBottom={20}
            fontSize={42}
            block
            circle
            size="middle"
            disabled={!canSubmit}
            onClick={this.confirmSubmit}
          />
        </View>
      </View>
    );
  }

  renderInteractiveArea = () => {
    const { verifyPhoneModalVisible, phoneVerifyMode } = this.state;

    return (
      <>
        <SubmitConfirm
          headerStyle={{
            color: '#000',
            fontSize: transformSize(32),
          }}
          afterOk={this.submit}
        />

        <Modal
          visible={verifyPhoneModalVisible}
          footer={
            <View
              style={{
                backgroundColor: '#3b74b3',
                borderRadius: 'var(--tfc-14)',
                height: 'var(--tfc-60)',
                lineHeight: 'var(--tfc-60)',
                color: '#fff',
                textAlign: 'center',
                fontSize: 'var(--tfc-28)',
                margin: 'var(--tfc-14) var(--tfc-12)',
              }}
              onClick={() => {
                if (toString(phoneVerifyMode) === '0') {
                  this.redirectToSuggestionVerifyPhone();

                  return;
                }

                if (toString(phoneVerifyMode) === '100') {
                  this.redirectToSuggestionVerifyPhoneWithWeChat();

                  return;
                } else {
                  showSimpleErrorMessage('未配置手机号验证方式');
                }
              }}
            >
              立即校验
            </View>
          }
        >
          你还未进行手机号验证，无法提交
        </Modal>
      </>
    );
  };
}

export { BaseSubmitMessage };
