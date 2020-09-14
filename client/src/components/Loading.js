import React from 'react';
import '../pages/Products/Products.css';

export default function Loading() {
	const obj = new Array(8).fill('');
	return (
		<div className='load'>
			<div className='loading'>
				{obj.map((each, index) => {
					return <div className='obj' key={index}></div>;
				})}
			</div>
		</div>
	);
}
