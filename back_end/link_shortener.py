import uuid
from datetime import datetime, timedelta
import psycopg2
from utils import load_infos_ini

conn_infos_link_shortener = load_infos_ini("link_shortener", "database.ini")

class LinkShortener:
    def __init__(self):
        self._shortened = {}

    def shorten(self, url: str) -> str:
        code = str(uuid.uuid4())[:6]
        self._shortened[code] = url

        creation_date = datetime.now()
        expiration_date = creation_date + timedelta(days=7)

        try:
            conn = psycopg2.connect(**conn_infos_link_shortener)
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO links (url_original, codigo_encurtado, data_criacao, data_expiracao)
                VALUES (%s, %s, %s, %s)
            """, (url, code, creation_date, expiration_date))
            conn.commit()
        except Exception as e:
            print(f"[ERRO] Falha ao inserir link encurtado no banco {e}")
            raise
        finally:
            if cur: cur.close()
            if conn: conn.close()

        return code

    def get_original_url(self, code: str) -> str:
        if code not in self._shortened:
            raise KeyError("Código não encontrado")