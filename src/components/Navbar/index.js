import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from 'actions/authActions.js';
import styled from 'styled-components';

const LinkButton = styled.a`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const Brand = styled(Link)`	
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
`

const Search = styled.input`
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);

  &:focus {
    border-color: transparent;
    background-color: rgba(255, 255, 255, .2);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
  }
`

const Navbar = (props) =>
  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <Brand className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">FindYourService</Brand>
    <Search className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"></Search>
    <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap">
        <LinkButton className="nav-link"
          onClick={props.logoutUser}>Sign out</LinkButton>
      </li>
    </ul>
  </nav>

export default connect(null, { logoutUser })(Navbar);
