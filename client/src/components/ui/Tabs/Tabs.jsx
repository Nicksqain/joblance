import React, { Children } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import "./tabs.scss";
const Tabs = ({ children, horizontal }) => {
  // REF
  const tabButtonRef = useRef();
  const tabsRef = useRef();
  const tabContentRef = useRef();
  // LOCATION
  const location = useLocation();

  // STATE
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  // CONST
  const tabsContent = [];
  // EFFECT
  // useEffect(() => {}, []);
  useEffect(() => {
    const tabButtons = tabsRef.current.childNodes;
    // Tab buttons click

    tabButtons.forEach((button, i) => {
      i === currentTab && button.classList.add("activeTab");
      button.onclick = (e) => {
        tabButtons.forEach((b) => b.classList.remove("activeTab"));
        button.classList.add("activeTab");
        setCurrentTab(e.currentTarget.querySelector(".tab-button").tabIndex);
      };
    });
    setTabs((prev) => [...prev, ...tabsContent]);
  }, [setTabs, currentTab]);

  return (
    <>
      <div className="tabs">
        <div ref={tabsRef} className="tabs-choose_panel">
          {Children.map(children, (child, i) => {
            tabsContent.push(child.props.children);
            return (
              <>
                <div className="tab">
                  {child.type.name === "Tab" && (
                    <div ref={tabButtonRef} tabIndex={i} className="tab-button">
                      {child.props.title}
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </div>
        <div className="tab-content">
          {tabs.map((content, i) => {
            return (
              <div key={i}>
                {currentTab === i ? (
                  <div key={i} ref={tabContentRef} className="tab-content-body">
                    {content}
                  </div>
                ) : (
                  void 0
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tabs;
