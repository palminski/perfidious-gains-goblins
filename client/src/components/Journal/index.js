import "./journal.css"
import {useState} from 'react';
import EditModal from "../EditModal";

export function Journal(props) {
    //set up states
    const [tabSelected, setTabSelected] = useState("Excersizes");
    const [modalOpen, setModalOpen] = useState(false);

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

    return (
        <div className="grow-in">

            <div className="container">
                <div className="tab-container">
                    <h1 className={`tab ${(tabSelected === "Excersizes") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Excersizes")}>Excersizes</h1>
                    <h1 className={`tab ${(tabSelected === "Stats") ? 'active-tab' : 'inactive-tab'}`} onClick={() => setTabSelected("Stats")}>Stats</h1>
                </div>


                {tabSelected === "Excersizes" &&
                
                    <ul className="journal-list">
                        <li className="journal-list-item">
                            <p>{"Bench Press"} - {180} {'lbs'} - {5} sets of {5}</p>
                            <div className="buttons">
                                <button className="hidden-button edit-button" onClick={() => toggleModal()}>edit</button>
                                <button className="hidden-button delete-button" onClick={() => toggleModal()}>delete</button>
                            </div>
                        </li>
                        <li className="journal-list-item">
                            <p>{"Bench Press"} - {180} {'lbs'} - {5} sets of {5}</p>
                            <div className="buttons">
                                <button className="hidden-button edit-button" onClick={() => toggleModal()}>edit</button>
                                <button className="hidden-button delete-button" onClick={() => toggleModal()}>delete</button>
                            </div>
                        </li>
                        <li className="journal-list-item">
                            <p>{"Bench Press"} - {180} {'lbs'} - {5} sets of {5}</p>
                            <div className="buttons">
                                <button className="hidden-button edit-button" onClick={() => toggleModal()}>edit</button>
                                <button className="hidden-button delete-button" onClick={() => toggleModal()}>delete</button>
                            </div>
                        </li>
                        <li className="journal-list-item">
                            <p>{"Bench Press"} - {180} {'lbs'} - {5} sets of {5}</p>
                            <div className="buttons">
                                <button className="hidden-button edit-button" onClick={() => toggleModal()}>edit</button>
                                <button className="hidden-button delete-button" onClick={() => toggleModal()}>delete</button>
                            </div>
                        </li>
                    </ul>
                }

                {tabSelected === "Stats" &&
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

                {modalOpen &&
                    <EditModal onClose={toggleModal}/>
                }


            </div>
        </div>
    )
}