import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { API_KEY } from "../TakeDataAPI/requests";
import "./MovieDetail.css"

// Component này để hiển thị thông tin và xem được trailer phim
const MovieDetail = ({ movieData }) => {
const [trailerKey, setTrailerKey] = useState("");//ể lưu key của trailer được lấy về từ API
const [currentMovie, setCurrentMovie] = useState(movieData);//chứa thông tin của bộ phim hiện tại được hiển thị.
const [showDetails, setShowDetails] = useState(false);// hiển thị thông tin phim
//console.log(movieData)
const movie_id = movieData.id;// lấy id của bộ phim từ movieData để lấy video trailer từ API 
//console.log(movie_id)
const getTrailer = async () => {
try {
const response = await fetch(
`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`
);
//console.log(response)
const result = await response.json();
//console.log(result)
const trailers = result.results && result.results.filter((video) => video.site === "YouTube" && video.type === "Trailer");//để xác định site và type hiển thị 
console.log("trailers", trailers)
if (trailers && trailers.length > 0) {
  setTrailerKey(trailers[0].key);// Nếu trailer tồn tại lấy video trailer đầu tiên
} else if (result.results && result.results.length > 0) {// nếu trailer không tồn tại lấy video đầu tiên trong results
  setTrailerKey(result.results[0].key);
} else {
  setTrailerKey(null);
}
} catch (error) {
console.log("Error fetching trailer data:", error);
}
};

useEffect(() => {
if (movieData.id !== currentMovie.id) {
setCurrentMovie(movieData);// gọi để cập nhập lại thông tin  của bộ phim
setTrailerKey("");
getTrailer(movieData.id);//gọi để tìm kiếm trailer của bộ phim hiện tại.
}
}, [movieData, currentMovie]);

const vote =( movieData.vote_average);
const { title, overview, release_date,} = currentMovie;

const getImagePath = (movieData) => {
  // nếu isOriginals true , ảnh dạng poster_path sẽ lưu vào imagePath còn false sẽ lưu  dạng backdrop_path vào imagePath
 const imgUrl =  movieData.backdrop_path ? movieData.backdrop_path : movieData.poster_path;
  return  `https://image.tmdb.org/t/p/w500${imgUrl}`;
};

return (
<div className="parent_container">
{currentMovie.id && (
<>
{/* false --> true để show thông tin phim */}
<div className="content" onClick={() => setShowDetails(!showDetails)}> 
<h1 className="title">{title}</h1>
<p>Release Date: {release_date}</p>
<p>Vote: {vote}</p>
<p className="content_child">{overview}</p>
</div>
<div className="youtube_container" onClick={() => setShowDetails(!showDetails)}>
{trailerKey && showDetails ? (
<YouTube
className="youtube_video"
videoId={trailerKey}
opts={{
height: "100%",
width: "100%",
playerVars: {
autoplay: 0,
},
}}
/>
) : (
<img src={getImagePath(movieData)} alt={title} />
)}
</div>
</>
)}
</div>
);
};

export default MovieDetail;