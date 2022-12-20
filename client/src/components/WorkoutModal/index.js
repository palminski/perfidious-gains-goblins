import './modal.css'
import React from 'react';
import {useState} from 'react';
 
// import Select from 'react-select';
// import ReactDOM from 'react-dom/client';

function WorkoutModal({onClose, setResults, callApi}) {
    const [formState, setFormState] = useState({
        muscle: "abdominals"
    })    

    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
        
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('form submitted!');
        console.log(formState);
        console.log(`Value of ${formState.muscle}`);
        let apiResults = await callApi(formState.muscle);


        //
        // This section will be where we make requests to the 3rd Party API
        //

        //In future we will set results to an array or something containing data recieved from the API 
        setResults(apiResults);
        onClose();
    }

    return (
        <>
            <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2> Exercises </h2>

                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="workout-list">
                            <select name='muscle' onChange={handleFormChange} defaultValue="abdominals">
                                <option value="abdominals">Abdominals</option>
                                <option value="adductors">Adductors</option>
                                <option value="biceps">Biceps</option>
                                <option value="calves">Calves</option>
                                <option value="chest">Chest</option>
                                <option value="forearms">Forearms</option>
                                <option value="glutes">Glutes</option>
                                <option value="hamstrings">Hamstrings</option>
                                <option value="lats">Lats</option>
                                <option value="lower_back">Lower Back</option>
                                <option value="middle_back">middle Back</option>
                                <option value="neck">Neck</option>
                                <option value="quadriceps">Quadriceps</option>
                                <option value="traps">Traps</option>
                                <option value="triceps">Traps</option>
                            </select>
                        </label>
                        <br />
                        <button>
                            Search
                        </button>
                        <button onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
        
       
}


// }
// // const TableRow = ({ data }) => <tr><td>{data.label}</td></tr>

// // const start = 2;
// // const end = 17;

// // const App = () => (
// //     <div>
// //       <table>
// //         <tbody>
// //           {
// //             muscle.reduce((result, current, i) => {
// //               if (i >= start && i <= end) { // 0 based don't forget!
// //                 const row = (<TableRow key={i} data={current} />);
// //                 result.push(row);
// //               }
// //               return result;
// //             }, [])
// //           }
// //         </tbody>
// //       </table>
// //       <div className="workout-list-container">
// //             <h2> Exercises </h2>
// //             <form onSubmit={handleFormSubmit}>
// //                 <label htmlFor="workout-list">
// //                     <div className="container">
// //                         <div className="row">
// //                             <div className="col-md-3"></div>
// //                             <div className="col-md-6">
// //                                 <Select options={muscle} />
// //                             </div>
// //                             <div className="col-md-4"></div>
// //                         </div>
// //                     </div>
// //                 </label>
// //                 <br/>
// //                 <button> Search </button>
// //                 {/* <button onClick={onClose}> Cancel </button> */}
// //             </form>
// //         </div>
// //     </div>
// // );
// // <head>
// // <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
// // <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
// // <div id="root"></div>
// // </head>
  
// // ReactDOMClient.hydrateRoot(<App />, document.getElementById('root'));


export default WorkoutModal;




    // fetch('https://api.api-ninjas.com/v1/exercises??muscle=${userRespose}') 
    // .then ((response) => response.json())
    // .then ((data) => console.log(data))
    // .catch(err => {
    //     console.error(err);
    // })
    // e.preventDefault(); 

