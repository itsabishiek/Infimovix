import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { Share } from "@mui/icons-material";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function ShareMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        style={{
          backgroundColor: "var(--primary-color)",
          margin: "10px 5px",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Share />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: {
            display: "flex",
            padding: "0px",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: 3,
            border: "1px solid var(--primary-color)",
          },
        }}
        sx={{
          display: "flex",
        }}
      >
        <MenuItem onClick={handleClose}>
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EmailShareButton url={window.location.href}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton url={window.location.href}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TelegramShareButton url={window.location.href}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
