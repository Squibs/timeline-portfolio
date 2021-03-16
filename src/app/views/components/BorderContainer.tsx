import styled from 'styled-components';

const BorderContainer = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid #bda453;
  border-radius: 5px;
  /* causes lag/scrolling issues on some devices, while box-shadow does not
     this could be something to keep in mind on further projects, so I'm leaving this note
     here, that I will probably end up forgetting about. */
  /* filter: drop-shadow(0 4px 4px black); */
  box-shadow: inset 1px 2px 6px black, 0px 4px 6px black;
  pointer-events: none;
  min-width: 230px;
  z-index: 2;
  will-change: transform; // potential performance aid (https://medium.com/@kulor/one-small-css-hack-to-improve-scrolling-performance-c5238029e518)
`;

export default BorderContainer;
