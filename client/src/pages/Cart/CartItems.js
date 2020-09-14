import React, { Component } from 'react';
import { ShopConsumer } from '../../context';
import { Link } from 'react-router-dom';

export class CartItems extends Component {
	state = {
		HoverSwtich: [...this.props.cartItems].fill(false),
		PlusHover: [...this.props.cartItems].fill(false),
		MinusHover: [...this.props.cartItems].fill(false)
	};

	toggleHover = (index) => {
		let _HoverSwtich = this.state.HoverSwtich;
		_HoverSwtich[index] = !_HoverSwtich[index];
		this.setState({ HoverSwtich: _HoverSwtich });
	};

	PlusHover = (index) => {
		let _PlusHover = this.state.PlusHover;
		_PlusHover[index] = !_PlusHover[index];
		this.setState({ PlusHover: _PlusHover });
	};

	MinusHover = (index) => {
		let _MinusHover = this.state.MinusHover;
		_MinusHover[index] = !_MinusHover[index];
		this.setState({ MinusHover: _MinusHover });
	};

	render() {
		return (
			<ShopConsumer>
				{(value) => {
					const {
						products,
						ToFavoritesOrCartHandler,
						cart,
						increment,
						decrement
					} = value;
					let tempProducts = products.filter((product) => {
						return product.inCart;
					});

					return tempProducts.map((item, index) => {
						const {
							productName,
							singleProductUrl,
							price,
							count,
							total,
							images
						} = item;

						return (
							<div className='cart-item' key={index}>
								<div className='cart-item-description'>
									<Link to={`/products/${singleProductUrl}`}>
										<img src={images[0]} alt='' />
									</Link>

									<p>{productName}</p>
								</div>

								<p>{price}元</p>
								<div className='count'>
									<i
										className={`${
											this.state.MinusHover[index]
												? 'fas'
												: 'far'
										} fa-minus-square`}
										onMouseEnter={() =>
											this.MinusHover(index)
										}
										onMouseLeave={() =>
											this.MinusHover(index)
										}
										onClick={() =>
											decrement(singleProductUrl)
										}
									></i>
									<p>{count}</p>
									<i
										className={`${
											this.state.PlusHover[index]
												? 'fas'
												: 'far'
										} fa-plus-square`}
										onMouseEnter={() =>
											this.PlusHover(index)
										}
										onMouseLeave={() =>
											this.PlusHover(index)
										}
										onClick={() =>
											increment(singleProductUrl)
										}
									></i>
								</div>

								<i
									className={`${
										this.state.HoverSwtich[index]
											? 'fas'
											: 'far'
									} fa-trash-alt trash`}
									onMouseEnter={() => this.toggleHover(index)}
									onMouseLeave={() => this.toggleHover(index)}
									onClick={() =>
										ToFavoritesOrCartHandler(
											singleProductUrl,
											cart,
											'inCart'
										)
									}
								></i>
								<p>{total}</p>
							</div>
						);
					});
				}}
			</ShopConsumer>
		);
	}
}

export default CartItems;
