import React from "react";
import dropDownImage from "./../Assets/dropdown.png";
import dropUpImage from "./../Assets/dropup.png";

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
        marginLeft: "15px",
        borderBottom: "solid",
        borderBottomWidth: "2px",
        borderBottomColor: "rgba(58, 112, 39, 1)",
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
      <ButtonDropDown isDropDownOpen={dropDown} setDropDown={setDropDown} />
    </div>
  );
};

interface DropDownButton {
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  isDropDownOpen: boolean;
}

const ButtonDropDown = ({ isDropDownOpen, setDropDown }: DropDownButton) => {
  return (
    <button
      onClick={() => {
        setDropDown(!isDropDownOpen);
      }}
    >
      <img
        style={{ width: "10px", height: "10px" }}
        src={isDropDownOpen ? dropUpImage : dropDownImage}
        alt="dropup_image"
      />
    </button>
  );
};
