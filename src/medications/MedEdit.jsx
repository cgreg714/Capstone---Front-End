import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap'

//toDO pass in {token} for auth as props
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
        const [medMorning, setMorning] = useState(false)
        const [medNoon, setNoon] = useState(false)
        const [medEvening, setEvening] = useState(false)
        const [medBedtime, setBedTime] = useState(false)
        const [medSunday, setSunday] = useState(false)
        const [medMonday, setMonday] = useState(false)
        const [medTuesday, setTuesday] = useState(false)
        const [medWednesday, setWednesday] = useState(false)
        const [medThursday, setThursday] = useState(false)
        const [medFriday, setFriday] = useState(false)
        const [medSaturday, setSaturday] = useState(false)
        const [medDose, setDose] = useState('')
        const [medUnit, setUnit] = useState('')
        const [medFrequency, setFrequency] = useState('')
        const [medQuantity, setQuantity] = useState('')
        // const [medDrug, setDrug] = useState('')
        // const [medDay, setDay] = useState('')
        // const [ medTime, setTime ] = useState('')
        // const [ medAdded, setAdded ] = useState('')

        //? arrays

        const dayTimes = ['Morning', 'Noon', 'Evening', 'Bedtime'];

        const setDayTimeStates = [setMorning, setNoon, setEvening, setBedTime];

        let dayTimesStates = [medMorning, medNoon, medEvening, medBedtime];

        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const setWeekDaysStates = [setSunday, setMonday, setTuesday, setWednesday, setThursday, setFriday, setSaturday];

        let weekDaysStates = [medSunday, medMonday, medTuesday, medWednesday, medThursday, medFriday, medSaturday];

        const units = [ null, 'kg', 'g', 'mg', 'mcg', 'L', 'ml', 'cc', 'mol', 'mmol', 'units', 'tbsp', 'tsp'];

        const frequencyArray = [ 'daily', 'weekly', 'bi weekly', 'monthly'];
        

        //?Functions

        //toDo fetch medication through user context
        //!needs to be tested
        // const fetchMedication = async () => {
        //     const url = `url that we have setup`

        //     const requestOptions = {
        //         method: 'GET',
        //         headers: new Headers({
        //             'Authorization': token
        //         })
        //     }
            // try {
            //     const res = await fetch(url,requestOptions);
            //     const data = await res.json();

            //     const{name, description, unitOfMeasurement, dose, frequency:{time,timeOfDay:{morning,noon,evening,bedtime},dayOfTheWeek:{sunday,monday,tuesday,wednesday,thursday,friday,saturday},day,daily,weekly,biWeekly,monthly}, quantity, dateAdded, prescriber //, associatedDrug
            //     } = data.results[0];
            //     setMedName(name);
            //     setDescription(description);
            //     setUnit(unitOfMeasurement);
            //     setDose(dose);
            //     setTime(time);
            //     setFrequency([daily, weekly,biWeekly,monthly]);
            //     setDay(day)
            //     setMorning(morning);
            //     setNoon(noon);
            //     setEvening(evening);
            //     setBedTime(bedtime);
            //     setSunday(sunday);
            //     setMonday(monday);
            //     setTuesday(tuesday);
            //     setWednesday(wednesday);
            //     setThursday(thursday);
            //     setFriday(friday);
            //     setSaturday(saturday);
            //     setQuantity(quantity);
            //     setAdded(dateAdded);
            //     setPrescriber(prescriber);

            // } catch (err) {
            //     console.error(err.message)
            // }

        // }

        // useEffect(() => {
        //     if(token){
        //         fetchMedication();
        //     }
        // },[token])

        async function handleSubmit(e) {
            e.preventDefault();
            //testing
            // console.log('submit');
            // console.log(medName);
            // console.log(medPrescriber);
            // console.log(medDescription);
            // console.log(medQuantity);
            // console.log(medDose);
            // console.log(medUnit);
            // console.log(medFrequency.f);

            //?frequency variables
            let medDaily;
            let medWeekly;
            let medBiWeekly;
            let medMonthly;

            //?Select Frequency(daily,weekly,biweekly,monthly) switch conditional to set true/false values
            //this could have probably been made more simply than this
            switch(medFrequency.f) {
                case "daily":
                    medDaily = true;
                    medWeekly = false;
                    medBiWeekly = false;
                    medMonthly = false;
                    break;
                case "weekly":
                    medDaily = false;
                    medWeekly = true;
                    medBiWeekly = false;
                    medMonthly = false;
                    break;
                case "bi weekly":
                    medDaily = false;
                    medWeekly = false;
                    medBiWeekly = true;
                    medMonthly = false;
                    break;
                case "monthly":
                    medDaily = false;
                    medWeekly = false;
                    medBiWeekly = false;
                    medMonthly = true;
                    break;
                    default:
                    medDaily = null;
                    medWeekly = null;
                    medBiWeekly = null;
                    medMonthly = null;
            }
            //testing switch statement
            // console.log(medDaily, medWeekly, medBiWeekly, medMonthly);

            //*JSON compiling
            let timeOfDay = {
                //these didnt have to be nested in arrays but the way i initially(wrongly) worked on them called for arrays so im leaving them in. look its been a long grueling 4 weeks im just hoping this will be over soon.
                morning: dayTimesStates[0],
                noon: dayTimesStates[1],
                evening: dayTimesStates[2],
                bedtime:dayTimesStates[3]
            }



            let dayOfTheWeek = {
                sunday: weekDaysStates[0],
                monday: weekDaysStates[1],
                tuesday: weekDaysStates[2],
                wednesday: weekDaysStates[3],
                thursday: weekDaysStates[4],
                friday: weekDaysStates[5],
                saturday: weekDaysStates[6]
            }

            let daily = medDaily;
            let weekly= medWeekly;
            let biWeekly= medBiWeekly;
            let monthly= medMonthly;

            let medicationFreq = {
                timeOfDay,
                dayOfTheWeek,
                daily,
                weekly,
                biWeekly,
                monthly
            }

            let body = JSON.stringify({
                name: medName,
                description: medDescription,
                unitOfMeasurement: medUnit,
                dose: medDose,
                frequency: medicationFreq,
                quantity: medQuantity,
                prescriber: medPrescriber
            })

            console.log(body)

        
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
                                            <Input name='unit=select' type='select' onChange={e=>setUnit(e.target.value)}>
                                            {
                                                units.map((u,i)=>(
                                                    <option key={i} className='unitSelect'>{u}</option>
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
                                        onChange={()=>setFrequency({f})}
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
                                    <Input type='checkbox' onChange={e=>{console.log(e.target.checked),setDayTimeStates[i](e.target.checked)}}/>
                                    <Label>{d}</Label>
                                </FormGroup>
                            ))
                        }
                        <br />
                        <Label><b>Day Of The Week</b></Label>
                        {
                            weekDays.map((weekDay,index)=>(
                                <FormGroup key={index} check style={styles.marginAuto}>
                                    <Input type='checkbox' onChange={e=>setWeekDaysStates[index](e.target.checked)}/>
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