import { useDispatch } from 'react-redux';
import { loadProductDataAction, loadErrorAction } from '../../actions';
import { fetchService } from '../../services/';

  export const FetchProducts = async () => {
    
    const dispatch = useDispatch();

    try {
      const response = await fetchService.fetchData('product', 'GET', null, null);
      dispatch(loadProductDataAction(response.productList))
    } catch (error) {
      console.log(error.message);
      dispatch(loadErrorAction({ type: 'product', message: error.message }));
    }
  };