import React from 'react'
import ReactDOM from 'react-dom';
import {
    Table,
    Row,
    Form,
    Modal,
    Col,
    DatePicker,
    Input
} from 'antd'
import Filter, {FilterItem} from '../../Filter/js/Filter'
import {IndexLink, Link} from 'react-router'
import '../less/tmallFinance'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import ShowDetailComponent from '../../../containers/ShowDetailComponent'
import FL from '../../../utils/FL'


const createForm = Form.create;
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
let TmallFinanceForm = React.createClass({
    getInitialState() {
        return {transactionType: '', leverTwoShow: '', supplier: '', leverThreeShow: '', chargeType: '',listForm:FL.LINK.TMALLFINANCE};
    },
    componentWillMount(){
        this.props.initialDispatch()
    },
    setSupplier: function(newState) {
        this.setState({supplier: newState});
    },
    setTransactionType(newState) {
        this.setState({transactionType: newState,leverTwoShow:''});
    },
    setLeverTwo(newState) {
        this.setState({leverTwoShow: newState});
    },
    setLeverThree(newState) {
        this.setState({leverThreeShow: newState});
    },
    setChargeType(newState) {
        this.setState({chargeType: newState});
    },
    handleSubmit() {
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            this.props.form.resetFields();
            this.setState({visible:false})
        })
    },
    showModal() {
        this.setState({visible: true})
    },
    hideModal() {
        this.setState({visible: false})
    },
    render() {
        const props = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const columns = [
            {
                title: '财务订单号',
                dataIndex: 'Code',

            },  {
                title: '订单编号',
                dataIndex: 'TradeNo',

                render: text =>< ShowDetailComponent text = {text} orderNum ={text} />
            }, {
                title: '交易类型',
                dataIndex: 'TradeChildTypeName',

            },{
                title: '交易前金额',
                dataIndex: 'TradeBeforeAmount'
            }, {
                title: '交易金额',
                dataIndex: 'TradeAmount'
            }, {
                title: '交易后金额',
                dataIndex: 'TradeAfterAmount'
            }, {
                title: '交易时间',
                dataIndex: 'TradeTime'
            }, {
                title: '操作',
                dataIndex: 'Type',
                render: text =>< ShowDetailComponent text = "查看" orderNum = {text}/>
            }
        ];
        const {items} = props;
        const listForm = this.state.listForm;
        const dataSource = items.dataSource;
        return (
                <div key="form">
                    <Filter type="default">
                        <FilterItem label="交易类型">
                            <ul>
                                {
                                    listForm.transactionType.map((list, index) => {
                                    return <li key={index}><AlinkComponent showClass={index + 1} selectState={this.state.transactionType} callbackAlink={this.setTransactionType} text={list.title}/></li>
                                    })
                                }
                            </ul>
                        </FilterItem>
                        <FilterItem label="二级分类">
                            {listForm.transactionType.map((list, index) => {
                                return <ul key={index} style={{
                                    display: this.state.transactionType == index + 1
                                        ? 'block'
                                        : 'none'
                                }}>
                                {list.children.map((listChildren, indexChildren) => {
                                    return <li key={indexChildren}><AlinkComponent showClass={indexChildren + 1} selectState={this.state.leverTwoShow} callbackAlink={this.setLeverTwo} text={listChildren.title}/></li>
                                    })
                                }
                                </ul>
                            })
                        }
                        </FilterItem>
                        <FilterItem label="其它">
                            <a href="javascript:;" onClick={this.showModal}>更多筛选条件</a>
                            <Modal title="更多筛选条件" width={430} visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                                <Form horizontal>
                                    <Row gutter={16}>
                                        <FormItem {...formItemLayout} label="订单号">
                                            {getFieldDecorator('orderNumber')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="交易时间">
                                            {getFieldDecorator('exchangeTime')(
                                                <RangePicker showTime format="YYYY/MM/DD HH:mm:ss"/>
                                            )}
                                        </FormItem>
                                    </Row>
                                </Form>
                            </Modal>
                        </FilterItem>
                    </Filter>
                    <Table columns={columns} dataSource={dataSource||[]}/>
                </div>
        )
    }
})
TmallFinanceForm = createForm()(TmallFinanceForm);

const TmallFinance = ({items,initialDispatch}) =>{
    return (
        <TmallFinanceForm items = {items} initialDispatch = {initialDispatch} />
    )
}
export default TmallFinance
