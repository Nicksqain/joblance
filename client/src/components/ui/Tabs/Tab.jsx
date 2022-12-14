import React, { Children } from "react";

const Tab = ({ children }) => {
  return (
    <>
      {Children.map(children, (child, i) => {
        console.log(child);
        return <>{child.props.title}</>;
      })}
      ;
    </>
  );
};

export default Tab;
