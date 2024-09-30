import classNames from 'classnames';
import React, { Component } from 'react';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { checkInCollection, getGuid, isFunction } from 'easy-soft-utility';

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
  className: '',
  customStyle: '',
  files: [],
  mode: imagePickerModeCollection.aspectFill,
  showAddBtn: true,
  multiple: false,
  length: 4,
  onChange: () => {},
};

// 生成 jsx 二维矩阵
const generateMatrix = (files, col, showAddButton) => {
  const matrix = [];
  const length = showAddButton ? files.length + 1 : files.length;
  const row = Math.ceil(length / col);

  for (let index = 0; index < row; index++) {
    if (index === row - 1) {
      // 最后一行数据加上添加按钮
      const lastArray = files.slice(index * col);

      if (lastArray.length < col) {
        if (showAddButton) {
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
  getMode = () => {
    const { mode } = this.props;

    if (checkInCollection(imagePickerModeList, mode)) {
      return mode;
    }

    return imagePickerModeCollection.aspectFill;
  };

  chooseFile = () => {
    const { files = [], multiple, count, sizeType, sourceType } = this.props;
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

    const { onChange, onFail } = this.props;

    Taro.chooseImage(parameters)
      .then((o) => {
        const targetFiles = o.tempFilePaths.map((path, index) => ({
          url: path,
          file: o[filePathName][index],
        }));

        const newFiles = [...files, ...targetFiles];

        if (isFunction(onChange)) {
          onChange(newFiles, 'add');
        }

        return;
      })
      .catch((error) => {
        if (isFunction(onFail)) {
          onFail?.(error);
        }

        return null;
      });
  };

  handleImageClick = (index) => {
    const { onImageClick } = this.props;

    if (!isFunction(onImageClick)) {
      return;
    }

    onImageClick(index, this.props.files[index]);
  };

  handleRemoveImg = (index, event) => {
    const { files = [], onChange } = this.props;

    event.stopPropagation();
    event.preventDefault();

    if (ENV === Taro.ENV_TYPE.WEB) {
      window.URL.revokeObjectURL(files[index].url);
    }

    const newFiles = files.filter((_, index_) => index_ !== index);

    if (isFunction(onChange)) {
      onChange(newFiles, 'remove', index);
    }
  };

  render() {
    const {
      className,
      customStyle,
      files,
      length = 4,
      showAddBtn: showAddButton = true,
    } = this.props;

    const rowLength = length <= 0 ? 1 : length;
    // 行数
    const matrix = generateMatrix(files, rowLength, showAddButton);
    const rootClass = classNames(classPrefix, className);

    const mode = this.getMode();

    return (
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
                    <View
                      className={`${classPrefix}__remove-btn`}
                      onClick={this.handleRemoveImg.bind(
                        this,
                        index * length + index_,
                      )}
                    ></View>
                    <Image
                      className={`${classPrefix}__preview-img`}
                      mode={mode}
                      src={item.url}
                      onClick={this.handleImageClick.bind(
                        this,
                        index * length + index_,
                      )}
                    />
                  </View>
                </View>
              ) : (
                <View
                  className={`${classPrefix}__flex-item`}
                  key={`empty_${index * length}${index_}`}
                >
                  {item.type === 'btn' && (
                    <View onClick={this.chooseFile}>
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
    );
  }
}

ImagePicker.defaultProps = {
  ...defaultProps,
};

export { ImagePicker, imagePickerModeCollection };
