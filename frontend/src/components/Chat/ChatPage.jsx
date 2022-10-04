import { React, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector, batch } from 'react-redux';
import { addChannels, selectors } from '../../slices/sliceChannals';
import { addMessages, selectors as messagesSelectors } from '../../slices/sliceMessage';
import { Col, Container, Row, } from 'react-bootstrap';
import Channels from './Channels';
import Message from './Message';
import routes from '../../routes/routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

function ChatPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      const { channels, messages } = res.data;
      batch(() => {
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
      })
    }
    getData()
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
          <Message message={forrectMessage}
            currectChannelID={dataСurrentID}
            correctChatName={correctChatName} />
        </Col>
      </Row>
    </Container>
  )
};

export default ChatPage;