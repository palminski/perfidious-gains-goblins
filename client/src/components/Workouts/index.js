import React, { useState } from 'react';
import {Card, Row, Col} from 'react-bootstrap'

import WorkoutModal from '../WorkoutModal';
import $ from 'jquery';
import "./workout.css"

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { ADD_EXCERSIZE} from '../../utils/mutations';
import { Container } from 'reactstrap';

console.log(`apikey ${process.env.REACT_APP_API_KEY}`)


export function Workouts(props) {
    const [results, setResults] = useState([]);

    const {data} = useQuery(QUERY_ME);
    console.log(data);

    const [addExcersize] = useMutation(ADD_EXCERSIZE, {
        update(cache, {data: {addExcersize}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, excersizes: addExcersize.excersizes}}
                });
              } catch (error) {
                console.log(error);
              }
        }
    });

    
    //===[Modal Functions]========================
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        if (document.body.style.overflow !== 'hidden') {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100%";
        }
        else
        {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        };
        setModalOpen(!modalOpen);
    }


    async function callApi(muscle) {
        $.ajax ({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
            headers: {
                'X-Api-Key': process.env.REACT_APP_API_KEY,
            },
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
                setResults(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }


    async function addToJournal(excersizeName) {
        const excersizeInfo = {
            excersize:excersizeName,
            amount:0,
            units:"none",
            reps:0,
            sets:0,
        };

        await addExcersize({
            variables: excersizeInfo
        });
    };
        
    //===[Stuff to Render]========================
    return ( 
        <section>
            <Container fluid className="workout-section">
                <Container>
                    <h1 className="workout-title">
                        <strong>Workout List!</strong>
                    </h1>
                    <Row style={{ justifyContent: "center", paddingBottom: "10px"}}>
                        <Col md={2} className="workout-search">Exercises
                            <button onClick={toggleModal}>Find Excersises!</button> 
                        </Col>
                        <Col md={6} className="workout-card">
                        <>
                            <Card style={{width: '36rem', height: '45rem', text: 'black'}}>
                                <Card.Header>Workout</Card.Header>
                                <Card.Body>
                                    {/* <Card.Title>Exercises
                                        <button onClick={toggleModal}>Find Excersises!</button> 
                                    </Card.Title> */}
                                    <Card.Subtitle className="mb-2 bg-dark"></Card.Subtitle> 

                                    <Card.Text>
                                        {results && results.map((exercise,index) => (
                                            <div key={index[0]}>
                                            <p>Type:  {exercise.type}</p>
                                            <p>Muscle Group:  {exercise.muscle}</p>
                                            <p>Difficulty:  {exercise.difficulty}</p>
                                            <p>Equipment Used:  {exercise.equipment}</p>
                                            <h4>Instructions:</h4>
                                                <p>{exercise.instructions}</p>
                                                <button onClick={() => addToJournal(exercise.name)}>Add Excersize</button>
                                            </div>
                                        ))}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{width: '36rem', height: '45rem', text: 'black'}}>
                                <Card.Header>Workout</Card.Header>
                                <Card.Body>
                                    {/* <Card.Title>Exercises
                                        <button onClick={toggleModal}>Find Excersises!</button> 
                                    </Card.Title> */}
                                    <Card.Subtitle className="mb-2 bg-dark"></Card.Subtitle> 

                                    <Card.Text>
                                        {results && results.map((exercise,index) => (
                                            <div key={index[1]}>
                                            <p>Type:  {exercise.type}</p>
                                            <p>Muscle Group:  {exercise.muscle}</p>
                                            <p>Difficulty:  {exercise.difficulty}</p>
                                            <p>Equipment Used:  {exercise.equipment}</p>
                                            <h4>Instructions:</h4>
                                                <p>{exercise.instructions}</p>
                                                <button onClick={() => addToJournal(exercise.name)}>Add Excersize</button>
                                            </div>
                                        ))}
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </>
                        </Col>
                    </Row>
                </Container>
            </Container>
            
            {/* <footer>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
            </footer> */}
            {modalOpen &&
            <WorkoutModal onClose={toggleModal} callApi={callApi}/>}  
        </section>                                 
    );
    
}


        // <div>
        //     <h2> Exercises </h2>
        //     <button onClick={toggleModal}>Find Excersises!</button>
        //     <hr></hr>
        //         <ul className='results-list'>
        //             {results && results.map((exercise,index) => (
        //                 <li key={index}>
        //                     <h3>Name:  {exercise.name}</h3>
        //                     <button onClick={() => addToJournal(exercise.name)}>Add Excersize</button>
        //                     <p>Type:  {exercise.type}</p>
        //                     <p>Muscle Group:  {exercise.muscle}</p>
        //                     <p>Difficulty:  {exercise.difficulty}</p>
        //                     <p>Equipment Used:  {exercise.equipment}</p>
        //                     <h4>Instructions:</h4>
        //                         <p>{exercise.instructions}</p>
        //                     {/* <button onClick={() => addToJournal(exercise.name)}>Add Excersize</button> */}
        //                 </li>
        //             ))}
        //         </ul>
        //     <footer>
        //         <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
        //         <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
        //         <div id="root"></div>
        //     </footer>

        //     {modalOpen &&
        //         <WorkoutModal onClose={toggleModal} callApi={callApi}/>
        //     }
        // </div>



