const electron = require('electron')
const { ipcRenderer } = require('electron')
const ipc = require('electron').ipcRenderer


const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./data/SB_FTP_PLANSICHTER.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) { console.error(err.message) }
	else {console.log('Connected to the Plansichter database.')}
})


loadList()
function loadList() {
	sql = `SELECT NoSQMA, Rev FROM Reg_SQMA`
	db.each(sql, [], (err, row) => {
		if (err) { throw err }
		else {
			// let sqma = row.NoSQMA; sqma = sqma.toString(sqma,10)
			// let rev = row.Rev; rev = rev.toString(rev,10)
			// let s = sqma+'-'+rev

			let s = row.NoSQMA+'-'+row.Rev
			$('#dropLoadSQMA').append(`<a onclick="sndSQMA2main(${row.NoSQMA},${row.Rev})">${s}</a>`)
		}
	})
	db.close()
}



function filterSQMAREV() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("inputLoadSQMA");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropLoadSQMA");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}


function sndSQMA2main(nSQMA, nRev) {
	var s = nSQMA + '-' + nRev
	console.log(s)
}