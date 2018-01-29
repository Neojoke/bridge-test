function callApp(method, params) {
  var promise = new Promise((resolve, reject) => {
    window.HBMBBridge.callApp(method, params, (err, result) => {
      resolve({
        errMsg: err,
        result: result
      });
    });
  });
  return promise;
}
function callAppSync(method, params) {
  var result = window.HBMBBridge.callAppSync(method, params);
  return result;
}
export { callApp, callAppSync };
