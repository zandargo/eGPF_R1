
//_ TODO	Desenhar 'Ae' e 'Be' como ctrl pnts
//TODO	'Be' precisa ser adaptável para ficar à direita ou à esquerda da queda de A
//			LINHA Be: Se Be=FouE, Esquerda	;	Se Be=TouD, Direita
//_ TODO PENEIRADO POR BAIXO DA MESMA COR DO PRODUTO A/B
//TODO 	Criar desenhos de guias que simulem o fundo do canal. (Elipses em perspectiva)
//_ TODO	Caso seja o último rechaço, desenhar seta p/ fundo, invés de linha para o centro da gav seguinte
//_ TODO Impedir os CP Pn de se alinharem nos pontos internos da gaveta
//_ TODO CP Pn se alinhando nos pontos internos: "Excluir" da conexão
//TODO 	As funções de desenhar

//TODO	O cód da última gaveta precisa ser GPF32...   (Está GPF65)





//* ------------------------- CHECAR LETRA DO PRODUTO ------------------------ */
function chkProdColor() {
	switch (mESQ[nGav0][0][1]) {
		case 'A':
			cLinPR = cLinPRa 
			cLinRX = cLinRXa
			cLinPN = cLinPNa
			patPn	 =	patPna
			break;
		case 'B':
			cLinPR = cLinPRb 
			cLinRX = cLinRXb
			cLinPN = cLinPNb
			patPn	 =	patPnb
			break;
		default:
			cLinPR = cLinPR0 
			cLinRX = cLinRX0
			cLinPN = cLinPN0
			patPn	 =	patPn0
			break;
	}
		
}

//* ---------------------- PROPAGAR INFORMAÇÕES DE FLUXO --------------------- */
function propagate() {
	
	let dest = 0
	//* DESCONECTAR PRODUTO
	
	for (let i = 2; i <= nGavs; i++) {		
		let cont = 0
		for (let j = 1; j < i; j++) {			//> Varre desde a primeira até a última
			for (let p = 1; p <= 3; p++) {				
				dest = 1 * mESQ[j][p][1]
				if (dest == i && mESQ[j][p][2] == 0) { cont++ }
			}														
		}
		
		if (cont == 0) { mESQ[i][0][1] = '' }
	}

	mESQ[1][0][1] = 'A'	//> Garantir que o produto da primeira seja sempre 'A'
	
	//*		CONECTAR PRODUTOS AOS DESTINOS
	for (let index = 1; index <= nGavs; index++) { 
		let prod = mESQ[index][0][1].toString()
		
		//> RODUTO/RECHAÇO
		let dest = 1 * mESQ[index][1][1]				//> nPara
		if (mESQ[index][1][2] == 0) {
			if (index==dest ) {
				mESQ[index+1][0][1]=prod
			} else {
				mESQ[dest][0][1]=prod
			}
		} 
		//> PENEIRADO	[DEVE PERMANECER APÓS O PRODUTO/RECHAÇO]
		for (let p = 2; p <= 3; p++) {				
			let dest = 1 * mESQ[index][p][1]				//> nPara
			if (mESQ[index][p][2] == 0 && index!=dest) {mESQ[dest][0][1]=prod}
			//> 		INCLUIR PENEIRADO POR BAIXO NA PROPAGAÇÃO
			if (index == dest && mESQ[index][p][0] == 0) {mESQ[index + 1][0][1] = prod}
		}														
	}
}
	


