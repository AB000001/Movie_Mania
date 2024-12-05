import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {

  useEffect(() => {
    document.body.style.margin = "0";
    document.documentElement.style.margin = "0";
  }, []);

  const buttonStyle = {
    width: "77px",
    height: "32px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "rgb(229, 9, 20)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    fontFamily: '"Helvetica Neue", "Segoe UI"',
    margin: "0px 0px 0px 24px",
  };

  return <div>
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, backgroundColor: "black" }}>
        <div style={{ fontSize:40, color: "red" }}>
          <b>MOVIE MANIA</b>
        </div>
        <div style={{display:'flex',alignItems:'center' }}>
          <Link to="/AboutUs"><button style={buttonStyle}>About Us</button></Link>
          <Link to="/"><button style={buttonStyle}>Home</button></Link>
        </div>
      </div>
      <Routes>
        <Route >
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
}

function AboutUs() {
  return <div style={{ height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
    <div style={{ width: "70vw", textAlign: 'center', fontSize: "2vw", color: "white" }}>
      <div style={{ fontSize: "4vw" }}>
        <b>About Us</b>
      </div>
      At Movie Mania, we believe that movies are more than just entertainment—they're a gateway to different worlds, cultures, and experiences. Our platform is designed to make it easy for you to discover and explore a universe of films, from timeless classics to the latest blockbusters.
      Whether you're a casual viewer or a die-hard cinephile, Movie Mania is your ultimate movie search companion. With our seamless search functionality and comprehensive database powered by The Movie Database (TMDb), you can find detailed information about your favorite films, including release dates, overviews, posters, and more.
    </div>
  </div>
}

function SearchPage() {

  const inputref = useRef();
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [notfound, setnotfound] = useState(false);
  const [error_m, seterror_m] = useState("");

  const moviecomponents = movies.map(movie => <Moviecomponent
    title={movie.title}
    date={movie.release_date.length > 0 ? movie.release_date : "Not Available"}
    overview={movie.overview.length > 0 ? movie.overview : "Not Available"}
    path={movie.poster_path != null ? "https://image.tmdb.org/t/p/w300" + movie.poster_path : "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg"}
    link={"https://www.themoviedb.org/movie/" + String(movie.id)}
  />)

  async function getmovies() {
    setloading(true)
    seterror_m("NO MOVIES FOUND !!!")
    setnotfound(false)
    try {
      const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=3cd2568f77a8237599d50b9e2ae09943&query=" + inputref.current.value)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json()
      console.log(data.results)
      if (data.results.length > 0)
        setMovies(data.results);
      else
        setnotfound(true)
    } catch (err) {
      seterror_m("Oops An Unexpected Error Occured")
    } finally {
      setloading(false)
    }
  }

  function Moviecomponent(prop) {


    return <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80vw', backgroundColor: 'gray', borderRadius: 10, margin: 20, padding: 20, display: 'flex', justifyContent: 'left' }}>
        <div>
          <img style={{ margin: 0, marginRight: 20,width:"20vw"}} src={prop.path} alt="poster image" />
        </div>
        <div style={{ fontSize:"1.9vw"}}>
          <div>
            <b>
              TITLE:
            </b>
            {prop.title}
          </div>
          <br />
          <div>
            <b>
              RELEASE DATE:
            </b>
            {prop.date}
          </div>
          <br />
          <div>
            <b>
              OVERVIEW:
            </b>
            {prop.overview}
          </div>
          <br />
          <div>
            <a href={prop.link} target='blank'>
              <button>View more</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  }

  return <div style={{
    backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg")`,
    backgroundSize: "100% auto",
    backgroundRepeat: "repeat-y",
    backgroundColor:"black",
    height: "auto",
    minHeight: "100vh",
    minWidth: "100vw",
    overflow: "auto"
  }}>

    <div style={{ height: "60vh", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: "white" }}>
      <div>
        <div style={{ color: "white" }}>
          <div style={{ fontSize:"4vw" }}>
            <b>Welcome to Movie Mania!</b>
          </div>
          <br />
          <div style={{ fontSize: "1.9vw" }}>
            Discover a world of cinema at your fingertips.
          </div>
          <br />
          <br />
          <div style={{ fontSize: "1.7vw" }}>
            Whether you're looking for timeless classics or the latest blockbusters, Movie Mania is your ultimate destination for all things cinema.
          </div>
          <br />
          <div style={{ fontSize: "2.1vw" }}>
            <b>Start your search now and find your next favorite movie!</b>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <input style={{
            width: "368px",
            height: "56px",
            borderRadius: "5px",
            fontWeight: 700,
            color: "white",
            backgroundColor: "black",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            padding: "0px 0px 0px 15px",
            boxSizing: "border-box",
          }} ref={inputref} type="text" placeholder='Enter Movie Name' />
          <button style={{
            width: "150px",
            height: "56px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "rgb(229, 9, 20)",
            color: "white",
            cursor: "pointer",
            fontFamily: `"Helvetica Neue", "Segoe UI"`,
            fontSize: "25px",
            fontWeight: 500,
            padding: "12px 24px",
            margin: "0px 0px 0px 8px",
          }} onClick={getmovies}>SEARCH</button>
        </div>
      </div>
    </div>
    <div>
      {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '50vw', height: '50vh', margin: 0, padding: 0 }} src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGZ3ZnlkMTF0ZWp0djd5NHJ5Yjk1a3h5eHA4MHkxYW93NG11NHNweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uIJBFZoOaifHf52MER/giphy.webp" alt="Loading..." />
      </div> : (notfound ? <div style={{ fontSize: 32, display: 'flex', justifyContent: 'center', color: "white" }}>
        <b>{error_m}</b>
      </div> : moviecomponents)}
    </div>

  </div>
}

export default App;