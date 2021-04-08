

//* ------------------------ CALCULAR PONTOS DO FUNDO ------------------------ */
function calcmFND() {
	//*	GERAL
	mFND[0][0][0] = xcFND - wFND/2
	mFND[0][0][1] = ycFND + wFND/2
	mFND[0][1][0] = xcFND - wFND/2
	mFND[0][1][1] = ycFND - wFND/2
	mFND[0][2][0] = xcFND + wFND/2
	mFND[0][2][1] = ycFND - wFND/2
	mFND[0][3][0] = xcFND + wFND/2
	mFND[0][3][1] = ycFND + wFND/2
	//*	F1
	mFND[1][0][0] = xcFND - wFND/2
	mFND[1][0][1] = ycFND + wFND/2
	mFND[1][1][0] = xcFND - wFNDs/2
	mFND[1][1][1] = ycFND + wFNDs/2
	mFND[1][2][0] = xcFND + 0
	mFND[1][2][1] = ycFND + wFNDs/2
	mFND[1][3][0] = xcFND + 0
	mFND[1][3][1] = ycFND + wFND/2
	//*	F2
	mFND[2][0][0] = xcFND + 0
	mFND[2][0][1] = ycFND + wFND/2
	mFND[2][1][0] = xcFND + 0
	mFND[2][1][1] = ycFND + wFNDs/2
	mFND[2][2][0] = xcFND + wFNDs/2
	mFND[2][2][1] = ycFND + wFNDs/2
	mFND[2][3][0] = xcFND + wFND/2
	mFND[2][3][1] = ycFND + wFND/2
	//*	D1
	mFND[3][0][0] = xcFND + wFNDs/2
	mFND[3][0][1] = ycFND + wFNDs/2
	mFND[3][1][0] = xcFND + wFNDs/2
	mFND[3][1][1] = ycFND + 0
	mFND[3][2][0] = xcFND + wFND/2
	mFND[3][2][1] = ycFND + 0
	mFND[3][3][0] = xcFND + wFND/2
	mFND[3][3][1] = ycFND + wFND/2
	//*	D2
	mFND[4][0][0] = xcFND + wFNDs/2
	mFND[4][0][1] = ycFND + 0
	mFND[4][1][0] = xcFND + wFNDs/2
	mFND[4][1][1] = ycFND - wFNDs/2
	mFND[4][2][0] = xcFND + wFND/2
	mFND[4][2][1] = ycFND - wFND/2
	mFND[4][3][0] = xcFND + wFND/2
	mFND[4][3][1] = ycFND + 0
	//*	E1
	mFND[5][0][0] = xcFND - wFND/2
	mFND[5][0][1] = ycFND + wFND/2
	mFND[5][1][0] = xcFND - wFND/2
	mFND[5][1][1] = ycFND + 0
	mFND[5][2][0] = xcFND - wFNDs/2
	mFND[5][2][1] = ycFND + 0
	mFND[5][3][0] = xcFND - wFNDs/2
	mFND[5][3][1] = ycFND + wFNDs/2
	//*	E2
	mFND[6][0][0] = xcFND - wFND/2
	mFND[6][0][1] = ycFND + 0
	mFND[6][1][0] = xcFND - wFND/2
	mFND[6][1][1] = ycFND - wFND/2
	mFND[6][2][0] = xcFND - wFNDs/2
	mFND[6][2][1] = ycFND - wFNDs/2
	mFND[6][3][0] = xcFND - wFNDs/2
	mFND[6][3][1] = ycFND + 0
	//*	T1
	mFND[7][0][0] = xcFND - wFNDs/2
	mFND[7][0][1] = ycFND - wFNDs/2
	mFND[7][1][0] = xcFND - wFND/2
	mFND[7][1][1] = ycFND - wFND/2
	mFND[7][2][0] = xcFND + 0
	mFND[7][2][1] = ycFND - wFND/2
	mFND[7][3][0] = xcFND + 0
	mFND[7][3][1] = ycFND - wFNDs/2
	//*	T2
	mFND[8][0][0] = xcFND + 0
	mFND[8][0][1] = ycFND - wFNDs/2
	mFND[8][1][0] = xcFND + 0
	mFND[8][1][1] = ycFND - wFND/2
	mFND[8][2][0] = xcFND + wFND/2
	mFND[8][2][1] = ycFND - wFND/2
	mFND[8][3][0] = xcFND + wFNDs/2
	mFND[8][3][1] = ycFND - wFNDs/2
	
	//*	PORTA
	
	mFND[9][0][0] = xcPorta - wFND/2 - 2*offCH
	mFND[9][0][1] = ycPorta + hPorta/2
	mFND[9][1][0] = xcPorta - wFND/2 - 2*offCH
	mFND[9][1][1] = ycPorta - hPorta/2
	mFND[9][2][0] = xcPorta + wFND/2 + 2*offCH
	mFND[9][2][1] = ycPorta - hPorta/2
	mFND[9][3][0] = xcPorta + wFND/2 + 2*offCH
	mFND[9][3][1] = ycPorta + hPorta/2
	
	//*	Fi
	mFND[10][0][0] = xcFND - wFND/2
	mFND[10][0][1] = ycFND + wFND/2 + offCH
	mFND[10][1][0] = xcFND - wFND/2
	mFND[10][1][1] = ycFND + wFND/2 
	mFND[10][2][0] = xcFND + wFND/2
	mFND[10][2][1] = ycFND + wFND/2
	mFND[10][3][0] = xcFND + wFND/2
	mFND[10][3][1] = ycFND + wFND/2 + offCH
	//*	Fe
	mFND[11][0][0] = xcFND - wFND/2
	mFND[11][0][1] = ycFND + wFND/2 + 2*offCH
	mFND[11][1][0] = xcFND - wFND/2
	mFND[11][1][1] = ycFND + wFND/2 + offCH 
	mFND[11][2][0] = xcFND + wFND/2
	mFND[11][2][1] = ycFND + wFND/2 + offCH
	mFND[11][3][0] = xcFND + wFND/2
	mFND[11][3][1] = ycFND + wFND/2 + 2*offCH
	//*	Di
	mFND[12][0][0] = xcFND + wFND/2
	mFND[12][0][1] = ycFND + wFND/2
	mFND[12][1][0] = xcFND + wFND/2
	mFND[12][1][1] = ycFND - wFND/2
	mFND[12][2][0] = xcFND + wFND/2 + offCH
	mFND[12][2][1] = ycFND - wFND/2
	mFND[12][3][0] = xcFND + wFND/2 + offCH
	mFND[12][3][1] = ycFND + wFND/2
	//*	De
	mFND[13][0][0] = xcFND + wFND/2 + offCH
	mFND[13][0][1] = ycFND + wFND/2
	mFND[13][1][0] = xcFND + wFND/2 + offCH
	mFND[13][1][1] = ycFND - wFND/2
	mFND[13][2][0] = xcFND + wFND/2 + 2*offCH
	mFND[13][2][1] = ycFND - wFND/2
	mFND[13][3][0] = xcFND + wFND/2 + 2*offCH
	mFND[13][3][1] = ycFND + wFND/2
	//*	Ei
	mFND[14][0][0] = xcFND - wFND/2
	mFND[14][0][1] = ycFND + wFND/2
	mFND[14][1][0] = xcFND - wFND/2
	mFND[14][1][1] = ycFND - wFND/2
	mFND[14][2][0] = xcFND - wFND/2 - offCH
	mFND[14][2][1] = ycFND - wFND/2
	mFND[14][3][0] = xcFND - wFND/2 - offCH
	mFND[14][3][1] = ycFND + wFND/2
	//*	Ee
	mFND[15][0][0] = xcFND - wFND/2 - offCH
	mFND[15][0][1] = ycFND + wFND/2
	mFND[15][1][0] = xcFND - wFND/2 - offCH
	mFND[15][1][1] = ycFND - wFND/2
	mFND[15][2][0] = xcFND - wFND/2 - 2*offCH
	mFND[15][2][1] = ycFND - wFND/2
	mFND[15][3][0] = xcFND - wFND/2 - 2*offCH
	mFND[15][3][1] = ycFND + wFND/2
	//*	Ti
	mFND[16][0][0] = xcFND - wFND/2
	mFND[16][0][1] = ycFND - wFND/2 - offCH
	mFND[16][1][0] = xcFND - wFND/2
	mFND[16][1][1] = ycFND - wFND/2 
	mFND[16][2][0] = xcFND + wFND/2
	mFND[16][2][1] = ycFND - wFND/2
	mFND[16][3][0] = xcFND + wFND/2
	mFND[16][3][1] = ycFND - wFND/2 - offCH
	//*	Te
	mFND[17][0][0] = xcFND - wFND/2
	mFND[17][0][1] = ycFND - wFND/2 - 2*offCH
	mFND[17][1][0] = xcFND - wFND/2
	mFND[17][1][1] = ycFND - wFND/2 - offCH 
	mFND[17][2][0] = xcFND + wFND/2
	mFND[17][2][1] = ycFND - wFND/2 - offCH
	mFND[17][3][0] = xcFND + wFND/2
	mFND[17][3][1] = ycFND - wFND/2 - 2*offCH


	
}


