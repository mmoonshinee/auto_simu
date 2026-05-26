@echo off
echo Killing reflexio...
taskkill /f /pid 24144 2>nul
echo Waiting...
timeout /t 2 /nobreak >nul
echo Deleting C:\Users\admin\.reflexio...
rmdir /s /q "C:\Users\admin\.reflexio" 2>nul
if exist "C:\Users\admin\.reflexio" (
    echo Still exists - trying to delete in-use files first...
    del /f /q "C:\Users\admin\.reflexio\data\reflexio.db-wal" 2>nul
    del /f /q "C:\Users\admin\.reflexio\data\reflexio.db-shm" 2>nul
    del /f /q "C:\Users\admin\.reflexio\data\reflexio.db" 2>nul
    rmdir /s /q "C:\Users\admin\.reflexio" 2>nul
)
if exist "C:\Users\admin\.reflexio" (
    echo STILL EXISTS
) else (
    echo Deleted OK. Creating junction...
    mklink /J "C:\Users\admin\.reflexio" "F:\claude data\.reflexio"
    echo Done!
)
