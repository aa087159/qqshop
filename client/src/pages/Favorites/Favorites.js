import React, { Component } from 'react';
import { ShopConsumer } from '../../context';
import './Favorites.css';
import Carousel from '../../components/Carousel.js';
import Banner from '../../components/Banner.js';
import CurlySVG from '../../components/CurlySVG.js';
import FavoritesList from './FavoritesList';
import { Link } from 'react-router-dom';

export class Favorites extends Component {
	render() {
		return (
			<ShopConsumer>
				{(value) => {
					const { products } = value;
					let tempProducts = products.filter((product) => {
						return product.inFavorites;
					});
					return (
						<>
							<Carousel slidesSrc={'./img/ProductsMain'}>
								<Banner imgSrc='./img/ProductsMain/fav.png' />
								<div className='FavSVG'>
									<CurlySVG />
								</div>
							</Carousel>
							<div className='favoriteList'>
								{tempProducts.length === 0 ? (
									<div className='emptyFav'>
										<h1>MY FAVORITE IS EMPTY</h1>
										<Link to='/products'>
											<button>
												BACK TO PRODUCT LIST
											</button>
										</Link>
									</div>
								) : (
									<FavoritesList
										value={value}
										Favs={tempProducts}
									/>
								)}
							</div>
						</>
					);
				}}
			</ShopConsumer>
		);
	}
}

export default Favorites;
