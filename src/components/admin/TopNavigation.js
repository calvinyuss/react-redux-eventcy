import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

class TopNavigation extends Component {
  state = {
    collapse: false
  }

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
        <MDBNavbarBrand href="/admin">
          <strong>Dashboard</strong>
        </MDBNavbarBrand>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#">Home</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer"><MDBIcon fab icon="profile" className="mr-2" />Setting</a>
            </MDBNavItem>
          </MDBNavbarNav>
      </MDBNavbar>
    );
  }
}

export default TopNavigation;