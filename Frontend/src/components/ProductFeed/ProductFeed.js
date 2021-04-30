import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../';
import { fetchService } from '../../services/';
import '../../styles/ProductCard.css';
import { loadProductDataAction, loadMessageAction, setMessageVisibilityAction } from '../../actions';
export const ProductFeed = () => {
  const { products } = useSelector(state => state.productData);
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

  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('priceUp');

  useEffect(() => {
    const sortArray = type => {
      const types = {
        priceUp: 'priceUp',
        priceDown: 'priceDown',
        ratingUp: 'ratingUp',
        ratingDown: 'ratingDown',
        titleLeft: 'titleLeft',
        titleRight: 'titleRight',
      };
      const sortProperty = types[type];
      const sorted = [...products].sort((a, b) => {
        if (sortProperty === 'titleLeft') {
          return a.title.localeCompare(b.title);
        
        } else if (sortProperty === 'titleRight') {
          return b.title.localeCompare(a.title);
        
        } else if (sortProperty === 'ratingUp') {
          return a.reviews.rating - b.reviews.rating;
        
        } else if (sortProperty === 'ratingDown') {
          return b.reviews.rating - a.reviews.rating;
        
        } else if (sortProperty === 'priceUp') {
          return a.price - b.price;
          
        } else if (sortProperty === 'priceDown') {
          return b.price - a.price;

        } else {
          return null;
        }
      });
      setData(sorted);
    };

    sortArray(sortType);
  }, [products, sortType]);


  return (
    
    <div className="holdingContainer">
      <select className="itempicker" onChange={e => setSortType(e.target.value)}>
        <option value="priceUp">Price ⯅</option>
        <option value="priceDown">Price ⯆</option>
        <option value="ratingUp">Rating ⯅</option>
        <option value="ratingDown">Rating ⯆</option>
        <option value="titleLeft">Title 🢂</option>
        <option value="titleRight">Title 🢀</option>
      </select><div className="holderbox">
        <div ClassName="itemsHolder">
      {data.map(product => <ProductCard key={product.id} productData={product} />)}
      </div>
      </div>
      
    </div>
  )
}
