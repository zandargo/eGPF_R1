//* 	FORMATO DE NÚMERO "00"
function pad(num) {
	var s = '00' + num
	return s.substr(s.length - 2)
}

//*	FUNÇÃO DISTÂNCIA ENTRE DOIS PONTOS
function dist(u1, v1, u2, v2) {
	return Math.sqrt((u2 - u1) ** 2 + (v2 - v1) ** 2)
}

//* 	POSIÇÃO DO MOUSE
var xM = null
var yM = null
draw.mousemove(moveFunc)
function moveFunc(ev, x, y) {
	xM = x
	yM = y
	var newY = (Math.round(yM / yOff + 0.4) - 1.25) * yOff
	sGavHover.attr({ y: newY })
}