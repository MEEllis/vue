import React, {Component,Fragment} from 'react';
import { connect } from 'dva';
import style from './Login.less';
import Login from '../../components/Login/index';
import { Modal,Select  } from 'antd';

const { UserName, Password, Submit } = Login;
const Option = Select.Option;
@connect(({login}) => ({
    login
}))
export default class LoginPage extends Component {
    state={
        status:'ok',
        companyVisible:false,
        selCompanyId:'',
        userName:'',
        password:''
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
            const {login:{companyList}} = this.props;
            if(Array.isArray(companyList)&&companyList.length>0){
                if(companyList.length===1){
                    this.setState({
                        selCompanyId:companyList[0].id,
                        userName: values.userName,
                        password: values.password,
                     })
                }else{
                    this.setState({
                        selCompanyId:companyList[0].id, 
                        companyVisible:true, 
                        userName: values.userName,
                        password: values.password,
                     })
                }
            }
          })
        }
    };
    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };
    companyOk=()=>{
         this.loginByCompany()
    }
    companyCancel=()=>{
        this.setState({
            companyVisible:false, 
         }) 
    }
    handleChange=(value)=>{
        this.setState({
            selCompanyId:value, 
         })
    }
    loginByCompany=()=>{
        const { dispatch } = this.props;
        const { selCompanyId,userName,password } = this.state;
        if(selCompanyId){
            dispatch({
            type: 'login/company',
                payload: {
                companyId:selCompanyId ,
                userName:userName ,
                password:password ,
                },
            })
        }
    }
    render() {
        const { status,companyVisible,selCompanyId } = this.state;
        const {login:{companyList}} = this.props;
      
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
               <Modal title='选择公司' onOk={this.companyOk}  onCancel={this.companyCancel} visible={companyVisible} >
                    <div style={{margin:'0 auto',textAlign:'center'}}>
                    公司名称:
                        <Select defaultValue={selCompanyId} style={{ width: 210 }} onChange={this.handleChange}>
                        {companyList.map(item =>{
                        return (<Option key={item.id} value={item.id} >{item.name}</Option> ) 
                        })} 
                    </Select>
                    </div>
               </Modal> 
            
          </Fragment>
        );
    }
}
