import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Modal, message, Badge } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './sellingPoint.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const disableMap = ['success', 'error'];
const disableText = ['启用', '禁用'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({
        sellingName: fieldsValue.sellingName,
        sellingRemark: fieldsValue.sellingRemark,
      });
    });
  };
  return (
    <Modal
      width={620}
      title="产品卖点"
      visible={modalVisible}
      destroyOnClose={true} // eslint-disable-line
      onCancel={() => {
        handleModalVisible();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            handleModalVisible();
          }}
        >
          取消
        </Button>,
        <Button
          key="submitAdd"
          type="primary"
          onClick={() => {
            okHandle(0);
          }}
        >
          保存并新增
        </Button>,
        <Button
          key="submitClose"
          type="primary"
          onClick={() => {
            okHandle(1);
          }}
        >
          保存并关闭
        </Button>,
      ]}
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

@connect(({ sellingPoint, loading }) => ({
  sellingPoint,
  loading: loading.models.sellingPoint,
}))
@Form.create()
export default class sellingPointPage extends PureComponent {
  state = {
    modalVisible: false,
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

  handleModalVisible = flag => {
    this.setState({
      modalVisible: flag,
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
  handleAdd = fieldsValue => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sellingPoint/add',
      payload: fieldsValue,
    });
    message.success('添加成功');
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
    const { selectedRows, modalVisible } = this.state;
    const { pagination } = data;
    const columns = [
      {
        title: '序号',
        dataIndex: 'number',
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
        dataIndex: 'sellingCode',
      },
      {
        title: '卖点名称',
        dataIndex: 'sellingName',
      },
      {
        title: '是否禁用',
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
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>修改</Button>
                  <Button>禁用</Button>
                  <Button>启用</Button>
                  <Button type="danger">删除</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
