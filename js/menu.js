
//* -------------------------------------------------------------------------- */
//*               EVENTOS DE CLIQUE NO MOUSE: MOSTRAR SUB PÁGINA               */
//* -------------------------------------------------------------------------- */

function openTab(evt, tabName) {
	//* Ocultar todos class="wrapperContent"
	$('.tabcontent').hide()

	//* Coletar todos class="tablinks" e remover class="active"
	$('.tablink').removeClass('active')


	//* Mostrar a div e adicionar class="active"
	evt.currentTarget.className += ' active'
	$('#wrp-'+tabName).show()
	$('#nav-'+tabName).show()

	//* Rolar para o tpo da página
	//_ $('html, body').animate({ scrollTop: 0 }, 'slow')
	$('#wrapper').animate({ scrollTop: 0 }, 'slow')

}

//* -------------------------------------------------------------------------- */
//*                           INÍCIO DO CARREGAMENTO                           */
//* -------------------------------------------------------------------------- */

$('.tabcontent').hide()
$('#wrp-flow').show()
$('#nav-flow').show()


