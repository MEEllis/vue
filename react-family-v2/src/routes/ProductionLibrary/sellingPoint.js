import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, message, Badge } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './sellingPoint.less';

const FormItem = Form.Item;
const { confirm } = Modal;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const disableMap = ['success', 'error'];
const disableText = ['启用', '禁用'];

const CreateForm = Form.create({
  mapPropsToFields(props) {
    const { modalState, selectedRows, modalVisible } = props;
    if (modalState === 'update' && modalVisible) {
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
  const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, modalState } = props;
  const okHandle = flag => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({
        sellingName: fieldsValue.sellingName,
        sellingRemark: fieldsValue.sellingRemark,
      });
      if (flag === 1) {
        handleModalVisible();
      }
    });
  };
  const HandleUpdate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const { selectedRows } = props;
      handleUpdate({
        key: selectedRows[0].key,
        sellingName: fieldsValue.sellingName,
        sellingRemark: fieldsValue.sellingRemark,
      });
      handleModalVisible();
    });
  };
  let footer;
  let title = '';
  if (modalState === 'update') {
    title = `修改`;
    footer = [
      <Button
        key="update"
        type="primary"
        onClick={() => {
          HandleUpdate();
        }}
      >
        保存
      </Button>,
      <Button
        key="close"
        onClick={() => {
          handleModalVisible();
        }}
      >
        取消
      </Button>,
    ];
  } else {
    title = `新增`;
    footer = [
      <Button
        key="add"
        type="primary"
        onClick={() => {
          okHandle(0);
        }}
      >
        保存并新增
      </Button>,
      <Button
        key="addClose"
        type="primary"
        onClick={() => {
          okHandle(1);
        }}
      >
        保存并关闭
      </Button>,
      <Button
        key="close"
        onClick={() => {
          handleModalVisible();
        }}
      >
        取消
      </Button>,
    ];
  }

  return (
    <Modal
      width={620}
      title={`${title}产品卖点`}
      visible={modalVisible}
      destroyOnClose={true} // eslint-disable-line
      onCancel={() => {
        handleModalVisible();
      }}
      footer={footer}
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
    </Modal>
  );
});

@connect(({ sellingPoint, loading }) => {
  return {
    sellingPoint,
    loading: loading.models.sellingPoint,
  };
})
@Form.create()
export default class sellingPointPage extends PureComponent {
  state = {
    modalVisible: false, // 是否显示模态框
    modalState: 'add', // 模态框的状态
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

  handleAdd = fieldsValue => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'sellingPoint/add',
      payload: fieldsValue,
      callback: () => {
        message.success('添加成功');
        dispatch({
          type: 'sellingPoint/fetch',
          payload: formValues,
        });
      },
    });
  };

  handleUpdate = fieldsValue => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sellingPoint/update',
      payload: fieldsValue,
    });
    message.success('修改成功');
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: flag,
    });
  };

  handleModalOpen = sign => {
    if (sign === 'update') {
      const { selectedRows } = this.state;
      if (selectedRows.length !== 1) {
        message.warning('只能修改一条数据！');
        return;
      }
    }
    this.handleModalVisible(true);
    this.setState({
      modalState: sign === undefined ? 'add' : sign,
    });
  };

  handleDisable = disable => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    dispatch({
      type: 'sellingPoint/updateDisbale',
      payload: {
        key: selectedRows.map(row => row.key).join(','),
        disable,
      },
    }).then(response => {
      message.success(response);
    });
  };

  handleDelete = () => {
    confirm({
      title: '你确定是否删除?',
      onOk: () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;

        dispatch({
          type: 'sellingPoint/delete',
          payload: {
            key: selectedRows.map(row => row.key).join(','),
          },
        });
        message.success('删除成功');
      },
      onCancel() {},
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'sellingPoint/fetch',
      payload: params,
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
    const { sellingPoint: { data }, loading } = this.props;
    const { selectedRows, modalVisible, modalState } = this.state;
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

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalOpen()}>
                新建
              </Button>
              <span>
                <Button disabled={isDisable} onClick={() => this.handleModalOpen('update')}>
                  修改
                </Button>
                <Button disabled={isDisable} onClick={() => this.handleDisable(1)}>
                  禁用
                </Button>
                <Button disabled={isDisable} onClick={() => this.handleDisable(0)}>
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
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          modalState={modalState}
          selectedRows={selectedRows}
        />
      </PageHeaderLayout>
    );
  }
}
