import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

# Ejemplo: Web Scraping de un artículo de noticias
url = 'https://www.milenio.com/ciencia-y-salud/vacuna-moderna-covid-gripe-supera-separado'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Extraer título, fecha, autores y contenido
title = soup.find('h1').get_text()
content = ' '.join([p.get_text() for p in soup.find_all('p')])

# Limpiar contenido
content_clean = re.sub(r'\s+', ' ', content).strip()

# Crear DataFrame
data = {'title': title, 'content': content_clean}
df = pd.DataFrame([data])

print(soup)
