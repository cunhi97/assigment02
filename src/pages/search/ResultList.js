import React, { useState, useEffect } from "react";
import { requestData} from "../Component/TakeDataAPI/requests";
import SearchForm from "./SearchForm";
import {API_KEY} from "../Component/TakeDataAPI/requests";
import MoviePoster from "./MoviePoster";
import styles from "./ResultList.module.css"

// kết quả phim được tìm thấy 
function ResultList({ searchTerm }) {
  const [movies, setMovies] = useState([]);// chứa danh sách các bộ phim được tìm thấy ở trường input trong searchForm
  const [searchQuery, setSearchQuery] = useState(searchTerm); //lưu trữ truy vấn tìm kiếm của người dùng
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchQuery(searchTerm);// lưu và cập nhật lại kq truy vấn của người dùng 
    fetchSearchMovies(searchTerm);// lấy truy vấn người dùng vào hàm để fetch đến API 
  }, [searchTerm]);

  // async function fetchMovies(searchQuery) {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       `${requestData}/search/movie?api_key=${token}&language=en&query=${searchQuery}`
  //     );
  //     const result = await response.json();
  //     setMovies(result.results);
  //     console.log("response",response)
  //     console.log("result",result)
  //     console.log("movies",movies)
  //     console.log("searchQuery",searchQuery)
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error);
  //     setIsLoading(false);
  //   }
  // }

  const fetchSearchMovies = async (searchText) => {
    const encodedSearchText = encodeURIComponent(searchText);//mã hóa chuỗi tìm kiếm trước khi gửi yêu cầu tìm kiếm đến API TMDB.
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${requestData}/search/movie?api_key=${API_KEY}&language=en&query=${encodedSearchText}`
      );
      if (!response.ok) {
        throw new Error("Error fetching search results");
      }
      
   // console.log("Tìm kiếm ", response)
    const result = await response.json();
    //console.log("result Search", result)     
    setMovies(result.results);
    console.log("movies", movies)
    setIsLoading(false);
  } catch (error) {
        setError(error);
        setIsLoading(false);
      }};
 
  // đưa danh sách các bộ phim được tìm thấy vào MoviePoster
  function renderMovieCards() {
    return movies.map((movie) => (
      <MoviePoster key={movie.id} movie={movie} />
    ));
  }

  function handleSearch(searchText) {
    setIsLoading(true);
    setSearchQuery(searchText);
    fetchSearchMovies(searchText);
  }

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : movies.length === 0 ? (
        <div></div>
      ) : (
        <div>
          <h2>Search results for "{searchQuery}"</h2>
          <MoviePoster movies={movies} title="Search Results" isOriginals={false} />
          <div className={styles.movie_grid}>{renderMovieCards()}</div>
        </div>
      )}
    </div>
  );
}

export default ResultList;
