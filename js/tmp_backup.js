function recalcUsed() {
	for (let g = 1; g <= nGavs; g++) {
		mCOD1[g][1] = [0, 0, 0, 0, 0]
	}
	for (let g = 1; g <= nGavs; g++) {
		for (let i = 1; i <= 3; i++) {
			//* CP externo e com seta ()
			if (mESQ[g][i][2] == 1 && mESQ[g][i][1] > g) {		//> CP externo e com seta ()
				for (let tmpG = g; tmpG <= nGavs; tmpG++) {
					mCOD1[tmpG][1][mESQ[g][i][0]] += 1
				}
			}
			//* Correspondência com a matriz de fundo
			if (mESQ[g][i][0]>0 && mESQ[g][i][3] > 100*mESQ[g][i][0] && mESQ[g][i][3] <= 100*mESQ[g][i][0] + 3) {
				mActBTM[mESQ[g][i][0]][0][4] != g ?
					mESQ[g][i][3] -= (100*mESQ[g][i][0]+1) : false
				mActBTM[mESQ[g][i][0]][1][4] != g ?
					mESQ[g][i][3] -= (100*mESQ[g][i][0]+2) : false
			} else { mESQ[g][i][3]=0 }
		
		}
	}
}






function recalcProd_backup() {

	aProdAB = [
		[],
		[],
		[],
		[],
		[],
	]
	let aCPType = [
		['', ''],
		['Rx', 'A'],
		['Pn', 'A'],
		['Rx', 'B'],
		['Pn', 'B'],
	]

	let b2prod = false
	let bEqual = false
	//*	Alimentar a matriz de produtos de saída
	for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
		for (let i = 0; i <= 1; i++) {

			mActBTM[tmpLado][i][5] = ''	//> Zerar nome
			
			if (mActBTM[tmpLado][i][1]==1) {		//>	Apenas se saída selecionada
				
				mActBTM[tmpLado][i][3] == 'B' ? b2prod = true : false	//> Verificar se AB ou só A
				if (i == 0 &&																		//> Verificar se L1=L2
					mActBTM[tmpLado][i][4] == mActBTM[tmpLado][i + 1][4] &&
					mActBTM[tmpLado][i][2] == mActBTM[tmpLado][i + 1][2]) { bEqual = true }
				else { bEqual = false }
				
				//> Procura se a gaveta origem já foi adicionada na matriz temporária	
				for (let linProd = 1; linProd <= 4; linProd++) {
					if (mActBTM[tmpLado][i][2] == aCPType[linProd][0] &&					//> Se CP tipo Rx|Pn
						mActBTM[tmpLado][i][3] == aCPType[linProd][1] && !bEqual) {		//> Se prod A|B, E L1!=L2 
						aProdAB[linProd].indexOf(mActBTM[tmpLado][i][4]) < 0 ?
							aProdAB[linProd].push(mActBTM[tmpLado][i][4]) : false
					}
				}
			}
		}
	}


	aFnd = [
		[],
		[	//> RxA
			[],
			[0,0],	//> F12
			[0,0],	//> E12
			[0,0],	//> D12
			[0,0],	//> T12
		],
		[	//> PnA
			[],
			[0,0],	//> F12
			[0,0],	//> E12
			[0,0],	//> D12
			[0,0],	//> T12
		],
		[	//> RxB
			[],
			[0,0],	//> F12
			[0,0],	//> E12
			[0,0],	//> D12
			[0,0],	//> T12
		],
		[	//> PnB
			[],
			[0,0],	//> F12
			[0,0],	//> E12
			[0,0],	//> D12
			[0,0],	//> T12
		],
	]

	//*	Ordenar a seq de gav origem por Rx|Pn e A|B
	for (let linProd = 1; linProd <= 4; linProd++) {				//> De Rx_A até Pn_B
		aProdAB[linProd].sort(function (a, b) { return a - b })	//> Ordena origens
		
		for (let s = 0; s < aProdAB[linProd].length; s++) {
			for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {		//> De F1 até T2
				
				bEqual = false
				//> L1 até L2
				for (let i = 0; i <= 1; i++) {
					//> Verif, quando i=0, se L1&L2 estão selecionados e são iguais
					//> (Mesma origem+tipo OU orgem!= e com desvio deselec)
					if (i == 0 && mActBTM[tmpLado][0][1] == 1 && mActBTM[tmpLado][1][1] == 1 &&
						(mActBTM[tmpLado][0][4] == mActBTM[tmpLado][1][4] &&
							mActBTM[tmpLado][0][2] == mActBTM[tmpLado][1][2]) ||
						(aDESV[tmpLado][0] == 1 && aDESV[tmpLado][1] == 0)
					) {
						bEqual = true
						bCont = false
					}

					//> Se localizar aProdAB na mActBTM, 
					if (mActBTM[tmpLado][i][4] == aProdAB[linProd][s] &&
						mActBTM[tmpLado][i][2] == aCPType[linProd][0]) {
							// linProd%2==1 ? mActBTM[tmpLado][i][5] = cont : mActBTM[tmpLado][i][5] = romanize(cont)
							// b2prod ? mActBTM[tmpLado][i][5] += aCPType[linProd][1] : false
							aFnd[linProd][tmpLado][i] = mActBTM[tmpLado][i][4]
							
							if (bEqual) {
								aFnd[linProd][tmpLado][1] = aFnd[linProd][tmpLado][0]

								i = 2
								//> Zerar desvios
								aDESV[tmpLado][1] = 0
								aDESV[tmpLado][2] = 0
								
							} else {

								//*	DESVIOS VERTICAIS------------------------
								//> Ativar desvio se L1 e L2 selec E ambos externos
								let bIE11 = true
								try {
									if (mActBTM[tmpLado][0][4]>0 && mActBTM[tmpLado][0][2] == 'Rx') {
										if (mESQ[mActBTM[tmpLado][0][4]][1][2]==0) {bIE11 = false}
									}
								} catch (error) { }
								try {
									if (mActBTM[tmpLado][1][4]>0 && mActBTM[tmpLado][1][2] == 'Rx') {
										if (mESQ[mActBTM[tmpLado][0][4]][1][2]==0) {bIE11 = false}
									}
								} catch (error) {}
								if (mActBTM[tmpLado][0][1] == 1 && mActBTM[tmpLado][1][1] == 1 &&
									!bEqual && bIE11) {
									aDESV[tmpLado][0] = 1
								} else { aDESV[tmpLado] = [0, 1, 0] }
							}
						i = 2
						tmpLado = 5
					}
				}
			}
		}
	}

	console.log(`recalcProd()`)
	
	//*	Processar e criar nomes
	for (let linProd = 1; linProd <= 4; linProd++) {
		
		console.log(`   linProd=${linProd}`)
		

		let cont = 0
		let rest = aProdAB[linProd].length
		let nTry = 0
		while (rest > 0 && nTry < 20) {
			for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {
				console.log(`      tmpLado=${tmpLado}`)
				//_ if (bCont) { cont++ } else { bCont = true }
				for (let i = 0; i <= 1; i++) {
					console.log(`         i=${i}`)
					if (aFnd[linProd][tmpLado][i] > 0) {
						// if (i == 0) { cont++ }
						// else if (aFnd[linProd][tmpLado][1] != aFnd[linProd][tmpLado][0]) { cont++ }
						// cont = aProdAB[linProd].indexOf(aFnd[linProd][tmpLado][i]) + 1
						// if (aProdAB[linProd].indexOf(aFnd[linProd][tmpLado][i]) + 1 > cont) {
						// 	if (i==0) {
						// 		cont++
						// 	} else if (aDESV[linProd][0] == 1 && aDESV[linProd][1] == 0 ||
						// 		aFnd[linProd][tmpLado][0] == 0) { cont++ }
						// }
						if (aFnd[linProd][tmpLado][Math.abs(i - 1)] == 0) { cont++ }	//> Apenas 1 no lado
						
						
						linProd % 2 == 1 ? mActBTM[tmpLado][i][5] = cont : mActBTM[tmpLado][i][5] = romanize(cont)
						b2prod ? mActBTM[tmpLado][i][5] += aCPType[linProd][1] : false
						rest--
					}
				}
			}
		nTry++
		}
	}


	recalcDV()
	recalcDINF()
	try {calcHtotal()} catch (error) {}

}


