import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
/**
 * 模态框： 公司选择
 * 
 * 
 */
class LoginSelCompany extends Component {
  static defaultProps = {
    width: 620,
    title: '',
    destroyOnClose: true, // (关闭时销毁 Modal 里的子元素) boolean	false
    modalVisible: false, // 对话框是否可见	boolean	false
    handleOk: () => { },
    handleCancel: () => { },
  };
  // 属性类型检查
  static propTypes = {
    width: PropTypes.number,
    title: PropTypes.string,
    destroyOnClose: PropTypes.bool,
    modalVisible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  };


  // 取消
  handleCancel = () => {
    if (this.props.handleCancel) {
      this.props.handleCancel(false);
    }
  };

  handleCancel = () => {
    if (this.props.handleCancel) {
      this.props.handleCancel(false);
    }
  };

  render() {
    const { title, modalVisible, width, children } = this.props;
    const footer = [
      <Button
        key="update"
        type="primary"
        onClick={() => {
          this.handleOk();
        }}
      >
        保存
      </Button>,
      <Button
        key="close"
        onClick={() => {
          this.handleCancel();
        }}
      >
        取消
      </Button>,
    ];;
    return (
      <Fragment>
        <Modal
          width={width}
          title={title}
          visible={modalVisible}
          onCancel={() => {
            this.handleCancel();
          }}
          footer={footer}
        >
          {[...children]}
        </Modal>
      </Fragment>
    );
  }
}

export default LoginSelCompany;
