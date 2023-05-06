import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { requestData } from '../Component/TakeDataAPI/requests';
import {requests} from '../Component/TakeDataAPI/requests';
import styles from "./Banner.module.css"

//khung banner
const Banner = () => {
  const [movieShow, setMovieShow] = useState([]);//lưu trữ và cập nhật trạng thái render
  //console.log(movieShow)
  //lấy dữ liệu phim từ API original
  const fetchMovie = async () => {
    const request = await axios.get(requestData + requests.fetchNetflixOriginals);
    // cập nhật 1 bộ phim bất kỳ vào banner
    setMovieShow(
      request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ]
    );
  };
  
 //console.log(movieShow)
  useEffect(() => {
    
    fetchMovie();
  }, []);


  // cắt chuỗi 
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className={styles.banner}
      
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movieShow?.backdrop_path}"
          )`,
        backgroundPosition: 'center center'
      }}
    >
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>
          {/* lấy 1 trong 3 trường sau để hiển thị tên bộ phim  */}
          {movieShow?.title || movieShow?.name || movieShow?.original_name}
        </h1>
        <div className={styles.banner__buttons}>
          <button className={styles.banner__button__play}>Play</button>
          <button className={styles.banner__button__myList}>My List</button>
        </div>
        <p className={styles.banner__description}>
          {/* cắt bớt nội dung ở trường overview */}
          {truncate(movieShow?.overview, 150)}
        </p>
      </div>
      <div className="banner-fade-bottom"></div>
    </header>
  );
};

export default Banner;