//* ----------------------- RECOLORIR LINHAS DO ESQUEMA ---------------------- */
function reColor() {
	for (let index = 1; index <= nGavs; index++) { 
		switch (mESQ[index][0][1]) {
		case 'A':
			cLinPR = cLinPRa 
			cLinRX = cLinRXa
			cLinPN = cLinPNa
			patPn	 =	patPna
			break;
		case 'B':
			cLinPR = cLinPRb 
			cLinRX = cLinRXb
			cLinPN = cLinPNb
			patPn	 =	patPnb
			break;
		default:
			cLinPR = cLinPR0 
			cLinRX = cLinRX0
			cLinPN = cLinPN0
			patPn	 =	patPn0
			break;
		}
		var gIDtmp = 'G' + pad(index)
		try { draw.select('#' + 'linRx0_' + gIDtmp).attr({ stroke: cLinRX }) } catch (error) {}
		try { draw.select('#' + 'linRx1_' + gIDtmp).attr({ stroke: cLinRX }) } catch (error) {}
		try { draw.select('#' + 'arwRx_'  + gIDtmp).attr({ fill  : cLinRX }) } catch (error) {}
		
		try { draw.select('#' + 'linPn1_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { draw.select('#' + 'linPn2_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { draw.select('#' + 'linPr1_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { draw.select('#' + 'linPr2_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { draw.select('#' + 'arwPn1_' + gIDtmp).attr({ fill  : cLinPN }) } catch (error) {}
		try { draw.select('#' + 'arwPn2_' + gIDtmp).attr({ fill  : cLinPN }) } catch (error) {}
		try { draw.select('#' + 'PnD1_' 	 + gIDtmp).attr({ fill  : patPn  }) } catch (error) {}
		try { draw.select('#' + 'PnD2_' 	 + gIDtmp).attr({ fill  : patPn  }) } catch (error) {}

		
		try { draw.select('#' + 'CP_Rx_'  + gIDtmp).attr({ fill: cLinRX }) } catch (error) {}
		try { draw.select('#' + 'CP_Pn1_' + gIDtmp).attr({ fill: cLinPN }) } catch (error) {}
		try { draw.select('#' + 'CP_Pn2_' + gIDtmp).attr({ fill: cLinPN }) } catch (error) {}

	}
	//animatePnD()		//! Acelera a animação. Descobrir motivo
}


//* -------------------------------------------------------------------------- */
//*                               CREATE SLIDERS                               */
//* -------------------------------------------------------------------------- */

function drwSliders() {
	for (let index = 1; index <= nGavs; index++) {
		let nGPF = pad(index)

		//* DIV CONTAINER
		var div = document.createElement('div')
		div.id = 'sliderGPF' + nGPF
		div.className = 'slidecontainer'
		document.getElementById('divHCtrl').appendChild(div)

		//* DRAWER NUMBER
		var h2 = document.createElement('h2')
		h2.innerHTML = nGPF
		div.appendChild(h2)

		//* CREATE SLIDER
		var input = document.createElement('input')
		input.type = 'range'
		input.id = 'rngG' + nGPF
		input.className = 'slider'
		input.min = 65
		input.max = 145
		input.step = 10
		input.value = 65 // Terá que mudar dependendo do valor da matriz
		div.appendChild(input)

		//* HEIGHT VALUE: CREATE AND CHANGE
		var span = document.createElement('span')
		span.id = 'valH' + nGPF
		span.innerHTML = input.value
		div.appendChild(span)

		input.addEventListener(
			'input',
			function () {
				let sID = 'valH' + nGPF
				let target = document.getElementById(sID)
				let j = 0
				let n = this.id.substring(this.id.length - 2)
				for (let index = 0; index < mH.length; index++) {
					if (this.value == mH[index][0]) {
						let value = mH[index][1]
						if (mH[index][2] > 0) {
							value = ' <h5>+' + mH[index][2] + '</h5> ' + mH[index][1]
						}
						target.innerHTML = value
						j = parseInt(n, 10)
						if (j<nGavs) {
							mESQ[j][0][0] = parseInt(this.value, 10)
							//$('#codGPF' + n).html('GPF' + mH[index][1])
						} else {
							mESQ[j][0][0] = 32
							//$('#codGPF' + n).html('GPF' + 32)
						}
						break
					}
				}
				// j = 1 * index
				calcHtotal()
				rebuildGPF()
				// $('#codGPF' + n).html('GPF' + parseH(mESQ[j][0][0]))
			},
			true
		)
	}
}

//* -------------------------------------------------------------------------- */
//*                      CALCULAR ALTURA TOTAL DAS GAVETAS                     */
//* -------------------------------------------------------------------------- */

function calcHtotal() {
	for (let index = 1; index < nGavs; index++) {
		let nGPF = pad(index)
		let source = document.getElementById('rngG' + nGPF)
		let j = 1 * index
		mESQ[j][0][0] = parseInt(source.value, 10)
		$('#codGPF' + pad(index)).html(calcCOD(index))
		$('#matGPF' + pad(index))
			.html(mESQ[index][0] + '<br>' + mESQ[index][1] + '<br>' + mESQ[index][2] + '<br>' + mESQ[index][3])
			// .css({ 'font-size': '9pt' })
	}
	mESQ[nGavs][0][0] = 32
	$('#codGPF' + pad(nGavs)).html(calcCOD(nGavs))

	hTotal = 0
	for (let index = 1; index <= nGavs; index++) {
		hTotal = hTotal + 1 * parseInt(mESQ[index][0][0])
		if (mESQ[index][0][0]=== NaN)  { $('#z-flow-clog').html(index) } 
	}
	let target = document.getElementById('hTotal')
	target.innerHTML = '&nbsp' + hTotal + 'mm'

	$('#divESQ').css({ 'height': 220 + 64 * nGavs + "px" })
	// $('#z-flow-clog').html('calcHtotal()=' + hTotal)
	// console.log(mESQ)
}

function parseH(H) {
	for (let index = 0; index < mH.length; index++) {
		if (H == mH[index][0]) {
			return mH[index][1]
			//break
		}
	}
}


function calcCOD(nGav) {
	//* Código principal da Gaveta

	let n = 0
	if (mESQ[nGav][1][2] == 1) { n += mESQ[nGav][1][0] * 100 }
	if (mESQ[nGav][2][2] == 1) { n += mESQ[nGav][2][0] * 10 	} 
	if (mESQ[nGav][3][2] == 1) { n += mESQ[nGav][3][0]			} 

	console.log(n)
	// $('#z-flow-clog').html(n)
	let sCod = 'GPF' + parseH(mESQ[nGav][0][0])
	for (let index = 0; index < mCOD0.length; index++) {
		if (n == mCOD0[index][0]) {
			sCod += mCOD0[index][1]
			break
		}
	}
	//* Código de usinagem

	//* FIM
	return sCod
}

//* -------------------------------------------------------------------------- */
//*                             CÓDIGO DAS GAVETAS                             */
//* -------------------------------------------------------------------------- */


function drwCOD() {
	for (let index = 1; index <= nGavs; index++) {
		let nGPF = pad(index)

		//* Div Container
		var div = document.createElement('div')
		div.id = 'div-codGPF' + nGPF
		div.className = 'codcontainer'
		document.getElementById('divCOD').appendChild(div)

		//* Texto com CÓD da gaveta
		let h2 = document.createElement('h2')
		h2.id = 'codGPF' + nGPF
		h2.className = 'codValue'
		h2.innerHTML = 'GPF65'
		div.appendChild(h2)

		//* Div Matriz Esquema
		div = document.createElement('div')
		div.id = 'div-matGPF' + nGPF
		div.className = 'matcontainer'
		document.getElementById('divMAT').appendChild(div)
		h2 = document.createElement('h2')
		h2.id = 'matGPF' + nGPF
		h2.className = 'matValue'
		// h2.innerHTML = 'GPF65'
		div.appendChild(h2)

	}
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

//* 	FORMATO DE NÚMERO "00"
function pad(num) {
	var s = '00' + num
	return s.substr(s.length - 2)
}

//*	FUNÇÃO DISTÂNCIA ENTRE DOIS PONTOS
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


/* 









*/



//* -------------- DEFINIÇÃO GERAL DA MATRIZ DE PRODUTO/RECHAÇO -------------- */
for (let g = 0; g <= nGavs; g++) {
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

//+ TODO Adicionar desenhos das saídas de fundo em perspectiva




//* -------------------------------------------------------------------------- */
//*                          Função Guias (Edit Mode)                          */
//* -------------------------------------------------------------------------- */

function drwGuias() {
	let swid = 0.5 * lwid
	calcMat(x0, y0, Larg)

	var gGui = draw.group()
	gGui.attr({ id: 'Guia_G00' })
	var ellipse = draw
			.ellipse(mF[0][1][0], mF[0][1][1] -2 -Alt/2, Alt , Alt/2)
			.attr({ fill: 'gray', stroke: 'gray', strokeWidth: swid })
			.appendTo(draw.select('#' + 'Guia_G00'))


	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//* 	Pontos
		calcMat(x0, y0 + yOff * j, Larg)
		var gGui = draw.group()
		gGui.attr({ id: 'Guia_' + gIDtmp })
		//*	Linhas
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
		//*	Círculos
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
	for (let j = nGavs; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//_ draw.select('#' + "Guia_" + gIDtmp).remove()
		draw.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 1 })
		// paper.append('#' + 'Guia_' + gIDtmp)
	}
}

function hideGuias() {
	for (let j = 32; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		try {
			draw.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 0 })
		} catch (error) {}
	}
}



