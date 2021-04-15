Option Explicit
Const WshFinished = 1
Const WshFailed = 2
Dim strCommand

Dim id
id = WScript.Arguments(0)

strCommand = """sqlite3.exe"" ""mydatabase.sqlite"" ""SELECT name from person where id="& id &";""  "

Dim WshShell, WshShellExec

Set WshShell = CreateObject("WScript.Shell")
Set WshShellExec = WshShell.Exec(strCommand)

Do While WshShellExec.Status = 0
wscript.Sleep 100
Loop

Dim strOutput

Select Case WshShellExec.Status
Case WshFinished
strOutput = WshShellExec.StdOut.ReadAll
Case WshFailed
strOutput = WshShellExec.StdErr.ReadAll
End Select

wscript.Echo strOutput