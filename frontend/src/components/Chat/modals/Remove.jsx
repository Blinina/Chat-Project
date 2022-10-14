import { React, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../slices/sliceModal';
import { SocketContext } from '../../../contexts/SocketContext';
import { useToastify } from '../../../contexts/ToastifyContext';
import { changeChannelID } from '../../../slices/sliceIdChannel';
import { selectors } from '../../../slices/sliceChannals';

export default function Remove({ currectChannelID }) {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
  const { successToast } = useToastify();
  const startChannelId = 1;
  const { item } = useSelector((store) => store.modal);
  const allChannels = useSelector((state) => selectors.selectAll(state));
  const currentChannel = allChannels.find((it) => it.id === item);
  const handleRemove = () => {
    socket.emit('removeChannel', currentChannel);
    dispatch(closeModal());
    successToast(t('removeChannelToast'));
    if (currectChannelID === currentChannel.id) {
      dispatch(changeChannelID(startChannelId));
    }
  };
  return (
    <Modal centered show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.questionRemove')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(closeModal())} type="button" variant="secondary" className="me-2">{t('modal.cancelButton')}</Button>
          <Button onClick={handleRemove} type="button" variant="danger">{t('modal.removeButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
