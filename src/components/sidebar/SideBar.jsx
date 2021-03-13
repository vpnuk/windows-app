import React from 'react';
import { Drawer } from 'antd';
import './sidebar.css';
import SettingsImage from '../../assets/settings.png';
import { Menu } from '../menu/menu';

export const Sidebar = ({ visible, setVisible, connection }) => {

    const onClose = () => setVisible(false);

    return (
        <Drawer
            title={<SettingsTitle />}
            placement="left"
            onClose={onClose}
            visible={visible}
            width={522}
            closable
            headerStyle={{ background: "#000000" }}
            drawerStyle={{ background: "#000000" }}>

            <Menu />
        </Drawer>
    );
};

const SettingsTitle = () => {
    return (
        <div className="settings-button-modal">
            <img alt="settings-icon" src={`${SettingsImage}`} />
            <div>
                <p>Settings</p>
            </div>
        </div>
    );
};