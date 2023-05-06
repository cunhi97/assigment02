import React, { useState, useEffect } from "react";
import MovieDetail from "../Component/Detail/MovieDetail";
import styles from "./MoviePoster.module.css";

// hiển thị phim  kết quả tìm kiếm 
function MoviePoster({ movies, isOriginals }) {
  const [resultSearch, setResultSearch] = useState(null);// lưu trữ và hiển thị MovieDetail 
  const [isVideoLoading, setIsVideoLoading] = useState(false); //  trạng thái để lưu trữ trạng thái tải video
  console.log("isVideoLoading",isVideoLoading)
  

  const getImagePathPoster = (movie) => {
    const imagePath = ( isOriginals ? movie.poster_path : movie.backdrop_path) || movie.poster_path;
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
  };

  // event gọi và cập nhật kết quả tìm kiếm 
  const handleClickResultSearch = (movie) => {
    setResultSearch(movie);
    setIsVideoLoading(true);
  };

 // tắt show MovieDetail
  const handleCloseResultSearch = (e) => {
    setResultSearch(null);
  };
 
  const handleVideoLoad = () => {
    setIsVideoLoading(false); // Video đã tải xong
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  console.log('movies', movies)

  //hiển thị hình ảnh và tiêu đề phim
  const renderMoviesResultSearch = () => {
    if (movies?.length > 0) {
      return movies.map((movie) => (
    <div  
    key={movie.id} 
    className={styles.movie_card} 
    onClick={() => handleClickResultSearch(movie)}>
    {movie.poster_path && (
     <img
      className={isOriginals ? styles.poster_path : styles.backdrop_path}
      src={getImagePathPoster(movie, isOriginals)}
      alt={movie.title}
      style={{ objectFit: "cover" }}
      data-type={isOriginals ? "poster_path" : "backdrop_path"}
    />
  )}
    <h3 className={styles.movie_title}>{truncate(movie?.title, 15)}</h3>
  </div>
))
}
  };

  useEffect(() => {
    console.log(resultSearch);
  }, [resultSearch]);
  return (
    <div>
      <div className={styles.movie_card_result}>
        {renderMoviesResultSearch()}
      </div>
      {resultSearch && (
        <div>
          <div className={styles.close_btn} onClick={handleCloseResultSearch}>
            <span>&#10006;</span>
          </div>
          {/* dùng  movieData làm prop để MoviDetail xử lý thông tin từ kết quả tìm kiếm  */}
          <MovieDetail 
          movieData={resultSearch} 
          isOriginals={isOriginals}
          onVideoLoad={handleVideoLoad} 
          />
        </div>
      )}
  </div>
  );
};

export default MoviePoster;
