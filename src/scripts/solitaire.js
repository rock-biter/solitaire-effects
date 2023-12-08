const vel = {
	x: 0,
	y: 0,
}

const gravity = {
	x: 0,
	y: 1400,
}

const position = {
	x: window.screenLeft + window.innerWidth / 2,
	y:
		window.screenTop +
		window.innerHeight / 2 +
		(window.outerHeight - window.innerHeight),
}
let T = 0

const card = document.getElementById('card')
let cardW

const windowsNumber = 60
let shadows = []

const size = {
	w: card.clientWidth,
	h: card.clientHeight + 60,
}

let lastTic = 0
const positions = new Array(windowsNumber)

function update(t = 0) {
	requestAnimationFrame(update)

	const dt = t / 1000 - T
	T = t / 1000

	console.log('ciao')

	// const tic = Math.floor((T * 15) % windowsNumber)
	// localStorage.setItem('i', tic)
	// if (tic >= lastTic) {
	// 	lastTic = tic
	// 	localStorage.setItem('i', tic)
	// 	if (!shadows[tic]) {
	// 		let { w, h } = size
	// 		const { x, y } = position

	// 		shadows.push([position.x, position.y])

	// 		if (tic === windowsNumber - 1) {
	// 			openWindow('/card', w, h - 60, x, y)
	// 		} else {
	// 			openWindow('/card-shadow', w, h - 60, x, y)
	// 		}
	// 		localStorage.setItem('shadows', shadows)
	// 	}
	// }

	// if (shadows.length) {
	// 	localStorage.setItem('i', Math.floor((T * 15) % shadows.length))
	// 	// console.log(Math.floor((T * 10) % shadows.length))
	// }

	// console.log(dt, T)
	if (pause) {
		return
	}

	// if (cardW) {
	// 	window.blur()
	// 	cardW.focus()
	// }

	vel.y += gravity.y * dt
	vel.x += dt
	position.x += vel.x * dt
	position.y += vel.y * dt

	// shadows.shift()
	// shadows.push([position.x, position.y])
	localStorage.setItem('position', [position.x, position.y])

	const tic = Math.floor((T * 15) % windowsNumber)

	if (tic !== lastTic) {
		lastTic = tic

		positions.shift()
		positions.push([position.x, position.y])

		localStorage.setItem('positions', JSON.stringify(positions))
		localStorage.setItem('i', tic)
	}

	// localStorage.setItem('y', position.y)
	// localStorage.setItem('x', position.x)

	if (position.y >= window.screen.height - 260 - size.h / 2 && vel.y > 0) {
		vel.y *= -1
		vel.y *= 0.8
	}

	// console.log(window.screen.width, position.x)

	if (position.x <= 0) {
		reset()
	}

	if (position.x >= window.screen.width - size.w) {
		reset()
	}
}

let interval

let pause = true

reset()

card.addEventListener('click', (e) => {
	// e.stopPropagation()
	// if (interval) return
	e.stopPropagation()
	reset()
	let { w, h } = size
	const { x, y } = position

	// cardW = openWindow('/card', w, h - 60, x, y)
	// console.log(cardW)

	let i = setInterval(() => {
		if (shadows.length >= windowsNumber) {
			clearInterval(i)
			openWindow('/card', w, h - 60, x, y)
			reset()
			requestAnimationFrame(update)
			pause = false

			return
		}
		shadows.push(shadows.length)
		localStorage.setItem('shadows', shadows)

		openWindow('/card-shadow', w, h - 60, x, y)
	}, 20)

	// console.log(localStorage.getItem('shadows').split(','))

	// interval = setInterval(() => {
	// 	let { w, h } = size

	// 	const x = position.x - w / 2
	// 	const y = position.y - h / 2

	// 	if (pause) return

	// 	if (
	// 		Math.abs(window.screenLeft + window.innerWidth / 2 - position.x) >=
	// 		window.screen.width / 2.5
	// 	) {
	// 		// if (position.x < w / 2 || position.x > window.screen.width - w / 2) {
	// 		pause = true
	// 		localStorage.setItem('close', Math.random())
	// 		setTimeout(() => {
	// 			reset()
	// 			pause = false
	// 		}, 500)
	// 	} else {
	// 		openWindow('/card', w, h - 60, x, y)
	// 	}
	// }, 60)
})

function reset() {
	position.x = window.screenLeft + window.innerWidth / 2 - size.w / 2 + 5
	position.y =
		window.screenTop +
		window.innerHeight / 2 +
		(window.outerHeight - window.innerHeight) -
		size.h / 2 -
		30

	vel.y = -100
	vel.x = Math.random() * 2 - 1
	vel.x *= 700

	if (vel.x > 0) {
		vel.x = Math.max(vel.x, 300)
	} else {
		vel.x = Math.min(vel.x, -300)
	}
}

function openWindow(url = '/temp', w, h, x, y) {
	w = w ?? Math.floor(Math.random() * 100 + 300)
	h = h ?? w

	// if (position.x - 120 + w > window.screen.width) {
	// 	w = window.screen.width - (position.x - 120)
	// }

	x =
		x ??
		window.screenLeft +
			window.innerWidth / 2 +
			Math.floor(((Math.random() * 2 - 1) * window.innerWidth) / 2)
	y =
		y ??
		window.screenTop +
			window.innerHeight / 2 +
			Math.floor(((Math.random() * 2 - 1) * window.innerHeight) / 2)

	const wind = window.open(
		url,
		'_blank',
		`popup=1,width=${w},height=${h},left=${x},top=${y},noopener=1,noreferrer=1,`
	)

	return wind
}

window.addEventListener('click', () => {
	clearInterval(interval)
	interval = null
	pause = !pause
})

window.addEventListener('load', () => {
	localStorage.setItem('close', !localStorage.getItem('close'))
})

window.addEventListener('beforeunload', () => {
	// localStorage.setItem('close', !localStorage.getItem('close'))
})

document.getElementById('close').addEventListener('click', (e) => {
	e.stopPropagation()
	localStorage.setItem('close', Math.random())
	shadows = []
	localStorage.setItem('shadows', shadows)
	reset()
})
