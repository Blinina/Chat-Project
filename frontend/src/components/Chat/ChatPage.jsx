import { React, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { addChannels, selectors } from '../../slices/sliceChannals';
import { addMessages, selectors as messagesSelectors } from '../../slices/sliceMessage';
import Channels from './Channels';
import Message from './Messages';
import routes from '../../routes/routes';
import { useAuth } from '../../contexts/AuthContext.jsx';

function ChatPage() {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(routes.usersPath(), { headers: auth.getAuthHeader() });
      const { channels, messages } = res.data;
      batch(() => {
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
      });
    }
    getData();
  }, [dispatch]);

  const dataChannels = useSelector((state) => selectors.selectAll(state));
  const dataMessages = useSelector((state) => messagesSelectors.selectAll(state));
  const dataСurrentID = useSelector((state) => state.currentChannelId.id);

  const forrectMessage = dataMessages.filter((item) => item.channelId === dataСurrentID);
  const correctChat = dataChannels.filter((item) => item.id === dataСurrentID);
  const correctChatName = correctChat[0]?.name;
  return (
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
