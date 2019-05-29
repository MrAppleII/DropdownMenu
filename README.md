# DropdownMenu
Its a react drop down menu with adjustable height and width.

# Props 

Props:

props.maxHeight Sets the MAX height for the menu.


props.height Sets the height for the menu.

props.width Sets the width for the menu.

props.isVisible Sets the visibilty of the menu!

For Proper alignment. Try the usual center Column CSS code. 
```
const Holder = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`


  <Holder>
           <ProfileImage image={userImage} size={50}> </ProfileImage>
           <DropdownMenu  isVisible={this.state.isMenuVisible}>
              <h3 style={{textAlign:"center"}}>Profile</h3>
              <div style={{color:"#404040"}}>My Account</div>
              <div  style={{color:"#404040"}}>Settings</div>
              <div  style={{color:"#404040"}}>My Videos</div>

              <div  style={{color:"#404040"}}>Get Trueclap Pro</div>
              <div style={{color:"#404040"}}>Log Out</div>
            </DropdownMenu>

 </ Holder>
```

This should center the menu right under the profile menu. 

