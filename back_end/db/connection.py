import psycopg2
from psycopg2 import sql

from utils import load_infos_ini

DB_NAME = "link_shortener"


def get_connection(section: str):
    conn_infos = load_infos_ini(section, "database.ini")
    return psycopg2.connect(**conn_infos)


def create_database():
    try:
        conn = get_connection("postgres")
        conn.autocommit = True
        cur = conn.cursor()

        try:
            cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (DB_NAME,))
            if cur.fetchone():
                print(f"O banco de dados '{DB_NAME}' já existe.")
            else:
                cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(DB_NAME)))
                print(f"Banco de dados '{DB_NAME}' criado com sucesso.")
        finally:
            cur.close()
            conn.close()
    except psycopg2.Error as e:
        print(f"Erro ao criar o banco de dados: {e}")


def create_table_links():
    try:
        conn = get_connection("link_shortener")
        conn.autocommit = True
        cur = conn.cursor()

        try:
            cur.execute("""
                SELECT EXISTS (
                    SELECT 1
                    FROM information_schema.tables
                    WHERE table_name = 'links'
                );
            """)

            table_exists = cur.fetchone()[0]

            if table_exists:
                print("A tabela 'links' já existe.")
            else:
                cur.execute("""
                    CREATE TABLE links (
                        id SERIAL PRIMARY KEY,
                        url_original TEXT NOT NULL,
                        codigo_encurtado VARCHAR(20) UNIQUE NOT NULL,
                        data_criacao TIMESTAMP,
                        data_expiracao TIMESTAMP,
                        total_acessos INTEGER DEFAULT 0
                    );
                """)

                print("Tabela 'links' criada com sucesso.")

        finally:
            cur.close()
            conn.close()
    except psycopg2.Error as e:
        print(f"Erro ao criar a tabela 'links': {e}")
