
export const API_KEY = '123346ebf5b251b170f4db2e4ae939c2';
export const requestData = 'https://api.themoviedb.org/3'
export const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjMzNDZlYmY1YjI1MWIxNzBmNGRiMmU0YWU5MzljMiIsInN1YiI6IjY0MGQ2ZDM0MmEwOWJjMDBmNzJjZWI0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P8G4Qk_mn74lSrqjFKIBimDSsTCg0IG_VhaOpoYghgs'
export const requests = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

//console.log(requests)
///trending/all/week?api_key=${API_KEY}&language=en-US
//https://api.themoviedb.org/3/movie/550?api_key={api_key}&callback=test

//export const fetchTrending = `/trending/all/week?api_key=${API_KEY}&language=en-US`
