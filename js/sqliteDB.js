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
	clgFncName(arguments.callee.toString(), 0)
	try {
		sqlite3.verbose()
		//*	Conectar
		var gpfDB = await createDbConnection('./data/SB_FTP_PLANSICHTER.db').catch((e)=>{console.log(e)})
		console.log('Connected to the Plansichter database.')
		//*	Coletar / Processar
		var res_processDB = await evalSQMAdata(gpfDB).catch((e)=>{console.log(e)})
		console.log("res_processDB = " + res_processDB)

		gpfDB = null
		return 1
	} catch (error) {
		console.error(error)
	}
	clgFncName(arguments.callee.toString(), 1)
}


async function evalSQMAdata(db) {
	clgFncName(arguments.callee.toString(), 0)

	//*	Coletar
	sSQL = `SELECT * FROM Reg_SQMA WHERE Key LIKE '%${nSQMA}${nRev}%'`
	dbSQMA = await db.all(sSQL)
	sSQL = `SELECT * FROM Reg_SQMA_GPF WHERE Key LIKE '${nSQMA}${nRev}%'`
	dbGPF = await db.all(sSQL)
	dbGPF.unshift('')
	await db.close()
	db = null

	//*	Processar
	await resetFND().catch((e)=>{console.log(e)})
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
		await drwCham().catch((e)=>{console.log(e)})
		await propagate().catch((e)=>{console.log(e)})
		await reColor().catch((e)=>{console.log(e)})
		drwRX()
	}

	//*	Ae
	if (dbSQMA[0].Abert2 != '') {
		nGav0 = 0
		nLado = nLadoStr2Int(dbSQMA[0].Abert2)
		sPara = dbSQMA[0].Para2
		nPara = parseInt(sPara.substr(1), 10)
		nIE = 1
		nGav = nPara
		sCPtype = 'Pr'
		mESQ[0][1][0] = nLado	//> nLado
		mESQ[0][1][1] = nPara	//> nPara
		mESQ[0][1][2] = nIE		//> nIE
		objCP = drawSQMA
			.select('#CP_A')
			.transform('t' + mG[nPara][nLado][0][0] + ',' + mG[nPara][nLado][0][1])
		await propagate().catch((e)=>{console.log(e)})
		await reColor().catch((e)=>{console.log(e)})
		drwAe()
	}

	//*	Be
	if (dbSQMA[0].Abert3 != '') {
		nGav0 = 0
		nLado = nLadoStr2Int(dbSQMA[0].Abert3)
		sPara = dbSQMA[0].Para3
		nPara = parseInt(sPara.substr(1), 10)
		nIE = 1
		nGav = nPara
		sCPtype = 'Pr'
		mESQ[0][2][0] = nLado	//> nLado
		mESQ[0][2][1] = nPara	//> nPara
		mESQ[0][2][2] = nIE		//> nIE
		objCP = drawSQMA
			.select('#CP_B')
			.transform('t' + mG[nPara][nLado][0][0] + ',' + mG[nPara][nLado][0][1])
		await propagate().catch((e)=>{console.log(e)})
		await reColor().catch((e)=>{console.log(e)})
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
		
		await evalRx(g).catch((e)=>{console.log(e)})
		await evalPn(g, 1).catch((e)=>{console.log(e)})
		await evalPn(g, 2).catch((e)=>{console.log(e)})






		
		



		


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


			
			
	clgFncName(arguments.callee.toString(), 1)
	return 1
}



