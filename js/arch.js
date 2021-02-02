

//* -------------------------------------------------------------------------- */
//*                                  MAIN DEFS                                 */
//* -------------------------------------------------------------------------- */

const electron = require('electron')
const { ipcRenderer } = require('electron')
const isDev = process.env.NODE_ENV !== 'production'

const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./data/SB_FTP_PLANSICHTER.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the Plansichter database.')
})



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
	}).appendTo('#menu-ribbon')
	
	$.get("./pages/rbn_flow.html", function (data) {
		$('#rbn-flow').html(data)
	})

//*	FOOTER
	$('<div>', {
		id: 'z-flow',
		class: 'tabcontent'
	}).appendTo('#StatusBar')
	
	$.get("./pages/z_flow.html", function (data) {
		$('#z-flow').html(data)
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
	}).appendTo('#menu-ribbon')

$.get("./pages/rbn_chart.html", function(data){
    $('#rbn-chart').html(data)
	})

//*	FOOTER
	$('<div>', {
		id: 'z-chart',
		class: 'tabcontent'
	}).appendTo('#StatusBar')
	
	$.get("./pages/z_chart.html", function (data) {
		$('#z-chart').html(data)
	})



//* -------------------------------------------------------------------------- */
//*                                    DEFS1                                   */
//* -------------------------------------------------------------------------- */

//*	WRAPPER
$('<div>', {
	id: 'wrp-defs1',
	class: 'tabcontent'
	}).appendTo('#wrapper')

$.get("./pages/wrp_defs1.html", function(data){
    $('#wrp-defs1').html(data)
})
	
//*	SIDEBAR
$('<div>', {
	id: 'nav-defs1',
	class: 'tabcontent'
	}).appendTo('#sidebar')

$.get("./pages/nav_defs1.html", function(data){
    $('#nav-defs1').html(data)
	})

//*	RIBBON
$('<div>', {
	id: 'rbn-defs1',
	class: 'tabcontent'
	}).appendTo('#menu-ribbon')

$.get("./pages/rbn_defs1.html", function(data){
    $('#rbn-defs1').html(data)
})
	
//*	FOOTER
	$('<div>', {
		id: 'z-defs1',
		class: 'tabcontent'
	}).appendTo('#StatusBar')
	
	$.get("./pages/z_defs1.html", function (data) {
		$('#z-defs1').html(data)
	})








//* -------------------------------------------------------------------------- */
//*                                 TESTES SQL                                 */
//* -------------------------------------------------------------------------- */

$('#wrp-chart').append(`<p>.<br></p>`)
let sql = `SELECT NoSQMN, Rev FROM Reg_SQMN`
db.each(sql, [], (err, row) => {
  if (err) {
    throw err
  }
  	$('#wrp-chart').append(`<p>Esquemino Nº ${row.NoSQMN}-${row.Rev} </p>`)
})





	