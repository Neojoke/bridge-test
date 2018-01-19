import { callApp, callAppSync } from "../utils/callApp";
export default {
  namespace: "bridge",
  state: {
    tabName: "Test",
    result: null
  },
  reducers: {
    showRusult(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    hiddenResult: (state, action) => {
      return { ...state, ...action.payload };
    },

    showProcess() {},
    closeProcess() {}
  },
  effects: {
    *callApp({ payload }, { put, call, select }) {
      const { method, params } = payload;
      const result = yield call(callApp, method, params);
      yield put({
        type: "showRusult",
        payload: {
          result: result
        }
      });
    },
    *callAppSync1({ payload }, { put, call, select }) {
      const { method, params } = payload;
      const result = callAppSync(method, params);
      yield put({
        type: "showRusult",
        payload: {
          result: result
        }
      });
    }
  }
};
