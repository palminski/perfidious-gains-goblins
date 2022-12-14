import "./workouts.css"
import {useState} from 'react';
import WorkoutModal from "../WorkoutModal";

// fetch('https://wger.de/api/v2/workout/') {
//     then(response => response.json);
//     then(console.log(response));
// };
export function Workouts(props) {
    const [tabSelected, setTabSelected] = useState("Workouts");
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



    return (
        <div className="grow-in">
            {/* <h1 className="grow-in"></h1> */}
            {/* <div className="tab-container">
                    <h1 className="add-button" onClick={() => toggleModal()}>Add {tabSelected === "Workouts" }</h1>
                </div> */}

            <div className="container">
                <div className="tab-container">
                    <h1 className={`tab ${(tabSelected === "Workouts") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Workouts")}>Workouts!</h1>
                </div>
                {tabSelected === "Workouts" &&
                    <ul className="workout-list">
                        <li className="workout-list-item">
                            <div className="buttons">
                                <h1 className="search-button" type="click" onClick={() => toggleModal()}>Search </h1>
                            </div>
                        </li>
                    </ul>
                }
                {/* <div className="tab-container">
                    <h1 className="add-button" onClick={() => toggleModal()}>Add {tabSelected === "Workouts" }</h1>
                </div> */}

                {modalOpen &&
                    <WorkoutModal onClose={toggleModal}/>
                }



            </div>  
            
        </div>
    )
}

