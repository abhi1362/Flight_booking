import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

const Modal = ({ setOpenModal, textFrom }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
            <FontAwesomeIcon icon={faCircleCheck} className='circle-check'/>
        </div>
        <div className="modal-body">
          <p className='thank-you-text'>Thank You...</p>
          <p>{textFrom} detail added successfully!</p>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal;