import React from "react";
import clock from "./../Assets/clock.png";
import lighting from "./../Assets/lighting.png";

interface SummaryProps {}

export const Summary = ({}: SummaryProps) => {
  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "30px",
        justifyContent: "center",
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "350px",
          height: "130px",
          border: "3px solid",
          borderRadius: "10px",
          borderColor: "rgba(58, 112, 39, 1)",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: "100%",
            borderBottom: "3px solid",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "20px",
            fontWeight: "bold",
            borderBottomColor: "rgba(58, 112, 39, 1)",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Today's usage
        </div>
        <img src={clock} style={{ width: "30px", margin: "6px" }} />
        <img src={lighting} style={{ width: "30px", margin: "6px" }} />
      </div>
    </div>
  );
};
