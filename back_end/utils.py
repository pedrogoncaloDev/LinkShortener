import configparser
import os

def load_infos_ini(section, filename):
    parser = configparser.ConfigParser()
    full_path = os.path.join(os.path.dirname(__file__), filename)
    
    if not os.path.exists(full_path):
        raise FileNotFoundError(f"Arquivo {filename} não encontrado no caminho: {full_path}")

    parser.read(full_path)

    if section not in parser:
        raise Exception(f"Seção '{section}' não encontrada em {filename}")

    return {k: v for k, v in parser[section].items()}