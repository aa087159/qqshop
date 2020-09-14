import React from 'react';
import ProductThumbNail from './ProductThumbNail';
import { ShopConsumer } from '../context';

export default function ProductsList({ products }) {
	if (products.length === 0) {
		return (
			<div className='emptySearch'>
				<h3>SORRY! NO MATCHED PRODUCT</h3>
			</div>
		);
	}
	return (
		<ShopConsumer>
			{(value) => {
				return (
					<section className='productList'>
						<div className='productListCenter'>
							{products.map((item) => {
								return (
									<ProductThumbNail
										key={item.id}
										product={item}
										value={value}
									/>
								);
							})}
						</div>
					</section>
				);
			}}
		</ShopConsumer>
	);
}
