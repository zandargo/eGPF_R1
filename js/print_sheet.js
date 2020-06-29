
	
//drwFolha();
function drwFolha() {

	var gCopyInfo = draw.group();
	var folha = draw.rect(offP/2, offP/2, A4x, A4y).attr({ 
		fill: 'white', 
		'fill-opacity': 1 , 
		stroke: '#000' , 
		'stroke-width': 0,
		});
	var bordafolha = draw.rect(offP/2+45, offP/2, A4x-45, A4y).attr({ 
		fill: 'white', 
		'fill-opacity': 1 , 
		stroke: '#000' , 
		'stroke-width': 2,
		});



	// INFORMAÇÕES DE COPYRIGHT
	FONT='Arial Narrow';
	STYLE = 'regular';
	var gCopyInfo = draw.group();
	var text = draw.text(0, 0, "Este desenho e seu conteúdo é propriedade da SANGATI BERGA e não deve ser ");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': STYLE,
	});
	gCopyInfo.append(text);
	var text = draw.text(0, 12, "copiado, reproduzido, transmitido ou revelado a terceiros sem o consentimento");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': STYLE,
	});
	gCopyInfo.append(text);
	var text = draw.text(0, 24, "por escrito da mesma, as contravenções serão processadas.");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': STYLE,
	});
	gCopyInfo.append(text);
	gCopyInfo.transform('r270 t-865,-115');
	



	//LEGENDA DA FOLHA
	var gLegenda = draw.group();
	xLeg = 290; yLeg = 80;
	var bordaLeg = draw.rect(0, 0, xLeg, yLeg).attr({ 
		fill: 'white', 
		'fill-opacity': 1 , 
		stroke: '#000' , 
		'stroke-width': 2,
		});
	gLegenda.append(bordaLeg);
	
	var line = draw.polyline(0, yLeg/2, xLeg, yLeg/2).attr({stroke: '#000' , 'stroke-width': 1});
	gLegenda.append(line);
	var line = draw.polyline(xLeg*1/4, 0, xLeg*1/4, yLeg).attr({stroke: '#000' , 'stroke-width': 1});
	gLegenda.append(line);
	var line = draw.polyline(xLeg*2/4, 0, xLeg*2/4, yLeg/2).attr({stroke: '#000' , 'stroke-width': 1});
	gLegenda.append(line);
	var line = draw.polyline(xLeg*3/4, 0, xLeg*3/4, yLeg).attr({stroke: '#000' , 'stroke-width': 1});
	gLegenda.append(line);
	pos = 0.45;
	var line = draw.polyline(xLeg*pos, yLeg/2, xLeg*pos, yLeg).attr({stroke: '#000' , 'stroke-width': 1});
	gLegenda.append(line);
	pos = 0.65;
	var line = draw.polyline(xLeg*pos, yLeg/2, xLeg*pos, yLeg).attr({stroke: '#000' , 'stroke-width': 1});
	gLegenda.append(line);


	// LOGOTIPO SANGATI
	var SB = draw.group();
	var SVG = Snap.load("../img/Logo_SB.svg", function ( loadedFragment ) {
		SB.append( loadedFragment );
	} );
	//LogoSB.transform('t645,992s0.6');
	SB.transform('t207,42,s0.6');
	gLegenda.append(SB);



	// TÍTULOS
	FONT='Courier New';
	STYLE
	xOffs = 3; yOffs=10;
	var text = draw.text(xOffs+xLeg*0/4, yOffs, "Elaborado:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);
	var text = draw.text(xOffs+xLeg*1/4, yOffs, "Data:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);
	var text = draw.text(xOffs+xLeg*2/4, yOffs, "Aprovado:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);
	var text = draw.text(xOffs+xLeg*3/4, yOffs, "Data:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);

	var text = draw.text(xOffs+xLeg*0/4, yOffs+yLeg/2, "Modelo:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);
	var text = draw.text(xOffs+xLeg*1/4, yOffs+yLeg/2, "Quadro:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);
	var text = draw.text(xOffs+xLeg*0.45, yOffs+yLeg/2, "Esquema:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);
	var text = draw.text(xOffs+xLeg*0.65, yOffs+yLeg/2, "Rev:");
	text.attr({
		'font-size': 10,
		'font-family': FONT,
		'font-weight': 'bold',
	});
	gLegenda.append(text);





	gLegenda.transform("t440,950");
}
	



