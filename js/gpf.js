// Definições iniciais
//// var A4x = 720
var A4x = 500
var A4y = 2250
var offP = 0

var x0p = offP
var y0p = offP
var x1p = A4x + offP
var y1p = A4y + offP
//// var draw = SVG().addTo('body').size(A4x+20, A4y+20)
//// var draw = Snap(x1p, y1p)
var draw = Snap('#svgESQ')

// Definição geral da gaveta
var nGavs     = 32                          // Número de gavetas
var Larg      = 150                         // Largura da Gaveta
var Alt       = 8                           // Altura da gaveta
var k         = 5                           // Proporção Gaveta/Coluna
var x0        = 200                         // Posição inicial X
var y0        = 50                          // Posição inicial Y
var yOff      = 64                          // Offset entre gavetas
var lwid      = 2                           // Largura de linha geral
var cor0      = 'white'                     // Cor de fundo
var cor1      = 'black'                     // Cor de linha
var sk        = 5                           // Skew
var kLin      = 3                           // Expansão de linha fora da gaveta
var kFT       = 2.25                        // Fator de correção para as linhas Frente e Trás
var kDE       = 1                           // Fator de correção para as linhas Direita e Esquerda
var strDashPR = 30 * lwid + ' ' + 3 * lwid  // Padrão de tracejado do PRODUTO
var strDashRX = 3 * lwid + ' ' + 3 * lwid   // Padrão de tracejado do RECHAÇO
var strDashPN = 6 * lwid + ' ' + 6 * lwid   // Padrão de tracejado do PENEIRADO

var cLinPR = 'navy' // Cor da linha do PRODUTO
var cLinRX = 'navy' // Cor da linha do RECHAÇO
var cLinPN = 'gray' // Cor da linha do PENEIRADO

// Definições Animação
var Anim0 = 0
var Anim1 = 8000
var Anim2 = -500000

// Posição dos centros
var xFi = null
var yFi = null
var xEi = null
var yEi = null
var xDi = null
var yDi = null
var xTi = null
var yTi = null

var xFe = null
var yFe = null
var xEe = null
var yEe = null
var xDe = null
var yDe = null
var xTe = null
var yTe = null

var xT = 0
var yT = 0

//Gaveta atual
var iGav = null
var gID
var gIDhover  = ''
var bEditMode = false
var iGavSel   = null
var nGav      = null
var nLado     = null
var nIE       = null
var nGav0     = null
var nPn       = null
var sLado     = ''
var sIE       = ''
var s         = ''
var L         = ''
//Move
var xi = 0
    yi = 0
var xf = 0
    yf = 0
//Máscara
var bRXmask = false

//Esquema
var hTotal = 0

//Peneirado de fundo
var patPn = draw
	.line(1.5 * lwid, 1.5 * lwid, 1.5 * lwid, 900)
	.attr({
		stroke           : cLinPN,
		strokeDasharray  : 1 * lwid + ',' + 3 * lwid,
		strokeDashoffset : 0,
		strokeWidth      : 1.5 * lwid,
		'stroke-linecap' : 'round',
		'stroke-linejoin': 'round',
	})
	.pattern(0, 0, 3 * lwid, 900 + 3 * lwid)
// patPn.animate({ y: 90000 }, 5000000)

var patOffset = 0
animation()
function animation() {
	patOffset += 9000
	patPn.animate({ y: patOffset }, 500000, mina.linear, animation)
}
// var animation = function() {
// 	patOffset -= 90
// 	patPn.animate({ y: patOffset }, 5000, mina.linear, animation)
//   }

// Formatar o estilo CSS: Criar Sliders
function drwSliders() {
	for (let index = 1; index <= nGavs; index++) {
		let nGPF = pad(index)

		// Div Container
		var div = document.createElement('div')
		div.id = 'sliderGPF' + nGPF
		div.className = 'slidecontainer'
		document.getElementById('divHCtrl').appendChild(div)

		// Texto com nº da gaveta
		var h1 = document.createElement('h1')
		h1.innerHTML = nGPF
		div.appendChild(h1)

		//Slider
		var input = document.createElement('input')
		input.type = 'range'
		input.id = 'rngG' + nGPF
		input.className = 'slider'
		input.min = 65
		input.max = 145
		input.step = 10
		input.value = 65 // Terá que mudar dependendo do valor da matriz
		div.appendChild(input)

		// Valor
		var span = document.createElement('span')
		span.id = 'valH' + nGPF
		span.innerHTML = input.value
		div.appendChild(span)

		input.addEventListener(
			'input',
			function () {
				let sID = 'valH' + nGPF
				let target = document.getElementById(sID)
				for (let index = 0; index < mH.length; index++) {
					if (this.value == mH[index][0]) {
						let value = mH[index][1]
						if (mH[index][2] > 0) {
							value = ' <h5>+' + mH[index][2] + '</h5> ' + mH[index][1]
						}
						target.innerHTML = value
						break
					}
				}
				let j = 1 * index
				mESQ[j][0][0][0] = parseInt(this.value, 10)
				calcHtotal()
			},
			true
		)
	}
}

// CALCULAR ALTURA TOTAL DAS GAVETAS
function calcHtotal() {
	for (let index = 1; index < nGavs; index++) {
		let nGPF = pad(index)
		let source = document.getElementById('rngG' + nGPF)
		let j = 1 * index
		mESQ[j][0][0][0] = parseInt(source.value, 10)
	}
	mESQ[nGavs][0][0][0] = 32

	hTotal = 0
	// mESQ[nGavs][0][0][0] = 32
	for (let index = 1; index <= nGavs; index++) {
		// console.log(mESQ[index][0][0][0])
		hTotal = hTotal + 1 * mESQ[index][0][0][0]
	}
	// console.log(hTotal)
	let target = document.getElementById('hTotal')
	target.innerHTML = '&nbsp' + hTotal + 'mm'
}

//CÓDIGO DAS GAVETAS
function drwCOD() {
	for (let index = 1; index <= nGavs; index++) {
		let nGPF = pad(index)

		// Div Container
		var div = document.createElement('div')
		div.id = 'codGPF' + nGPF
		div.className = 'codcontainer'
		document.getElementById('divCOD').appendChild(div)

		// Texto com nº da gaveta
		let h2 = document.createElement('h2')
		h2.id = 'codGPF' + nGPF
		h2.innerHTML = 'GPF'
		div.appendChild(h2)
	}
}

