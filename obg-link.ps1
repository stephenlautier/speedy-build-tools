param (
	[string]$package = ""
)

$prefix = "@obg/"
$fullName = "${prefix}$package"

Write-Host "Linking '$fullName'..." -ForegroundColor Magenta
Write-Host ""

Write-Host "NPM linking..." -ForegroundColor Magenta
npm link $fullName
Write-Host ""

Write-Host "Typings install..." -ForegroundColor Magenta
typings i npm:${fullName}
Write-Host ""