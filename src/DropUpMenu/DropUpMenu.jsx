import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import ReactDOM from 'react-dom'

/*
    File: DropdownMenu.js
    Description: Just a dropdown menu that can will display under a component. However, it is ESSENTIAL it is 
    right below the component you want it to belong to. It will automagically reposition itself in the browser window. 

    Props:
    props.maxHeight sets the max height for the menu
    props.height Sets the height for the menu.
    props.width Sets the width for the menu.
    props.isVisible Sets the visibility of the menu!

*/
class DropUpMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classProp: "show",
      isFadedOut: false,
      isFirstRun: true,
      windowWidth: null,
      windowHeight: null,
      menuWidth:undefined,
      menuYTranslate:0,
      menuTranslate: -(this.props.width/2),
    }
    this.menuWindow = React.createRef()
    this.setPosition = this.setPosition.bind(this)
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
  }

  GetElementAtPosition = (posX,posY)=>{
    var elem = document.elementFromPoint(posX, posY);
    if(elem===this.menuWindow){
      console.log("Window no obscured")
    }
    console.log(elem)

  }
  //***************************
  checkOutsideHandle = (e) =>{
    if(this.menuWindow.current!=null){
    if (!this.menuWindow.current.contains(e.target)&&this.menuWindow) {
      if(this.props.isVisible){
        this.props.onMenuClose()
    
      }  
    }
    }
  }
  //***************************
  componentWillUnmount() {

    window.removeEventListener("resize", this.handleResize)
  }
  handleResize = event =>{
    try{
      if (this.menuWindow.current != null) {
        this.setState({
          isFirstRun: true,
        })
        this.checkTranslate();
        this.setState({
          isFirstRun: false,
        })
      }
    }catch(e){
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      
    }}
  
  }

  
  setPosition(position){
    try{
     // console.log("Setting to position",position)
        const menuWidth = this.state.menuWidth
        
        if(position==="left" || position === "Left"){
          // Sets the content of the menu to the left
           var newValue = -1 * menuWidth + 20
           // We need to watch out for unneeded set states
           if(this.state.menuTranslate!==newValue){
            this.setState({
              menuTranslate: -1 * menuWidth + 20,
            })
           }
          

        }else if(position==="right" || position==="right"){
          //Set it to the right
          var newValue =1 * -20
          if(this.state.menuTranslate!==newValue){
          this.setState({
            menuTranslate: 1 * -20,
          })
        }
        }else{
            //console.log("Menu Width", this.state.menuWidth)
            // The default is to set it to middle
            var newValue =-1 * (menuWidth / 2)
            if(this.state.menuTranslate!==newValue){
            this.setState({
              menuTranslate: -1 * (menuWidth / 2),
            })
          }
        }
    }catch(e){
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
    }}
    }

  
  checkTranslate = () => {
   // Add this for mouse events

    try{

      if (this.state.isFirstRun) {
          
       
        var mWidth =
          this.menuWindow.current.getBoundingClientRect().right -
          this.menuWindow.current.getBoundingClientRect().left
          
        this.setState({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          menuTranslate: -1 * (mWidth / 2),
          menuWidth:mWidth,
        },
         ()=>{
        
       
       var mHeight = this.menuWindow.current.scrollHeight
       
       if(this.state.menuYTranslate === 0 || this.state.menuYTranslate!==mHeight){
       //    console.log(this.menuWindow.current.scrollHeight)
        this.setState({
            menuYTranslate:-1*(this.menuWindow.current.scrollHeight-12.5/2),
           })
       }
       
        var rightSideDistance = ~~(
          window.innerWidth -
          this.menuWindow.current.getBoundingClientRect().right
        )
        var leftSideDistance = this.menuWindow.current.getBoundingClientRect()
          .left

        if (rightSideDistance <= 20.0 && leftSideDistance <= 20) {
          // In this circumstance, it is a squeeze so we have to see 
          // which of the two is less small.
          
          if (rightSideDistance < leftSideDistance) {
            
            this.setState({
              menuTranslate: -1 * mWidth + 20,
            })
          } else {
            this.setState({
              menuTranslate: -1 * (mWidth / 2),
            })
          }
        }
        if (rightSideDistance <= 20.0) {
         this.setPosition("left")
        } else if (leftSideDistance <= 20) {
         
          this.setPosition("right")
        } else {
          if(this.props.defaultAlign){
              // we are override the default
              if(this.props.defaultAlign==="left" || this.props.defaultAlign==="Left" ){
                this.setPosition("left")
              }
              if(this.props.defaultAlign==="right" || this.props.defaultAlign==="Right" ){
                this.setPosition("right")
              }
          }
          else{
            this.setPosition("center")
          }
        }
      })
      }
    }catch(e){
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            console.log(e)
          
        }}
  }

  ChangeFirstRun = () => {
    //***************************
    this.AddListener()
    var leftBoundary = this.menuWindow.current.getBoundingClientRect().left
    var rightBoundary =this.menuWindow.current.getBoundingClientRect().right
    var posY  =this.menuWindow.current.getBoundingClientRect().y
  
   //this.GetElementAtPosition(leftBoundary-10,posY+10)
    //***************************
    this.setState({
      isFirstRun: false,
    })
  }
  //***************************
  AddListener = () =>{
       window.addEventListener('click', this.checkOutsideHandle, false);

  }
  RemoveListener = () =>{
    window.removeEventListener('click', this.checkOutsideHandle, false);

  }
