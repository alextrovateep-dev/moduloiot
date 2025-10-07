@echo off
echo ========================================
echo  TEEP - Servidor Local
echo ========================================
echo.
echo Iniciando servidor HTTP na porta 8000...
echo.
echo Acesse o sistema em:
echo http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

python -m http.server 8000

