//_ TODO	Desenhar 'Ae' e 'Be' como ctrl pnts
//_ TODO PENEIRADO POR BAIXO DA MESMA COR DO PRODUTO A/B
//_ TODO	Caso seja o último rechaço, desenhar seta p/ fundo, invés de linha para o centro da gav seguinte
//_ TODO Impedir os CP Pn de se alinharem nos pontos internos da gaveta
//_ TODO CP Pn se alinhando nos pontos internos: "Excluir" da conexão
//_ TODO	O cód da última gaveta precisa ser GPF32...   (Está GPF65)
//_ TODO	Slide nGav deixando a linha de peneirado acima das gavetas: APENAS em edit mode OFF
//_ TODO	Corrigir CodGav qnd Pn retorna em outra gaveta
//_ TODO 	Código da gaveta com saída por baixo está incorreto
//_ TODO 	CPs de Ae e Be não podem dar snap em pontos externos da gaveta (Apenas Pr)
//_ TODO	Linha'Be' precisa ser adaptável para ficar à direita ou à esquerda da queda de A
//_			LINHA Be: Se Be=F||E, Esquerda	;	Se Be=T||D, Direita
//_ TODO	Criar contorno no último ponto selecionado
//_ TODO	CPs ficam inativos onclick "Novo" (Limpar)
//_ TODO	Criar div (sidenav) para selecionar destino de saída do produto (ativo apenas quando selecionado um Pn ou Rx)



//* ---------------------- PROPAGAR INFORMAÇÕES DE FLUXO --------------------- */
function propagate() {
	//_ console.log('propagate()')
	let dest = 0
	//* DESCONECTAR PRODUTO
	
	for (let i = 2; i <= nGavs; i++) {		
		let cont = 0

		//_ for (let j = 1; j < i; j++) {			//> Varre desde a primeira até a última
		for (let j = 0; j < i; j++) {			//> Varre desde a primeira até a última
			for (let p = 1; p <= 3; p++) {				
				dest = 1 * mESQ[j][p][1]
				if (dest == i && mESQ[j][p][2] == 0) { cont++ }
			}														
		}
		
		if (cont == 0) { mESQ[i][0][1] = '' }
	}

	mESQ[0][0][1] = 'B'	//> Garantir que o produto da zero seja sempre 'B'
	mESQ[1][0][1] = 'A'	//> Garantir que o produto da primeira seja sempre 'A'
	
	//*		CONECTAR PRODUTOS AOS DESTINOS
	let destAe = 1 * mESQ[0][1][1]					//> nPara Ae
	if (destAe>0) {mESQ[destAe][0][1]='A'} 
	let destBe = 1 * mESQ[0][2][1]					//> nPara Be
	if (destBe>0 && mESQ[destBe][0][1]!='A') {mESQ[destBe][0][1]='B'} 
	
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
	//_ console.log('reColor()')
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
		//*	COLORIR RECHAÇO
		try { drawSQMA.select('#' + 'linRx0_' + gIDtmp).attr({ stroke: cLinRX }) } catch (error) {}
		try { drawSQMA.select('#' + 'linRx1_' + gIDtmp).attr({ stroke: cLinRX }) } catch (error) {}
		try { drawSQMA.select('#' + 'arwRx_'  + gIDtmp).attr({ fill  : cLinRX }) } catch (error) {}
		//*	COLORIR PENEIRADO
		try { drawSQMA.select('#' + 'linPn1_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { drawSQMA.select('#' + 'linPn2_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { drawSQMA.select('#' + 'linPr1_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { drawSQMA.select('#' + 'linPr2_' + gIDtmp).attr({ stroke: cLinPN }) } catch (error) {}
		try { drawSQMA.select('#' + 'arwPn1_' + gIDtmp).attr({ fill  : cLinPN }) } catch (error) {}
		try { drawSQMA.select('#' + 'arwPn2_' + gIDtmp).attr({ fill  : cLinPN }) } catch (error) {}
		try { drawSQMA.select('#' + 'PnD1_' 	 + gIDtmp).attr({ fill  : patPn  }) } catch (error) {}
		try { drawSQMA.select('#' + 'PnD2_' 	 + gIDtmp).attr({ fill  : patPn  }) } catch (error) {}
		//*	COLORIR CPoints
		try { drawSQMA.select('#' + 'CP_Rx_'  + gIDtmp).attr({ fill: cLinRX }) } catch (error) {}
		try { drawSQMA.select('#' + 'CP_Pn1_' + gIDtmp).attr({ fill: cLinPN }) } catch (error) {}
		try { drawSQMA.select('#' + 'CP_Pn2_' + gIDtmp).attr({ fill: cLinPN }) } catch (error) {}
	}

	recolorBTM()
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
		span.className = 'spanH'
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
	//* G00 (PRODUTO B)
	$('#matGPF' + pad(0))
			.html(mESQ[0][0]+'<br>'+mESQ[0][1]+'<br>'+mESQ[0][2]+'<br>'+mESQ[0][3])
	$('#matCUT' + pad(0))
			.html(mCOD1[0][0]+'<br>'+mCOD1[0][1]+'<br>'+mCOD1[0][2]+'<br>'+mCOD1[0][3])

	//* PRIMEIRA À PENÚLTIMA
	for (let index = 1; index < nGavs; index++) {
		let nGPF = pad(index)
		let source = document.getElementById('rngG' + nGPF)
		let j = 1 * index
		try {
			mESQ[j][0][0] = parseInt(source.value, 10)
			$('#codGPF' + pad(index)).html(calcCOD(index))
			$('#matGPF' + pad(index))
			.html(mESQ[index][0]+'<br>'+mESQ[index][1]+'<br>'+mESQ[index][2]+'<br>'+mESQ[index][3])
			$('#matCUT' + pad(index))
			.html(mCOD1[index][0]+'<br>'+mCOD1[index][1]+'<br>'+mCOD1[index][2]+'<br>'+mCOD1[index][3])
		} catch (error) {}
	}
	//* ÚLTIMA GAVETA
		//_ console.log('nGavs='+nGavs)
		mESQ[nGavs][0][0] = 32
		$('#codGPF' + pad(nGavs)).html(calcCOD(nGavs))
		$('#matGPF' + pad(nGavs))
		.html(mESQ[nGavs][0] + '<br>' + mESQ[nGavs][1] + '<br>' + mESQ[nGavs][2] + '<br>' + mESQ[nGavs][3])
		$('#matCUT' + pad(nGavs))
		.html(mCOD1[nGavs][0]+'<br>'+mCOD1[nGavs][1]+'<br>'+mCOD1[nGavs][2]+'<br>'+mCOD1[nGavs][3])

	hTotal = 0
	for (let index = 1; index <= nGavs; index++) {
		hTotal = hTotal + 1 * parseInt(mESQ[index][0][0])
		if (mESQ[index][0][0]=== NaN)  { $('#z-flow-clog').html(index) } 
	}
	//_ let target = document.getElementById('hTotal')
	//_ target.innerHTML = '&nbsp' + hTotal + 'mm'
	$('#hTotal').html('&nbsp' + hTotal + 'mm');

	$('#divESQ').css({ 'height': 220 + yOff * nGavs + "px" })
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
	n += mESQ[nGav][1][0] * 100
	if (mESQ[nGav][2][2] == 1 || mESQ[nGav][2][1] != nGav) { n += mESQ[nGav][2][0] * 10 	} 
	if (mESQ[nGav][3][2] == 1 || mESQ[nGav][3][1] != nGav) { n += mESQ[nGav][3][0]			} 

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
//*                             CÓDIGO DAS GAVETAS                             */
//* -------------------------------------------------------------------------- */

function drwCOD() {
	let nGPF = ''
	//* Div Matriz Esquema
		nGPF = pad(0)
		var div = document.createElement('div')
		div.id = 'div-matGPF' + nGPF
		div.className = 'matcontainer'
		document.getElementById('divMAT').appendChild(div)
		h2 = document.createElement('h2')
		h2.id = 'matGPF' + nGPF
		h2.className = 'matValue'
		// h2.innerHTML = 'GPF65'
		div.appendChild(h2)

		
	//* Div Matriz Corte
		nGPF = pad(0)
		var div = document.createElement('div')
		div.id = 'div-matCUT' + nGPF
		div.className = 'matcontainer'
		document.getElementById('divCUT').appendChild(div)
		h2 = document.createElement('h2')
		h2.id = 'matCUT' + nGPF
		h2.className = 'matValue'
		// h2.innerHTML = '000000'
		div.appendChild(h2)


	

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

		//* Div Matriz Corte
		div = document.createElement('div')
		div.id = 'div-matCUT' + nGPF
		div.className = 'matcontainer'
		document.getElementById('divCUT').appendChild(div)
		h2 = document.createElement('h2')
		h2.id = 'matCUT' + nGPF
		h2.className = 'matValue'
		// h2.innerHTML = 'GPF65'
		div.appendChild(h2)




	}
}




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





//* -------------------------------------------------------------------------- */
//*                          Função Guias (Edit Mode)                          */
//* -------------------------------------------------------------------------- */

function drwGuias() {
	let swid = 0.5 * lwid
	calcMat(x0, y0, Larg)

	var gGui = drawSQMA.group()
	gGui.attr({ id: 'Guia_G00' })
	//_ var ellipse = draw
	//_ 		.ellipse(mF[0][1][0], mF[0][1][1] -2 -Alt/2, Alt , Alt/2)
	//_ 		.attr({ fill: 'gray', stroke: 'gray', strokeWidth: swid })
	//_ 		.appendTo(draw.select('#' + 'Guia_G00'))

	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//* 	Pontos
		calcMat(x0, y0 + yOff * j, Larg)
		var gGui = drawSQMA.group()
		gGui.attr({ id: 'Guia_' + gIDtmp })
		//*	Linhas
		var polyline = drawSQMA
			.polyline(mF[1])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		var polyline = drawSQMA
			.polyline(mF[2])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		var polyline = drawSQMA
			.polyline(mF[3])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		var polyline = drawSQMA
			.polyline(mF[4])
			.attr({ stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		//*	Círculos
		var ellipse = drawSQMA
			.ellipse(mF[1][1][0], mF[1][1][1], Alt / 2, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		var ellipse = drawSQMA
			.ellipse(mF[2][1][0], mF[2][1][1], Alt, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		var ellipse = drawSQMA
			.ellipse(mF[3][1][0], mF[3][1][1], Alt, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		var ellipse = drawSQMA
			.ellipse(mF[4][1][0], mF[4][1][1], Alt / 2, Alt)
			.attr({ fill: 'none', stroke: 'gray', strokeWidth: swid })
			.appendTo(drawSQMA.select('#' + 'Guia_' + gIDtmp))
		drawSQMA.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 0 })
	}
}

function showGuias() {
	//_ console.log('showGuias()')

	for (let j = nGavs; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//_ draw.select('#' + "Guia_" + gIDtmp).remove()
		drawSQMA.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 1 })
		// paper.append('#' + 'Guia_' + gIDtmp)
	}
}

function hideGuias() {
	//_ console.log('hideGuias()')

	for (let j = 32; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		try {
			drawSQMA.select('#' + 'Guia_' + gIDtmp).attr({ opacity: 0 })
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
		stroke: cLinSel,
		strokeWidth: 2*lwid,
	})
	var bb = this.getBBox()
	xi = bb.cx
	yi = bb.cy
	let s = this.attr('id')
	s = s.substr(s.length - 3)
}


var cpPnMoveStart = function () {
	//_ console.log('cpPnMoveStart()')
	this.data('origTransform', this.transform().local)
	let s = this.attr('id')
	//_ console.log('cpPnMoveStart: id=' + s)
	nGav0 = parseInt(s.substr(s.length - 2), 10)
	L = this.attr('id')
	nPn = parseInt(L.substr(s.length - 5, 1), 10)
	if (nGav != 0 && nGav != nGav0) { mESQ[(1 * mESQ[nGav0][1 + nPn][1])][0][1] = '' }
	//_removUsed(this.attr('id'))
}


var cpPnMoveStop = function () {
	//_ console.log('cpPnMoveStop()')
	sCPtype = 'Pn'
	nLin0 = parseInt(this.attr('id').charAt(5),10)+1
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

	//_setUsed(this.attr('id'))
	recalcUsed()
	recalcProd()
	recolorBTM()

	$('#z-flow-prod span').html(mESQ[nGav][0][1])
	$('#z-flow-type span').html('Peneirado ' + nPn)
	$('#z-flow-from span').html('G' + pad(nGav0)+'.'+nLado)
	$('#z-flow-to span').html('G' + pad(mESQ[nGav0][1+nPn][1])+'.'+nLado)
	
	this.attr({ stroke: 'none' })
	xT = xv
	yT = yv

	drwPN() 	//! ==================================> Deve ficar depois do if, pois muda o valor de nGav
	drwSelLin()
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
		stroke: cLinSel,
		strokeWidth: 2*lwid,
	})
	var bb = this.getBBox()
	xi = bb.cx
	yi = bb.cy
	let s = this.attr('id')
	s = s.substr(s.length - 3)

	

}


