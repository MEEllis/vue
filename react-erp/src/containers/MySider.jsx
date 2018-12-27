import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateModule } from '@/store/app';
import { Layout } from 'antd';
import SiderMenu from '@/components//SiderMenu';
import MenuToRouter from '@/menuMapToRouter';
import { withRouter } from 'react-router-dom';
import '@/style/menu.less';
import logo from '@/logo.svg';

import util from '@/utils/util';


const { Sider } = Layout;

class MySiderContainer extends Component {
    state = {
        openKeys: [], //当前展开的 SubMenu 菜单项 key 数组
        selectedKeys: [] ,//当前选中的菜单项 key
    }
    componentDidMount() {
      
    }
    componentWillReceiveProps(nextProps,nextState) {
        const pathname=this.props.location.pathname;
        let name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === pathname);
        if (name) {
            console.log('openAccessMenu------------------>'+this.props.openAccessMenu.length)
            let parentKeys = util.getParentMenusByName(this.props.openAccessMenu, name).map(item => {
                return item.name;
            });
            if (parentKeys.length > 0) {
                let currentModule = parentKeys[0];
                let accessMenu = this.props.accessMenu;
                let moduleList = accessMenu.filter(item => {
                    return item.leftMemu && item.name === currentModule
                });
                if (moduleList.length > 0) {
                    let moduleMenu = moduleList[0].children;
                    this.props.updateModule({
                        currentModule: currentModule,
                        moduleMenu: moduleMenu
                    });
                }
            }

            if (!this.props.collapsed) {//菜单收缩状态，回退或前进显示菜单 BUG
                this.setState({
                    openKeys: parentKeys
                });
            }
            this.setState({
                selectedKeys: [name]
            });

        }
    }
    render() {
        console.log('MySider-render')
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth={this.props.responsive ? 0 : undefined}
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                style={{ background: '#fff' }}
            >
                <div className="logo"><img src={logo} alt="" /><h3>云盛联达</h3></div>
                <SiderMenu
                    menus={this.props.menus}
                    mode="inline"
                    selectedKeys={this.state.selectedKeys}
                    openKeys={this.state.openKeys}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MySiderContainer))