// POSIÇÃO DO MOUSE
var xM = null
var yM = null
draw.mousemove(moveFunc)
function moveFunc(ev, x, y) {
	xM = x
	yM = y
	var newY = (Math.round(yM / yOff + 0.4) - 1.25) * yOff
	sGavHover.attr({ y: newY })
}

// FORMATO DE NÚMERO "00"
function pad(num) {
	var s = '00' + num
	return s.substr(s.length - 2)
}

//FUNÇÃO DISTÂNCIA ENTRE DOIS PONTOS
function dist(u1, v1, u2, v2) {
	return Math.sqrt((u2 - u1) ** 2 + (v2 - v1) ** 2)
}

function FiHoverIN() {
	sLado = 'Fi'
}
function DiHoverIN() {
	sLado = 'Di'
}
function EiHoverIN() {
	sLado = 'Ei'
}
function TiHoverIN() {
	sLado = 'Ti'
}
function FeHoverIN() {
	sLado = 'Fe'
}
function DeHoverIN() {
	sLado = 'De'
}
function EeHoverIN() {
	sLado = 'Ee'
}
function TeHoverIN() {
	sLado = 'Te'
}

function ladoHoverOUT() {
	sLado = ''
}

// function gHoverOUT() {
// 	sLado = ''
// }

let wf = 2.25

/* 









*/
//Matriz de equivalência de altura da gaveta
var mH = [
	[65, 65, 0],
	[75, 75, 0],
	[85, 85, 0],
	[95, 65, 30],
	[105, 75, 30],
	[115, 85, 30],
	[125, 65, 60],
	[135, 75, 60],
	[145, 85, 60],
]

// MATRIZ PRINCIPAL: PONTOS DA GAVETA(PARA DESENHO TEMPLATE)
// prettier-ignore
var mP = [
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //0 Pontos do polígono principal
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //1 Pontos do CANTO 1
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //2 Pontos do CANTO 2
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //3 Pontos do CANTO 3
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]] //4 Pontos do CANTO 4
]

// MATRIX CHAMINÉ: PONTOS PARA DESENHO DA CHAMINÉ
// prettier-ignore
var mC = [
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //0
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //1 Pontos 'F'
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //2 Pontos 'D'
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //3 Pontos 'E'
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]] //4 Pontos 'T'
]

// MATRIZ FLUXO: PONTOS DE CONEXÃO
// prettier-ignore
var mF = [
	[[0, 0],[0, 0]], //0 Centro da Gaveta
	[[0, 0],[0, 0]], //1 Pontos 'Fi' e 'Fe'
	[[0, 0],[0, 0]], //2 Pontos 'Di' e 'De'
	[[0, 0],[0, 0]], //3 Pontos 'Ei' e 'Ee'
	[[0, 0],[0, 0]] //4 Pontos 'Ti' e 'Te'
]

