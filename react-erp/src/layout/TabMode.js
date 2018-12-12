import React,{PureComponent,Fragment} from 'react'
import { Spin,Layout } from 'antd';
import './TabMode.css';
import { connect } from 'react-redux';
import MyHeader from '../containers/MySider'
import { getToken } from '@/utils/token';
import { getUserInfo, getMenuList } from 'api';
import util from '@/utils/util';
import { updateAccessMenu } from '@/store/app';
class TabMode extends PureComponent{

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
    }

    render(){
        console.log("TabMode render");
        return (
            <Fragment>
                 <Spin size="large" spinning={this.props.spinLoading}>
                    <Layout>
                        <MyHeader>

                        </MyHeader>
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
 
