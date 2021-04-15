Option Explicit
Const WshFinished = 1
Const WshFailed = 2
Dim strCommand1, strCommand2

strCommand1 = """sqlite3.exe"" ""mydatabase.sqlite"" ""CREATE TABLE person ( id int, name varchar(30), phone varchar(30) );INSERT INTO person VALUES (1, 'Jim', '123446223');INSERT INTO person VALUES (2, 'Tom', '232124303');INSERT INTO person VALUES (3, 'Bill', '812947283');INSERT INTO person VALUES (4, 'Alice', '351246233');"" "

strCommand2 = """sqlite3.exe"" ""mydatabase.sqlite"" ""SELECT name from person where id=2;"" "

Dim WshShell, WshShellExec

Set WshShell = CreateObject("WScript.Shell")
Set WshShellExec = WshShell.Exec(strCommand1)
Set WshShellExec = WshShell.Exec(strCommand2)

Do While WshShellExec.Status = 0
WScript.Sleep 100
Loop

Dim strOutput

Select Case WshShellExec.Status
Case WshFinished
strOutput = WshShellExec.StdOut.ReadAll
Case WshFailed
strOutput = WshShellExec.StdErr.ReadAll
End Select

WScript.Echo strOutput