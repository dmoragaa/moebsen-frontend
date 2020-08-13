import React from "react";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardDeck
  } from 'reactstrap';


const NavigationComponent = () => {

    return(
        <div>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle color='dark' nav caret>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href = "/salas">
                                Lista
                                </DropdownItem>
                                <DropdownItem href = "/salasForm">
                                Añadir
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
        </div>
    )
}

export default NavigationComponent;