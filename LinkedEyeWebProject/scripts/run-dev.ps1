# Start LinkedEye Django dev server (loads .env automatically via settings.py)
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

if (Test-Path ".\docker\vault-django.env.ps1") {
    . .\docker\vault-django.env.ps1
}

Write-Host "Starting Django on http://127.0.0.1:8000 ..."
python manage.py runserver 0.0.0.0:8000
