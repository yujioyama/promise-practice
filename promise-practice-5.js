// 5.Promiseとasync/awaitを使用して、連続で一連の非同期処理を行う関数を書きなさい
(() => {
  const logAsync = (index, delayTime) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`非同期処理${index}`);
        resolve();
      }, delayTime);
    });
  };

  const logAsyncs = async () => {
    try {
      await logAsync("1", 1000);
      await logAsync("2", 2000);
      await logAsync("3", 1500);
    } catch (error) {
      console.log("エラー:", error.message);
    }
  };

  logAsyncs();
})();
