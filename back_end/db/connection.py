import psycopg2

from utils import load_infos_ini


def get_connection(section: str):
    conn_infos = load_infos_ini(section, "database.ini")
    return psycopg2.connect(**conn_infos)
