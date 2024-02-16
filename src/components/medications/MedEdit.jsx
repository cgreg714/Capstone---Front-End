import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap'

function MedEdit() {

        //? global variables

        let styles={
            medContainer: {
                backgroundColor: "#9E1B32",
                padding: "5px",
                margin: "0 auto",
                color: "#FFF"
            },
            marginAuto: {
                width: '100px',
                margin: "0 auto"
            }
        }

        //*key/value pairs
        // const { id } = useParams();
        const [medName, setMedName] = useState('')
        const [medPrescriber, setPrescriber] = useState('')
        const [medDescription, setDescription] = useState('')
        // const [medMorning, setMorning] = useState('')
        // const [medNoon, setNoon] = useState('')
        // const [medEvening, setEvening] = useState('')
        // const [medBedtime, setBedTime] = useState('')
        // const [medSunday, setSunday] = useState('')
        // const [medMonday, setMonday] = useState('')
        // const [medTuesday, setTuesday] = useState('')
        // const [medWednesday, setWednesday] = useState('')
        // const [medThursday, setThursday] = useState('')
        // const [medFriday, setFriday] = useState('')
        // const [medSaturday, setSaturday] = useState('')
        const [medDose, setDose] = useState('')
        // const [medUnit, setUnit] = useState('')
        // const [medDaily, setDaily] = useState('')
        // const [medWeekly, setWeekly] = useState('')
        // const [medBiWeekly, setBiWeekly] = useState('')
        // const [medMonthly, setMonthly] = useState('')
        const [medQuantity, setQuantity] = useState('')
        // const [medDrug, setDrug] = useState('')

        //? arrays

        const dayTimes = ['Morning', 'Noon', 'Evening', 'Bedtime'];

        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const units = [ null, 'kg', 'g', 'mg', 'mcg', 'L', 'ml', 'cc', 'mol', 'mmol', 'units', 'tbsp', 'tsp'];

        const frequencyArray = [ 'daily', 'weekly', 'bi weekly', 'monthly'];
        

        //?Functions

        function changeValue() {
            console.log('change')
        }

        async function handleSubmit(e) {
            e.preventDefault();
            console.log('submit');
            console.log(medName);
            console.log(medPrescriber);
            console.log(medDescription);
            console.log(medQuantity);
            console.log(medDose);
            console.log(medUnit);
        }

  return (
    <React.Fragment>
        <Container style={styles.medContainer}>
            <h1>Edit Medication</h1>
            <Form onSubmit={handleSubmit}>
                <Row className='row-cols-lg-auto align-items-center'>
                    <Col lg={8}>
                        {/* Medication Name Input */}
                        <FormGroup row>
                            <Label sm={4}><h3>Medication</h3></Label>
                            <Col sm={8}>
                                <Input
                                autoComplete='off'
                                value={medName}
                                onChange={e =>setMedName(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        {/* Prescriber Input */}
                        <FormGroup row>
                        <Label sm={4}><h3>Prescriber</h3></Label>
                        <Col sm={8}>
                        <Input 
                        autoComplete='off'
                        value={medPrescriber}
                        onChange={e=>setPrescriber(e.target.value)}
                        />
                         </Col>
                        </FormGroup>
                        {/* Associated Drug Input */}
                        <FormGroup row>
                            <Label sm={4}><h3>Associated Drug</h3></Label>
                            <Col sm={8}>
                                <InputGroup>
                                <Input type='text' />
                                <Input name='select' type='select'>
                                    {/* populate with options from drug db */}
                                    <option>example 1</option>
                                    <option>example 2</option>
                                    <option>example 3</option>
                                </Input>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        {/* Description Input */}
                        <FormGroup row>
                            <Label sm={4}><h3>Description</h3></Label>
                            <Col sm={8}>
                                <Input
                                autoComplete='off'
                                type='textarea'
                                value={medDescription}
                                onChange={e=>setDescription(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <Row>
                            <Col sm={6}>
                                {/* Quantity Input */}
                                <FormGroup row>
                                    <Label sm={4}><b>Quantity</b></Label>
                                    <Col sm={8}>
                                        <Input type='number' value={medQuantity} onChange={e=>setQuantity(e.target.value)} />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                {/* units & dose input */}
                                <FormGroup row>
                                    <Label sm={4}><b>Dose</b></Label>
                                    <Col sm={8}>
                                        <InputGroup>
                                            <Input type='number' value={medDose} onChange={e=>setDose(e.target.value)} />
                                            <Input name='unit=select' type='select'>
                                            {
                                                units.map((u,i)=>(
                                                    <option key={i}>{u}</option>
                                                ))
                                            }
                                            </Input>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        {/* Frequency Input */}
                        <FormGroup tag='fieldset'>
                            <legend>
                                <b>Select Frequency</b>
                            </legend>
                            {
                                frequencyArray.map((f,i)=>(
                                    <FormGroup inline check key={i}>
                                        <Input
                                        name='radio1'
                                        type='radio'
                                        />
                                        <Label check>
                                            {f}
                                        </Label>
                                    </FormGroup>
                                ))
                            }
                        </FormGroup>
                        {/* Time of Day Input */}
                        <Label><b>Time Of Day</b></Label>
                        <br />
                        {
                            dayTimes.map((d,i)=>(
                                <FormGroup check inline key={i}>
                                    <Input type='checkbox'/>
                                    <Label>{d}</Label>
                                </FormGroup>
                            ))
                        }
                        <br />
                        <Label><b>Day Of The Week</b></Label>
                        {
                            weekDays.map((weekDay,index)=>(
                                <FormGroup key={index} check style={styles.marginAuto}>
                                    <Input type='checkbox' />
                                    <Label>{weekDay}</Label>
                                </FormGroup>
                            ))
                        }
                    </Col>
                </Row>
                <Button color='success' style={{width:"75%"}}>Edit Medication</Button>
            </Form>
        </Container>
    </React.Fragment>
  )
}

export default MedEdit