//* -------------------------------------------------------------------------- */
//*         FUNÇÕES DE MOVIMENTAÇÃO DOS PONTOS DE CONTROLE DO PENEIRADO        */
//* -------------------------------------------------------------------------- */

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
	let s = this.attr('id')
	s = s.substr(s.length - 3)
}


var cpPnMoveStart = function () {
	this.data('origTransform', this.transform().local)
	let s = this.attr('id')
	nGav0 = parseInt(s.substr(s.length - 2), 10)
	L = this.attr('id')
	nPn = parseInt(L.substr(s.length - 5, 1), 10)
	if (nGav!=0 && nGav!=nGav0) { mESQ[(1*mESQ[nGav0][1+nPn][1])][0][1] = '' } 
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
					d = dist(xv, yv, xf, yf)	//> DISTANCE BETWEEN POINTS
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
	//_ drwCham()

	mESQ[nGav0][1+nPn][0] = nLado		//> nLado
	mESQ[nGav0][1+nPn][1] = nGav		//> nPara
	mESQ[nGav0][1+nPn][2] = nIE		//> nIE

	$('#z-flow-prod span').html(mESQ[nGav][0][1])
	$('#z-flow-type span').html('Peneirado ' + nPn)
	$('#z-flow-from span').html('G' + pad(nGav0)+'.'+nLado)
	$('#z-flow-to span').html('G' + pad(mESQ[nGav0][1+nPn][1])+'.'+nLado)
	
	
	drwPN() 	//! ==================================> Deve ficar depois do if, pois muda o valor de nGav
	showCtrlPts()
	
	propagate()
	reColor()
	calcHtotal()
}

