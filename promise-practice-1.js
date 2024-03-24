// 1.コールバックを受け取り、2秒後に発火する関数を書きなさい
(() => {
  const invokeCallbackAfter2Seconds = (callback) => {
    setTimeout(() => {
      callback();
    }, 2000);
  };

  const displayAlert = () => {
    alert("２秒後に発火されました");
  };

  invokeCallbackAfter2Seconds(displayAlert);
})();
