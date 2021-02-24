import React from 'react';

/* ---------------------------- ChevronLink types --------------------------- */

type ChevronLinkProps = {
  fill: string;
  height: string;
  passedCSS: string;
  minHeight: string;
};

/* -------------------------- ChevronLink component ------------------------- */

export const ChevronLink = ({
  fill,
  height,
  passedCSS,
  minHeight,
}: ChevronLinkProps): JSX.Element => {
  return (
    <button
      type="button"
      css={passedCSS}
      style={{
        minHeight,
        height,
        padding: 0,
        border: 0,
        background: 'transparent',
      }}
    >
      <svg height="100%" viewBox="0 0 85 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="inner-shadow-filter-0" x="-500%" y="-500%" width="1000%" height="1000%">
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite operator="out" in="SourceGraphic" />
            <feComponentTransfer result="choke">
              <feFuncA type="linear" slope="1.75" />
            </feComponentTransfer>
            <feFlood floodColor="rgba(0,0,0,0.7)" result="color" />
            <feComposite operator="in" in="color" in2="choke" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
        <path d="M 85 50 L 85 190 L 0 240 L 0 0 L 85 50 Z" fill="#BDA453" />
        <path
          id="inner-fill"
          d="M 32.403 120.289 L 73.422 79.166 C 75.317 77.089 76.368 74.377 76.368 71.562 C 76.368 68.747 75.317 66.034 73.422 63.957 C 71.35 62.057 68.644 61.003 65.836 61.003 C 63.028 61.003 60.322 62.057 58.25 63.957 L 9.926 112.966 C 8.031 115.042 6.98 117.755 6.98 120.57 C 6.98 123.385 8.031 126.098 9.926 128.175 L 58.25 176.62 C 60.165 178.641 62.779 179.85 65.555 180 C 66.95 180.039 68.335 179.754 69.602 179.168 C 70.869 178.581 71.984 177.709 72.86 176.62 C 74.755 174.543 75.806 171.83 75.806 169.015 C 75.806 166.2 74.755 163.487 72.86 161.41 L 32.403 120.289 Z"
          fill={fill}
          style={{ filter: 'url(#inner-shadow-filter-0)' }}
        />
      </svg>
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* -------------------------------------------------------------------------- */

/* ------------------------- ChevronLinkHelper props ------------------------ */

type ChevronLinkHelperProps = {
  height: string;
  passedCSS: string;
  minHeight: string;
};

/* ----------------------- ChevronLinkHelper component ---------------------- */

export const ChevronLinkHelper = ({
  height,
  passedCSS,
  minHeight,
}: ChevronLinkHelperProps): JSX.Element => {
  return (
    <div
      css={passedCSS}
      style={{
        minHeight,
        height,
        padding: 0,
        border: 0,
        background: 'transparent',
      }}
    >
      <svg height="100%" viewBox="948.092 -441.03 87.5 240" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 1035.592 -390.53 L 1035.592 -251.03 L 949.592 -201.03 L 948.092 -441.03 L 1035.592 -390.53 Z"
          fill="#BDA453"
        />
      </svg>
    </div>
  );
};
