@echo off
taskkill /f /im reflexio.exe 2>nul
move "C:\Users\admin\.reflexio" "C:\Users\admin\.reflexio_old" >nul 2>&1
if exist "C:\Users\admin\.reflexio" (
    echo MOVE_FAILED - trying rmdir on data files first
    del /f /q "C:\Users\admin\.reflexio\data\*" 2>nul
    rmdir /q "C:\Users\admin\.reflexio\data" 2>nul
    rmdir /q "C:\Users\admin\.reflexio\configs" 2>nul
    move "C:\Users\admin\.reflexio" "C:\Users\admin\.reflexio_old" >nul 2>&1
    if exist "C:\Users\admin\.reflexio" (
        echo STILL_FAILED
        exit /b 1
    )
)
echo MOVE_OK
mklink /J "C:\Users\admin\.reflexio" "F:\claude data\.reflexio"
echo JUNCTION_OK
rmdir /s /q "C:\Users\admin\.reflexio_old" 2>nul
echo ALL_DONE
