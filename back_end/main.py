from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import create_database, create_table_links
from link_shortener import LinkShortener
from fastapi.middleware.cors import CORSMiddleware

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
    return {"shortened_url": f"http://localhost:8000/{codigo}"}

@app.get("/{codigo}")
def redirecionar(codigo: str):
    try:
        url = link.get_original_url(codigo)
        return {"url_original": url}
    except KeyError:
        raise HTTPException(status_code=404, detail="Link não encontrado")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000)

