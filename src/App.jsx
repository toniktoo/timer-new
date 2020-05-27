import React from 'react';
import { Tabs, Layout } from 'antd';

import 'antd/dist/antd.css';
import Timer from './components/Timer';
import Countdown from './components/Countdown';

const { TabPane } = Tabs;
const stylesLayout = { padding: 16 };

const App = () => (
  <div className="containerApp">
    <Layout style={stylesLayout}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <Countdown />
        </TabPane>
      </Tabs>
    </Layout>
  </div>
);

export default App;
