import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchService } from '../../services';
import { 
  setProductDetailsVisibilityAction, 
  unloadActualProductDataAction, 
  loadPostedReviewAction, 
  loadOrderDataAction 
} from '../../actions';
import '../../styles/ProductDetails.css'

export const ProductDetails = () => {
  const { isProductDetailsVisible, actualProduct: {
    id: product_id,
    title,
    price,
    description,
    image,
    inStock,
    reviews,} } = useSelector(state => state.productData);
  const { accessToken, userName } = useSelector(state => state.userData);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const productRef = useRef();

  const handleClickHideModal = event => {
    if (productRef.current === event.target) {
      dispatch(setProductDetailsVisibilityAction());
      dispatch(unloadActualProductDataAction());
      setReview('');
      setRating('');
    }
  };

  const handleChangeOnReviewRating = event => {
    const newRating = Number(event.target.value);
    setRating(newRating);
  }

  const handleClickOnGoIntoCart = () => {
    dispatch(setProductDetailsVisibilityAction());
    dispatch(unloadActualProductDataAction());
    setReview('');
    setRating('');
    history.push('/main/cart');
  }

  const handleSubmitOnPostReview = async submitEvent => {
    submitEvent.preventDefault();
    if (review && rating) {
      try {
        console.log({product_id, rating, review, accessToken});
        await fetchService.fetchData('product/review', 'POST', { productId: product_id, rating, text: review }, accessToken);
        dispatch(loadPostedReviewAction({ product_id, review: { product_id, userName, rating, text: review } }));
        setReview('');
        setRating('');
      } catch (error) {
        console.log(error.message);
      };
    } else {
      console.log('tölts ki mindent!');
    }
  };

  const handleClickOnTakeIntoCart = async () => {
    if (accessToken) {
      try {
        const { order_id } = await fetchService.fetchData('order', 'POST', { productId: product_id }, accessToken);
        dispatch(loadOrderDataAction([{ id: order_id, product_id, quantity: 1 }]));
      } catch (error) {
        console.log(error.message);
      };
    } else {
      dispatch(loadOrderDataAction([{ product_id, quantity: 1 }]));
    }
  };

  const keyPress = useCallback(
    keyPressEvent => {
      if (keyPressEvent.key === 'Escape' && isProductDetailsVisible) {
        dispatch(setProductDetailsVisibilityAction());
        dispatch(unloadActualProductDataAction());
      }
    },
    // eslint-disable-next-line
    [isProductDetailsVisible]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {isProductDetailsVisible 
        ? 
          (<div id="product_details_background" onClick={handleClickHideModal} ref={productRef}>
            <div id="product_details_modal">
              <div id="product_details_left_side">
              <div id="product_details_img_box">
                <img src={image} alt="product"/>
                { inStock > 10 
                  ? <div id="product_details_stock_status_OK">On Stock</div> 
                  : inStock > 0 
                    ? <div id="product_details_stock_status_LOW">Only ${inStock} pieces left</div> 
                    : <div id="product_details_stock_status_EMPTY">Not On Stock</div>}
                <div id="product_details_price">
                  $ {price}
                </div>
                <button onClick={handleClickOnTakeIntoCart}>Take into the cart</button>
                <button onClick={handleClickOnGoIntoCart}>Go to my cart</button>
              </div>
              <div id="product_details_text_box">
                <div id="product_details_text_box_title">
                  {title}
                </div>
                <div id="product_details_text_box_description">
                  {description}
                </div>
              </div>
            </div>
            <div id="product_details_right_side">
              <div id="number_of_reviews">{reviews.length} Reviews</div>
              <div id="reviews_box">
                <div>Reviews:</div>
                <br/>
                {reviews.map((review, index) => (
                  <div key={index}>
                    <div>{review.userName} {review.rating}</div>
                    <div id="review_text">{review.text}</div>
                    <br/>
                  </div>
                ))}
              </div>
              <form id="review_form" onSubmit={handleSubmitOnPostReview}>
                <fieldset id="review_form_fieldset">
                  <span className="star-cb-group">
                    <input type="radio" id="rating-5" name="rating" value="5" onClick={handleChangeOnReviewRating}/><label htmlFor="rating-5">5</label>
                    <input type="radio" id="rating-4" name="rating" value="4" onClick={handleChangeOnReviewRating}/><label htmlFor="rating-4">4</label>
                    <input type="radio" id="rating-3" name="rating" value="3" onClick={handleChangeOnReviewRating}/><label htmlFor="rating-3">3</label>
                    <input type="radio" id="rating-2" name="rating" value="2" onClick={handleChangeOnReviewRating}/><label htmlFor="rating-2">2</label>
                    <input type="radio" id="rating-1" name="rating" value="1" onClick={handleChangeOnReviewRating}/><label htmlFor="rating-1">1</label>
                    <input type="radio" id="rating-0" name="rating" value="0" className="star-cb-clear"/><label htmlFor="rating-0">0</label>
                  </span>
                </fieldset>
                <textarea
                  id="reviewinput"
                  type="textbox"
                  placeholder="Write a review...(max 140 characters long)"
                  maxLength="140"
                  value={review}
                  onChange={changeEvent => {
                    setReview(changeEvent.target.value);
                  }}
                />
                <button type="submit">Send review</button> 
              </form>
            </div>
            </div>
          </div>) 
        : 
          null
      }
    </>
  );
};