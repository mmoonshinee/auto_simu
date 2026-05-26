Get-Process | Where-Object { $_.ProcessName -eq 'node' -or $_.ProcessName -like '*reflex*' } | Select-Object Id, ProcessName, MainWindowTitle | Format-Table -AutoSize
