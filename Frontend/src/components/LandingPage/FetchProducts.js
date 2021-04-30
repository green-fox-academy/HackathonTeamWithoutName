import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchService } from '../../services/';
import { loadProductDataAction, loadMessageAction, setMessageVisibilityAction } from '../../actions';

export const FetchProducts = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getProductFeed();
    // eslint-disable-next-line
  }, [])

  const getProductFeed = async () => {
    try {
      const response = await fetchService.fetchData('product', 'GET', null, null);
      dispatch(loadProductDataAction(response.productList))
    } catch (error) {
      console.log(error.message);
      dispatch(loadMessageAction({ type: 'error', message: error.message}));
      dispatch(setMessageVisibilityAction());
    }
  };

  return (
    <div>
    </div>
  )
}
