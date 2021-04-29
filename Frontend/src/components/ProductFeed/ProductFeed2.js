import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { fetchService } from '../../services/';

const ProductFeed = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.userData);

  useEffect(() => {
    getProductFeed();
  }, [])

  const getProductFeed = async () => {
    try {
      const response = await fetchService.fetchData('feed', 'GET', null, accessToken);
      console.log(response.memeData)
      dispatch(loadMemeFeedAction(response.memeData))
    } catch (error) {
      console.log(error.message);
      dispatch(errorOnLoadMemeFeedAction(error.message));
    }
    // fetch minden meme-t ami isPublic=true
    
  };

  return (
    <div>

    </div>
  )
}

export default ProductFeed;
