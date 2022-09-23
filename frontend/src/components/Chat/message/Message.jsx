import {React, useState, useEffect, useRef} from 'react'
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../../../slices/sliceMessage';
import _ from 'lodash';
export default function Message ({message}) {
    const inputRef = useRef();
    const dispatch = useDispatch();

    const generateOnSubmit = () => (values) => {
        message.push({id:_.uniqueId(3), channelId: 'generalChannelId', username:  'admin', text: values.body})
        dispatch(addMessage({id:1, channelId: 'generalChannelId', username:  'admin', text: values.body}))
    }
    const formik = useFormik({initialValues: { body: '' },
    onSubmit: generateOnSubmit()
      }); 
    
    return(
    <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
                <b># random</b>
            </p><span className="text-muted">{message.length} сообщения</span>
         </div>
         <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {message?.map((item)=><div key={item.id} className="text-break mb-2"><b>{item.username}</b>: {item.text}</div>)}
        </div>
        <div className="mt-auto px-5 py-3">
    <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
            <Form.Group className="input-group has-validation">
            <Form.Control 
             onChange={formik.handleChange}
             value={formik.values.body}
             name="body"
             ref={inputRef}
             aria-label="Новое сообщение"
             placeholder="Введите сообщение..."
             className="border-0 p-0 ps-2 form-control"
                />
            <Button variant="light" type="submit" disabled="" className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                </svg>  
                <span className="visually-hidden">Отправить</span>
            </Button>
</Form.Group>
</form>
</div>
</div>
        
    )
}