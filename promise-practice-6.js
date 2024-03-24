// 6.Promise.all()を使用して、複数のapiからデータを同時に取得し、結合された結果を返却する関数を書きなさい
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

  const getData = async (url) => {
    return fetch(url, options).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
  };

  const getMultipleMovieLists = async () => {
    const promises = movieApiUrls.map((url) => {
      return getData(url);
    });
    return Promise.all(promises);
  };

  getMultipleMovieLists()
    .then((lists) => {
      lists.forEach((list) => {
        list.results.forEach((item) => {
          console.log(`取得結果： ${item.original_title}`);
        });
      });
    })
    .catch((error) => {
      console.log(`エラー: ${error.message}`);
    });
})();
