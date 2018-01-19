import {
  NavBar,
  Icon,
  Flex,
  List,
  TextareaItem,
  WingBlank,
  Button,
  WhiteSpace,
  Modal,
  Switch
} from "antd-mobile";
import React from "react";
import { connect } from "dva";
function closest(el, selector) {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class Bridge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false
    };
  }
  runClick = key => e => {
    e.preventDefault(); // 修复 Android 上点击穿透
    const method_value = this.methodInput.state.value;
    const isSync = this.state.isCheck;
    var param_value;

    try {
      param_value = JSON.parse(this.paramsInput.state.value);
    } catch (error) {
      param_value = this.paramsInput.state.value;
    }
    let { run } = this.props;
    run(method_value, param_value, isSync);
  };
  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, ".am-modal-content");
    if (!pNode) {
      e.preventDefault();
    }
  };
  render() {
    var { isShowModal, modalShowInfo, hiddenResult } = this.props;
    modalShowInfo = JSON.stringify(modalShowInfo);
    var { isCheck } = this.state;
    return (
      <Flex direction="column">
        <Flex.Item style={{ width: "100%" }}>
          <NavBar mode="dark">BridgeTest</NavBar>
        </Flex.Item>
        <WhiteSpace size="md" />
        <Flex.Item style={{ width: "100%" }}>
          <List renderHeader={() => "输入方法名与入参"}>
            <TextareaItem
              title="Method"
              placeholder="方法名"
              data-seed="logId"
              ref={el => (this.methodInput = el)}
              autoHeight
            />
            <TextareaItem
              title="Data"
              placeholder="入参:{},空则不写"
              data-seed="logId"
              rows={5}
              ref={el => (this.paramsInput = el)}
              initialValue={"{}"}
              autoHeight
            />
            <List.Item
              extra={
                <Switch
                  platform="iOS"
                  ref={el => (this.check = el)}
                  initialValue={false}
                  checked={isCheck}
                  onChange={e => {
                    this.setState({ isCheck: e });
                  }}
                />
              }
            >
              isSync
            </List.Item>
            <List.Item>
              <Modal
                visible={isShowModal}
                transparent
                maskClosable={false}
                onClose={hiddenResult}
                title="返回值"
                footer={[
                  {
                    text: "Ok",
                    onPress: hiddenResult
                  }
                ]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
              >
                {modalShowInfo}
              </Modal>
              <Button type="primary" size="large" onClick={this.runClick()}>
                Run
              </Button>
            </List.Item>
          </List>
        </Flex.Item>
      </Flex>
    );
  }
}
function mapStateToProps(state, ownProps) {
  const { result } = state.bridge;
  return {
    isShowModal: result ? true : false,
    modalShowInfo: result
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    showRusult(message) {
      dispatch({
        type: "bridge/showRusult",
        payload: {
          result: message
        }
      });
    },
    hiddenResult() {
      dispatch({
        type: "bridge/hiddenResult",
        payload: {
          result: null
        }
      });
    },
    run(method, params, isSync) {
      if (isSync) {
        dispatch({
          type: "bridge/callAppSync1",
          payload: {
            method: method,
            params: params
          }
        });
      } else {
        dispatch({
          type: "bridge/callApp",
          payload: {
            method: method,
            params: params
          }
        });
      }
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Bridge);
