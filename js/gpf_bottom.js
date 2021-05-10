

//* ------------------------ CALCULAR PONTOS DO FUNDO ------------------------ */
async function calcmFND() {
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
	mFND[3][0][1] = ycFND + 0
	mFND[3][1][0] = xcFND + wFNDs/2
	mFND[3][1][1] = ycFND - wFNDs/2
	mFND[3][2][0] = xcFND + wFND/2
	mFND[3][2][1] = ycFND - wFND/2
	mFND[3][3][0] = xcFND + wFND/2
	mFND[3][3][1] = ycFND + 0
	//*	D2
	mFND[4][0][0] = xcFND + wFNDs/2
	mFND[4][0][1] = ycFND + wFNDs/2
	mFND[4][1][0] = xcFND + wFNDs/2
	mFND[4][1][1] = ycFND + 0
	mFND[4][2][0] = xcFND + wFND/2
	mFND[4][2][1] = ycFND + 0
	mFND[4][3][0] = xcFND + wFND/2
	mFND[4][3][1] = ycFND + wFND/2
	//*	E1
	mFND[5][0][0] = xcFND - wFND/2
	mFND[5][0][1] = ycFND + 0
	mFND[5][1][0] = xcFND - wFND/2
	mFND[5][1][1] = ycFND - wFND/2
	mFND[5][2][0] = xcFND - wFNDs/2
	mFND[5][2][1] = ycFND - wFNDs/2
	mFND[5][3][0] = xcFND - wFNDs/2
	mFND[5][3][1] = ycFND + 0
	//*	E2
	mFND[6][0][0] = xcFND - wFND/2
	mFND[6][0][1] = ycFND + wFND/2
	mFND[6][1][0] = xcFND - wFND/2
	mFND[6][1][1] = ycFND + 0
	mFND[6][2][0] = xcFND - wFNDs/2
	mFND[6][2][1] = ycFND + 0
	mFND[6][3][0] = xcFND - wFNDs/2
	mFND[6][3][1] = ycFND + wFNDs/2
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
	
	//*	DVF
	mFND[18][0][0] = xcFND - offCH/2
	mFND[18][0][1] = ycFND + wFND/2
	mFND[18][1][0] = xcFND + offCH/2
	mFND[18][1][1] = ycFND + wFND/2
	mFND[18][2][0] = xcFND + offCH/2
	mFND[18][2][1] = ycFND + wFND/2 + 2*offCH
	mFND[18][3][0] = xcFND - offCH/2
	mFND[18][3][1] = ycFND + wFND/2 + 2*offCH
	//*	DVD
	mFND[19][0][0] = xcFND + wFND/2
	mFND[19][0][1] = ycFND + offCH/2
	mFND[19][1][0] = xcFND + wFND/2
	mFND[19][1][1] = ycFND - offCH/2
	mFND[19][2][0] = xcFND + wFND/2 + 2*offCH
	mFND[19][2][1] = ycFND - offCH/2
	mFND[19][3][0] = xcFND + wFND/2 + 2*offCH
	mFND[19][3][1] = ycFND + offCH/2
	//*	DVE
	mFND[20][0][0] = xcFND - wFND/2
	mFND[20][0][1] = ycFND + offCH/2
	mFND[20][1][0] = xcFND - wFND/2
	mFND[20][1][1] = ycFND - offCH/2
	mFND[20][2][0] = xcFND - wFND/2 - 2*offCH
	mFND[20][2][1] = ycFND - offCH/2
	mFND[20][3][0] = xcFND - wFND/2 - 2*offCH
	mFND[20][3][1] = ycFND + offCH/2
	//*	DVT
	mFND[21][0][0] = xcFND - offCH/2
	mFND[21][0][1] = ycFND - wFND/2
	mFND[21][1][0] = xcFND + offCH/2
	mFND[21][1][1] = ycFND - wFND/2
	mFND[21][2][0] = xcFND + offCH/2
	mFND[21][2][1] = ycFND - wFND/2 - 2*offCH
	mFND[21][3][0] = xcFND - offCH/2
	mFND[21][3][1] = ycFND - wFND/2 - 2*offCH
	
	console.log(mFND)
	return 1
}


//* ----------------------------- DESENHAR FUNDO ----------------------------- */

