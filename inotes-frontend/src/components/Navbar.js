import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';


const Navbar = () => {
  
  let navigate = useNavigate();
  const handleLogout = ()=>{
   
    localStorage.removeItem('token');
    navigate('/login');
}

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="#">Action</Link></li>
                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
              </ul>
            </li>
          </ul>


          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link class="btn btn-primary mx-3" to="/login" role="button">Login</Link>
            <Link class="btn btn-primary" to="/signup" role="button">Signup</Link>
            </form>
            : <Link onClick={handleLogout} class="btn btn-primary" to="/login" role="button">Logout</Link>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
