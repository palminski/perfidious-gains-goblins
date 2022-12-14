import './modal.css'
import { useState } from 'react';

// const items = [
//     'Arms',
//     'Legs',
//     'Chest',
//     'Shoulders',
//     'Back',
// ];

// const id = `Arms-${arms}` - `Legs${legs}` - `Chest${chest}` - `Shoulders${shoulders}` - `Back${back}`;

// const label = document.createElement('');
// label.setAttribute("for", id);

function WorkoutModal({onClose}) {
    const [formState, setFormState] = useState({});

    // function handleFormChange(e){
    //     setFormState({...formState, [e.target.name]:e.target.value});
    // }

    function handleFormSubmit(e) {
        fetch('https://wger.de/api/v2/exercise/') 
        .then ((response) => response.json())
        .then ((data) => console.log(data))
        .catch(err => {
            console.error(err);
        })
        e.preventDefault(); 

    };   
    
    
    // const data('id', 0) => {
    //     return {
    //         workoutId: [],
    //         randomId: [],
    //     }
    // };
    // const created() => {
    //     this.getworkoutId();
    // },
    //     methods: {
    //         async getworkoutId(); {
    //             try {
    //                 const response = await axios.get(url);
    //                 const data = response.data.slice(0, 19);
    //                 this.workoutId = data;
    //                 this.randomId = this.randomItem(this.workoutId);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //             randomItem (items); {
    //                 return items[Math.floor(Math.random() * items.length)];
    //             }
    //         }
    //     }


    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
        e.preventDefault();
        console.log(formState);

    };





    return (
        <>
        <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2>Lifts/Exercises</h2>
                    
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="workout-list">
                        <br/>
                        <label htmlFor="Arms">Arms: </label>
                        <input type="checkbox" id="accept" name="accept" placeholder='arms' onChange={handleFormChange}></input>

                        <label htmlFor="Legs">Legs: </label>
                        <input type="checkbox" id="accept" name="accept" placeholder='legs' onChange={handleFormChange}></input>
                        <br/>
                        <label htmlFor="Chest">Chest: </label>
                        <input type="checkbox" id="accept" name="accept" placeholder='chest' onChange={handleFormChange}></input>

                        <label htmlFor="Shoulders">Shoulders: </label>
                        <input type="checkbox" id="accept" name="accept" placeholder='shoulders' onChange={handleFormChange}></input>
                        
                        <label htmlFor="Back">Back: </label>
                        <input type="checkbox" id="accept" name="accept" placeholder='back' onChange={handleFormChange}></input>

                        <br/>

                        </label>
                        <br/>
                        <button> Search</button>
                        <button onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default WorkoutModal;