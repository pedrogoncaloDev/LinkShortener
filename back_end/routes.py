from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from config import FRONTEND_URL
from repositories.link_repository import LinkRepository
from schemas import LinkInput
from services.link_service import LinkService

router = APIRouter()
link_service = LinkService(LinkRepository())


@router.post("/shorten")
def shorten_link(dados: LinkInput):
    if not dados.url:
        raise HTTPException(status_code=400, detail="URL não pode ser vazia")

    codigo = link_service.shorten(dados.url)
    return {"shortened_url": f"{FRONTEND_URL}/{codigo}"}


@router.get("/{codigo}")
def redirecionar(codigo: str):
    url = link_service.resolve(codigo)
    if url is None:
        # Redireciona para o front-end com o código na query string
        return RedirectResponse(f"{FRONTEND_URL}?codigo={codigo}")
    return RedirectResponse(url)
