import React from 'react'
import {Button,Form,Input,Modal,Table,Tabs,DatePicker,Col,Row,Cascader,Checkbox,Radio,Tooltip} from 'antd'
import '../less/showComplaintComponent'
import ShowDetailComponent from '../../../containers/ShowDetailComponent'
// import ShowDetailComponent from '../../showDetailComponent/js/ShowDetailComponent'
import Filter,{FilterItem} from '../../Filter/js/Filter'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import Icon, {
    iComplain,
} from '../../Icon/js/Icon'
// import '../less/cardType.less'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'

const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
let ShowComplaintComponent = Form.create()(React.createClass({
    getInitialState(){
        const {props} = this;
        return {
            modalComplaintVisible:false,
            complaintQuestion:1,
            hopeResult:1,
            radioValue:'',


            orderId:'',
            orderNo:'',
            supplierI:'',
            dealerId:'',
            type:'',
            orderStatus:'',
            cType:'',
            complaintId:'',
            orderPrice:'',
            complants:'',
            complaintHopeResult:'',

        }
    },
    componentWillMount() {
        const {props}=this;
    },
    showComplaintModal(){
        const {props} = this;
        props.showComplaintComponent({
            orderNo: props.orderNum,
            sourceSys: '1'
        })
        props.showOrderComplaintDetail({
            orderNo: props.orderNum
        })
        this.setState({modalComplaintVisible:true})
    },
    hideComplaintModal(){
        this.setState({modalComplaintVisible:false})
    },
    setComplaintQuestion(newState){
        this.setState({complaintQuestion:newState});
    },
    setHopeResult(newState){
        this.setState({hopeResult:newState});
    },
    componentDidUpdate(){
        const {props}=this;
    },
    componentDidMount(){
        const {props}=this;
        // if (props.complaintDetailItems) {
        //     if (props.complaintDetailItems.Result) {
        //
        //     }
        // }
    },
   onchangeRaio(e){
       this.setState({
           radioValue:e.target.value
       })
   },
    handleSubmit(){
        const {complaintDetailItems}=this.props;
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
        //    const {complaintDetailItems}=this.props;
           let formdata=''
           //mode=1 新增
           // mode=2 补充  status=0 || 1
           // Mode=3 查看
           // mode=4 再次投诉  status=2
           // mode=5 处理
           // mode=6 回复待查
            let methodName='ApplyComplant';
            let mode=1;
            let items=this.props.items || []
            if (items.length>0) {
              //获取status
              formdata=items[0].Items[0];
              let status=items[0].Items[0].Status
              if (items.length>1) {
                   formdata=items[items.length-1].Items[items[items.length-1].Items.length-1];
                   status=formdata.Status
              }
              //v1先判断url传参mode是否有值，没值先根据status给mode赋值
              //status:0未处理，1处理中，2已处理
              if (status=='0' || status=='1') {
                 mode='2'
              }
              if (status=='2') {
                  mode='4'
              }
              if (mode=='2') {
                   methodName='SupplementComplaint';
              }
              if(mode==4)
              {
                   methodName='AgainApplyComplant';
              }
            }
            else {
                 methodName='ApplyComplant';
            }
            this.props.requestComplant({
                'methodName':methodName,
                'orderId':complaintDetailItems.Id,
                'orderNo':complaintDetailItems.Code,
                'supplierId':complaintDetailItems.SupplierId,
                'dealerId':complaintDetailItems.DealerId,
                'type':'4',
                'orderStatus':complaintDetailItems.Status,
                'cType':'1',
                'complaintId':formdata!='undefined' && formdata!='' ? formdata.Id : '',
                'orderPrice':complaintDetailItems.DealPrice,
                'complants':value.residence.length > 0 ? value.residence[0] : '1',//投诉问题
                'complaintHopeResult':this.state.radioValue,
                'returnMoney':'0',
                'complaintContent':value.content
            })
            this.props.form.resetFields();
            this.setState({modalComplaintVisible:false});
        })
    },
    render(){

        const {props} = this;
        const {complaintDetailItems} =this.props || [];
        let radioData=complaintDetailItems.radioData.datas || []
        let data = props.items || [];
        if (data.length>0) {
            let formdata=data[0].Items[0]
            if (data.length>1) {
                 formdata=data[data.length-1].Items[data[data.length-1].Items.length-1];
            }
            if (this.state.radioValue!=formdata.ComplaintHopeResult) {
                this.setState({
                    radioValue:formdata.ComplaintHopeResult
                })
            }
        }
        let radioselect=(this.state.radioValue).toString()

        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol:{span:6},
            wrapperCol:{span:14}
        }
        const residences = [{
                value:'1',
                label:'可疑订单没有得到处理'
            },{
                value:'2',
                label:'超时未处理订单'
            },{
                value:'3',
                label:'充值成功但实际未到账或者部分到账'
            },{
                value:'4',
                label:'卡密错误或卡密不可用'
            }];
        return(
            <span>
                <IconComponent title={props.text} glyphIcon={iComplain} click={this.showComplaintModal} disabled={props.disabled} />
                {/* <a onClick={this.showComplaintModal}>{props.text}</a> */}
                <Modal title="订单投诉" width={840}
                    visible={this.state.modalComplaintVisible} onOk={this.handleSubmit}
                    onCancel={this.hideComplaintModal}>
                    <div className='showComplaintDiv'>
                        <div className='showComplaintLeft'>
                            <div className="showComplaintComponent-top">
                                <p>订单编号:<span style={{marginRight:30}}>{props.orderNum}</span>
                                   {/* <ShowDetailComponent text="查看详情" orderNum={props.orderNum} /> */}
                                </p>
                                <p className='order-status'><i></i><span>订单有效</span></p>
                            <p className='total-money'><i></i><span>{complaintDetailItems.Total}</span>元 = <span>{complaintDetailItems.OrderCount}</span>(个 ) * <span><em>{complaintDetailItems.DealPrice}</em></span>元</p>
                                <p className='purchase-money'>进货价格: <span>{complaintDetailItems.TotalSupPrice}</span>元 = <span>{complaintDetailItems.OrderCount}</span>(个 ) * <span><em>{complaintDetailItems.CostPrice}</em></span>元</p>
                                <p>{complaintDetailItems.ProductName}</p>
                            </div>
                            <div className="showComplaintComponent-body">
                                    <Form horizontal>
                                        <FormItem {...formItemLayout} label="投诉问题">
                                            {getFieldDecorator('residence', {
                                                initialValue: [complaintDetailItems.complaintStatus],
                                                rules: [{ type: 'array', required: true}],
                                            })(
                                                <Cascader options={residences} disabled={true}/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="希望处理结果">
                                            {getFieldDecorator('radio', {
                                                 rules: [
                                                     {
                                                       required: true,
                                                       message:'请选择处理结果'
                                                   },
                                                     ],
                                                       initialValue:radioselect
                                            })(
                                                 <RadioGroup onChange={this.onchangeRaio}>
                                                     {
                                                         radioData.map((radioItem)=>{
                                                             return(
                                                                 <Radio value={radioItem.id}>{radioItem.text}</Radio>
                                                             )
                                                        })
                                                     }
                                                 </RadioGroup>

                                             )}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="内容">
                                            {getFieldDecorator('content', {
                                                rules: [{
                                                    required: true,
                                                    whitespace: true,
                                                    message:'请输入内容'
                                                }],
                                            })(
                                                <Input type="textarea" rows={4} />
                                            )}
                                        </FormItem>
                                    </Form>
                            </div>
                        </div>
                        <div className='showComplaintRight'>
                           {
                               data.map((dataitem)=>{
                                   return(
                                       <div className='complaintList'>
                                           <p><span>2016-03-15 15:48:57</span><span>投诉： 充值成功但实际未到账或者部分到账 希望处理结果： 补充完成</span></p>
                                           {dataitem.Items.map((item)=>{
                                             return (
                                                <div className={item.ComplainantType=='0'?'talk-in':'talk-out'}>
                                                <p>{item.ComplainantType=='0'?'我':item.BeComplaintsName+' ('+item.SupplierCode+')'} <span style={{marginLeft:15}}>{item.ReplyDate}</span></p>
                                                <p className={item.ComplainantType=='0'?'talk-message talk-message-me':'talk-message talk-message-p'}>{item.ComplaintContent}</p>
                                                </div>)
                                                })}
                                       </div>
                                   )

                               })
                           }
                        </div>
                    </div>

                </Modal>
            </span>
        )
    }
}))

export default ShowComplaintComponent
