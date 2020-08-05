

//* -------------------------------------------------------------------------- */
//*                                    FLOW                                    */
//* -------------------------------------------------------------------------- */

//*	WRAPPER
$('<div>', {
	id: 'wrp-flow',
	class: 'tabcontent'
}).appendTo('#wrapper')

$.get("./pages/wrp_flow.html", function (data) {
	$('#wrp-flow').html(data)
})

//*	SIDEBAR
$('<div>', {
	id: 'nav-flow',
	class: 'tabcontent'
}).appendTo('#sidebar')

$.get("./pages/nav_flow.html", function (data) {
	$('#nav-flow').html(data)
})

//*	RIBBON
	$('<div>', {
		id: 'rbn-flow',
		class: 'tabcontent'
	}).appendTo('#sidebar')
	
	$.get("./pages/rbn_flow.html", function (data) {
		$('#rbn-flow').html(data)
	})



	

//* -------------------------------------------------------------------------- */
//*                                    CHART                                   */
//* -------------------------------------------------------------------------- */

//*	WRAPPER
$('<div>', {
	id: 'wrp-chart',
	class: 'tabcontent'
	}).appendTo('#wrapper')

$.get("./pages/wrp_chart.html", function(data){
    $('#wrp-chart').html(data)
})
	
//*	SIDEBAR
$('<div>', {
	id: 'nav-chart',
	class: 'tabcontent'
	}).appendTo('#sidebar')

$.get("./pages/nav_chart.html", function(data){
    $('#nav-chart').html(data)
	})

//*	RIBBON
$('<div>', {
	id: 'rbn-chart',
	class: 'tabcontent'
	}).appendTo('#sidebar')

$.get("./pages/rbn_chart.html", function(data){
    $('#rbn-chart').html(data)
	})





//* -------------------------------------------------------------------------- */
//*                                    DEFS1                                   */
//* -------------------------------------------------------------------------- */