//MATRIZ GERAL DE PRODUTO/RECHAÇO
// prettier-ignore
var mG = [
	[
		[[0, 0], [0, 0]] , //0 Centro da Gaveta	00
		[[0, 0], [0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0], [0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0], [0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0], [0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	01
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	02
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	03
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	04
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	05
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	06
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	07
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	08
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	09
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	10
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	11
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	12
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	13
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	14
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	15
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	16
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	17
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	18
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	19
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	20
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	21
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	22
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	23
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	24
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	25
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	26
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	27
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	28
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	29
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	30
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	31
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]], //0 Centro da Gaveta	32
		[[0, 0],[0, 0]], //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]], //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]], //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]] //4 Pontos 'Ti' e 'Te'
]

//DEFINIÇÃO GERAL DA MATRIZ DE PRODUTO/RECHAÇO
for (let g = 1; g <= nGavs; g++) {
	//Calcula os pontos da gaveta atual
	calcMat(x0, y0 + yOff * g, Larg)
	//Grava na matriz geral
	for (let l = 0; l <= 4; l++) {
		for (let io = 0; io <= 1; io++) {
			for (let xy = 0; xy <= 1; xy++) {
				mG[g][l][io][xy] = 1 * mF[l][io][xy]
			}
		}
	}
}

//MATRIZ GERAL DE CONTROLE DO ESQUEMA
var mESQ = [
	[
		[0, 'A'], //Gaveta 00: Altura, Produto
		[0, 0], // Rx: nLado, 'nPara'
		[0, 0], //Pn1: nLado, 'nPara'
		[0, 0],
	], //Pn2: nLado, 'nPara'
]

//DEFINIÇÃO GERAL DA MATRIZ DE ESQUEMA
for (let g = 1; g < nGavs; g++) {
	let mGav = [
		[
			[65, ''],
			[0, 0],
			[0, 0],
			[0, 0],
		],
	]
	mESQ.push(mGav)
}
let mGav = [
	[
		[32, ''],
		[0, 0],
		[0, 0],
		[0, 0],
	],
]
mESQ.push(mGav)

//MATRIZ DE CÓDIGOS DAS GAVETAS
var mCOD0 = [
	[120, 'D'],
	[102, 'D'],
	[130, 'E'],
	[103, 'E'],
	[123, 'A'],
	[132, 'A'],
	[210, 'E'],
	[201, 'E'],
	[240, 'D'],
	[204, 'D'],
	[214, 'A'],
	[241, 'A'],
	[310, 'D'],
	[301, 'D'],
	[340, 'E'],
	[304, 'E'],
	[314, 'A'],
	[341, 'A'],
	[420, 'E'],
	[402, 'E'],
	[430, 'D'],
	[403, 'D'],
	[423, 'A'],
	[432, 'A'],
	[100, 'F'],
	[200, 'F'],
	[300, 'F'],
	[400, 'F'],
	[104, 'R'],
	[140, 'R'],
	[203, 'R'],
	[230, 'R'],
	[302, 'R'],
	[320, 'R'],
	[401, 'R'],
	[410, 'R'],
]

//MATRIZ DE CORTE
var mCorte = [
	[10000, ''],
	[20000, ''],
	[30000, ''],
	[40000, ''],
	[13000, '-RA'],
	[10330, '-RDS'],
	[10003, '-RP'],
	[10001, '-RPPS'],
	[10002, '-RPPD'],
	[10300, '-RD'],
	[10200, '-RPDA'],
	[10100, '-RPDP'],
	[10030, '-RS'],
	[10020, '-RPSA'],
	[10010, '-RPSP'],

	[20300, '-RA'],
	[23003, '-RDS'],
	[20030, '-RP'],
	[20020, '-RPPS'],
	[20010, '-RPPD'],
	[20003, '-RD'],
	[20002, '-RPDA'],
	[20001, '-RPDP'],
	[23000, '-RS'],
	[22000, '-RPSA'],
	[21000, '-RPSP'],

	[30030, '-RA'],
	[33003, '-RDS'],
	[30300, '-RP'],
	[30100, '-RPPS'],
	[30200, '-RPPD'],
	[33000, '-RD'],
	[31000, '-RPDA'],
	[32000, '-RPDP'],
	[30003, '-RS'],
	[30001, '-RPSA'],
	[30002, '-RPSP'],

	[40003, '-RA'],
	[40330, '-RDS'],
	[43000, '-RP'],
	[42000, '-RPPS'],
	[41000, '-RPPD'],
	[40030, '-RD'],
	[40010, '-RPDA'],
	[40020, '-RPDP'],
	[40300, '-RS'],
	[40100, '-RPSA'],
	[40200, '-RPSP'],

	[13003, '-RARP'],
	[20330, '-RARP'],
	[30330, '-RARP'],
	[43003, '-RARP'],

	[13002, '-RAPPD'],
	[20310, '-RAPPD'],
	[30230, '-RAPPD'],
	[41003, '-RAPPD'],
]

//FUNÇÃO CÁLCULO DOS PONTOS DA GAVETA
function calcMat(xC, yC, L) {
	let xT = 0
	let yT = 0
	// GAVETA EM BRANCO
	// Contorno principal
	mP[0][1][0] = xC - L / 2
	mP[0][1][1] = yC + L / 2 / sk //1
	mP[0][2][0] = xC - L / 4
	mP[0][2][1] = yC - L / 2 / sk //2
	mP[0][3][0] = xC + L / 2
	mP[0][3][1] = yC - L / 2 / sk //3
	mP[0][4][0] = xC + L / 4
	mP[0][4][1] = yC + L / 2 / sk //4
	//Canto 1
	xT = xC - (L / 2) * (1 - 1 / k)
	yT = yC + (L / 2 / sk) * (1 - 1 / k)
	mP[1][0][0] = xT
	mP[1][0][1] = yT //Centro
	mP[1][1][0] = xT - L / 2 / k
	mP[1][1][1] = yT + L / 2 / sk / k //1
	mP[1][2][0] = xT - L / 4 / k
	mP[1][2][1] = yT - L / 2 / sk / k //2
	mP[1][3][0] = xT + L / 2 / k
	mP[1][3][1] = yT - L / 2 / sk / k //3
	mP[1][4][0] = xT + L / 4 / k
	mP[1][4][1] = yT + L / 2 / sk / k //4
	//Canto 2
	xT = xC - (L / 4) * (1 - 1 / k)
	yT = yC - (L / 2 / sk) * (1 - 1 / k)
	mP[2][0][0] = xT
	mP[2][0][1] = yT //Centro
	mP[2][1][0] = xT - L / 2 / k
	mP[2][1][1] = yT + L / 2 / sk / k //1
	mP[2][2][0] = xT - L / 4 / k
	mP[2][2][1] = yT - L / 2 / sk / k //2
	mP[2][3][0] = xT + L / 2 / k
	mP[2][3][1] = yT - L / 2 / sk / k //3
	mP[2][4][0] = xT + L / 4 / k
	mP[2][4][1] = yT + L / 2 / sk / k //4
	//Canto 3
	xT = xC + (L / 2) * (1 - 1 / k)
	yT = yC - (L / 2 / sk) * (1 - 1 / k)
	mP[3][0][0] = xT
	mP[3][0][1] = yT //Centro
	mP[3][1][0] = xT - L / 2 / k
	mP[3][1][1] = yT + L / 2 / sk / k //1
	mP[3][2][0] = xT - L / 4 / k
	mP[3][2][1] = yT - L / 2 / sk / k //2
	mP[3][3][0] = xT + L / 2 / k
	mP[3][3][1] = yT - L / 2 / sk / k //3
	mP[3][4][0] = xT + L / 4 / k
	mP[3][4][1] = yT + L / 2 / sk / k //4
	//Canto 4
	xT = xC + (L / 4) * (1 - 1 / k)
	yT = yC + (L / 2 / sk) * (1 - 1 / k)
	mP[4][0][0] = xT
	mP[4][0][1] = yT //Centro
	mP[4][1][0] = xT - L / 2 / k
	mP[4][1][1] = yT + L / 2 / sk / k //1
	mP[4][2][0] = xT - L / 4 / k
	mP[4][2][1] = yT - L / 2 / sk / k //2
	mP[4][3][0] = xT + L / 2 / k
	mP[4][3][1] = yT - L / 2 / sk / k //3
	mP[4][4][0] = xT + L / 4 / k
	mP[4][4][1] = yT + L / 2 / sk / k //4

	// CHAMINÉ
	// 1 Frente
	mC[1][1][0] = mP[1][4][0]
	mC[1][1][1] = mP[1][4][1] //Canto 1 Ponto 4
	mC[1][2][0] = mP[1][3][0]
	mC[1][2][1] = mP[1][3][1] //Canto 1 Ponto 3
	mC[1][3][0] = mP[4][2][0]
	mC[1][3][1] = mP[4][2][1] //Canto 4 Ponto 2
	mC[1][4][0] = mP[4][1][0]
	mC[1][4][1] = mP[4][1][1] //Canto 4 Ponto 1
	mC[1][0][0] = (mC[1][1][0] + mC[1][2][0] + mC[1][3][0] + mC[1][4][0]) / 4 //xCentro
	mC[1][0][1] = (mC[1][1][1] + mC[1][2][1] + mC[1][3][1] + mC[1][4][1]) / 4 //yCentro
	// 2 Direita
	mC[2][1][0] = mP[4][2][0]
	mC[2][1][1] = mP[4][2][1] //Canto 4 Ponto 2
	mC[2][2][0] = mP[3][1][0]
	mC[2][2][1] = mP[3][1][1] //Canto 3 Ponto 1
	mC[2][3][0] = mP[3][4][0]
	mC[2][3][1] = mP[3][4][1] //Canto 3 Ponto 4
	mC[2][4][0] = mP[4][3][0]
	mC[2][4][1] = mP[4][3][1] //Canto 4 Ponto 3
	mC[2][0][0] = (mC[2][1][0] + mC[2][2][0] + mC[2][3][0] + mC[2][4][0]) / 4 //xCentro
	mC[2][0][1] = (mC[2][1][1] + mC[2][2][1] + mC[2][3][1] + mC[2][4][1]) / 4 //yCentro
	// 3 Esquerda
	mC[3][1][0] = mP[1][2][0]
	mC[3][1][1] = mP[1][2][1] //Canto 1 Ponto 2
	mC[3][2][0] = mP[2][1][0]
	mC[3][2][1] = mP[2][1][1] //Canto 2 Ponto 1
	mC[3][3][0] = mP[2][4][0]
	mC[3][3][1] = mP[2][4][1] //Canto 2 Ponto 4
	mC[3][4][0] = mP[1][3][0]
	mC[3][4][1] = mP[1][3][1] //Canto 1 Ponto 3
	mC[3][0][0] = (mC[3][1][0] + mC[3][2][0] + mC[3][3][0] + mC[3][4][0]) / 4 //xCentro
	mC[3][0][1] = (mC[3][1][1] + mC[3][2][1] + mC[3][3][1] + mC[3][4][1]) / 4 //yCentro
	// 4 Trás
	mC[4][1][0] = mP[2][4][0]
	mC[4][1][1] = mP[2][4][1] //Canto 2 Ponto 4
	mC[4][2][0] = mP[2][3][0]
	mC[4][2][1] = mP[2][3][1] //Canto 2 Ponto 3
	mC[4][3][0] = mP[3][2][0]
	mC[4][3][1] = mP[3][2][1] //Canto 3 Ponto 2
	mC[4][4][0] = mP[3][1][0]
	mC[4][4][1] = mP[3][1][1] //Canto 3 Ponto 1
	mC[4][0][0] = (mC[4][1][0] + mC[4][2][0] + mC[4][3][0] + mC[4][4][0]) / 4 //xCentro
	mC[4][0][1] = (mC[4][1][1] + mC[4][2][1] + mC[4][3][1] + mC[4][4][1]) / 4 //yCentro

	//FLUXO
	//Interno
	mF[0][0][0] = xC
	mF[0][0][1] = yC //Centro i
	mF[1][0][0] = mC[1][0][0]
	mF[1][0][1] = mC[1][0][1] //F i
	mF[2][0][0] = mC[2][0][0]
	mF[2][0][1] = mC[2][0][1] //D i
	mF[3][0][0] = mC[3][0][0]
	mF[3][0][1] = mC[3][0][1] //E i
	mF[4][0][0] = mC[4][0][0]
	mF[4][0][1] = mC[4][0][1] //T i

	//Externo
	mF[0][1][0] = xC //xCentro e
	mF[0][1][1] = yC //yCentro e
	f = 2.2
	mF[1][1][0] = xC + 3 * f * (mF[1][0][0] - xC) //xFe
	mF[1][1][1] = yC + 3 * f * (mF[1][0][1] - yC) //yFe
	f = 1
	mF[2][1][0] = xC + 3 * f * (mF[2][0][0] - xC) //xDe
	mF[2][1][1] = yC + 3 * f * (mF[2][0][1] - yC) //yDe
	f = 1
	mF[3][1][0] = xC + 3 * f * (mF[3][0][0] - xC) //xEe
	mF[3][1][1] = yC + 3 * f * (mF[3][0][1] - yC) //yEe
	f = 2.2
	mF[4][1][0] = xC + 3 * f * (mF[4][0][0] - xC) //xTe
	mF[4][1][1] = yC + 3 * f * (mF[4][0][1] - yC) //yTe
}

//TODO Adicionar desenhos das saídas de fundo em perspectiva

// Função Guias (Edit Mode)
function drwGuias() {
	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		let swid = 0.5 * lwid
		// Pontos
		calcMat(x0, y0 + yOff * j, Larg)
		var gGui = draw.group()
		gGui.attr({ id: 'Guia_' + gIDtmp })
		//Linhas
		var polyline = draw
			.polyline(mF[1])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		var polyline = draw
			.polyline(mF[2])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		var polyline = draw
			.polyline(mF[3])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		var polyline = draw
			.polyline(mF[4])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		//Círculos
		var ellipse = draw
			.ellipse(mF[1][1][0], mF[1][1][1], Alt / 2, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		var ellipse = draw
			.ellipse(mF[2][1][0], mF[2][1][1], Alt, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		var ellipse = draw
			.ellipse(mF[3][1][0], mF[3][1][1], Alt, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		var ellipse = draw
			.ellipse(mF[4][1][0], mF[4][1][1], Alt / 2, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_' + gIDtmp))
		draw.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 0 })
	}
}

function showGuias() {
	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		// draw.select('#' + "Guia_" + gIDtmp).remove()
		draw.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 1 })
	}
}

