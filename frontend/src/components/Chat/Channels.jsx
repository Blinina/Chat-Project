import {React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Add from './modals/Add';
import { Form, Button } from 'react-bootstrap';
import { showModal } from '../../slices/sliceModal';

export default function Channels({channels}){
  const {show} = useSelector((store)=>store.modal)
 const dispatch = useDispatch();
 
  return (<>
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2"><span>Каналы</span>
          <Button onClick={()=>dispatch(showModal())} type="button" variant="light" className="btn-plus p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
            <span className="visually-hidden">+</span>
          </Button>
        </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((item)=> 
          <li key={item.id} className="nav-item w-100">
            <Button type="button" variant="light" className="w-100 rounded-0 text-start btn btn-secondary channelsBtn">
            <span className="me-1">#</span>{item.name}</Button>
          </li>)}
        </ul>
        {show && <Add/>}
    </div>
    
            </>
    )
}
