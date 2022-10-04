import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Add from './modals/Add';
import Remove from './modals/Remove'
import Rename from './modals/Rename'
import { Form, Button, DropdownButton, ButtonGroup, Dropdown, } from 'react-bootstrap';
import { showModalAdd, showModalRemove, showModalRename } from '../../slices/sliceModal';
import { useTranslation } from 'react-i18next';
import { changeChannelID } from '../../slices/sliceIdChannel';

export default function Channels({ channels, currectChannelID }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showAdd } = useSelector((store) => store.modal);
  const { showRemove } = useSelector((store) => store.modal)
  const { showRename } = useSelector((store) => store.modal)
  const classButton = 'w-100 rounded-0 text-start text-truncate btn';

  const changeCurrentID = (id) => {
    dispatch(changeChannelID(id))
  }

  return (<>
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <Button onClick={() => dispatch(showModalAdd())}
          type="button" variant="light" className="btn-plus p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((item) =>
          <li key={item.id} className="nav-item w-100">
            <ButtonGroup className="d-flex dropdown btn-group channelsBtn">
              <Button
                onClick={() => changeCurrentID(item.id)}
                variant="light"
                type="button"
                className={item.id === currectChannelID ? `${classButton} channelActiv` : classButton}
              >
                <span className="me-1">#</span>{item.name}</Button>
              {item.removable &&
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <span className="visually-hidden">{t('modal.channelManagement')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(showModalRemove())} variant="light" eventKey="1">{t('modal.removeButton')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(showModalRename())} variant="light" eventKey="2">{t('modal.rename')}</Dropdown.Item>
                    {showRemove && <Remove item={item} currectChannelID={currectChannelID} />}
                    {showRename && <Rename item={item} />}
                  </Dropdown.Menu>
                </Dropdown>}
            </ButtonGroup>
          </li>)}
      </ul>
      {showAdd && <Add />}
    </div>

  </>
  )
}
// className="w-100 rounded-0 text-start text-truncate btn channelsBtn">
