"use client";

import { cloneElement } from "react";
import { Unstable_Popup } from "@mui/base";
import { ClickAwayListener } from "@mui/base";

import { useState } from "react";

export default function Menu({ Base, Popup, placement }) {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleClick = (event) => setAnchor(anchor ? null : event.currentTarget);
  const handleClickAway = () => setAnchor(null);

  const PopupWithHandler = cloneElement(Popup, {
    handleClose: handleClickAway,
  });

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <div onClick={handleClick}>{Base}</div>
        <Unstable_Popup open={open} anchor={anchor} placement={placement}>
          {PopupWithHandler}
        </Unstable_Popup>
      </div>
    </ClickAwayListener>
  );
}
