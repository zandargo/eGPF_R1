const draw = Snap('#svgESQ')

//*	 Definições iniciais
var A4x = 500
var A4y = 2250
var offP = 0

var x0p = offP
var y0p = offP
var x1p = A4x + offP
var y1p = A4y + offP


//*	 Definição geral da gaveta
var nGavs     = 32 												//> Número de gavetas
var Larg      = 150 												//> Largura da Gaveta
var Alt       = 8 												//> Altura da gaveta
var k         = 5 												//> Proporção Gaveta/Coluna
var x0        = 200 												//> Posição inicial X
var y0        = 54 												//> Posição inicial Y
var yOff      = 64 												//> Offset entre gavetas
var lwid      = 2 												//> Largura de linha geral
var wLinBG	  = 3.2													//> Fator espessura da linha branca
var oLinBG	  = 0.9												//> Opacidade da linha branca
var oMskGPF	  = 0.9												//> Opacidade da máscara das linhas sob a gaveta
var cor0 	  = 'white' 										//> Cor de fundo
var cor1      = 'black' 										//> Cor de linha
var bgcolor   = $('body').css('background-color')		//> Cor do fundo
var sk        = 5 												//> Skew
var kLin      = 3 												//> Expansão de linha fora da gaveta
var kFT       = 2.25 											//> Fator de correção para as linhas Frente e Trás
var kDE       = 1 												//> Fator de correção para as linhas Direita e Esquerda
var strDashPR = 6 * lwid + ' ' + 3 * lwid 				//> Padrão de tracejado do PRODUTO
var strDashRX = 5 * lwid + ' ' + 3 * lwid 				//> Padrão de tracejado do RECHAÇO
var strDashPN = 2 * lwid + ' ' + 4 * lwid 				//> Padrão de tracejado do PENEIRADO

var cpAlpha	= 0.65		//> Transparência dos CP

var cCham = Snap.hsl(0, 1, 0.4)												//> Cor da chaminé

var cLinPR0 = $('#flow-color-box05').css('background-color')		//> Cor da linha do PRODUTO neutro
var cLinRX0 = $('#flow-color-box05').css('background-color')		//> Cor da linha do RECHAÇO neutro
var cLinPN0 = $('#flow-color-box06').css('background-color')		//> Cor da linha do PENEIRADO neutro

var cLinPR = cLinPR0 //> Def Init Cor da linha do PRODUTO
var cLinRX = cLinRX0 //> Def Init Cor da linha do RECHAÇO
var cLinPN = cLinPN0 //> Def Init Cor da linha do PENEIRADO

var cLinPRa = $('#flow-color-box01').css('background-color') //> Cor da linha do PRODUTO A
var cLinRXa = $('#flow-color-box01').css('background-color') //> Cor da linha do RECHAÇO A
var cLinPNa = $('#flow-color-box02').css('background-color') //> Cor da linha do PENEIRADO A

var cLinPRb = $('#flow-color-box03').css('background-color') //> Cor da linha do PRODUTO B
var cLinRXb = $('#flow-color-box03').css('background-color') //> Cor da linha do RECHAÇO B
var cLinPNb = $('#flow-color-box04').css('background-color') //> Cor da linha do PENEIRADO B

var cLinSel = Snap.rgb(50,150,50)

var cLinBG = 'white'

// var cCtrlPntRxi = Snap.hsl(0.15,0.2,0.6)	//> Cor do Ponto de controle Rx interno 
// var cCtrlPntRxe = Snap.hsl(0.15,0.2,0.3)	//> Cor do Ponto de controle Rx externo
// var cCtrlPntPni = Snap.hsl(0.40,0.2,0.6)	//> Cor do Ponto de controle Pn interno 
// var cCtrlPntPne = Snap.hsl(0.40,0.2,0.3)	//> Cor do Ponto de controle Pn externo
var cCtrlPntRxi = cLinPR0	//> Cor do Ponto de controle Rx interno 
var cCtrlPntRxe = cLinPR0	//> Cor do Ponto de controle Rx externo
var cCtrlPntPni = cLinPN0	//> Cor do Ponto de controle Pn interno 
var cCtrlPntPne = cLinPN0	//> Cor do Ponto de controle Pn externo

