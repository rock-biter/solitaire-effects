const vel = {
	x: 0,
	y: 0,
}

const gravity = {
	x: 0,
	y: 1000,
}

const position = {
	x: window.screenLeft + window.innerWidth / 2,
	y:
		window.screenTop +
		window.innerHeight / 2 +
		(window.outerHeight - window.innerHeight),
}
let T = 0

function update(t = 0) {
	const dt = t / 1000 - T
	T = t / 1000

	// console.log(dt, T)

	vel.y += gravity.y * dt
	vel.x += dt
	position.x += vel.x * dt
	position.y += vel.y * dt

	if (position.y >= window.screen.height - 300 && vel.y > 0) {
		vel.y *= -1
	}

	requestAnimationFrame(update)
}

requestAnimationFrame(update)

let interval

document.getElementById('card').addEventListener('click', (e) => {
	e.stopPropagation()
	if (interval) return

	reset()

	interval = setInterval(() => {
		const w = 240
		const h = 400

		const x = position.x - w / 2
		const y = position.y - h / 2
		openWindow('/card', w, h, x, y)

		// console.log(vel.y, position.y)

		if (position.x < 0 || position.x > window.screen.width) {
			// clearInterval(interval)
			// interval = null

			reset()
		}
	}, 10)
})

function reset() {
	position.x = window.screenLeft + window.innerWidth / 2
	position.y =
		window.screenTop +
		window.innerHeight / 2 +
		(window.outerHeight - window.innerHeight)

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

	window.open(
		url,
		'_blank',
		`popup=1,width=${w},height=${h},left=${x},top=${y},noopener=1,noreferrer=1`
	)
}

window.addEventListener('click', () => {
	clearInterval(interval)
	interval = null
})

window.addEventListener('load', () => {
	localStorage.setItem('close', false)
})

window.addEventListener('beforeunload', () => {
	localStorage.setItem('close', true)
})
