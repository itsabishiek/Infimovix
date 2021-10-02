import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "rgb(63, 81, 181)",
      },
      secondary: {
        main: "rgb(206, 41, 41)",
      },
    },
  });

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    // console.log(data);
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0", marginBottom: 10, marginTop: 30 }}>
      <ThemeProvider theme={darkTheme}>
        {selectedGenres?.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="secondary"
            size="small"
            clickable
            onDelete={() => handleRemove(genre)}
          />
        ))}
        {genres?.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="primary"
            size="small"
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
      </ThemeProvider>
    </div>
  );
};

export default Genres;
