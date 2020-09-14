import React from 'react';
import { ShopConsumer } from '../../context';
import Paypal from './Paypal';

export default function CartRight({ history }) {
	return (
		<ShopConsumer>
			{(value) => {
				const { clearCart, total } = value;

				return (
					<div className='cart-right'>
						<div className='price'>
							<p>TOTAL</p>
							<p>NT${total}</p>
						</div>

						<div className='paypal'>
							<button onClick={clearCart}>CLEAR CART</button>
							<div style={{ position: 'relative', zIndex: 1 }}>
								<Paypal
									total={total}
									clearCart={clearCart}
									history={history}
								/>
							</div>
						</div>
					</div>
				);
			}}
		</ShopConsumer>
	);
}
