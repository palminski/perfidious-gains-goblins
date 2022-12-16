import State from '';
import React from 'react';
// import ReactDOMClient from 'react-dom/client';
import Select from 'react-select';
import MuscleList from '../WorkoutModal';
import "./workout.css"

const muscle = {
    method: 'GET',
    url: ("https://api.api-ninjas.com/v1/exercises?muscle=${userRespose}"),
    header: {
        'X-RapidAPI-Key': '15098ea48cmsh2b43d6524135209p13664ejsnd412390146b4',
        'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
    }
    
};


export function Workouts(props) {
    // const [tabSelected, setTabSelected] = React.useState("Workouts");
    const [modalOpen, setModalOpen] = React.useState("Workouts");

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
    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(formState);
    }

    return (
        <div>
            <div className="workout-list-container">
                <h2> Exercises </h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="workout-list">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <Select options={muscle} />
                                </div>
                                <div className="col-md-4"></div>
                            </div>
                        </div>
                    </label>
                    <br/>
                    <button> Search </button>
                    {/* <button onClick={onClose}> Cancel </button> */}
                </form>
            </div>
            <footer>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
                <div id="root"></div>
            </footer>
    
            {modalOpen &&
                    <MuscleList onClose={toggleModal}/>
                }

        </div>
    );
    
    
}

// const muscleList = {
//     method: 'GET',
//     url: ("https://api.api-ninjas.com/v1/exercises?muscle=${userRespose}"),
//     header: {
//         'X-RapidAPI-Key': '15098ea48cmsh2b43d6524135209p13664ejsnd412390146b4',
//         'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
//     }
    
// };



const root = ReactDOM.renderRoot(document.getElementById('root'));
const element = [muscle];
root.render(element);



// return (
//     <div>
//         <div className="workout-list-container">
//             <h2> Exercises </h2>
//             <form onSubmit={handleFormSubmit}>
//                 <label htmlFor="workout-list">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-md-3"></div>
//                             <div className="col-md-6">
//                                 <Select options={muscle} />
//                             </div>
//                             <div className="col-md-4"></div>
//                         </div>
//                     </div>
//                 </label>
//                 <br/>
//                 <button> Search </button>
//                 {/* <button onClick={onClose}> Cancel </button> */}
//             </form>
//         </div>
//         <footer>
//             <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
//             <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
//             <div id="root"></div>
//         </footer>

//     </div>
// );
    


export default (Workouts, 'Workouts');

