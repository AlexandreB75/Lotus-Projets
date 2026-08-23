#!/usr/bin/env python3
"""Vault Librarian — analisa o vault Obsidian e gera relatório de manutenção."""

import os
import re
import sys
import subprocess
from pathlib import Path
from datetime import datetime

VAULT_PATH = Path(os.environ.get("VAULT_PATH", Path.home() / "Lotus-Projets/obsidian-vault"))
REPORT_PATH = VAULT_PATH / "01-Dashboard/Relatorio-Manutencao.md"

IGNORE_DIRS = {".obsidian", ".git"}

FOLDER_LABELS = {
    "00-Sistema": "Sistema",
    "01-Dashboard": "Dashboard",
    "02-Projetos": "Projetos",
    "03-Squads": "Squads",
    "04-Skills": "Skills",
    "05-Contexto": "Contexto",
    "06-Scripts": "Scripts",
    "07-Objecoes": "Objeções",
    "08-Raw": "Raw",
    "09-Wiki-Compilado": "Wiki Compilado",
    "Agentes-Operacionais": "Agentes Operacionais",
}


def find_all_notes():
    notes = []
    for p in VAULT_PATH.rglob("*.md"):
        parts = p.relative_to(VAULT_PATH).parts
        if not any(part in IGNORE_DIRS for part in parts):
            notes.append(p)
    return notes


def extract_wikilinks(content):
    # [[Target]] or [[Target|Alias]] or [[Target#heading]]
    return re.findall(r'\[\[([^\]|#\n]+)', content)


def build_note_index(notes):
    index = {}
    for note in notes:
        stem = note.stem.lower()
        index[stem] = note
        # Also index by relative path without extension
        rel = str(note.relative_to(VAULT_PATH).with_suffix("")).lower()
        index[rel] = note
    return index


def check_broken_links(notes, note_index):
    broken = []
    for note in notes:
        try:
            content = note.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        links = extract_wikilinks(content)
        for link in links:
            clean = link.strip().lower()
            # Check by stem and by path
            if clean not in note_index:
                broken.append({
                    "source": str(note.relative_to(VAULT_PATH)),
                    "broken_link": link.strip(),
                })
    return broken


def find_orphan_raws(notes):
    raw_dir = VAULT_PATH / "08-Raw"
    if not raw_dir.exists():
        return []
    orphans = []
    for note in notes:
        if "08-Raw" not in note.parts:
            continue
        try:
            content = note.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        links = extract_wikilinks(content)
        if not links:
            age_days = int((datetime.now().timestamp() - note.stat().st_mtime) / 86400)
            orphans.append({
                "file": str(note.relative_to(VAULT_PATH)),
                "age_days": age_days,
            })
    return orphans


def count_by_folder(notes):
    counts = {}
    for note in notes:
        parts = note.relative_to(VAULT_PATH).parts
        folder = parts[0] if parts else "raiz"
        label = FOLDER_LABELS.get(folder, folder)
        counts[label] = counts.get(label, 0) + 1
    return counts


def generate_report(broken, orphans, notes, folder_counts):
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    total = len(notes)

    lines = [
        "---",
        f"date: {now}",
        "type: manutencao",
        "---",
        "",
        f"# Relatório de Manutenção — {now}",
        "",
        "## Resumo",
        "",
        "| Métrica | Valor |",
        "|---------|-------|",
        f"| Total de notas | {total} |",
        f"| Wikilinks quebrados | {len(broken)} |",
        f"| Notas órfãs em 08-Raw | {len(orphans)} |",
        "",
        "## Notas por pasta",
        "",
        "| Pasta | Notas |",
        "|-------|-------|",
    ]
    for folder, count in sorted(folder_counts.items(), key=lambda x: -x[1]):
        lines.append(f"| {folder} | {count} |")

    lines += [""]

    # Broken links
    lines.append("## Wikilinks Quebrados")
    lines.append("")
    if broken:
        lines.append("Links que apontam para arquivos inexistentes — corrigir ou remover:\n")
        for item in broken[:30]:
            lines.append(f"- `{item['source']}` → `[[{item['broken_link']}]]`")
        if len(broken) > 30:
            lines.append(f"\n_...e mais {len(broken) - 30} links não listados._")
    else:
        lines.append("Nenhum link quebrado encontrado.")
    lines.append("")

    # Orphan raws
    lines.append("## Notas Órfãs em 08-Raw")
    lines.append("")
    if orphans:
        lines.append("Notas sem wikilinks de saída — processar, mover ou descartar:\n")
        for item in sorted(orphans, key=lambda x: -x["age_days"]):
            lines.append(f"- `{item['file']}` ({item['age_days']} dias sem edição)")
    else:
        lines.append("Nenhuma nota órfã encontrada.")
    lines.append("")

    lines += ["---", "_Gerado automaticamente por Vault Librarian_"]
    return "\n".join(lines)


def main():
    print(f"Vault Librarian — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"Vault: {VAULT_PATH}")

    if not VAULT_PATH.exists():
        print(f"ERRO: vault não encontrado em {VAULT_PATH}", file=sys.stderr)
        sys.exit(1)

    notes = find_all_notes()
    print(f"Notas encontradas: {len(notes)}")

    note_index = build_note_index(notes)
    broken = check_broken_links(notes, note_index)
    print(f"Wikilinks quebrados: {len(broken)}")

    orphans = find_orphan_raws(notes)
    print(f"Notas órfãs em 08-Raw: {len(orphans)}")

    folder_counts = count_by_folder(notes)
    report = generate_report(broken, orphans, notes, folder_counts)

    REPORT_PATH.write_text(report, encoding="utf-8")
    print(f"Relatório salvo em: {REPORT_PATH}")

    # Auto-commit if inside a git repo
    repo_root = VAULT_PATH.parent
    try:
        subprocess.run(
            ["git", "add", str(REPORT_PATH)],
            cwd=repo_root, check=True, capture_output=True
        )
        subprocess.run(
            ["git", "commit", "-m", f"chore(vault): relatório de manutenção {datetime.now().strftime('%Y-%m-%d')}"],
            cwd=repo_root, check=True, capture_output=True
        )
        subprocess.run(
            ["git", "push"],
            cwd=repo_root, check=True, capture_output=True
        )
        print("Relatório commitado e pushed.")
    except subprocess.CalledProcessError:
        print("Git commit/push ignorado (nada novo ou sem acesso).")

    return {"broken": len(broken), "orphans": len(orphans), "total": len(notes)}


if __name__ == "__main__":
    main()
