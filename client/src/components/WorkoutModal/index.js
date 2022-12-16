import './modal.css'
import React from 'react';
import {useState} from 'react';
 
// import Select from 'react-select';
// import ReactDOM from 'react-dom/client';

function MuscleList({onClose}) {
    const [formState, setFormState] = useState({})
    const muscle = [
        { label: "abdominals", value: 1 },
        { label: "abductors", value: 2 },
        { label: "adductors", value: 3 },
        { label: "biceps", value: 4 },
        { label: "calves", value: 5 },
        { label: "chest", value: 6 },
        { label: "forearms", value: 7 },
        { label: "glutes", value: 8 },
        { label: "hamstrings", value: 9 },
        { label: "lats", value: 10 },
        { label: "lower_back", value: 11 },
        { label: "middle_back", value: 12 },
        { label: "neck", value: 13 },
        { label: "quadriceps", value: 14 },
        { label: "traps", value: 15 },
        { label: "triceps", value: 16 }
    ];

    // handleFormChange = (e) => {
    //     setFormState({...formState, [e.target.name]:e.target.value});
    // }
    
    // handleFormSubmit = (e) =>{
    //     e.preventDefault();
    //     console.log(formState);
    // }
    class WorkoutModal extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: muscle.label};
        }
        
        render() {
            return (
            <>
                <div className="modal-background" onClick={onClose}>
                    <div className="modal-body container"onClick={(e) => e.stopPropagation()}>
                        <h2> Exercises </h2>
                            
                        <form onSubmit={()=> console.log("hello")}>
                            <label htmlFor="workout-list">
                                <select value={this.state.value} onChange={() => console.log('heyo')}>
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
                            <input type="submit" value="Submit" />
                            <br/>
                            <button onclick>
                                Search 
                            </button>
                            <button onClick={onClose}> 
                                Cancel 
                            </button>
                        </form>
                    </div>
                </div>
            </>
            );
        }
    }    
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


export default MuscleList;




    // fetch('https://api.api-ninjas.com/v1/exercises??muscle=${userRespose}') 
    // .then ((response) => response.json())
    // .then ((data) => console.log(data))
    // .catch(err => {
    //     console.error(err);
    // })
    // e.preventDefault(); 

