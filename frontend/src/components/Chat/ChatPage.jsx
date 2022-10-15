import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Container, Row, Spinner,
} from 'react-bootstrap';
import { getData, getChannels, getLoading } from '../../slices/sliceChannals';
import { getMessage } from '../../slices/sliceMessage';
import Channels from './Channels';
import Message from './Messages';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getActiveChannel } from '../../slices/sliceIdChannel';

function ChatPage() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const header = auth.getAuthHeader();

  useEffect(() => {
    dispatch(getData(header));
  }, [dispatch]);

  const dataChannels = useSelector(getChannels);
  const dataMessages = useSelector(getMessage);
  const dataСurrentID = useSelector(getActiveChannel);
  const isLoading = useSelector(getLoading);

  const forrectMessage = dataMessages.filter((item) => item.channelId === dataСurrentID);
  const correctChat = dataChannels.filter((item) => item.id === dataСurrentID);
  const correctChatName = correctChat[0]?.name;
  return isLoading ? (
    <div className="h-100 justify-content-center d-flex align-items-center ">
      <Spinner animation="border" variant="primary" />
    </div>
  )
    : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels channels={dataChannels} currectChannelID={dataСurrentID} />
          <Col className="p-0 h-100">
            <Message
              message={forrectMessage}
              currectChannelID={dataСurrentID}
              correctChatName={correctChatName}
            />
          </Col>
        </Row>
      </Container>
    );
}

export default ChatPage;
