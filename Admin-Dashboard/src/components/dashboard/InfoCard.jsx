import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const InfoCard = ({ bgColor, content, icon, stats, color, border }) => {
  const { collapse } = useContext(AppContext);
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: color,
        borderBottom: border,
        width: collapse ? "18.75em" : "15.25em"
      }}
      className=" cursor-pointer flex flex-col items-center justify-center  p-2 info-card h-[9em] shadow-md border-2 border-gray-50 bg-gray-400"
    >
      {icon}
      <h1 className="my-4 text-xl flex items-center font-bold">
        Number of {content}
      </h1>
      <p className="text-3xl">
        {stats}
      </p>
    </div>
  );
};

export default InfoCard;