//* -------------------------------------------------------------------------- */
//*          FUNÇÕES DE MOVIMENTAÇÃO DOS PONTOS DE CONTROLE DO RECHAÇO         */
//* -------------------------------------------------------------------------- */

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
	nGav = mESQ[nGav0][1][1]
	if (nGav != nGav0) { mESQ[(mESQ[nGav0][1][1])][0][1] = '' } 
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

	mESQ[nGav0][1][0] = nLado	//> nLado
	mESQ[nGav0][1][1] = nGav	//> nPara
	mESQ[nGav0][1][2] = nIE		//> nIE

	$('#z-flow-prod span').html(mESQ[nGav][0][1])
	$('#z-flow-type span').html('Rechaço')
	$('#z-flow-from span').html('G' + pad(nGav0)+'.'+nLado)
	$('#z-flow-to span').html('G' + pad(mESQ[nGav0][1][1])+'.'+nLado)
	
	propagate()
	reColor()

	drwRX() //! ==================================> Deve ficar depois do if, pois muda o valor de nGav
	showCtrlPts()
	calcHtotal()
}

//* -------------------------------------------------------------------------- */
//*          FUNÇÕES DE MOVIMENTAÇÃO DOS PONTOS DE CONTROLE DO PRODUTO         */
//* -------------------------------------------------------------------------- */
var cpPrMove = function (dx, dy) {
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
	s = s.substr(s.length - 1)
}



var cpPrMoveStart = function () {
	this.data('origTransform', this.transform().local)
	let s = this.attr('id')
	s = s.substr(s.length - 1)
	nGav0 = 0
	switch (s) {
		case 'A':
			nAB = 1
			break;
		case 'B':
			nAB = 2
			break;
		default:
			break;
		}
	nGav = mESQ[nGav0][nAB][1]
	if (nGav != nGav0) { mESQ[(mESQ[nGav0][nAB][1])][0][1] = '' } 
	$('#z-flow-prod span').html(s = s.substr(s.length - 1))
}


