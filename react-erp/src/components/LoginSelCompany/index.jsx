import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Select } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
/**
 * 模态框： 公司选择
 * 
 * 
 */
class LoginSelCompany extends React.PureComponent {
  static defaultProps = {
    companyList: [],
    width: 620,
    destroyOnClose: true, // (关闭时销毁 Modal 里的子元素) boolean	false
    modalVisible: false, // 对话框是否可见	boolean	false
    handleOk: () => { },
    handleCancel: () => { },
  };
  // 属性类型检查
  static propTypes = {
    companyList: PropTypes.array,
    width: PropTypes.number,
    destroyOnClose: PropTypes.bool,
    modalVisible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  };

  state = {
    confirmLoading: false,
  }

  endClose = () => {
    this.setState({ confirmLoading: false });
}
  // 取消
  handleCancel = () => {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  };

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (this.props.handleOk) {
        this.setState({
          confirmLoading: true,
        });
        this.props.handleOk(fieldsValue,()=>{
          this.endClose();
        });
      }
    });
  };

  afterClose=()=>{
    this.endClose();
  }

  render() {
    const { modalVisible, width, companyList, destroyOnClose } = this.props;
    const { confirmLoading } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const handleOk = (e) => {

    };
  
     
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Modal
          width={width}
          title='公司选择'
          visible={modalVisible}
          destroyOnClose={destroyOnClose}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          afterClose={this.afterClose}
        >
          <Form onSubmit={handleOk}>
            <FormItem
              {...formItemLayout}
              label="公司名称"
              hasFeedback
            >
              {getFieldDecorator('select', {
                rules: [
                  { required: true, message: '请选择公司!' },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择公司"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {companyList.map(item => (
                    <Option key={item.id} value={item.id} >{item.name}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Form>

          {/* {React.Children.map(children, (child, i) => {
           return child
        })} */}
        </Modal>
      </Fragment>
    );
  }
}


export default Form.create()(LoginSelCompany)
