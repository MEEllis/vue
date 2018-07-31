import React from 'react';
import {
  Form,
  Input,
  Select,
  message,
  Modal
} from 'antd';
import PropTypes from 'prop-types';
import FL from '../../../utils/FL';
import '../../CardType/less/cardType.less';

const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;
class StockListUpdate extends React.Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    hideUpdateModal: PropTypes.func.isRequired,
    updateStock: PropTypes.func.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }).isRequired,
    currentStock: PropTypes.objectOf(PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })).isRequired,
    stockInfoUpdata: PropTypes.objectOf(PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })).isRequired,
    updateStockResult: PropTypes.shape({
      Status: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    stock: undefined,
    updateStockResult: undefined,
    stockInfoUpdata: undefined
  };
  constructor(props) {
    super(props);
    this.state = {
      PostData: {
        condition: {
          PageIndex: 1,
          PageNumber: 1,
          PageSize: 5
        }
      },
      stockInfoUpdata: this.props.currentStock,
      modalVisibleUpdata: false,
      reload: false
    };
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { updateStockResult } = nextProps;
    if (updateStockResult !== props.updateStockResult) {
      if (updateStockResult.Status === 200) {
        this.props.change();
      }
      props.hideUpdateModal();
    }
  }
  submitUpdata = () => {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return false;
      }
      const postData = {
        remark: value.Remark,
        name: value.Name,
        id: this.state.stockInfoUpdata.Id,
        warningCount: value.WarningCount
      };
      this.props.updateStock(postData);
    });
  }

  render() {
    const { props } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="modal-demo-content">
        <Modal
          visible
          title="修改库存信息"
          onOk={this.submitUpdata}
          cancelText="关闭"
          onCancel={() => { props.hideUpdateModal(); }}
        >
          <Form style={{
            marginBottom: 10
          }}
          >
            <FormItem label="库存名称" {...FL.FORMLAYOUTMIN}>

              {getFieldDecorator('Name', {
                initialValue: this.state.stockInfoUpdata.Name,
                rules: [
                  {
                    required: true,
                    message: '请输入库存名称'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...FL.FORMLAYOUTMIN} label="库存性质">
              {getFieldDecorator('Nature', { initialValue: `${this.state.stockInfoUpdata.Nature}` })(
                <Select
                  disabled
                >
                  <Option value="1">普通库存</Option>
                  <Option value="2">库存包</Option>
                  <Option value="3">区域库存</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...FL.FORMLAYOUTMIN} label="库存类型">
              {getFieldDecorator('Type', { initialValue: `${this.state.stockInfoUpdata.StockType}` })(
                <Select disabled>
                  <Option value="1">卡密</Option>
                  <Option value="2">在线</Option>
                </Select>
              )}
            </FormItem>
            {this.state.stockInfoUpdata.Nature == '2'
              ? '' : this.state.stockInfoUpdata.Nature == '1' ?
                <div>
                  <FormItem label="库存面值" {...FL.FORMLAYOUTMIN}>
                    {getFieldDecorator('FaceValue', { initialValue: this.state.stockInfoUpdata.FaceValue })(<Input disabled={true} />)}
                  </FormItem>
                  <FormItem label="报警数量" {...FL.FORMLAYOUTMIN}>
                    {getFieldDecorator('WarningCount', {
                      initialValue: this.state.stockInfoUpdata.WarningCount,
                      rules: [
                        {
                          required: true,
                          message: '请输入报警数量'
                        },
                        {
                          pattern: /^[1-9]\d*$/,
                          message: '报警数量只能输入数字，请重新输入'
                        }
                      ]
                    })(<Input />)}
                  </FormItem>
                </div> : <div>
                  <FormItem label="库存面值" {...FL.FORMLAYOUTMIN}>
                    {getFieldDecorator('FaceValue', { initialValue: this.state.stockInfoUpdata.FaceValue })(<Input disabled={true} />)}
                  </FormItem>

                </div>
            }

            <FormItem label="备注说明" {...FL.FORMLAYOUTMIN}>
              {getFieldDecorator('Remark', { initialValue: this.state.stockInfoUpdata.Remark })(<Input type={'textarea'} />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default createForm()(StockListUpdate);
