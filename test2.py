import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

# URL del artículo de noticias
url = 'https://www.milenio.com/ciencia-y-salud/vacuna-moderna-covid-gripe-supera-separado'

# Encabezado para imitar un navegador
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Referer': 'https://www.google.com'
}

session = requests.Session()
# Realizar la solicitud con el encabezado
response = session.get(url, headers=headers)

# Comprobar si la solicitud fue exitosa
if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    # Función para extraer texto de una etiqueta de forma segura
    def safe_get_text(element):
        return element.get_text().strip() if element else ''

    # Extraer título
    title_element = soup.find('h1')
    title = safe_get_text(title_element)

    # Extraer contenido
    content_elements = soup.find_all('p')
    content = ' '.join([p.get_text().strip() for p in content_elements])

    # Limpiar contenido
    content_clean = re.sub(r'\s+', ' ', content).strip()

    # Crear DataFrame
    data = {'title': title, 'content': content_clean}
    df = pd.DataFrame([data])

    # Mostrar el DataFrame
    print(df)
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
