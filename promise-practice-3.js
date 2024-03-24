// 3.GETリクエストを送り、返却されたデータでresolveするPromiseを返す関数を書きなさい
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

  const getData = () => {
    return new Promise((resolve, reject) => {
      fetch(movieApiUrl, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("エラー");
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  getData()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
})();