async function drwBTM() {
	if (bStatus) { console.log(clgFncName(0)) }
	//* 	TESTE
	// var circle = drawFND
	// 	.circle(xcFND, ycFND, 4)
	// 	.attr({
	// 			fill: 'grey',
	// 		})


	// var polyline = drawFND
	// .polyline(xcFND, ycFND, xcFND+20, ycFND, )
	// .attr({
	// 	fill: 'none',
	// 	// stroke: cLinBG,
	// 	stroke: 'red',
	// 	strokeWidth: wLinBG * lwid,
	// 	opacity: oLinBG,
	// 	'stroke-linecap': 'round',
	// 	'stroke-linejoin': 'round',
	// })

	// var circle = drawFND.circle(5,5,lwid).attr({fill: 'dodgerblue',stroke:'none'});
	// //---(xBB, yBB, widthBB, heightBB, refX, refY)---
	// var circleMarker=circle.marker(0,0,10,10,5,5)

	// var arrowPath=drawFND.path("M 2 59 L 293 148 L 1 243 L 121 151 Z").attr({fill:'purple',stroke:'black',strokeWidth:5})
	// var arrowMarker=arrowPath.marker(0,0,8000,8000,60,150).attr({markerUnits:'strokeWidth', markerWidth:300,markerHeight:300,orient:"auto" })

	// polyline.attr({markerStart:circleMarker})
	// polyline.attr({markerEnd:arrowMarker})
   // //  polyline.attr({markerEnd:circleMarker})









	//*	INÍCIO
	// await calcmFND().catch((e) => { console.log(e) })
	calcmFND()
	
	let mSai = ['PORTA','F1','F2','D1','D2','E1','E2','T1','T2']
	let mDut = ['','Fi','Fe','Di','De','Ei','Ee','Ti','Te']
	let aDomBL = ['','hanging','hanging','middle','middle','middle','middle','text-top','text-top']
	let aTxAnc = ['','middle','middle','start','start','end','end','middle','middle']

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
			opacity: oFND0,
		})
		.click(function(e) {clickBTM(mSai[f])})
	
		let tmpX = 0
		let tmpY = 0
		for (let i = 0; i <= 3; i++) {
			tmpX += mFND[f][i][0]
			tmpY += mFND[f][i][1]
		}
		tmpX /= 4
		tmpY /= 4

		// var circle = drawFND
		// .circle(tmpX, tmpY, 2)
		// .attr({fill: 'black'})

		var text = drawFND									//> TEXTO DO FUNDO
		.text(tmpX, tmpY, '')
		.attr({
			id: 'txtFND_'+mSai[f],
			fill: cFNDbg,
			'font-size': "18pt",
			'font-weight': 500,
			'dominant-baseline': aDomBL[f],
			'text-anchor': aTxAnc[f],
			opacity: 1,
		})
		.click(function(e) {clickBTM(mSai[f])})
		
		var text = drawSQMA									//> TEXTO DO ESQUEMA (=FUNDO)
		.text(0, 0, '')
		.attr({
			id: 'txtSQMAfnd_'+mSai[f],
			fill: $('#divCOD').css('color'),
			'font-size': "14pt",
			'font-weight': 700,
			'dominant-baseline': 'middle',
			'text-anchor': 'middle',
			// opacity: 0.8,
			// visibility: 'hidden'
			visibility: 'visible'
		})
		.transform('t-100,-100')


	}

	for (let f = 10; f <= 17; f++) {					//> DUTOS DO CANAL
		var polygon = drawFND
		.polygon(mFND[f])
		.attr({
			id: 'FND_'+mDut[f-9],
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

	for (let d = 18; d <= 21; d++) {					//> Desvios verticais
		var polygon = drawFND
		.polygon(mFND[d])
		.attr({
			id: 'dvFND_'+nLadoInt2Str(d-17),
			fill: cLinPN0,
			stroke: cFNDbg,
			'stroke-width': 2*lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			// opacity: 0.9,
			// visibility: 'visible',
			visibility: 'hidden',
		})
		.click(function (e) { clickDV(d - 17) })
	}


	//* SETAS DO FUNDO
	let contARW = -1
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {		//> Para cada lado
		for (let ie = 0; ie <= 1; ie++) {					//> Para int e ext
			for (let i = 0; i <= 1; i++) {							//> Para 1 e 2
				i==0 ? contARW++ : false
				var gARW = drawFND.group()
				gARW.attr({ id: `arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}` })
				
				let xcARW = 0											//> Centro Li|Le
				let ycARW = 0
				for (let p = 0; p <=3; p++) {
					xcARW += mFND[10+contARW][p][0]
					ycARW += mFND[10+contARW][p][1]
				}
				xcARW /= 4
				ycARW /= 4

				let aLin = []
				aLin.push(wFND / 2 - wFND / 2 * (1-arwSizeL) / 2)
				aLin.push(0)
				aLin.push(wFND / 2 * (1-arwSizeL+arwHEADL) / 2)
				aLin.push(0)

				var polyline = drawFND
				.polyline(aLin)
					.attr({
					id: `plFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`,
					fill: 'none',
					stroke: cFNDon,
					strokeWidth: 2.5 * lwid,
					'stroke-linecap': 'square',
					'stroke-linejoin': 'round',
					})
				.appendTo(drawFND.select(`#arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`))
				
				aLin = []
				aLin.push(wFND / 2 * (1-arwSizeL+arwHEADL) / 2)
				aLin.push(0)
				aLin.push(wFND / 2 * (1-arwSizeL+arwHEADL) / 2)
				aLin.push(offCH*arwSizeW/2)
				aLin.push(wFND / 2 * (1-arwSizeL) / 2)
				aLin.push(0)
				aLin.push(wFND / 2 * (1-arwSizeL+arwHEADL) / 2)
				aLin.push(-offCH*arwSizeW/2)
				aLin.push(wFND / 2 * (1-arwSizeL+arwHEADL) / 2)
				aLin.push(0)
				var polygon = drawFND
				.polygon(aLin)
					.attr({
					id: `pgFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`,
					fill: cFNDon,
					stroke: 'none',
					strokeWidth: 2 * lwid,
					'stroke-linecap': 'miter',
					'stroke-linejoin': 'miter',
					})
				.appendTo(drawFND.select(`#arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`))

				let sTransform = ''
					
				switch (tmpLado) {
					case 2:
					case 3:
						sTransform += `r90,0,0`
						break;
					default:
						break;
				}
				i==1 ? sTransform += `r180,0,0` : false
				polyline.transform(sTransform)
				polygon.transform(sTransform)

				

				sTransform = `t${xcARW},${ycARW}`
				gARW.transform(sTransform)
				gARW.attr({visibility: 'hidden'})
			}
		}
	}

	if (bStatus) { console.log(clgFncName(1)) }
	return 1
}
//_drwBTM()


//* ---------------------------- RECOLORIR SAÍDAS ---------------------------- */
//_recolorBTM()
async function recolorBTM() {
	if (bStatus) { console.log(clgFncName(0)) }
	//_var res_recalcProd = await recalcProd()
	let tmpColor = null
	
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
		for (let i = 0; i <= 1; i++) {
			//_ try {
			//> Se fundo sem nome, usa a nomenclatura?
			if (mActBTM[tmpLado][i][6] == '') {
				//_drawFND.select(`#txtFND_${nLadoInt2Str(tmpLado)}${i + 1}`).attr({ text: `${nLadoInt2Str(tmpLado)}${i + 1}` }) }
				drawFND.select(`#txtFND_${nLadoInt2Str(tmpLado)}${i + 1}`).attr({ text: '' }) }
			else {drawFND.select(`#txtFND_${nLadoInt2Str(tmpLado)}${i + 1}`).attr({ text: mActBTM[tmpLado][i][6] })}
			
			//> Se L1=L2, não define nome no esquema
			if (i == 1 && mActBTM[tmpLado][i][4] == mActBTM[tmpLado][0][4]
				&& mActBTM[tmpLado][i][6] == mActBTM[tmpLado][0][6]) {
				drawSQMA.select(`#txtSQMAfnd_${nLadoInt2Str(tmpLado)}${i + 1}`).attr({ text: '' })}
			else {drawSQMA.select(`#txtSQMAfnd_${nLadoInt2Str(tmpLado)}${i + 1}`).attr({ text: mActBTM[tmpLado][i][6] })}
			//_ } catch (error) {}
			
			//* Reposicionar texto de fundo no esquema
			for (let tmpLin = 1; tmpLin <= 3; tmpLin++) {
				if (mActBTM[tmpLado][i][1] == 1 &&
					(mESQ[mActBTM[tmpLado][i][4]][tmpLin][3] == 100 * tmpLado + (i + 1) ||
					mESQ[mActBTM[tmpLado][i][4]][tmpLin][3]  == 100 * tmpLado + 3)) {
					//_ console.log(`mESQ[mActBTM[${tmpLado}][${i}][4]][${tmpLin}][3] = ${mESQ[mActBTM[tmpLado][i][4]][tmpLin][3]}`)

					let tmpXoff = 20
					tmpXoff = (tmpLado%2)*2*(-tmpXoff)+tmpXoff
					let tmpYoff = 10
					tmpYoff = (tmpLado%2)*2*(+tmpYoff)-tmpYoff

					let tmpIE = 0
					mESQ[mActBTM[tmpLado][i][4]][tmpLin][2] == 1 ? tmpIE = 1 : tmpIE = 0
					tmpIE == 0 ? tmpYoff += yOff : false
					drawSQMA.select(`#txtSQMAfnd_${nLadoInt2Str(tmpLado)}${i + 1}`) ?
					drawSQMA.select(`#txtSQMAfnd_${nLadoInt2Str(tmpLado)}${i + 1}`)
						.transform(`t${mG[mESQ[mActBTM[tmpLado][i][4]][tmpLin][1]][tmpLado][tmpIE][0] +tmpXoff},${mG[mESQ[mActBTM[tmpLado][i][4]][tmpLin][1]][tmpLado][tmpIE][1]+tmpYoff}`)
						.appendTo(drawSQMA) : false
				}
			}
		}
	}
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
		//> Lado Usado: controla a opacidade
		if (mCOD1[nGavs][1][tmpLado] > 0 || mESQ[nGavs][1][0]==tmpLado) {		//> [1] :  Array de duto usado
			mActBTM[tmpLado][0][0]=1
			drawFND.select("#FND_"+nLadoInt2Str(tmpLado)+"1").attr({opacity: oFND1})
			mActBTM[tmpLado][1][0]=1
			drawFND.select("#FND_"+nLadoInt2Str(tmpLado)+"2").attr({opacity: oFND1})
		
			//> Se L1 E L2 forem selecionados E orig1 != orig2, ativa desvio
			if (aDESV[tmpLado][0] == 1) {
				
				let tmpDVcolor = null
				aDESV[tmpLado][1] == 1 ? tmpDVcolor = cFNDon : tmpDVcolor = cLinPN0
				
				drawFND.select(`#dvFND_${nLadoInt2Str(tmpLado)}`)
					.attr({
						fill: tmpDVcolor,
						visibility: 'visible',
					})
				//> Ao ativar dv, oculta setas desv inf
				for (let i = 0; i <= 1; i++) {
					for (let ie = 0; ie <= 1; ie++) {
						drawFND.select(`#arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`)
						.attr({visibility: 'hidden'})
					}
				}
			
			} else {
				//> Ocultar DV
				drawFND.select(`#dvFND_${nLadoInt2Str(tmpLado)}`)
					.attr({ visibility: 'hidden'})
			}

			//> Selecionado: controla a cor
			for (let i = 0; i <= 1; i++) {
				if (mActBTM[tmpLado][i][1] == 1) {		//> Se selecionado
					tmpColor = window['cLin'+mActBTM[tmpLado][i][2].toUpperCase()+mActBTM[tmpLado][i][3].toLowerCase()]
				} else { tmpColor = cLinRX0 }
				drawFND.select("#FND_" + nLadoInt2Str(tmpLado) + (i+1)).attr({ fill: tmpColor })
			}
		} else {
			//> Zerar se lado não estiver sendo usado
			mActBTM[tmpLado][0]=[0,0,'','',0,0,'']
			mActBTM[tmpLado][1]=[0,0,'','',0,0,'']
			drawFND.select("#FND_" + nLadoInt2Str(tmpLado) + "1").attr({ opacity: oFND0, fill: cLinRX0 })
			drawFND.select("#FND_" + nLadoInt2Str(tmpLado) + "2").attr({ opacity: oFND0, fill: cLinRX0 })
			for (let i = 0; i <= 1; i++) {
				drawFND.select(`#txtFND_${nLadoInt2Str(tmpLado)}${i + 1}`) ?
				drawFND.select(`#txtFND_${nLadoInt2Str(tmpLado)}${i + 1}`).attr({ text: '' }) : false
			}
			//> Ocultar DV
			drawFND.select(`#dvFND_${nLadoInt2Str(tmpLado)}`)
					.attr({
						fill: cLinPN0,
						visibility: 'hidden',
					})
		}

		//*	Desvios inferiores
		for (let i = 0; i <= 1; i++) {			//> 1 ou 2
			for (let ie = 0; ie <= 1; ie++) {	//> int ou ext
				if (aDINF[tmpLado][i][ie]==1) {
					drawFND.select(`#arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`) ? 
					drawFND.select(`#arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`)
					.attr({visibility: 'visible'}) : false
				} else {
					drawFND.select(`#arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`) ?
					drawFND.select(`#arwFND_${nLadoInt2Str(tmpLado)}${i+1}${ie}`)
					.attr({visibility: 'hidden'}) : false
				}
			}
		}
	}
	if (bStatus) { console.log(clgFncName(1)) }
	return 1
}


