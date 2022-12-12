import './modal.css'

function EditModal({onClose}) {
    return (
        <>
        <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2>Edit Excersize</h2>
                    
                    <form>
                        <label htmlFor="excersize-name">Excersize: </label>
                        <input type="text" id="excersize-name" name="excersize-name" placeholder='Excersize Name'></input>
                        <br/>
                        <label htmlFor="amount">Amount: </label>
                        <input type="text" id="amount" name="amount" placeholder='Weight, distance, etc.'></input>

                        <label htmlFor="units">Units: </label>
                        <input type="text" id="units" name="units" placeholder='lbs, miles, mins, etc.'></input>
                        <br/>
                        <label htmlFor="sets">Sets: </label>
                        <input type="text" id="sets" name="sets" placeholder='number of sets'></input>

                        <label htmlFor="reps">Reps: </label>
                        <input type="text" id="reps" name="reps" placeholder='number of reps'></input>
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