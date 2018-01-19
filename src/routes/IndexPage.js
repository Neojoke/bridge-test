import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import { TabBar, Icon, Flex } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import Bridge from "../components/Bridge";
function IndexPage(props) {
  const { tabName } = props;
  return (
    <div className={styles.container}>
      <TabBar hidden={false}>
        <TabBar.Item
          title={tabName}
          icon={
            <div
              style={{
                width: "22px",
                height: "22px",
                background: "url(../assets/tab1.png)"
              }}
            />
          }
        >
          <Bridge />
        </TabBar.Item>
      </TabBar>
    </div>
  );
}
function mapStateToProps(state, ownProps) {
  return {
    tabName: state.bridge.tabName
  };
}
export default connect(mapStateToProps)(IndexPage);
