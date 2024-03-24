//apiからデータを取得する関数を書きなさい。もし、データ取得に指定した以上の時間がかかる場合はリクエストをキャンセルしなさい。
(() => {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWQ2MTZjN2ZjNDM0MWYxMWQ3MWY5YjNjMWNlZDRiZCIsInN1YiI6IjYwMjBlOWNkOTk3OWQyMDAzZmUyNDljMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N6H4RNlm52kf9MxgOhak6NL_Z00IXIFuYuC8sd54tpA";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const movieApiUrl =
    "https://api.themoviedb.org/3/movie/now_playing?language=ja&page=1";

  const getDataWithin5Seconds = () => {
    const controller = new AbortController();
    const { signal } = controller;

    // 0.1秒以上レスポンスが来ない場合はリクエストをキャンセル
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 1);

    return fetch(movieApiUrl, { options, signal })
      .then((response) => {
        clearInterval(timeoutId);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          throw new Error("タイムアウトしました");
        } else {
          throw err;
        }
      });
  };

  getDataWithin5Seconds()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
})();
