import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class MyApp extends React.Component {
	render() {
		const onSuccess = (payment) => {
			console.log('The payment was succeeded!', payment);
			this.props.clearCart();
			this.props.history.push('/products');
		};

		const onCancel = (data) => {
			console.log('The payment was cancelled!', data);
		};

		const onError = (err) => {
			// The main Paypal's script cannot be loaded or somethings block the loading of that script!
			console.log('Error!', err);
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
		};

		let env = 'sandbox';
		let currency = 'TWD';

		const client = {
			sandbox: process.env.REACT_APP_CLIENT_ID,
			production: 'YOUR-PRODUCTION-APP-ID'
		};
		return (
			<PaypalExpressBtn
				env={env}
				client={client}
				currency={currency}
				total={this.props.total}
				onError={onError}
				onSuccess={onSuccess}
				onCancel={onCancel}
			/>
		);
	}
}
