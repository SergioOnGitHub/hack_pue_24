import requests

# URL del artículo
url = "https://www.milenio.com/ciencia-y-salud/vacuna-moderna-covid-gripe-supera-separado"

# Configurar las cabeceras HTTP
headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "es-ES,es;q=0.9",
    "cache-control": "max-age=0",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
}

# Realizar la solicitud HTTP
response = requests.get(url, headers=headers)

# Verificar si la solicitud fue exitosa
if response.status_code == 200:
    # Procesar el contenido de la respuesta
    html_content = response.content
    # Puedes usar BeautifulSoup para extraer datos del contenido HTML
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extraer datos específicos
    title = soup.find('h1').get_text(strip=True)
    date = soup.find('time').get_text(strip=True)
    authors = soup.find('span', class_='authors').get_text(strip=True)
    content_elements = soup.find_all('p')
    content = ' '.join([element.get_text(strip=True) for element in content_elements])
    
    # Limpiar contenido
    import re
    content_clean = re.sub(r'\s+', ' ', content).strip()
    
    # Crear DataFrame
    import pandas as pd
    data = {'title': title, 'date': date, 'authors': authors, 'content': content_clean}
    df = pd.DataFrame([data])
    
    # Mostrar el DataFrame
    print(df)
else:
    print(f"Failed to retrieve the article. Status code: {response}")
