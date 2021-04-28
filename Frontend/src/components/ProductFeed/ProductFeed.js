import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../';
import { fetchService } from '../../services/';
import { loadProductDataAction, loadErrorAction } from '../../actions';

export const ProductFeed = () => {
  const { products } = useSelector(state => state.productData);
  const { isError, errorMessage } = useSelector((state) => state.error.product);
  const dispatch = useDispatch();

  useEffect(() => {
    getProductFeed();
    // eslint-disable-next-line
  }, [])

  const getProductFeed = async () => {
    try {
      const response = await fetchService.fetchData('product', 'GET', null, null);
      console.log(response)
      dispatch(loadProductDataAction(response.productList))
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'product', message: error.message }));
    }
  };

  return (
    <div>
      {products.map(product => <ProductCard key={product.id} productData={product} />)}
      {isError && <div className="errormessage">{errorMessage}</div>}
    </div>
  )
}
