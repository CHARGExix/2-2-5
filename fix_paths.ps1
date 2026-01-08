
Write-Host "Patching HTML files for portable hosting..."

$htmlFiles = Get-ChildItem -Path "docs" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix CSS links
    $content = $content -replace 'href="/_next', 'href="./_next'
    # Fix JS scripts
    $content = $content -replace 'src="/_next', 'src="./_next'
    # Fix Favicon
    $content = $content -replace 'href="/favicon.ico', 'href="./favicon.ico'
    # Fix public assets (images) just in case
    $content = $content -replace 'href="/burger', 'href="./burger'
    $content = $content -replace 'src="/burger', 'src="./burger'
    
    $content | Set-Content $file.FullName -NoNewline
    Write-Host "Patched $($file.Name)"
}

Write-Host "Success! The 'docs' folder is now fully portable."
