###### Bloomora

# project_structure tree 

Get-ChildItem -Recurse -File |
Where-Object {
    $_.FullName -notmatch '\\(node_modules|\.git|dist|build|\.next|coverage)(\\|$)'
} |
ForEach-Object {
    $_.FullName.Replace((Resolve-Path .).Path + '\', '')
} |
Set-Content -Path "project_structure.txt"