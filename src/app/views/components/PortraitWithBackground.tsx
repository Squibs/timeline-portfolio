import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

/* --------------------------------- styles --------------------------------- */

const PortraitContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 250px;

  ${({ theme }) => theme.breakpoints.for1SmallPhonesOnly()`
    height: 165px;
  `};

  ${({ theme }) => theme.breakpoints.for3TabletPortraitUp()`
    height: 340px;
  `}
`;

const SVGImage = styled.img`
  width: auto;
  height: 225px;
  position: absolute;
  margin-top: 10px;

  ${({ theme }) => theme.breakpoints.for1SmallPhonesOnly()`
    height: 150px;
  `};

  ${({ theme }) => theme.breakpoints.for3TabletPortraitUp()`
    height: 325px;
  `}
`;

const ImageCropper = styled.div`
  width: 225px;
  height: 225px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin-top: 8px;

  ${({ theme }) => theme.breakpoints.for1SmallPhonesOnly()`
    height: 150px;
    width: 150px;
  `};

  ${({ theme }) => theme.breakpoints.for3TabletPortraitUp()`
    height: 325px;
    width: 325px;
  `}
`;

/* ---------------------------------- types --------------------------------- */

type PortraitWithBackgroundProps = {
  style?: React.CSSProperties;
};

type Props = PortraitWithBackgroundProps;

/* ------------------------------ default props ----------------------------- */

const defaultProps = {
  style: {},
};

/* -------------------------------- component ------------------------------- */

// argument against using React.FC
// https://github.com/facebook/create-react-app/pull/8177
const PortraitWithBackground = ({ style }: Props): JSX.Element => {
  // working with gatsby images
  // https://www.youtube.com/watch?v=wTQtTjovDa0 - in-depth gatsby-image tutorial
  const data = useStaticQuery(graphql`
    query Images {
      images: allFile(filter: { relativeDirectory: { eq: "indexPage" } }) {
        nodes {
          id
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  return (
    <PortraitContainer style={style}>
      <SVGImage src={data.images.nodes[0].publicURL} alt="" />
      <ImageCropper>
        <Img
          fluid={data.images.nodes[1].childImageSharp.fluid}
          alt="Self portrait of Zachary Holman"
        />
      </ImageCropper>
    </PortraitContainer>
  );
};

PortraitWithBackground.defaultProps = defaultProps;

export default PortraitWithBackground;
