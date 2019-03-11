import React from 'react';

const Sidebar = () =>
  <div className="container-fluid">
    <div className="row">
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file"></span>
                Back to Public View
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <span data-feather="home"></span>
                Dashboard <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

export default Sidebar;
