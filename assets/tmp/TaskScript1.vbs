
Const OverwriteExisting = TRUE
' Set objFSO = CreateObject("Scripting.FileSystemObject")
' Set objFile = objFSO.GetFile("C:\tmp\Teste.txt")
' Wscript.Echo "Absolute path: " & objFSO.GetAbsolutePathName(objFile)
' Wscript.Echo "Parent folder: " & objFSO.GetParentFolderName(objFile) 
' Wscript.Echo "File name: " & objFSO.GetFileName(objFile)
' Wscript.Echo "Base name: " & objFSO.GetBaseName(objFile)
' Wscript.Echo "Extension name: " & objFSO.GetExtensionName(objFile)

Set objFSO = CreateObject("Scripting.FileSystemObject")

sFileName = "SB_FTP_PLANSICHTER.db"
sPathFrom = "\\ce-srv-ads-fs\dados$\Detec\Biblioteca SP\"
' sPathDest = "\\ce-srv-ads-fs\dados$\Detec\DTN\Fichas Técnicas Padrões - Matriz\Concluídas\FORTRESS PROTHEUS\Backup SQLite\"
sPathDest = "\\ce-srv-ads-fs\dados$\Usuarios\Madson\Backup\DB_Fortress\"

sDate = Year(Now())
If Month(Now()) < 10 Then
	sDate = sDate & "0"
End If
sDate = sDate & Month(Now())
If Day(Now()) < 10 Then
	sDate = sDate & "0"
End If
sDate = sDate & Day(Now()) & "-" & Hour(Now()) & Minute(Now())

if objFSO.FolderExists(sPathDest) then
 wscript.echo "Message: The folder exists"
 wscript.echo "Statistic: 1"
else
 wscript.echo "Message: The folder does not exists"
 wscript.echo "Statistic: 0"
end if

' For Each objFolder In objFSO.GetFolder(sPathDest).SubFolders
'     WScript.Echo objFolder.Path
' Next


objFSO.CopyFile sPathFrom & sFileName , sPathDest, OverwriteExisting
objFSO.MoveFile sPathDest  & sFileName , sPathDest  & Replace(sFileName, ".", " - BACKUP " & sDate & ".")