function hideGuias() {
	for (let j = 32; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		try {
			draw.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 0 })
		} catch (error) {}
	}
}

// FUNÇÕES DE MOVIMENTAÇÃO DOS PONTOS DE CONTROLE DO PENEIRADO
var cpPnMove = function (dx, dy) {
	this.attr({
		transform:
			this.data('origTransform') +
			(this.data('origTransform') ? 'T' : 't') +
			[dx, dy],
	})
	var bb = this.getBBox()
	xi = bb.cx
	yi = bb.cy
}

var cpPnMoveStart = function () {
	this.data('origTransform', this.transform().local)
	let s = this.attr('id')
	nGav0 = parseInt(s.substr(s.length - 2), 10)
	L = this.attr('id')
	nPn = parseInt(L.substr(s.length - 5, 1), 10)
}

var cpPnMoveStop = function () {
	var bb = this.getBBox()
	xf = bb.cx
	yf = bb.cy

	let d = 10 ** 6
	let xv = xf
	let yv = yf

	for (let g = nGav0; g <= nGavs; g++) {
		for (let l = 0; l <= 4; l++) {
			for (let io = 0; io <= 1; io++) {
				if (dist(xf, yf, mG[g][l][io][0], mG[g][l][io][1]) < d) {
					xv = 1 * mG[g][l][io][0]
					yv = 1 * mG[g][l][io][1]
					d = dist(xv, yv, xf, yf)
					nGav = g
					nLado = l
					nIE = io
				}
			}
		}
	}
	var s = this.attr('id')
	s = s.substr(s.length - 3)
	this.transform('t' + xv + ',' + yv)
	if (nGav0 == nGav) {
		this.attr({ fill: 'lightgray' })
	} else {
		this.attr({ fill: 'gray' })
	}
	drwPN() //Deve ficar depois do if, pois muda o valor de nGav
	showCtrlPts()
}

// FUNÇÕES DE MOVIMENTAÇÃO DOS PONTOS DE CONTROLE DO RECHAÇO
var cpRxMove = function (dx, dy) {
	this.attr({
		transform:
			this.data('origTransform') +
			(this.data('origTransform') ? 'T' : 't') +
			[dx, dy],
	})
	var bb = this.getBBox()
	xi = bb.cx
	yi = bb.cy
	let s = this.attr('id')
	s = s.substr(s.length - 3)
}