//* --------------------------- Definições Animação -------------------------- */

var Anim0 = 0
var Anim1 = 8000
var Anim2 = -500000

//* --------------------------- Posição dos centros -------------------------- */

var xFi = null
var yFi = null
var xEi = null
var yEi = null
var xDi = null
var yDi = null
var xTi = null
var yTi = null

var xFe = null
var yFe = null
var xEe = null
var yEe = null
var xDe = null
var yDe = null
var xTe = null
var yTe = null

var xT = 0
var yT = 0


//* ------------------------------ Gaveta atual ------------------------------ */

var iGav      = null
var gID       = null
var gIDhover  = ''
var bEditMode = false
var iGavSel   = null
var nGav      = null
var nLado     = null
var nIE       = null
var nGav0     = null
var nPn       = null
var sLado     = ''
var sIE       = ''
var s         = ''
var L         = ''
var nAB       = 0
var objCP     = null

//Move
var xi = 0
    yi = 0
var xf = 0
    yf = 0
//Máscara
var bRXmask = false
var bPNmask = false

//Linha de Seleção
var vSelLin = []

//Esquema
var hTotal = 0

var wf = 2.25 			//> Algo relacionado ao texto que aparece ao fazer hover sobre a GPF



//* ----------------------------- TEXTO GPF HOVER ---------------------------- */
//_ var sGavHover = draw.text(x0 + (Larg * wf) / 2 - 40, 250, gIDhover)
//_ sGavHover.attr({
//_ 	'font-size': 12,
//_ 	fill: 'lightgray',
//_ 	'font-family': 'Roboto, Consolas, Calibri, Arial Narrow',
//_ 	// 'font-weight': 'bold',
//_ })


//* -------------------------------------------------------------------------- */
//*                       PENEIRADOS DE SAÍDA PELO FUNDO                       */
//* -------------------------------------------------------------------------- */

var strkDashArr = 1.0 * lwid + ',' + 3 * lwid	//> 	strokeDasharray
var strkDashOff = 0  									//>	strokeDashoffset
var strokeWidth = 1.5 * lwid							//>	strokeWidth

// 3 Pn fundo??? (cor A, cor B, cor desconectado)

// function drwPnD() { }
var patPn0 = draw
	.line(1.5 * lwid, 1.5 * lwid, 1.5 * lwid, 900)
	.attr({
		stroke           : cLinPN0,
		strokeDasharray  : strkDashArr,
		strokeDashoffset : strkDashOff,
		strokeWidth      : strokeWidth,
		'stroke-linecap' : 'round',
		'stroke-linejoin': 'round',
	})
	.pattern(0, 0, 3 * lwid, 900 + 3 * lwid)
var patPna = draw
	.line(1.5 * lwid, 1.5 * lwid, 1.5 * lwid, 900)
	.attr({
		stroke           : cLinPNa,
		strokeDasharray  : strkDashArr,
		strokeDashoffset : strkDashOff,
		strokeWidth      : strokeWidth,
		'stroke-linecap' : 'round',
		'stroke-linejoin': 'round',
	})
	.pattern(0, 0, 3 * lwid, 900 + 3 * lwid)
var patPnb = draw
	.line(1.5 * lwid, 1.5 * lwid, 1.5 * lwid, 900)
	.attr({
		stroke           : cLinPNb,
		strokeDasharray  : strkDashArr,
		strokeDashoffset : strkDashOff,
		strokeWidth      : strokeWidth,
		'stroke-linecap' : 'round',
		'stroke-linejoin': 'round',
	})
	.pattern(0, 0, 3 * lwid, 900 + 3 * lwid)

var patPn = patPn0

var patOffset = 0

animatePnD()


function animatePnD() {
	patOffset += 900000
	patPn0.animate({ y: patOffset }, 50000000, mina.linear, animatePnD)
	patPna.animate({ y: patOffset }, 50000000, mina.linear, animatePnD)
	patPnb.animate({ y: patOffset }, 50000000, mina.linear, animatePnD)
}





//* --------------- Matriz de equivalência de altura da gaveta --------------- */

