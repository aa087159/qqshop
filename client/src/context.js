import React, { Component } from 'react';
import Client from './Contentful';

const ShopContext = React.createContext();

class ShopProvider extends Component {
	state = {
		navOpen: false,
		products: [],
		sortedProducts: [],
		loading: true,
		price: 0,
		minPrice: 0,
		maxPrice: 0,
		Favorites: [],
		cart: [],
		total: 0,
		displayNav: true,
	};

	componentDidMount() {
		this.getData();
	}
	getRelatedProducts = (sort) => {
		let { products } = this.state;

		let tempProducts = [...products];
		if (sort) {
			tempProducts = tempProducts.filter(
				(product) => product.handCraftSort === sort
			);
		}

		this.setState({ relatedProducts: tempProducts });
	};

	getData = async () => {
		try {
			let response = await Client.getEntries({
				content_type: 'doggies',
				//order: 'sys.createdAt'
				//order: '-fields.price'
			});

			let products = this.formatData(response.items);

			let maxPrice = Math.max(
				...products.map((product) => product.price)
			);
			this.setState({
				products,
				sortedProducts: products,
				loading: false,
				price: maxPrice,
				maxPrice,
			});
		} catch (error) {
			console.log(error);
		}
	};

	formatData = (items) => {
		let tempItems = items.map((item) => {
			let id = item.sys.id;
			let images = item.fields.images.map(
				(image) => image.fields.file.url
			);
			let products = { ...item.fields, images, id };
			return products;
		});

		return tempItems;
	};

	getSingleProduct = (singleProductURL) => {
		let tempProducts = [...this.state.products];
		const product = tempProducts.find((product) => {
			return product.singleProductUrl === singleProductURL;
		});

		return product;
	};

	ToFavoritesOrCartHandler = (singleProductUrl, area, areaString) => {
		let tempProducts = [...this.state.products];
		let Index = tempProducts.indexOf(
			this.getSingleProduct(singleProductUrl)
		);
		let product = tempProducts[Index];

		if (area.includes(product)) {
			areaString === 'inFavorites'
				? (product.inFavorites = false)
				: (product.inCart = false);

			let Left = area.filter((each) => {
				return each.singleProductUrl !== product.singleProductUrl;
			});
			this.setState(() => {
				return {
					products: tempProducts,
					[areaString === 'inFavorites' ? 'Favorites' : 'cart']: Left,
				};
			});
		} else {
			areaString === 'inFavorites'
				? (product.inFavorites = true)
				: (product.inCart = true);

			this.setState(() => {
				return {
					products: tempProducts,
					[areaString === 'inFavorites' ? 'Favorites' : 'cart']: [
						...area,
						product,
					],
				};
			});
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value }, this.filterProducts);
	};

	filterProducts = (event) => {
		let { price, products } = this.state;
		let tempProducts = [...products];

		tempProducts = tempProducts.filter((product) => product.price <= price);

		//filter by handCraftSort
		if (event && event.target.name !== 'all') {
			tempProducts = tempProducts.filter(
				(product) => product.handCraftSort === event.target.name
			);
		} else if (event && event.target.name === 'all') {
			tempProducts = [...products];
		}

		this.setState({ sortedProducts: tempProducts });
	};

	increment = (singleProductUrl) => {
		let tempProducts = [...this.state.products];
		let index = tempProducts.indexOf(
			this.getSingleProduct(singleProductUrl)
		);
		let Product = tempProducts[index];
		Product.count += 1;
		this.setState(
			{ products: tempProducts },
			this.ItemTotal(singleProductUrl, tempProducts)
		);
	};

	decrement = (singleProductUrl) => {
		let tempProducts = [...this.state.products];
		let index = tempProducts.indexOf(
			this.getSingleProduct(singleProductUrl)
		);
		let Product = tempProducts[index];
		Product.count -= 1;
		if (Product.count < 0) {
			Product.count = 0;
			this.setState({ products: tempProducts });
		} else {
			this.setState(
				{ products: tempProducts },
				this.ItemTotal(singleProductUrl, tempProducts)
			);
		}
	};

	ItemTotal = (singleProductUrl, tempProducts) => {
		let index = tempProducts.indexOf(
			this.getSingleProduct(singleProductUrl)
		);
		let Product = tempProducts[index];
		Product.total = Product.price * Product.count;
		this.setState({ products: tempProducts }, this.cartTotal());
	};

	clearCart = () => {
		let tempProducts = [...this.state.products];
		tempProducts.forEach((product) => (product.inCart = false));
		this.setState({ products: tempProducts });
	};

	cartTotal = () => {
		let tempProducts = [...this.state.products];
		let inCartProducts = tempProducts.filter((product) => {
			return product.inCart;
		});
		let cartTotal = 0;
		inCartProducts.map((product) => {
			return (cartTotal += product.total);
		});
		this.setState({ total: cartTotal });
	};

	countChange = (e, singleProductUrl) => {
		let tempProducts = [...this.state.products];
		let index = tempProducts.indexOf(
			this.getSingleProduct(singleProductUrl)
		);
		let Product = tempProducts[index];
		Product.count = parseInt(e.target.value);
		this.setState({ products: tempProducts });
	};

	NavOpenHandler = () => {
		this.setState({ navOpen: !this.state.navOpen });
	};

	closeNavModal = () => {
		this.setState({ navOpen: false });
	};

	NavDisplay = () => {
		this.setState({ displayNav: !this.state.displayNav });
	};

	render() {
		return (
			<ShopContext.Provider
				value={{
					...this.state,
					NavOpenHandler: this.NavOpenHandler,
					closeNavModal: this.closeNavModal,
					getSingleProduct: this.getSingleProduct,
					ToFavoritesOrCartHandler: this.ToFavoritesOrCartHandler,
					handleChange: this.handleChange,
					filterProducts: this.filterProducts,
					increment: this.increment,
					decrement: this.decrement,
					clearCart: this.clearCart,
					cartTotal: this.cartTotal,
					countChange: this.countChange,
					NavDisplay: this.NavDisplay,
					getRelatedProducts: this.getRelatedProducts,
				}}
			>
				{this.props.children}
			</ShopContext.Provider>
		);
	}
}

const ShopConsumer = ShopContext.Consumer;

export function withProductsConsumer(Component) {
	return function ConsumerWrapper(props) {
		return (
			<ShopConsumer>
				{(value) => <Component {...props} context={value} />}
			</ShopConsumer>
		);
	};
}

export { ShopProvider, ShopConsumer, ShopContext };
