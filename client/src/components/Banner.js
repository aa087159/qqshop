import React from 'react';

export default function Banner({ imgSrc }) {
	return (
		<div className='banner'>
			<img className='logo' src={`${imgSrc}`} alt='img' />
		</div>
	);
}
