import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { updateModule } from '@/store/app';
import { Layout } from 'antd';
import SiderMenu from '@/components//SiderMenu';
import MenuToRouter from '@/menuMapToRouter';
import '@/style/menu.less';
import logo from '@/logo.svg';

import util from '@/utils/util';


const { Sider } = Layout;

class MySiderContainer extends PureComponent {
    state = {
        openKeys: [],
        selectedKey: ''
    }
    componentDidMount() {
      
        // const pathname=this.props.location.pathname
        // let name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === pathname);
        // if (name) {
        //     let parentKeys = util.getParentMenusByName(this.props.openAccessMenu, name).map(item => {
        //         return item.name;
        //     });
        //     if (!this.props.collapsed) {//菜单收缩状态，回退或前进显示菜单 BUG
        //         this.setState({
        //             openKeys: parentKeys
        //         });
        //     }
        //     this.setState({
        //         selectedKey: name
        //     });
        // } 
    }
    render() {
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth={this.props.responsive ? 0 : undefined}
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                style={{ background: '#fff' }}
            >
                <div className="logo" style={{ paddingLeft: this.props.collapsed ? '14px' : '6px' }}><img src={logo} alt="" /><h3>云盛联达</h3></div>
                <SiderMenu
                    menus={this.props.menus}
                    mode="inline"
                />
            </Sider>
        );
    }
}

const mapStateToProps = state => {
    return {
        menus: state.app.moduleMenu,
        openAccessMenu: state.app.openAccessMenu,
        accessMenu: state.app.accessMenu,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateModule: (module) => {
            dispatch(updateModule(module));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MySiderContainer);