async function evalRx(g) {
	//* Rx
		if (g >= 2 && g<=nGavs) {	//> A partir da G02
			//_ nLado = nLadoStr2Int(nLado.charAt(0))
			sLado = dbGPF[g].RxPos.charAt(0)
			nLado = nLadoStr2Int(sLado)
			sPara = dbGPF[g].RxPara
			nIE = 0
			nFND = 0
			//> Traduzir metodologia Excel --> Electron
			if (sPara != '') { 										//> Se manda para algum lugar pelo canal
				if (sPara.charAt(0) != 'G') {						//> Se manda para o fundo
																			//> Verificar se saída está desocupada (Se não, não fazer nada)
					if (mActBTM[nLadoStr2Int(sPara.charAt(0))][parseInt(sPara.charAt(1), 10) - 1][4] == 0) {
						mActBTM[nLado][parseInt(sPara.charAt(1), 10) - 1][4] = g
						nPara = g + 1
						nIE = 1
						
					}
					
					
				} else {									//> Se manda para G##
					//> Verificar se Pr do destino está recebendo da gaveta
					if (dbGPF[parseInt(sPara.substr(1), 10)].Pr1Pos.charAt(0) != sLado &&
						dbGPF[parseInt(sPara.substr(1), 10)].Pr2Pos.charAt(0) != sLado) {
							//> Se não estiver, nPara = g(destino) e nFND=nPara(g(destino))
							//> Pois, neste caso, nPara é apenas de ligação
						nPara = parseInt(sPara.substring(1), 10)
						nIE = 1
						
						//* Usar info de destino
						sLado = dbGPF[nPara].RxPos.charAt(0)
						nLado = nLadoStr2Int(sLado)
						sPara = dbGPF[nPara].RxPara
						//> Se manda para as duas saídas
						if (aDESV[nLado][0] == 1 && aDESV[nLado][1] == 0) {
							nFND = 100 * nLado + 3
							mActBTM[nLado][0][2]='Rx'
							mActBTM[nLado][0][4]=g
							mActBTM[nLado][1][2]='Rx'
							mActBTM[nLado][1][4]=g
							//> Se manda para apenas uma saída
						} else if (aDESV[nLado][0]==1 && aDESV[nLado][1]==1) {
							nFND = 100*nLado + parseInt(sPara.charAt(1),10)
							mActBTM[nLado][parseInt(sPara.charAt(1),10)-1][2]='Rx'
							mActBTM[nLado][parseInt(sPara.charAt(1),10)-1][4]=g
						}
									
					}
					
					
				}

			} else { nPara = g}
			nGav = nPara
			mESQ[g][1][0] = nLado
			mESQ[g][1][1] = nPara
			mESQ[g][1][2] = nIE
			mESQ[g][1][3] = nFND

			objCP = drawSQMA
				.select(`#CP_Rx_G${pad(g)}`)
				.transform('t' + mG[nPara][nLado][nIE][0] + ',' + mG[nPara][nLado][nIE][1])
			await drwCham().catch((e)=>{console.log(e)})
			await propagate().catch((e)=>{console.log(e)})
			await reColor().catch((e)=>{console.log(e)})
			drwRX()
	}
	return 1
}


async function evalPn(g, nPn) {
	//* Pn1
		if (dbGPF[g].Pn1Pos != '') {
			//_ nLado = nLadoStr2Int(nLado.charAt(0))
			sLado = dbGPF[g][`Pn${nPn}Pos`].charAt(0)
			nLado = nLadoStr2Int(sLado)
			sPara = dbGPF[g][`Pn${nPn}Para`]
			nIE = 0
			nFND = 0
			//> Traduzir metodologia Excel --> Electron
			if (sPara != '') { 										//> Se manda para algum lugar pelo canal
				if (sPara.charAt(0) != 'G') {						//> Se manda para o fundo
																			//> Verificar se saída está desocupada (Se não, não fazer nada)
					if (mActBTM[nLadoStr2Int(sPara.charAt(0))][parseInt(sPara.charAt(1), 10) - 1][4] == 0) {
						mActBTM[nLado][parseInt(sPara.charAt(1), 10) - 1][4] = g
						nPara = g + 1
						nIE = 1
					}
					
					
				} else {									//> Se manda para G##
					//> Verificar se Pr do destino está recebendo da gaveta
					if (dbGPF[parseInt(sPara.substr(1), 10)].Pr1Pos.charAt(0) != sLado &&
						dbGPF[parseInt(sPara.substr(1), 10)].Pr2Pos.charAt(0) != sLado) {
							//> Se não estiver, nPara = g(destino) e nFND=nPara(g(destino))
							//> Pois, neste caso, nPara é apenas de ligação
						nPara = parseInt(sPara.substr(1), 10)
						nIE = 1
									
					}
					
					
				}
				//> Se manda para as duas saídas
				if (aDESV[nLado][0] == 1 && aDESV[nLado][1] == 0) {
					nFND = 100 * nLado + 3
				//> Se manda para apenas uma saída
				} else if (aDESV[nLado][0]==1 && aDESV[nLado][1]==1) {
					nFND = 100*nLado + parseInt(sPara.charAt(1),10)
				}

			} else { nPara = g; nGav = nPara; nIE = 1 }
			mESQ[g][2][0] = nLado
			mESQ[g][2][1] = nPara
			mESQ[g][2][2] = nIE
			mESQ[g][2][3] = nFND

			objCP = drawSQMA
				.select(`#CP_Pn${nPn}_G${pad(g)}`)
				.transform('t' + mG[nPara][nLado][nIE][0] + ',' + mG[nPara][nLado][nIE][1])
			await propagate().catch((e)=>{console.log(e)})
			await reColor().catch((e)=>{console.log(e)})
			drwPN()
		}
	
}