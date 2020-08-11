// Definições iniciais
var A4x = 500
var A4y = 2250
var offP = 0

var x0p = offP
var y0p = offP
var x1p = A4x + offP
var y1p = A4y + offP


// Definição geral da gaveta
var nGavs     = 32 												//> Número de gavetas
var Larg      = 150 												//> Largura da Gaveta
var Alt       = 8 												//> Altura da gaveta
var k         = 5 												//> Proporção Gaveta/Coluna
var x0        = 200 												//> Posição inicial X
var y0        = 50 												//> Posição inicial Y
var yOff      = 64 												//> Offset entre gavetas
var lwid      = 2 												//> Largura de linha geral
var wLinBG	  = 1													//> Fator espessura da linha branca
var cor0 = 'white' 										//> Cor de fundo
var cor1      = 'black' 										//> Cor de linha
var bgcolor   = $('body').css('background-color')		//> Cor do fundo
var sk        = 5 												//> Skew
var kLin      = 3 												//> Expansão de linha fora da gaveta
var kFT       = 2.25 											//> Fator de correção para as linhas Frente e Trás
var kDE       = 1 												//> Fator de correção para as linhas Direita e Esquerda
var strDashPR = 30 * lwid + ' ' + 3 * lwid 				//> Padrão de tracejado do PRODUTO
var strDashRX = 3 * lwid + ' ' + 3 * lwid 				//> Padrão de tracejado do RECHAÇO
var strDashPN = 6 * lwid + ' ' + 6 * lwid 				//> Padrão de tracejado do PENEIRADO

var cCham = Snap.hsl(0, 0.1, 0.25)							//> Cor da chaminé

var cLinPR0 = Snap.hsl(0, 0, 0.5)						//> Cor da linha do PRODUTO neutro
var cLinRX0 = Snap.hsl(0, 0, 0.5) 						//> Cor da linha do RECHAÇO neutro
var cLinPN0 = Snap.hsl(0, 0, 0.7)						//> Cor da linha do PENEIRADO neutro

var cLinPR = cLinPR0 //> Cor da linha do PRODUTO
var cLinRX = cLinRX0 //> Cor da linha do RECHAÇO
var cLinPN = cLinPN0 //> Cor da linha do PENEIRADO

var cLinPRa = $('#flow-color-box01').css('background-color') //> Cor da linha do PRODUTO A
var cLinRXa = $('#flow-color-box01').css('background-color') //> Cor da linha do RECHAÇO A
var cLinPNa = $('#flow-color-box02').css('background-color') //> Cor da linha do PENEIRADO A

var cLinPRb = $('#flow-color-box03').css('background-color') //> Cor da linha do PRODUTO B
var cLinRXb = $('#flow-color-box03').css('background-color') //> Cor da linha do RECHAÇO B
var cLinPNb = $('#flow-color-box04').css('background-color') //> Cor da linha do PENEIRADO B

var cLinBG = 'white'

var cCtrlPntRxi = Snap.hsl(0.3,0.2,0.6)	//> Cor do Ponto de controle Rx interno 
var cCtrlPntRxe = Snap.hsl(0.3,0.2,0.3)	//> Cor do Ponto de controle Rx externo

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

var iGav = null
var gID
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

//Move
var xi = 0
    yi = 0
var xf = 0
    yf = 0
//Máscara
var bRXmask = false

//Esquema
var hTotal = 0

let wf = 2.25 			//> Algo relacionado ao texto que aparece ao fazer hover sobre a GPF





//* --------------- Matriz de equivalência de altura da gaveta --------------- */

var mH = [
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
var mG = [
	[
		[[0, 0], [0, 0]] , //0 Centro da Gaveta	00
		[[0, 0], [0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0], [0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0], [0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0], [0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	01
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	02
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	03
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	04
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	05
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	06
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	07
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	08
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	09
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	10
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	11
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	12
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	13
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	14
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	15
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	16
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	17
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	18
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	19
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	20
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	21
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	22
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	23
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	24
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	25
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	26
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	27
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	28
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	29
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	30
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]] , //0 Centro da Gaveta	31
		[[0, 0],[0, 0]] , //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]] , //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]] , //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]], //4 Pontos 'Ti' e 'Te'
	[
		[[0, 0],[0, 0]], //0 Centro da Gaveta	32
		[[0, 0],[0, 0]], //1 Pontos 'Fi' e 'Fe'
		[[0, 0],[0, 0]], //2 Pontos 'Di' e 'De'
		[[0, 0],[0, 0]], //3 Pontos 'Ei' e 'Ee'
		[[0, 0],[0, 0]]] //4 Pontos 'Ti' e 'Te'
]



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
	[100, 'F'],
	[200, 'F'],
	[300, 'F'],
	[400, 'F'],
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
]



//* -------------------------------------------------------------------------- */
//*                              MATRIZ DE ESQUEMA                             */
//* -------------------------------------------------------------------------- */

//* ------------------- MATRIZ GERAL DE CONTROLE DO ESQUEMA ------------------ */
var mESQ = [
	[
		[0, 'B'], 	//> Gaveta 00: Altura, Produto - ALTURA: NÃO SE APLICA
		[0, 0], 		//> Rx: nLado, 'nPara', 
		[0, 0], 		//> Pn1: nLado, 'nPara' - NÃO SE APLICA
		[0, 0], 		//> Pn2: nLado, 'nPara' - NÃO SE APLICA
	
	], 
	[
		[65, 'A'], 	//> Gaveta 01: Altura, Produto
		[0, 0], 		//> Rx: nLado, 'nPara'
		[0, 0], 		//> Pn1: nLado, 'nPara'
		[0, 0], 		//> Pn2: nLado, 'nPara'
	] 
]


//* ------------------ DEFINIÇÃO GERAL DA MATRIZ DE ESQUEMA ------------------ */
for (let g = 2; g < nGavs; g++) {
	let mGav = [
		
			[65, ''],
			[0, 0],
			[0, 0],
			[0, 0],
		
	]
	mESQ.push(mGav)
}

let mGav = [
	
		[32, ''],
		[0, 0],
		[0, 0],
		[0, 0],
	
]
mESQ.push(mGav)