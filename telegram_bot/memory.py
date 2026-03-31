import json
import os

MEMORY_FILE = os.path.join(os.path.dirname(__file__), "memory.json")
MAX_HISTORY = 20


def _load() -> dict:
    if not os.path.exists(MEMORY_FILE):
        return {}
    with open(MEMORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _save(data: dict) -> None:
    with open(MEMORY_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def get_history(chat_id: int) -> list:
    data = _load()
    return data.get(str(chat_id), [])


def add_message(chat_id: int, role: str, content: str) -> None:
    data = _load()
    key = str(chat_id)
    if key not in data:
        data[key] = []
    data[key].append({"role": role, "content": content})
    # Mantém apenas as últimas MAX_HISTORY mensagens
    if len(data[key]) > MAX_HISTORY:
        data[key] = data[key][-MAX_HISTORY:]
    _save(data)


def clear_history(chat_id: int) -> None:
    data = _load()
    data.pop(str(chat_id), None)
    _save(data)