var cpRxMoveStart = function () {
	this.data('origTransform', this.transform().local)
	let s = this.attr('id')
	nGav0 = parseInt(s.substr(s.length - 2), 10)
}

var cpRxMoveStop = function () {
	var bb = this.getBBox()
	xf = bb.cx
	yf = bb.cy

	let d = 10 ** 6
	let xv = xf
	let yv = yf

	for (let g = nGav0; g <= nGavs; g++) {
		for (let l = 1; l <= 4; l++) {
			for (let io = 0; io <= 1; io++) {
				if (dist(xf, yf, mG[g][l][io][0], mG[g][l][io][1]) < d) {
					xv = 1 * mG[g][l][io][0]
					yv = 1 * mG[g][l][io][1]
					d = dist(xv, yv, xf, yf)
					nGav = g
					nLado = l
					nIE = io
				}
			}
		}
	}
	var s = this.attr('id')
	s = s.substr(s.length - 3)
	this.transform('t' + xv + ',' + yv)
	drwCham()
	if (nGav0 == nGav) {
		this.attr({ fill: 'steelblue' })
	} else {
		this.attr({ fill: 'navy' })
	}
	drwRX() //Deve ficar depois do if, pois muda o valor de nGav
	showCtrlPts()
}

// Função Pontos de Controle (Edit Mode)
function drwCtrlPts() {
	for (let g = 1; g <= nGavs; g++) {
		iGav = g
		var gIDtmp = 'G' + pad(iGav)
		// Grupo
		var gCP = draw.group()
		gCP.attr({ id: 'CP_' + gIDtmp })
		// Ponto de Rechaço
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + mG[g][0][0][0] + ',' + mG[g][0][0][1])
			.attr({
				id: 'CP_Rx_' + gIDtmp,
				fill: 'steelblue',
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
			})
			.appendTo(draw.select('#' + 'CP_' + gIDtmp))
			.drag(cpRxMove, cpRxMoveStart, cpRxMoveStop)
		// Pontos de Peneirado
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + (mG[g][0][0][0] - Larg / 5) + ',' + mG[g][0][0][1])
			.attr({
				id: 'CP_Pn1_' + gIDtmp,
				fill: 'lightgray',
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
			})
			.appendTo(draw.select('#' + 'CP_' + gIDtmp))
			.drag(cpPnMove, cpPnMoveStart, cpPnMoveStop)
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + (mG[g][0][0][0] + Larg / 5) + ',' + mG[g][0][0][1])
			.attr({
				id: 'CP_Pn2_' + gIDtmp,
				fill: 'lightgray',
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
			})
			.appendTo(draw.select('#' + 'CP_' + gIDtmp))
			.drag(cpPnMove, cpPnMoveStart, cpPnMoveStop)
	}
}