var mH = [
	[32, 32, 0],
	[65, 65, 0],
	[75, 75, 0],
	[85, 85, 0],
	[95, 65, 30],
	[105, 75, 30],
	[115, 85, 30],
	[125, 65, 60],
	[135, 75, 60],
	[145, 85, 60],
]



//* -------------------------------------------------------------------------- */
//*          MATRIZ PRINCIPAL: PONTOS DA GAVETA(PARA DESENHO TEMPLATE)         */
//* -------------------------------------------------------------------------- */
// prettier-ignore
var mP = [
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //0 Pontos do polígono principal
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //1 Pontos do CANTO 1
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //2 Pontos do CANTO 2
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //3 Pontos do CANTO 3
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]] //4 Pontos do CANTO 4
]



//* -------------------------------------------------------------------------- */
//*               MATRIX CHAMINÉ: PONTOS PARA DESENHO DA CHAMINÉ               */
//* -------------------------------------------------------------------------- */
// prettier-ignore
var mC = [
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //0
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //1 Pontos 'F'
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //2 Pontos 'D'
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]], //3 Pontos 'E'
	[[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]] //4 Pontos 'T'
]



//* -------------------------------------------------------------------------- */
//*                       MATRIZ FLUXO: PONTOS DE CONEXÃO                      */
//* -------------------------------------------------------------------------- */
// prettier-ignore
var mF = [
	[[0, 0],[0, 0]], //0 Centro da Gaveta
	[[0, 0],[0, 0]], //1 Pontos 'Fi' e 'Fe'
	[[0, 0],[0, 0]], //2 Pontos 'Di' e 'De'
	[[0, 0],[0, 0]], //3 Pontos 'Ei' e 'Ee'
	[[0, 0],[0, 0]] //4 Pontos 'Ti' e 'Te'
]



