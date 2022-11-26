import React, { ReactNode, useRef } from "react";
import * as ReactDom from "react-dom";
import { useSimpleModal } from "./useSimpleModal";

interface SimpleModalProps {
  children?: ReactNode;
}

const portalDiv: HTMLElement | null = document.getElementById("portal");

export const SimpleModal = ({ children }: SimpleModalProps) => {
  const node = useRef(null);
  const { isOpen, closeModal } = useSimpleModal();

  const handleOutsideClick = (e: any) => {
    console.log(node);
    console.log(e);
    if (node.current === e.target) closeModal();
  };

  if (isOpen) {
    document.addEventListener("click", (e) => handleOutsideClick(e));
  } else {
    document.removeEventListener("click", (e) => handleOutsideClick(e));
  }

  if (!portalDiv) {
    return <></>;
  }

  if (isOpen) {
    return ReactDom.createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: "10",
          backgroundColor: "rgba(0, 0, 0, .4)",
          width: "432px",
        }}
      >
        <div
          onClick={() => {
            closeModal();
          }}
          style={{ position: "fixed", width: "100%", height: "100%" }}
        />

        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            right: "10%",
            border: "solid",
            borderRadius: "5px",
            width: "320px",
            height: "240px",
            backgroundColor: "white",
            overflowY: "scroll",
            transform: "translate(-50%, -50%)"
          }}
        >
          <div style={{ margin: "20px" }}> {children}</div>
        </div>
      </div>,
      portalDiv
    );
  }
  return <></>;
};
