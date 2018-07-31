import React from 'react'
import ReactDOM from 'react-dom';
import {
    Table,
    Row,
    Form,
    message,
    Spin,
    Input,
    Button,
} from 'antd'
import Icon, {
    iApply,
    iApplyPurchase,
    iAgreePurchase,
} from '../../Icon/js/Icon'
import IconComponent from '../../IconComponent/js/IconComponent'
import IconComponentNotClick from '../../IconComponent/js/IconComponentNotClick'

// import '../less/cardType.less'
import '../../CardType/less/cardType.less'
import Filter, { FilterItem } from '../../Filter/js/Filter'
import { IndexLink, Link } from 'react-router'
import '../less/supSearch'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import FL from '../../../utils/FL'

import {A} from '../../Auth/js/Auth'
const createForm = Form.create;

// import 'antd/dist/antd.css';

// import { showLoading, hideLoading } from 'react-redux-loading-bar'
// 注意：此页面供应商及分类部分未完成，需根据后端接口确定是一次请求还是发起多次请求
// 所以此部分的后端请求未完成，在页面中顶部需要添加，表格内 申请进货按钮点击后也会有局部刷新功能也需要添加
let SupSearch = React.createClass({
    getInitialState() {
        return {
            leverOneShow: '1',
            leverTwoShow: '',
            supplier: '',
            leverThreeShow: '',
            chargeType: '',
            listChildren: [],
            loading: false,
            listForm: FL.LINK.SUPSEARCH,
            pagenumber:1,
            pagesize: 10,
            RELOAD: false,
            supSuppliersList: [],
            listOneChecked: '',
            listTwoChecked: '',
            listThreeChecked: '',
            listSuppliersChecked: '',
            flag: false,
            siteId: '',
            producttype: '',
            categorycode: '',
            condition: '',
            filterDropdownVisible: false,
            searchText: '',

        };
    },
    componentWillMount() {
        const { props } = this;
        props.supSearchAction({
            condition: {
                pagenumber: 1,
                pagesize: 10
            }
        })
        props.supSuppliers({
            sup: 5
        })
        props.commodityAddAction({ level: 1 })
    },
    setSupplier(newState) {
        this.setState({ supplier: newState });
        const that = this;
    },
    // setLeverOne(newState) {
    //     this.setState({leverOneShow: newState, leverTwoShow: ''});
    // },
    // setLeverTwo(newState,listChildren) {
    //     this.setState({leverTwoShow: newState, leverThreeShow: '',listChildren:listChildren});
    // },
    // setLeverThree(newState) {
    //     this.setState({leverThreeShow: newState});
    // },
    setChargeType(newState) {
        this.setState({ chargeType: newState, producttype: newState });
        const { props } = this;

        // if (this.state.categorycode != '') {
        //     if (this.state.siteId != '') {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 siteId: this.state.siteId,
        //                 categorycode: this.state.categorycode,
        //                 producttype: newState
        //             }
        //         })
        //     }
        //     else {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 producttype: newState,
        //                 categorycode: this.state.categorycode,
        //             }
        //         })
        //     }
        // }
        // else {
        //     if (this.state.siteId != '') {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 siteId: this.state.siteId,
        //                 producttype: newState,
        //             }
        //         })
        //     }
        //     else {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 producttype: newState,
        //             }
        //         })
        //     }
        // }


        props.supSearchAction({
            condition:{
                pagenumber:1,
                pagesize:10,
                producttype:newState,
                siteId:this.state.siteId,
                categorycode:this.state.categorycode,
            }
        })

    },
    componentDidUpdate() {
        // message.success('.......',100000)
        const { props } = this;
        const { RELOAD } = this.state;
        if (RELOAD && props.purchaseApply.Status == '200') {
            message.success('发布成功');
            props.supSearchAction({
                condition: {
                    pagenumber: this.state.pagenumber,
                    pagesize: this.state.pagesize,
                }
            })
            this.setState({ RELOAD: false })
        } else if (props.purchaseApply.Status != '200' && !!RELOAD && props.purchaseApply.Status) {
            message.error('发布失败');
        }

        if (props.supSuppliersItems != undefined) {
            if (!this.state.flag && props.supSuppliersItems.Status == '200') {
                this.setState({
                    supSuppliersList: props.supSuppliersItems.Data != null ? props.supSuppliersItems.Data.Context : [],
                    flag: true
                })
            }
        }

    },
    listSuppliersClicked(id) {
        this.setState({
            listSuppliersChecked: id,
        })
        const { props } = this;

        // if (this.state.categorycode != '') {
        //     if (this.state.producttype != '') {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 siteId: id,
        //                 categorycode: this.state.categorycode,
        //                 producttype: this.state.producttype
        //             }
        //         })
        //     }
        //     else {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 siteId: id,
        //                 categorycode: this.state.categorycode,
        //             }
        //         })
        //     }
        // }
        // else {
        //     if (this.state.producttype != '') {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 siteId: id,
        //                 producttype: this.state.producttype
        //             }
        //         })
        //     }
        //     else {
        //         props.supSearchAction({
        //             condition: {
        //                 pagenumber: 1,
        //                 pagesize: 15,
        //                 siteId: id,
        //             }
        //         })
        //     }
        // }
        props.supSearchAction({
            condition:{
                pagenumber:1,
                pagesize:10,
                siteId:id,
                categorycode:this.state.categorycode,
                producttype:this.state.producttype
            }
        })
        this.setState({
            siteId: id,
        })

    },

    supSearchAction_code(code) {
        const { props } = this;
        if (this.state.producttype != '') {
            if (this.state.siteId != '') {
                props.supSearchAction({
                    condition: {
                        pagenumber: 1,
                        pagesize: 15,
                        siteId: this.state.siteId,
                        categorycode: code,
                        producttype: this.state.producttype
                    }
                })
            }
            else {
                props.supSearchAction({
                    condition: {
                        pagenumber: 1,
                        pagesize: 10,
                        categorycode: code,
                        producttype: this.state.producttype
                    }
                })
            }
        }
        else {
            if (this.state.siteId != '') {
                props.supSearchAction({
                    condition: {
                        pagenumber: 1,
                        pagesize: 15,
                        siteId: this.state.siteId,
                        categorycode: code,
                    }
                })
            }
            else {
                props.supSearchAction({
                    condition: {
                        pagenumber: 1,
                        pagesize: 10,
                        categorycode: code,
                    }
                })
            }
        }
    },
    // 点击列表1
    listOneClicked(id, code) {
        this.props.commodityListTwoAction({ id });
        this.setState({
            listOneChecked: id,
        })
        const { props } = this;
        this.supSearchAction_code(code);
        this.setState({
            categorycode: code,
        })
    },
    listTwoClicked(id, code) {
        this.props.commodityListThreeAction({ id })
        this.supSearchAction_code(code)
        this.setState({
            listTwoChecked: id,
            categorycode: code,
        })
    },
    listThreeClicked(id, code) {
        this.supSearchAction_code(code)
        this.setState({
            listThreeChecked: id,
            categorycode: code,
        })
    },

    purchaseApplyBtn(productId) {
        const { props } = this;
        props.supSearchPurchaseApplyAction({
            productId
        })
        this.setState({ RELOAD: true })
    },
    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    } ,
    onSearch() {
        const { searchText } = this.state;
        const {props} = this;
        props.supSearchAction({
            condition: {
                pagenumber: 1,
                pagesize: 10,
                Code: searchText,
                siteId: this.state.siteId,
                categorycode: this.state.categorycode,
                producttype:this.state.producttype,
            }
        })
        this.setState({
            filterDropdownVisible: false,
            searchText:'',
            pagenumber:1,
        });

    },
    render() {
        const { props } = this;
        let { isfetching } = props;
        const items = props.items;
        const listForm = this.state.listForm;
        //在点击三级分类时，先将二级菜单的子元素保存下来
        const listChildrenLeverThree = this.state.listChildren || [];
        if (!listChildrenLeverThree.children) {
            listChildrenLeverThree.children = []
        }
        let { TotalAmount, dataSource } = items;

        const { listItemOne, listItemTwo, listItemThree, listItemFour } = props;

        const columns = [
            {
                title: '商品编号',
                dataIndex: 'ProductCode',
                width: '100',
                fixed: 'left',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            placeholder="请输入商品编号"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                            />
                        <Button type="primary" onClick={this.onSearch}>搜索</Button>
                    </div>
                ),
                //filterDropdownVisible: this.state.filterDropdownVisible,
                //onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
            }, {
                title: '商品名称',
                dataIndex: 'ProductName',
                width: 100,
                fixed: 'left'
            }, {
                title: '供货商',
                dataIndex: 'SupplierName'
            }, {
                title: '供货商编号',
                dataIndex: 'SupplierId'
            }, {
                title: '库存状态',
                dataIndex: 'productStockStatus',
            }, {
                title: '面值',
                dataIndex: 'FaceValue'
            }, {
                title: '进价',
                dataIndex: 'ProductPrice'
            }, {
                title: '商品类型',
                dataIndex: 'type',
            }, {
                title: '平均充值时间',
                dataIndex: 'averageChargeTime'
            }, {
                title: '投诉率',
                dataIndex: 'complaintRate'
            }, {
                title: '成功率',
                dataIndex: 'successRate'
            }, {
                title: '本日断货次数',
                dataIndex: 'today'
            }, {
                title: '本周断货次数',
                dataIndex: 'week'
            }, {
                title: '本月断货次数',
                dataIndex: 'month'
            }, {
                title: '操作',
                dataIndex: 'purchaseApplyStatus',
                width: 60,
                fixed: 'right',
                render: (text) => {
                    switch (text[0]) {
                        case 1: return (
                            <div><IconComponentNotClick title='已同意供货' glyphIcon={iAgreePurchase} color='green' /></div>
                        )
                        case 3: return (
                            <div><IconComponentNotClick title='已申请进货' glyphIcon={iApplyPurchase} color='green' /></div>
                        )
                        default: return (
                            <div>
                                <A onClick={()=>this.purchaseApplyBtn(text[1])} auth='supSearchApply'
                                    authOpts={{noAuthType: 'disabled',noAuthHint: '尚未开通该权限，请联系管理员',hint:'申请进货'}}>
                                    <Icon glyph={iApply}/>
                                </A>
                            </div>
                        )
                    }
                }

            }];
        const pagination = {
            total: TotalAmount,
            showSizeChanger: true,
            pageSize: this.state.pagesize,
            // pageSizeOptions: ['10', '15', '20', '30'],

            onShowSizeChange: (current, pageSize) => {
                this.setState({ pagenumber: current, pagesize: pageSize })
                // this.setState({pagesize:pageSize})
                props.supSearchAction({
                    condition: {
                        pagenumber: current,
                        producttype: this.state.producttype,
                        pagesize: pageSize,
                        siteId: this.state.siteId,
                        categorycode: this.state.categorycode,
                    }
                })
            },
            onChange: (current, pageSize) => {
                this.setState({ pagenumber: current })
                props.supSearchAction({
                    condition: {
                        pagenumber: current,
                        pagesize: this.state.pagesize,
                        producttype: this.state.producttype,
                        siteId: this.state.siteId,
                        categorycode: this.state.categorycode,
                    }
                })
            },
        };
        return (
            <div key="form" className='supsearch'>
                <Spin spinning={isfetching == false ? false : true}>
                    <Filter type="default">
                        <FilterItem label="供应商">
                            <ul>
                                {
                                    this.state.supSuppliersList.length > 0 ?
                                        this.state.supSuppliersList.map((list, index) => {
                                            return <li key={index}>
                                                <a onClick={() => this.listSuppliersClicked(list.SiteId)} className={this.state.listSuppliersChecked == list.SiteId ? 'listItemOneactive' : ''}>{list.SiteName}<i></i></a>
                                                {/* <AlinkComponent showClass={index+1} selectState={this.state.supplier}  callbackAlink={this.setSupplier} text={list.SiteName}/ > */}
                                            </li>
                                        })
                                        : ''
                                }
                            </ul>
                        </FilterItem>
                        <FilterItem label="一级分类">
                            {
                                listItemOne ?
                                    <ul>
                                        {
                                            listItemOne.dataSource.map((item, key) => {
                                                return <li key={key}><a onClick={() => this.listOneClicked(item.Id, item.Code)} className={this.state.listOneChecked == item.Id ? 'listItemOneactive' : ''}>{item.Name}<i></i></a></li>
                                            })
                                        }
                                    </ul>
                                    :
                                    ''
                            }
                        </FilterItem>
                        <FilterItem label="二级分类" >
                            {
                                listItemTwo ?
                                    <ul>
                                        {
                                            listItemTwo.dataSource.map((item, key) => {
                                                return <li key={key} ><a onClick={() => this.listTwoClicked(item.Id, item.Code)} className={this.state.listTwoChecked == item.Id ? 'listItemOneactive' : ''}>{item.Name}<i></i></a></li>
                                            })
                                        }
                                    </ul>
                                    :
                                    ''
                            }

                        </FilterItem>
                        <FilterItem label="三级分类">
                            {
                                listItemThree ?
                                    <ul>
                                        {
                                            listItemThree.dataSource.map((item, key) => {
                                                return <li key={key} ><a onClick={() => this.listThreeClicked(item.Id, item.Code)} className={this.state.listThreeChecked == item.Id ? 'listItemOneactive' : ''}>{item.Name}<i></i></a></li>
                                            })
                                        }
                                    </ul>
                                    :
                                    ''
                            }
                        </FilterItem>
                        <FilterItem label="充值类型">
                            <ul>
                                <li key='1'><AlinkComponent showClass='1' selectState={this.state.chargeType} callbackAlink={this.setChargeType} text='卡密' /> </li>
                                <li key='2'><AlinkComponent showClass='2' selectState={this.state.chargeType} callbackAlink={this.setChargeType} text='手工代充' /> </li>
                                <li key='4'><AlinkComponent showClass='4' selectState={this.state.chargeType} callbackAlink={this.setChargeType} text='卡密直储' /> </li>
                                <li key='8'><AlinkComponent showClass='8' selectState={this.state.chargeType} callbackAlink={this.setChargeType} text='在线直储' /> </li>
                                {/* {
                                        listForm.chargeType.map((list,index)=>{
                                             return <li key={index}><AlinkComponent showClass={index+1} selectState={this.state.chargeType}  callbackAlink={this.setChargeType} text={list}/ > </li>
                                             return <li key={index} ><a onClick={()=>this.setChargeType(index+1)} >{list}<i></i></a></li>
                                        })
                                    } */}
                            </ul>
                        </FilterItem>
                    </Filter>
                    <Table columns={columns}  dataSource={dataSource || []} scroll={{ x: 1500 }} pagination={pagination} />
                </Spin>

            </div>
        )
    }
});
// SupSearchForm = createForm()(SupSearchForm);
// const SupSearch = ({items, initialDispatch, purchaseApply, purchaseApplyDispatch}) => {
// return (<SupSearchForm items={items} initialDispatch={initialDispatch} purchaseApply={purchaseApply} purchaseApplyDispatch={purchaseApplyDispatch}/>)
// }
SupSearch = createForm()(SupSearch);

export default SupSearch
