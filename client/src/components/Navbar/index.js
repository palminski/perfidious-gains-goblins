import '../style.css'
import Auth from '../../utils/auth'

export function Navbar(props) {
    const {pageSelected, setPageSelected} = props

    return (
        <nav >
            
            <div className="flex-container">
                <h1 className="home-button">Globo Gains</h1>
                <h1 className="current-page grow-in" >{pageSelected}</h1>
            </div>
            <ul>
            {Auth.loggedIn() && <li><a className={(pageSelected==='Community') ? 'current-navigation-link' : "navigation-link"} href="#community" onClick={() => setPageSelected('Community')}>Community</a></li>}
            {Auth.loggedIn() && <li><a className={(pageSelected==='Journal') ? 'current-navigation-link' : "navigation-link"} href="#journal" onClick={() => setPageSelected('Journal')}>Journal</a></li>}
            {Auth.loggedIn() && <li><a className={(pageSelected==='Workouts') ? 'current-navigation-link' : "navigation-link"} href="#workouts" onClick={() => setPageSelected('Workouts')}>Workouts</a></li>}
            {Auth.loggedIn() && <li><a className={(pageSelected==='Counter') ? 'current-navigation-link' : "navigation-link"} href="#counter" onClick={() => setPageSelected('Counter')}>Test Redux</a></li>}
                {!Auth.loggedIn() && <li><a className={(pageSelected==='Signup') ? 'current-navigation-link' : "navigation-link"} href="#signup" onClick={() => setPageSelected('Signup')}>Signup</a></li>}
                {!Auth.loggedIn() && <li><a className={(pageSelected==='Login') ? 'current-navigation-link' : "navigation-link"} href="#login" onClick={() => setPageSelected('Login')}>Login</a></li>}
                {Auth.loggedIn() && <li><a className={(pageSelected==='Logout') ? 'current-navigation-link' : "navigation-link"} href='/' onClick={() => {
                    Auth.logout();
                    setPageSelected('Community');
                    }} > Logout </a></li>}




            </ul>
           
            

        </nav>
    )
}
