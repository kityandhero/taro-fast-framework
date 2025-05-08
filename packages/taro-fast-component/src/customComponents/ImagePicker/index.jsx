import classNames from 'classnames';
import React, { Component } from 'react';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  checkInCollection,
  getGuid,
  isArray,
  isFunction,
  toMd5,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { ActionSheet } from '../ActionSheet';

import './index.less';

const classPrefix = `tfc-image-picker`;

const imagePickerModeCollection = {
  scaleToFill: 'scaleToFill',
  aspectFit: 'aspectFit',
  aspectFill: 'aspectFill',
  widthFix: 'widthFix',
  top: 'top',
  bottom: 'bottom',
  center: 'center',
  left: 'left',
  right: 'right',
  topLeft: 'top left',
  topRight: 'top right',
  bottomLeft: 'bottom left',
  bottomRight: 'bottom right',
};

const imagePickerModeList = [
  imagePickerModeCollection.scaleToFill,
  imagePickerModeCollection.aspectFit,
  imagePickerModeCollection.aspectFill,
  imagePickerModeCollection.widthFix,
  imagePickerModeCollection.top,
  imagePickerModeCollection.bottom,
  imagePickerModeCollection.center,
  imagePickerModeCollection.left,
  imagePickerModeCollection.right,
  imagePickerModeCollection.topLeft,
  imagePickerModeCollection.topRight,
  imagePickerModeCollection.bottomLeft,
  imagePickerModeCollection.bottomRight,
];

const defaultProps = {
  afterChange: () => {},
  canAdd: true,
  className: '',
  canRemove: true,
  confirmRemove: true,
  customStyle: '',
  files: [],
  length: 4,
  mode: imagePickerModeCollection.aspectFill,
  multiple: false,
  onImageClick: null,
};

// 生成 jsx 二维矩阵
const generateMatrix = (files, col, canAdd) => {
  const matrix = [];
  const length = canAdd ? files.length + 1 : files.length;
  const row = Math.ceil(length / col);

  for (let index = 0; index < row; index++) {
    if (index === row - 1) {
      // 最后一行数据加上添加按钮
      const lastArray = files.slice(index * col);

      if (lastArray.length < col) {
        if (canAdd) {
          lastArray.push({ type: 'btn', uuid: getGuid() });
        }

        // 填补剩下的空列
        for (let index_ = lastArray.length; index_ < col; index_++) {
          lastArray.push({ type: 'blank', uuid: getGuid() });
        }
      }

      matrix.push(lastArray);
    } else {
      matrix.push(files.slice(index * col, (index + 1) * col));
    }
  }

  return matrix;
};

const ENV = Taro.getEnv();

class ImagePicker extends Component {
  itemWillRemove = null;

  itemIndexWillRemove = -1;

