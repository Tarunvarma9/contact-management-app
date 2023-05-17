import React, { useState } from 'react';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { useLocation, useNavigate } from "react-router-dom";
import '../index.css'



const SideBar = () => {
  const history = useNavigate();
  const paths = [{
    path: '/',
    index: .0
  },
  {
    path: '/contacts',
    index: ".1"
  },
  {
    path: '/charts',
    index: ".2"
  }
  ]
  const onSelect = (event: any) => {
    history(event.target.props.route);
  };

  const setSelectedIndex = (pathName: any) => {
    let currentPath = paths.find((item) => item.path === pathName);
    return currentPath?.index;
  };

  const location = useLocation();
  const selected: any = setSelectedIndex(location.pathname);

  return (
    <>
      <nav className="panelbar-wrapper">
        <PanelBar
          selected={selected}
          expandMode={"single"}
          onSelect={onSelect}
        >
          <PanelBarItem
            iconClass={"fa-solid bi bi-ui-radios-grid mr-3"}
            title="Dashboard"
            route="/"
          />
          <PanelBarItem
            iconClass={"fa-solid fa-users mr-3"}
            title="Contacts"
            route="/contacts"
          />
          <PanelBarItem
            iconClass={"fa-solid fa-tree-city mr-3"}
            title="Charts&Maps"
            route="/charts"
          />

        </PanelBar>
      </nav>
    </>
  );
};

export default SideBar;
