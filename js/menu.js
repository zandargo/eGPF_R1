




//* -------------------------------------------------------------------------- */
//*               EVENTOS DE CLIQUE NO MOUSE: MOSTRAR SUB PÁGINA               */
//* -------------------------------------------------------------------------- */

var i, tablinks //, tabcontent
function openTab(evt, tabName) {
	//* Ocultar todos class="wrapperContent"
	tabcontent = document.getElementsByClassName('wrapperContent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}

	//* Coletar todos class="tablinks" e remover class="active"
	tablinks = document.getElementsByClassName('tablink')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '')
	}

	//* Mostrar a div e adicionar class="active"
	// document.getElementById(tabName).style.display = 'block'
	evt.currentTarget.className += ' active'
	//_ $('#wrapper').load('./pages/'.concat(tabName, '.html'))
	//_ $('#wrapper').on('load','./pages/'.concat(tabName, '.html'))
	//_ document.getElementById("wrapper").innerHTML='<object type="text/html" data="./pages/'.concat(tabName,'.html," ></object>')
	console.log('./pages/'.concat(tabName, '.html'))
	console.log('<object type="text/html" data="./pages/'.concat(tabName,'.html," ></object>'))

	//* Rolar para o tpo da página
	//_ $('html, body').animate({ scrollTop: 0 }, 'slow')
	$('#wrapper').animate({ scrollTop: 0 }, 'slow')

}

//* -------------------------------------------------------------------------- */
//*                           INÍCIO DO CARREGAMENTO                           */
//* -------------------------------------------------------------------------- */

// Ocultar todos class="tabcontent" no início do carregamento
$('.tabcontent').hide()



