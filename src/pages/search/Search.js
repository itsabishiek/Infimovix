import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../components/customPagination/CustomPagination";
import { TextField, Button, Tabs, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [notFound, setNotFound] = useState(false);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          (type === 0 && "movie") ||
          (type === 1 && "tv") ||
          (type === 2 && "person")
        }?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setContent(data.results);
      setNumOfPages(data.total_pages);

      if (data.results.length === 0) {
        setNotFound(true);
      }
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page, type]);

  return (
    <div>
      <div className="search">
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          color="primary"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 20 }}
          size="small"
          type="submit"
        >
          <SearchIcon fontSize="large" type="submit" />
        </Button>
      </div>

      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="inherit"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
        fullWidth
      >
        <Tab style={{ width: "33.3%" }} label="Movies" />
        <Tab style={{ width: "33.3%" }} label="TV Series" />
        <Tab style={{ width: "33.3%" }} label="Cast/Crew" />
      </Tabs>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path || c.profile_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={
                (type === 0 && "movie") ||
                (type === 1 && "tv") ||
                (type === 2 && "person")
              }
              vote_average={c.vote_average || (type === 2 && "")}
            />
          ))}

        {searchText === "" && (
          <div>
            <img
              style={{ marginTop: 35, width: "300px", height: "300px" }}
              src="/assets/images/search.svg"
              alt=""
            />{" "}
            <h2
              style={{
                textAlign: "center",
                color: "rgb(63, 81, 181)",
                margin: 0,
              }}
            >
              Search{" "}
              {(type === 0 && "Movies") ||
                (type === 1 && "TV Series") ||
                (type === 2 && "Cast/Crew")}
            </h2>
          </div>
        )}

        {searchText && notFound && (
          <div>
            <img
              style={{ marginTop: 35, width: "300px", height: "300px" }}
              src="/assets/images/not_found.svg"
              alt=""
            />{" "}
            <h2
              style={{
                textAlign: "center",
                color: "rgb(63, 81, 181)",
                margin: 0,
              }}
            >
              No results found
            </h2>
          </div>
        )}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