//* ----------------------------- DESENHAR FUNDO ----------------------------- */

function drwBTM() {
	//* 	TESTE
	// var circle = drawFND
	// 	.circle(xcFND, ycFND, 4)
	// 	.attr({
	// 			fill: 'grey',
	// 		})



	//*	INÍCIO
	

	calcmFND()
	let mSai = ['PORTA','F1','F2','D1','D2','E1','E2','T1','T2']
	let mDut = ['','Fi','Fe','Di','De','Ei','Ee','Ti','Te']
	
	var polygon = drawFND								//> PORTA
		.polygon(mFND[9])
		.attr({
			// radius: '5px',
			fill: 'none',
			stroke: $('#divCOD').css('color'),
			'stroke-width': '1px',
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			opacity: 0.5,
			// filter: fndBlur02,
		})
	
	var text = drawFND									//> TEXTO DA PORTA
		.text(xcPorta, ycPorta+3, 'PORTA')
		.attr({
			fill: $('#divCOD').css('color'),
			'font-size': "16pt",
			'font-weight': 500,
			'dominant-baseline': 'middle',
			'text-anchor': 'middle',
			opacity: 0.8,
		})
	
	for (let f = 1; f <= 8; f++) {					//> SAÍDAS DO CANAL (F1~T2)
		var polygon = drawFND
		.polygon(mFND[f])
		.attr({
			id: 'FND_'+mSai[f],
			fill: cLinRX0,
			// stroke: bgcolor,
			// stroke: Snap.hsl(200, 15, 90),
			stroke: cFNDbg,
			'stroke-width': 5*lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			opacity: 0.25,
		})
	}

	for (let f = 10; f <= 17; f++) {					//> DUTOS DO CANAL
		var polygon = drawFND
		.polygon(mFND[f])
		.attr({
			id: 'FND_'+mDut[f],
			fill: $('#divCOD').css('color'),
			// stroke: bgcolor,
			// stroke: Snap.hsl(200, 15, 90),
			stroke: cFNDbg,
			'stroke-width': 2*lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			opacity: 0.1,
		})
	}

	}
drwBTM()


//* ---------------------------- RECOLORIR SAÍDAS ---------------------------- */
recolorBTM()
function recolorBTM() {


	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
		if (mCOD1[nGavs][1][tmpLado] > 0) {		//> [1] :  Array de duto usado
			mActBTM[tmpLado][0][0]=1
			drawFND.select("#FND_"+nLadoInt2Str(tmpLado)+"1").attr({opacity: oFND1})
			mActBTM[tmpLado][1][0]=1
			drawFND.select("#FND_"+nLadoInt2Str(tmpLado)+"2").attr({opacity: oFND1})
		} else {
			mActBTM[tmpLado][0][0]=0
			drawFND.select("#FND_" + nLadoInt2Str(tmpLado) + "1").attr({ opacity: oFND0 })
			mActBTM[tmpLado][1][0]=0
			drawFND.select("#FND_"+nLadoInt2Str(tmpLado)+"2").attr({opacity: oFND0})
		}

		
		
		
	}


}


//* ---------------------------- CLICAR NAS SAÍDAS --------------------------- */
function clickBTM(sSaida) {
	
}