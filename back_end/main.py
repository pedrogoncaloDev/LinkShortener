from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.connection import create_database, create_table_links
from routes import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    print("Inicializando serviço...")

    create_database()
    create_table_links()


app.include_router(router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000)
