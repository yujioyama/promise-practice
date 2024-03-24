// 7.APIからデータを取得し、もし失敗したら特定の回数再取得を行う関数を書きなさい
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

  const maxRetryCount = 3;

  const promise = new Promise((resolve, reject) => {
    let retryCount = 0;
    const getData = () => {
      return fetch(movieApiUrl, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (maxRetryCount > retryCount) {
            retryCount++;
            console.log(`データ取得に${retryCount}回失敗しました。`);
            getData();
          } else {
            reject(
              new Error(
                `データ取得に${retryCount}回失敗しました。エラー：${error.message}`
              )
            );
          }
        });
    };
    getData();
  });

  promise
    .then((data) => {
      console.log(`取得映画：${data.results[0].original_title}`);
    })
    .catch((error) => {
      console.log(`エラー：${error.message}`);
    });
})();