var cpRxMoveStart = function () {
	//_ console.log('cpRxMoveStart()')
	this.data('origTransform', this.transform().local)
	let s = this.attr('id')
	//_ console.log('cpRxMoveStart: id=' + s)
	nGav0 = parseInt(s.substr(s.length - 2), 10)		//> Gaveta de origem
	nGav = mESQ[nGav0][1][1]								//> Gaveta de destino
	if (nGav != nGav0) { mESQ[(mESQ[nGav0][1][1])][0][1] = '' }
	//_removUsed(this.attr('id'))
}


var cpRxMoveStop = function () {
	//_ console.log('cpRxMoveStop()')
	sCPtype = 'Rx'
	nLin0 = 1
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

	//_setUsed(this.attr('id'))
	recalcUsed()
	recalcProd()
	recolorBTM()

	$('#z-flow-prod span').html(mESQ[nGav][0][1])
	$('#z-flow-type span').html('Rechaço')
	$('#z-flow-from span').html('G' + pad(nGav0)+'.'+nLado)
	$('#z-flow-to span').html('G' + pad(mESQ[nGav0][1][1])+'.'+nLado)
	
	this.attr({ stroke: 'none' })
	xT = xv
	yT = yv

	propagate()
	reColor()

	drwRX() //! ==================================> Deve ficar depois do if, pois muda o valor de nGav
	drwSelLin()
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
		stroke: cLinSel,
		strokeWidth: 2*lwid,
	})
	var bb = this.getBBox()
	xi = bb.cx
	yi = bb.cy
	let s = this.attr('id')
	s = s.substr(s.length - 1)
}



