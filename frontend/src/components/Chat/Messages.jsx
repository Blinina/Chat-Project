import {
  React, useRef, useEffect, useContext,
} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import _ from 'lodash';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { SocketContext } from '../../contexts/SocketContext';

export default function Message({ message, currectChannelID, correctChatName }) {
  const auth = useAuth();
  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
  const inputRef = useRef();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    inputRef.current.focus();
    scrollToBottom();
  });

  const validate = yup.object({
    body: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values) => {
      try {
        await validate.validate(values);
        const messageText = filter.clean(values.body);
        const messageNew = {
          id: _.uniqueId(),
          channelId: currectChannelID,
          username: auth.getUsername(),
          text: messageText,
        };
        socket.emit('newMessage', messageNew);
        formik.resetForm();
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${correctChatName}`}</b>
        </p>
        <span className="text-muted">
          {message.length}
          {' '}
          {t('messagesQuantity')}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {message?.map((item) => (
          <div key={item.id} className="text-break mb-2">
            <b>{item.username}</b>
            :
            {' '}
            {item.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
              placeholder={t('messageForm')}
              className="border-0 p-0 ps-2 form-control"
            />
            <Button variant="light" type="submit" disabled="" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
}
