import React, { Component } from 'react';
import Slider from 'react-slick';
import CurlySVG from './CurlySVG.js';
//import PhotoGallery from './PhotoGallery';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function BarWrapper(props) {
	return (
		<div>
			<div className='singleBar'>{props.children}</div>
			<div className='singleBar-text'>
				<p>{props.label}</p>
				<p>{props.description}</p>
			</div>
		</div>
	);
}

export default class Animals extends Component {
	state = {
		visible: false,
		pets: [
			[
				'成成',
				'小店長',
				'SCHNAUZER',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, aliquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque id molestias nemo maxime! Ipsum consectetur temporibus corrupti eius optio minus.',
			],
			[
				'俠俠',
				'副小店長',
				'MIXED',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, aliquam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque id molestias nemo maxime! Ipsum consectetur temporibus corrupti eius optio minus.',
			],
		],
		progressValue: [
			['100', '30', '40', '80'],
			['80', '100', '80', '80'],
		],
		progressLabel: ['貪吃力', '戰鬥力', '精力', '撒嬌力'],
		isPlaceProfiles: true,
		arrowScreensm: false,
	};
	ref = React.createRef();

	async componentDidMount() {
		if (window.innerWidth < 767) {
			this.setState({ arrowScreensm: true });
		}

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

	revealPicsHandler = () => {
		this.setState((prevState) => ({
			isPlaceProfiles: !prevState.isPlaceProfiles,
		}));
	};

	render() {
		const {
			visible,
			pets,
			progressValue,
			progressLabel,
			isPlaceProfiles,
		} = this.state;

		function SampleNextArrow(props) {
			const { className, style, onClick, isPlaceProfiles } = props;
			return (
				<div
					className={className}
					style={{
						...style,
						display: isPlaceProfiles ? 'block' : 'none',
						background: 'green',
					}}
					onClick={onClick}
				/>
			);
		}

		function SamplePrevArrow(props) {
			const { className, style, onClick } = props;
			return (
				<div
					className={className}
					style={{
						...style,
						display: isPlaceProfiles ? 'block' : 'none',
						background: 'green',
					}}
					onClick={onClick}
				/>
			);
		}
		var settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <SampleNextArrow isPlaceProfiles={isPlaceProfiles} />,
			prevArrow: <SamplePrevArrow />,
		};

		return (
			<div className='animals' ref={this.ref}>
				<h1 className='animalsTitle'>FOUR-LEGGED</h1>

				<Slider {...settings} className='test'>
					{pets.map((pet, index) => (
						<div key={index}>
							<div className='myAnimalGrid' key={index}>
								<div className='picBackGround'>
									<img
										src={`img/Animals/animalthumb${
											index + 1
										}.jpg`}
										id='clipped'
										alt=''
									/>
								</div>
								<div className='description'>
									<h2>{`${pet[1]}-${pet[0]}`}</h2>
									<h4>{pet[2]}</h4>
									<p>{pet[3]}</p>
									<div className='progressBarWrapper'>
										{progressValue[index].map(
											(value, index) => {
												return (
													<BarWrapper
														label={
															progressLabel[index]
														}
														key={index}
													>
														<CircularProgressbar
															value={value}
															text={`${value}%`}
														/>
													</BarWrapper>
												);
											}
										)}
									</div>
								</div>
							</div>

							{/* <div
								className='petPicArrow'
								onClick={() => this.revealPicsHandler()}
								style={{
									transform: isPlaceProfiles
										? 'rotate(0) translateX(-50%)'
										: 'rotate(540deg) translateX(50%)',
									transition: ' all 0.5s',
								}}
							>
								<i className='fas fa-chevron-down fa-3x petPicIcon'></i>
							</div> */}
						</div>
					))}
				</Slider>

				<CurlySVG visible={visible} />
			</div>
		);
	}
}
