import { useState, useEffect } from 'react'
import Header from './Header';
function XHR() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://fakestoreapi.com/products');
      xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        setProduct(data);
        console.log(data);
      };
      xhr.send();
    };

    getData();
  }, []); 

  return (
    <>
    <Header/>
      <div className='max-w-[1000px] grid sm:grid-cols-2  md:grid-cols-4 gap-4 mx-auto '>
        {product.map(({ title, price, image }, index) => (
          <div key={index} className='w-full shadow-2xl p-[10px] rounded-[5px]'>
            <img src={image} alt={title} className='sm:w-[180px] sm:h-[180px] md:w-[250px] md:h-[250px] object-contain mx-auto' /><br />
            <p className='text-left text-[16px] font-semibold pb-[5px]'>
              {title.length > 20 ? title.slice(0, 20) + '...' : title}
            </p>
            <div className='text-left grid grid-cols-2'>
              <p><strike>${(price + 10).toFixed(2)}</strike></p>
              <p className='font-medium'>${price.toFixed(2)}</p>
            </div>
            <div className='text-left grid grid-cols-2 justify-between gap-[10px] mt-[5px]'>
              <button className='bg-[#EFEFEF] p-[5px] rounded-[5px]'>Add to Cart</button>
              <button className='bg-[#B34BF8] p-[5px] rounded-[5px] text-white'>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default XHR;
