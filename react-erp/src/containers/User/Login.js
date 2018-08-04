import React, {Component,Fragment} from 'react';
import { connect } from 'dva';
import style from './Login.less';
import Login from '../../components/Login/index';
import ModalDrag from '../../components/ModalDrag/index';
import { Modal } from 'antd';

const { UserName, Password, Submit } = Login;


@connect(({ login}) => ({
    login
}))
export default class LoginPage extends Component {
    state={
        status:'ok'
    }
    // 登录
    handleSubmit = (err, values) => {
        const { dispatch } = this.props;
        if (!err) {
            console.log(111111)
          dispatch({
            type: 'login/login',
            payload: {
              ...values,
            },
          }).then(() => {

          })
        }
    };
    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };
    render() {
        const { status } = this.state;
        return (
            <Fragment>
                <div className={style.loginForm}>
                    <Login onSubmit={this.handleSubmit}>
                    {status === 'error' && this.renderMessage('账户或密码错误')}
                    <UserName name="userName" placeholder="请输入用户名" />
                    <Password name="password" placeholder="请输入密码" />
                    <Submit >登录</Submit>
                    </Login>
                </div>
                <ModalDrag>
                    <Modal visible={true} >
                            aaaaaaaaa
                    </Modal>
                </ModalDrag>
          </Fragment>
        );
    }
}
