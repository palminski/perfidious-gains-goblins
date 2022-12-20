import React, { useState } from 'react';

import WorkoutModal from '../WorkoutModal';
import $ from 'jquery';
import "./workout.css"

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { ADD_EXCERSIZE} from '../../utils/mutations';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

console.log(`apikey ${process.env.REACT_APP_API_KEY}`)


export function Workouts(props) {
    const [results, setResults] = useState([]);

    const {loading, data} = useQuery(QUERY_ME);
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
    }
        //===[Results]================================
        //This will set up a state that we can set to hold the results of API request so that we can render it on page
        // const [results,setResults] = React.useState('Placeholder for data to be rendered');

        
        //===[Stuff to Render]========================
    return  ( 
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
                            {results && results.map((exercise, index) =>
                                     <Card style={{width: '36rem', height: '45rem', text: 'black'}}>
                                     <Card.Header>{exercise.name}</Card.Header>
                                     <Card.Body>
                                         <Card.Text><b>Type:</b> {exercise.type}</Card.Text>
                                         <Card.Text><b>Muscle Group:</b> {exercise.muscle}</Card.Text>
                                         <Card.Text><b>Difficulty:</b> {exercise.difficulty}</Card.Text>
                                         <Card.Text><b>Equipment:</b> {exercise.equipment}</Card.Text>
                                         <Card.Text><b>Instructions:</b> {exercise.instructions}</Card.Text>
                                         <Button variant="dark"onClick={() => addToJournal(exercise.name)}>Add Exercise!</Button>
                                     </Card.Body>
                                 </Card>
                            )}
                       
                        </>
                        </Col>
                    </Row>
                </Container>
            </Container>
            {modalOpen &&
            <WorkoutModal onClose={toggleModal} callApi={callApi}/>}  
        </section>                                 
    );

}





