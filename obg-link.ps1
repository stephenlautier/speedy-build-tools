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