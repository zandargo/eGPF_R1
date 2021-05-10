async function evalSQMAdata(db) {
	console.log('evalSQMAdata(): start')

	//*	Coletar
	sSQL = `SELECT * FROM Reg_SQMA WHERE Key LIKE '%${nSQMA}${nRev}%'`
	dbSQMA = await db.all(sSQL)
	sSQL = `SELECT * FROM Reg_SQMA_GPF WHERE Key LIKE '${nSQMA}${nRev}%'`
	dbGPF = await db.all(sSQL)
	dbGPF.unshift('')
	await db.close()
	db = null
	//*	Processar
	nGavs = parseInt(dbSQMA[0].nGav, 10)

	//*	Ai
	if (dbSQMA[0].Abert1 != '') {
		nGav0 = 1
		nGav = 1
		nLado = nLadoStr2Int(dbSQMA[0].Abert1)
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
	if (dbSQMA[0].Abert2 != '') {
		nGav0 = 0
		nLado = nLadoStr2Int(dbSQMA[0].Abert2)
		nPara = dbSQMA[0].Para2
		nPara = parseInt(nPara.substr(1), 10)
		nIE = 1
		nGav = nPara
		sCPtype = 'Pr'
		mESQ[0][1][0] = nLado	//> nLado
		mESQ[0][1][1] = nPara	//> nPara
		mESQ[0][1][2] = nIE		//> nIE
		objCP = drawSQMA
			.select('#CP_A')
			.transform('t' + mG[nPara][nLado][0][0] + ',' + mG[nPara][nLado][0][1])
		propagate()
		reColor()
		drwAe()
	}

	//*	Be
	if (dbSQMA[0].Abert3 != '') {
		nGav0 = 0
		nLado = nLadoStr2Int(dbSQMA[0].Abert3)
		nPara = dbSQMA[0].Para3
		nPara = parseInt(nPara.substr(1), 10)
		nIE = 1
		nGav = nPara
		sCPtype = 'Pr'
		mESQ[0][2][0] = nLado	//> nLado
		mESQ[0][2][1] = nPara	//> nPara
		mESQ[0][2][2] = nIE		//> nIE
		objCP = drawSQMA
			.select('#CP_B')
			.transform('t' + mG[nPara][nLado][0][0] + ',' + mG[nPara][nLado][0][1])
		propagate()
		reColor()
		drwBe()
	}

	//*	Desvios Verticais
	if (dbSQMA[0].F1 == dbSQMA[0].F2 && dbSQMA[0].F1!='' && dbSQMA[0].F2!='') { aDESV[1] = [1, 0, 0] }
	if (dbSQMA[0].D1 == dbSQMA[0].D2 && dbSQMA[0].D1!='' && dbSQMA[0].D2!='') { aDESV[2] = [1, 0, 0] }
	if (dbSQMA[0].E1 == dbSQMA[0].E2 && dbSQMA[0].E1!='' && dbSQMA[0].E2!='') { aDESV[3] = [1, 0, 0] }
	if (dbSQMA[0].T1 == dbSQMA[0].T2 && dbSQMA[0].T1!='' && dbSQMA[0].T2!='') { aDESV[4] = [1, 0, 0] }

	//*	Fundo
	if (dbSQMA[0].F1 != '') {
		mActBTM[1][0][0] = 1
		mActBTM[1][0][1] = 1
		mActBTM[1][0][6] = dbSQMA[0].F1
	}
	if (dbSQMA[0].F2 != '') {
		mActBTM[1][1][0] = 1
		mActBTM[1][1][1] = 1
		mActBTM[1][1][6] = dbSQMA[0].F2
	}
	if (dbSQMA[0].D1 != '') {
		mActBTM[2][0][0] = 1
		mActBTM[2][0][1] = 1
		mActBTM[2][0][6] = dbSQMA[0].D1
	}
	if (dbSQMA[0].D2 != '') {
		mActBTM[2][1][0] = 1
		mActBTM[2][1][1] = 1
		mActBTM[2][1][6] = dbSQMA[0].D2
	}
	if (dbSQMA[0].E1 != '') {
		mActBTM[3][0][0] = 1
		mActBTM[3][0][1] = 1
		mActBTM[3][0][6] = dbSQMA[0].E1
	}
	if (dbSQMA[0].E2 != '') {
		mActBTM[3][1][0] = 1
		mActBTM[3][1][1] = 1
		mActBTM[3][1][6] = dbSQMA[0].E2
	
	}
	if (dbSQMA[0].T1 != '') {
		mActBTM[4][0][0] = 1
		mActBTM[4][0][1] = 1
		mActBTM[4][0][6] = dbSQMA[0].T1
	}
	if (dbSQMA[0].T2 != '') {
		mActBTM[4][1][0] = 1
		mActBTM[4][1][1] = 1
		mActBTM[4][1][6] = dbSQMA[0].T2
	}
	$('#nGavs').html(`${pad(nGavs)}`)
	$('#nGav-slider').val(nGavs)
			

	//*	DA PRIMEIRA À PENÚLTIMA
	for (let g = 1; g < nGavs; g++) {
		let hGav = parseInt(dbGPF[g].HGav, 10)
		mESQ[g][0][0] = hGav
		let sCod = dbGPF[g].CodGav
		nGav0 = g

		//* DV e Saídas
		for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
			if (dbGPF[g][`Desv_${nLadoInt2Str(tmpLado)}`].charAt(1)=='V') {
				aDESV[tmpLado] = [1, 1, 0]
			}
		}
		
		//* Rx
		if (g >= 2 && g<=nGavs) {	//> A partir da G02
			nLado = dbGPF[g].RxPos
			nLado = nLadoStr2Int(nLado.charAt(0))
			nPara = dbGPF[g].RxPara
			nIE = 0
			nFND = 0
			//> Traduzir metodologia Excel --> Electron
			if (dbGPF[g].RxPara != '') {
				if (nPara.charAt(0) != 'G') {		//> Se manda para o fundo
					nIE = 1
					nGav = g + 1 //! Verificar 
					
					if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {
						nFND = 100*nLado+3
					} else if (aDESV[nLado][0]==1 && aDESV[nLado][1]==1) {
						nFND = 100*nLado + parseInt(nPara.charAt(1),10)
					}
					nPara = nGav
					sAB = ''

					mActBTM[nLado][parseInt(dbGPF[g]['RxPara'].charAt(1), 10) - 1][4] = g
					
				} else {									//> Se manda para G##
					nGav = parseInt(nPara.substr(1), 10)
					if (dbGPF[nGav].Pr1Pos != `${dbGPF[g].RxPos.charAt(0)}E` &&	//>Se dest não recebe RxExt
					dbGPF[nGav].Pr2Pos != `${dbGPF[g].RxPos.charAt(0)}E`) {
						nIE = 1
						if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
							nFND = 100*nLado+3
						} else {
							nFND = 100*nLado + parseInt(dbGPF[nGav].RxPara.substr(1),10)
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
		if (dbGPF[g].Pn1Pos != '') {
			nPn = 1
			nLado = dbGPF[g].Pn1Pos
			nLado = nLadoStr2Int(nLado.charAt(0))
			nPara = dbGPF[g].Pn1Para
			
			if(nPara!='') {
				nFND = 0
				//> Traduzir metodologia Excel --> Electron
					if (nPara.charAt(0) != 'G') {		//> Se manda para o fundo
						nIE = 1
						nGav = g
						nPara = nGav
						mActBTM[nLado][parseInt(dbGPF[g]['Pn1Para'].charAt(1), 10) - 1][4] = g
					} else {									//> Se manda para G##
						nGav = parseInt(nPara.substr(1), 10)
						if (dbGPF[nGav].Pr1Pos != `${dbGPF[g].Pn1Pos.charAt(0)}E` &&	//>Se dest não recebe Ext
						dbGPF[nGav].Pr2Pos != `${dbGPF[g].Pn1Pos.charAt(0)}E`) {
							nIE = 1
							if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
								nFND = 100*nLado+3
							} else {
								nFND = 100*nLado + parseInt(dbGPF[nGav].Pn1Para.substr(1),10)
							}
							// nGav++
							nPara = nGav
						} else {
							nIE = 0
							nPara = nGav
						}
					}

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
		if (dbGPF[g].Pn2Pos != '') {
			nPn = 2
			nLado = dbGPF[g].Pn2Pos
			nLado = nLadoStr2Int(nLado.charAt(0))
			nPara = dbGPF[g].Pn2Para
			
			if(nPara!='') {
				nFND = 0
				//> Traduzir metodologia Excel --> Electron
					if (nPara.charAt(0) != 'G') {		//> Se manda para o fundo
						nIE = 1
						nGav = g + 1
						if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {
							nFND = 100*nLado+3
						} else {
							nFND = 100*nLado + parseInt(nPara.charAt(1),10)
						}
						nPara = nGav
						mActBTM[nLado][parseInt(dbGPF[g]['Pn2Para'].charAt(1), 10) - 1][4] = g
					} else {									//> Se manda para G##
						nGav = parseInt(nPara.substr(1), 10)
						if (dbGPF[nGav].Pr1Pos != `${dbGPF[g].Pn2Pos.charAt(0)}E` &&	//>Se dest não recebe Ext
						dbGPF[nGav].Pr2Pos != `${dbGPF[g].Pn2Pos.charAt(0)}E`) {
							nIE = 1
							if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
								nFND = 100*nLado+3
							} else {
								nFND = 100*nLado + parseInt(dbGPF[nGav].Pn2Para.substr(1),10)
							}
							nGav++
							nPara = nGav
						} else {
							nIE = 0
							nPara = nGav
						}
					}

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


			
			
	console.log('evalSQMAdata(): end')
	return 1
}
