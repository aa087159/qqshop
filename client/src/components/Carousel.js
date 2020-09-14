import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class Home extends Component {
	state = {
		slidesSrc: this.props.slidesSrc
	};
	render() {
		const imgs = [1, 2, 3, 4];
		const { slidesSrc } = this.state;
		const settings = {
			customPaging: function(i) {
				return (
					<a href='/'>
						<img src={`${slidesSrc}/${i + 1}.jpg`} alt='1' />
					</a>
				);
			},
			dots: true,
			dotsClass: 'slick-dots slick-thumb',
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1
					}
				}
			]
		};
		return (
			<div className='CarouselWrapper'>
				<Slider {...settings}>
					{imgs.map((img, index) => {
						return (
							<div className='' key={index}>
								<img
									src={`${slidesSrc}/${img}.jpg`}
									alt='slides'
								/>
							</div>
						);
					})}
				</Slider>
				{this.props.children}
			</div>
		);
	}
}
