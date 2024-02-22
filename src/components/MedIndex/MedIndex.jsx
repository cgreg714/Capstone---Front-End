import React, { useState } from 'react'
import MedCreate from './MedCreate'
import MedDisplay from './MedDisplay/DisplayContainer'
import MedEdit from './MedEdit';
import { Nav, NavItem, NavLink } from 'reactstrap';

function MedIndex() {

  const [page, setPage] = useState('Add')


  
  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink onClick={()=>setPage('ADD')}>
          Add Medication
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={()=>setPage('DISPLAY')}>
          Medications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={()=>setPage('EDIT')}>
          Edit Medications
          </NavLink>
        </NavItem>
      </Nav>
      {page === 'ADD' && <MedCreate /> }
      {page === 'DISPLAY' && <MedDisplay /> }
      {page === 'EDIT' && <MedEdit /> }
    </React.Fragment>
  )
}

export default MedIndex