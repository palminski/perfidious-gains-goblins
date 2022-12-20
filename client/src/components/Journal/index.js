import "../style.css"

import {useState} from 'react';
import EditModal from "../EditModal";

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { DELETE_EXCERSIZE, DELETE_NOTE } from "../../utils/mutations";
import auth from "../../utils/auth";


export function Journal(props) {

    const defaultExcersizeInfo = {
        _id:"",
        excersize:"",
        amount:"",
        units:"",
        reps:"",
        sets:"",
    };
    
    //set up states
    const [tabSelected, setTabSelected] = useState("Excersizes");
    const [modalOpen, setModalOpen] = useState(false);
    const [mode,setMode] = useState('Edit')
    
    const [excersizeInfo, setExcersizeInfo] = useState(defaultExcersizeInfo);
    const [noteInfo, setNoteInfo] = useState({_id:"",noteText:""});

    //set up data Queries
    const {loading, data} = useQuery(QUERY_ME);
    const excersizes = (data?.me.excersizes); 
    const notes = (data?.me.notes);  

    //===[set Up Mutations]=====================================
    const [deleteExcersize] = useMutation(DELETE_EXCERSIZE, {
        //Updates Cache so that excersizes delete from page imediatly upon being deleted from database
        update(cache, {data: {deleteExcersize}}) {
            try {
                const {me} = cache.readQuery({query: QUERY_ME});
                console.log(me);
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: {...me, excersizes: deleteExcersize.excersizes}}
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

    const handleEditExcersize = (excersize) => {
        let amountPlaceholder = excersize.amount
        if (excersize.amount === 0){
            amountPlaceholder = ""
        }
        setExcersizeInfo({
            _id:excersize._id,
            excersize: excersize.excersize,
            amount: amountPlaceholder,
            units: excersize.units,
            sets:excersize.sets,
            reps: excersize.reps
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

    const handleAddExcersize = () => {
        setExcersizeInfo(defaultExcersizeInfo);
        toggleModal();
    }
    const handleAddNote = () => {
        setNoteInfo({_id:"",noteText:""});
        toggleModal();
    }

    const handleDeleteExcersize = async(excersizeId) => {
        console.log(excersizeId);
        try {
            await deleteExcersize({
                variables: {excersizeId: excersizeId}
            });
            
        }
        catch (error) {
            console.log("could not delete excersize")
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
                    <h1 className={`tab ${(tabSelected === "Excersizes") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Excersizes")}>Excersizes</h1>
                    <h1 className={`tab ${(tabSelected === "Notes") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Notes")}>Notes</h1>
                </div>


                {tabSelected === "Excersizes" &&
                    <>
                        <ul className="journal-list">

                            {excersizes && excersizes.map(excersize => (
                                <li key={excersize._id} className="journal-list-item">
                                    <p>{excersize.excersize} {excersize.amount > 0 && <span>- {excersize.amount} {excersize.units!== "none" && excersize.units}</span>}  {excersize.sets > 0 && <span> - {excersize.sets} sets</span>} {excersize.reps > 0 && excersize.sets > 0 && <span> of </span>} {excersize.reps > 0 && <span>{excersize.reps} reps</span>}</p>
                                    <div className="buttons">
                                        <button className="hidden-button edit-button" onClick={() => { handleEditExcersize(excersize); setMode("Edit") }}>edit</button>
                                        <button className="hidden-button delete-button" onClick={() => handleDeleteExcersize(excersize._id)}>delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-container">
                            <h1 className="add-button" onClick={() => { handleAddExcersize(); setMode("Add") }}>Add Excersize</h1>
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
                    <EditModal onClose={toggleModal} tabSelected={tabSelected} mode={mode} excersizeInfo={excersizeInfo} noteInfo={noteInfo} />
                }


            </div>
        </div>
    )
}