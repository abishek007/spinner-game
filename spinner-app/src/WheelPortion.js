import React from "react";

const WheelPortion = (props) => {
  const { src, alt, imgClassName, className, pointsVal } = props;

  return (
    <span className={className}>
      <b>
        <img
          data-points={pointsVal}
          src={src}
          alt={alt}
          className={imgClassName}
        />
      </b>
    </span>
  );
};

export default WheelPortion;
