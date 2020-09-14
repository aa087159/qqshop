import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { ShopConsumer } from '../context';

export default function PhotoGallery(props) {
	const dog1 = [
		{
			src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
			width: 4,
			height: 3,
		},
		{
			src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
			width: 3,
			height: 4,
		},
		{
			src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
			width: 3,
			height: 4,
		},
		{
			src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
			width: 3,
			height: 4,
		},
		{
			src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
			width: 3,
			height: 4,
		},
		{
			src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
			width: 4,
			height: 3,
		},
		{
			src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
			width: 3,
			height: 4,
		},
		{
			src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
			width: 4,
			height: 3,
		},
		{
			src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
			width: 4,
			height: 3,
		},
	];

	const dog = [];
	for (let i = 0; i < 9; i++) {
		dog.push({
			src: `img/Animals/dog/dog${i + 1}.jpg`,
			width: 2,
			height: 3,
		});
	}

	const cat = [];
	for (let i = 0; i < 9; i++) {
		cat.push({
			src: `img/Animals/cat/cat${i + 1}.jpg`,
			width: 4,
			height: 3,
		});
	}

	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
	};

	const { index } = props;
	let option;
	if (index === 0) {
		option = dog;
	} else {
		option = cat;
	}
	return (
		<ShopConsumer>
			{(value) => {
				// const { NavDisplay } = value;

				return (
					<>
						<Gallery photos={option} onClick={openLightbox} />
						<ModalGateway>
							{viewerIsOpen ? (
								<Modal onClose={closeLightbox}>
									<Carousel
										currentIndex={currentImage}
										views={option.map((x) => ({
											...x,
											srcset: x.srcSet,
											caption: x.title,
										}))}
									/>
								</Modal>
							) : null}
						</ModalGateway>
					</>
				);
			}}
		</ShopConsumer>
	);
}
