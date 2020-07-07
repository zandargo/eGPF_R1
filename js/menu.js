//* ------- EVENTOS DE CLIQUE NO MOUSE: MOSTRAR SUB PÁGINA ------- */
var i,  tablinks //, tabcontent
function openTab(evt, tabName) {
	//// Ocultar todos class="tabcontent" - VAI SERVIR PARA MUDAR O RIBBON CONTENT
	// tabcontent = document.getElementsByClassName('tabcontent')
	// for (i = 0; i < tabcontent.length; i++) {
	// 	tabcontent[i].style.display = 'none'
	// }

	// Coletar todos class="tablinks" e remover class="active"
	tablinks = document.getElementsByClassName('tablink')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '')
	}

	// Mostrar a div e adicionar class="active"
	// document.getElementById(tabName).style.display = 'block'
	evt.currentTarget.className += ' active'

	//// Rolar para o tpo da página
	// $('html, body').animate({ scrollTop: 0 }, 'slow')

	console.log(tabName)
}

//* ------- INÍCIO DO CARREGAMENTO ------- */
// Ocultar todos class="tabcontent" no início do carregamento
// $('.tabcontent').hide()





