

import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import ResultList from "../../search/ResultList";// kết quả của input truy vấn tìm kiếm 
import Banner from "../Banner";// hiển thị ảnh bộ phim bất kì lấy từ original.
import { token, requests } from "./requests";
import { requestData } from "./requests";
import styles from "./RenderDom.module.css";

// tách lấy API của từng mục phim
function RenderDom() {
  const [searchTerm, setSearchTerm] = useState(""); // lấy dữ liệu query đưa vào Resultlist 
  const [originalMovies, setOriginalMovies] = useState([]);// oirginal
  const [trendingMovies, setTrendingMovies] = useState([]);//xu hướng 
  const [topRatedMovies, setTopRatedMovies] = useState([]);//xếp hạng cao 
  const [actionMovies, setActionMovies] = useState([]);//hành động 
  const [comedyMovies, setComedyMovies] = useState([]);//hài kịch
  const [horrorMovies, setHorrorMovies] = useState([]);//kinh dị
  const [romanceMovies, setRomanceMovies] = useState([]);//lãng mạn
  const [documentaryMovies, setDocumentaryMovies] = useState([]);//phim tài liệu
    
  //Lấy API cho original
    const fetchOriginalMovies = async () => {
      try{
        const response = await fetch(requestData + requests.fetchNetflixOriginals, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      //console.log("Original", response)
      const result = await response.json();
      //console.log("result Original", result)
      
        setOriginalMovies(result.results);
      
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }
    
  //lấy API cho xu hướng 
    const fetchTrendingMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchTrending, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     // console.log("response Trending", response)
      const result = await response.json();
      //console.log("result Trending", result)
      setTrendingMovies(result.results);
      
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    };


    //lấy API cho top hạng cao 
    const fetchTopRatedMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchTopRated, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     // console.log("Xếp hạng cao", response)
      const result = await response.json();
     // console.log("result TopRate", result)
      setTopRatedMovies(result.results);
      
    }catch (error) {
      console.log("Error fetching data:", error);
    }};
 

    //Lấy API cho phim hành động
    const fetchActionMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchActionMovies, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     // console.log("hành động", response)
      const result = await response.json();
     // console.log("result Action", result)
      setActionMovies(result.results);
      
    }catch (error) {
      console.log("Error fetching data:", error);
    }};
 

  //lấy API cho phim hài kịch
    const fetchComedyMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchComedyMovies, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     // console.log("Hài Kịch", response)
      const result = await response.json();
     //console.log("result Comedy", result)
      setComedyMovies(result.results);
      
    }catch (error) {
      console.log("Error fetching data:", error);
    }};


    // lấy API cho phim kinh dị
    const fetchHorrorMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchHorrorMovies, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      //console.log("Kinh dị", response)
      //console.log("resutl Horror", result)
      
      setHorrorMovies(result.results);
      
    }catch (error) {
      console.log("Error fetching data:", error);
    }};
  

    //lấy API cho phim lãng mạn
    const fetchRomanceMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchRomanceMovies, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      //console.log("lãng mạng", response)
      const result = await response.json();
     
      setRomanceMovies(result.results);
      
    }catch (error) {
      console.log("Error fetching data:", error);
    }};
 

    //láy API cho phim tài liệu
    const fetchDocumentaryMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchDocumentaries ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      //console.log("Tài liệu", response)
      const result = await response.json();
      //console.log("result Documentary", result)
      setDocumentaryMovies(result.results);
      
    }catch (error) {
      console.log("Error fetching data:", error);
    }};

    // gửi truy vấn đến API từ trường input
    const fetchSearchMovies = async () => {
      try {
      const response = await fetch(requestData + requests.fetchSearch ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Tìm kiếm ", response)
      const result = await response.json();
      console.log("result Search", result)     
        setSearchTerm(result.results);
    
    }catch (error) {
      console.log("Error fetching data:", error);
    }};


    useEffect(() => {
     
    fetchOriginalMovies();
    fetchTrendingMovies();
    fetchTopRatedMovies();
    fetchActionMovies();
    fetchComedyMovies();
    fetchHorrorMovies();
    fetchRomanceMovies();
    fetchDocumentaryMovies();
     fetchSearchMovies()
    }, []);
 
   
return (
  <div className={styles.app}>
  <Banner/>
{/* Đưa searchTerm làm prop cho Resultlist */}
  <ResultList searchTerm={searchTerm} />

  <div className={styles.container}>   
   <div className={styles.movieList}> 
  <MovieList request={requests.fetchNetflixOriginals} moviePoint={originalMovies} title="Originals"  isOriginals={true}/>
  <MovieList request={requests.fetchTrending} moviePoint={trendingMovies} title="Xu hướng"  isOriginals={false} />
  <MovieList request={requests.fetchTopRated} moviePoint={topRatedMovies} title="Xếp hạng cao"  isOriginals={false}/>
  <MovieList request={requests.fetchActionMovies}  moviePoint={actionMovies} title="Hành động"  isOriginals={false}/>
  <MovieList request={requests.fetchComedyMovies} moviePoint={comedyMovies} title="Hài kịch"  isOriginals={false}/>
  <MovieList request={requests.fetchHorrorMovies} moviePoint={horrorMovies} title="Kinh dị"  isOriginals={false}/>
  <MovieList request={requests.fetchRomanceMovies} moviePoint={romanceMovies} title="Lãng mạn"  isOriginals={false}/>
  <MovieList request={requests.fetchDocumentaries} moviePoint={documentaryMovies} title="Tài liệu"  isOriginals={false}/>
  </div> 
</div>

</div>
  );
}

export default RenderDom;