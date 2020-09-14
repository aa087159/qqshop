import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FavoritesList extends Component {
	state = {
		HoverSwtich: [...this.props.Favs].fill(false),
	};

	toggleHover = (index) => {
		let _HoverSwtich = this.state.HoverSwtich;
		_HoverSwtich[index] = !_HoverSwtich[index];
		this.setState({ HoverSwtich: _HoverSwtich });
	};

	render() {
		const { ToFavoritesOrCartHandler, cart, Favorites } = this.props.value;

		const { Favs } = this.props;

		return (
			<>
				{Favs.map((favorite, index) => {
					const {
						productName,
						singleProductUrl,
						price,
						images,
						inCart,
					} = favorite;
					return (
						<div className='fav' key={index}>
							<div className='leftGroup'>
								<h1>{productName}</h1>
								<p>NT${price}</p>
								<Link to={`/products/${singleProductUrl}`}>
									<img src={images[0]} alt='' />
								</Link>
							</div>
							<div className='rightGroup'>
								<button
									onClick={() =>
										ToFavoritesOrCartHandler(
											singleProductUrl,
											cart,
											'inCart'
										)
									}
								>
									{inCart ? 'IN CART' : 'ADD TO CART'}
								</button>
								<i
									className={`${
										this.state.HoverSwtich[index]
											? 'fas'
											: 'far'
									} fa-times-circle fa-3x`}
									onMouseEnter={() => this.toggleHover(index)}
									onMouseLeave={() => this.toggleHover(index)}
									onClick={() =>
										ToFavoritesOrCartHandler(
											singleProductUrl,
											Favorites,
											'inFavorites'
										)
									}
								></i>
							</div>
						</div>
					);
				})}
			</>
		);
	}
}

export default FavoritesList;
