import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

class TopNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };
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
        <MDBNavbarToggler onClick={this.onClick} />
        <MDBCollapse isOpen={this.state.collapse} navbar>
          <MDBNavbarNav left>
            {/* <MDBNavItem active>
            <MDBNavLink to="/admin">Home</MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBNavLink to="/admin/event">Event</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin/rsvp">RSVP</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin/participant">Participant</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <a onClick={e => this.props.logout(e)} className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer"><MDBIcon fab icon="profile" className="mr-2" />Logout</a>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default TopNavigation;