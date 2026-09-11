"""
Lótus Business — Gerador de criativos via fal.ai (FLUX.1-dev)
Uso: python generate_ads.py
Requisito: pip install fal-client requests
Auth: set FAL_KEY=sua_chave_aqui  (obtenha em https://fal.ai/dashboard/keys)
"""

import os
import sys
import json
import requests
from pathlib import Path

try:
    import fal_client
except ImportError:
    print("Erro: instale o pacote fal-client\n  pip install fal-client requests")
    sys.exit(1)

FAL_KEY = os.environ.get("FAL_KEY")
if not FAL_KEY:
    print("Erro: variável de ambiente FAL_KEY não definida.")
    print("  Windows PowerShell: $env:FAL_KEY = 'sua_chave'")
    print("  Obtenha sua chave em: https://fal.ai/dashboard/keys")
    sys.exit(1)

os.environ["FAL_KEY"] = FAL_KEY

CREATIVES = [
    {
        "id": "C1-Feed-1x1",
        "concept": "PAS Empresário — Patrimônio",
        "image_size": "square_hd",
        "prompt": (
            "#06080D deep near-black background, #B8965A warm amber gold tracing vertical structural edges "
            "of a soaring modern glass-and-steel corporate tower. Extreme low-angle upward shot at night, "
            "tower centered rising from bottom-center frame, bottom 20% flat dark foreground reserved for copy. "
            "Generous dark negative space flanking both sides. Cinematic low-key single directional key light, "
            "hard shadow on right facade, 35mm tilt-shift lens. No people, no residential context, no beach. "
            "Premium authoritative corporate permanence, no text, no labels. "
            "Photorealistic, 8K, shot on Phase One XF IQ4."
        ),
    },
    {
        "id": "C1-Stories-9x16",
        "concept": "PAS Empresário — Patrimônio (vertical)",
        "image_size": "portrait_16_9",
        "prompt": (
            "#06080D near-black vertical background, a full-height modern glass corporate tower centered "
            "in a 9:16 frame, #B8965A amber gold light delineating every floor slab edge and corner column. "
            "Low-angle centered portrait shot at night, tower spine from bottom-center to top-center, "
            "critical content between 15%-85% frame height, clean dark safe zones at top and bottom 15%. "
            "Soft amber rim light from behind-left, 50mm minimal distortion. "
            "No people, no residential scenes, no beach. Exclusive authoritative permanence, no text, no labels. "
            "Photorealistic, 8K, shot on Phase One XF IQ4."
        ),
    },
    {
        "id": "C2-Feed-1x1",
        "concept": "4P Investidor — Renda PJ",
        "image_size": "square_hd",
        "prompt": (
            "#06080D deep dark field behind a close architectural detail crop of a corporate glass tower "
            "curtain wall, steel mullions and glass panel grid sharp edge-to-edge in a 1:1 frame. "
            "Abstract ascending diagonal data-curve lines in #B8965A warm gold rise from lower-left to "
            "upper-right across the facade geometry, no numbers, no labels. "
            "Bottom 20% clean dark band for copy overlay, upper-left negative space. "
            "Cold blue-steel ambient inside glass, warm gold on curve overlays, 100mm macro sharp. "
            "Editorial investment aesthetic, no people, no text, no readable elements. "
            "Photorealistic, 8K, shot on Phase One XF IQ4."
        ),
    },
    {
        "id": "C2-Stories-9x16",
        "concept": "4P Investidor — Renda PJ (vertical)",
        "image_size": "portrait_16_9",
        "prompt": (
            "#06080D dark void between glass panels of a corporate tower curtain wall filling a full 9:16 "
            "vertical frame edge-to-edge, steel mullion grid precise and sharp. "
            "Abstract ascending data-curve lines in #B8965A gold run continuously from lower frame to upper "
            "frame across the glass grid, no numbers, no text. "
            "Critical content between 15%-85% vertical frame height, top and bottom 15% clean dark for Stories UI. "
            "Center gold curve column, visual emphasis at 40% mark. "
            "85mm compression, cold glass reflection, warm gold curves. "
            "Editorial investment graphic, no people, no labels. "
            "Photorealistic, 8K, shot on Phase One XF IQ4."
        ),
    },
    {
        "id": "C3-Feed-1x1",
        "concept": "BAB Profissional Liberal — Sem banco",
        "image_size": "square_hd",
        "prompt": (
            "#06080D deep dark sky backdrop, a premium corporate building under construction, "
            "freshly completed concrete floor slab with exposed rebar perimeter edge and steel columns "
            "rising above, surfaces raw and precise. "
            "#B8965A warm amber gold raking light from lower-right across the horizontal slab surface "
            "revealing concrete texture and structural joints. "
            "Three-quarter low perspective camera below slab level, slab lower-center third, "
            "columns rising to upper frame, bottom 20% clean dark foreground for copy. "
            "24mm controlled perspective correction, hard key light, deep column shadows. "
            "No workers, no people, no text, no residential context. "
            "Verifiable real progress, corporate authority. "
            "Photorealistic, 8K, shot on Phase One XF IQ4."
        ),
    },
]

OUTPUT_DIR = Path(__file__).parent / "ad-assets"
OUTPUT_DIR.mkdir(exist_ok=True)

MANIFEST = []


def generate(creative: dict) -> dict:
    print(f"\n  Gerando {creative['id']} — {creative['concept']}...")
    result = fal_client.run(
        "fal-ai/flux/schnell",
        arguments={
            "prompt": creative["prompt"],
            "image_size": creative["image_size"],
            "num_inference_steps": 4,
            "guidance_scale": 1.0,
            "num_images": 1,
            "enable_safety_checker": False,
            "seed": 42,
        },
    )
    url = result["images"][0]["url"]
    width = result["images"][0].get("width", "?")
    height = result["images"][0].get("height", "?")

    filename = OUTPUT_DIR / f"{creative['id']}.png"
    response = requests.get(url, timeout=60)
    response.raise_for_status()
    filename.write_bytes(response.content)

    print(f"  Salvo: {filename.name} ({width}x{height})")
    print(f"  URL:   {url}")

    return {
        "id": creative["id"],
        "concept": creative["concept"],
        "file": str(filename),
        "url": url,
        "width": width,
        "height": height,
    }


def main():
    print("=" * 60)
    print("Lótus Business — Geração de Criativos Meta Ads")
    print(f"Modelo: FLUX.1-schnell via fal.ai (teste)")
    print(f"Imagens: {len(CREATIVES)}")
    print(f"Destino: {OUTPUT_DIR}")
    print("=" * 60)

    for creative in CREATIVES:
        try:
            entry = generate(creative)
            MANIFEST.append(entry)
        except Exception as e:
            print(f"  ERRO em {creative['id']}: {e}")
            MANIFEST.append({"id": creative["id"], "error": str(e)})

    manifest_path = OUTPUT_DIR / "generation-manifest.json"
    manifest_path.write_text(json.dumps(MANIFEST, indent=2, ensure_ascii=False))

    print("\n" + "=" * 60)
    print("Concluído")
    ok = [e for e in MANIFEST if "url" in e]
    err = [e for e in MANIFEST if "error" in e]
    print(f"  Geradas com sucesso: {len(ok)}/{len(CREATIVES)}")
    if err:
        print(f"  Erros: {len(err)}")
        for e in err:
            print(f"    - {e['id']}: {e['error']}")
    print(f"  Manifest: {manifest_path}")
    print("=" * 60)


if __name__ == "__main__":
    main()
