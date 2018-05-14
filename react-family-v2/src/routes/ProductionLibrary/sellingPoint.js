import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, message, Badge } from 'antd';
import StandardTable from '../../components/StandardTable';
import EntityModal from '../../components/entityModal';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './sellingPoint.less';

const FormItem = Form.Item;
const { confirm } = Modal;
const disableMap = ['success', 'error'];
const disableText = ['启用', '禁用'];

const CreateForm = Form.create({
  mapPropsToFields(props) {
    const { modalState, selectedRows, modalVisible } = props;
    if (modalState === 1 && modalVisible && selectedRows.length === 1) {
      return {
        sellingCode: Form.createFormField({
          value: selectedRows[0].sellingCode,
        }),
        sellingName: Form.createFormField({
          value: selectedRows[0].sellingName,
        }),
        sellingRemark: Form.createFormField({
          value: selectedRows[0].sellingRemark,
        }),
      };
    }
  },
})(props => {
  const { title, modalState, modalVisible, handleAdd, handleUpdate, handleClose, form } = props;
  const handleOk = flag => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (handleAdd) {
        handleAdd(
          {
            sellingName: fieldsValue.sellingName,
            sellingRemark: fieldsValue.sellingRemark,
          },
          flag
        );
      }
    });
  };
  const HandleUp = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const { selectedRows } = props;
      if (handleUpdate) {
        handleUpdate({
          key: selectedRows[0].key,
          sellingName: fieldsValue.sellingName,
          sellingRemark: fieldsValue.sellingRemark,
        });
      }
    });
  };
  return (
    <EntityModal
      title={title}
      modalState={modalState}
      modalVisible={modalVisible}
      handleAdd={handleOk}
      handleUpdate={HandleUp}
      handleClose={handleClose}
    >
      <Row>
        <Col span={8}>
          <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="卖点编码">
            {form.getFieldDecorator('sellingCode')(<Input placeholder="自动编码" disabled />)}
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="卖点名称">
            {form.getFieldDecorator('sellingName', {
              rules: [{ required: true, message: '请输入卖点名称' }],
            })(<Input placeholder="请输入卖点名称" />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="备注">
            {form.getFieldDecorator('sellingRemark')(<Input placeholder="请输入备注" />)}
          </FormItem>
        </Col>
      </Row>
    </EntityModal>
  );
});

@connect(({ sellingPoint, loading }) => {
  return {
    sellingPoint,
    loading: loading.effects['sellingPoint/fetch'],
    disbaleLoading: loading.effects['sellingPoint/updateDisbale'],
  };
})
@Form.create()
export default class sellingPointPage extends PureComponent {
  state = {
    modalVisible: false, // 是否显示模态框
    modalState: 0, // 模态框的状态
    disable: 0, // 启用 ，禁用
    selectedRows: [],
    formValues: {},
  };
  // 组件挂载dom后
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'sellingPoint/fetch',
    });
  }

  // 重置
  handleFormReset() {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'sellingPoint/fetch',
    });
  }
  // 查询
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        formValues: fieldsValue,
      });

      dispatch({
        type: 'sellingPoint/fetch',
        payload: fieldsValue,
      });
    });
  };
  // 选择行
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleAdd = (fieldsValue, flag) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'sellingPoint/add',
      payload: fieldsValue,
      callback: () => {
        message.success('添加成功');
        if (flag === 1) {
          this.handleModalVisible(false);
        }
        dispatch({
          type: 'sellingPoint/fetch',
          payload: formValues,
        });
      },
    });
  };

  handleUpdate = fieldsValue => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'sellingPoint/update',
      payload: fieldsValue,
      callback: () => {
        message.success('修改成功');
        this.handleModalVisible(false);
        this.setState({
          selectedRows: [],
        });
        this.handleModalVisible(false);
        this.setState({
          selectedRows: [],
        });
        dispatch({
          type: 'sellingPoint/fetch',
          payload: formValues,
        });
      },
    });
  };

  handleDisable = flag => {
    const { dispatch } = this.props;
    const { selectedRows, formValues } = this.state;
    this.setState({
      disable: flag,
    });
    dispatch({
      type: 'sellingPoint/updateDisbale',
      payload: {
        key: selectedRows.map(row => row.key).join(','),
        disable: flag,
      },
      callback: () => {
        message.success('修改成功');
        dispatch({
          type: 'sellingPoint/fetch',
          payload: formValues,
        });
      },
    });
  };

  handleDelete = () => {
    confirm({
      title: '你确定是否删除?',
      onOk: () => {
        const { dispatch } = this.props;
        const { selectedRows, formValues } = this.state;

        dispatch({
          type: 'sellingPoint/delete',
          payload: {
            key: selectedRows.map(row => row.key).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
            message.success('删除成功');
            dispatch({
              type: 'sellingPoint/fetch',
              payload: formValues,
            });
          },
        });
      },
      onCancel() {},
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: flag,
    });
  };

  handleModalOpen = sign => {
    if (sign === 1) {
      const { selectedRows } = this.state;
      if (selectedRows.length !== 1) {
        message.warning('只能修改一条数据！');
        return;
      }
    }
    this.handleModalVisible(true);
    this.setState({
      modalState: sign,
    });
  };

  handleStandardTableChange = ({ pagination }) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const payload = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    dispatch({
      type: 'sellingPoint/fetch',
      payload,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键字">
              {getFieldDecorator('keyword')(<Input placeholder="卖点编码,卖点名称模糊过滤" />)}
            </FormItem>
          </Col>
          <Col md={{ span: 8, offset: 8 }} sm={{ span: 24, offset: 0 }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { sellingPoint: { data }, loading, disbaleLoading } = this.props;
    const { selectedRows, modalVisible, modalState, disable } = this.state;
    const { pagination } = data;
    const isDisable = selectedRows.length > 0 ? '' : 'disabled';
    const columns = [
      {
        title: '序号',
        dataIndex: 'number',
        width: 100,
        render: (text, record, index) => {
          if (pagination.current) {
            return (pagination.current - 1) * pagination.pageSize + index + 1;
          } else {
            return index + 1;
          }
        },
      },
      {
        title: '卖点编码',
        width: 150,
        dataIndex: 'sellingCode',
      },
      {
        title: '卖点名称',
        width: 150,
        dataIndex: 'sellingName',
      },
      {
        title: '是否禁用',
        width: 150,
        dataIndex: 'disable',
        render(val) {
          return <Badge status={disableMap[val]} text={disableText[val]} />;
        },
      },
      {
        title: '备注',
        dataIndex: 'sellingRemark',
      },
    ];
    const entityModalProps = {
      title: '产品卖点',
      modalState,
      modalVisible,
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleClose: this.handleModalVisible,
      selectedRows,
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalOpen(0)}>
                新建
              </Button>
              <span>
                <Button disabled={isDisable} onClick={() => this.handleModalOpen(1)}>
                  修改
                </Button>
                <Button
                  disabled={isDisable}
                  loading={disable === 1 && disbaleLoading}
                  onClick={() => this.handleDisable(1)}
                >
                  禁用
                </Button>
                <Button
                  disabled={isDisable}
                  loading={disable === 0 && disbaleLoading}
                  onClick={() => this.handleDisable(0)}
                >
                  启用
                </Button>
                <Button disabled={isDisable} onClick={() => this.handleDelete()} type="danger">
                  删除
                </Button>
              </span>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              scroll={{ y: 340 }}
            />
          </div>
        </Card>
        <CreateForm {...entityModalProps} />
      </PageHeaderLayout>
    );
  }
}