function tmp() {
	//*	Ordenar a seq de gav origem por Rx|Pn e A|B
	for (let linProd = 1; linProd <= 4; linProd++) {				//> De Rx_A até Pn_B
		aProdAB[linProd].sort(function (a, b) { return a - b })	//> Ordena origens
		
		let cont = 0
		let bCont = true
		for (let s = 0; s < aProdAB[linProd].length; s++) {
			console.log(`s = ${s}, bCont=${bCont}`) //>======================
			if (bCont) { cont++ } else { bCont = true }
			for (let tmpLado = 1; tmpLado <= 4; tmpLado++) {		//> De F1 até T2
				
				console.log(`  tmpLado = ${tmpLado}`) //>======================
				
				bEqual = false
				//> L1 até L2
				for (let i = 0; i <= 1; i++) {
					console.log(`    i = ${i}`)
					//> Verif, quando i=0, se L1&L2 estão selecionados e são iguais
					//> (Mesma origem+tipo OU orgem!= e com desvio deselec)
					if (i == 0 && mActBTM[tmpLado][0][1] == 1 && mActBTM[tmpLado][1][1] == 1 &&
						(mActBTM[tmpLado][0][4] == mActBTM[tmpLado][1][4] &&
							mActBTM[tmpLado][0][2] == mActBTM[tmpLado][1][2]) ||
						(aDESV[tmpLado][0] == 1 && aDESV[tmpLado][1] == 0)
					) {
						bEqual = true
						bCont = false
					}
					
					console.log(`      Linha 742: bEqual = ${bEqual}`)  //>============================
					console.log(`      Linha 743: bCont = ${bCont}`)  //>============================

					//> Se localizar aProdAB na mActBTM, 
					if (mActBTM[tmpLado][i][4] == aProdAB[linProd][s] &&
						mActBTM[tmpLado][i][2] == aCPType[linProd][0]) {
							linProd%2==1 ? mActBTM[tmpLado][i][5] = cont : mActBTM[tmpLado][i][5] = romanize(cont)
							b2prod ? mActBTM[tmpLado][i][5] += aCPType[linProd][1] : false
							if (bEqual) {
								bCont = false
								console.log(`      Linha 752: bCont = ${bCont}`)   //>============================
								mActBTM[tmpLado][1][5] = mActBTM[tmpLado][0][5]
								i = 2
								//> Zerar desvios
								aDESV[tmpLado][1] = 0
								aDESV[tmpLado][2] = 0
								
							} else {
								bCont = true
								//*	DESVIOS VERTICAIS------------------------
								//> Ativar desvio se L1 e L2 selec
								if (mActBTM[tmpLado][0][1] == 1 && mActBTM[tmpLado][1][1] == 1 && !bEqual) {
									aDESV[tmpLado][0] = 1
								} else { aDESV[tmpLado] = [0, 1, 0] }
							}
						i = 2
						tmpLado = 5
					}
				}
				// bCont = true
			}
		}
	}
}

