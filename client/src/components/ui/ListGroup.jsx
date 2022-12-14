import React, { memo, useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Children } from "react";
import "./listGroup.scss";
const ListGroup = ({
  children,
  setValue,
  horizontal,
  setDefault,
  selectable,
}) => {
  // HOOKS
  const listRef = useRef(null);

  // STATE
  const defaultOption = null;
  const [choosen, setChoosen] = useState(defaultOption);

  const orientationCheck = horizontal ? "list-group-horizontal" : "";
  // FUNCTIONS
  useEffect(() => {
    setValue(choosen);
  }, [choosen, setValue]);
  useEffect(() => {
    let listGroupItems = [...listRef.current.childNodes];
    // console.log(listGroupItems);

    listGroupItems.forEach((el, i) => {
      // Функция чистки состояния

      if (selectable) {
        // if (setDefault) {
        //   if (i === setDefault) {
        //     // Установить активным первый элемент
        //     el.setAttribute("isselected", "true");
        //     el.classList.add("active");
        //   } else {
        //     el.setAttribute("isselected", "false");
        //     el.classList.remove("active");
        //   }
        // }

        el.onclick = (event) => {
          // console.log(event.target);
          try {
            let currentOption = event.target.closest(".list-group-item");

            for (let i = 0; i < listGroupItems.length; i++) {
              listGroupItems[i].setAttribute("isselected", "false");
              listGroupItems[i].classList.remove("active");
            }
            currentOption.setAttribute("isselected", "active");
            currentOption.classList.add("active");

            setChoosen(currentOption.childNodes[0].getAttribute("selectValue"));
          } catch (error) {
            setChoosen(defaultOption);
          }
        };
      }
    });
  }, []);

  //   Render
  return (
    <div ref={listRef} className={`list-group ${orientationCheck}`}>
      {Children.map(children, (child, i) => {
        return (
          <div className={`list-group-item text-center w-100`}>{child}</div>
        );
      })}
    </div>
  );
};

export default memo(ListGroup);
