
Const OverwriteExisting = TRUE

Set objFSO = CreateObject("Scripting.FileSystemObject")

sFileName = "SB_FTP_PLANSICHTER.db"
sPathFrom = "\\ce-srv-ads-fs\dados$\Detec\Biblioteca SP\"
sPathDest = "\\ce-srv-ads-fs\dados$\Usuarios\Madson\Backup\DB_Fortress\"

sDate = Year(Now())

If Month(Now()) < 10 Then
	sDate = sDate & "0"
End If
sDate = sDate & Month(Now())

If Day(Now()) < 10 Then
	sDate = sDate & "0"
End If
sDate = sDate & Day(Now()) & "-"

If Hour(Now()) < 10 Then
	sDate = sDate & "0"
End If
sDate = sDate & Hour(Now())

If Minute(Now()) < 10 Then
	sDate = sDate & "0"
End If
sDate = sDate & Minute(Now())


objFSO.CopyFile sPathFrom & sFileName , sPathDest, OverwriteExisting
objFSO.MoveFile sPathDest  & sFileName , sPathDest  & Replace(sFileName, ".", " - BACKUP " & sDate & ".")