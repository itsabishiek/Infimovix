import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./ControlledAccordions.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function ControlledAccordions({
  title,
  release_date,
  poster,
  overview,
  link,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{ backgroundColor: "#000522d0", marginBottom: 10 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{ width: "33%", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            {truncate(title, 35)}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              marginLeft: 20,
            }}
            className="accordion-release-date"
          >
            {release_date}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion-details">
            <div>
              <img className="accordion-img" src={poster} alt="" />
            </div>

            <div className="accordion-contents">
              <h2>{title}</h2>
              <p>{overview}</p>
              <Link to={link}>
                <Button variant="contained">Explore</Button>
              </Link>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
