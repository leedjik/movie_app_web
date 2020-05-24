import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    //axios가 끝나기까지를 기다려야한다. 이건 비동기다. 라고 함수에게 알려주면서
    //async, await을 사용한다.
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    //es6 버전으로 data -> data -> movies에 있는 데이터를 가져올 수 있다.

    this.setState({ movies: movies, isLoading: false }) // this.setState({movies}) 라고 써도 똑같다.

  }
  componentDidMount() {
    this.getMovies();
  }


  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {
                movies.map(movie => (
                  < Movie
                    key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image} genres={movie.genres} />
                ))
              }
            </div>
          )
        }
      </section>


    );
  }
}

export default App;