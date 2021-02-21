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

  ${(props) => props.theme.breakpoints.for0SmallPhonesOnly()`
    height: 165px;
  `};

  ${(props) => props.theme.breakpoints.for3TabletPortraitUp()`
    height: 340px;
  `}
`;

const SVGImage = styled.img`
  width: auto;
  height: 225px;
  position: absolute;
  margin-top: 10px;

  ${(props) => props.theme.breakpoints.for0SmallPhonesOnly()`
    height: 150px;
  `};

  ${(props) => props.theme.breakpoints.for3TabletPortraitUp()`
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

  ${(props) => props.theme.breakpoints.for0SmallPhonesOnly()`
    height: 150px;
    width: 150px;
  `};

  ${(props) => props.theme.breakpoints.for3TabletPortraitUp()`
    height: 325px;
    width: 325px;
  `}
`;

const portraitStyle = {};

/* -------------------------------- component ------------------------------- */

// argument against using React.FC
// https://github.com/facebook/create-react-app/pull/8177
const PortraitWithBackground = (): JSX.Element => {
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
    <PortraitContainer>
      <SVGImage src={data.images.nodes[0].publicURL} alt="" />
      <ImageCropper>
        <Img
          fluid={data.images.nodes[1].childImageSharp.fluid}
          alt="Self portrait of Zachary Holman"
          style={portraitStyle}
        />
      </ImageCropper>
    </PortraitContainer>
  );
};

export default PortraitWithBackground;
