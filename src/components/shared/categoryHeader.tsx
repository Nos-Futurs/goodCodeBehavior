import React from "react";
import dropDownImage from "./../assets/dropdown.png";
import dropUpImage from "./../assets/dropup.png";

interface categoryHeaderProps {
  title: string;
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  dropDown: boolean;
}

export const CategoryHeader = ({
  title,
  setDropDown,
  dropDown,
}: categoryHeaderProps) => {
  return (
    <div
      style={{
        fontSize: "20px",
        borderColor: "#282c34",
        display: "flex",
        width: "40%",
        padding: "8px",
        marginLeft: "10px",
        borderBottom: "solid",
        borderBottomWidth: "2px",
        textTransform: "uppercase",
        fontWeight: "600",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          paddingRight: "10px",
        }}
      >
        {title}
      </div>
      {!dropDown ? (
        <button>
          <img
            style={{ width: "10px", height: "10px" }}
            src={dropDownImage}
            alt="dropdown_image"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          />
        </button>
      ) : (
        <button>
          <img
            style={{ width: "10px", height: "10px" }}
            src={dropUpImage}
            alt="dropup_image"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          />
        </button>
      )}
    </div>
  );
};
