from pydantic import BaseModel

class Organizacion(BaseModel):
    id: int
    name: str