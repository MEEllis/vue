import React, { Fragment } from 'react';
import { Row, Col, Form, Icon, Input, Button, Card } from 'antd';
import './login.less';
//import noise from '@/utils/noise';
import { loginByUsername, loginByToken } from 'api';
import LoginSelCompany from '@/components/LoginSelCompany';
import logo from '@/logo.png';
import { setToken, getToken } from '@/utils/token'
const FormItem = Form.Item;
const { Meta } = Card;

class Login extends React.PureComponent {
    state = {
        userName: '',
        password: '',
        loading: false,
        companyList: [],
        companyModalShow: false,
    }
    startLogin = () => {
        this.setState({ loading: true });
    }
    endLogin = () => {
        this.setState({ loading: false });
    }
    getToken = async (companyId) => {
        const { history } = this.props;
        const { userName, password, companyModalShow } = this.state;
        const res = await loginByToken(userName, password, companyId);
        setToken(res.data.token);
        if (companyModalShow === true) {
            this.setState({ companyModalShow: false });
        }
        setTimeout(() => {
            history.push('/');
        }, 1000);
    }
    handleSubmit = (e) => {
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
                    const companyList = data.companyList;
                    this.setState({
                        companyList,
                        userName,
                        password,
                    });
                    if (companyList.length === 1) {
                        this.getToken(userName,password,companyList[0].id)
                    } else {
                        this.setState({
                            companyModalShow: true,
                        });
                    }

                }
                catch (e) {

                }
            }
        });
    }
    handleSelCompanyCancel = () => {
        this.setState({ companyModalShow: false });
    }
    handleSelCompanyOK = (fieldsValue) => {
        const companyId = fieldsValue.select;
        this.getToken(companyId)

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
        const { companyList, companyModalShow } = this.state
        const { getFieldDecorator } = this.props.form;
        const FormLogin = <Form onSubmit={this.handleSubmit} className="login-form">
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
                                    {FormLogin}
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
                <LoginSelCompany
                    modalVisible={companyModalShow}
                    handleOk={this.handleSelCompanyOK}
                    handleCancel={this.handleSelCompanyCancel}
                    companyList={companyList}
                >
                </LoginSelCompany>
            </Fragment>
        )
    }
}

export default Form.create()(Login)