import imageUrl from '../../assets/images/coffee.png';

const sampleCoffee1 = {
  id: 1,
  title: 'Veronni espresso coffee',
  price: 4990,
  category: 'ground coffee',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat.`,
  image: imageUrl,
};

const sampleCoffee2 = {
  id: 2,
  title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  price: 8999990,
  category: 'ground coffee',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat.`,
  image: imageUrl,
};

const sampleOrder1 = {
  id: 1,
  product_id: 1,
  quantity: 100,
}

const sampleOrder2 = {
  id: 2,
  product_id: 2,
  quantity: 6,
}

export const sampleCoffeeList = [ sampleCoffee1, sampleCoffee2 ];
export const sampleOrderList = [ sampleOrder1, sampleOrder2 ]