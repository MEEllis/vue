import React, { Fragment } from 'react';
import { Row, Col, Form, Icon, Input, Button, Card, Select } from 'antd';
import './login.less';
//import noise from '@/utils/noise';
import { loginByUsername } from 'api';
import LoginSelCompany from '@/components/LoginSelCompany';
import logo from '@/logo.png';
// import { setToken, getToken } from '@/utils/token'

const FormItem = Form.Item;
const { Meta } = Card;
const { Option } = Select;

class Login extends React.PureComponent {
    state = {
        loading: false,
        companyList: [{id:-1,name:'ccc'}],
        companyModalShow: false,
    }
    startLogin = () => {
        this.setState({ loading: true });
    }
    endLogin = () => {
        this.setState({ loading: false });
    }
    handleSubmit = (e) => {
        const { history } = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.startLogin();
                const userName = values.userName;
                const password = values.password;
                try {
                    const res = await loginByUsername(userName, password);
                    this.endLogin();
                    const data = res.data;
                    this.setState({
                        companyModalShow: true,
                        companyList: data.data.companyList
                    });
                }
                catch (e) {

                }
            }
        });
    }
    handleSelCompanyChange = () => {

    }
    componentWillMount() {
        const { history } = this.props;
        // let token = getToken();
        // if (token) {
        //     history.push('/');
        // }
    }
    componentDidMount() {
        setTimeout(() => {
            let loading = document.getElementById("StartLoading");
            loading && document.body.removeChild(loading);
        }, 200);
    }
    render() {
        const { companyList } = this.state
        const { getFieldDecorator } = this.props.form;
        const form = <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem
                hasFeedback
            >
                {getFieldDecorator('userName', {
                    initialValue: 'admin',
                    rules: [{ required: true, message: '请输入登录账号!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </FormItem>
            <FormItem
                hasFeedback
            >
                {getFieldDecorator('password', {
                    initialValue: '123',
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
                    登录
            </Button>
            </FormItem>
        </Form>;
        const OptionItems = companyList.map((item) =>{
            return  (<Option value={item.id} >{item.name}</Option>)
        });
        console.log(OptionItems)
        return (
            <Fragment>
                <div className="login-container">
                    <canvas id="noise-canvas"></canvas>
                    <Row type="flex" justify="center" align="middle">
                        <Col>
                            <Card
                                hoverable
                                bordered={false}
                                cover={<div style={{ padding: 10 }}>
                                    <img className="logo" alt="logo" src={logo} />
                                    {form}
                                </div>}
                            >
                                <Meta
                                    avatar={<Icon type="ant-design" style={{ color: '#1890ff', fontSize: 28 }} />}
                                    title="云盛erp"
                                    description="专注手机领域的ERP"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <LoginSelCompany modalVisible={this.state.companyModalShow} title="公司选择">
                aaa
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择公司"
                        optionFilterProp="children"
                        onChange={this.handleSelCompanyChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <OptionItems></OptionItems>
                    </Select>
                </LoginSelCompany>
            </Fragment>
        )
    }
}

export default Form.create()(Login)