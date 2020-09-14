import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	withRouter,
} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import NavModal from './components/Navbar/NavModal';
import { ShopProvider } from './context';

const WithRouterNavbar = withRouter(Navbar);

function App() {
	return (
		<ShopProvider>
			<Router>
				<WithRouterNavbar />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/products' exact component={Products} />
					<Route
						path='/products/:singleProductURL'
						exact
						component={SingleProduct}
					/>
					<Route path='/favorites' component={Favorites} />
					<Route path='/cart' component={Cart} />
					<Route component={Error} />
				</Switch>
				<NavModal />
			</Router>
		</ShopProvider>
	);
}

export default App;
