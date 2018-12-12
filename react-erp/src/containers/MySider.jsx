import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { updateModule } from '@/store/app';
import MySider from '@/components/MySider';

class MySiderContainer extends PureComponent {
    state = {
        openKeys: [],
        selectedKey: ''
    }

    render() {
        return (
            <MySider
            menus={this.props.menus}
            selectedKey={this.state.selectedKey}
            openKeys={this.state.openKeys}
        />
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
