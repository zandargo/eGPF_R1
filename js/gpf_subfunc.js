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
		case 'B':
			nL = 0
			break
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
		case 0:
			sL = 'B'
			break
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


//* -------------------- CALCULAR ALTURA TOTAL DAS GAVETAS ------------------- */
async function calcHtotal() {
	console.log('calcHtotal(): start')
	//* ÚLTIMA GAVETA
	mESQ[nGavs][0][0] = 32
	hTotal = 0
	for (let g = 1; g <= nGavs; g++) {
		hTotal += mESQ[g][0][0]
		//_if (mESQ[index][0][0]=== NaN)  { $('#z-flow-clog').html(index) } 
	}
	console.log('calcHtotal(): end')
	return 1
}

//* ------------------------- CHECAR LETRA DO PRODUTO ------------------------ */
async function chkProdColor() {
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
	return 1
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
	//> Rx FND e nGav < nGavs
	//> (Rx externo retornando não gera parcial)
	if(nGav < nGavs) {
		if (mESQ[nGav][1][0] > 0 && mESQ[nGav + 1][1][2] == 1) {	
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
	}
	
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
//*                     LOG DAS INFORMAÇÕES DE RECONSTRUÇÃO                    */
//* -------------------------------------------------------------------------- */

async function logMatESQ() {
	console.log('logMatESQ(): start')
	var file = fs.createWriteStream(`./logs/m${Date.now()}.txt`)
	file.on('error', function (err) { /* error handling */ })
	file.write( Date(Date.now()) + '\n' + '\n'+'mESQ - Matriz Esquema'+ '\n')
	
	let cont
	cont = 0
	mESQ.forEach(function (v) {
		file.write(pad(cont) + ' -    ' + v.join('   ').split(',').join('	') + '\n')
		cont++
	})
	file.write('\n' + '\n' + 'mActBTM - Matriz de Fundo'+ '\n')
	mActBTM.forEach(function (v) { file.write(v.join('   ') + '\n') })
	
	file.write('\n' + '\n' + 'aDESV - Desvios Verticais' + '\n')
	aDESV.forEach(function (v) { file.write(v.join('   ') + '\n') })
	
	file.write('\n' + '\n' + 'aDINF - Desvios Inferiores' + '\n')
	aDINF.forEach(function (v) { file.write(v.join('   ') + '\n') })
	
	
	file.end()
	console.log('logMatESQ(): end')
	return 1
}



//* -------------------------------------------------------------------------- */
//*                            LIMPAR ESQUEMA (NOVO)                           */
//* -------------------------------------------------------------------------- */

async function ResetSQMA() {
	
	// todo	Verificar pq precisa de 2 cliques
	nGavs = 28
	var res_resetFND 		= await resetFND()
	var res_resetDESV 	= await resetDESV()
	var res_resetDINF 	= await resetDINF()
	var res_resetMatESQ 	= await resetMatESQ()
	var res_recalcUsed   = await recalcUsed()
	var res_calcHtotal   = await calcHtotal()
	var res_rebuildGPF   = await rebuildGPF()
	var res_recolorBTM   = await recolorBTM()
	

	//> Ponto do produto A
		drawSQMA.select('#CP_A') ? 
		objCP = drawSQMA.select('#CP_A')
		.transform('t' + (mG[1][0][0][0]) + ',' + (mG[1][0][0][1]*0.75)) : false
	//> Ponto do produto B
		drawSQMA.select('#CP_B') ?
		objCP = drawSQMA.select('#CP_B')
		.transform('t' + (mG[1][0][0][0]) + ',10') : false //  (mG[1][0][0][1]/3))
	
		//> Linha Ae
		drawSQMA.select('#Ae') ?
		drawSQMA.select('#Ae').remove() : false
		drawSQMA.select('#maskAe') ?
		drawSQMA.select('#maskAe').remove() : false

	//> Linha Be
		drawSQMA.select('#Be') ?
		drawSQMA.select('#Be').remove() : false
		drawSQMA.select('#maskBe') ?
		drawSQMA.select('#maskBe').remove() : false
	
	//> Sel Lin
		drawSQMA.select('#circleSel1') ?
			drawSQMA.select('#circleSel1').remove() : false
		drawSQMA.select('#SelLin') ?
			drawSQMA.select('#SelLin').remove() : false
		drawSQMA.select('#maskSelLin') ?
			drawSQMA.select('#maskSelLin').remove() : false
		drawSQMA.select('#SelCir') ?
			drawSQMA.select('#SelCir').remove() : false

	for (let g = 1; g <= 32; g++) {
		iGav = g
		gID = 'G' + pad(iGav)
		
		//> Ponto de Rechaço
		drawSQMA.select('#CP_Rx_' + gID) ?
			objCP = drawSQMA.select('#CP_Rx_' + gID)
			.transform('t' + mG[g][0][0][0] + ',' + mG[g][0][0][1]) : false
		
		//> Pontos de Peneirado
		drawSQMA.select('#CP_Pn1_' + gID) ?
			objCP = drawSQMA.select('#CP_Pn1_' + gID)
			.transform('t' + (mG[g][0][0][0] - Larg / 5) + ',' + mG[g][0][0][1]) : false

		drawSQMA.select('#CP_Pn2_' + gID) ?
			objCP = drawSQMA.select('#CP_Pn2_' + gID)
			.transform('t' + (mG[g][0][0][0] + Larg / 5) + ',' + mG[g][0][0][1]) : false
	
		//> Linha de Rechaço
		drawSQMA.select('#Rx_' + gID) ?
			drawSQMA.select('#Rx_' + gID).remove() : false
		
		drawSQMA.select('#maskRx_' + gID) ?
			drawSQMA.select('#maskRx_' + gID).remove() : false

		//> Linhas de Peneirado
		drawSQMA.select('#Pn1_' + gID) ?
			drawSQMA.select('#Pn1_' + gID).remove() : false
			
		drawSQMA.select('#maskPn1_' + gID) ?
			drawSQMA.select('#maskPn1_' + gID).remove() : false
		
		drawSQMA.select('#Pn2_' + gID) ?
			drawSQMA.select('#Pn2_' + gID).remove() : false
		
		drawSQMA.select('#maskPn2_' + gID) ?
			drawSQMA.select('#maskPn2_' + gID).remove() : false
		
	
		//> Chaminé
		drawSQMA.select('#Cham_' + gID) ?
			drawSQMA.select('#Cham_' + gID).remove() : false

	}

	$(".slider").val(65)	
	$(".spanH").html("65")	
	$("#nGav-slider").val(nGavs)
	$("#nGavs").html(nGavs)
	$('#z-flow-prod span').html('')
	$('#z-flow-type span').html('')
	$('#z-flow-from span').html('')
	$('#z-flow-to span').html('')
	return 1
}


//* -------------------------------------------------------------------------- */
//*                                ABRIR ESQUEMA                               */
//* -------------------------------------------------------------------------- */

async function LoadSQMA() {
	console.log('LoadSQMA()')
	const res_LoadSQMAdata = await LoadSQMAdata()
	const res_calcHtotal   = await calcHtotal  ()
	const res_recalcProd   = await recalcProd  ()
	const res_recalcUsed   = await recalcUsed  ()
	const res_recalcDV     = await recalcDV    ()
	const res_recalcDINF   = await recalcDINF  ()
	const res_recolorBTM   = await recolorBTM  ()
	const res_rebuildGPF   = await rebuildGPF  ()
	// const res_logMatESQ    = await logMatESQ   ()
	return 1
}





//* -------------------------------------------------------------------------- */
//*                               SALVAR ESQUEMA                               */
//* -------------------------------------------------------------------------- */
function SaveSQMA() {
	console.log('SaveSQMA()')
}

function SaveAsSQMA() {
	console.log('SaveAsSQMA()')
	//_ resetMatESQ()
}




//* -------------------------------------------------------------------------- */
//*                      FUNÇÕES DA MATRIZ DE CORTE/FUNDO                      */
//* -------------------------------------------------------------------------- */

async function recalcUsed() {
	console.log('recalcUsed(): start')
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
	console.log('recalcUsed(): end')
	return 1
}