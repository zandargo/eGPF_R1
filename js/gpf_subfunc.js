//* 	FORMATO DE NÚMERO "00"
function pad(num) {
	var s = '00' + num
	return s.substr(s.length - 2)
}


//*	FUNÇÃO DISTÂNCIA ENTRE DOIS PONTOS
function dist(u1, v1, u2, v2) {
	return Math.sqrt((u2 - u1) ** 2 + (v2 - v1) ** 2)
}

//*	CONVERTER H TOTAL EM H GAVETA
function parseH(H) {
	for (let index = 0; index < mH.length; index++) {
		if (H == mH[index][0]) {
			return mH[index][1]
		}
	}
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


//*	HOVER ZONES
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


//* ---------------------- CÁLCULO DOS PONTOS DE GAVETA ---------------------- */
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


//* ---------------------- CÁLCULO DOS CÓDIGO DE GAVETA ---------------------- */
function calcCOD(nGav) {
	//* Código principal da Gaveta

	let n = 0
	n += mESQ[nGav][1][0] * 100	//> Rx: nPara
	if (mESQ[nGav][2][2] == 1 || mESQ[nGav][2][1] != nGav) { n += mESQ[nGav][2][0] * 10 	} //> Pn1: nPara
	if (mESQ[nGav][3][2] == 1 || mESQ[nGav][3][1] != nGav) { n += mESQ[nGav][3][0]			} //> Pn2: nPara

	let sCod = 'GPF' + parseH(mESQ[nGav][0][0])
	for (let index = 0; index < mCOD0.length; index++) {
		if (n == mCOD0[index][0]) {
			sCod += mCOD0[index][1]
			break
		}
	}
	//* Código de usinagem
	let u = 0
	mCOD1[nGav][0]=[0, 0, 0, 0, 0]
	u += mESQ[nGav][1][0] * 10000
	mCOD1[nGav][0][0] = mESQ[nGav][1][0]

	let parc = 3 
	//*	1 - Quando o Rx da de baixo sai pelo canal
				//> LEMBRETE: Pode haver corte parcial
				//> LEMBRETE: Corte parc SEMPRE indica DV
	try {
		//> Rx FND e nGav < nGavs
		//> (Rx externo retornando não gera parcial)
		if (mESQ[nGav][1][0] > 0 && mESQ[nGav + 1][1][2] == 1 && nGav < nGavs) {	
			if (aDESV[mESQ[nGav + 1][1][0]][0] == 1 &&
				aDESV[mESQ[nGav + 1][1][0]][1] == 1) {			//> Se DesV act E selec (L1 e L2 selec)
				for (let i = 0; i <= 1; i++) {
					if (mActBTM[mESQ[nGav + 1][1][0]][i][4] == nGav + 1 &&
						mActBTM[mESQ[nGav + 1][1][0]][i][4] > mActBTM[mESQ[nGav + 1][1][0]][Math.abs(i-1)][4]) {
						parc = i+1
					} 
				}
			}	
			u += parc * 10 ** (4 - mESQ[nGav + 1][1][0])
			mCOD1[nGav][0][(mESQ[nGav + 1][1][0])] = parc
		}
	} catch (error) {console.log('ERRO EM calcCOD(nGav); nGav=' + nGav)}
	
	//*	2 - Quando algum Rx||Pn de cima chega na de baixo
				//> LEMBRETE: Nesse caso nunca há corte parcial
	parc = 3 
	for (let i = 1; i <= nGav; i++) {
		for (let j = 1; j <= 3; j++) {
			if (mESQ[i][j][1]==(nGav+1) && mESQ[i][j][2]==0) {	//> nPara=GPFabaixo e nIE=interno 
				u += parc * 10 ** (4 - mESQ[i][j][0])
				mCOD1[nGav][0][(mESQ[i][j][0])] = parc
			}
		}
	}
	
	//*	3 - Quando algum Pr chega na de baixo (Ae || Be)
	//> LEMBRETE: Nesse caso nunca há corte parcial
	parc = 3 
	for (let j = 1; j <= 2; j++) {
		if (mESQ[0][j][1]==(nGav+1)) {	//> nPara=GPFabaixo 
			u += parc * 10 ** (4 - mESQ[0][j][0])
			mCOD1[nGav][0][(mESQ[0][j][0])] = parc
		}
	}


	//*	Procura na tabela de corte
	for (let index = 0; index < mCorte.length; index++) {
		if (u == mCorte[index][0]) {
			sCod += mCorte[index][1]
			break
		}
	}

	//* FIM
	//_ mESQ[nGav][0][2] = u
	return sCod
}



//* -------------------------------------------------------------------------- */
//*                            LIMPAR ESQUEMA (NOVO)                           */
//* -------------------------------------------------------------------------- */

function ResetSQMA() {
	
	// todo	Verificar pq precisa de 2 cliques
	nGavs = 28
	resetFND()
	resetDESV()
	resetDINF()
	resetMatESQ()

	recalcUsed()
	calcHtotal()
	rebuildGPF()
	

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
	
	$(".slider").val(65)	
	$(".spanH").html("65")	
	$("#nGav-slider").val(nGavs)
	$("#nGavs").html(nGavs)
	//_calcHtotal()
	$('#z-flow-prod span').html('')
	$('#z-flow-type span').html('')
	$('#z-flow-from span').html('')
	$('#z-flow-to span').html('')

	// calcHtotal()
	// rebuildGPF()
}


//* -------------------------------------------------------------------------- */
//*                                ABRIR ESQUEMA                               */
//* -------------------------------------------------------------------------- */
function LoadSQMA() {
	console.log('LoadSQMA()')
	//* Teste
	nSQMA = 2188
	nRev = 0

	LoadSQMAdata().then(() => {
		calcHtotal()
		recalcProd()
		recalcUsed()
		recalcDV()
		recalcDINF()
	}).then(() => {
		rebuildGPF()
		recolorBTM()
	})

}
	
async function LoadSQMAdata() {
	ResetSQMA()

	//*	Reg_SQMA
	sSQL = `SELECT * FROM Reg_SQMA WHERE Key LIKE '%${nSQMA}${nRev}%'`
	var resReg_SQMA = await
	db.get(sSQL, [], (err, row) => {
		if (err) { throw err }
		else {
			nGavs = parseInt(row.nGav, 10)
			
			//*	Ai
			if (row.Abert1 != '') {
				//_console.log(`nLado Ai: ${row.Abert1} (${nLadoStr2Int(row.Abert1)})`)
				nGav0 = 1
				nGav = 1
				nLado = nLadoStr2Int(row.Abert1)
				nPara = 1
				nIE = 0
				mESQ[1][1][0] = nLado	//> nLado
				mESQ[1][1][1] = nPara									//> nPara
				mESQ[1][1][2] = nIE									//> nIE
				objCP = drawSQMA
					.select('#CP_Rx_G01')
					.transform('t' + mG[1][nLado][nIE][0] + ',' + mG[1][nLado][nIE][1])
				drwCham()
				propagate()
				reColor()
				drwRX()
			}
			//*	Ae
			if (row.Abert2 != '') {
				//_console.log(`nLado Ai: ${row.Abert1} (${nLadoStr2Int(row.Abert1)})`)
				nGav0 = 0
				nLado = nLadoStr2Int(row.Abert2)
				nPara = row.Para2
				nPara = parseInt(nPara.substr(1), 10)
				nIE = 1
				nGav = nPara
				sCPtype = 'Pr'
				//_ console.log(`Ae: nLado ${row.Abert2} (${nLadoStr2Int(row.Abert2)})`)
				//_ console.log(`Ae: nPara ${nPara}`)
				mESQ[0][1][0] = nLado	//> nLado
				mESQ[0][1][1] = nPara	//> nPara
				mESQ[0][1][2] = nIE		//> nIE
				objCP = drawSQMA
					.select('#CP_A')
					.transform('t' + mG[nPara][nLado][0][0] + ',' + mG[nPara][nLado][0][1])
				propagate()
				reColor()
				//_ recalcUsed()
				//_ recalcProd()
				drwAe()
			}
			//*	Be
			if (row.Abert3 != '') {
				//_console.log(`nLado Ai: ${row.Abert1} (${nLadoStr2Int(row.Abert1)})`)
				nGav0 = 0
				nLado = nLadoStr2Int(row.Abert3)
				nPara = row.Para3
				nPara = parseInt(nPara.substr(1), 10)
				nIE = 1
				nGav = nPara
				sCPtype = 'Pr'
				//_ console.log(`Ae: nLado ${row.Abert2} (${nLadoStr2Int(row.Abert2)})`)
				//_ console.log(`Ae: nPara ${nPara}`)
				mESQ[0][2][0] = nLado	//> nLado
				mESQ[0][2][1] = nPara	//> nPara
				mESQ[0][2][2] = nIE		//> nIE
				objCP = drawSQMA
					.select('#CP_B')
					.transform('t' + mG[nPara][nLado][0][0] + ',' + mG[nPara][nLado][0][1])
				propagate()
				reColor()
				//_ recalcUsed()
				//_ recalcProd()
				drwBe()
			}

			//*	Desvios
			if (row.F1 == row.F2 && row.F1!='' && row.F2!='') { aDESV[1] = [1, 0, 0] }
			if (row.D1 == row.D2 && row.D1!='' && row.D2!='') { aDESV[2] = [1, 0, 0] }
			if (row.E1 == row.E2 && row.E1!='' && row.E2!='') { aDESV[3] = [1, 0, 0] }
			if (row.T1 == row.T2 && row.T1!='' && row.T2!='') { aDESV[4] = [1, 0, 0] }

			calcHtotal()
			rebuildGPF()
			$('#nGavs').html(`${pad(nGavs)}`)
			$('#nGav-slider').val(nGavs)
		}
	})
	

	//*	Reg_SQMA_GPF
	var data = [{},]
	sSQL = `SELECT * FROM Reg_SQMA_GPF WHERE Key LIKE '${nSQMA}${nRev}%'`
	var resReg_SQMA_GPFall = await
	db.all(sSQL, [], (err, rows) => {
		if (err) { throw err }
		else {
			rows.forEach((row)=>{
				data.push(row)
    		})
			//  console.log(data)
			//  console.log(data[2].Key)
		 }
	})


	var resReg_SQMA_GPF = await
	db.each(sSQL, [], (err, row) => {
		if (err) { throw err }
		else {
			let hGav = parseInt(row.HGav, 10)
			let g = parseInt(row.NoGAV, 10)
			//_console.log(`Carregando G${pad(g)}`)
			mESQ[g][0][0] = hGav
			let sCod = row.CodGav
			nGav0 = g
			//* Rx
			if (g >= 2 && g<=nGavs) {	//> A partir da G02
				nLado = row.RxPos
				nLado = nLadoStr2Int(nLado.charAt(0))
				nPara = row.RxPara
				nIE = 0
				nFND = 0
				//> Traduzir metodologia Excel --> Electron
				if (row.RxPos.charAt(1) == 'E') {
					if (nPara.charAt(0) != 'G') {		//> Se manda para o fundo
						nIE = 1
						nGav = g + 1 //! Verificar 
						if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {
							nFND = 100*nLado+3
						} else {
							nFND = 100*nLado + parseInt(nPara.charAt(1),10)
						}
						nPara = nGav
						sAB = ''
						console.log(`data[${g}][${row.RxPos.charAt(0)+'1'}] = ${data[g][row.RxPos.charAt(0)+'1']}`)
						
						mActBTM[nLado][tmp12][1] = 1		//> Set selec
						mActBTM[nLado][tmp12][2] = 'Rx'	//> Set Prod
						mActBTM[nLado][tmp12][3] = sAB		//> Set A|B
						mActBTM[nLado][tmp12][4] = g		//> Set Orig
						mActBTM[nLado][tmp12][5] = nIE	//> Set IE
					} else {									//> Se manda para G##
						nGav = parseInt(nPara.substr(1), 10)
						if (data[nGav].Pr1Pos != `${row.RxPos.charAt(0)}E` &&	//>Se dest não recebe RxExt
						data[nGav].Pr2Pos != `${row.RxPos.charAt(0)}E`) {
							nIE = 1
							if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
								nFND = 100*nLado+3
							} else {
								nFND = 100*nLado + parseInt(data[nGav].RxPara.substr(1),10)
							}
							nGav++
							nPara = nGav
						} else {
							nPara = nGav
						}
					}

				} else { nPara = g; nGav = nPara }
				mESQ[g][1][0] = nLado
				mESQ[g][1][1] = nPara
				mESQ[g][1][2] = nIE
				mESQ[g][1][3] = nFND

				objCP = drawSQMA
					.select(`#CP_Rx_G${pad(g)}`)
					.transform('t' + mG[nPara][nLado][nIE][0] + ',' + mG[nPara][nLado][nIE][1])
				drwCham()
				propagate()
				reColor()
				drwRX()
			}
			
			
			//*	Pn1
			if (row.Pn1Pos != '') {
				nPn = 1
				nLado = row.Pn1Pos
				nLado = nLadoStr2Int(nLado.charAt(0))
				nPara = row.Pn1Para
				
				if(nPara!='') {
					nFND = 0
					//> Traduzir metodologia Excel --> Electron
					//_ if (row.Pn1Pos.charAt(1) == 'E') {
						if (nPara.charAt(0) != 'G') {		//> Se manda para o fundo
							nIE = 1
							nGav = g //_ + 1
							//_ if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {
							//_ 	nFND = 100*nLado+3
							//_ } else {
							//_ 	nFND = 100*nLado + parseInt(nPara.charAt(1),10)
							//_ }
							nPara = nGav
						} else {									//> Se manda para G##
							nGav = parseInt(nPara.substr(1), 10)
							if (data[nGav].Pr1Pos != `${row.Pn1Pos.charAt(0)}E` &&	//>Se dest não recebe Ext
							data[nGav].Pr2Pos != `${row.Pn1Pos.charAt(0)}E`) {
								//_console.log(`   nGav = ${nGav}`)
								nIE = 1
								if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
									nFND = 100*nLado+3
								} else {
									nFND = 100*nLado + parseInt(data[nGav].Pn1Para.substr(1),10)
								}
								// nGav++
								nPara = nGav
							} else {
								nIE = 0
								nPara = nGav
							}
						}
	
					//_ } else { nPara = g; nGav = nPara }
				} else {
					nIE = 1
					nPara = g
					nGav = nPara
					
				}
					mESQ[g][2][0] = nLado
					mESQ[g][2][1] = nPara
					mESQ[g][2][2] = nIE
					mESQ[g][2][3] = nFND
					
				objCP = drawSQMA
					.select(`#CP_Pn1_G${pad(g)}`)
					.transform('t' + mG[nPara][nLado][nIE][0] + ',' + mG[nPara][nLado][nIE][1])
				propagate()
				reColor()
				drwPN()
			}
			
			
			//*	Pn2
			if (row.Pn2Pos != '') {
				nPn = 2
				nLado = row.Pn2Pos
				nLado = nLadoStr2Int(nLado.charAt(0))
				nPara = row.Pn2Para
				
				if(nPara!='') {
					nFND = 0
					//> Traduzir metodologia Excel --> Electron
					//_ if (row.Pn1Pos.charAt(1) == 'E') {
						if (nPara.charAt(0) != 'G') {		//> Se manda para o fundo
							nIE = 1
							nGav = g + 1
							if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {
								nFND = 100*nLado+3
							} else {
								nFND = 100*nLado + parseInt(nPara.charAt(1),10)
							}
							nPara = nGav
						} else {									//> Se manda para G##
							nGav = parseInt(nPara.substr(1), 10)
							if (data[nGav].Pr1Pos != `${row.Pn2Pos.charAt(0)}E` &&	//>Se dest não recebe Ext
							data[nGav].Pr2Pos != `${row.Pn2Pos.charAt(0)}E`) {
								//_console.log(`   nGav = ${nGav}`)
								nIE = 1
								if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
									nFND = 100*nLado+3
								} else {
									nFND = 100*nLado + parseInt(data[nGav].Pn2Para.substr(1),10)
								}
								nGav++
								nPara = nGav
							} else {
								nIE = 0
								nPara = nGav
							}
						}
	
					//_ } else { nPara = g; nGav = nPara }
				} else {
					nIE = 1
					nPara = g
					nGav = nPara
					
				}
					mESQ[g][3][0] = nLado
					mESQ[g][3][1] = nPara
					mESQ[g][3][2] = nIE
					mESQ[g][3][3] = nFND
					
				objCP = drawSQMA
					.select(`#CP_Pn2_G${pad(g)}`)
					.transform('t' + mG[nPara][nLado][nIE][0] + ',' + mG[nPara][nLado][nIE][1])
				propagate()
				reColor()
				drwPN()
			}
			


			$(`#codGPF${pad(g)}`).html(sCod)								//> Código da gaveta
			$(`#codGPF${pad(g)}`).css('opacity', 1)
			$(`#rngG${pad(g)}`).val(hGav)									//> Slider
			for (let index = 0; index < mH.length; index++) {		//> Txt Altura
				if (hGav == mH[index][0]) {
					let value = mH[index][1]
					if (mH[index][2] > 0) {
						value = ' <h5>+' + mH[index][2] + '</h5> ' + mH[index][1]
					}
					$(`#valH${pad(g)}`).html(value)
					break
				}
			}

		}
	})

}



//* -------------------------------------------------------------------------- */
//*                               SALVAR ESQUEMA                               */
//* -------------------------------------------------------------------------- */
function SaveSQMA() {
	console.log('SaveSQMA()')
	//_ resetMatESQ()
}

function SaveAsSQMA() {
	console.log('SaveAsSQMA()')
	//_ resetMatESQ()
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