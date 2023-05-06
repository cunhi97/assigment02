
import React from "react";
import { useState, useEffect } from "react";
import { requestData } from "./requests";//https://api.themoviedb.org/3
import { token } from "./requests";
import MovieDetail from "../Detail/MovieDetail";// hiển thị thông tin và video phim
import styles from "./MovieList.module.css";

//Component này để lấy dữ liệu phim từ API để render lên web page 
const MovieList = ({ request, title, isOriginals}) => {
  const [movies, setMovies] = useState([]);// cập nhật và lưu các bộ phim lấy từ API
  const [selectedMovie, setSelectedMovie] = useState(null);// lưu trữ thông tin của bộ phim 
  const fetchData = async () => {
    try {
      //lấy dữ liệu API 
      const response = await fetch( requestData  + request, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    // chuyển dữ liệu sang dạng JSON
    const result = await response.json();
    //console.log("result", result);
    //console.log(response)
   
      setMovies(result.results);// cập nhật trạng thái dữ liệu của trường results vào movies
      
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }; 
  //console.log(movies)
  useEffect(() => {
    fetchData();
  }, [request]);
  
 
// thực hiện render ảnh dạng poster_path cho original 
  const getImagePath = (movie) => {
    // nếu isOriginals true , ảnh dạng poster_path sẽ lưu vào imagePath còn false sẽ lưu  dạng backdrop_path vào imagePath
   const imagePath =( isOriginals ? movie.poster_path : movie.backdrop_path) || movie.poster_path;
    return `https://image.tmdb.org/t/p/w500${imagePath}`
  };
//cái ?? nghĩa là khi nào thằng (moviePoint === requests.fetchOriginals ? movie.poster_bath:movie.backdropPath) có giá trị là null hoặc undefined

const handleClick = (movie) => {
  //console.log("movie", movie);
  setSelectedMovie(movie);// gọi hàm khi click để cập nhật cho selectedMovie 
}

const handleClose = (e) => {
  // e.stopPropagation();//ngăn sự kiện này truyền đến phần tử cha 
  setSelectedMovie(null);
};

// hàm renderMovies để lặp qua movies xác định hình ảnh bộ phim hiển thị đưa vào 1 div 
const renderMovies = () => {
  if (movies.length > 0) {
    return movies.map((movie) => (
      <div 
      key={movie.id} 
      className={styles.movie} 
      onClick={() => handleClick(movie)}>
        {movie.poster_path && (
          <img
            className={isOriginals ? styles.poster_path : styles.backdrop_path}
            src={getImagePath(movie)}
            alt={movie.title}
            style={{ objectFit: "cover" }}
            data-type={isOriginals ? "poster_path" : "backdrop_path"}
          />
        )}
        <h3>{movie.title}</h3>
      </div>
    ));
  }
  return <div>Loading...</div>;
};
return (
  <div>
    <h2>{title}</h2>
    <div className={styles.movieList}>
      {renderMovies()}
    </div>

    {/* && để kiểm tra xem selectedMovie có tồn tại không  */}
    {selectedMovie && (
      <>
      {/* nút đóng MovieDetail */}
       <div className={styles.close_btn} onClick={handleClose}>
       <span>&#10006;</span>
     </div>
      <MovieDetail
      // dùng movieData làm props để MovieDetail xử lý thông tin phim 
        movieData={selectedMovie}
        // handleClose={handleClose}
         isOriginals={isOriginals}
      />
      </>
    )}
  </div>
);
};

export default MovieList;