//* ---------------------------- CLICAR NAS SAÍDAS --------------------------- */

//> Ao clicar, SE ativo E bEditMode ENTÃO: Se ñ-selecionado, assume A|B, matSelecionado=1
//>													 Else, assume cor neutra, matSelecionado=0
async function clickBTM(sSaida) {
	if (bStatus) { console.log(clgFncName(0)) }
	let tmpLado = nLadoStr2Int(sSaida.charAt(0))
	let tmp12 = parseInt(sSaida.charAt(1), 10) - 1
	let sAB = mESQ[nGav0][0][1] + ''
	//*	SE ativo E bEditMode, etc...
	if ( mActBTM[tmpLado][tmp12][0] == 1 && bEditMode && nGav0 > 0 && tmpLado == nLado &&(nGav0 != nGav||nGav0==nGavs) ) {	
		if (mActBTM[tmpLado][tmp12][1] == 0) {		//>	Se ñ-selecionado,
			mActBTM[tmpLado][tmp12][1] = 1			//> Set selec
			mActBTM[tmpLado][tmp12][2] = sCPtype	//> Set Prod
			mActBTM[tmpLado][tmp12][3] = sAB			//> Set A|B
			mActBTM[tmpLado][tmp12][4] = nGav0		//> Set Orig
			mActBTM[tmpLado][tmp12][5] = nIE			//> Set IE
			// console.log(`mESQ[${nGav0}][${nLin0}][3] % (${tmpLado} * 100) + ${tmpLado} * 100 + parseInt(${sSaida}.charAt(1), 10) = ${mESQ[nGav0][nLin0][3] % (tmpLado * 100) + tmpLado * 100 + parseInt(sSaida.charAt(1), 10)}`)

			// todo  -  Resolver problema do produto B
			mESQ[nGav0][nLin0][3] = mESQ[nGav0][nLin0][3] % (tmpLado * 100) + tmpLado * 100 + parseInt(sSaida.charAt(1), 10)
		
		} else if (mActBTM[tmpLado][tmp12][4] == nGav0) {		//> Se selec, reagir apenas se = sel cp
			mActBTM[tmpLado][tmp12][1] = 0		//> Set unsel
			mActBTM[tmpLado][tmp12][2] = ''		//> Set Prod
			mActBTM[tmpLado][tmp12][3] = ''		//> Set A|B
			mActBTM[tmpLado][tmp12][4] = 0		//> Set Orig
			mActBTM[tmpLado][tmp12][5] = 0		//> Set IE
			mActBTM[tmpLado][tmp12][6] = ''
			switch (mESQ[nGav0][nLin0][3]) {
				case tmpLado * 100 + 1:
				case tmpLado * 100 + 2:
					mESQ[nGav0][nLin0][3] -= (parseInt(sSaida.charAt(1), 10) + tmpLado * 100)
					break;
					case tmpLado * 100 + 3:
					mESQ[nGav0][nLin0][3] -= parseInt(sSaida.charAt(1), 10)
					break;
				default:
					mESQ[nGav0][nLin0][3] = 0
					break;
			}
		}
	}


	var res_calcHtotal   = await calcHtotal().catch((e)=>{console.log(e)})
	var res_recalcProd   = await recalcProd().catch((e)=>{console.log(e)})
	var res_recolorBTM = await recolorBTM().catch((e)=>{console.log(e)})
	if (bStatus) { console.log(clgFncName(1)) }
	return 1
}



