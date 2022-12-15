import '../style.css'
import { useState } from 'react';

import {useMutation, useQuery} from '@apollo/client';
import { ADD_EXCERSIZE, ADD_NOTE, EDIT_EXCERSIZE, EDIT_NOTE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

function EditModal({onClose, mode, tabSelected, excersizeInfo, noteInfo}) {
    const [formState, setFormState] = useState(excersizeInfo);
    const [noteState, setNoteState] = useState(noteInfo);

    //===[Mutations]=============================================
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
                await addExcersize({
                    variables: formState
                });
            }
            else
            {
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


            {tabSelected === "Excersizes" && <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2>{mode} {tabSelected}</h2>

                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="excersize">Excersize: </label>
                        <input required="true" type="text" id="excersize" name="excersize" placeholder='Excersize Name' onChange={handleFormChange} defaultValue={excersizeInfo.excersize}></input>
                        <br />
                        <label htmlFor="amount">Amount: </label>
                        <input type="number" min="0" max="10000000000" step=".5" id="amount" name="amount" placeholder='Weight, distance, etc.' onChange={handleFormChange} defaultValue={excersizeInfo.amount}></input>

                        <label htmlFor="units">Units: </label>
                        <input required="true" type="text" id="units" name="units" placeholder='lbs, miles, mins, etc.' onChange={handleFormChange} defaultValue={excersizeInfo.units}></input>
                        <br />
                        <label htmlFor="sets">Sets: </label>
                        <input type="number" min="0" max="500" id="sets" name="sets" placeholder='number of sets' onChange={handleFormChange} defaultValue={excersizeInfo.sets}></input>

                        <label htmlFor="reps">Reps: </label>
                        <input type="number" min="0" max="500" id="reps" name="reps" placeholder='number of reps' onChange={handleFormChange} defaultValue={excersizeInfo.reps}></input>
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
                        <input type="text" required="true" id="noteText" name="noteText" placeholder='Note Text Goes Here' onChange={handleNoteChange} defaultValue={noteInfo.noteText}></input>
                        
                        <button>Save</button>
                        <button onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>}
        </>
    )
}

export default EditModal;