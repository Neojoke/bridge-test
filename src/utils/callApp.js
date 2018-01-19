function callApp(method, params) {
  var promise = new Promise((resolve, reject) => {
    window.hbmb.callApp(method, params, (err, result) => {
      resolve({
        errMsg: err,
        result: result
      });
    });
  });
  return promise;
}
function callAppSync(method, params) {
  var result = window.hbmb.callAppSync(method, params);
  return result;
}
export { callApp, callAppSync };
