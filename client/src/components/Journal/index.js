import "../style.css"

import {useState} from 'react';
import EditModal from "../EditModal";

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { DELETE_EXERCISE, DELETE_NOTE } from "../../utils/mutations";
import auth from "../../utils/auth";


export function Journal(props) {

    const defaultExerciseInfo = {
        _id:"",
        exercise:"",
        amount:"",
        units:"",
        reps:"",
        sets:"",
    };
    
    //set up states
    const [tabSelected, setTabSelected] = useState("Exercises");
    const [modalOpen, setModalOpen] = useState(false);
    const [mode,setMode] = useState('Edit')
    
    const [exerciseInfo, setExerciseInfo] = useState(defaultExerciseInfo);
    const [noteInfo, setNoteInfo] = useState({_id:"",noteText:""});

    //set up data Queries
    const {loading, data} = useQuery(QUERY_ME);
    const exercises = (data?.me.exercises); 
    const notes = (data?.me.notes);  

    //===[set Up Mutations]=====================================
    const [deleteExercise] = useMutation(DELETE_EXERCISE, {
        //Updates Cache so that exercises delete from page imediatly upon being deleted from database
        update(cache, {data: {deleteExercise}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, exercises: deleteExercise.exercises}}
                });
              } catch (error) {
                console.log(error);
              }
        },
        fetchPolicy:'network-only'
    });

    const [deleteNote] = useMutation(DELETE_NOTE, {
        //Updates Cache so that notes delete from page imeiatly upon being deleted from database
        update(cache, {data: {deleteNote}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, notes: deleteNote.notes}}
                });
              } catch (error) {
                console.log(error);
              }
        }
    });

    //===[Set Up Functions]==========================================
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

    const handleEditExercise = (exercise) => {
        let amountPlaceholder = exercise.amount
        if (exercise.amount === 0){
            amountPlaceholder = ""
        }
        setExerciseInfo({
            _id:exercise._id,
            exercise: exercise.exercise,
            amount: amountPlaceholder,
            units: exercise.units,
            sets:exercise.sets,
            reps: exercise.reps
        })
        toggleModal();
    }

    const handleEditNote = (note) => {
        setNoteInfo({
            _id:note._id,
            noteText: note.noteText
        })
        toggleModal();
    }

    const handleAddExercise = () => {
        setExerciseInfo(defaultExerciseInfo);
        toggleModal();
    }
    const handleAddNote = () => {
        setNoteInfo({_id:"",noteText:""});
        toggleModal();
    }

    const handleDeleteExercise = async(exerciseId) => {
        console.log(exerciseId);
        try {
            await deleteExercise({
                variables: {exerciseId: exerciseId}
            });
            
        }
        catch (error) {
            console.log("could not delete exercise")
            console.error(error);
        }
    }
    const handleDeleteNote = async(noteId) => {
        console.log(noteId);
        try {
            await deleteNote({
                variables: {noteId: noteId}
            });
            
        }
        catch (error) {
            console.log("could not delete note")
            console.error(error);
        }
    }

    //===[Page]================================================

    return (
        <div className="grow-in">

            <div className="container">
                <div className="tab-container">
                    <h1 className={`tab ${(tabSelected === "Exercises") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Exercises")}>Exercises</h1>
                    <h1 className={`tab ${(tabSelected === "Notes") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Notes")}>Notes</h1>
                </div>


                {tabSelected === "Exercises" &&
                    <>
                        <ul className="journal-list">

                            {exercises && exercises.map(exercise => (
                                <li key={exercise._id} className="journal-list-item">
                                    <p>{exercise.exercise} {exercise.amount > 0 && <span>- {exercise.amount} {exercise.units!== "none" && exercise.units}</span>}  {exercise.sets > 0 && <span> - {exercise.sets} set{exercise.sets > 1 && "s"}</span>} {exercise.reps > 0 && exercise.sets > 0 && <span> of </span>} {exercise.reps > 0 && <span>{exercise.reps} rep{exercise.reps > 1 && "s"}</span>}</p>
                                    <div className="buttons">
                                        <button className="hidden-button edit-button" onClick={() => { handleEditExercise(exercise); setMode("Edit") }}>edit</button>
                                        <button className="hidden-button delete-button" onClick={() => handleDeleteExercise(exercise._id)}>delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-container">
                            <h1 className="add-button" onClick={() => { handleAddExercise(); setMode("Add") }}>Add Exercise</h1>
                        </div>
                    </>
                }

                {tabSelected === "Notes" &&
                    <>
                        <ul className="journal-list">
                            {notes && notes.map(note => (
                                <li key={note._id} className="journal-list-item">
                                    <p>{note.noteText}</p>
                                    <div className="buttons">
                                        <button className="hidden-button edit-button" onClick={() => { handleEditNote(note); setMode("Edit") }}>edit</button>
                                        <button className="hidden-button delete-button" onClick={() => handleDeleteNote(note._id)}>delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-container">
                            <h1 className="add-button" onClick={() => { handleAddNote(); setMode("Add") }}>Add Note</h1>
                        </div>
                    </>
                }
                
                


                {modalOpen &&
                    <EditModal onClose={toggleModal} tabSelected={tabSelected} mode={mode} exerciseInfo={exerciseInfo} noteInfo={noteInfo} />
                }


            </div>
        </div>
    )
}