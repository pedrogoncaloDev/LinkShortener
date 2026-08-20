import uuid
from typing import Optional

from repositories.link_repository import LinkRepository


class LinkService:
    def __init__(self, repository: LinkRepository):
        self._repository = repository


    def shorten(self, url: str) -> str:
        codigo = self._generate_unique_code()
        self._repository.insert(codigo, url)
        return codigo


    def resolve(self, codigo: str) -> Optional[str]:
        return self._repository.get_original_url(codigo)


    def _generate_unique_code(self) -> str:
        codigo = str(uuid.uuid4())[:6]
        while self._repository.exists(codigo):
            codigo = str(uuid.uuid4())[:6]
        return codigo
