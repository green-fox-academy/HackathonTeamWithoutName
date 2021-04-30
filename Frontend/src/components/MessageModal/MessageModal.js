import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { setMessageVisibilityAction, unloadMessageAction } from '../../actions';
import '../../styles/MessageModal.css';

export const MessageModal = () => {
  const { isMessageVisible, error, response } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    dispatch(setMessageVisibilityAction());
    dispatch(unloadMessageAction());
    if (location.pathname === '/main/orderreview') {
      history.push('/main/landingpage');
    }
  }

  return (
    <>
      {isMessageVisible 
        ? 
          (<div id="message_modal_background">
            <div id="message_modal">
              {error.isMessage && <div className="errormessage">{error.message}</div>}
              {response.isMessage && <div className="successmessage">{response.message}</div>}
              <button onClick={handleClick}>OK</button>
            </div>
          </div>) 
        : 
          null
      }
    </>
  );
};