from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import re

# Configurar opciones de Chrome
options = Options()
options.add_argument("--headless")  # Ejecutar en modo headless (sin interfaz gráfica)
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("start-maximized")
options.add_argument("enable-automation")
options.add_argument("--disable-infobars")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-browser-side-navigation")
options.add_argument("--disable-extensions")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

fetch("https://www.milenio.com/ciencia-y-salud/vacuna-moderna-covid-gripe-supera-separado", {
  "headers": {
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
  },
  "referrer": "https://www.milenio.com/ciencia-y-salud/vacuna-moderna-covid-gripe-supera-separado",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
# Inicializar WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)


# URL del artículo de noticias
url = 'https://www.milenio.com/ciencia-y-salud/vacuna-moderna-covid-gripe-supera-separado'
driver.get(url)
driver.find_element(By.LINK_TEXT, 'Vacuna').click()  # Simula hacer clic en un enlace
driver.get(url)  # Luego navega a la URL de destino

# Extraer datos con Selenium
try:
    title = driver.find_element(By.TAG_NAME, 'h1').text
    content_elements = driver.find_elements(By.TAG_NAME, 'p')
    content = ' '.join([element.text for element in content_elements])

    # Limpiar contenido
    content_clean = re.sub(r'\s+', ' ', content).strip()

    # Crear DataFrame
    data = {'title': title, 'content': content_clean}
    df = pd.DataFrame([data])

    # Mostrar el DataFrame
    print(df)
finally:
    driver.quit()