var cpPrMoveStop = function () {
	var bb = this.getBBox()
	xf = bb.cx
	yf = bb.cy

	let d = 10 ** 6
	let xv = xf
	let yv = yf

	for (let g = 0; g <= nGavs; g++) {
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
	s = s.substr(s.length - 1)
	this.transform('t' + xv + ',' + yv)

	mESQ[nGav0][nAB][0] = nLado	//> nLado
	mESQ[nGav0][nAB][1] = nGav		//> nPara
	mESQ[nGav0][nAB][2] = 1			//> nIE [Sempre externo]



	$('#z-flow-prod span').html(mESQ[nGav][0][1])
	$('#z-flow-type span').html('Produto')
	$('#z-flow-from span').html('G' + pad(nGav0)+'.'+nLado)
	$('#z-flow-to span').html('G' + pad(mESQ[nGav0][1][1])+'.'+nLado)
	
	// propagate()
	// reColor()

	//drwRX() //! ==================================> Deve ficar depois do if, pois muda o valor de nGav
	showCtrlPts()
	calcHtotal()
}

//* -------------------------------------------------------------------------- */
//*                   DESENHAR PONTOS DE CONTROLE (Edit Mode)                  */
//* -------------------------------------------------------------------------- */
function drwCtrlPts() {
	//* Grupo 0
	var gCP = draw.group()
	gCP.attr({ id: 'CP_G00'})
	//* Ponto do produto A
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + (mG[1][0][0][0]) + ',' + (mG[1][0][0][1]*0.75))
			.attr({
				id: 'CP_A',
				fill: cLinPRa,
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
				opacity: cpAlpha,
			})
			.appendTo(draw.select('#' + 'CP_G00'))
			.drag(cpPrMove, cpPrMoveStart, cpPrMoveStop)
	//* Ponto do produto B
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + (mG[1][0][0][0]) + ',10') //  (mG[1][0][0][1]/3))
			.attr({
				id: 'CP_B',
				fill: cLinPRb,
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
				opacity: cpAlpha,
			})
			.appendTo(draw.select('#' + 'CP_G00'))
			.drag(cpPrMove, cpPrMoveStart, cpPrMoveStop)

	
	for (let g = 1; g <= nGavs; g++) {
		iGav = g
		var gIDtmp = 'G' + pad(iGav)
		//* Grupo
		var gCP = draw.group()
		gCP.attr({ id: 'CP_' + gIDtmp })
		//* Ponto de Rechaço
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + mG[g][0][0][0] + ',' + mG[g][0][0][1])
			.attr({
				id: 'CP_Rx_' + gIDtmp,
				fill: cCtrlPntRxi,
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
				opacity: cpAlpha,
			})
			.appendTo(draw.select('#' + 'CP_' + gIDtmp))
			.drag(cpRxMove, cpRxMoveStart, cpRxMoveStop)
		//* Pontos de Peneirado
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + (mG[g][0][0][0] - Larg / 5) + ',' + mG[g][0][0][1])
			.attr({
				id: 'CP_Pn1_' + gIDtmp,
				fill: cCtrlPntPni,
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
				opacity: cpAlpha,
			})
			.appendTo(draw.select('#' + 'CP_' + gIDtmp))
			.drag(cpPnMove, cpPnMoveStart, cpPnMoveStop)
		var ellipse = draw
			.ellipse(0, 0, Alt, Alt)
			.transform('t' + (mG[g][0][0][0] + Larg / 5) + ',' + mG[g][0][0][1])
			.attr({
				id: 'CP_Pn2_' + gIDtmp,
				fill: cCtrlPntPni,
				stroke: 'none',
				strokeWidth: 0,
				visibility: 'hidden',
				opacity: cpAlpha,
			})
			.appendTo(draw.select('#' + 'CP_' + gIDtmp))
			.drag(cpPnMove, cpPnMoveStart, cpPnMoveStop)
	}
}

