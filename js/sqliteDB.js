//* -------------------------------------------------------------------------- */
//*                               FUNÇÕES GERAIS                               */
//* -------------------------------------------------------------------------- */
async function createDbConnection(filename) {
	return open({
		filename,
		driver: sqlite3.Database
	})
}



//* -------------------------------------------------------------------------- */
//*                         CARREGEGAR DADOS DE ESQUEMA                        */
//* -------------------------------------------------------------------------- */
async function LoadSQMAdata() {
	console.log('LoadSQMAdata(): start')
	try {
		sqlite3.verbose()
		//*	Conectar
		var gpfDB = await createDbConnection('./data/SB_FTP_PLANSICHTER.db')
		console.log('Connected to the Plansichter database.')
		//*	Coletar / Processar
		var res_processDB = await evalSQMAdata(gpfDB)
		console.log("res_processDB = " + res_processDB)

		gpfDB = null
		return 1
	} catch (error) {
		console.error(error)
	}
	console.log('LoadSQMAdata(): end')
}


async function evalSQMAdata(db) {
	console.log('evalSQMAdata(): start')

	//*	Coletar
	sSQL = `SELECT * FROM Reg_SQMA WHERE Key LIKE '%${nSQMA}${nRev}%'`
	var sqma = await db.all(sSQL)
	sSQL = `SELECT * FROM Reg_SQMA_GPF WHERE Key LIKE '${nSQMA}${nRev}%'`
	var gpf = await db.all(sSQL)
	gpf.unshift('')
	await db.close()
	db = null
	//*	Processar
	nGavs = parseInt(sqma[0].nGav, 10)

	//*	Ai
	if (sqma[0].Abert1 != '') {
		nGav0 = 1
		nGav = 1
		nLado = nLadoStr2Int(sqma[0].Abert1)
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
	if (sqma[0].Abert2 != '') {
		nGav0 = 0
		nLado = nLadoStr2Int(sqma[0].Abert2)
		nPara = sqma[0].Para2
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
	if (sqma[0].Abert3 != '') {
		nGav0 = 0
		nLado = nLadoStr2Int(sqma[0].Abert3)
		nPara = sqma[0].Para3
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
	if (sqma[0].F1 == sqma[0].F2 && sqma[0].F1!='' && sqma[0].F2!='') { aDESV[1] = [1, 0, 0] }
	if (sqma[0].D1 == sqma[0].D2 && sqma[0].D1!='' && sqma[0].D2!='') { aDESV[2] = [1, 0, 0] }
	if (sqma[0].E1 == sqma[0].E2 && sqma[0].E1!='' && sqma[0].E2!='') { aDESV[3] = [1, 0, 0] }
	if (sqma[0].T1 == sqma[0].T2 && sqma[0].T1!='' && sqma[0].T2!='') { aDESV[4] = [1, 0, 0] }

	//*	Fundo
	if (sqma[0].F1 != '') {
		mActBTM[1][0][0] = 1
		mActBTM[1][0][1] = 1
		mActBTM[1][0][6] = sqma[0].F1
	}
	if (sqma[0].F2 != '') {
		mActBTM[1][1][0] = 1
		mActBTM[1][1][1] = 1
		mActBTM[1][1][6] = sqma[0].F2
	}
	if (sqma[0].D1 != '') {
		mActBTM[2][0][0] = 1
		mActBTM[2][0][1] = 1
		mActBTM[2][0][6] = sqma[0].D1
	}
	if (sqma[0].D2 != '') {
		mActBTM[2][1][0] = 1
		mActBTM[2][1][1] = 1
		mActBTM[2][1][6] = sqma[0].D2
	}
	if (sqma[0].E1 != '') {
		mActBTM[3][0][0] = 1
		mActBTM[3][0][1] = 1
		mActBTM[3][0][6] = sqma[0].E1
	}
	if (sqma[0].E2 != '') {
		mActBTM[3][1][0] = 1
		mActBTM[3][1][1] = 1
		mActBTM[3][1][6] = sqma[0].E2
	
	}
	if (sqma[0].T1 != '') {
		mActBTM[4][0][0] = 1
		mActBTM[4][0][1] = 1
		mActBTM[4][0][6] = sqma[0].T1
	}
	if (sqma[0].T2 != '') {
		mActBTM[4][1][0] = 1
		mActBTM[4][1][1] = 1
		mActBTM[4][1][6] = sqma[0].T2
	}
	$('#nGavs').html(`${pad(nGavs)}`)
	$('#nGav-slider').val(nGavs)
			

	//*	DA PRIMEIRA À ÚLTIMA
	for (let g = 1; g <= nGavs; g++) {
		let hGav = parseInt(gpf[g].HGav, 10)
		mESQ[g][0][0] = hGav
		let sCod = gpf[g].CodGav
		nGav0 = g
		//* Rx
		if (g >= 2 && g<=nGavs) {	//> A partir da G02
			nLado = gpf[g].RxPos
			nLado = nLadoStr2Int(nLado.charAt(0))
			nPara = gpf[g].RxPara
			nIE = 0
			nFND = 0
			//> Traduzir metodologia Excel --> Electron
			if (gpf[g].RxPos.charAt(1) == 'E') {
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
				} else {									//> Se manda para G##
					nGav = parseInt(nPara.substr(1), 10)
					if (gpf[nGav].Pr1Pos != `${gpf[g].RxPos.charAt(0)}E` &&	//>Se dest não recebe RxExt
					gpf[nGav].Pr2Pos != `${gpf[g].RxPos.charAt(0)}E`) {
						nIE = 1
						if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
							nFND = 100*nLado+3
						} else {
							nFND = 100*nLado + parseInt(gpf[nGav].RxPara.substr(1),10)
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
		if (gpf[g].Pn1Pos != '') {
			nPn = 1
			nLado = gpf[g].Pn1Pos
			nLado = nLadoStr2Int(nLado.charAt(0))
			nPara = gpf[g].Pn1Para
			
			if(nPara!='') {
				nFND = 0
				//> Traduzir metodologia Excel --> Electron
					if (nPara.charAt(0) != 'G') {		//> Se manda para o fundo
						nIE = 1
						nGav = g
						nPara = nGav
					} else {									//> Se manda para G##
						nGav = parseInt(nPara.substr(1), 10)
						if (gpf[nGav].Pr1Pos != `${gpf[g].Pn1Pos.charAt(0)}E` &&	//>Se dest não recebe Ext
						gpf[nGav].Pr2Pos != `${gpf[g].Pn1Pos.charAt(0)}E`) {
							nIE = 1
							if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
								nFND = 100*nLado+3
							} else {
								nFND = 100*nLado + parseInt(gpf[nGav].Pn1Para.substr(1),10)
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
		if (gpf[g].Pn2Pos != '') {
			nPn = 2
			nLado = gpf[g].Pn2Pos
			nLado = nLadoStr2Int(nLado.charAt(0))
			nPara = gpf[g].Pn2Para
			
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
					} else {									//> Se manda para G##
						nGav = parseInt(nPara.substr(1), 10)
						if (gpf[nGav].Pr1Pos != `${gpf[g].Pn2Pos.charAt(0)}E` &&	//>Se dest não recebe Ext
						gpf[nGav].Pr2Pos != `${gpf[g].Pn2Pos.charAt(0)}E`) {
							nIE = 1
							if (aDESV[nLado][0]==1 && aDESV[nLado][1]==0) {		//> Se DV ativ+desselec
								nFND = 100*nLado+3
							} else {
								nFND = 100*nLado + parseInt(gpf[nGav].Pn2Para.substr(1),10)
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
