// 4.URLの配列を引数にとり、Promiseを使って同時にそれぞれのURLのコンテンツを取得する関数を書きなさい
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
  const movieApiUrl_2 =
    "https://api.themoviedb.org/3/discover/movie?with_genres=28";
  const movieApiUrl_3 =
    "https://api.themoviedb.org/3/discover/movie?with_genres=12";
  const movieApiUrls = [movieApiUrl, movieApiUrl_2, movieApiUrl_3];

  const promises = movieApiUrls.map((url) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("エラー");
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  });

  Promise.all(promises)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
})();