//* ------------------------ CLICAR NO DESVIO VERTICAL ----------------------- */
async function clickDV(tmpLado) {
	if (bStatus) { console.log(clgFncName(0)) }
	//_ console.log(`clickDV(${tmpLado}): aDESV[${tmpLado}][1]==${aDESV[tmpLado][1]}`)
	if (bEditMode) {
		if (aDESV[tmpLado][1] == 0) {		//> Se não usado
			aDESV[tmpLado][1] = 1			//> Def usado
		} else {									//> Se usado
			aDESV[tmpLado][1] = 0			//> Def não usado
		}
		var res_recolorBTM = await recolorBTM().catch((e)=>{console.log(e)})
	}
	if (bStatus) { console.log(clgFncName(1)) }
	return 1
}


//* ---------------- RECALCULAR NOMES DOS PRODUTOS NAS SAÍDAS ---------------- */
async function recalcProd() {
	if (bStatus) { console.log(clgFncName(0)) }

	mESQ[0][2][1] > 0 ? b2prod = true : b2prod = false								//> B foi usado?
	
	//*	Limpar nomes
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
		for (let i = 0; i <= 1; i++) {
			mActBTM[tmpLado][i][6]=''
		}		
	}


	//*	Desvios Verticais
	//> Para cada lado do fundo, 
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
		//> Dois lados ativos e selec: ativar DV
		if (mActBTM[tmpLado][0][0] == 1 && mActBTM[tmpLado][0][1] == 1 &&
			 mActBTM[tmpLado][1][0] == 1 && mActBTM[tmpLado][1][1] == 1 ) {
			//> Origens !=, E ambos externos
			if (mActBTM[tmpLado][0][4] != mActBTM[tmpLado][1][4] &&
				mActBTM[tmpLado][0][5] == 1 & mActBTM[tmpLado][1][5] == 1) {
				aDESV[tmpLado][0] = 1
			} else { } //aDESV[tmpLado][0] = 0 }
		}
		else { } //aDESV[tmpLado][0] = 0 }
	}



	aCont = [
		['', 0, 0, 0, 0],	//> RxA, PnA, RxB, PnB
		[],					//> Origens RxA	[nGav,nLado,nIE]
		[],					//> Origens PnA	[nGav,nLado,nIE]
		[],					//> Origens RxB	[nGav,nLado,nIE]
		[],					//> Origens PnB	[nGav,nLado,nIE]
	]
	
	let nAouB = 0
	let nRxPn = 0
	let sAouB = ''

	//* Alimentar a matriz de gavetas q mandam produto para fundo (+click fnd)
	for (let g = 0; g <= nGavs; g++) {										//> Cada gaveta
		for (let tmpLin = 1; tmpLin <=3; tmpLin++) {						//> Rx, Pn1, Pn2
			if (mESQ[g][tmpLin][3] > 100 * mESQ[g][tmpLin][0] &&
				mESQ[g][tmpLin][3] <= 100 * mESQ[g][tmpLin][0]+3) {		//> Se manda para o fundo
				
				let aTmp = []
				aTmp.push(g)
				aTmp.push(mESQ[g][tmpLin][0])
				aTmp.push(mESQ[g][tmpLin][2])
				
				tmpLin == 1 ? nRxPn = 1 : nRxPn = 2
				mESQ[g][0][1]=='A' ? nAouB = 0 : nAouB = 2
				mESQ[g][0][1]=='A' ? sAouB = 'A' : sAouB = 'B'
				aCont[nRxPn + nAouB].push(aTmp)
				aCont[0][nRxPn + nAouB]++
				
				let tmpName = ''
				nRxPn == 1 ? tmpName = aCont[0][nRxPn + nAouB] : tmpName = romanize(aCont[0][nRxPn + nAouB])
				b2prod ? tmpName += sAouB : false

				//> 1 gav enviando p/ 2 saídas
				if (mESQ[g][tmpLin][3] % 100 == 3) {

					mActBTM[mESQ[g][tmpLin][0]][0][6] = tmpName
					mActBTM[mESQ[g][tmpLin][0]][1][6] = tmpName

				//> 2 gavetas !=
				} else {
					//> DV 1+0 ==> L1 e L2 selec
					if (aDESV[mESQ[g][tmpLin][0]][0]==1 && aDESV[mESQ[g][tmpLin][0]][1]==0) {
						if (g == Math.min(mActBTM[mESQ[g][tmpLin][0]][0][4],mActBTM[mESQ[g][tmpLin][0]][1][4])) {
							mActBTM[mESQ[g][tmpLin][0]][0][6] = tmpName
							mActBTM[mESQ[g][tmpLin][0]][1][6] = tmpName
						} else if (g == Math.max(mActBTM[mESQ[g][tmpLin][0]][0][4], mActBTM[mESQ[g][tmpLin][0]][1][4])) {
							aCont[0][nRxPn + nAouB]--
						}
						
					//> Sem DV ou DV selec
					} else {
						mActBTM[mESQ[g][tmpLin][0]][mESQ[g][tmpLin][3] % 100 - 1][6]=tmpName
					}
				}



				//* IMPORTANTE:
				//* Pn da mesma gaveta recebem mesmo nome
				//* Verificar, no fundo, o estado da outra saída
				
				//* Se DV 0+1, mesmo nome
				
			}
		}
	}

	




	//* Fim
	// var res_recalcDV     = await recalcDV()
	// var res_recalcDINF   = await recalcDINF()
	// var res_calcHtotal = await calcHtotal()
	if (bStatus) { console.log(clgFncName(1)) }
	return 1
}