var cpPrMoveStart = function () {
	//_ console.log('cpPrMoveStart()')
	this.data('origTransform', this.transform().local)
	let s = this.attr('id')
	s = s.substr(s.length - 1)
	//_ console.log('s = ' + s)
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
	//_ console.log('nGav='+nGav)
	//_ console.log('nGav0='+nGav0)
	if (nGav != nGav0) { mESQ[(mESQ[nGav0][nAB][1])][0][1] = '' } 
	$('#z-flow-prod span').html(s = s.substr(s.length - 1))
	//_removUsed(this.attr('id'))
}


var cpPrMoveStop = function () {
	//_ console.log('cpPrMoveStop()')
	sCPtype = 'Pr'
	var bb = this.getBBox()
	xf = bb.cx
	yf = bb.cy

	let d = 10 ** 6
	let xv = xf
	let yv = yf

	for (let g = 0; g <= nGavs; g++) {
		for (let l = 1; l <= 4; l++) {
			// for (let io = 0; io <= 1; io++) {
			let io = 0
				if (dist(xf, yf, mG[g][l][io][0], mG[g][l][io][1]) < d) {
					xv = 1 * mG[g][l][io][0]
					yv = 1 * mG[g][l][io][1]
					d = dist(xv, yv, xf, yf)
					nGav = g
					nLado = l
					nIE = io
				}
			// }
		}
	}
	var s = this.attr('id')
	s = s.substr(s.length - 1)
	this.transform('t' + xv + ',' + yv)

	mESQ[nGav0][nAB][0] = nLado	//> nLado
	mESQ[nGav0][nAB][1] = nGav		//> nPara
	mESQ[nGav0][nAB][2] = 1			//> nIE [Sempre externo]

	//_setUsed(this.attr('id'))
	recalcUsed()
	recalcProd()
	recolorBTM()

	$('#z-flow-prod span').html(mESQ[nGav][0][1])
	$('#z-flow-type span').html('Produto')
	$('#z-flow-from span').html('G' + pad(nGav0)+'.'+nLado)
	$('#z-flow-to span').html('G' + pad(mESQ[nGav0][1][1])+'.'+nLado)
	
	this.attr({ stroke: 'none' })
	xT = xv
	yT = yv
	propagate()
	reColor()

	//drwRX() //! ==================================> Deve ficar depois do if, pois muda o valor de nGav
	switch (s) {
		case 'A':
			drwAe()
			break;
		case 'B':
			drwBe()
			break;
		default:
			break;
		}
	drwSelLin()

	showCtrlPts()
	calcHtotal()
}

//* -------------------------------------------------------------------------- */
//*                   DESENHAR PONTOS DE CONTROLE (Edit Mode)                  */
//* -------------------------------------------------------------------------- */
function drwCtrlPts() {
	//* Grupo 0
	var gCP = drawSQMA.group()
	gCP.attr({ id: 'CP_G00'})
	//* Ponto do produto A
		var ellipse = drawSQMA
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
			.appendTo(drawSQMA.select('#' + 'CP_G00'))
			.drag(cpPrMove, cpPrMoveStart, cpPrMoveStop)
	//* Ponto do produto B
		var ellipse = drawSQMA
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
			.appendTo(drawSQMA.select('#' + 'CP_G00'))
			.drag(cpPrMove, cpPrMoveStart, cpPrMoveStop)

	
	for (let g = 1; g <= nGavs; g++) {
		iGav = g
		var gIDtmp = 'G' + pad(iGav)
		//* Grupo
		var gCP = drawSQMA.group()
		gCP.attr({ id: 'CP_' + gIDtmp })
		//* Ponto de Rechaço
		var ellipse = drawSQMA
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
			.appendTo(drawSQMA.select('#' + 'CP_' + gIDtmp))
			.drag(cpRxMove, cpRxMoveStart, cpRxMoveStop)
		//* Pontos de Peneirado
		var ellipse = drawSQMA
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
			.appendTo(drawSQMA.select('#' + 'CP_' + gIDtmp))
			.drag(cpPnMove, cpPnMoveStart, cpPnMoveStop)
		var ellipse = drawSQMA
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
			.appendTo(drawSQMA.select('#' + 'CP_' + gIDtmp))
			.drag(cpPnMove, cpPnMoveStart, cpPnMoveStop)
	}
}

