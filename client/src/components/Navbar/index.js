export function Navbar(props) {
    const {pageSelected, setPageSelected} = props

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-c-brown py-3">

            <a className="nav-name header-text" href="/myriad-conniptions">Temp Navbar</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target='#navbarNav' aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>    
            </button>       

            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav ml-auto">
                <a className="nav-item nav-link header-text" href="#community" onClick={() => setPageSelected('community')}>Community</a>
                <a className="nav-item nav-link header-text" href="#journal" onClick={() => setPageSelected('journal')}>Journal</a>
                <a className="nav-item nav-link header-text" href="#workouts" onClick={() => setPageSelected('workouts')}>Workouts</a>
                <a className="nav-item nav-link header-text" href="#signup" onClick={() => setPageSelected('signup')}>Signup</a>
                <a className="nav-item nav-link header-text" href="#counter" onClick={() => setPageSelected('counter')}>Test Redux</a>
                </div>
            </div>
        </nav>
    )
}