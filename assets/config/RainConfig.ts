export default {
	name : "rain",
	angleMin: 0,
	angleMax: 0,
	life : 0,
	gravityY: 500,
	gravityX: -200,
	speed: 50,
	
	scale : {
		start: 0.03, end: 0.03, ease: 'Circ.easeIn'
	},
	
	alpha: {
		start: 0.8, end: 0.1, ease: 'Linear'
	},
	blendMode: 'screen'

	
}