import React, {Component,Fragment} from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import style from './Login.less';
import Login from '../../components/Login/index';
import ModalDrag from '../../components/ModalDrag/index';
import Draggable from 'react-draggable';
import DragM from 'dragm';
import { Modal,Card } from 'antd';

const { UserName, Password, Submit } = Login;

class BuildTitle extends React.Component {
    updateTransform = transformStr => {
      const header =  $(this.modalDom).find('.ant-modal-header')
      if(header.offset().top<0 ||header.offset().left<0){
     
          return;
          $('.ant-modal-header').offset()
      }else{
        this.modalDom.style.transform = transformStr;
      }
     
    };
    componentDidMount() {
      const node= ReactDOM.findDOMNode(this)
      this.modalDom= $(node).closest(".ant-modal")[0]
    }
    render() {
      const { title } = this.props;
      return (
        <DragM updateTransform={this.updateTransform}>
          <div>{title}</div>
        </DragM>
      );
    }
  }
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
        const title = (
            <BuildTitle  title="公司选择 Modal" />
          );
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
                <Modal title={title}  visible={true} >
                        <div>
                            ccccc
                        </div>
               </Modal> 
               <Modal title={title}  visible={false} >
                        <div>
                            dddd
                        </div>
               </Modal> 
               <Modal title={title}  visible={false} >
                        <div>
                            eeeee
                        </div>
               </Modal> 
                <Draggable handle=".ant-modal-header" bounds='body'>
                    <Modal title='公司选择' visible={false} >
                        <div>
                            ccccc
                        </div>
                    </Modal> 
                </Draggable>
                <Draggable handle=".ant-card-head" bounds='body'>
                    <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Draggable>
          </Fragment>
        );
    }
}
