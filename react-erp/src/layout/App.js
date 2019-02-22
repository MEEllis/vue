import React,{Fragment} from 'react'
import { Spin,Layout } from 'antd';
import './App.css';
import { connect } from 'react-redux';
import MySider from '../containers/MySider'
import { getToken } from '@/utils/token';
import { getUserInfo, getMenuList } from 'api';
import util from '@/utils/util';
import { updateAccessMenu } from '@/store/app';
import MyNavTabs from '@/containers/MyNavTabsR';

const { Content } = Layout;
class TabMode extends React.PureComponent{

    state = {
        collapsed: false,
        responsive: false,
        navTabShow: true,
        navTabTop: 65
    }

    componentDidMount (){
        this.initAppData()
    }

    initAppData =async ()=>{
        const token = getToken();
        if (!token) {
            this.props.history.push('/login');
            return;
        }
        let [infoRes, menuRes] = await Promise.all([getUserInfo(), getMenuList()]);
        let moduleList = menuRes.data.filter(item => {
            return item.leftMemu
        });
        let openAccesseMenu = util.openAccesseMenu(menuRes.data);
        let currentModule = moduleList[0].name;
        let moduleMenu = moduleList[0].children;
        this.props.updateAccessMenu({
            currentModule: currentModule,
            accessMenu: menuRes.data,
            openAccessMenu: openAccesseMenu,
            moduleMenu: moduleMenu,
            moduleList: moduleList
        });
        console.log(1)
    }

    render(){
        console.log("TabMode render");
        return (
            <Fragment>
                 <Spin size="large" spinning={this.props.spinLoading}>
                    <Layout>
                        <MySider
                           responsive={this.state.responsive}
                           collapsed={this.state.collapsed}
                        ></MySider>
                        <Layout>
                        <Content style={{ padding: 24, paddingTop: 0, background: '#fff' }}>
                                {/* <MyNavTabs style={{ marginTop: this.state.navTabTop, width: '100%', display: this.state.navTabShow ? 'block' : 'none' }} show={this.state.navTabShow} /> */}
                            </Content>
                        </Layout> 
                    </Layout> 
                 </Spin>
            </Fragment>
        )
    }
}

const mapStateToPorps = state => {
    const { spinLoading } = state.app;
    return { spinLoading };
};
const mapDispatchToProps = dispatch => {
    return {
        updateAccessMenu: (accessMenu) => {
            dispatch(updateAccessMenu(accessMenu))
        }
    }
}
export default connect(mapStateToPorps, mapDispatchToProps)(TabMode)
 
