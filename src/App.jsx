import { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";

// Import our components
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  // Constant with your API Key
  const apiKey = import.meta.env.VITE_API_KEY;

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async(searchTerm) => {
    try {
      console.log(searchTerm);
      
      if (!isNaN(searchTerm)){
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=tt${searchTerm}`);
        const data = await response.json();
      setMovie(data);
      }
      else{
        const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
      }
    } catch(e) {
      console.error(e)
    }
  };
  useEffect(() => {
    // const minCeiled = Math.ceil(1);
    // const maxFloored = Math.floor(9999999);
    // const rand = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    // const num = rand.toString().padStart(7, '0');
    const rand = Math.floor(Math.random() * 10000000);
    const num = rand.toString().padStart(7, '0');
    console.log(num);
    
    getMovie(num);
  }, []);
  return (
    <div className="App">
      <h1>Movie Search</h1>
      <Form moviesearch={getMovie}/>
      <MovieDisplay movie={movie}/>
    </div>
  );
}

