//* 	FORMATO DE NÚMERO "00"
function pad(num) {
	var s = '00' + num
	return s.substr(s.length - 2)
}


//*	FUNÇÃO DISTÂNCIA ENTRE DOIS PONTOS
function dist(u1, v1, u2, v2) {
	return Math.sqrt((u2 - u1) ** 2 + (v2 - v1) ** 2)
}


//*	LADO: STR TO INT
function nLadoStr2Int(sLado) {
	let nL = 0
	switch (sLado) {
		case 'F':
			nL = 1
			break
		case 'D':
			nL = 2
			break
		case 'E':
			nL = 3
			break
		case 'T':
			nL = 4
			break
		default:
			break
	}
	return nL
}
//*	LADO: INT TO STR
function nLadoInt2Str(iLado) {
	let sL = ''
	switch (iLado) {
		case 1:
			sL = 'F'
			break
		case 2:
			sL = 'D'
			break
		case 3:
			sL = 'E'
			break
		case 4:
			sL = 'T'
			break
		default:
			break
	}
	return sL
}

//*	CONV: INT TO ROMAN
function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

//*	REPLACE AT
//_ String.prototype.replaceAt = function(index, replacement) {
//_     return this.substr(0, index) + replacement + this.substr(index + replacement.length);
//_ }
function replaceAt(string, index, replacement) {
	return string.substr(0, index) + replacement + string.substr(index + replacement.length)
}

//* 	POSIÇÃO DO MOUSE
var xM = null
var yM = null


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


//* -------------- DEFINIÇÃO GERAL DA MATRIZ DE PRODUTO/RECHAÇO -------------- */
for (let g = 0; g <= nGavs; g++) {
	//* Calcula os pontos da gaveta atual
	calcMat(x0, y0 + yOff * g, Larg)
	//* Grava na matriz geral
	for (let l = 0; l <= 4; l++) {
		for (let io = 0; io <= 1; io++) {
			for (let xy = 0; xy <= 1; xy++) {
				mG[g][l][io][xy] = 1 * mF[l][io][xy]
			}
		}
	}
}


