import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
/**
 * 模态框的扩展：
 * add: 保存并新增,保存并关闭,取消
 * update: 保存,取消
 */
class EntityModal extends Component {
  static defaultProps = {
    modalState: 0, //  {0:add,1:update}
    width: 620,
    title: '',
    destroyOnClose: true, // (关闭时销毁 Modal 里的子元素) boolean	false
    modalVisible: false, // 对话框是否可见	boolean	false
    handleAdd: () => {},
    handleUpdate: () => {},
    handleClose: () => {},
  };
  // 属性类型检查
  static propTypes = {
    modalState: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string,
    destroyOnClose: PropTypes.bool,
    modalVisible: PropTypes.bool,
    handleAdd: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleClose: PropTypes.func,
  };

  // 新增
  handleAdd = flag => {
    if (this.props.handleAdd) {
      this.props.handleAdd(flag);
    }
  };

  // 修改
  handleUpdate = () => {
    if (this.props.handleUpdate) {
      this.props.handleUpdate();
    }
  };

  // 关闭
  handleClose = () => {
    if (this.props.handleClose) {
      this.props.handleClose(false);
    }
  };

  render() {
    const { modalState, title, destroyOnClose, modalVisible, width, children } = this.props;
    let titleSign;
    let footer;
    if (modalState === 0) {
      titleSign = '新增';
      footer = [
        <Button
          key="add"
          type="primary"
          onClick={() => {
            this.handleAdd(0);
          }}
        >
          保存并新增
        </Button>,
        <Button
          key="addClose"
          type="primary"
          onClick={() => {
            this.handleAdd(1);
          }}
        >
          保存并关闭
        </Button>,
        <Button
          key="close"
          onClick={() => {
            this.handleClose();
          }}
        >
          取消
        </Button>,
      ];
    } else {
      titleSign = '修改';
      footer = [
        <Button
          key="update"
          type="primary"
          onClick={() => {
            this.handleUpdate();
          }}
        >
          保存
        </Button>,
        <Button
          key="close"
          onClick={() => {
            this.handleClose();
          }}
        >
          取消
        </Button>,
      ];
    }

    return (
      <Fragment>
        <Modal
          width={width}
          title={`${titleSign}${title}`}
          visible={modalVisible}
          destroyOnClose={destroyOnClose}
          onCancel={() => {
            this.handleClose();
          }}
          footer={footer}
        >
          {[...children]}
        </Modal>
      </Fragment>
    );
  }
}

export default EntityModal;