  constructor(properties) {
    super(properties);

    const { files } = properties;

    this.state = {
      filesFlag: toMd5(JSON.stringify(isArray(files) ? files : [])),
      filesStage: files,
      confirmVisible: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { files: filesNext } = nextProperties;
    const { filesFlag: filesFlagPrevious } = previousState;

    const filesFlagNext = toMd5(
      JSON.stringify(isArray(filesNext) ? filesNext : []),
    );

    let filesData = {};

    if (filesFlagPrevious !== filesFlagNext) {
      filesData = {
        filesFlag: filesFlagNext,
        filesStage: filesNext,
      };
    }

    return {
      ...filesData,
    };
  }

  getMode = () => {
    const { mode } = this.props;

    if (checkInCollection(imagePickerModeList, mode)) {
      return mode;
    }

    return imagePickerModeCollection.aspectFill;
  };

  chooseImage = () => {
    const { multiple, count, sizeType, sourceType } = this.props;
    const { filesStage: files } = this.state;
    const filePathName =
      ENV === Taro.ENV_TYPE.ALIPAY ? 'apFilePaths' : 'tempFiles';
    // const count = multiple ? 99 : 1
    const parameters = {};

    if (multiple) {
      parameters.count = 99;
    }

    if (count) {
      parameters.count = count;
    }

    if (sizeType) {
      parameters.sizeType = sizeType;
    }

    if (sourceType) {
      parameters.sourceType = sourceType;
    }

    const { afterChange, onFail } = this.props;

    const that = this;

    Taro.chooseImage(parameters)
      .then((o) => {
        const targetFiles = o.tempFilePaths.map((path, index) => ({
          url: path,
          file: o[filePathName][index],
        }));

        const newFiles = [...files, ...targetFiles];

        that.setState(
          {
            filesStage: newFiles,
          },
          () => {
            if (isFunction(afterChange)) {
              afterChange({
                fileList: newFiles,
                fileChangedList: targetFiles,
                type: 'add',
              });
            }
          },
        );

        return;
      })
      .catch((error) => {
        if (isFunction(onFail)) {
          onFail(error);
        }

        return null;
      });
  };

  handleImageClick = (item, index) => {
    const { onImageClick } = this.props;
    const { filesStage: files } = this.state;

    if (!isFunction(onImageClick)) {
      return;
    }

    onImageClick(item, index, files);
  };

  confirmImageRemove = () => {
    this.setState({
      confirmVisible: true,
    });
  };

  closeConfirm = () => {
    this.setState({
      confirmVisible: false,
    });
  };

  handleImageRemove = () => {
    const { afterChange } = this.props;
    const { filesStage: files } = this.state;

    if (ENV === Taro.ENV_TYPE.WEB) {
      window.URL.revokeObjectURL(files[this.itemIndexWillRemove].url);
    }

    const newFiles = [];
    const fileChangedList = [];

    for (const [index, one] of files.entries()) {
      if (index === this.itemIndexWillRemove) {
        fileChangedList.push(one);
      } else {
        newFiles.push(one);
      }
    }

    this.setState(
      {
        filesStage: newFiles,
      },
      () => {
        if (isFunction(afterChange)) {
          afterChange({
            fileList: newFiles,
            fileChangedList: fileChangedList,
            type: 'remove',
          });
        }
      },
    );
  };

  render() {
    const {
      canAdd = true,
      canRemove,
      className,
      confirmRemove,
      customStyle,
      length = 4,
    } = this.props;
    const { confirmVisible, filesStage: files } = this.state;

    const rowLength = length <= 0 ? 1 : length;
    // 行数
    const matrix = generateMatrix(files, rowLength, canAdd);
    const rootClass = classNames(classPrefix, className);

    const mode = this.getMode();

    const that = this;

    return (
      <>
        <View className={rootClass} style={customStyle}>
          {matrix.map((row, index) => (
            <View className={`${classPrefix}__flex-box`} key={index + 1}>
              {row.map((item, index_) =>
                item.url ? (
                  <View
                    className={`${classPrefix}__flex-item`}
                    key={index * length + index_}
                  >
                    <View className={`${classPrefix}__item`}>
                      {canRemove ? (
                        <View
                          className={`${classPrefix}__remove-btn`}
                          onClick={(event) => {
                            that.itemWillRemove = item;
                            that.itemIndexWillRemove = index * length + index_;

                            event.stopPropagation();
                            event.preventDefault();

                            if (confirmRemove) {
                              that.confirmImageRemove();
                            } else {
                              that.handleImageRemove();
                            }
                          }}
                        ></View>
                      ) : null}

                      <Image
                        className={`${classPrefix}__preview-img`}
                        mode={mode}
                        src={item.url}
                        onClick={() => {
                          that.handleImageClick(item, index * length + index_);
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    className={`${classPrefix}__flex-item`}
                    key={`empty_${index * length}${index_}`}
                  >
                    {item.type === 'btn' && (
                      <View onClick={this.chooseImage}>
                        {this.props.children || (
                          <View
                            className={`${classPrefix}__item ${classPrefix}__choose-btn`}
                          >
                            <View className="add-bar"></View>
                            <View className="add-bar"></View>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                ),
              )}
            </View>
          ))}
        </View>

        <ActionSheet
          cancelText="取消"
          visible={confirmVisible}
          title="即将移除图片，确定吗?"
          headerStyle={{
            color: '#000',
            fontSize: transformSize(32),
          }}
          options={[
            {
              value: 'ok',
              content: '确定',
            },
          ]}
          onOptionClick={this.handleImageRemove}
          onClose={() => {
            this.closeConfirm();
          }}
        />
      </>
    );
  }
}

ImagePicker.defaultProps = {
  ...defaultProps,
};

export { ImagePicker, imagePickerModeCollection };
