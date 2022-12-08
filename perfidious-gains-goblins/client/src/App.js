import {useState} from 'react';



import { Counter } from './components/counter/Counter';
import { Community } from './components/Community';
import { Journal } from './components/Journal';
import { Signup } from './components/Signup';
import { Workouts } from './components/Workouts';
import { Navbar } from './components/Navbar';
import './App.css';

function App() {

  const [pageSelected, setPageSelected] = useState('')

  return (
    <div className="App">
      
        <Navbar pageSelected={pageSelected} setPageSelected={setPageSelected}/>
        
        {pageSelected === 'community' && <Community />}
        {pageSelected === 'journal' && <Journal />}
        {pageSelected === 'signup' && <Signup />}
        {pageSelected === 'workouts' && <Workouts />}
        {pageSelected === 'counter' && <Counter />}
        
      
    </div>
  );
}

export default App;
