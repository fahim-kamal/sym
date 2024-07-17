"use client";

import { Children, cloneElement } from "react";
import { useState, useRef } from "react";

export default function TabGroup({ children, after = () => {} }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const registeredCallbacks = useRef(new Map());

  const handleTabClick = (key) => {
    let disableAfter = false;

    // make sure only one tab is selected at once
    if (selectedTab == null) {
      setSelectedTab(key);
    } else {
      if (selectedTab == key) {
        setSelectedTab(null);
      } else {
        // call reset cb
        setSelectedTab(key);
        const resetCB = registeredCallbacks.current.get(selectedTab);
        resetCB();
        disableAfter = true;
      }
    }

    // run callback
    const cb = registeredCallbacks.current.get(key);
    cb();

    // after
    if (!disableAfter) {
      after();
    }
  };

  const resetSelectedTab = () => setSelectedTab(null);

  return (
    <>
      {Children.map(children, (child, index) => {
        const { onClick } = child.props;

        // register the onclick callback
        registeredCallbacks.current.set(index, onClick);

        // return new child with callback
        const newChild = cloneElement(child, {
          onClick: () => handleTabClick(index),
          resetSelectedTab,
        });

        return newChild;
      })}
    </>
  );
}
