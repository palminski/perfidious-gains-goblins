import './modal.css'
import React from 'react';
import {useState} from 'react';

function WorkoutModal({onClose, callApi}) {
    const [formState, setFormState] = useState({
        muscle: "abdominals"
    })    

    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
        
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        callApi(formState.muscle);

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

export default WorkoutModal;