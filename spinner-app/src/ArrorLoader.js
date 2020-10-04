import React from "react";

const ArrowLoader = (props) => (
  <svg
    className="arror-loader"
    width={161}
    height={31}
    viewBox="0 0 161 31"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="half_grad" x2={`${props.loadVal}%`}>
        <stop
          offset="0%"
          style={{
            stopColor: "rgb(226,58,58,1)",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="40%"
          style={{
            stopColor: "rgb(219,209,116,1)",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="60%"
          style={{
            stopColor: "rgb(20,142,47,1)",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "grey",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
    </defs>
    <path
      d="M130.5 8.5C66.5 30.5 17.3333 12.3333 0 2.5C26 35.7 101.5 32.8333 136 23L140.5 31L161 2.5L126 0L130.5 8.5Z"
      fill="url(#half_grad)"
    />
  </svg>
);

export default ArrowLoader;
