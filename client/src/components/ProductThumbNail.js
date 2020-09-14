import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductThumbNail({ product, value }) {
	const {
		productName,
		singleProductUrl,
		handCraftSort,
		price,
		color,
		images,
		inFavorites,
		inCart,
	} = product;

	return (
		<div className='thumbNailCard'>
			<div className='toSinglePageHover'>
				<div className='HoverCard'>
					<Link
						to={`products/${singleProductUrl}`}
						onClick={() => value.getRelatedProducts(handCraftSort)}
					>
						<button>PRODUCT DETAIL</button>
					</Link>
				</div>
				{inCart ? (
					<div className='inCartLabel'>
						<i className='fas fa-cart-plus fa-2x'></i>
					</div>
				) : null}
				<i
					className={`${inFavorites ? 'fas' : 'far'} fa-heart heart`}
					onClick={() =>
						value.ToFavoritesOrCartHandler(
							singleProductUrl,
							value.Favorites,
							'inFavorites'
						)
					}
				></i>
				<img src={images[0]} alt='' />
			</div>

			<div className='thumbNailDescription'>
				<div className='cartRow'>
					<p className='handCraftSort'>{handCraftSort}</p>
					<button
						onClick={() =>
							value.ToFavoritesOrCartHandler(
								singleProductUrl,
								value.cart,
								'inCart'
							)
						}
					>
						{inCart ? 'IN CART' : 'ADD TO CART'}
					</button>
				</div>

				<h2 className='productName'>{productName}</h2>
				<p>{`NT$ ${price}`}</p>
				<div className='color'>
					{color
						? product.color.map((tints, index) => {
								return (
									<div className='tints' key={index}>
										{tints.map((tint, index) => {
											return (
												<div
													key={index}
													className='singletint'
													style={{
														backgroundColor: `${tint}`,
													}}
												></div>
											);
										})}
									</div>
								);
						  })
						: null}
				</div>
			</div>
		</div>
	);
}
