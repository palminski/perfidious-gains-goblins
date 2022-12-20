import React, { useState } from 'react';

import WorkoutModal from '../WorkoutModal';
import $ from 'jquery';
import "./workout.css"

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { ADD_EXCERSIZE} from '../../utils/mutations';

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
    return (
        <div>
            <h2> Exercises </h2>
            <button onClick={toggleModal}>Find Excersises!</button>
            <hr></hr>
                <ul className='results-list'>
                    {results && results.map((exercise,index) => (
                        <li key={index}>
                            <h3>{exercise.name}</h3>
                            <p>{exercise.instructions}</p>
                            <button onClick={() => addToJournal(exercise.name)}
                            
                            >Add Excersize</button>
                        </li>
                    ))}
                </ul>
                <footer>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
                    <div id="root"></div>
                </footer>

            {modalOpen &&
                <WorkoutModal onClose={toggleModal} callApi={callApi}/>
            }
        </div>
    )
};




