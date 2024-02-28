import React from 'react'
import { Button, Card, Container } from 'reactstrap'

function Styling() {

    /* 
    light theme

    app.css background color #ddd

    AppBar & Drawer background color #9E1B32, text color #fff
    link color #78C757

    card & form background color #eee, text color #5B200
    link color #DA575

    add button color and border color #3D9119
    edit button color and border color #136E57
    delete button color and border color #A9511D
    */

    /* 
    Dark Theme

    app.css background color #1c1c1c

    AppBar & Drawer background color #9E1B32, text color #fff
    link color #78C757 - same as light theme

    card & form background color #333, text color #E89665
    link color #DA575

    add button color and border color #3D9119
    edit button color and border color #136E57
    delete button color and border color #A9511D

    */


  return (
    <React.Fragment>
        {/* ### Start of Style for light Theme ### */}
        <Container style={{backgroundColor:'#9E1B32', height:'500px', color:'#fff'}}>
            <h1 style={{fontSize:'44px'}}>Header</h1>
            <p style={{fontSize:'18px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quia, quidem dolorem reiciendis accusantium corrupti vel necessitatibus molestias, ad, tempora quibusdam quam. Nulla nisi, asperiores praesentium unde ipsam omnis voluptatum.</p>
            <a href="#" style={{color:'#78C757'}}>Link to nowhere</a>
            <br />
            <Button style={{backgroundColor:'#3D9119'}}>Add</Button>
            <Button style={{backgroundColor:'#136E57', borderColor:'#136E57'}}>Edit</Button>
            <Button style={{backgroundColor:'#A9511D'}}>Delete</Button>
        </Container>
        <Container style={{backgroundColor:'#eee', height:'500px', color:'#5B2200'}}>
            <h1>Header</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus tempora perspiciatis, incidunt ad deserunt velit nihil quidem nisi minus recusandae soluta officia quo voluptas ea harum illum rerum! Dolores.</p>
            <a href="#" style={{color:'#DA5F75'}}>Link to nowhere</a>
            <br />
            <Button style={{backgroundColor:'#3D9119', borderColor:'#3D9119'}}>Add</Button>
            <Button style={{backgroundColor:'#136E57', borderColor:'#136E57'}}>Edit</Button>
            <Button style={{backgroundColor:'#A9511D', borderColor:'#A9511D'}}>Delete</Button>
        </Container>
        {/* ### End Of Light Theme ### */}



        {/* ### Start of Dark Theme ### */}
        <Container style={{backgroundColor:'#1c1c1c', height:'500px',padding:'15px'}}>
            <Container style={{backgroundColor:'#333', color:'#E89665'}}>
            <h1>Header</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus tempora perspiciatis, incidunt ad deserunt velit nihil quidem nisi minus recusandae soluta officia quo voluptas ea harum illum rerum! Dolores.</p>
            <a href="#" style={{color:'#DA5F75'}}>Link to nowhere</a>
            <br />
            <Button style={{backgroundColor:'#3D9119', borderColor:'#3D9119'}}>Add</Button>
            <Button style={{backgroundColor:'#136E57', borderColor:'#136E57'}}>Edit</Button>
            <Button style={{backgroundColor:'#A9511D', borderColor:'#A9511D'}}>Delete</Button>

            </Container>
            {/* ### End of Dark Theme ### */}
        </Container>
    </React.Fragment>
  )
}

export default Styling