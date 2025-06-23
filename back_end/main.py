from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import create_database, create_table_links
from link_shortener import LinkShortener
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import os

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://127.0.0.1:5500/front_end/index.html")


app = FastAPI()
link = LinkShortener()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LinkInput(BaseModel):
    url: str

@app.on_event("startup")
def startup_event():
    print("Inicializando serviço...")

    create_database()
    create_table_links()

@app.post("/shorten")
def shorten_link(dados: LinkInput):
    if dados.url == "" or dados.url is None:
        raise HTTPException(status_code=400, detail="URL não pode ser vazia")

    codigo = link.shorten(dados.url)
    return {"shortened_url": f"{FRONTEND_URL}/{codigo}"}

# @app.get("/{codigo}")
# def redirecionar(codigo: str):
#     try:
#         url = link.get_original_url(codigo)
#         return {"url_original": url}
#     except KeyError:
#         raise HTTPException(status_code=404, detail="Link não encontrado")

@app.get("/{codigo}")
def redirecionar(codigo: str):
    try:
        url = link.get_original_url(codigo)
        return RedirectResponse(url)
    except KeyError:
        # Redireciona para o front-end com o código na query string
        return RedirectResponse(f"http://127.0.0.1:5500/front_end/index.html?codigo={codigo}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000)