//* ---------------------- RECALCULAR DESVIOS INFERIORES --------------------- */
async function recalcDINF() {
	if (bStatus) { console.log(clgFncName(0)) }

	resetDINF()
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {		//> De F1 até T2
		if (aDESV[tmpLado][0] == 0) {								//> Se não tem DV
			//> Verif, quando i=0, se L1&L2 estão selecionados e são iguais
			for (let i = 0; i <= 1; i++) {							//> Checa int e ext
				if (i == 0 && mActBTM[tmpLado][0][1] == 1 && mActBTM[tmpLado][1][1] == 1 &&
					mActBTM[tmpLado][0][4] == mActBTM[tmpLado][1][4] &&
					mActBTM[tmpLado][0][2] == mActBTM[tmpLado][1][2]) { bEqual = true; i=2}
				else {  bEqual = false }
				if (!bEqual && mActBTM[tmpLado][i][1] == 1) {	//> Se L1!=L2 e Ln selec
					aDINF[tmpLado][i][mActBTM[tmpLado][i][5]]=1
				} else { }
			}
		}
	}
	if (bStatus) { console.log(clgFncName(1)) }
	return 1
}


//* ---------- RECALCULAR ALTURAS DOS DV E MODIFICAR CÓD DAS GAVETAS --------- */
async function recalcDV() {
	if (bStatus) { console.log(clgFncName(0)) }

	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {					//> Para cada lado
		console.log(`   tmpLado = ${tmpLado}`)
		if (aDESV[tmpLado][0] == 1 && aDESV[tmpLado][1] == 1) {		//> Se DV ativo e selec
			let tmpGav =0
			let hDV = 0
			switch (tmpLado) {		//> Calcular h inicial do desvio
				case 1:
					hDV = 54
					break;
				default:
					hDV = 80
					break;
			}
				if (mActBTM[tmpLado][0][4]>mActBTM[tmpLado][1][4]) {		//> Gaveta mais baixa
					tmpGav = mActBTM[tmpLado][0][4]
				} else if (mActBTM[tmpLado][0][4]<mActBTM[tmpLado][1][4]) {
					tmpGav = mActBTM[tmpLado][1][4]
				}
				// for (let i = 0; i <= 1; i++) {
					// if (mActBTM[tmpLado][1][4]==tmpGav) {						//> 
						for (let g = tmpGav; g <= nGavs; g++) {
							hDV += mESQ[g][0][0]
							console.log(`      G${pad(g)}: hDV = ${hDV}`)
						}
					// }
				// }
				aDESV[tmpLado][2] = hDV
		}
	}
	if (bStatus) { console.log(clgFncName(1)) }
	return 1
}
