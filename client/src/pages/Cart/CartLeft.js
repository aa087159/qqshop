import React from 'react';
import CartColumn from './CartColumn';
import CartItems from './CartItems';

export default function CartLeft(props) {
	return (
		<div className='cart-left'>
			<CartColumn />
			<CartItems cartItems={props.cartItems} />
		</div>
	);
}
