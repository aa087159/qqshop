import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CurlySVG from '../components/CurlySVG.js';

export class HomeProducts extends Component {
	state = {
		homeProducts: ['EMBROIDERY', 'CLOTH', 'KNITTING', 'WOODEN'],
		imgUrls: [
			'img/HomeImgs/1.jpg',
			'img/HomeImgs/2.jpg',
			'img/HomeImgs/3.jpg',
			'img/HomeImgs/4.jpg',
		],
		texts: [
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, rem?',
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, rem?',
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, rem?',
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, rem?',
		],
		visible: false,
		sorts: ['embroidery', 'cloth', 'knitting', 'wooden'],
	};
	ref = React.createRef();

	async componentDidMount() {
		const observer = new IntersectionObserver(
			([entry]) => {
				this.setState({ visible: entry.isIntersecting });
				if (entry.intersectionRatio > 0) {
					observer.unobserve(this.ref.current);
				}
			},
			{
				rootMargin: '-1px',
			}
		);

		if (this.ref.current) {
			observer.observe(this.ref.current);
		}
	}

	render() {
		return (
			<div className='homeProductsWrapper' ref={this.ref}>
				<h1 className='homeProductsTitle'>Our Products</h1>
				<div className='homeProducts' id='homeProducts'>
					{this.state.homeProducts.map((product, index) => {
						return (
							<div key={index}>
								<div
									className='img'
									style={{
										backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${this.state.imgUrls[index]})`,
									}}
								>
									<h1>{product}</h1>
									<p>{this.state.texts[index]}</p>
									<Link to='/products'>
										<button
											name={this.state.sorts[index]}
											onClick={
												this.props.value.filterProducts
											}
										>
											more
										</button>
									</Link>
								</div>
							</div>
						);
					})}
				</div>
				<CurlySVG visible={this.state.visible} />
			</div>
		);
	}
}

export default HomeProducts;