//* FUNÇÃO CÁLCULO DOS PONTOS DA GAVETA
function calcMat(xC, yC, L) {
	let xT = 0
	let yT = 0
	//* 	GAVETA EM BRANCO
	//* 	Contorno principal
	mP[0][1][0] = xC - L / 2
	mP[0][1][1] = yC + L / 2 / sk //1
	mP[0][2][0] = xC - L / 4
	mP[0][2][1] = yC - L / 2 / sk //2
	mP[0][3][0] = xC + L / 2
	mP[0][3][1] = yC - L / 2 / sk //3
	mP[0][4][0] = xC + L / 4
	mP[0][4][1] = yC + L / 2 / sk //4
	//*	Canto 1
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
	//* 	Canto 2
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
	//* 	Canto 3
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
	//* 	Canto 4
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

	//* 	 CHAMINÉ
	//* 	 1 Frente
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
	//* 	 2 Direita
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
	//* 	 3 Esquerda
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
	//* 	 4 Trás
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

	//* 	FLUXO
	//* 	Interno
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

	//* 	Externo
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


//* -------------------------------------------------------------------------- */
//*                            LIMPAR ESQUEMA (NOVO)                           */
//* -------------------------------------------------------------------------- */

function ResetSQMA() {
	
	resetMatESQ()
	resetDESV()
	resetDINF()
	resetFND()
	recalcUsed()

	//> Ponto do produto A
	try {
		objCP = drawSQMA.select('#CP_A')
		.transform('t' + (mG[1][0][0][0]) + ',' + (mG[1][0][0][1]*0.75))
	} catch (error) {}
	//> Ponto do produto B
	try {
		objCP = drawSQMA.select('#CP_B')
		.transform('t' + (mG[1][0][0][0]) + ',10') //  (mG[1][0][0][1]/3))
	} catch (error) {}
	//> Linha Ae
	try {
		drawSQMA.select('#Ae').remove() //Apaga grupo existente
		drawSQMA.select('#maskAe').remove() //Apaga grupo existente
	} catch (error) {}

	//> Linha Be
	try {
		drawSQMA.select('#Be').remove() //Apaga grupo existente
		drawSQMA.select('#maskBe').remove() //Apaga grupo existente
	} catch (error) {}
	
	//> Sel Lin
	try {
		drawSQMA.select('#circleSel1').remove() 
		drawSQMA.select('#SelLin').remove() 		// Apaga grupo existente
		drawSQMA.select('#maskSelLin').remove() // Apaga grupo existente
		drawSQMA.select('#SelCir').remove() 		// Apaga grupo existente
	} catch (error) {}

	for (let g = 1; g <= 32; g++) {
		iGav = g
		gID = 'G' + pad(iGav)
		
		//> Ponto de Rechaço
		try {objCP = drawSQMA.select('#CP_Rx_' + gID)
			.transform('t' + mG[g][0][0][0] + ',' + mG[g][0][0][1])
		} catch (error) {}
		
		//> Pontos de Peneirado
		try {objCP = drawSQMA.select('#CP_Pn1_' + gID)
			.transform('t' + (mG[g][0][0][0] - Larg / 5) + ',' + mG[g][0][0][1])
		} catch (error) {}
		try {objCP = drawSQMA.select('#CP_Pn2_' + gID)
			.transform('t' + (mG[g][0][0][0] + Larg / 5) + ',' + mG[g][0][0][1])
		} catch (error) {}
	
		//> Linha de Rechaço
		try {
			drawSQMA.select('#Rx_' + gID).remove() 			//Apaga grupo existente
			drawSQMA.select('#maskRx_' + gID).remove() 	//Apaga grupo existente
		} catch (error) {}

		//> Linhas de Peneirado
		try {
			drawSQMA.select('#Pn1_' + gID).remove()				//Apaga grupo existente
			drawSQMA.select('#maskPn1_' + gID).remove()		//Apaga grupo existente
		} catch (error) {} 
		try {
			drawSQMA.select('#Pn2_' + gID).remove()				//Apaga grupo existente
			drawSQMA.select('#maskPn2_' + gID).remove()		//Apaga grupo existente
		} catch (error) {} 
	
		//> Chaminé
		try {
			drawSQMA.select('#Cham_' + gID).remove() //Apaga grupo existente
		} catch (error) {}

	}

	propagate()
	reColor()
	nGavs = 28
	$(".slider").val(65)	
	$(".spanH").html("65")	
	$("#nGav-slider").val(nGavs)
	$("#nGavs").html(nGavs)
	calcHtotal()
	$('#z-flow-prod span').html('')
	$('#z-flow-type span').html('')
	$('#z-flow-from span').html('')
	$('#z-flow-to span').html('')

	rebuildGPF()
	calcHtotal()
}


//* -------------------------------------------------------------------------- */
//*                                ABRIR ESQUEMA                               */
//* -------------------------------------------------------------------------- */
function LoadSQMA() {
	console.log('LoadSQMA()')
	resetMatESQ()
}


//* -------------------------------------------------------------------------- */
//*                      FUNÇÕES DA MATRIZ DE CORTE/FUNDO                      */
//* -------------------------------------------------------------------------- */

function recalcUsed() {
	//* Tem usinagem
	for (let g = 1; g <= nGavs; g++) {
		mCOD1[g][1] = [0, 0, 0, 0, 0]
	}
	for (let g = 1; g <= nGavs; g++) {
		for (let tmpLin = 1; tmpLin <= 3; tmpLin++) {
			//* CP externo e com seta ()
			if (mESQ[g][tmpLin][2] == 1 && mESQ[g][tmpLin][1] > g) {		//> CP externo e com seta ()
				for (let tmpG = g; tmpG <= nGavs; tmpG++) {
					mCOD1[tmpG][1][mESQ[g][tmpLin][0]] += 1
				}
			}
		}
	}
	//* Correspondência com a matriz de fundo
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
		for (let i = 0; i <= 1; i++) {
			
			let cont = 0  //* Procura quantas gavetas mandam produto para aquele fundo
			for (let g = 1; g <= nGavs; g++) {
				for (let tmpLin = 1; tmpLin <= 3; tmpLin++) {
					if (mESQ[g][tmpLin][0] == tmpLado == 1 &&
						(mESQ[g][tmpLin][3] % 100 == i+1 || mESQ[g][tmpLin][3] % 100 == 3)) {
						cont++
					}
				}
			}
			if (cont == 0) {
				mActBTM[tmpLado][i][1] = 0
				mActBTM[tmpLado][i][2] = ''
				mActBTM[tmpLado][i][3] = ''
				mActBTM[tmpLado][i][4] = 0
				mActBTM[tmpLado][i][5] = 0
				mActBTM[tmpLado][i][6] = ''
			}
		}
	}
}