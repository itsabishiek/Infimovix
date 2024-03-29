import React, { useEffect, useState } from "react";
import "./ContentModal.css";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { Link } from "react-router-dom";
import Carousel from "../carousel/Carousel";
import { Backdrop, Fade, Modal, Button } from "@mui/material";
import { YouTube } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#040714",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <>
      {media_type === "tv" ? (
        <>
          <div type="button" className="media" onClick={handleOpen}>
            {children}
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              {content && (
                <div className={classes.paper}>
                  <div className="ContentModal">
                    <img
                      src={
                        content.poster_path
                          ? `${img_500}/${content.poster_path}`
                          : unavailable
                      }
                      alt={content.name || content.title}
                      className="ContentModal__portrait"
                    />
                    <img
                      src={
                        content.backdrop_path
                          ? `${img_500}/${content.backdrop_path}`
                          : unavailableLandscape
                      }
                      alt={content.name || content.title}
                      className="ContentModal__landscape"
                    />

                    <div className="ContentModal__about">
                      <span className="ContentModal__title">
                        {truncate(content.name || content.title, 27)} (
                        {(
                          content.first_air_date ||
                          content.release_date ||
                          "-----"
                        ).substring(0, 4)}
                        )
                      </span>
                      {content.tagline && (
                        <i className="tagline">{content.tagline}</i>
                      )}

                      <span className="ContentModal__description">
                        {content.overview}
                      </span>

                      <div>
                        <Carousel id={id} media_type={media_type} />
                      </div>

                      <Button
                        variant="contained"
                        startIcon={<YouTube />}
                        color="primary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the Trailer
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Fade>
          </Modal>
        </>
      ) : (
        <Link to={`/movie/${id}`} className="media">
          {children}
        </Link>
      )}
    </>
  );
}
