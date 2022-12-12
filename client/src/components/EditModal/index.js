import './modal.css'
import { useState } from 'react';

function EditModal({onClose}) {
    const [formState, setFormState] = useState({});

    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
    }

    function handleFormSubmit(e){
        e.preventDefault();
        console.log(formState);
    }

    return (
        <>
        <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2>Edit Excersize</h2>
                    
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="excersize-name">Excersize: </label>
                        <input type="text" id="excersize-name" name="excersize-name" placeholder='Excersize Name' onChange={handleFormChange}></input>
                        <br/>
                        <label htmlFor="amount">Amount: </label>
                        <input type="text" id="amount" name="amount" placeholder='Weight, distance, etc.' onChange={handleFormChange}></input>

                        <label htmlFor="units">Units: </label>
                        <input type="text" id="units" name="units" placeholder='lbs, miles, mins, etc.' onChange={handleFormChange}></input>
                        <br/>
                        <label htmlFor="sets">Sets: </label>
                        <input type="text" id="sets" name="sets" placeholder='number of sets' onChange={handleFormChange}></input>

                        <label htmlFor="reps">Reps: </label>
                        <input type="text" id="reps" name="reps" placeholder='number of reps' onChange={handleFormChange}></input>
                        <br/>
                        <button>Save</button>
                        <button onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditModal;