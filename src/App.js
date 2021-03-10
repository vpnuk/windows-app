import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import { SideBar } from './components/sidebar/SideBar';
import { ContentVPN } from './components/content/Content';
const { initializeSettings, settingsPath, emptySettings } = require('./settings/settings')
const { Content } = Layout;
const { ipcRenderer } = require('electron');
const fs = require('fs');
let setConnection, isDev;

function App() {
    ipcRenderer.send('is-dev-request');

    const [visible, setVisible] = useState(false);
    const [connection, setConnectionInner] = useState(null);
    const [commonSettings, setCommonSettings] = useState(null);
    const [settings, setSettings] = useState(emptySettings);

    useEffect(() => {
        initializeSettings()
            .then((settings) => setCommonSettings(settings));
        fs.readFile(
            settingsPath.settings,
            'utf8', (err, data) => {
                if (!err) {
                    setSettings(JSON.parse(data));
                }
                else {
                    console.log('error reading settings', err);
                    setSettings(emptySettings);
                }
            }
        );

        setConnection = setConnectionInner;
        return () => setConnection = null;
    }, []);

    const showDrawer = () => {
        setVisible(true);
    };

    return (
        <div className="App">
            <Layout style={{ height: "100%" }}>
                <SideBar
                    showDrawer={showDrawer}
                    visible={visible}
                    setVisible={setVisible}
                    connection={connection}
                    commonSettings={commonSettings}
                    settings={settings}
                    setSettings={setSettings} />
                <Content>
                    <ContentVPN
                        showDrawer={showDrawer}
                        connection={connection}
                        settings={settings} />
                </Content>
            </Layout>
        </div>
    );
}

ipcRenderer.on('connection-started', (_, pid) => {
    isDev && console.log('connection-started event', pid);
    setConnection(pid);
});

ipcRenderer.on('connection-stopped', (_, arg) => {
    isDev && console.log('connection-stopped event', arg);
    setConnection(null);
});

ipcRenderer.on('is-dev-response', (_, arg) => {
    isDev = arg;
    exports.isDev = isDev;
});

export default App;