function showCtrlPts() {

	
	//*	GERAL [GRUPOS]
		try {
			draw
				.select('#CP_G00')
				.appendTo(draw)
		} catch (error) {	}


	for (let j = nGavs; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//*	Linha de Peneirado
		for (let L = 1; L <= 2; L++) {
			try {
				draw.select('#Pn' + L + '_' + gIDtmp).appendTo(draw)
			} catch (error) {}
		}
		//*	Gaveta
		try {
			draw.select('#' + gIDtmp).appendTo(draw)
		} catch (error) {}
		//*	Chaminé
		try {
			draw.select('#Cham_' + gIDtmp).appendTo(draw)
		} catch (error) {}
		//*	Linha de Rechaço
		try {
			draw.select('#' + 'Rx_' + gIDtmp).appendTo(draw)
		} catch (error) {}
	}
	


	//*	PONTOS
	draw.select('#CP_A').attr({ visibility: 'visible' }).appendTo(draw)
	draw.select('#CP_B').attr({ visibility: 'visible' }).appendTo(draw)

	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//* Pontos de Peneirado
		draw
			.select('#' + 'CP_Pn1_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(draw)
		draw
			.select('#' + 'CP_Pn2_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(draw)
		//*	Ponto de Rechaço
		draw
			.select('#' + 'CP_Rx_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(draw)
	}
}


function hideCtrlPts() {
	//* 	Pontos AB
	try {draw.select('#CP_A').attr({ visibility: 'hidden' })
		} catch (error) {}
	try {draw.select('#CP_B').attr({ visibility: 'hidden' })
		} catch (error) {}
	
	for (let j = 32; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//* Ponto de Rechaço
		try {
			draw.select('#' + 'CP_Rx_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		//*  Ponto de Peneirado
		try {
			for (let l = 1; l <= 2; l++) {
				draw
					.select('#' + 'CP_Pn' + l + '_' + gIDtmp)
					.attr({ visibility: 'hidden' })
					.appendTo(draw)
			}
		} catch (error) {}
		//* Linha de Rechaço
		try {
			draw.select('#' + 'Rx_' + gIDtmp).appendTo(draw)
		} catch (error) {}
	}
}


//* -------------------------------------------------------------------------- */
//*                      Função desenhar gaveta em branco                      */
//* -------------------------------------------------------------------------- */

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
	//_ brdGav.hover(brdHoverIN, brdHoverOUT)

	//* Contorno principal
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

	//* Linhas internas
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
	for (let j = 32; j >= 0; j--) {
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
	// for (let j = 0; j <= nGavs; j++) {
	for (let j = nGavs; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		try {
			// draw.select("#" + gIDtmp).attr({ opacity: 0 })
			draw.select('#' + gIDtmp).attr({ visibility: 'visible' }).appendTo(draw)
			draw.select('#Cham_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(draw)
		} catch (error) {}
		try {
			draw.select('#Rx_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(draw)
		} catch (error) {}
		try {
			draw.select('#Pn1_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(draw)
		} catch (error) {}
		try {
			draw.select('#Pn2_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(draw)
		} catch (error) { }
		// try {
		// 	draw.select('#Guia_' + gIDtmp).appendTo(draw)
		// } catch (error) { }
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
		// polygon.attr({ fill: 'darkred' })
		polygon.attr({ fill: cCham })
	}
}


//* ------------------------ DESENHAR LINHA DE RECHAÇO ----------------------- */
//	[[x0, 10],[x0,y0 + yOff]]

function drwRX0() {
	//*	DEFINE G00 - GAVETA 0: ENTRADAS DE PRODUTO NO CANAL (Ai, Ae, Be)
	var gID = 'G' + pad(0) //ID da Gaveta
	try {
		draw.select('#Rx_' + gID).remove() //Apaga grupo existente
		draw.select('#maskRx_' + gID).remove() //Apaga grupo existente
	} catch (error) {}

	var gRx = draw.group() //Cria Grupo
	gRx.attr({ id: 'Rx_' + gID }) //Atribui nome

	//*	'Ai' - SEMPRE PRESENTE
	//Linha de fundo escuro
	var polyline = draw
		.polyline([[x0, 50],[x0,y0 + yOff]])
		.attr({
			fill: 'none',
			stroke: cLinPRa,
			strokeWidth: 1 * lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(draw.select('#Rx_' + gID))

	//Linha principal (animada)
	var polyline = draw
		.polyline([[x0, 50],[x0,y0 + yOff]])
		.attr({
			fill: 'none',
			stroke: cLinPRa,
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
	//* Caso o ctrl point seja interno (mesmo se o Rx for externo)
	if (nIE == 0 && nLado != 0) {
		bRXmask = true
		if (nGav0 == nGav) {		//* Rechaço pela chaminé
			tmpIE = 0
			nGav = nGav0 + 1

			switch (nLado) {		//* Pela frente ou pela direita
				case 1:
					cLinBG = 'white'
					vLinB.push(mG[nGav0][nLado][tmpIE][0])
					vLinB.push(mG[nGav0][nLado][tmpIE][1] + yOff - 2 * Alt)
					vLinB.push(mG[nGav][nLado][tmpIE][0])
					vLinB.push(mG[nGav][nLado][tmpIE][1] - Alt)
					break
				case 2:
					cLinBG = bgcolor
					vLinB.push(mG[nGav0][nLado][tmpIE][0])
					vLinB.push(mG[nGav0][nLado][tmpIE][1] + 2 * Alt)
					vLinB.push(mG[nGav][nLado][tmpIE][0])
					vLinB.push(mG[nGav][nLado][tmpIE][1] - yOff / 2)
					break
			}
		} else {
			tmpIE = 1
			bRXmask = false
			cLinBG = bgcolor
			
			//* Linha branca de cima
			vLinB.push(mG[nGav0][nLado][0][0] + (mG[nGav0][nLado][1][0] - mG[nGav0][nLado][0][0]) * 0.32)
			vLinB.push(mG[nGav0][nLado][0][1] + (mG[nGav0][nLado][1][1] - mG[nGav0][nLado][0][1]) * 0.32)
			vLinB.push(mG[nGav0][nLado][tmpIE][0])
			vLinB.push(mG[nGav0][nLado][tmpIE][1])
			//* Linha branca vertical
			vLinB.push(mG[nGav0][nLado][tmpIE][0])
			vLinB.push(mG[nGav0][nLado][tmpIE][1])
			vLinB.push(mG[nGav][nLado][tmpIE][0])
			vLinB.push(mG[nGav][nLado][tmpIE][1])
			//* Linha branca de baixo
			vLinB.push(mG[nGav][nLado][0][0] + (mG[nGav][nLado][1][0] - mG[nGav][nLado][0][0]) * 0.32)
			vLinB.push(mG[nGav][nLado][0][1] + (mG[nGav][nLado][1][1] - mG[nGav][nLado][0][1]) * 0.32)
			vLinB.push(mG[nGav][nLado][tmpIE][0])
			vLinB.push(mG[nGav][nLado][tmpIE][1])

		}
		vLin.push(mG[nGav0][0][0][0])
		vLin.push(mG[nGav0][0][0][1])
		vLin.push(mG[nGav0][nLado][tmpIE][0])
		vLin.push(mG[nGav0][nLado][tmpIE][1])
		vLin.push(mG[nGav][nLado][tmpIE][0])
		vLin.push(mG[nGav][nLado][tmpIE][1])
		if (nGav0!=nGavs) {		//>	Caso não seja a última gaveta:
			vLin.push(mG[nGav][0][0][0])
			vLin.push(mG[nGav][0][0][1])
		}
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
		//_ $('#z-flow-clog').html(vLin.join(", "))
	}
	
	if (nIE == 1 && nGav0 != nGav) {
		cLinBG = bgcolor
		//* Linha branca de cima
		vLinB.push(mG[nGav0][nLado][0][0] + (mG[nGav0][nLado][1][0] - mG[nGav0][nLado][0][0]) * 0.32)
		vLinB.push(mG[nGav0][nLado][0][1] + (mG[nGav0][nLado][1][1] - mG[nGav0][nLado][0][1]) * 0.32)
		vLinB.push(mG[nGav0][nLado][tmpIE][0])
		vLinB.push(mG[nGav0][nLado][tmpIE][1])
		//* Linha branca vertical
		vLinB.push(mG[nGav0][nLado][tmpIE][0])
		vLinB.push(mG[nGav0][nLado][tmpIE][1])
		vLinB.push(mG[nGav][nLado][tmpIE][0])
		vLinB.push(mG[nGav][nLado][tmpIE][1])
	}
	

//* ----------------------------- DESENHAR LINHAS ---------------------------- */
	chkProdColor()
	//Linha Branca
	try {
		var polyline = draw
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: cLinBG,
				// stroke: 'red',
				strokeWidth: wLinBG * lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(draw.select('#Rx_' + gID))
	} catch (error) {}

	//Linha de fundo escuro
	var polyline = draw
		.polyline(vLin)
		.attr({
			id: 'linRx0_' + gID,
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
			id: 'linRx1_' + gID,
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

	//*Desenhar seta caso necessite
	if ((nIE == 1 && nGav0 != nGav)  || nGav0==nGavs) {
		drwSeta(vLin[4], vLin[5], 1.2 * Alt, 2.5 * Alt, cLinRX, '#Rx_' + gID, 'arwRx_' + gID)		
	}


}


//* ----------------------- Desenhar linha de Peneirado ---------------------- */

function drwPN() {
	cLinBG = bgcolor
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

		vLinB.push(vLinPn[0])
		vLinB.push(vLinPn[1])
		vLinB.push(vLinPn[2])
		vLinB.push(vLinPn[3])
		vLinB.push(vLinPr[0])
		vLinB.push(vLinPr[1])
		vLinB.push(vLinPr[2])
		vLinB.push(vLinPr[3])


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

			vLinB.push(vLinPn[0])
			vLinB.push(vLinPn[1])
			vLinB.push(vLinPn[2])
			vLinB.push(vLinPn[3])
			vLinB.push(vLinPr[0])
			vLinB.push(vLinPr[1])
			vLinB.push(vLinPr[2])
			vLinB.push(vLinPr[3])
			vLinB.push(mG[nGav][nLado][tmpIE][0] + (mG[nGav][0][tmpIE][0]-mG[nGav][nLado][tmpIE][0])*0.45)
			vLinB.push(mG[nGav][nLado][tmpIE][1] + (mG[nGav][0][tmpIE][1]-mG[nGav][nLado][tmpIE][1])*0.45)
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
			.attr({ id: 'PnD' + nPn + '_' + gID, fill: patPn })
			.appendTo(draw.select('#Pn' + nPn + '_' + gID))
	}

	if (nIE == 1 && nGav0 != nGav) {
		
		
	}

//* ----------------------------- DESENHAR LINHAS ---------------------------- */
	chkProdColor()
	//Linha Branca
	try {
		var polyline = draw
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: cLinBG,
				strokeWidth: wLinBG * lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(draw.select('#Pn' + nPn + '_' + gID))
	} catch (error) {}

	//Linha principal (animada)
	var polyline1 = draw
		.polyline(vLinPn)
		.attr({
			id: 'linPn'+nPn+'_' + gID,
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
			id: 'linPr'+nPn+'_' + gID,
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

	//* Desenhar seta caso necessite
	if (nIE == 1 && nGav0 != nGav) {
		drwSeta(vLinPr[2], vLinPr[3], 1.2 * Alt, 2.5 * Alt, cLinPN, '#Pn' + nPn + '_' + gID, 'arwPn'+nPn+'_' + gID)
	}
}


//* -------------------- Função desenhar áreas de posição -------------------- */
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



//* -------------------- FUNÇÃO DESENHAR SETA PARA DESTINO ------------------- */
function drwSeta(x, y, w, h, clr, grp, id) {
	var seta = draw
		.polygon(x, y, x - w / 2, y, x, y + h, x + w / 2, y)
		.attr({
			id,
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

//* -------------------------------------------------------------------------- */
//*                                 RECONSTRUIR                                */
//* -------------------------------------------------------------------------- */
function rebuildGPF() {
	//Oculta tudo
	hideGPF()
	hideGuias()
	hideCtrlPts()
	hideSlider()

	//Exibe o que precisa
	showSlider()
	showGPF()
	if (bEditMode == true) {
		showGuias()
		showCtrlPts()
	}
}


//* -------------------------------------------------------------------------- */
//*                                    INIT                                    */
//* -------------------------------------------------------------------------- */
// $(document).ready( function () {
	
//	[[x0, 10],[x0,y0 + yOff]]

//* 	QUEDA DO PRODUTO 'A'





//*	ITERAÇÕES
	for (var i = nGavs; i >= 1; i--) {
		iGav = i
		var gID = 'G' + pad(iGav)
		
		//* --------- POINTS ---------- */
		calcMat(x0, y0 + yOff * i, Larg, i)
		
		//* --------- BLANK ---------- */
		var gGav = draw.group()
		gGav.attr({ id: gID })
		drwGPF(x0, y0 + yOff * i, Larg, Alt, i)
		draw.select('#' + gID).hover(gHoverIN, gHoverOUT)
		draw.select('#' + gID).click(clkSelGav)
		
		//* --------- POSITION ---------- */
		drwAreas()
	}
	
	drwGuias()
	drwCtrlPts()
	
	
	drwSliders()
	drwCOD()
	nGavs = 28
	rebuildGPF()
	calcHtotal()


	drwRX0()
	propagate()
	reColor()

	var slidernGavs = document.getElementById('nGav-slider')
	slidernGavs.addEventListener('input', function () {
		nGavs = slidernGavs.value
		let vnGav = document.getElementById('nGavs')
		vnGav.innerHTML = pad(nGavs)
		rebuildGPF()
		calcHtotal()
	})
	
	
	
	
// });
	
	
	
	
	
