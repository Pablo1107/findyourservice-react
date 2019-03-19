import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
`

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;
`

const Navlink = styled.a`
  font-weight: 500;
  color: ${props => props.active ? "#007bff" : "#333"};
`

const Sidebar = () =>
  <div className="container-fluid">
    <div className="row">
      <Nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <Sticky className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Navlink className="nav-link" href="/">
                <span data-feather="file"></span>
                Back to Public View
              </Navlink>
            </li>
            <li className="nav-item">
              <Navlink active className="nav-link" href="/admin">
                <span data-feather="home"></span>
                Dashboard <span className="sr-only">(current)</span>
              </Navlink>
            </li>
          </ul>
        </Sticky>
      </Nav>
    </div>
  </div>

export default Sidebar;
