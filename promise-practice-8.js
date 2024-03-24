//8.setIntervalを使用して、固定のインターバルで繰り返し実行される関数を書きなさい
(() => {
  let executedNumber = 1;

  const intervalId = setInterval(() => {
    console.log(`${executedNumber}回目の実行`);
    executedNumber++;
  }, 500);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 4000);
})();
