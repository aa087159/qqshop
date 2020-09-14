import React from 'react';
import { ShopConsumer } from '../context';

export default function ProductsFilter() {
	return (
		<ShopConsumer>
			{(value) => {
				const {
					minPrice,
					maxPrice,
					price,
					handleChange,
					filterProducts,
				} = value;
				const buttons = [
					'All PRODUCTS',
					'EMBROIDERY',
					'CLOTH',
					'KNITTING',
					'WOODEN',
				];
				const sorts = [
					'all',
					'embroidery',
					'cloth',
					'knitting',
					'wooden',
				];
				return (
					<div className='productsFilter'>
						{buttons.map((each, index) => {
							return (
								<input
									key={index}
									type='button'
									name={sorts[index]}
									value={each}
									onClick={filterProducts}
									className='handCraftSort'
								/>
							);
						})}

						<div className='priceRangeWrapper'>
							<label htmlFor='price'>PRICE NT${price}</label>
							<input
								type='range'
								name='price'
								min={minPrice}
								max={maxPrice}
								id='price'
								value={price}
								onChange={handleChange}
								className='priceRange'
							/>
						</div>
					</div>
				);
			}}
		</ShopConsumer>
	);
}
