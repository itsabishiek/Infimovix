import {
  Button,
  createTheme,
  Tab,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Tabs } from "@material-ui/core";
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../components/customPagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setContent(data.results);
      setNumOfPages(data.total_pages);
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
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            color="inherit"
            indicatorColor="primary"
            textColor="primary"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 20 }}
            type="submit"
          >
            <SearchIcon
              fontSize="large"
              color="primary"
              indicatorColor="primary"
              type="submit"
            />
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
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}

        {searchText === "" &&
          !content &&
          (type ? (
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
                Search TV Series
              </h2>
            </div>
          ) : (
            <div>
              <img
                style={{ marginTop: 35, width: "300px", height: "300px" }}
                src="/assets/images/search.svg"
                alt=""
              />
              <h2
                style={{
                  textAlign: "center",
                  color: "rgb(63, 81, 181)",
                  margin: 0,
                }}
              >
                Search Movies
              </h2>
            </div>
          ))}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
