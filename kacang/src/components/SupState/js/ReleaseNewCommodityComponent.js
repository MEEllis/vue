import React from 'react'
import {Button,Form,Input,Modal,Table,Tabs,DatePicker,Col,Row,Checkbox,Tooltip,message} from 'antd'
import '../less/releaseCommodity'
import Icon, {
    iDelete,
    iPost,
    iPostTo,

} from '../../Icon/js/Icon'
// import '../less/cardType.less'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'

const createForm = Form.create;
const FormItem = Form.Item;
const CheckboxGroup =  Checkbox.Group;

const PriceInput = React.createClass({
  getInitialState() {
    const value = this.props.value || {};
    return {
      number: value.number || 0
    };
  },
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  },
  handleNumberChange(e) {
    const number = e.target.value
    const reg = /^[0-9]*([.]{1}[0-9]*){0,1}$/
    if (!reg.test(number)){
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  },
  handleCurrencyChange(currency) {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  },
  triggerChange(changedValue) {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  },
  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
      </span>
    );
  },
});
let ReleaseNewCommodityComponent = React.createClass({

    getInitialState(){
        return{
            modalReleaseNewCommodity:false,
            ownerId:'34CF37F8-356D-4D45-84AE-243C02CF0F7E',
            dockProductId:'',
            name:'',
            price:'',
            channel:'',
            RELOAD:false,
        }
    },
    setReReleaseNewCommodity(){

        const {props} = this;
        let text = props.text[6];
        props.releaseNewAction({
            text
        })
        this.setState({modalReleaseNewCommodity:true,dockProductId:text})
    },
    hideDetailModal(){
        this.setState({modalReleaseNewCommodity:false})
    },
    handleSubmit(){
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            let selectChannel = value.channel[0]
            if(value.channel.length == 2){
                selectChannel = 3
            }else if(value.channel[0] == '0'){
                selectChannel = 1
            }else if(value.channel[0] == '1'){
                selectChannel = 2
            }
            this.props.form.resetFields();
            this.props.releaseNewSubmitAction({
                channel:selectChannel,
                dockProductId:this.state.dockProductId,
                name:value.name,
                ownerId:this.state.ownerId,
                price:value.price.number
            });
            this.setState({visible:false,name:value.name,price:value.price.number,channel:selectChannel,RELOAD:true,})
            this.hideDetailModal();
        })
    },
    checkPrice(rules,value,callback){
        if(value.number >0){
            callback();
            return ;
        }
        callback('请输入大于0的值')
    },
    componentDidUpdate(){
        const {RELOAD} = this.state;
        const {props} = this;
        if(props.submitStatus.Status == '200' && RELOAD){
            message.success('发布到新商品成功！')
            this.setState({RELOAD:false})
        }else if(props.submitStatus.Status != '200' && !!RELOAD &&                     props.submitStatus.Status){
            message.success('发布失败！')
        }

    },
    render(){
        const {props} = this;
        const {text,items} = props;
        const { getFieldDecorator } = props.form;
        const checkboxOptions=[{
                label:'一卡通',value:'0'
            },{
                label:'云接口',value:'1'
            }];
        const formItemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:16}
        }
        return(
            <span className='release-new'>
                <IconComponent title='发布到新商品' glyphIcon={iPost} click={this.setReReleaseNewCommodity} />

                {/* <Tooltip title='发布到新商品' arrowPointAtCenter>
                    <a href="javascript:;" onClick={this.setReReleaseNewCommodity}>
                        <Icon glyph={iPost} />
                    </a>
                </Tooltip> */}
                {/* <a href="javascript:;" onClick={this.setReReleaseNewCommodity}>发布到新商品</a> */}
                <Modal title="发布到新商品" width={600} visible={this.state.modalReleaseNewCommodity} onOk={this.handleSubmit} onCancel={this.hideDetailModal}>
                    <div className='release-new-commodity'>
                        <p className='show-prompt'><span>提示:</span>保留卡仓商品的基本属性（包括模板和API接口等内容），现在，您只需填写新的商品名称，售价即可发布为新的商品。</p>
                        <div className='show-detail'>
                            <div>
                                <p>{items.Name}</p>
                                <p>商品类型：{items.ProductType}</p>
                                <p>商品ID：{items.Code}</p>
                            </div>
                            <div>
                                <p>面值：{items.FaceValue}</p>
                                <p>售价：{items.Price}</p>
                            </div>
                        </div>
                        <div className='show-form'>
                            <Form horizontal>
                                <FormItem label="商品名称" {...formItemLayout}>
                                    {getFieldDecorator('name',{

                                        rules:[{
                                            required:true,message:'商品名称不能为空!'

                                        }]
                                    })(
                                        <Input placeholder=''/>
                                    )}
                                </FormItem>
                                <FormItem label="价格" {...formItemLayout}>
                                    {getFieldDecorator('price',{
                                            initialValue:{currency: 'rmb' },
                                            rules:[{
                                                validator:this.checkPrice
                                            }]
                                    })(
                                        <PriceInput />
                                    )}
                                </FormItem>
                                <FormItem label="销售渠道" {...formItemLayout}>
                                    {getFieldDecorator('channel',{
                                        initialValue:['0'],
                                        rules:[{type:'array',required:true,message:'请选择销售渠道'}]
                                    })(
                                        <CheckboxGroup options={checkboxOptions} />
                                    )}
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </Modal>

            </span>
        )
    }
})
ReleaseNewCommodityComponent = createForm()(ReleaseNewCommodityComponent);

// const ReleaseNewCommodityComponent = (props)=>{
//     return(
//         <ReleaseNewCommodityForm />
//     )
// }


export default ReleaseNewCommodityComponent
