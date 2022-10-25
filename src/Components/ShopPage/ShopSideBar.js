import React, { useState } from 'react';

// Sidebar data
const initialCategories = [
  {
    id: 'c1',
    name: 'IPHONE & MAC',
    products: ['iphone', 'ipad', 'macbook'],
  },
  {
    id: 'c2',
    name: 'WIRELESS',
    products: ['airpod', 'watch'],
  },
  {
    id: 'c3',
    name: 'OTHER',
    products: ['mouse', 'keyboard', 'other'],
  },
];

// Hàm tạo viết hoa chữ cái đầu
const txtFirstUpper = txt => {
  return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
};

const ShopSideBar = props => {
  // set lại category khi click
  const clickCategoryHandler = categoryClicked => {
    // Sử dụng hàm setCategory() lấy từ cha
    props.setCategory(categoryClicked);
  };

  return (
    <>
      <h5 className="py-3 m-0">CATEGORIES</h5>
      <div>
        <h6 className="bg-dark text-white p-2 ps-3">APPLE</h6>
        <div className="text-muted">
          <button
            className="ps-3"
            onClick={clickCategoryHandler.bind(this, 'All')}
          >
            All
          </button>
        </div>
        {initialCategories.map(category => {
          return (
            <div key={category.id}>
              <h6 className="bg-light p-2 ps-3">{category.name}</h6>
              <ul className="list-unstyled text-muted">
                {category.products.map(product => {
                  return (
                    <li key={product} className="ps-3">
                      <button
                        onClick={clickCategoryHandler.bind(this, product)}
                      >
                        {txtFirstUpper(product)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopSideBar;
