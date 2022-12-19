import React from 'react';
import WorkoutModal from '../WorkoutModal';
import $ from 'jquery';
import "./workout.css"

console.log(`apikey ${process.env.REACT_APP_API_KEY}`)


export function Workouts(props) {
    
    //===[Modal Functions]========================
    const [modalOpen, setModalOpen] = React.useState(false);
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

    // const api_url = "https://api.api-ninjas.com/v1/exercises?muscle=";  
        // method: 'GET',
        // url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
        // headers: { 'X-Api-Key': '15098ea48cmsh2b43d6524135209p13664ejsnd412390146b4'},
        // contentType: 'application/json',
        // success: function(result) {
        //     console.log(result);
        // },
        // error: function ajaxError(jqXHR) {
        //     console.error('Error: ', jqXHR.responseText);
        // }
    
      


    async function useApi(muscle) {
        // const apiUrl = url + muscle
        // const response = await fetch(apiUrl, {
        //     method: 'GET',
        //     withcredentials: true,
        //     headers: {
        //         'X-Api-Key': process.env.REACT_APP_API_KEY,
        //     }
        // });
        // console.log(response);
        $.ajax ({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
            headers: {
                'X-Api-Key': process.env.REACT_APP_API_KEY,
            },
            contentType: 'application/json',
            success: function(result) {
                console.log(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        })
    }
        useApi('biceps');
        
        // Setting innerHTML as tab variable
    // document.getElementById('workouts').innerHTML = tab;

        //===[Results]================================
        //This will set up a state that we can set to hold the results of API request so that we can render it on page
        const [results,setResults] = React.useState('Placeholder for data to be rendered');

        
        //===[Stuff to Render]========================
        return (
            <div>

                <h2> Exercises </h2>
                <button onClick={toggleModal}>Find Excersises!</button>

                <div className='results-list'>
                    <hr/>
                    <h1>{results}</h1>
                </div>

                <footer>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
                    <div id="root"></div>
                </footer>

                {modalOpen &&
                    <WorkoutModal onClose={toggleModal} setResults={setResults} />
                }



            </div>
        );
};


export default Workouts;

