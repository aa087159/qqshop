import React from 'react';
import ProductsFilter from './ProductsFilter';
import ProductsList from './ProductsList';
import { withProductsConsumer } from '../context';
import Loading from './Loading';

function ProductsContainer({ context }) {
	const { loading, sortedProducts, products } = context;
	if (loading) {
		return <Loading />;
	}
	return (
		<div className='productsLayout'>
			<ProductsFilter products={products} />
			<ProductsList products={sortedProducts} />
		</div>
	);
}

export default withProductsConsumer(ProductsContainer);
