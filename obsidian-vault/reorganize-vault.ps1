# Reorganizacao do Vault Obsidian - CLAUDE CODE
# Execute este script na pasta raiz do seu vault
# Como usar: clique com botao direito no arquivo > Executar com PowerShell

$VaultPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "Reorganizando vault em: $VaultPath" -ForegroundColor Cyan

# ============================================================
# 1. EXCLUIR node_modules DO OBSIDIAN (criar .obsidianignore)
# ============================================================
$ignoreFile = Join-Path $VaultPath ".obsidianignore"
@"node_modules
.git
*.log
"@ | Set-Content $ignoreFile -Encoding UTF8
Write-Host "[OK] .obsidianignore criado" -ForegroundColor Green

# ============================================================
# 2. CRIAR NOVA ESTRUTURA DE PASTAS
# ============================================================
$folders = @(
    "00-Sistema",
    "00-Sistema\_config",
    "00-Sistema\_memory",
    "00-Sistema\_investigations",
    "00-Sistema\_logs",
    "00-Sistema\_core",
    "01-Dashboard",
    "02-Projetos",
    "02-Projetos\Lotus-Projets",
    "02-Projetos\Hubspot",
    "02-Projetos\Hubspot\lotus-business",
    "02-Projetos\Hubspot\lotus-landing",
    "03-Squads",
    "04-Skills",
    "05-Contexto",
    "Templates"
)

foreach ($folder in $folders) {
    $fullPath = Join-Path $VaultPath $folder
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "[CRIADO] $folder" -ForegroundColor Yellow
    }
}

# ============================================================
# 3. MOVER _opensquad -> 00-Sistema
# ============================================================
$opensquad = Join-Path $VaultPath "_opensquad"
if (Test-Path $opensquad) {
    $destSistema = Join-Path $VaultPath "00-Sistema"
    Get-ChildItem $opensquad | ForEach-Object {
        $dest = Join-Path $destSistema $_.Name
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName $dest
            Write-Host "[MOVIDO] _opensquad\$($_.Name) -> 00-Sistema\$($_.Name)" -ForegroundColor Blue
        }
    }
    Remove-Item $opensquad -Force -Recurse
    Write-Host "[OK] _opensquad consolidado em 00-Sistema" -ForegroundColor Green
}

# ============================================================
# 4. MOVER dashboard -> 01-Dashboard
# ============================================================
$dashboard = Join-Path $VaultPath "dashboard"
$dashDest = Join-Path $VaultPath "01-Dashboard"
if (Test-Path $dashboard) {
    Get-ChildItem $dashboard | ForEach-Object {
        Move-Item $_.FullName (Join-Path $dashDest $_.Name) -Force
    }
    Remove-Item $dashboard -Force -Recurse
    Write-Host "[OK] dashboard -> 01-Dashboard" -ForegroundColor Green
}

# ============================================================
# 5. MOVER Hubspot e Lotus-Projets -> 02-Projetos
# ============================================================
$hubspot = Join-Path $VaultPath "Hubspot"
$lotus = Join-Path $VaultPath "Lotus-Projets"
if (Test-Path $hubspot) {
    Move-Item $hubspot (Join-Path $VaultPath "02-Projetos\Hubspot") -Force
    Write-Host "[OK] Hubspot -> 02-Projetos\Hubspot" -ForegroundColor Green
}
if (Test-Path $lotus) {
    Move-Item $lotus (Join-Path $VaultPath "02-Projetos\Lotus-Projets") -Force
    Write-Host "[OK] Lotus-Projets -> 02-Projetos\Lotus-Projets" -ForegroundColor Green
}

# ============================================================
# 6. UNIFICAR squads e xquads -> 03-Squads
# ============================================================
$squads = Join-Path $VaultPath "squads"
$xquads = Join-Path $VaultPath "xquads"
$squadsDest = Join-Path $VaultPath "03-Squads"

if (Test-Path $squads) {
    Get-ChildItem $squads | ForEach-Object {
        $dest = Join-Path $squadsDest $_.Name
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName $dest
            Write-Host "[MOVIDO] squads\$($_.Name) -> 03-Squads" -ForegroundColor Blue
        }
    }
    Remove-Item $squads -Force -Recurse
}

if (Test-Path $xquads) {
    $xSquadsInner = Join-Path $xquads "squads"
    if (Test-Path $xSquadsInner) {
        Get-ChildItem $xSquadsInner | ForEach-Object {
            $dest = Join-Path $squadsDest $_.Name
            if (-not (Test-Path $dest)) {
                Move-Item $_.FullName $dest
                Write-Host "[MOVIDO] xquads\squads\$($_.Name) -> 03-Squads" -ForegroundColor Blue
            }
        }
    }
    Remove-Item $xquads -Force -Recurse
}
Write-Host "[OK] Squads unificados em 03-Squads" -ForegroundColor Green

# ============================================================
# 7. MOVER skills -> 04-Skills
# ============================================================
$skills = Join-Path $VaultPath "skills"
$skillsDest = Join-Path $VaultPath "04-Skills"
if (Test-Path $skills) {
    Get-ChildItem $skills | ForEach-Object {
        $dest = Join-Path $skillsDest $_.Name
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName $dest
        }
    }
    Remove-Item $skills -Force -Recurse
    Write-Host "[OK] skills -> 04-Skills" -ForegroundColor Green
}

# ============================================================
# 8. MOVER arquivos de contexto -> 05-Contexto
# ============================================================
$contexto = Join-Path $VaultPath "05-Contexto"
$ctxFiles = @("Contexto_Permanente.txt", "CLAUDE", "Claude Memory")
foreach ($f in $ctxFiles) {
    $src = Join-Path $VaultPath $f
    if (Test-Path $src) {
        Move-Item $src (Join-Path $contexto $f) -Force
        Write-Host "[MOVIDO] $f -> 05-Contexto" -ForegroundColor Blue
    }
}

# ============================================================
# 9. CRIAR .gitignore para node_modules (se nao existir)
# ============================================================
$gitignore = Join-Path $VaultPath ".gitignore"
if (-not (Test-Path $gitignore)) {
    @"node_modules/
.obsidian/workspace.json
"@ | Set-Content $gitignore -Encoding UTF8
    Write-Host "[OK] .gitignore criado" -ForegroundColor Green
}

Write-Host ""
Write-Host "==============================" -ForegroundColor Cyan
Write-Host " Reorganizacao concluida! " -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "Reinicie o Obsidian para ver as mudancas." -ForegroundColor White
Write-Host ""
Pause
