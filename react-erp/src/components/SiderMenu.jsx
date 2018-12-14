import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import MenuToRouter from '@/menuMapToRouter';

const { SubMenu } = Menu;
const { Item } = Menu;

const renderMenuItem =
    ({ name, title, icon }) => {
        let link = MenuToRouter[name];
        const retStr=(<Item
            key={name}
        >
            { link ? 
            <Link to={link}>
                <span>
                    {icon && <Icon type={icon} style={{ color: '#08c' }} />}
                    <span>{title}</span>
                </span>
           </Link> 
            : <span>
                {icon && <Icon type={icon} style={{ color: '#08c' }} />} 
                <span>{title}</span>
             </span>}
        </Item>)
        return retStr
    }

const renderSubMenu =
    ({ name, title, icon, children }) =>{
       return <SubMenu
            key={name}
            title={
                <span>
                    {icon && <Icon type={icon} style={{ color: '#08c' }} />}
                    <span>{title}</span>
                </span>
            }
        >
            {children && children.map(
                item => item.children && item.children.filter(s => s.leftMemu).length > 0 ?
                    renderSubMenu(item) : renderMenuItem(item)
            )}
        </SubMenu>;
   }
export default ({ menus, ...props }) => {
    return (<Menu {...props}>
        {menus && menus.map(
            item => item.children && item.children.length ?
                renderSubMenu(item) : renderMenuItem(item)
        )}
    </Menu>)
};