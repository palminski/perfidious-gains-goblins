import "./journal.css"
import {useState} from 'react';

export function Journal(props) {

    const [tabSelected, setTabSelected] = useState("Excersizes");

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
                            {"Bench Press"} - {180} {'lbs'} - {5} sets of {5}
                        </li>
                        <li className="journal-list-item">
                            {"Bench Press"} - {180} {'lbs'} - {5} sets of {5}
                        </li>
                        <li className="journal-list-item">
                            {"Bench Press"} - {180} {'lbs'} - {5} sets of {5}
                        </li>
                        <li className="journal-list-item">
                            {"Bench Press"} - {180} {'lbs'} - {5} sets of {5}
                        </li>
                    </ul>
                }

                {tabSelected === "Stats" &&

                    <ul className="journal-list">
                        <li className="journal-list-item">
                            Weight: 150lbs
                        </li>
                        <li className="journal-list-item">
                            Age: 23
                        </li>
                        <li className="journal-list-item">
                            One Rep Max: Laughable
                        </li>

                    </ul>

                }


            </div>
        </div>
    )
}