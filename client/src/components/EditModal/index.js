import '../style.css'
import { useState } from 'react';

import {useMutation, useQuery} from '@apollo/client';
import { ADD_EXERCISE, ADD_NOTE, EDIT_EXERCISE, EDIT_NOTE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

function EditModal({onClose, mode, tabSelected, exerciseInfo, noteInfo}) {
    const [formState, setFormState] = useState(exerciseInfo);
    const [noteState, setNoteState] = useState(noteInfo);

    //===[Mutations]=============================================
    const [addExercise] = useMutation(ADD_EXERCISE, {
        update(cache, {data: {addExercise}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, exercises: addExercise.exercises}}
                });
              } catch (error) {
                console.log(error);
              }
        }
    });
    const [editExercise] = useMutation(EDIT_EXERCISE, {
        update(cache, {data: {editExercise}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, exercises: editExercise.exercises}}
                });
              } catch (error) {
                console.log(error);
              }
        }
    });
    const [addNote] = useMutation(ADD_NOTE, {
        update(cache, {data: {addNote}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, notes: addNote.notes}}
                });
              } catch (error) {
                console.log(error);
              }
        }
    });
    const [editNote] = useMutation(EDIT_NOTE, {
        update(cache, {data: {editNote}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, notes: editNote.notes}}
                });
              } catch (error) {
                console.log(error);
              }
        }
    });

    //===[Forms]===========================================================
    //=[Excersises]=======
    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
    }
    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        if (!formState.units) {
            formState.units = "none";
        }
        formState.amount = parseFloat(formState.amount);
        formState.sets = parseInt(formState.sets);
        formState.reps = parseInt(formState.reps);
        formState.amount = isNaN(formState.amount) ? 0 : formState.amount;
        formState.sets = isNaN(formState.sets) ? 0 : formState.sets;
        formState.reps = isNaN(formState.reps) ? 0 : formState.reps;
        console.log(formState);
        try {
            onClose();
            if (mode === "Add") {
                await addExercise({
                    variables: formState
                });
            }
            else
            {
                await editExercise({
                    variables: {...formState, exerciseId:exerciseInfo._id}
                });
            }
        }
        catch (error) {
            console.log("could not add user")
            console.error(error);
        }
    }
    //=[Notes]=======
    function handleNoteChange(e){
        setNoteState({...noteState, [e.target.name]:e.target.value});
    }
    const handleNoteSubmit = async (e) =>{
        e.preventDefault();
            console.log(noteState);
        try {
            onClose();
            if (mode === "Add") {
                await addNote({
                    variables: noteState
                });
            }
            else
            {
                await editNote({
                    variables: {...noteState, noteId:noteInfo._id}
                });
            }
        }
        catch (error) {
            console.log("could not add note")
            console.error(error);
        }
    }

    return (
        <>

            {tabSelected === "Exercises" && <div className="modal-background" onClick={onClose}>

                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2>{mode} {tabSelected}</h2>

                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="exercise">Exercise: </label>
                        <input required={true} type="text" id="exercise" name="exercise" placeholder='Exercise Name' onChange={handleFormChange} defaultValue={exerciseInfo.exercise}></input>
                        <br />
                        <label htmlFor="amount">Amount: </label>
                        <input type="number" min="0" max="10000000000" step=".5" id="amount" name="amount" placeholder='Weight, distance, etc.' onChange={handleFormChange} defaultValue={exerciseInfo.amount}></input>

                        <label htmlFor="units">Units: </label>
                        {/* <input required="true" type="text" id="units" name="units" placeholder='lbs, miles, mins, etc.' onChange={handleFormChange} defaultValue={exerciseInfo.units}></input> */}
                        <select name='units' id="units" onChange={handleFormChange} defaultValue={exerciseInfo.units}>
                            <option value=''></option>
                            <option value="lbs">lbs</option>
                            <option value="kilos">kilos</option>
                            <option value="meters">meters</option>
                            <option value="kilometers">kilometers</option>
                            <option value="miles">miles</option>
                            <option value="units">units</option>
                        </select>
                        <br />
                        <label htmlFor="sets">Sets: </label>
                        <input type="number" min="0" max="500" id="sets" name="sets" placeholder='number of sets' onChange={handleFormChange} defaultValue={exerciseInfo.sets}></input>

                        <label htmlFor="reps">Reps: </label>
                        <input type="number" min="0" max="500" id="reps" name="reps" placeholder='number of reps' onChange={handleFormChange} defaultValue={exerciseInfo.reps}></input>
                        <br />
                        <button>Save</button>
                        <button onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>}

            {tabSelected === "Notes" && <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2>{mode} {tabSelected}</h2>

                    <form onSubmit={handleNoteSubmit}>
                        <label htmlFor="noteText">Note Text: </label>
                        <input type="text" required={true} id="noteText" name="noteText" placeholder='Note Text Goes Here' onChange={handleNoteChange} defaultValue={noteInfo.noteText}></input>
                        
                        <button>Save</button>
                        <button onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>}
        </>
    )
}

export default EditModal;