//***************************
  render() {
    try {
      return this.props.isVisible ?(
        <Wrapper
          onAnimationStart={this.checkTranslate}
          onAnimationEnd={this.ChangeFirstRun}
          style={{ visibility: "show" }}
          className="show"
          
        >
          <TriangleTop 
          //***************************
          onClick={e => {
            // We are simply preventing the e based function up above from misfiring
            e.stopPropagation()
          
          }}
          //***************************
           />
          <MainContainer
          //***************************
          onClick={e => {
            // We are simply preventing the e based function up above from misfiring
            e.stopPropagation()
          }}
          //***************************
            ref={this.menuWindow}
            style={{
              transform: "translateX(" + this.state.menuTranslate + "px",
              width:"auto",
              top:""+this.state.menuYTranslate+"px",
            }}
          >
            <InnerChildContainer>{this.props.children}</InnerChildContainer>
          </MainContainer>
        </Wrapper>
     ) : !this.state.isFirstRun ? (
        <Wrapper className="hide"  
        //***************************
         onAnimationEnd={this.RemoveListener}
         //***************************
         >
          <TriangleTop />
          <MainContainer
            style={{
              transform: "translateX(" + this.state.menuTranslate + "px",
              width:"auto",
              top:""+this.state.menuYTranslate+"px",
            }}
          >
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
export default DropUpMenu

const FadeIn = keyframes`
from {
  transform-style: preserve-3d;
  transform-origin: 0px 0px;
  transform: rotateX(-20deg) translateY(-20.65px) translateX(50%);

  opacity: 0;
} 
to {
  transform-style: preserve-3d;
  transform-origin: 0px 0px;
  
  transform:  rotateX(0deg)translateY(-20.65px) translateX(50%);

  opacity:1;
}
`
const FadeOut = keyframes`
from {
  transform-style: preserve-3d;
  
  transform:rotateX(0deg) translateY(-20.65px) translateX(50%);

  visibility: visible;
  opacity: 1;
} 
to {
  transform-style: preserve-3d;
  
  transform: rotateX(-30deg) translateY(-20.65px) translateX(50%);

  opacity: 0;
  
}
`

const MainContainer = styled.div`
  position: absolute;
  overflow: hidden;
  /* Shadows */ 
    white-space: nowrap;
  /* Background */
  background-color: ${props => props.containerColor || "white"};

  /* Dimensions */
  height: ${props => props.height || ""};

  max-height: ${props => props.maxHeight || "420px"};
  max-width: ${props => props.maxWidth || ""};

  top: ${props => ``+(props.height)+`px` || "-219px"};

 /* width: ${props => `"`+props.width+`px` || "390px"}; */

  transform-origin: 0% 0%;
  z-index: 0;

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
`
const Wrapper = styled.div`
position:relative;
/* positioning */

transform: translateY(-20.65px) translateX(50%);
margin-left:auto; 
margin-right:auto;
/* Visibility */
visibility: hidden;
height:0;
width:0;
filter: drop-shadow(0 30px 60px  rgba(0, 0, 0, 0.4));

/* shadows are handles as multiple drop filters */

/* Animations */
&.show {
  
  visibility: visible !important;
  animation: ${FadeIn} 0.15s ease-in;
}
&.hide {
  animation: ${FadeOut} 0.15s ease-in;
}

`
const InnerChildContainer = styled.div`
  align-items: center;
  flex: 1;
  vertical-align: baseline;
`

const TriangleTop = styled.div`
  /* dimensions */
  width: 25px;
  height: 25px;

  background-color: ${props => props.containerColor || "white"};

  /* transforms */
  transform: translateX(50%) translateX(-12.5px) translateY(-60%)
    translateY(0px) rotate(45deg);
  transform-origin: 0% 0%;

  /* positioning */
  position: absolute;
  z-index: 1;
  left: auto;
  right: auto;

  /* Borders */
  border-radius: 2px;


`

DropUpMenu.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  isVisible: PropTypes.bool,
  onMenuClose: PropTypes.func,
  defaultAlign:PropTypes.string,
 
}
DropUpMenu.defaultProps = {
  isVisible: false,
  width:290,

  
  // ***************************
  onMenuClose: function(){}
  //*************************** */
}
