import React, { Component } from 'react';
import './Cart.css';
import Carousel from '../../components/Carousel.js';
import Banner from '../../components/Banner.js';
import CurlySVG from '../../components/CurlySVG.js';
import { ShopConsumer } from '../../context';
import CartLeft from './CartLeft';
import CartRight from './CartRight';
import { Link } from 'react-router-dom';

export class Cart extends Component {
	render() {
		return (
			<ShopConsumer>
				{(value) => {
					const { products } = value;
					let cartItems = products.filter((product) => {
						return product.inCart;
					});

					return (
						<>
							<Carousel slidesSrc={'./img/ProductsMain'}>
								<Banner imgSrc='./img/ProductsMain/cart.png' />
								<div className='CartSVG'>
									<CurlySVG />
								</div>
							</Carousel>
							<div className='cartWrapper'>
								{cartItems.length === 0 ? (
									<div className='emptyCart'>
										<h1>CART IS EMPTY</h1>
										<Link to='/products'>
											<button>
												BACK TO PRODUCT LIST
											</button>
										</Link>
									</div>
								) : (
									<>
										<CartLeft cartItems={cartItems} />
										<CartRight
											history={this.props.history}
										/>
									</>
								)}
							</div>
						</>
					);
				}}
			</ShopConsumer>
		);
	}
}

export default Cart;
