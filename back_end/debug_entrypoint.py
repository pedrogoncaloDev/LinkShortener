import os

import debugpy

from config import BACKEND_HOST, BACKEND_PORT

DEBUG_PORT = int(os.getenv("DEBUG_PORT", "5678"))

debugpy.listen(("0.0.0.0", DEBUG_PORT))
print(f"[debugpy] Aguardando conexão do debugger em 0.0.0.0:{DEBUG_PORT}...")

if os.getenv("DEBUG_WAIT_FOR_CLIENT", "false").lower() == "true":
    debugpy.wait_for_client()

import uvicorn

uvicorn.run("main:app", host=BACKEND_HOST, port=BACKEND_PORT)
