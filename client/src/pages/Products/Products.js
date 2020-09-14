import React from 'react';
import './Products.css';
import Carousel from '../../components/Carousel.js';
import Banner from '../../components/Banner.js';
import CurlySVG from '../../components/CurlySVG.js';
import ProductsContainer from '../../components/ProductsContainer.js';

export default function Products() {
	return (
		<>
			<Carousel slidesSrc={'./img/ProductsMain'}>
				<Banner imgSrc='./img/ProductsMain/logo.png' />
				<div className='productSVG'>
					<CurlySVG />
				</div>
			</Carousel>
			<ProductsContainer />
		</>
	);
}
