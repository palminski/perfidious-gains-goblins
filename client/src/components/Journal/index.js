import "./journal.css"
import {useState} from 'react';
import EditModal from "../EditModal";

import {useMutation, useQuery} from '@apollo/client';
import { QUERY_ME } from "../../utils/queries";
import { DELETE_EXCERSIZE } from "../../utils/mutations";
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

    //set up data Queries
    const {loading, data} = useQuery(QUERY_ME);
    const excersizes = (data?.me.excersizes);  

    //set Up Mutations
    const [deleteExcersize] = useMutation(DELETE_EXCERSIZE, {
        //Updates Cache so that excersizes delete from page imeiatly upon being deleted from database
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
        }
    });
    //Modal Function
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
        setExcersizeInfo({
            _id:excersize._id,
            excersize: excersize.excersize,
            amount: excersize.amount,
            units: excersize.units,
            sets:excersize.sets,
            reps: excersize.reps
        })
        toggleModal();
    }

    const handleAddExcersize = () => {
        setExcersizeInfo(defaultExcersizeInfo);
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

    

    return (
        <div className="grow-in">

            <div className="container">
                <div className="tab-container">
                    <h1 className={`tab ${(tabSelected === "Excersizes") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Excersizes")}>Excersizes</h1>
                    <h1 className={`tab ${(tabSelected === "Notes") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Notes")}>Notes</h1>
                </div>


                {tabSelected === "Excersizes" &&
                
                    <ul className="journal-list">
                        
                        {excersizes && excersizes.map(excersize => (
                            <li key={excersize._id} className="journal-list-item">
                                <p>{excersize.excersize} - {excersize.amount} {excersize.units} - {excersize.sets} sets of {excersize.reps}</p>
                                <div className="buttons">
                                    <button className="hidden-button edit-button" onClick={() => {handleEditExcersize(excersize);setMode("Edit")}}>edit</button>
                                    <button className="hidden-button delete-button" onClick={() => handleDeleteExcersize(excersize._id)}>delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                }

                {tabSelected === "Notes" &&
                    <ul className="journal-list">
                        <li className="journal-list-item">
                            <p>Weight - 150lbs</p>
                            <div className="buttons">
                                <button className="hidden-button edit-button" onClick={() => toggleModal()}>edit</button>
                                <button className="hidden-button delete-button" onClick={() => toggleModal()}>delete</button>
                            </div>
                        </li>
                        <li className="journal-list-item">
                            <p>Height - 5 foot 7</p>
                            <div className="buttons">
                                <button className="hidden-button edit-button" onClick={() => toggleModal()}>edit</button>
                                <button className="hidden-button delete-button" onClick={() => toggleModal()}>delete</button>
                            </div>
                        </li>
                        <li className="journal-list-item">
                            <p>One Rep Max for Bench - Laughable</p>
                            <div className="buttons">
                                <button className="hidden-button edit-button" onClick={() => toggleModal()}>edit</button>
                                <button className="hidden-button delete-button" onClick={() => toggleModal()}>delete</button>
                            </div>
                        </li>
                    </ul>
                }
                <div className="tab-container">
                    <h1 className="add-button" onClick={() => {handleAddExcersize();setMode("Add")}}>Add {tabSelected === "Excersizes" ? 'Excersize' : 'Note'}</h1>
                </div>
                


                {modalOpen &&
                    <EditModal onClose={toggleModal} tabSelected={tabSelected} mode={mode} excersizeInfo={excersizeInfo} />
                }


            </div>
        </div>
    )
}