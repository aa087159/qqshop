import React, { Component } from 'react';
import { ShopConsumer } from '../context';
import CurlySVG from './CurlySVG.js';

const API_URL = `http://localhost:${process.env.REACT_APP_API_URL}`;

export class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contactInfo: [
				['Mon.-Fri.', '10:00AM-3:00PM'],
				['+49 1778783855'],
				['aa087159@gmail.com'],
				['台北市中山區建國北路二段186巷12號'],
			],
			contactIcons: [
				'far fa-clock fa-2x',
				'fas fa-phone fa-2x',
				'fas fa-envelope fa-2x',
				'fas fa-map-marker-alt fa-2x',
			],
			visible: false,
			count: ['close', 'maximize', 'minimize'],
			name: '',
			email: '',
			message: '',
			placeSentLabel: false,
		};
		this.submitHandler = this.submitHandler.bind(this);
	}

	ref = React.createRef();

	componentDidMount() {
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

	formHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = (e) => {
		e.preventDefault();

		fetch(`${process.env.PORT}/api/postMessages`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				message: this.state.message,
			}),
		});

		this.setState({
			name: '',
			email: '',
			message: '',
			placeSentLabel: true,
		});

		setTimeout(() => {
			this.setState({
				placeSentLabel: false,
			});
		}, 3000);
	};

	render() {
		return (
			<ShopConsumer>
				{(value) => {
					const {
						contactInfo,
						contactIcons,
						visible,
						count,
						name,
						email,
						message,
						placeSentLabel,
					} = this.state;
					return (
						<div
							id='contact'
							className='contactWrapper'
							ref={this.ref}
						>
							<div className='ContactInfo'>
								<h1>Contact Info</h1>
								<div className='contact-info-items'>
									{contactInfo.map((each, index) => {
										return (
											<div
												className='contact-info-item'
												key={index}
											>
												<i
													className={
														contactIcons[index]
													}
												></i>
												<span>
													{each[0]}
													<br />
													{each[1]}
												</span>
											</div>
										);
									})}
								</div>
							</div>
							<div className='screen'>
								<div className='screen-header'>
									<div className='screen-header-left'>
										{count.map((count, index) => {
											return (
												<div
													className={`screen-header-button ${count}`}
													key={index}
												></div>
											);
										})}
									</div>
									<div className='screen-header-right'>
										{count.map((count, index) => {
											return (
												<div
													className='screen-header-ellipsis'
													key={index}
												></div>
											);
										})}
									</div>
								</div>
								<div className='screen-body'>
									<div className='screen-body-left'></div>
									<div className='screen-body-right'>
										<div className='screen-body-title'>
											<div className='app-title'>
												<span>Contact Us</span>
											</div>
										</div>
										<div className='screen-body-body'>
											<form
												className='app-form'
												onSubmit={this.submitHandler}
											>
												<div
													className='sent-label'
													style={{
														display: placeSentLabel
															? 'block'
															: 'none',
													}}
												>
													the message has been sent
												</div>
												<div className='app-form-group'>
													<input
														className='app-form-control'
														type='text'
														placeholder='name'
														name='name'
														value={name}
														onChange={(e) =>
															this.formHandler(e)
														}
														required={true}
													/>
												</div>
												<div className='app-form-group'>
													<input
														className='app-form-control'
														type='text'
														placeholder='email'
														name='email'
														value={email}
														onChange={(e) =>
															this.formHandler(e)
														}
														required
													/>
												</div>
												<textarea
													className='app-form-group'
													type='text'
													placeholder='message us...'
													name='message'
													value={message}
													onChange={(e) =>
														this.formHandler(e)
													}
													required
												></textarea>
												<div className='buttons'>
													<button
														type='submit'
														className='app-form-button'
													>
														Submit
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
							<CurlySVG visible={visible} />
						</div>
					);
				}}
			</ShopConsumer>
		);
	}
}

export default Contact;