function showCtrlPts() {
	//_ console.log('showCtrlPts() ; iGav='+pad(iGav))
	//*	G00
	try {drawSQMA.select('#CP_G00').appendTo(drawSQMA)
	} catch (error) {	}
	
	//*	GAVETAS
	for (let j = nGavs; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//*	Gaveta
		try {
			drawSQMA.select('#' + gIDtmp).appendTo(drawSQMA)
		} catch (error) {}
		//*	Chaminé
		try {
			drawSQMA.select('#Cham_' + gIDtmp).appendTo(drawSQMA)
		} catch (error) {}
	}

	//* 	LINHA SELEÇÃO
	try {drawSQMA.select('#SelLin').attr({ visibility: 'visible' }).appendTo(drawSQMA)
	} catch (error) {console.log('#SelLin = null')}

	//*	LINHAS DE FLUXO
	for (let i = 4; i >= 1; i--){
		for (let j = nGavs; j > 0; j--) {
			iGav = j
			var gIDtmp = 'G' + pad(iGav)
			//*	Linhas de Peneirado
			for (let L = 1; L <= 2; L++) {
				if (mESQ[j][1 + L][0] == i) {
					//_ console.log('#Pn' + L + '_' + gIDtmp +'='+mESQ[j][1 + L][0])
					try {drawSQMA.select('#Pn' + L + '_' + gIDtmp).appendTo(drawSQMA)
						} catch (error) {console.log(`Erro: drawSQMA.select('#Pn' + ${L} + '_' + ${gIDtmp}).appendTo(drawSQMA)`)}
				}
			}
			
			//*	Linhas de Rechaço
			if (mESQ[j][1][0] == i) {
				//_ console.log('#Rx_' + gIDtmp+'='+mESQ[j][1][0])
				try {
					drawSQMA.select('#Rx_' + gIDtmp).appendTo(drawSQMA)
				} catch (error) {console.log(`Erro: drawSQMA.select('#Rx_' + ${gIDtmp}).appendTo(drawSQMA)`)}
			}
		}
	
		//*	Linha Ai
		
			try {drawSQMA.select('#Ai').appendTo(drawSQMA)
			} catch (error) { }
		
		//*	Linha Ae
		if (mESQ[0][1][0] == i) {
			try {drawSQMA.select('#Ae').appendTo(drawSQMA)
			} catch (error) { }
		}
		//*	Linha Be
		if (mESQ[0][2][0] == i) {
			try {drawSQMA.select('#Be').appendTo(drawSQMA)
			} catch (error) { }
		}
	}

	//* 	CIRC SELEÇÃO
	try {drawSQMA.select('#SelCir').attr({ visibility: 'visible' }).appendTo(drawSQMA)
	} catch (error) {console.log('#SelCir = null')}

	//*	PONTOS Ae & Be
	drawSQMA.select('#CP_A').attr({ visibility: 'visible' }).appendTo(drawSQMA)
	drawSQMA.select('#CP_B').attr({ visibility: 'visible' }).appendTo(drawSQMA)

	//*	PONTOS Rx, Pn1, Pn2
	for (let j = nGavs; j >= 1; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//* Pontos de Peneirado
		drawSQMA
			.select('#' + 'CP_Pn1_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(drawSQMA)
		drawSQMA
			.select('#' + 'CP_Pn2_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(drawSQMA)
		//*	Ponto de Rechaço
		drawSQMA
			.select('#' + 'CP_Rx_' + gIDtmp)
			.attr({ visibility: 'visible' })
			.appendTo(drawSQMA)
		}
		
	// //*	MÁSCARA SelLin
	// try {draw
	// 			.select('#maskSelLin')
	// 			.attr({ visibility: 'visible' })
	// 			.appendTo(draw)
	// } catch (error) {}	
	
}


function hideCtrlPts() {
	//_ console.log('hideCtrlPts() ; iGav='+pad(iGav))
	//* 	Lin Selec
	try {
		drawSQMA.select('#SelLin').attr({ visibility: 'hidden' })
		drawSQMA.select('#SelCir').attr({ visibility: 'hidden' })
	} catch (error) {console.log(error)}

	//* 	Pontos AB
	try {drawSQMA.select('#CP_A').attr({ visibility: 'hidden' })
		} catch (error) {}
	try {drawSQMA.select('#CP_B').attr({ visibility: 'hidden' })
		} catch (error) {}
	
	// for (let i = 4; i >= 1; i--) {
		for (let j = 32; j >= 0; j--) {
			iGav = j
			var gIDtmp = 'G' + pad(iGav)
			//* Ponto de Rechaço
			try {
				drawSQMA.select('#' + 'CP_Rx_' + gIDtmp).attr({ visibility: 'hidden' })
			} catch (error) { }
			//*  Ponto de Peneirado
			try {
				for (let l = 1; l <= 2; l++) {
					drawSQMA
						.select('#' + 'CP_Pn' + l + '_' + gIDtmp)
						.attr({ visibility: 'hidden' })
						.appendTo(drawSQMA)
				}
			} catch (error) { }
			// //* Linha de Rechaço
			// try {
			// 	draw.select('#' + 'Rx_' + gIDtmp).appendTo(draw)
			// } catch (error) { }
		}
	// }
}


//* -------------------------------------------------------------------------- */
//*                      Função desenhar gaveta em branco                      */
//* -------------------------------------------------------------------------- */

function drwGPF(xC, yC, L, H) {
	//_ console.log('drwGPF() ; iGav='+pad(iGav))
	//Borda
	var brdGav = drawSQMA
		.rect(xC - 1.25 * Larg, yC - yOff / 2, 2.5 * Larg, yOff, 5)
		.attr({
			fill: 'none',
			'fill-opacity': 0,
			stroke: 'lightgray',
			'stroke-width': 0,
		})
	brdGav.attr({ id: 'brd' + gID })
	brdGav.appendTo(drawSQMA.select('#' + gID))
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
	var polygon = drawSQMA
		.polygon(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6)
		.attr({
			fill: 'white',
			stroke: 'black',
			'stroke-width': lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
	polygon.appendTo(drawSQMA.select('#' + gID))

	//* Linhas internas
	xi = mP[0][4][0]
	yi = mP[0][4][1] //i
	var polygon = drawSQMA.polygon(x6, y6, x1, y1, xi, yi, x5, y5).attr({
		fill: 'white',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(drawSQMA.select('#' + gID))

	var polygon = drawSQMA.polygon(xi, yi, x3, y3, x4, y4, x5, y5).attr({
		fill: 'white',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(drawSQMA.select('#' + gID))

	//Canto 1
	var polygon = drawSQMA.polygon(mP[1].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(drawSQMA.select('#' + gID))

	//Canto 2
	var polygon = drawSQMA.polygon(mP[2].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(drawSQMA.select('#' + gID))

	//Canto 3
	var polygon = drawSQMA.polygon(mP[3].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(drawSQMA.select('#' + gID))

	//Canto 4
	var polygon = drawSQMA.polygon(mP[4].slice(1, 5)).attr({
		fill: 'black',
		stroke: 'black',
		'stroke-width': lwid,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round',
	})
	polygon.appendTo(drawSQMA.select('#' + gID))
}

function hideGPF() {
	//_ console.log('hideGPF() ; iGav='+pad(iGav))
	//* Ocultar Lin Selec
	try {
		drawSQMA.select('#SelLin').attr({ visibility: 'hidden' })
	} catch (error) {console.log(error)}

	//* Ocultar polígonos da gaveta
	for (let j = 32; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//* Ocultar Chaminés
		try {
			drawSQMA.select('#' + gIDtmp).attr({ visibility: 'hidden' })
			drawSQMA.select('#Cham_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		//* Ocultar Rx
		try {
			drawSQMA.select('#Rx_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		//* Ocultar Pn1
		try {
			drawSQMA.select('#Pn1_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) {}
		//* Ocultar Pn2
		try {
			drawSQMA.select('#Pn2_' + gIDtmp).attr({ visibility: 'hidden' })
		} catch (error) { }
	}

	//* Ocultar Ai
	try {
		drawSQMA.select('#Ai').attr({ visibility: 'hidden' })
	} catch (error) { }
	//* Ocultar Ae
	try {
		drawSQMA.select('#Ae').attr({ visibility: 'hidden' })
	} catch (error) { }
	//* Ocultar Be
	try {
		drawSQMA.select('#Be').attr({ visibility: 'hidden' })
	} catch (error) { }
}

function showGPF() {
	//_ console.log('showGPF() ; iGav='+pad(iGav))
	//* Ocultar Lin Selec
	try {
		drawSQMA.select('#SelLin').attr({ visibility: 'visible' }).appendTo(drawSQMA)
	} catch (error) {console.log(error)}


	//* Exibir polígonos da gaveta
	for (let j = nGavs; j >= 0; j--) {
		iGav = j
		var gIDtmp = 'G' + pad(iGav)
		//* Exibir Chaminés
		try {
			// draw.select("#" + gIDtmp).attr({ opacity: 0 })
			drawSQMA.select('#' + gIDtmp).attr({ visibility: 'visible' }).appendTo(drawSQMA)
			drawSQMA.select('#Cham_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(drawSQMA)
		} catch (error) {}
		//* Exibir Rx
		try {
			drawSQMA.select('#Rx_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(drawSQMA)
		} catch (error) {}
		//* Exibir Pn1
		try {
			drawSQMA.select('#Pn1_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(drawSQMA)
		} catch (error) {}
		//* Exibir Pn2
		try {
			drawSQMA.select('#Pn2_' + gIDtmp).attr({ visibility: 'visible' }).appendTo(drawSQMA)
		} catch (error) { }
	}

	//* Exibir Ai
	try {
		drawSQMA.select('#Ai').attr({ visibility: 'visible' }).appendTo(drawSQMA)
	} catch (error) { }
	//* Exibir Ae
	try {
		drawSQMA.select('#Ae').attr({ visibility: 'visible' }).appendTo(drawSQMA)
	} catch (error) { }
	//* Exibir Be
	try {
		drawSQMA.select('#Be').attr({ visibility: 'visible' }).appendTo(drawSQMA)
	} catch (error) { }
}

// Função desenhar chaminé
function drwCham() {
	//_ console.log('drwCham() ; iGav='+pad(iGav))
	var gID = 'G' + pad(nGav0) //ID da Gaveta
	try {
		drawSQMA.select('#Cham_' + gID).remove() //Apaga grupo existente
	} catch (error) {}
	calcMat(x0, y0 + nGav0 * yOff, Larg) //Calcula os pontos de desenho
	var gCham = drawSQMA.group() //Cria Grupo Chaminé
	gCham.attr({ id: 'Cham_' + gID }) //Atribui nome

	var polygon = drawSQMA
		.polygon(mC[nLado].slice(1, 5))
		.attr({
			fill: 'none',
			stroke: 'black',
			'stroke-width': lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#' + 'Cham_' + gID))
	if (nIE == 1 || nGav0 != nGav) {
		// polygon.attr({ fill: 'darkred' })
		polygon.attr({ fill: cCham })
	}
}

//* -------------------------------------------------------------------------- */
//*                          DESENHAR LINHA DE RECHAÇO                         */
//* -------------------------------------------------------------------------- */
//	[[x0, 10],[x0,y0 + yOff]]
function drwRX() {
	//_ console.log('drwRX() ; iGav='+pad(nGav0))
	var gID = 'G' + pad(nGav0) //ID da Gaveta
	try {
		drawSQMA.select('#Rx_' + gID).remove() //Apaga grupo existente
		drawSQMA.select('#maskRx_' + gID).remove() //Apaga grupo existente
	} catch (error) {}

	var gRx = drawSQMA.group() //Cria Grupo
	gRx.attr({ id: 'Rx_' + gID }) //Atribui nome

	let tmpIE = null
	let vLin = []
	let vLinB = []
	//* 	CASO CP INTERNO (mesmo se o Rx for externo)
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
	
	//*	CASO CP EXTERNO
	if (nIE == 1 ) {
		bRXmask = false
		tmpIE = nIE
		
		vLin.push(mG[nGav0][0][0][0])
		vLin.push(mG[nGav0][0][0][1])
		vLin.push(mG[nGav0][nLado][tmpIE][0])
		vLin.push(mG[nGav0][nLado][tmpIE][1])
		vLin.push(mG[nGav][nLado][tmpIE][0])
		vLin.push(mG[nGav][nLado][tmpIE][1])

		cLinBG = bgcolor
		//* Linha branca horizontal
		vLinB.push(mG[nGav0][nLado][0][0] + (mG[nGav0][nLado][1][0] - mG[nGav0][nLado][0][0]) * 0.32)
		vLinB.push(mG[nGav0][nLado][0][1] + (mG[nGav0][nLado][1][1] - mG[nGav0][nLado][0][1]) * 0.32)
		vLinB.push(mG[nGav0][nLado][tmpIE][0])
		vLinB.push(mG[nGav0][nLado][tmpIE][1])

		//_ if (nGav0 == nGav) {
		//_ 	vLin.push(mG[nGav][nLado][tmpIE][0])
		//_ 	vLin.push(mG[nGav][nLado][tmpIE][1] + Alt*2.5)
		//_ }

		//_ $('#z-flow-clog').html(vLin.join(", "))
	}
	
	//*	CASO CP EXTERNO E GAVETA ABAIXO
	if (nIE == 1 && nGav0 != nGav) {
		
		//* Linha branca vertical
		vLinB.push(mG[nGav0][nLado][tmpIE][0])
		vLinB.push(mG[nGav0][nLado][tmpIE][1])
		vLinB.push(mG[nGav][nLado][tmpIE][0])
		vLinB.push(mG[nGav][nLado][tmpIE][1])
	}
	
	try {vSelLin = vLin} catch (error) {console.log(error)}
	//*	DESENHAR LINHAS
	chkProdColor()
	//Linha Branca
	try {
		var polyline = drawSQMA
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: cLinBG,
				// stroke: 'red',
				strokeWidth: wLinBG * lwid,
				opacity: oLinBG,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#Rx_' + gID))
	} catch (error) {}

	//Linha de fundo escuro
	var polyline = drawSQMA
		.polyline(vLin)
		.attr({
			id: 'linRx0_' + gID,
			fill: 'none',
			stroke: cLinPR,
			strokeWidth: 1 * lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#Rx_' + gID))

	//Linha principal (animada)
	var polyline = drawSQMA
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
		.appendTo(drawSQMA.select('#Rx_' + gID))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline.attr({ strokeDashoffset: value })
		},
		Anim2
	)

	//*	CASO MÁSCARA
	if (bRXmask == true) {
		let wmask = []
		let bmask = []
		calcMat(x0, y0 + nGav0 * yOff, Larg)
		var gmRx = drawSQMA.group() //Cria Grupo
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
			case 3: //Esquerda
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
			case 4: //Trás
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
		//*	Polígono que mostra
		var pmask = drawSQMA
			.polygon(wmask)
			.attr({
				fill: 'white',
				stroke: 'white',
				strokeWidth: lwid,
				//_ opacity:0.5,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#maskRx_' + gID))

		//*	Polígono que oculta
		var pmask = drawSQMA
			.polygon(bmask)
			.attr({
				fill: 'black',
				stroke: 'black',
				strokeWidth: lwid,
				opacity: oMskGPF,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#maskRx_' + gID))
		//*	Aplica Máscara
		gRx.attr({ mask: drawSQMA.select('#maskRx_' + gID) })
	}

	//*	CASO SETA
	if ((nIE == 1 && nGav0 != nGav)  || nGav0==nGavs) {
		drwSeta(vLin[4], vLin[5], 1.2 * Alt, 2.5 * Alt, cLinRX, '#Rx_' + gID, 'arwRx_' + gID)		
	}


}


//* -------------------------------------------------------------------------- */
//*                         DESENHAR LINHA DE PENEIRADO                        */
//* -------------------------------------------------------------------------- */
function drwPN() {
	//_ console.log('drwPN() ; iGav='+pad(nGav0))
	cLinBG = bgcolor
	var gID = 'G' + pad(nGav0) 					//>	ID da Gaveta
	try {													//>	Apaga grupo existente
		drawSQMA.select('#Pn' + nPn + '_' + gID).remove()
		drawSQMA.select('#maskPn' + nPn + '_' + gID).remove()
	} catch (error) {} 								

	var gPn = drawSQMA.group() 							//>	Cria Grupo
	gPn.attr({ id: 'Pn' + nPn + '_' + gID }) //>	Atribui nome

	let tmpIE = null
	let vLinPn = []
	let vLinPr = []
	let vLinB = []
	vLinPn.push(mG[nGav0][0][0][0])
	vLinPn.push(mG[nGav0][0][0][1] - 0.5 * Alt)	//> Importante. Evita mask clipping.
	
	//*	CASO CP EXTERNO
	if (nIE == 1) {
		tmpIE = nIE
		vLinPn.push(mG[nGav0][0][0][0])
		vLinPn.push(mG[nGav0][0][0][1] + Alt)
		vLinPn.push(mG[nGav0][nLado][tmpIE][0])
		vLinPn.push(mG[nGav0][nLado][tmpIE][1] + Alt)
		
		
		vLinB.push(mG[nGav0][0][0][0])
		vLinB.push(mG[nGav0][0][0][1] + Alt)
		vLinB.push(mG[nGav0][nLado][tmpIE][0])
		vLinB.push(mG[nGav0][nLado][tmpIE][1] + Alt)

		if (nGav0 != nGav) {
			try {
				vLinPr.push(mG[nGav0][nLado][tmpIE][0])
				vLinPr.push(mG[nGav0][nLado][tmpIE][1] + Alt)
				vLinPr.push(mG[nGav][nLado][tmpIE][0])
				vLinPr.push(mG[nGav][nLado][tmpIE][1] + Alt)
				
				vLinB.push(vLinPr[0])
				vLinB.push(vLinPr[1])
				vLinB.push(vLinPr[2])
				vLinB.push(vLinPr[3])
				
			} catch (error) {console.log(error)}
		}

		//_ console.log(vLinPn)
		//_ console.log(vLinPr)
		//_ console.log(vLinB)
	}

	//*	CASO CP INTERNO E LADO != CENTRO
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

	//> Se saída por baixo
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

		var r = drawSQMA
			.polygon(vBaixo)
			.attr({ id: 'PnD' + nPn + '_' + gID, fill: patPn })
			.appendTo(drawSQMA.select('#Pn' + nPn + '_' + gID))
	}
	//> Se em direção ao fundo
	if (nIE == 1 && nGav0 != nGav) {
		
		
	}

	vSelLin = []
	vSelLin.push(vLinPn)
	try {
		vSelLin.push(vLinPr)
	} catch (error) {}
	//*	DESENHAR LINHAS
	chkProdColor()
	//Linha Branca
	try {
		var polyline = drawSQMA
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: cLinBG,
				strokeWidth: wLinBG * lwid,
				opacity: oLinBG,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#Pn' + nPn + '_' + gID))
	} catch (error) {console.log(error)}

	//Linha principal (animada)
	var polyline1 = drawSQMA
		.polyline(vLinPn)
		.attr({
			id: 'linPn'+nPn+'_' + gID,
			fill: 'none',
			stroke: cLinPN,
			strokeWidth: 1.6 * lwid,
			strokeDasharray: strDashPN,
			strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#Pn' + nPn + '_' + gID))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline1.attr({ strokeDashoffset: value })
		},
		Anim2
	)


	//Linha de produto (animada)
	if (nGav0 != nGav) {
		var polyline2 = drawSQMA
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
			.appendTo(drawSQMA.select('#Pn' + nPn + '_' + gID))
		Snap.animate(
			Anim0,
			Anim1,
			function (value) {
				polyline2.attr({ strokeDashoffset: value })
			},
			Anim2
			)
	}

	//*	MÁSCARA (GAVETA)
	//_ console.log('nGav0 = ' + nGav0)
	//_ console.log('gID = ' + gID)
	
		let wmask = []
		let bmask = []
		calcMat(x0, y0 + nGav0 * yOff, Larg)
		var gmPn = drawSQMA.group() //Cria Grupo
		gmPn.attr({ id: 'maskPn'+nPn+'_' + gID }) //Atribui nome
		
		//*	Polígono que mostra
		wmask.push(0)
		wmask.push(0)
		wmask.push(A4x)
		wmask.push(0)
		wmask.push(A4x)
		wmask.push(A4y)
		wmask.push(0)
		wmask.push(A4y)

		//*	Polígono que oculta
		bmask.push(mP[0][1][0])
		bmask.push(mP[0][1][1]+Alt)
		bmask.push(mP[0][1][0])
		bmask.push(mP[0][1][1])
		bmask.push(mP[0][2][0])
		bmask.push(mP[0][2][1])
		bmask.push(mP[0][3][0])
		bmask.push(mP[0][3][1])
		bmask.push(mP[0][3][0])
		bmask.push(mP[0][3][1]+Alt)
		bmask.push(mP[0][4][0])
		bmask.push(mP[0][4][1]+Alt)
		//_ console.log(bmask)
	
		//*	Polígono que mostra
		var pmask = drawSQMA
			.polygon(wmask)
			.attr({
				fill: 'white',
				stroke: 'white',
				strokeWidth: lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#maskPn'+nPn+'_' + gID))

		//*	Polígono que oculta
		var pmask = drawSQMA
			.polygon(bmask)
			.attr({
				fill: 'black',
				opacity: oMskGPF,
				stroke: 'black',
				strokeWidth: lwid,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#maskPn'+nPn+'_' + gID))
		//*	Aplica Máscara
		gPn.attr({ mask: drawSQMA.select('#maskPn'+nPn+'_' + gID) })
	



	//* CASO SETA
	if (nIE == 1 && nGav0 != nGav) {
		drwSeta(vLinPr[2], vLinPr[3], 1.2 * Alt, 2.5 * Alt, cLinPN, '#Pn' + nPn + '_' + gID, 'arwPn'+nPn+'_' + gID)
	}
}


//* -------------------------------------------------------------------------- */
//*                         DESENHAR LINHAS DE PRODUTO                         */
//* -------------------------------------------------------------------------- */
function drwAi() {
	//*	DEFINE G00 - GAVETA 0: ENTRADAS DE PRODUTO NO CANAL (Ai, Ae, Be)

	var gAi = drawSQMA.group() //Cria Grupo
	gAi.attr({ id: 'Ai'}) //Atribui nome

	//*	'Ai' - SEMPRE PRESENTE
	//Linha de fundo escuro
	var polyline = drawSQMA
		.polyline([[x0, y0],[x0,y0 + yOff]])
		.attr({
			fill: 'none',
			stroke: cLinPRa,
			strokeWidth: 1 * lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#Ai'))

	//Linha principal (animada)
	var polyline = drawSQMA
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
		.appendTo(drawSQMA.select('#Ai'))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline.attr({ strokeDashoffset: value })
		},
		Anim2
	)

}

function drwAe() {
	//_ console.log('drwAe()')
	try {
		drawSQMA.select('#Ae').remove() //Apaga grupo existente
		drawSQMA.select('#maskAe').remove() //Apaga grupo existente
	} catch (error) {}

	var gAe = drawSQMA.group() //Cria Grupo
	gAe.attr({ id: 'Ae' }) //Atribui nome

	let tmpIE = 0
	let vLin = []
	let vLinB = []
	//* CASO EXISTA
	if (nGav != nGav0) {
		
		tmpIE = 1
		bRXmask = false
		cLinBG = bgcolor
			
		let Gav0 = 0
		// let Gav1 = 1
		let fYOff = 0.5*yOff		//> Em % do yOff
		
		//* Linha branca de cima
		if (nLado!=1) {			//> Pela frente bagunça a gaveta
			vLinB.push(mG[Gav0][0][0][0])
			vLinB.push(mG[Gav0][0][0][1]+fYOff)
			vLinB.push(mG[Gav0][nLado][tmpIE][0])
			vLinB.push(mG[Gav0][nLado][tmpIE][1]+fYOff)
		}
		//* Linha branca vertical
		vLinB.push(mG[Gav0][nLado][tmpIE][0])
		vLinB.push(mG[Gav0][nLado][tmpIE][1]+fYOff)
		vLinB.push(mG[nGav][nLado][tmpIE][0])
		vLinB.push(mG[nGav][nLado][tmpIE][1])
		//* Linha branca de baixo
		vLinB.push(mG[nGav][nLado][0][0] + (mG[nGav][nLado][1][0] - mG[nGav][nLado][0][0]) * 0.32)
		vLinB.push(mG[nGav][nLado][0][1] + (mG[nGav][nLado][1][1] - mG[nGav][nLado][0][1]) * 0.32)
		vLinB.push(mG[nGav][nLado][tmpIE][0])
		vLinB.push(mG[nGav][nLado][tmpIE][1])

		vLin.push(mG[Gav0][0][0][0])
		vLin.push(mG[Gav0][0][0][1]+fYOff)
		vLin.push(mG[Gav0][nLado][tmpIE][0])
		vLin.push(mG[Gav0][nLado][tmpIE][1]+fYOff)
		vLin.push(mG[nGav][nLado][tmpIE][0])
		vLin.push(mG[nGav][nLado][tmpIE][1])
		vLin.push(mG[nGav][0][0][0])
		vLin.push(mG[nGav][0][0][1])
	}
	
	
	try { vSelLin = vLin } catch (error) { console.log(error) }
	
	//*	DESENHAR LINHAS
	//_chkProdColor()
	cLinPR = cLinPRa 
	cLinRX = cLinRXa
	cLinPN = cLinPNa
	patPn	 =	patPna
	//Linha Branca
	try {
		var polyline = drawSQMA
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: cLinBG,
				// stroke: 'red',
				strokeWidth: wLinBG * lwid,
				opacity: oLinBG,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#Ae'))
	} catch (error) {}

	//Linha de fundo escuro
	var polyline = drawSQMA
		.polyline(vLin)
		.attr({
			id: 'linAe0',
			fill: 'none',
			stroke: cLinPR,
			strokeWidth: 1 * lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#Ae'))

	//Linha principal (animada)
	var polyline = drawSQMA
		.polyline(vLin)
		.attr({
			id: 'linAe1',
			fill: 'none',
			stroke: cLinPR,
			strokeWidth: 2 * lwid,
			strokeDasharray: strDashRX,
			strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#Ae'))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline.attr({ strokeDashoffset: value })
		},
		Anim2
	)



}

function drwBe() {
	//_ console.log('drwBe()')
	try {
		drawSQMA.select('#Be').remove() //Apaga grupo existente
		drawSQMA.select('#maskBe').remove() //Apaga grupo existente
	} catch (error) {}

	var gBe = drawSQMA.group() //Cria Grupo
	gBe.attr({ id: 'Be' }) //Atribui nome

	let tmpIE = 0
	let vLin = []
	let vLinB = []
	//* CASO EXISTA
	if (nGav != nGav0) {
		
		tmpIE = 1
		bRXmask = false
		cLinBG = bgcolor
			
		let Gav0 = 0
		let fXOff = 15				//> Em pixels
		let fYOff = 0.5*yOff
		switch (nLado) {
			case 1:
				fYOff = 0.2*yOff
			case 3:
				fXOff = -fXOff				//> Em pixels
				break;
			default:
				break;
		}
			
		let fYOff0 = fYOff
		if (nLado == 1 || nLado == 4) {
			fYOff0 = fYOff -fXOff*sk/8 //_ + 12.5		//> Em % do yOff
		}

		
		//* Linha branca de cima
		vLinB.push(mG[Gav0][0][0][0]+fXOff)
		vLinB.push(mG[Gav0][0][0][1])
		vLinB.push(mG[Gav0][0][0][0]+fXOff)
		vLinB.push(mG[Gav0][0][0][1]+fYOff0)
		vLinB.push(mG[Gav0][nLado][tmpIE][0])
		vLinB.push(mG[Gav0][nLado][tmpIE][1]+fYOff)
		//* Linha branca vertical
		vLinB.push(mG[Gav0][nLado][tmpIE][0])
		vLinB.push(mG[Gav0][nLado][tmpIE][1]+fYOff)
		vLinB.push(mG[nGav][nLado][tmpIE][0])
		vLinB.push(mG[nGav][nLado][tmpIE][1])
		//* Linha branca de baixo
		vLinB.push(mG[nGav][nLado][0][0] + (mG[nGav][nLado][1][0] - mG[nGav][nLado][0][0]) * 0.32)
		vLinB.push(mG[nGav][nLado][0][1] + (mG[nGav][nLado][1][1] - mG[nGav][nLado][0][1]) * 0.32)
		vLinB.push(mG[nGav][nLado][tmpIE][0])
		vLinB.push(mG[nGav][nLado][tmpIE][1])

		vLin.push(mG[Gav0][0][0][0]+fXOff)
		vLin.push(mG[Gav0][0][0][1])
		vLin.push(mG[Gav0][0][0][0]+fXOff)
		vLin.push(mG[Gav0][0][0][1]+fYOff0)
		vLin.push(mG[Gav0][nLado][tmpIE][0])
		vLin.push(mG[Gav0][nLado][tmpIE][1]+fYOff)
		vLin.push(mG[nGav][nLado][tmpIE][0])
		vLin.push(mG[nGav][nLado][tmpIE][1])
		vLin.push(mG[nGav][0][0][0])
		vLin.push(mG[nGav][0][0][1])
	}
	
	
	try {vSelLin = vLin} catch (error) {console.log(error)}
	//*	DESENHAR LINHAS
	//_chkProdColor()
	cLinPR = cLinPRb 
	cLinRX = cLinRXb
	cLinPN = cLinPNb
	patPn	 =	patPnb
	//Linha Branca
	try {
		var polyline = drawSQMA
			.polyline(vLinB)
			.attr({
				fill: 'none',
				stroke: cLinBG,
				// stroke: 'red',
				strokeWidth: wLinBG * lwid,
				opacity: oLinBG,
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
			})
			.appendTo(drawSQMA.select('#Be'))
	} catch (error) {}

	//Linha de fundo escuro
	var polyline = drawSQMA
		.polyline(vLin)
		.attr({
			id: 'linBe0',
			fill: 'none',
			stroke: cLinPR,
			strokeWidth: 1 * lwid,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#Be'))

	//Linha principal (animada)
	var polyline = drawSQMA
		.polyline(vLin)
		.attr({
			id: 'linBe1',
			fill: 'none',
			stroke: cLinPR,
			strokeWidth: 2 * lwid,
			strokeDasharray: strDashRX,
			strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#Be'))
	Snap.animate(
		Anim0,
		Anim1,
		function (value) {
			polyline.attr({ strokeDashoffset: value })
		},
		Anim2
	)



}


//* -------------------------------------------------------------------------- */
//*                          DESENHAR LINHA DE SELEÇÃO                         */
//* -------------------------------------------------------------------------- */

function drwSelLin() {
	//_ console.log('drwSelLin()')
	try {
		drawSQMA.select('#circleSel1').remove() 
		drawSQMA.select('#SelLin').remove() 		//> Apaga grupo existente
		drawSQMA.select('#maskSelLin').remove() //> Apaga grupo existente
		drawSQMA.select('#SelCir').remove() 		//> Apaga grupo existente
	} catch (error) {}

	var gSL = drawSQMA.group() 				//> Cria Grupo
	gSL.attr({ id: 'SelLin' }) 		//> Atribui nome
	var gmSL = drawSQMA.group() 			//> Cria Grupo
	gmSL.attr({ id: 'maskSelLin' }) 	//> Atribui nome
	var gSC = drawSQMA.group() 				//> Cria Grupo
	gSC.attr({ id: 'SelCir' }) 		//> Atribui nome

	

	//*	DESENHAR LINHAS
	var SLwid = 5*lwid
	var fWid = 2
	
	var wSL = wLinBG*lwid+10
	var wSC = lwid
	var fSL = 1.5 //fWid
	var fSC = 1.25

	var polyline = drawSQMA	//> Linha Externa
		.polyline(vSelLin)
		.attr({
			id: 'linSel1',
			fill: 'none',
			stroke: cLinSel,
			strokeWidth: wSL,
			opacity: 0.5,
			//_ strokeDasharray: strDashRX,
			//_ strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#SelLin'))
	var polyline = drawSQMA	//> Linha Branca
		.polyline(vSelLin)
		.attr({
			id: 'linSel1',
			fill: 'none',
			stroke: cLinBG,
			strokeWidth: wLinBG*lwid+4,
			opacity: 0.8,
			//_ strokeDasharray: strDashRX,
			//_ strokeDashoffset: 0,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
		})
		.appendTo(drawSQMA.select('#SelLin'))
		
	// var polyline = draw	//> Linha interna que exibe
	// 	.polyline(vSelLin)
	// 	.attr({
	// 		id: 'linSelW',
	// 		fill: 'none',
	// 		stroke: 'white',
	// 		strokeWidth: 50,
	// 		opacity: 1,
	// 		//_ strokeDasharray: strDashRX,
	// 		//_ strokeDashoffset: 0,
	// 		'stroke-linecap': 'round',
	// 		'stroke-linejoin': 'round',
	// 	})
	// 	.appendTo(draw.select('#maskSelLin'))
	// var polyline = draw	//> Linha interna que oculta
	// 	.polyline(vSelLin)
	// 	.attr({
	// 		id: 'linSelB',
	// 		fill: 'none',
	// 		stroke: 'black',
	// 		strokeWidth: wLinBG*lwid+3,
	// 		opacity: 1,
	// 		//_ strokeDasharray: strDashRX,
	// 		//_ strokeDashoffset: 0,
	// 		'stroke-linecap': 'round',
	// 		'stroke-linejoin': 'round',
	// 	})
	// 	.appendTo(draw.select('#maskSelLin'))
		
	
	 var ellipse = drawSQMA
		.ellipse(0, 0, 1.5*Alt, 1.5*Alt)
		.attr({
			transform: 'T' + xT + ',' + yT,
			id: 'circleSel1',
			fill: 'none',
			stroke: cLinSel,
			strokeWidth: wSC,
			opacity: 0.5,
		})
		.appendTo(drawSQMA.select('#SelCir'))

	
	//_ var gSL = Snap.select('#SelLin')
	var linSL = gSL.select('#linSel1')
	var cirSL = gSC.select('#circleSel1')
	
	linSLAnimation()
	function linSLAnimation() {
		fSL = 1 / fSL
		wSL = wSL * fSL
		//_ wSL = wSL + fSL
		linSL.stop().animate(
			{ strokeWidth: wSL}, 
			800,
			function(){ 
				linSL.attr({ strokeWidth: wSL })
				linSLAnimation()
			}
			)
	}

	 cirSLAnimation()
	 function cirSLAnimation() {
	 	fSC = 1 / fSC
	 	wSC = wSC * fSC
	 	cirSL.stop().animate(
	 		{ transform: 'T'+xT+','+yT+'S'+fSC+' '+xT+' '+yT}, 
	 		800,
	 		function(){ 
	 			cirSL.attr({ transform: 'T'+xT+','+yT+'S'+fSC+' '+xT+' '+yT})
	 			cirSLAnimation()
			  },
				mina.linear() 
	 		)
	 }

	//* MÁSCARA
	// gSL.attr({ mask: draw.select('#maskSelLin'), 'mask-clip': 'stroke-box'})

}



//* -------------------------------------------------------------------------- */
//*                          DESENHAR ÁREAS DE POSIÇÃO                         */
//* -------------------------------------------------------------------------- */
function drwAreas() {
	var r = 8
	let dOp = 0
	var circle = drawSQMA
		.circle(mF[1][0][0], mF[1][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp })
		.hover(FiHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
	var circle = drawSQMA
		.circle(mF[2][0][0], mF[2][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp })
		.hover(DiHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
	var circle = drawSQMA
		.circle(mF[3][0][0], mF[3][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp })
		.hover(EiHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
	var circle = drawSQMA
		.circle(mF[4][0][0], mF[4][0][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp })
		.hover(TiHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
	var r = 10
	var circle = drawSQMA
		.circle(mF[1][1][0], mF[1][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp })
		.hover(FeHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
	var circle = drawSQMA
		.circle(mF[2][1][0], mF[2][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp })
		.hover(DeHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
	var circle = drawSQMA
		.circle(mF[3][1][0], mF[3][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp })
		.hover(EeHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
	var circle = drawSQMA
		.circle(mF[4][1][0], mF[4][1][1], r)
		.attr({ fill: 'gray', stroke: 'none', 'stroke-width': 0, opacity: dOp }) //Verificar
		.hover(TeHoverIN, ladoHoverOUT)
		.appendTo(drawSQMA.select('#' + gID))
}


function gHoverIN() {
	gIDhover = this.attr('id')
	// sGavHover.attr({'text': gIDhover + "" + sLado})
}

function gHoverOUT() {
	gIDhover = this.attr('id')
	// sGavHover.attr({ text: '' })
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


//* -------------------------------------------------------------------------- */
//*                         DESENHAR SETA PARA DESTINO                         */
//* -------------------------------------------------------------------------- */

function drwSeta(x, y, w, h, clr, grp, id) {
	var seta = drawSQMA
		.polygon(x, y, x - w / 2, y, x, y + h, x + w / 2, y)
		.attr({
			id,
			fill: clr,
			stroke: 'white',
			'stroke-width': 0,
			'stroke-linecap': 'miter',
			'stroke-linejoin': 'miter',
		})
		.appendTo(drawSQMA.select(grp))
}


//* -------------------------------------------------------------------------- */
//*                                 RECONSTRUIR                                */
//* -------------------------------------------------------------------------- */
function rebuildGPF() {
	//*	Oculta tudo
	hideGPF()
	hideGuias()
	hideCtrlPts()
	hideSlider()
	
	//*	Exibe o que precisa
	showSlider()
	showGPF()
	showGuias()
	showCtrlPts()
	//!	Colocado nessa ordem, para resolver o prob da linha de Pn acima da gaveta
	if (bEditMode == false) {		
			hideGuias()
			hideCtrlPts()
	}
}





//* -------------------------------------------------------------------------- */
//*                                    INIT                                    */
//* -------------------------------------------------------------------------- */

try {
	isDev ? $('#divMAT').show() : $('#divMAT').hide()
	isDev ? $('#divCUT').show() : $('#divCUT').hide()
} catch (error) {}

//*	ITERAÇÕES


	for (var i = nGavs; i >= 1; i--) {
		iGav = i
		var gID = 'G' + pad(iGav)
		
		//* --------- POINTS ---------- */
		calcMat(x0, y0 + yOff * i, Larg, i)
		
		//* --------- BLANK ---------- */
		var gGav = drawSQMA.group()
		gGav.attr({ id: gID })
		drwGPF(x0, y0 + yOff * i, Larg, Alt, i)
		drawSQMA.select('#' + gID).hover(gHoverIN, gHoverOUT)
		drawSQMA.select('#' + gID).click(clkSelGav)
		
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


	drwAi()
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
	
	
	
	
	
	
	
	
	
	
	

