console.log('molte windows')

let counter = 0
let interval

document.getElementById('expensive').addEventListener('click', () => {
	if (interval) {
		clearInterval(interval)
		interval = null
		counter = 0
	}

	interval = setInterval(() => {
		openWindow('/bravooo', 500, 250)
		openWindow('/bravooo', 500, 250)
		counter += 2

		if (counter > 6) {
			clearInterval(interval)
			interval = null
			counter = 0
		}
	}, 500)
})

document.getElementById('gratis').addEventListener('click', () => {
	if (interval) {
		clearInterval(interval)
		interval = null
		counter = 0
	}

	interval = setInterval(() => {
		openWindow()
		openWindow()
		counter += 2

		if (counter > 14) {
			clearInterval(interval)
			interval = null
			counter = 0
		}
	}, 250)
})

function openWindow(url = '/temp', w, h) {
	w = w ?? Math.floor(Math.random() * 100 + 300)
	h = h ?? w

	const x =
		window.screenLeft +
		window.innerWidth / 2 +
		Math.floor(((Math.random() * 2 - 1) * window.innerWidth) / 2)
	const y =
		window.screenTop +
		window.innerHeight / 2 +
		Math.floor(((Math.random() * 2 - 1) * window.innerHeight) / 2)

	window.open(url, '_blank', `width=${w},height=${h},left=${x},top=${y}`)
}
