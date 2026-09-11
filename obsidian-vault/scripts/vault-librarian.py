#!/usr/bin/env python3
"""Read-only Obsidian vault audit that writes a dated Markdown report."""

from __future__ import annotations

import argparse
import re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


WIKILINK_PATTERN = re.compile(r"(?<!!)\[\[([^\]]+)\]\]")
IGNORED_DIRECTORIES = {".git", ".obsidian", ".trash", "node_modules", "__pycache__"}
DEFAULT_REPORT_DIRECTORY = Path("00-Sistema") / "Relatorios-Vault"


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Audita links e notas de um vault Obsidian sem alterar notas existentes."
    )
    parser.add_argument(
        "--vault-root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="Raiz do vault (padrão: diretório pai de scripts/).",
    )
    parser.add_argument(
        "--report-dir",
        type=Path,
        default=DEFAULT_REPORT_DIRECTORY,
        help="Pasta do relatório, relativa à raiz do vault.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        default=True,
        help="Modo padrão e único: apenas analisa; nunca altera notas do vault.",
    )
    return parser.parse_args()


def is_scannable(path: Path, vault_root: Path, report_directory: Path) -> bool:
    relative_parts = path.relative_to(vault_root).parts
    return not any(part in IGNORED_DIRECTORIES for part in relative_parts) and not path.is_relative_to(
        report_directory
    )


def find_markdown_notes(vault_root: Path, report_directory: Path) -> list[Path]:
    return sorted(
        path
        for path in vault_root.rglob("*.md")
        if is_scannable(path, vault_root, report_directory)
    )


def normalized_path(path: Path, vault_root: Path) -> str:
    return path.relative_to(vault_root).as_posix()


def extract_wikilinks(note: Path) -> list[str]:
    try:
        content = note.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        content = note.read_text(encoding="utf-8", errors="replace")
    return [match.group(1).strip() for match in WIKILINK_PATTERN.finditer(content)]


def resolve_target(
    target: str, source_note: Path, vault_root: Path, notes_by_name: dict[str, list[Path]]
) -> tuple[str, Path | None]:
    """Return resolution state: resolved, missing, ambiguous, or ignored."""
    target = target.split("|", 1)[0].split("#", 1)[0].strip().replace("\\", "/")
    if not target or "://" in target or target.startswith("mailto:"):
        return "ignored", None

    has_path = "/" in target
    candidates: list[Path] = []
    if has_path:
        target_path = (
            source_note.parent / target if target.startswith(("./", "../")) else vault_root / target
        )
        candidates = [target_path]
        if target_path.suffix.lower() != ".md":
            candidates.append(target_path.with_suffix(".md"))
    else:
        candidates = notes_by_name.get(Path(target).stem.casefold(), [])

    matches = [candidate for candidate in candidates if candidate.is_file()]
    if len(matches) == 1:
        return "resolved", matches[0]
    if len(matches) > 1:
        return "ambiguous", None
    return "missing", None


def markdown_table(rows: list[tuple[str, ...]], headers: tuple[str, ...]) -> list[str]:
    if not rows:
        return ["Nenhum item encontrado."]
    divider = tuple("---" for _ in headers)
    result = ["| " + " | ".join(headers) + " |", "| " + " | ".join(divider) + " |"]
    result.extend("| " + " | ".join(row) + " |" for row in rows)
    return result


def main() -> int:
    args = parse_arguments()
    vault_root = args.vault_root.resolve()
    report_directory = (vault_root / args.report_dir).resolve()
    if not vault_root.is_dir():
        raise SystemExit(f"Raiz do vault não encontrada: {vault_root}")
    if not report_directory.is_relative_to(vault_root):
        raise SystemExit("A pasta de relatórios deve ficar dentro do vault.")

    notes = find_markdown_notes(vault_root, report_directory)
    notes_by_name: dict[str, list[Path]] = defaultdict(list)
    for note in notes:
        notes_by_name[note.stem.casefold()].append(note)

    inbound_links: Counter[Path] = Counter()
    broken_links: list[tuple[str, str]] = []
    ambiguous_links: list[tuple[str, str]] = []
    for note in notes:
        for raw_link in extract_wikilinks(note):
            state, destination = resolve_target(raw_link, note, vault_root, notes_by_name)
            if state == "resolved" and destination is not None:
                inbound_links[destination] += 1
            elif state == "missing":
                broken_links.append((normalized_path(note, vault_root), raw_link))
            elif state == "ambiguous":
                ambiguous_links.append((normalized_path(note, vault_root), raw_link))

    orphan_notes = [note for note in notes if inbound_links[note] == 0]
    folder_counts: Counter[str] = Counter(
        str(note.parent.relative_to(vault_root)).replace("\\", "/") or "." for note in notes
    )

    now = datetime.now(ZoneInfo("America/Sao_Paulo"))
    report_name = f"Vault-Librarian-{now:%Y-%m-%d-%H%M%S}.md"
    report_path = report_directory / report_name
    report_relative_path = normalized_path(report_path, vault_root)

    lines = [
        "---",
        "tags: [sistema, vault-librarian, relatorio]",
        "tipo: auditoria",
        "modo: dry-run",
        f"gerado_em: {now.isoformat(timespec='seconds')}",
        "---",
        "",
        f"# Relatório Vault Librarian — {now:%Y-%m-%d %H:%M}",
        "",
        "> Auditoria somente de leitura. Nenhuma nota foi movida, fundida, excluída ou editada.",
        "",
        "## Resumo",
        "",
        f"- Notas Markdown analisadas: **{len(notes)}**",
        f"- Links internos quebrados: **{len(broken_links)}**",
        f"- Links internos ambíguos: **{len(ambiguous_links)}**",
        f"- Notas sem links recebidos: **{len(orphan_notes)}**",
        "",
        "## Links internos quebrados",
        "",
        *markdown_table(broken_links, ("Nota de origem", "Link")),
        "",
        "## Links internos ambíguos",
        "",
        *markdown_table(ambiguous_links, ("Nota de origem", "Link")),
        "",
        "## Notas órfãs",
        "",
        *markdown_table([(normalized_path(note, vault_root),) for note in orphan_notes], ("Nota",)),
        "",
        "## Notas por pasta",
        "",
        *markdown_table(
            [(folder, str(count)) for folder, count in sorted(folder_counts.items())],
            ("Pasta", "Notas Markdown"),
        ),
        "",
        "## Como revisar",
        "",
        "1. Confirme cada link quebrado antes de corrigi-lo manualmente.",
        "2. Verifique se uma nota órfã é realmente dispensável ou apenas precisa ser indexada.",
        "3. Trate links ambíguos escolhendo explicitamente o destino correto.",
    ]

    report_directory.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print("VAULT LIBRARIAN SUMMARY")
    print("Mode: dry-run (read-only)")
    print(f"Report: {report_relative_path}")
    print(f"Notes scanned: {len(notes)}")
    print(f"Broken links: {len(broken_links)}")
    print(f"Ambiguous links: {len(ambiguous_links)}")
    print(f"Orphan notes: {len(orphan_notes)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
