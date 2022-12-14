import './modal.css'
import { useState } from 'react';

import {useMutation, useQuery} from '@apollo/client';
import { ADD_EXCERSIZE, EDIT_EXCERSIZE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

function EditModal({onClose, mode, tabSelected, excersizeInfo}) {
    const [formState, setFormState] = useState(excersizeInfo);

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

    const [editExcersize] = useMutation(EDIT_EXCERSIZE, {
        update(cache, {data: {editExcersize}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, excersizes: editExcersize.excersizes}}
                });
              } catch (error) {
                console.log(error);
              }
        }
    });

    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        console.log(formState);
        formState.amount = parseFloat(formState.amount);
        formState.sets = parseInt(formState.sets);
        formState.reps = parseInt(formState.reps);
        console.log(formState);
        try {
            onClose();
            if (mode === "Add") {
                await addExcersize({
                    variables: formState
                });
            }
            else
            {
                console.log('<><><><><><><>');
                console.log(mode);
                console.log({...formState, excersizeId:excersizeInfo._id});
                await editExcersize({
                    variables: {...formState, excersizeId:excersizeInfo._id}
                });
            }
            
            
        }
        catch (error) {
            console.log("could not add user")
            console.error(error);
        }

    }

    return (
        <>
        <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2>{mode} {tabSelected}</h2>
                    
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="excersize">Excersize: </label>
                        <input type="text" id="excersize" name="excersize" placeholder='Excersize Name' onChange={handleFormChange} defaultValue={excersizeInfo.excersize}></input>
                        <br/>
                        <label htmlFor="amount">Amount: </label>
                        <input type="text" id="amount" name="amount" placeholder='Weight, distance, etc.' onChange={handleFormChange} defaultValue={excersizeInfo.amount}></input>

                        <label htmlFor="units">Units: </label>
                        <input type="text" id="units" name="units" placeholder='lbs, miles, mins, etc.' onChange={handleFormChange} defaultValue={excersizeInfo.units}></input>
                        <br/>
                        <label htmlFor="sets">Sets: </label>
                        <input type="text" id="sets" name="sets" placeholder='number of sets' onChange={handleFormChange} defaultValue={excersizeInfo.sets}></input>

                        <label htmlFor="reps">Reps: </label>
                        <input type="text" id="reps" name="reps" placeholder='number of reps' onChange={handleFormChange} defaultValue={excersizeInfo.reps}></input>
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