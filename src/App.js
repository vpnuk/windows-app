import React, { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import { SideBar } from "./components/sidebar/SideBar";
import { ContentVPN } from "./components/content/Content";

const { Content } = Layout;

function App() {
  const [visible, setVisible] = useState(false);

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
        />
        <Content>
          <ContentVPN showDrawer={showDrawer} />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
