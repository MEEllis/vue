import React from 'react';
import {
  Tooltip,
  Modal
} from 'antd';
import PropTypes from 'prop-types';

import Icon, * as icons from '../../Icon/js/Icon';
import EditableCell from './EditableCell';
import '../../CardType/less/cardType.less';

const confirm = Modal.confirm;

class EditGroup extends React.Component {
  static propTypes = {
    showGroupSettingFlag: PropTypes.bool.isRequired,
    showGroupInfo: PropTypes.func.isRequired,
    setSecretGroup: PropTypes.func.isRequired,
    item: PropTypes.shape({
      GroupName: PropTypes.string
    }),
    deleteSecretGroup: PropTypes.func.isRequired,
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.state = {
      apiGroup: '', // 选择的分组名称
      groupName: '', // 添加的分组名称
      showGroupSettingFlag: false, // 是否展示分组设置功能
      addGroupFlag: false, // 是否展示新增分组功能
      showEdit: false, // 是否展示修改功能
    };
  }
  componentWillReceiveProps(nextprops) {
    if (!nextprops.showGroupSettingFlag) {
      this.setState({
        showEdit: false,
      });
    }
    this.setState({
      showGroupSettingFlag: nextprops.showGroupSettingFlag
    });
  }
  // 取消修改
  cancelEditGroupName = () => {
    this.setState({
      showEdit: false,
      showGroupSettingFlag: true
    });
  }
  // 修改分组
  editGroupName = () => {
    this.setState({
      showEdit: true
    });
  }
  // 删除分组
  deleteGroupName = (event, item) => {
    event.stopPropagation();
    confirm({
      title: '删除分组后，此分组里的商户将属于未分组，并且此分组的密价关系将失效，涉及到的相关商户无法继续享受密价优惠，确定要删除分组吗？',
      onOk: () => {
        this.props.deleteSecretGroup(item.GroupId);
      }
    });
  }
  render() {
    const { showEdit, showGroupSettingFlag } = this.state;
    const { item, index } = this.props;
    const isShowControl = (item.GroupId === '' || item.GroupId === '0') ? false : true;
    return (
      <li style={{ color: item.clickStyle ? '#fff' : 'rgba(0, 0, 0, 0.65)', background: item.clickStyle ? '#1bcdc4' : '' }} onClick={() => { this.props.showGroupInfo(item, index); }}>
        {!showEdit && <span><div className="groupName">{item.GroupName}</div><div className="groupCount">({item.DealerCount})</div></span>}
        {(isShowControl && showGroupSettingFlag) && <div className="groupControl">
          <span className="edit">
            <Tooltip>
              <EditableCell
                item={item}
                setSecretGroup={(data) => {
                  this.setState({
                    showEdit: false
                  });
                  this.props.setSecretGroup(data);
                }}
                value={item.GroupName}
                editGroupName={this.editGroupName}
                cancelEditGroupName={this.cancelEditGroupName}
              >
              </EditableCell>
            </Tooltip>
          </span>
          {!showEdit && <span className="delete">
            <Tooltip title="删除">
              <span onClick={(event) => { this.deleteGroupName(event, item); }}>
                <Icon glyph={icons.iDelete}></Icon>
              </span>
            </Tooltip>
          </span>}
        </div>}
      </li>

      // <li>
      //             {!num1 && <span>全部商户</span>}
      //             {showGroupSettingFlag &&
      //               <div className="groupControl">
      //                 <span className="edit" onClick={this.editGroupName}>
      //                   <Tooltip>
      //                     <span>
      //                       <EditableCell />
      //                     </span>
      //                   </Tooltip>
      //                 </span>
      //                 {!num1 && <span className="delete">
      //                   <Tooltip title="删除">
      //                     <span>
      //                       <Icon glyph={icons.iDelete}></Icon>
      //                     </span>
      //                   </Tooltip>
      //                 </span>}
      //               </div>
      //             }
      //           </li>
    );
  }
}


export default EditGroup;
