import React, { useState } from 'react';
// import {Card, Row, Col} from 'react-bootstrap'

import WorkoutModal from '../WorkoutModal';
import $ from 'jquery';
import "./workout.css"

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { ADD_EXERCISE} from '../../utils/mutations';
// import { Container } from 'reactstrap';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export function Workouts(props) {
    const [results, setResults] = useState([]);

    const {data} = useQuery(QUERY_ME);
    console.log(data);

    const [addExercise] = useMutation(ADD_EXERCISE, {
        update(cache, {data: {addExercise}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, exercises: addExercise.exercises}}
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


    async function addToJournal(exerciseName) {
        const exerciseInfo = {
            exercise:exerciseName,
            amount:0,
            units:"none",
            reps:0,
            sets:0,
        };

        await addExercise({
            variables: exerciseInfo
        });
    };
        
        //===[Stuff to Render]========================
    return  ( 
        <section>
            <Container fluid className="workout-section">

                <Row className="find-exercises">
                    <Button variant="dark" justify='center' size='lg' onClick={toggleModal}>Find Excersises!</Button> 

                </Row>
                <Row className="cards" sm={12} style={{ marginBottom: "10px", paddingBottom: "10px"}}>
                        {results && results.map((exercise) =>
                            <Col>
                                <Card className="workout-cards" style={{width: '30rem', height: '40rem', text: 'fit', text: 'black',}} >
                                <Card.Header>{exercise.name}</Card.Header>
                                    <Card.Body className="card-body">
                                        <Card.Text><b>Type:</b> {exercise.type} </Card.Text>
                                        <Card.Text><b>Muscle Group:</b> {exercise.muscle}</Card.Text>
                                        <Card.Text><b>Difficulty:</b> {exercise.difficulty}</Card.Text>
                                        <Card.Text><b>Equipment:</b> {exercise.equipment}</Card.Text>
                                        <Card.Text><b>Instructions:</b> {exercise.instructions}</Card.Text>
                                        <Button variant="dark" onClick={() => addToJournal(exercise.name)}>Add Exercise!</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                </Row>
            </Container>
            {modalOpen &&
            <WorkoutModal onClose={toggleModal} callApi={callApi}/>}  
        </section>                                 
    );

}





