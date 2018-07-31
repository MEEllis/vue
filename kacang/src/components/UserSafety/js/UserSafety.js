import React, { PropTypes } from 'react'
import {Button,Form,Input,Modal,Table,Col,Row,Icon,Cascader,message} from 'antd'
import FL from '../../../utils/FL'
import '../less/userSafety'
import * as icons from '../../Icon/js/Icon'
import Iconsafy from '../../IconUser/js/Iconsafy'
import JSEncrypt from 'jsencrypt'
import {
    Stage,      // 舞台
    Layer,      // 图层
    Text,       // 文本
    Arc,        // 弧形
} from 'react-konva'
import Konva from 'konva'

import '../less/safety.less'

const FormItem = Form.Item;
const createForm = Form.create;
const confirm = Modal.confirm;
//重置密码
let ResetPwd =React.createClass({
    getInitialState(){
        return{
            visible:false,
            confirmDirty:false,
            status:false,
        }
    },
    setRestPwdModal(){
        this.setState({visible:true,status:false})
    },
    hideRestPwdModal(){
        this.setState({visible:false,status:false})
    },
    handleSubmit(){
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            const {props} = this.props;
            let encrypt = new JSEncrypt.JSEncrypt();
            encrypt.setPublicKey('MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAZe0dPjf3UzFUoLI8frCJuLjG5g+hX+M9uBHC2b49pd4oyH7icsxleyixTzZABhEx5+gJjpwI/ZQSnzdqWeY4bwIDAQAB');
            props.ChangepwdAction({
                 code:encodeURIComponent(''),
                 newPassword:encodeURIComponent(encrypt.encrypt(value.newpwd)),
                 oldPassword:encodeURIComponent(encrypt.encrypt(value.oldpwd)),
            })
            this.props.form.resetFields();
            this.setState({visible:false,status:true})
        })
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.props.changepwditems!=undefined&&this.state.status) {
            if(nextProps.props.changepwditems.Status=='200'){
                message.success('修改成功');
            }else{};
        }
    },
    //匹配两次密码是否相同
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    },
    checkPassword (rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newpwd')) {
          callback('两次输入密码不一样!');
        } else {
          callback();
        }
    },
    checkConfirm (rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['newpwdconfirm'], { force: true });
        }
        callback();
    },

    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:6},
            wrapperCol:{span:18}
        }

        return(
            <div>
                <a href='javascript:;' onClick={this.setRestPwdModal} className='cz_a'>重置</a>
                <Modal
                    title='重置密码'
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.hideRestPwdModal}
                    >
                    <Form horizontal>
                        <FormItem label='原登录密码' {...formItemLayout} hasFeedback>
                            {getFieldDecorator('oldpwd',{rules:[
                              {required:true,message:'请输入密码'},
                              {pattern: /^[a-zA-Z0-9!@#$%^&*.,]{6,20}$/,message:'由6~20数字、字母、符号组成'},
                            ]})(
                            <Input placeholder='请输入原登录密码' />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='新登录密码' hasFeedback>
                            {getFieldDecorator('newpwd',{
                                rules: [
                                    {required: true, message: '请输入密码'},
                                    {pattern: /^[a-zA-Z0-9!@#$%^&*.,]{6,20}$/,message:'由6~20数字、字母、符号组成'},
                                    {validator: this.checkConfirm}
                                ]
                            })(
                                <Input type="password" placeholder='请输入登录密码'/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='新登录密码确认' hasFeedback>
                            {getFieldDecorator('newpwdconfirm',{
                                rules: [
                                    {required: true, message: '请输入密码' },
                                    {validator: this.checkPassword}
                                ],
                            })(
                                <Input type="password" placeholder='确认密码' onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
})
ResetPwd=createForm()(ResetPwd)


//画图
let MyCircleReact=React.createClass({
      getInitialState(){
          return{
              circleLength:0,
          }
      },
        componentWillReceiveProps(nextProps){

          const progress = this.refs.progress;
          let count=42;
          //如果微信绑定过了
          if(nextProps.props.isbindWeichat.itemState&&nextProps.props.isbindphoneItems.itemState&&nextProps.props.getWeichatVerify)
          {
              if(nextProps.props.isbindWeichat.itemState.flag)
                count+=84;
              //如果手机绑定了
              if(nextProps.props.isbindphoneItems.itemState.flag)
                count+=42;
              //如果开启微信登录验证
              if(nextProps.props.getWeichatVerify.Data.Context)
                count+=112;

              var tween = new Konva.Tween({
                node: progress,
                duration: 1,
                angle:count
              });
              tween.play();
          }

        },
        render(){
        return(
          <Stage
               width={200}
               height={200}
               className='safety-stage'
               >
                   <Layer>
                       <Arc
                           // 内环背景
                           angle={280}
                           rotation={130}
                           innerRadius={83}
                           outerRadius={83}
                           x={100}
                           y={100}
                           stroke='#fff'
                           opacity={0.5}
                           strokeWidth={1}
                           dash={[1, 4]}
                           // lineJoin='round'
                           lineCap='round'
                       />
                       <Arc
                           // 进度条背景
                           angle={280}
                           rotation={130}
                           innerRadius={95}
                           outerRadius={95}
                           strokeWidth={3}
                           x={100}
                           y={100}
                           stroke='#fff'
                           opacity={0.5}
                           lineJoin='round'
                       />
                       <Arc
                           ref="progress"
                           angle={0}
                           rotation={130}
                           innerRadius={95}
                           outerRadius={95}
                           strokeWidth={10}
                           x={100}
                           y={100}
                           stroke='#14f2f5'
                           lineJoin='round'
                       />
                       <Text
                           text='安全指数'
                           fontSize={22}
                           fill='#fff'
                           width={200}
                           align='center'
                           y={90}
                       />
                   </Layer>
            </Stage>
        )}
})

let UserSafety = React.createClass({
    getInitialState(){
        return{
            showWechatPoint:false,
            phoneModalVisible:false,
            phone:this.props.getphoneItems,
            circleLength:0,
            getVerifyCode:'获取验证码',
            isSendCode:true
        }
    },
    setPhoneModal(){
        this.setState({phoneModalVisible:true,})
    },
    hidePhoneModal(){
        this.setState({phoneModalVisible:false,})
    },
    handleSubmit(){
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            const {props} = this;
            //如果绑定了手机号
            if(props.getphoneItems.Data.Context)
            {
              //调用解绑接口操作
              props.UnbindPhoneAction({
                    cellphone:value.phone,
                    code:value.phonecode
              })
            }
            //如果没有绑定手机号
            else
            {
              props.BindPhoneAction({
                    cellphone:value.phone,
                    code:value.phonecode
              })
            }

            this.props.form.resetFields();
            this.setState({phoneModalVisible:false,})
        })
    },
    getPhoneCode(){
        //如果定时器不存在则执行发送验证码操作
        if(this.state.isSendCode)
        {
          //表示已经发送了验证码
          this.setState({
            isSendCode:false
          });
          var that=this;
          let time=60;
          //定时器
          let timer=setInterval(function(){
            time--;
            that.setState({
              getVerifyCode:'重新获取'+time+'s'
            });
            //如果为0
            if(!time)
            {
              clearInterval(timer);
              timer=null;
              that.setState({
                getVerifyCode:'获取验证码'
              });
              //设置定时器不存在
              that.setState({
                isSendCode:true
              });
            }
          },1000);
          //调用发送验证码
          const {props} = this;
          props.SendPhoneCodeAction({
              phone:document.getElementById('phone').value,
          });
        }
    },
    componentWillMount(){
        this.props.IsBindPhoneAction({

        })
        this.props.GetPhoneAction({

        })
        this.props.IsBindweichatAction({

        })
        this.props.getLastLoginTime()

        this.props.GetWeichatVerifyAction()
    },
    setWechatPoint(){
        if(this.state.showWechatPoint){
            this.setState({showWechatPoint:false})
        }else{
            this.setState({showWechatPoint:true})
        }
    },
    componentDidUpdate(){
        if (this.props.bindphoneItems!=undefined) {
            if (this.props.bindphoneItems.Status=='200') {
                setTimeout(function(){
                    document.location.reload();
                },3000)
            }
        }
        if (this.props.unbindphoneItems!=undefined) {
            if (this.props.unbindphoneItems.Status=='200') {
                setTimeout(function(){
                    document.location.reload();
                },3000)
            }
        }

    },
    render () {
        const {props} = this;
        let phone=''
        if (this.props.getphoneItems!=undefined) {
            if (this.props.getphoneItems.Data!=undefined) {
                phone=this.props.getphoneItems.Data.Context
            }
        }
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol:{span:6},
            wrapperCol:{span:18}
        }
        if(!this.props.time){
            return false
        }
        return (
          <div>
          <MyCircleReact props={props}/>
              <ul className='safety-form'>
                  <li className='header'>
                      <Col sm={3}>
                          <div>安全中心</div>
                      </Col>
                      <Col sm={8}>
                          <div>上次登录时间：<span>{this.props.time.Data.Context}</span></div>
                      </Col>
                  </li>
                  <li>
                      <Col sm={3}>
                          <Iconsafy  glyphIcon={icons.password}  color='green'/>
                          {/* <i className='password'></i>  */}
                          <div>登录密码</div>
                      </Col>
                      <Col sm={18}>
                          <div>您登录卡仓网时需要输入的密码。</div>
                      </Col>
                      <Col sm={2}>
                          {/* <div><a href="javascript:;" onClick={this.resetPassword}>[重置]</a></div> */}
                           <ResetPwd props={this.props} items={this.props.isbindphoneItems}/>
                      </Col>
                  </li>
                  <li>
                      <Col sm={3}>
                          {/* <i className='cellphone'></i> */}
                          <Iconsafy  glyphIcon={icons.cellphone}  color='green'/>
                          <div>手机号</div>
                      </Col>
                      <Col sm={18}>
                          <div>绑定手机号后，您可以绑定微信公众号，这样能将帐号安全提升到最高级别。</div>
                      </Col>
                      <Col sm={2}>
                          {/* <BindPhone props={this.props}/> */}
                          <div>
                              {/* <a href='javascript:;' onClick={this.setPhoneModal}>[未绑定]</a> */}
                              <a style={{cursor:'default'}} className={this.props.isbindphoneItems.itemState.flag?'phonebading':'phoneunbading'}>{this.props.isbindphoneItems.itemState.sm}</a><span className='shuxian'>|</span><a href='javascript:;' onClick={this.setPhoneModal} id='bindcode' >{this.props.isbindphoneItems.itemState.text}</a>
                              <Modal
                                  title={this.props.isbindphoneItems.itemState.flag?'解绑手机':'绑定手机'}
                                  visible={this.state.phoneModalVisible}
                                  onOk={this.handleSubmit}
                                  onCancel={this.hidePhoneModal}
                                  >
                                  <Form horizontal>
                                      <FormItem label='您的手机号' {...formItemLayout}>
                                          {getFieldDecorator('phone',{
                                              initialValue:phone
                                          })(
                                              <Input placeholder='请输入您的手机号' disabled={this.props.isbindphoneItems.itemState.flag} id='test'/>
                                          )}
                                      </FormItem>
                                          <Row>
                                              <Col sm={18}>
                                                  <FormItem label='您收到的验证码' labelCol={{span:8}} wrapperCol={{span:16}}>
                                                      {getFieldDecorator('phonecode')(
                                                          <Input placeholder='请输入您收到的验证码'/>
                                                      )}
                                                  </FormItem>
                                              </Col>
                                              <Col sm={6}>
                                                  <Button type='primary' className='getPhoneCode' size='large' onClick={this.getPhoneCode}>{this.state.getVerifyCode}</Button>
                                              </Col>
                                          </Row>

                                  </Form>
                              </Modal>
                          </div>

                      </Col>
                  </li>
                  <li style={{height:100}}>
                      <Col sm={3}>
                          {/* <i className='wechatIcon'></i> */}
                          <Iconsafy  glyphIcon={icons.wechat}  color='green'/>
                          <div>微信公众号</div>
                      </Col>
                      <Col sm={18}>
                          <div>1)	绑定微信后，您的登录信息、信息修改等重要信 息发生变化时，将第一时间通知到您微信；
                              <br/>
                              2)	如果开启微信登录验证，登录验证码也会随微信公众号发送到您的安全设备。
                          </div>
                      </Col>
                      <Col sm={2}>
                          <div><a style={{cursor:'default'}} className={this.props.isbindWeichat.itemState.flag?'phonebading':'phoneunbading'}>{this.props.isbindWeichat.itemState.sm}</a><span className='shuxian'>|</span>
                              <a href="javascript:;" onClick={this.setWechatPoint} id='isbindweichat'>{this.props.isbindWeichat.itemState.text}</a></div>
                      </Col>
                  </li>
                  <li className='bind-wechat' style={{display:this.state.showWechatPoint?'block':'none'}}>
                      <Col sm={6}>
                          <div>
                              <i className='bindweixin1'></i>
                              <p>1.请使用微信扫描上方二维码，关注福禄帐号管家微信公众号</p>
                          </div>
                      </Col>
                      <Col sm={6}>
                          <div>
                              <i className='bindweixin2'></i>
                              <p>2.在帐号管理中找到我的帐号</p>
                          </div>
                      </Col>
                      <Col sm={6}>
                          <div>
                              <i className='bindweixin3'></i>

                              <p>3.输入帐号密码，完成绑定</p>
                          </div>
                      </Col>
                      <Col sm={6}>
                          <div>
                              <i className='bindweixin4'></i>
                              <p>4.微信提示绑定成功后，刷新当前页面</p>
                          </div>
                      </Col>
                  </li>
              </ul>
            </div>
        )
    }
})
UserSafety = createForm()(UserSafety)
export default UserSafety