//* -------------------------------------------------------------------------- */
//*                       MATRIZ GERAL DE PRODUTO/RECHAÇO                      */
//* -------------------------------------------------------------------------- */
// prettier-ignore
var mG = []
for (let g = 0; g <= 32; g++) {
	let mGtmp = [
		[[0, 0],[0, 0]], //0 Centro da Gaveta
		[[0, 0],[0, 0]], //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]], //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]], //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]] //4 Pontos 'Ti' e 'Te'
	mG.push(mGtmp)	
}


//* -------------------------------------------------------------------------- */
//*                        MATRIZ DE CÓDIGOS DAS GAVETAS                       */
//* -------------------------------------------------------------------------- */
var mCOD0 = [
	[120, 'D'],
	[102, 'D'],
	[130, 'E'],
	[103, 'E'],
	[123, 'A'],
	[132, 'A'],

	[210, 'E'],
	[201, 'E'],
	[240, 'D'],
	[204, 'D'],
	[214, 'A'],
	[241, 'A'],

	[310, 'D'],
	[301, 'D'],
	[340, 'E'],
	[304, 'E'],
	[314, 'A'],
	[341, 'A'],

	[420, 'E'],
	[402, 'E'],
	[430, 'D'],
	[403, 'D'],
	[423, 'A'],
	[432, 'A'],

	[100, 'B'],
	[200, 'B'],
	[300, 'B'],
	[400, 'B'],

	[110, 'F'],
	[101, 'F'],
	[220, 'F'],
	[202, 'F'],
	[330, 'F'],
	[303, 'F'],
	[440, 'F'],
	[404, 'F'],
	
	[104, 'R'],
	[140, 'R'],
	[203, 'R'],
	[230, 'R'],
	[302, 'R'],
	[320, 'R'],
	[401, 'R'],
	[410, 'R'],
]



//* -------------------------------------------------------------------------- */
//*                               MATRIZ DE CORTE                              */
//* -------------------------------------------------------------------------- */
var mCorte = [
	[10000, ''],
	[20000, ''],
	[30000, ''],
	[40000, ''],
	[13000, '-RA'],
	[10330, '-RDS'],
	[10003, '-RP'],
	[10001, '-RPPS'],
	[10002, '-RPPD'],
	[10300, '-RD'],
	[10200, '-RPDA'],
	[10100, '-RPDP'],
	[10030, '-RS'],
	[10020, '-RPSA'],
	[10010, '-RPSP'],

	[20300, '-RA'],
	[23003, '-RDS'],
	[20030, '-RP'],
	[20020, '-RPPS'],
	[20010, '-RPPD'],
	[20003, '-RD'],
	[20002, '-RPDA'],
	[20001, '-RPDP'],
	[23000, '-RS'],
	[22000, '-RPSA'],
	[21000, '-RPSP'],

	[30030, '-RA'],
	[33003, '-RDS'],
	[30300, '-RP'],
	[30100, '-RPPS'],
	[30200, '-RPPD'],
	[33000, '-RD'],
	[31000, '-RPDA'],
	[32000, '-RPDP'],
	[30003, '-RS'],
	[30001, '-RPSA'],
	[30002, '-RPSP'],

	[40003, '-RA'],
	[40330, '-RDS'],
	[43000, '-RP'],
	[42000, '-RPPS'],
	[41000, '-RPPD'],
	[40030, '-RD'],
	[40010, '-RPDA'],
	[40020, '-RPDP'],
	[40300, '-RS'],
	[40100, '-RPSA'],
	[40200, '-RPSP'],

	[13003, '-RARP'],
	[20330, '-RARP'],
	[30330, '-RARP'],
	[43003, '-RARP'],

	[13002, '-RAPPD'],
	[20310, '-RAPPD'],
	[30230, '-RAPPD'],
	[41003, '-RAPPD'],

	[13001, '-RAPPS'],
	[20320, '-RAPPS'],
	[30130, '-RAPPS'],
	[42003, '-RAPPS'],
		
	[12003, '-RAPDP'],
	[20130, '-RAPDP'],
	[30320, '-RAPDP'],
	[43001, '-RAPDP'],
		
	[11003, '-RAPSP'],
	[20230, '-RAPSP'],
	[30310, '-RAPSP'],
	[43002, '-RAPSP'],
		
	[10033, '-RSP'],
	[23030, '-RSP'],
	[30303, '-RSP'],
	[43300, '-RSP'],

]




//* -------------------------------------------------------------------------- */
//*                              MATRIZES ESQUEMA                              */
//* -------------------------------------------------------------------------- */

//* ------------------ DEFINIÇÃO GERAL DA MATRIZ DE ESQUEMA ------------------ */
var mESQ = []
function resetMatESQ() {
	mESQ = []
	let mGav = []
	//_ console.log(mESQ)
	mESQ.push(
		[
		[0,'B',0], 		//> Gaveta 00: Altura, Produto, Corte - ALTURA/CORTE: NÃO SE APLICA
		[0, 0, 1], 		//> Ae: nLado, 'nPara', nIE
		[0, 0, 1], 		//> Be: nLado, 'nPara', nIE
		[0, 0, 0], 		//> ?
		]
	)
	mESQ.push(
		[
		[65,'A',0], 	//> Gaveta 01: Altura, Produto, Corte
		[0, 0, 0], 		//> Pr/Rx: nLado, 'nPara', nIE
		[0, 0, 0], 		//> Pn1: nLado, 'nPara', nIE
		[0, 0, 0], 		//> Pn2: nLado, 'nPara', nIE
	] 
	)
	for (let g = 2; g < nGavs; g++) {
		mGav = [
				[65,'',0],
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
		]
		mESQ.push(mGav)
	}

	mGav = [	
			[32,'',0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		]
	mESQ.push(mGav)

}
resetMatESQ()

//* ------------------------- MATRIZ CÓDIGO USINAGEM ------------------------- */
var mCOD1 = []
function resetMatCOD1() {
	mCOD1 = []
	let mCut = []

	for (let g = 0; g <= 32; g++) {
		mCut = [				//> Usinagem da gaveta 00
			[0, 0, 0, 0, 0],	//> Usado [Rx,F,D,E,T]
			[0, 0, 0, 0, 0],	//> 
			[0, 0, 0, 0, 0],	//> 
			[0, 0, 0, 0, 0],	//> 
		]
		mCOD1.push(mCut)
	}
}
resetMatCOD1()




