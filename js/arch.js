

//* -------------------------------------------------------------------------- */
//*                                    FLOW                                    */
//* -------------------------------------------------------------------------- */

$('<div>', {
	id: 'wrp-flow',
	class: 'tabcontent'
	}).appendTo('#wrapper')

$.get("./pages/wrp_flow.html", function (data) {
    $('#wrp-flow').html(data)
})
	

$('<div>', {
	id: 'nav-flow',
	class: 'tabcontent'
	}).appendTo('#sidebar')

$.get("./pages/nav_flow.html", function (data) {
    $('#nav-flow').html(data)
	})




	

//* ---------------------------- CREATE CHART DIV --------------------------- */
$('<div>', {
	id: 'wrp-chart',
	class: 'tabcontent'
	}).appendTo('#wrapper')

$.get("./pages/wrp_chart.html", function(data){
    $('#wrp-chart').html(data)
	})