function showCtrlPts() {
	//GERAL
	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//Linha de Peneirado
		for (let L = 1; L <= 2; L++) {
			try {
				draw.select('#Pn' + L + '_' + gIDtmp).appendTo(draw)
			} catch (error) {}
		}
		//Gaveta
		try {
			draw.select('#' + gIDtmp).appendTo(draw)
		} catch (error) {}
		//Chaminé
		try {
			draw.select('#Cham_' + gIDtmp).appendTo(draw)
		} catch (error) {}
		//Linha de Rechaço
		try {
			draw.select('#' + 'Rx_' + gIDtmp).appendTo(draw)
		} catch (error) {}
	}
	//PONTOS
	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		// Pontos de Peneirado
		draw
			.select('#' + 'CP_Pn1_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(draw)
		draw
			.select('#' + 'CP_Pn2_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(draw)
		//Ponto de Rechaço
		draw
			.select('#' + 'CP_Rx_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(draw)
	}
}
function hideCtrlPts() {
	for (let j = 32; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//Ponto de Rechaço
		try {
			draw.select('#' + 'CP_Rx_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		// Ponto de Peneirado
		try {
			for (let l = 1; l <= 2; l++) {
				draw
					.select('#' + 'CP_Pn' + l + '_' + gIDtmp)
					.attr({ visibility: 'hidden' })
					.appendTo(draw)
			}
		} catch (error) {}
		//Linha de Rechaço
		try {
			draw.select('#' + 'Rx_' + gIDtmp).appendTo(draw)
		} catch (error) {}
	}
}

// Função desenhar gaveta em branco
function drwGPF(xC, yC, L, H) {
	//Borda
	var brdGav = draw
		.rect(xC - 1.25 * Larg, yC - yOff / 2, 2.5 * Larg, yOff, 5)
		.attr({
			fill: 'none',
			'fill-opacity': 0,
			stroke: 'lightgray',
			'stroke-width': 0,
		})
	brdGav.attr({ id: 'brd' + gID })
	brdGav.appendTo(draw.select('#' + gID))
	// brdGav.hover(brdHoverIN, brdHoverOUT)

	// Contorno principal
	var x1 = mP[0][1][0]
	var y1 = mP[0][1][1] //1
	var x2 = mP[0][2][0]
	var y2 = mP[0][2][1] //2
	var x3 = mP[0][3][0]
	var y3 = mP[0][3][1] //3
	var x4 = x3
	var y4 = y3 + H //4
	var x5 = mP[0][4][0]
	var y5 = mP[0][4][1] + H //5
	var x6 = x1
	var y6 = y1 + H //6
	var polygon = draw
		.polygon(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6)
		.attr({
			fill: 'white',
			stroke: 'black',
			'stroke-width': lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
	polygon.appendTo(draw.select('#' + gID))

	// Linhas internas
	xi = mP[0][4][0]
	yi = mP[0][4][1] //i
	var polygon = draw.polygon(x6, y6, x1, y1, xi, yi, x5, y5).attr({
		fill: 'white',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(draw.select('#' + gID))

	var polygon = draw.polygon(xi, yi, x3, y3, x4, y4, x5, y5).attr({
		fill: 'white',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(draw.select('#' + gID))

	//Canto 1
	var polygon = draw.polygon(mP[1].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(draw.select('#' + gID))

	//Canto 2
	var polygon = draw.polygon(mP[2].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(draw.select('#' + gID))

	//Canto 3
	var polygon = draw.polygon(mP[3].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(draw.select('#' + gID))

	//Canto 4
	var polygon = draw.polygon(mP[4].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(draw.select('#' + gID))
}

function hideGPF() {
	for (let j = 32; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		try {
			draw.select('#' + gIDtmp).attr({ visibility: 'hidden' })
			draw.select('#Cham_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		try {
			draw.select('#Rx_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		try {
			draw.select('#Pn1_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		try {
			draw.select('#Pn2_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
	}
}
function showGPF() {
	for (let j = 1; j <= nGavs; j++) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		try {
			// draw.select("#" + gIDtmp).attr({ opacity: 0 })
			draw.select('#' + gIDtmp).attr({ visibility: 'visible' })
			draw.select('#Cham_' + gIDtmp).attr({ visibility: 'visible' })
		} catch (error) {}
		try {
			draw.select('#Rx_' + gIDtmp).attr({ visibility: 'visible' })
		} catch (error) {}
		try {
			draw.select('#Pn1_' + gIDtmp).attr({ visibility: 'visible' })
		} catch (error) {}
		try {
			draw.select('#Pn2_' + gIDtmp).attr({ visibility: 'visible' })
		} catch (error) {}
	}
}

// Função desenhar chaminé
function drwCham() {
	var gID = 'G' + pad(nGav0) //ID da Gaveta
	try {
		draw.select('#Cham_' + gID).remove() //Apaga grupo existente
	} catch (error) {}
	calcMat(x0, y0 + nGav0 * yOff, Larg) //Calcula os pontos de desenho
	var gCham = draw.group() //Cria Grupo Chaminé
	gCham.attr({ id: 'Cham_' + gID }) //Atribui nome

	var polygon = draw
		.polygon(mC[nLado].slice(1, 5))
		.attr({
			fill: 'none',
			stroke: 'black',
			'stroke-width': lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(draw.select('#' + 'Cham_' + gID))
	if (nIE == 1 || nGav0 != nGav) {
		polygon.attr({ fill: 'darkred' })
	}
}

function drwRX() {
	var gID = 'G' + pad(nGav0) //ID da Gaveta
	try {
		draw.select('#Rx_' + gID).remove() //Apaga grupo existente
		draw.select('#maskRx_' + gID).remove() //Apaga grupo existente
	} catch (error) {}

	var gRx = draw.group() //Cria Grupo
	gRx.attr({ id: 'Rx_' + gID }) //Atribui nome

	let tmpIE = null
	let vLin = []
	let vLinB = []
	if (nIE == 0 && nLado != 0) {
		bRXmask = true
		if (nGav0 == nGav) {
			tmpIE = 0
			nGav = nGav0 + 1
			switch (nLado) {
				case 1:
					vLinB.push(mG[nGav0][nLado][tmpIE][0])
					vLinB.push(mG[nGav0][nLado][tmpIE][1] + yOff - 2 * Alt)
					vLinB.push(mG[nGav][nLado][tmpIE][0])
					vLinB.push(mG[nGav][nLado][tmpIE][1] - Alt)
					break
				case 2:
					vLinB.push(mG[nGav0][nLado][tmpIE][0])
					vLinB.push(mG[nGav0][nLado][tmpIE][1] + 2 * Alt)
					vLinB.push(mG[nGav][nLado][tmpIE][0])
					vLinB.push(mG[nGav][nLado][tmpIE][1] - yOff / 2)
					break
			}
		} else {
			tmpIE = 1
			bRXmask = false
		}
		vLin.push(mG[nGav0][0][0][0])
		vLin.push(mG[nGav0][0][0][1])
		vLin.push(mG[nGav0][nLado][tmpIE][0])
		vLin.push(mG[nGav0][nLado][tmpIE][1])
		vLin.push(mG[nGav][nLado][tmpIE][0])
		vLin.push(mG[nGav][nLado][tmpIE][1])
		vLin.push(mG[nGav][0][0][0])
		vLin.push(mG[nGav][0][0][1])
	}
	if (nIE == 1) {
		bRXmask = false
		tmpIE = nIE
		vLin.push(mG[nGav0][0][0][0])
		vLin.push(mG[nGav0][0][0][1])
		vLin.push(mG[nGav0][nLado][tmpIE][0])
		vLin.push(mG[nGav0][nLado][tmpIE][1])
		vLin.push(mG[nGav][nLado][tmpIE][0])
		vLin.push(mG[nGav][nLado][tmpIE][1])
	}

	if (nIE == 1 && nGav0 != nGav) {
		drwSeta(vLin[4], vLin[5], 1.2 * Alt, 2.5 * Alt, cLinRX, '#Rx_' + gID)
	}

	//Linha Branca
	try {
		var polyline = draw
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: 'white',
				strokeWidth: 4 * lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(draw.select('#Rx_' + gID))
	} catch (error) {}

	//Linha de fundo escuro
	var polyline = draw
		.polyline(vLin)
		.attr({
			fill: 'none',
			stroke: cLinPR,
			strokeWidth: 1 * lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(draw.select('#Rx_' + gID))

	//Linha principal (animada)
	var polyline = draw
		.polyline(vLin)
		.attr({
			fill: 'none',
			stroke: cLinPR,
			strokeWidth: 2 * lwid,
			strokeDasharray: strDashRX,
			strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(draw.select('#Rx_' + gID))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline.attr({ strokeDashoffset: value })
		},
		Anim2
	)

	//Caso necessite máscara
	if (bRXmask == true) {
		let wmask = []
		let bmask = []
		calcMat(x0, y0 + nGav0 * yOff, Larg)
		var gmRx = draw.group() //Cria Grupo
		gmRx.attr({ id: 'maskRx_' + gID }) //Atribui nome
		//Polígono que mostra

		wmask.push(mF[0][0][0] - 3 * Larg)
		wmask.push(mF[0][0][1] - 2 * yOff)
		wmask.push(mF[0][0][0] + 3 * Larg)
		wmask.push(mF[0][0][1] - 2 * yOff)
		wmask.push(mF[0][0][0] + 3 * Larg)
		wmask.push(mF[0][0][1] + 2 * yOff)
		wmask.push(mF[0][0][0] - 3 * Larg)
		wmask.push(mF[0][0][1] + 2 * yOff)

		//Polígono que oculta
		switch (nLado) {
			case 1: //Frente
				bmask.push(mP[1][1][0])
				bmask.push(mP[1][1][1] + Alt)
				bmask.push(mP[1][1][0])
				bmask.push(mP[1][1][1])
				bmask.push(mP[4][4][0])
				bmask.push(mP[4][4][1])
				bmask.push(mP[4][4][0])
				bmask.push(mP[4][4][1] + Alt)
				break
			case 2: //Direita
				bmask.push(mP[4][4][0])
				bmask.push(mP[4][4][1] + Alt)
				bmask.push(mP[4][4][0])
				bmask.push(mP[4][4][1])
				bmask.push(mP[3][3][0])
				bmask.push(mP[3][3][1])
				bmask.push(mP[3][3][0])
				bmask.push(mP[3][3][1] + Alt)
				break
			case 3:
				bmask.push(mP[1][4][0])
				bmask.push(mP[1][4][1] + Alt)
				bmask.push(mP[1][4][0])
				bmask.push(mP[1][4][1])
				bmask.push(mP[1][4][0] + (mP[2][3][0] - mP[1][4][0]) / 3)
				bmask.push(mP[1][4][1] + (mP[2][3][1] - mP[1][4][1]) / 3)
				bmask.push(mP[1][4][0] + (mP[2][3][0] - mP[1][4][0]) / 3 + Larg / 2)
				bmask.push(mP[1][4][1] + (mP[2][3][1] - mP[1][4][1]) / 3)
				bmask.push(mP[4][4][0])
				bmask.push(mP[4][4][1] + Alt)
				break
			case 4:
				bmask.push(mP[1][1][0] + Larg * 0.41)
				bmask.push(mP[1][1][1] + Alt)
				bmask.push(mP[1][1][0] + Larg * 0.41)
				bmask.push(mP[1][1][1])
				bmask.push(mP[2][1][0] + Larg * 0.41)
				bmask.push(mP[2][1][1])
				bmask.push(mP[3][4][0])
				bmask.push(mP[3][4][1])
				bmask.push(mP[4][4][0])
				bmask.push(mP[4][4][1] + Alt)
				break

			default:
				break
		}
		//Polígono que mostra
		var pmask = draw
			.polygon(wmask)
			.attr({
				fill: 'white',
				stroke: 'white',
				strokeWidth: lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(draw.select('#maskRx_' + gID))

		//Polígono que oculta
		var pmask = draw
			.polygon(bmask)
			.attr({
				fill: 'black',
				stroke: 'black',
				strokeWidth: lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(draw.select('#maskRx_' + gID))
		//Aplica Máscara
		gRx.attr({ mask: draw.select('#maskRx_' + gID) })
		// draw.select("#maskRx_" + gID).attr({ opacity: 0.5 })
	}
}

function drwPN() {
	var gID = 'G' + pad(nGav0) //ID da Gaveta
	try {
		draw.select('#Pn' + nPn + '_' + gID).remove()
	} catch (error) {} //Apaga grupo existente

	var gPn = draw.group() //Cria Grupo
	gPn.attr({ id: 'Pn' + nPn + '_' + gID }) //Atribui nome
	console.log('#Pn' + nPn + '_' + gID)

	let tmpIE = null
	let vLinPn = []
	let vLinPr = []
	let vLinB = []
	if (nIE == 1) {
		tmpIE = nIE
		vLinPn.push(mG[nGav0][0][0][0])
		vLinPn.push(mG[nGav0][0][0][1] + Alt)
		vLinPn.push(mG[nGav0][nLado][tmpIE][0])
		vLinPn.push(mG[nGav0][nLado][tmpIE][1] + Alt)

		vLinPr.push(mG[nGav0][nLado][tmpIE][0])
		vLinPr.push(mG[nGav0][nLado][tmpIE][1] + Alt)
		vLinPr.push(mG[nGav][nLado][tmpIE][0])
		vLinPr.push(mG[nGav][nLado][tmpIE][1] + Alt)
	}

	if (nIE == 0 && nLado != 0) {
		if (nGav0 == nGav) {
			tmpIE = 0
		} else {
			tmpIE = 1
			vLinPn.push(mG[nGav0][0][0][0])
			vLinPn.push(mG[nGav0][0][0][1] + Alt)
			vLinPn.push(mG[nGav0][nLado][tmpIE][0])
			vLinPn.push(mG[nGav0][nLado][tmpIE][1] + Alt)
			// vLinPn.push(mG[nGav][nLado][tmpIE][0])
			// vLinPn.push(mG[nGav][nLado][tmpIE][1]+Alt)

			vLinPr.push(mG[nGav0][nLado][tmpIE][0])
			vLinPr.push(mG[nGav0][nLado][tmpIE][1] + Alt)
			vLinPr.push(mG[nGav][nLado][tmpIE][0])
			vLinPr.push(mG[nGav][nLado][tmpIE][1])
			vLinPr.push(mG[nGav][0][tmpIE][0])
			vLinPr.push(mG[nGav][0][tmpIE][1])
		}
	}

	//Saída por baixo
	if (nIE == 0 && nLado == 0 && nGav0 == nGav) {
		let vBaixo = []
		calcMat(x0, y0 + nGav0 * yOff, Larg)

		vBaixo.push(mP[1][1][0])
		vBaixo.push(mP[1][1][1] + Alt)
		vBaixo.push(mP[4][4][0])
		vBaixo.push(mP[4][4][1] + Alt)
		vBaixo.push(mP[3][3][0])
		vBaixo.push(mP[3][3][1] + Alt)

		vBaixo.push(mP[3][3][0])
		vBaixo.push(mP[3][3][1] + 3 * Alt)
		vBaixo.push(mP[4][4][0])
		vBaixo.push(mP[4][4][1] + 3 * Alt)
		vBaixo.push(mP[1][1][0])
		vBaixo.push(mP[1][1][1] + 3 * Alt)

		var r = draw
			.polygon(vBaixo)
			.attr({ fill: patPn })
			.appendTo(draw.select('#Pn' + nPn + '_' + gID))
	}

	if (nIE == 1 && nGav0 != nGav) {
		drwSeta(
			vLinPr[2],
			vLinPr[3],
			1.2 * Alt,
			2.5 * Alt,
			cLinPN,
			'#Pn' + nPn + '_' + gID
		)
	}

	//Linha Branca
	try {
		var polyline = draw
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: 'white',
				strokeWidth: 4 * lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(draw.select('#Pn' + nPn + '_' + gID))
	} catch (error) {}

	//Linha principal (animada)
	var polyline1 = draw
		.polyline(vLinPn)
		.attr({
			fill: 'none',
			stroke: cLinPN,
			strokeWidth: 1.5 * lwid,
			strokeDasharray: strDashPN,
			strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(draw.select('#Pn' + nPn + '_' + gID))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline1.attr({ strokeDashoffset: value })
		},
		Anim2
	)

	//Linha de produto (animada)
	var polyline2 = draw
		.polyline(vLinPr)
		.attr({
			fill: 'none',
			stroke: cLinPN,
			strokeWidth: 1.5 * lwid,
			strokeDasharray: strDashPR,
			strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(draw.select('#Pn' + nPn + '_' + gID))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline2.attr({ strokeDashoffset: value })
		},
		Anim2
	)
}

// Função desenhar áreas de posição
function drwAreas() {
	var r = 8
	var circle = draw
		.circle(mF[1][0][0], mF[1][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 })
		.hover(FiHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
	var circle = draw
		.circle(mF[2][0][0], mF[2][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 })
		.hover(DiHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
	var circle = draw
		.circle(mF[3][0][0], mF[3][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 })
		.hover(EiHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
	var circle = draw
		.circle(mF[4][0][0], mF[4][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 })
		.hover(TiHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
	var r = 10
	var circle = draw
		.circle(mF[1][1][0], mF[1][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 })
		.hover(FeHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
	var circle = draw
		.circle(mF[2][1][0], mF[2][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 })
		.hover(DeHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
	var circle = draw
		.circle(mF[3][1][0], mF[3][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 })
		.hover(EeHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
	var circle = draw
		.circle(mF[4][1][0], mF[4][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: 0 }) //Verificar
		.hover(TeHoverIN, ladoHoverOUT)
		.appendTo(draw.select('#' + gID))
}

var sGavHover = draw.text(x0 + (Larg * wf) / 2 - 40, 250, gIDhover)
sGavHover.attr({
	'font-size': 12,
	fill: 'lightgray',
	'font-family': 'Roboto, Consolas, Calibri, Arial Narrow',
	// 'font-weight': 'bold',
})

function gHoverIN() {
	gIDhover = this.attr('id')
	// sGavHover.attr({'text': gIDhover + "" + sLado})
}

function gHoverOUT() {
	gIDhover = this.attr('id')
	sGavHover.attr({ text: '' })
}

var clkSelGav = function () {
	gID = this.attr('id')
	// Se estiver em EditMode, sai:
	if (bEditMode) {
		hideGuias()
		hideCtrlPts()
		iGavSel = null
		bEditMode = false
		// Se não:
	} else {
		showGuias()
		showCtrlPts()
		iGavSel = this.attr('id')
		bEditMode = true
	}
}

function calcCOD(nGav) {
	//Código principal da Gaveta
	//Código de usinagem
}

//Ocultar slidersDiv
function hideSlider() {
	for (let index = 1; index <= 32; index++) {
		let nGPF = pad(index)
		let sName = 'sliderGPF' + nGPF
		let slider = document.getElementById(sName)
		slider.style.display = 'none'

		sName = 'codGPF' + nGPF
		let cod = document.getElementById(sName)
		cod.style.display = 'none'

		sName = 'rngG' + nGPF
		let rng = document.getElementById(sName)
		rng.style.display = 'none'
	}
}
//Mostrar slidersDiv
function showSlider() {
	for (let index = 1; index <= nGavs; index++) {
		let nGPF = pad(index)
		let sName = 'sliderGPF' + nGPF
		let slider = document.getElementById(sName)
		slider.style.display = 'flex'

		sName = 'codGPF' + nGPF
		let cod = document.getElementById(sName)
		cod.style.display = 'block'

		let sID = 'valH' + nGPF
		let target = document.getElementById(sID)
		if (index != nGavs) {
			sName = 'rngG' + nGPF
			let rng = document.getElementById(sName)

			for (let index = 0; index < mH.length; index++) {
				if (rng.value == mH[index][0]) {
					let value = mH[index][1]
					if (mH[index][2] > 0) {
						value = ' <h5>+' + mH[index][2] + '</h5> ' + mH[index][1]
					}
					target.innerHTML = value
					break
				}
			}
			rng.style.display = 'block'
		} else {
			target.innerHTML = 32
		}
	}
}

// FUNÇÃO DESENHAR SETA PARA DESTINO
function drwSeta(x, y, w, h, clr, grp) {
	var seta = draw
		.polygon(x, y, x - w / 2, y, x, y + h, x + w / 2, y)
		.attr({
			fill: clr,
			stroke: 'white',
			'stroke-width': 0,
			'stroke-linecap': 'miter',
			'stroke-linejoin': 'miter',
		})
		.appendTo(draw.select(grp))
}

// Desenhar gavetas
// var myArray = ["F", "T", "D", "E"]
//
//
//
//
//
//
//
//
//
// INIT
for (var i = nGavs; i >= 1; i--) {
	iGav = i
	var gID = 'G' + pad(iGav)

	// Pontos
	calcMat(x0, y0 + yOff * i, Larg, i)

	// Gaveta em branco
	var gGav = draw.group()
	gGav.attr({ id: gID })
	drwGPF(x0, y0 + yOff * i, Larg, Alt, i)
	draw.select('#' + gID).hover(gHoverIN, gHoverOUT)
	draw.select('#' + gID).click(clkSelGav)

	//Áreas de posição
	drwAreas()
}
drwGuias()
drwCtrlPts()

drwSliders()
drwCOD()

nGavs = 28
rebuildGPF()
calcHtotal()
calcHtotal

//
var slidernGavs = document.getElementById('nGav-slider')
slidernGavs.addEventListener('input', function () {
	nGavs = slidernGavs.value
	let vnGav = document.getElementById('nGavs')
	vnGav.innerHTML = pad(nGavs)
	rebuildGPF()
	calcHtotal()
})

/* 











 */

function rebuildGPF() {
	//Oculta tudo
	hideGPF()
	hideGuias()
	hideCtrlPts()
	hideSlider()

	//Exibe o que precisa
	showGPF()
	showSlider()
	if (bEditMode == true) {
		showGuias()
		showCtrlPts()
	}
}

//
//
//
//
//
//

// maintitle
teste001()
function teste001() {
	// document.getElementById("maintitle").innerHTML = "Teste"
	// $("maintitle").update("Teste")
	var cn = new ActiveXObject('ADODB.Connection')
	// var strConn =
	// 	"Provider=Microsoft.Jet.OLEDB.4.0Data Source = Z:\\Publico\\Detec\\P&D\\DB\\SB_DB1.dbPersist Security Info=False"
	var strConn =
		'DRIVER=SQLite3 ODBC DriverDatabase= Z:\\Publico\\Detec\\P&D\\DB\\SB_DB1.dbLongNames=0Timeout=1000NoTXN=0SyncPragma=NORMALStepAPI=0'
	cn.Open(strConn)
}
