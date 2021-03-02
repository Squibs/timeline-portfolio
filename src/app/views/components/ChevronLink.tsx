import React from 'react';
import { Link } from 'gatsby';

/* ---------------------------- ChevronLink types --------------------------- */

type ChevronLinkProps = {
  fill: string;
  position: string;
  link: string;
  hover: string;
};

/* -------------------------- ChevronLink component ------------------------- */

/**
 * @param fill The color the chevron will be.
 * @param position Which side of the screen this should be (left or right).
 * @param link Where this should link to using Gatsby Link.
 * @param hover Color chevron and glow will be when link is hovered.
 */
export const ChevronLink = ({ fill, position, link, hover }: ChevronLinkProps): JSX.Element => {
  return (
    <>
      {/* link/button for page navigation */}
      <Link
        className="chevron-link"
        to={link}
        css={`
          transition: height 1s, min-height 1s;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-tap-highlight-color: transparent;

          & > svg > path:last-child {
            fill: ${fill};
            transition: all 0.5s;
            stroke: ${fill};
            stroke-width: 0px;
          }

          &:hover,
          &:focus {
            & > svg > path:last-child {
              fill: ${hover};
              transition: all 0.25s;
              stroke: ${hover};
              stroke-width: 5px;
            }

            & + div {
              filter: drop-shadow(8px 0px 16px ${hover}) !important;
            }
          }
        `}
        style={{
          minHeight: '100px',
          height: '15%',
          padding: 0,
          border: 0,
          background: 'transparent',
          cursor: 'pointer',
          zIndex: 6,
          position: 'absolute',
          top: '50%',
          [position]: '11px',
          transform: `translateY(-50%) scale(${position === 'left' ? '1' : '-1'}, 1)`,
          outline: 'none',
          transformOrigin: '50% 51%',
        }}
      >
        <svg height="100%" viewBox="0 0 85 240" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="inset-shadow">
              <feOffset dx="10" dy="10" />
              <feGaussianBlur stdDeviation="10" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="1" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComponentTransfer in="shadow" result="shadow">
                <feFuncA type="linear" slope=".75" />
              </feComponentTransfer>
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <path d="M 85 50 L 85 190 L 0 240 L 0 0 L 85 50 Z" fill="#BDA453" />
          <path
            d="M 32.403 120.289 L 73.422 79.166 C 75.317 77.089 76.368 74.377 76.368 71.562 C 76.368 68.747 75.317 66.034 73.422 63.957 C 71.35 62.057 68.644 61.003 65.836 61.003 C 63.028 61.003 60.322 62.057 58.25 63.957 L 9.926 112.966 C 8.031 115.042 6.98 117.755 6.98 120.57 C 6.98 123.385 8.031 126.098 9.926 128.175 L 58.25 176.62 C 60.165 178.641 62.779 179.85 65.555 180 C 66.95 180.039 68.335 179.754 69.602 179.168 C 70.869 178.581 71.984 177.709 72.86 176.62 C 74.755 174.543 75.806 171.83 75.806 169.015 C 75.806 166.2 74.755 163.487 72.86 161.41 L 32.403 120.289 Z"
            style={{ filter: 'url(#inset-shadow)' }}
          />
        </svg>
      </Link>

      {/* used only for drop-shadow on link/button above. This needs to go a layer below the border, while the above needs to go a layer above or be on the same layer as the border */}
      <div
        className="chevron-link"
        style={{
          minHeight: '100px',
          height: '15%',
          padding: 0,
          border: 0,
          background: 'transparent',
          zIndex: 4,
          position: 'absolute',
          top: '50%',
          filter: 'drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.55))',
          [position]: '11px',
          transform: `translateY(-50%) scale(${position === 'left' ? '1' : '-1'}, 1)`,
          transition: 'filter 0.5s, height 1s, min-height 1s',
          transformOrigin: '50% 51%',
        }}
      >
        <svg height="100%" viewBox="0 0 85 240" xmlns="http://www.w3.org/2000/svg">
          <path d="M 82 52 L 80 188 L 15 230 L 15 10 Z" fill="#BDA453" />
        </svg>
      </div>
    </>
  );
};

export default ChevronLink;
