import {React, useState, useEffect, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { closeModalRemove } from '../../../slices/sliceModal';
import { useDispatch, useSelector } from 'react-redux'
import SocketContext from '../../../contexts/SocketContext';
import { useTranslation } from 'react-i18next';
import useToastify from '../../../hooks/toastHooks';
import { changeChannelID } from '../../../slices/sliceIdChannel';

export default function Remove ({item, currectChannelID}) {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
  const { successToast } = useToastify();
  const startChannelId = 1;
  const handleRemove = () =>{
        socket.emit('removeChannel', item)
        dispatch(closeModalRemove())
        successToast(t('removeChannelToast'));
        if(currectChannelID ===item.id){
        dispatch(changeChannelID(startChannelId))
        }
  }
    return( 
    <Modal centered show onHide={()=>dispatch(closeModalRemove())}>
         <Modal.Header closeButton >
            <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p className="lead">{t('modal.questionRemove')}</p>
              <div className="d-flex justify-content-end">
                  <Button onClick={()=>dispatch(closeModalRemove())} type="button" variant="secondary" className="me-2">{t('modal.cancelButton')}</Button>
                  <Button onClick={handleRemove} type="button" variant="danger">{t('modal.removeButton')}</Button>
              </div>
          </Modal.Body>        
    </Modal>
    )
}

               