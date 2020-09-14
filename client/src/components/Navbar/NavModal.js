import React, { Component } from 'react';
import { ShopContext } from '../../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export class NavModal extends Component {
	static contextType = ShopContext;
	render() {
		const { navOpen, closeNavModal } = this.context;
		const linkNames = ['HOME', 'PRODUCTS', 'MY FAVORITE', 'CART'];
		const links = ['/', '/products', '/favorites', '/cart'];

		return (
			<StyledNavModal navOpen={navOpen}>
				<ul className='navModal'>
					{linkNames.map((link, index) => {
						return (
							<Link
								to={links[index]}
								onClick={() => closeNavModal()}
								key={index}
							>
								<li>{link}</li>
							</Link>
						);
					})}
				</ul>
			</StyledNavModal>
		);
	}
}

const StyledNavModal = styled.div`
	visibility: ${(props) => (props.navOpen ? 'visible' : 'hidden')};
	z-index: 2;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	.navModal {
		transform: scale(${(props) => (props.navOpen ? '1' : '0')});
		transition-duration: ${(props) => (props.navOpen ? '0.75s' : '0.5s')};
		a {
			opacity: ${(props) => (props.navOpen ? '1' : '0')};
			transition: opacity 0.2s;
		}
	}
`;

export default NavModal;
