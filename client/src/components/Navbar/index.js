export function Navbar(props) {
    const {pageSelected, setPageSelected} = props


    return (
        <nav >



            <div className="flex-container">
                <h1 className="home-button">PGG</h1>
                <h1 className="current-page">{pageSelected}</h1>
            </div>

            <ul>
                <li><a href="#community" onClick={() => setPageSelected('Community')}>Community</a></li>
                <li><a href="#journal" onClick={() => setPageSelected('Journal')}>Journal</a></li>
                <li><a href="#workouts" onClick={() => setPageSelected('Workouts')}>Workouts</a></li>
                <li><a href="#signup" onClick={() => setPageSelected('Signup')}>Signup</a></li>
                <li><a href="#counter" onClick={() => setPageSelected('Counter')}>Test Redux</a></li>
            </ul>


        </nav>
    )


    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-c-brown py-3">

            <a className="nav-name header-text" href="/myriad-conniptions">Temp Navbar</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target='#navbarNav' aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>    
            </button>       

            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav ml-auto">
                <a className="nav-item nav-link header-text" href="#community" onClick={() => setPageSelected('community')}>Community - </a>
                <a className="nav-item nav-link header-text" href="#journal" onClick={() => setPageSelected('journal')}>Journal - </a>
                <a className="nav-item nav-link header-text" href="#workouts" onClick={() => setPageSelected('workouts')}>Workouts - </a>
                <a className="nav-item nav-link header-text" href="#signup" onClick={() => setPageSelected('signup')}>Signup - </a>
                <a className="nav-item nav-link header-text" href="#counter" onClick={() => setPageSelected('counter')}>Test Redux</a>
                </div>
            </div>
        </nav>
    )
}