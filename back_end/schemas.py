from pydantic import BaseModel


class LinkInput(BaseModel):
    url: str
