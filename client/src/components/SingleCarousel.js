import React, { Component } from 'react';
import Slider from 'react-slick';
import { ShopConsumer } from '../context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export class SingleCarousel extends Component {
	render() {
		return (
			<ShopConsumer>
				{(value) => {
					const { imgs } = this.props;
					const settings = {
						customPaging: function (i) {
							return (
								<a href='/'>
									<img src={imgs[i]} alt='/' />
								</a>
							);
						},
						dots: true,
						dotsClass: 'slick-nail',
						infinite: true,
						speed: 500,
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					};

					return (
						<div className='singleCarousel'>
							<Slider {...settings}>
								{imgs.map((img, index) => {
									return (
										<div
											key={index}
											className='singleCarouselImg'
										>
											<img src={img} alt='/' />
										</div>
									);
								})}
							</Slider>
						</div>
					);
				}}
			</ShopConsumer>
		);
	}
}

export default SingleCarousel;
