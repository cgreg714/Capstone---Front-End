//*Imports
import React, { useRef } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap'

//toDo form feedback for when required fields are left blank
//toDo integer values in form should not go to negative numbers

function MedCreate() {

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

    const medNameRef = useRef();
    const prescriberRef = useRef();
    const descriptionRef = useRef();
    const morningRef = useRef();
    const noonRef = useRef();
    const eveningRef = useRef();
    const bedtimeRef = useRef();
    const sundayRef = useRef();
    const mondayRef = useRef();
    const tuesdayRef = useRef();
    const wednesdayRef = useRef();
    const thursdayRef = useRef();
    const fridayRef = useRef();
    const saturdayRef = useRef();
    const doseRef = useRef();
    const unitRef = useRef();
    const dailyRef = useRef();
    const weeklyRef = useRef();
    const biWeeklyRef = useRef();
    const monthlyRef = useRef();
    const quantityRef = useRef();
    //const drugRef = useRef(); //*useRef for associated drug

    //! arrays
    const dayTimes = ['Morning', 'Noon', 'Evening', 'Bedtime'];

    const dayTimeRefs = [morningRef, noonRef, eveningRef, bedtimeRef];

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const weekDaysInnerRef = [sundayRef, mondayRef, tuesdayRef, wednesdayRef, thursdayRef, fridayRef, saturdayRef];

    const units = [ null, 'kg', 'g', 'mg', 'mcg', 'L', 'ml', 'cc', 'mol', 'mmol', 'units', 'tbsp', 'tsp'];

    const frequencyArray = [ 'daily', 'weekly', 'bi weekly', 'monthly'];

    const frequencyInnerRefArray = [dailyRef, weeklyRef, biWeeklyRef, monthlyRef]

    //* handleSubmit func
    const handleSubmit = async (e) => {
        e.preventDefault();
        //?console.log testing each ref
        // console.log(medNameRef.current.value)
        // console.log(prescriberRef.current.value)
        // console.log(descriptionRef.current.value)
        // console.log(morningRef.current.checked)
        // console.log(noonRef.current.checked)
        // console.log(eveningRef.current.checked)
        // console.log(bedtimeRef.current.checked)
        // console.log(sundayRef.current.checked)
        // console.log(mondayRef.current.checked)
        // console.log(tuesdayRef.current.checked)
        // console.log(wednesdayRef.current.checked)
        // console.log(thursdayRef.current.checked)
        // console.log(fridayRef.current.checked)
        // console.log(saturdayRef.current.checked)
        // console.log(doseRef.current.value)
        // console.log(unitRef.current.value)
        // console.log(dailyRef.current.checked);
        // console.log(weeklyRef.current.checked);
        // console.log(biWeeklyRef.current.checked);
        // console.log(monthlyRef.current.checked);

        const name = medNameRef.current.value;
        const description = descriptionRef.current.value;
        const unitOfMeasurement = unitRef.current.value;
        const dose = doseRef.current.value;
        const quantity = quantityRef.current.value;
        const prescriber = prescriberRef.current.value;
        const dateAdded = new Date();
        const day = new Date().getDate();
        const time = new Date().getHours(); //I am not sure what the distinction between dateAdded and time is but they are both in and working -- feel free to tweak
        const daily = dailyRef.current.checked;
        const weekly = weeklyRef.current.checked;
        const biWeekly = biWeeklyRef.current.checked;
        const monthly = monthlyRef.current.checked;

        let timeOfDay = {
            morning: morningRef.current.checked,
            noon: noonRef.current.checked,
            evening: eveningRef.current.checked,
            bedtime: bedtimeRef.current.checked
        };

        let dayOfTheWeek = {
            sunday: sundayRef.current.checked,
            monday: mondayRef.current.checked,
            tuesday: tuesdayRef.current.checked,
            wednesday: wednesdayRef.current.checked,
            thursday: thursdayRef.current.checked,
            friday: fridayRef.current.checked,
            saturday: saturdayRef.current.checked
        };

        
        let frequency = {
            time,
            timeOfDay,
            dayOfTheWeek,
            day,
            daily,
            weekly,
            biWeekly,
            monthly
        };

        //const associatedDrug = drugRef.current.value;

        //let url = `${baseURL}/medications --probably

        let bodyObj = JSON.stringify({
            name, description, unitOfMeasurement, dose, frequency, quantity, dateAdded, prescriber //, associatedDrug
        })
        console.log(bodyObj);

        //I believe this would be replaced with the contexts through axios -- //!untested backend/frontend connection

        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // // myHeaders.append('Authorization', props.token) //props required

        // const requestDataOptions = {
        //     header: myHeaders,
        //     body: bodyObj,
        //     method: 'POST'
        // }

        // try {
        //     const response = await fetch(url,requestDataOptions);//url from baseURL missing
        //     const data = await response.json();
        // } catch (err) {
        //     console.error(err.message)
        // }
    }

  return (
    <React.Fragment>
        <Container style={styles.medContainer}>
        <h1>Add Medication</h1>
        <Form onSubmit={handleSubmit}>
            <Row className='row-cols-lg-auto align-items-center'>
                <Col lg={8}>
            {/* Medication Name Input */}
            <FormGroup row>
                <Label sm={4}><h3>Medication</h3></Label>
                <Col sm={8}>
                <Input 
                autoComplete='off'
                innerRef={medNameRef}
                placeholder='Medication Name'
                />
                </Col>
            </FormGroup>
            {/* Prescriber Input */}
            <FormGroup row>
                <Label sm={4}><h3>Prescriber</h3></Label>
                <Col sm={8}>
                <Input 
                autoComplete='off'
                innerRef={prescriberRef}
                placeholder='Prescriber Name'
                />
                </Col>
            </FormGroup>
            {/* Associated Drug Input */}
            <FormGroup row>
                <Label sm={4}><h3>Associated Drug</h3></Label>
                <Col sm={8}>
                    <InputGroup>
                    {/* innerRef={drugRef} would go inside text input */}
                        <Input type='text' placeholder='associated drug'/>
                        <Input name='select' type='select'>
                            {/* populate with drug */}
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
                innerRef={descriptionRef}
                placeholder='Ex: For external pain...'
                />
                </Col>
            </FormGroup>
                <Row>
                    <Col sm={6}>
                        {/* Quantity Input */}
                        <FormGroup row>
                            <Label sm={4}><b>Quantity</b></Label>
                            <Col sm={8}>
                            <Input  type='number' placeholder='0' innerRef={quantityRef} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
            {/* units & dose input */}
            <FormGroup row>
                <Label sm={4}><b>Dose</b></Label>
                <Col sm={8}>
                <InputGroup>
                    <Input type='number' placeholder='0' innerRef={doseRef} />
                    <Input name='unit-select' type='select' innerRef={unitRef}>
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
                        {/* ### frequency ### */}
                        <FormGroup tag='fieldset'>
                            <legend>
                                <b>Select Frequency</b>
                            </legend>
                            {
                                frequencyArray.map((f,i)=>(
                                    <FormGroup inline check key={i}>
                                        <Input
                                        name="radio1"
                                        type="radio"
                                        innerRef={
                                            frequencyInnerRefArray[i]
                                        }
                                        />
                                        <Label check>
                                            {f}
                                        </Label>
                                    </FormGroup>
                                ))
                            }
                        </FormGroup>
                    
            {/* ###start of time of day check ### */}
            <Label><b>Time Of Day</b></Label>
            <br />
            {
                dayTimes.map((d,i)=> (
                    <FormGroup check inline key ={i}>
                        <Input type='checkbox' innerRef={dayTimeRefs[i]} />
                        <Label>{d}</Label>
                    </FormGroup>
                ))
            }
            {/* ###end of time of day check ### */}
            {/* ###Start of day of the week check ### */}
            <br />
            <Label><b>Day Of The Week</b></Label>
            {
                weekDays.map((weekDay,index)=>(
                    <FormGroup key={index} check style={styles.marginAuto}>
                        <Input type='checkbox' innerRef={weekDaysInnerRef[index]} />
                        <Label>{weekDay}</Label>
                    </FormGroup>
                ))
            }
            {/* ###end of day of the week check ### */}
                </Col>
            </Row>
            <Button color='success' style={{width:"75%"}}>Add Medication</Button>
        </Form>
        </Container>
    </React.Fragment>
  )
}

export default MedCreate