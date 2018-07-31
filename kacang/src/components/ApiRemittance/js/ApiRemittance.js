import React, {Component} from 'react'
import ApiRemittanceList from '../../../containers/ApiRemittanceList'
import ApiRemittanceBank from '../../../containers/ApiRemittanceBank'
import '../less/apiRemittance'
import {
    Tabs,
    Select,
    Col,
    Form,
    Row,
    Input,
    DatePicker,
    Button,
    Table,
    Modal,
    Spin
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const {RangePicker} = DatePicker;

class ApiRemittance extends React.Component {
    constructor(props) {
        let nowTime = new Date();
        let startTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate() - 1) + ' ' + '00:00:00';
        let endTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate() - 1) + ' ' + '23:59:59';
        super(props);
        this.state = {
            tabPosition: 'top'
        }
    }
    changeTabPosition = (tabPosition) => {
        this.setState({tabPosition});
    }
    onTabClick = () => {}
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="apiRemittance">
                <Tabs tabPosition={this.state.tabPosition} animated={false} onTabClick={this.onTabClick}>
                    <TabPane tab="已收到的汇款" key="1">
                        <ApiRemittanceList/>
                    </TabPane>
                    <TabPane tab="我的收款账户" key="2">
                        <ApiRemittanceBank/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
ApiRemittance = Form.create()(ApiRemittance);
export default ApiRemittance
