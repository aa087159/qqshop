import React, { Component } from 'react';

export class CartColumn extends Component {
	render() {
		return (
			<div className='cart-column'>
				<div className='column'>
					<p>產品</p>
				</div>
				<div className='column'>
					<p>價錢</p>
				</div>
				<div className='column'>
					<p>數量</p>
				</div>
				<div className='column'>
					<p>刪除</p>
				</div>
				<div className='column'>
					<p>總和</p>
				</div>
			</div>
		);
	}
}

export default CartColumn;
