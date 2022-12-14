import React, { useState } from 'react';

import WorkoutModal from '../WorkoutModal';
import $ from 'jquery';
import "../style.css";

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { ADD_EXERCISE } from '../../utils/mutations';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export function Workouts(props) {
    const [results, setResults] = useState([]);

    const { data } = useQuery(QUERY_ME);
    console.log(data);

    const [addExercise] = useMutation(ADD_EXERCISE, {
        update(cache, { data: { addExercise } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, exercises: addExercise.exercises } }
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
        else {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        };
        setModalOpen(!modalOpen);
    }


    async function callApi(muscle) {
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
            headers: {
                'X-Api-Key': process.env.REACT_APP_API_KEY,
            },
            contentType: 'application/json',
            success: function (result) {
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
            exercise: exerciseName,
            amount: 0,
            units: "none",
            reps: 0,
            sets: 0,
        };

        await addExercise({
            variables: exerciseInfo
        });
    };

    //===[Stuff to Render]========================
    return (
        <section>
            <Container fluid className="workout-section">
                <Row className="find-exercises">
                    <Col>
                        <Button variant="secondary" border="dark" size='lg' md={12} style={{ justifyContent: 'center' }} onClick={toggleModal}>Find Exercises!</Button>
                    </Col>
                </Row>
            </Container>
            <Container className='workout-card-container'>
                <Row style={{justifyContent:'center', alignItems:'center'}}>
                    {results && results.map((exercise) =>
                        <Col className="workout-cards" md={6}>
                            <Card border='dark' style={{height: '40rem', text: 'fit', text: 'black', overflow: 'auto' }} >
                                <Card.Header className=''><b>{exercise.name}</b></Card.Header>
                                <Card.Body className="card-body">
                                    <Card.Text><b>Type:</b> {exercise.type} </Card.Text>
                                    <Card.Text><b>Muscle Group:</b> {exercise.muscle}</Card.Text>
                                    <Card.Text><b>Difficulty:</b> {exercise.difficulty}</Card.Text>
                                    <Card.Text><b>Equipment:</b> {exercise.equipment}</Card.Text>
                                    <Card.Text><b>Instructions:</b> {exercise.instructions}</Card.Text>
                                    <Button variant="secondary" onClick={() => addToJournal(exercise.name)}>Add Exercise!</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
            {
                modalOpen &&
                <WorkoutModal onClose={toggleModal} callApi={callApi} />
            }
        </section >
    );

}





