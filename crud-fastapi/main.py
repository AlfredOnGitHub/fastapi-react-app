from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model.organizaciones import Organizacion

origins = [
    "http://127.0.0.1:5173"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

orgs_db = [
    {
        "id": 0,
        "name": "LocalControl"
    },
    {
        "id": 1,
        "name": "Mario"
    },
    {
        "id": 2,
        "name": "Alfredo"
    },
    {
        "id": 3,
        "name": "Karlos"
    },
    {
        "id": 4,
        "name": "Juanjo"
    },
]


@app.get("/")
def root():
    return {
        "message" : "Hi! this is my app."
    }

@app.get("/api/v1/organizaciones", response_model=list[Organizacion])
def get_orgs():
    return orgs_db

@app.get("/api/v1/organizaciones/{organizacion_id}", response_model=Organizacion)
def get_org(organizacion_id: int):
    for org in orgs_db:
        if org["id"] == organizacion_id:
            return org
    raise HTTPException(status_code=404, detail="Organización no encontrada.")

@app.post("/api/v1/organizaciones", response_model=Organizacion)
def create_org(organization_data: Organizacion):
    new_org = organization_data.model_dump() # Convertimos el método de pylantic en diccionario para evitar problemas a posteriori.
    orgs_db.append(new_org)
    return new_org

@app.delete("/api/v1/organizaciones/{organizacion_id}", response_model=Organizacion)
def delete_org(organization_id: int):
    for org in orgs_db:
        if org["id"] == organization_id:
            orgs_db.remove(org)
            return org
    raise HTTPException(status_code=404, detail="Organización no encontrada.")