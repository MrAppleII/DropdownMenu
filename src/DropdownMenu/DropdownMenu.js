import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"

/*
    File: DropdownMenu.js
    Description: Just a dropdown menu that can will display under a component. However, it is ESSENTIAL it is 
    right below the component you want it to belong to.

    Props:
    props.height Sets the height for the menu.
    props.width Sets the width for the menu.
    props.isVisible Sets the visibilty of the menu!

*/
class DropdownMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classProp: "show",
      isFadedOut: false,
      isFirstRun: true,
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}

  ChangeFirstRun = () => {
    this.setState({
      isFirstRun: false,
    })
  }

  render() {
    try {
      return this.props.isVisible ? (
        <Wrapper>
          <MainContainer
            onAnimationEnd={this.ChangeFirstRun}
            style={{ visibility: "show" }}
            className="show"
          >
            <TriangleTop />
            <InnerChildContainer>{this.props.children}</InnerChildContainer>
          </MainContainer>
        </Wrapper>
      ) : !this.state.isFirstRun ? (
        <Wrapper>
          <MainContainer className="hide">
            <TriangleTop />
            <InnerChildContainer>{this.props.children}</InnerChildContainer>
          </MainContainer>
        </Wrapper>
      ) : null
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
export default DropdownMenu

const FadeIn = keyframes`
from {
  transform-style: preserve-3d;
  transform-origin: 0px 0px;
  transform:  translateX(-50%) rotateX(-20deg);
  
  opacity: 0;
} 
to {
  transform-style: preserve-3d;
  transform-origin: 0px 0px;
  
  transform: translateX(-50%) rotateX(0deg);

  opacity: 0.99;
}
`
const FadeOut = keyframes`
from {
  transform-style: preserve-3d;
  transform:  translateX(-50%) rotateX(0deg);

  visibility: visible;
  opacity: 0.99;
} 
to {
  transform-style: preserve-3d;
  transform: translateX(-50%) rotateX(-30deg);

  opacity: 0;
  
}
`

const MainContainer = styled.div`
  position: absolute;
  /* Visibility */
  visibility: hidden;

  /* Shadows */
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
    0 30px 60px -30px rgba(0, 0, 0, 0.3),
    0 -18px 60px -10px rgba(0, 0, 0, 0.025);

  /* Background */
  background-color: ${props => props.containerColor || "white"};

  /* Dimensions */
  height: ${props => props.height || "420px"};
  width: ${props => props.width || "390px"};

  /* transforms */
  transform: translateX(-50%);
  transform-origin: 0% 0%;
  will-change: transform, opacity;

  /* Borders */
  border-radius: 8px;

  /* Item Alignment */
  display: flex;
  flex-shrink: 0;
  flex-direction: col;
  vertical-align: baseline;
  justify-content: center;

  /* Padding */
  padding: 20px;

  /* Fonts */
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  color: #000;

  /* Animations :D */
  &.show {
    visibility: visible !important;
    animation: ${FadeIn} 0.15s ease-in;
  }
  &.hide {
    animation: ${FadeOut} 0.15s ease-in;
  }
`
const Wrapper = styled.div`
position:relative
/* positioning */
left:auto;
right:auto;


`
const InnerChildContainer = styled.div`
  aign-items: center;
  flex: 1;
  vertical-align: baseline;
`

const TriangleTop = styled.div`
  /* dimensions */
  width: 25px;
  height: 25px;

  background-color: ${props => props.containerColor || "white"};

  /* transforms */
  transform: translateX(50%) rotate(45deg);
  transform-origin: 0% 0%;

  /* positioning */
  position: absolute;
  top: -10px;
  left: auto;
  right: auto;

  /*shadows*/
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
    0 30px 60px -30px rgba(0, 0, 0, 0.3),
    0 -18px 60px -10px rgba(0, 0, 0, 0.025);
`

DropdownMenu.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  isVisible: PropTypes.bool,
}
DropdownMenu.defaultProps = {
  isVisible: false,
}
