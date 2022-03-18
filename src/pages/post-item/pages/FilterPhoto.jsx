import React, { useEffect, useState, useRef } from 'react'
import main from 'styles.module.css'
import { NavLink } from 'react-router-dom'

export function FilterPhoto({ nextStage, setFilteredPhoto, image }) {
	const [thumbs, setThumbs] = useState([
		{
			filter: 'vintage',
			src: image,
		},
	])
	console.log(thumbs)

	const canvasRef = useRef(null)
	const filterMap = [
		{
			filter: 'lofi',
		},
		{
			filter: 'dramatic',
		},
		{
			filter: 'cali',
		},
		{
			filter: 'firenze',
		},
		{
			filter: 'obsidian',
		},
		{
			filter: 'oceanic',
		},
		{
			filter: 'islands',
		},
		{
			filter: 'marine',
		},
		{
			filter: 'diamante',
		},
		{
			filter: 'perfume',
		},
		{
			filter: 'golden',
		},
		{
			filter: 'pastel_pink',
		},
	]

	const handleFilteredPhoto = () => {
		var file = canvasRef.current.toDataURL('image/png', 1.0)
		//console.log(file);
		setFilteredPhoto(file)
		nextStage()
	}

	const resetEffect = () => {
		let ctx = canvasRef.current.getContext('2d')
		let img = new Image()
		img.src = image
		canvasRef.current.width = img.width
		canvasRef.current.height = img.height
		ctx.drawImage(img, 0, 0, img.width, img.height)
	}

	const changeEffect = (effect) => {
		let ctx = canvasRef.current.getContext('2d')
		let img = new Image()
		img.src = image
		canvasRef.current.width = img.width
		canvasRef.current.height = img.height
		ctx.drawImage(img, 0, 0, img.width, img.height)

		let photonImage = window.photon.open_image(canvasRef.current, ctx)

		// Filter the image
		window.photon.filter(photonImage, effect)
		//window.photon.transform.resize(photonImage, 10, 10, 4);

		// Replace the current canvas' ImageData with the new image's ImageData.
		window.photon.putImageData(canvasRef.current, ctx, photonImage)
	}

	const createThumbs = async () => {
		let ctx = canvasRef.current.getContext('2d')
		let photonImage = window.photon.open_image(canvasRef.current, ctx)
		let scaledCanvas = window.photon.resize_img_browser(photonImage, 100, 100, 2)
		let ctx2 = scaledCanvas.getContext('2d')

		for (let index = 0; index < filterMap.length; index++) {
			const filter = filterMap[index]
			let resizedPhotonImage = window.photon.open_image(scaledCanvas, ctx2)
			window.photon.filter(resizedPhotonImage, filter.filter)
			let file = resizedPhotonImage.get_base64()

			setThumbs((thumbs) => [
				...thumbs,
				{
					filter: filter.filter,
					src: file,
				},
			])
		}
	}

	useEffect(
		() => {
			console.log(canvasRef.current)
			let ctx = canvasRef.current.getContext('2d')
			let img = new Image()
			img.src = image
			canvasRef.current.width = img.width
			canvasRef.current.height = img.height
			ctx.drawImage(img, 0, 0, img.width, img.height)

			// myCaman = window.Caman(canvasRef.current, img, function () {
			//   this.render(function () {
			//     setImg(this.toBase64());
			//   });
			// });
			// console.log(myCaman);

			// Filter the image
			//window.photon.filter(photonImage, "islands");
			//window.photon.transform.resize(photonImage, 10, 10, 4);

			// Replace the current canvas' ImageData with the new image's ImageData.
			//window.photon.putImageData(canvasRef.current, ctx, photonImage);

			createThumbs()
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[canvasRef]
	)

	return (
		<div className={main.container}>
			<div className={main.header}>
				<div>
					<NavLink className={[main.textbutton, main.gray].join(' ')} to="/">
						Cancel
					</NavLink>
				</div>
				<div
					onClick={() => {
						handleFilteredPhoto()
					}}
					className={[main.blue, main.bodyBold, main.textbutton].join(' ')}
				>
					Next
				</div>
			</div>
			<div className={[main.photoplace, main.aspectratiowrapper].join(' ')}>
				<canvas className={main.cropper} ref={canvasRef}></canvas>
			</div>
			{thumbs.length >= 0 ? (
				<div className={main.filterplace}>
					<div className={main.filteritem}>
						<div>original</div>
						<img src={image} width={100} height={100} onClick={() => resetEffect()}></img>
					</div>
					{thumbs.map((item) => (
						<div key={item.filter} className={main.filteritem}>
							<div>{item.filter}</div>
							<img src={item.src} width={100} height={100} onClick={() => changeEffect(item.filter)}></img>
						</div>
					))}
				</div>
			) : (
				<div>no thumbs yet</div>
			)}
		</div>
	)
}

export default FilterPhoto
