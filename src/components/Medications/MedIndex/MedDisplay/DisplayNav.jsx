import React from 'react';
import { Button, Container, Col, Row, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';

function MedNav({ prescribers }) {
	// const categories = ["Prescriber", "Date Added" ];

	let doctors = [null];

	const timesOfDay = ['Morning', 'Noon', 'Evening', 'Night'];

	return (
		<React.Fragment>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container sx={{ minHeight: '500px' }}>
					<Navbar.Toggle aria-controls="basic-navbar-nav" style={{ width: '25%', margin: '0 auto' }} />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Navbar.Brand>Sort By</Navbar.Brand>
							{/* {
                        categories.map((category, index)=>(
                    <Nav.Link key={index} onClick={()=>console.log('click', category)}>{category}</Nav.Link>
                ))
            } */}
							<Nav.Link onClick={() => console.log('click date added')}>Date Added</Nav.Link>

							<NavDropdown title="Time Of Day" id="basic-nav-dropdown">
								{timesOfDay.map((time, index) => (
									<NavDropdown.Item key={index} onClick={() => console.log('click', time)}>
										{time}
									</NavDropdown.Item>
								))}
							</NavDropdown>
						</Nav>
						<Navbar.Brand>Search By</Navbar.Brand>
						<Nav className="me-auto">
							<Form inline style={{ margin: '5px auto' }}>
								<Row>
									<Col xs="7">
										<Form.Control type="text" placeholder="Medication Name" className=" mr-sm-2" />
									</Col>
									<Col xs="1">
										<Button type="submit">Search</Button>
									</Col>
								</Row>
							</Form>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</React.Fragment>
	);
}

export default MedNav;
