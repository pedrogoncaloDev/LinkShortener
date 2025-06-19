import psycopg2
from psycopg2 import sql
from utils import load_infos_ini

db_name = "link_shortener"

conn_infos_postgres = load_infos_ini("postgres", "database.ini")
conn_infos_link_shortener = load_infos_ini("link_shortener", "database.ini")

def create_database():
    try:
        conn = psycopg2.connect(**conn_infos_postgres)
        conn.autocommit = True
        cur = conn.cursor()

        try:
            cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_name,))
            if cur.fetchone():
                print(f"O banco de dados '{db_name}' já existe.")
            else:
                cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
                print(f"Banco de dados '{db_name}' criado com sucesso.")
        finally:
            cur.close()
            conn.close()
    except psycopg2.Error as e:
        print(f"Erro ao criar o banco de dados: {e}")

def create_table_links():
    try:
        conn = psycopg2.connect(**conn_infos_link_shortener)
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
