import { useState } from 'react';

import useHttp from 'hooks/use-http';
import classes from './ProductListSearch.module.css';

const ProductListSearch = props => {
  const [enteredSearch, setEnteredSearch] = useState('');

  // state input change handler
  const searchChangeHandler = event => {
    event.preventDefault();
    setEnteredSearch(event.target.value);
  };

  //--- dùng custom hooks: useHttp()
  const { sendRequest: fetchData } = useHttp();

  // Xử lý ấn enter
  const keyDownHandler = event => {
    if (event.key === 'Enter') {
      // console.log(enteredSearch);

      const transformData = data => {
        // console.log(data);

        const filteredCategory = data.filter(product => {
          const productNameLowerCase = product.name.toLowerCase();
          const enteredSearchLowerCase = enteredSearch.toLowerCase();

          return productNameLowerCase.includes(enteredSearchLowerCase);
        });
        // console.log(filteredCategory);

        // set lại data search về cha
        props.onSearchProduct(filteredCategory);
      };

      fetchData(
        {
          url: props.urlFetch,
        },
        transformData
      );
    }
  };

  return (
    <input
      className={classes.input}
      type="text"
      placeholder="Enter Search Here!"
      value={enteredSearch}
      onChange={searchChangeHandler}
      onKeyDown={keyDownHandler}
    />
  );
};

export default ProductListSearch;
