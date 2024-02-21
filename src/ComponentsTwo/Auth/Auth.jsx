import React, {useState} from 'react';
 import Login from './Login/Login';
 import { Container, Row, Col, Button} from 'reactstrap';

 export default function Auth(props) {

    const [ button, setButton ] = useState('Signup')

    const swapForm = () => {
        button === 'Login' ?
        setButton('Signup') :
        setButton('Login')
    }

    const loginForm = () => {
        return(
        button === 'Login' ?
        <Container>
            <Row>
                <Col md='6'>
                    <Login
                    updateToken={props.updateToken}
                    />
                    </Col>
            </Row>
        </Container> :
        <Container>
            <Row>
                <Col md='6'>
                    {/* <Signup
                    updateToken={props.updateToken}
                    /> */}
                </Col>
            </Row>
        </Container>
        )
    }
    return (
        <>
        <Button onClick={swapForm}
        color='light'>
            {button}
        </Button>
        {loginForm()}
        </>
    )

 }



