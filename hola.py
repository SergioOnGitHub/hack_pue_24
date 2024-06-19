import google.generativeai as genai
from pathlib import Path
import sys

input_data = ' '.join(sys.argv[1:])

# Configurar tu API Key
GOOGLE_API_KEY='AIzaSyCNOBav2lrF7RqjjnzxBnN8_00hsSn6YMs'
genai.configure(api_key=GOOGLE_API_KEY)

# Crear el modelo generativo
model = genai.GenerativeModel('gemini-pro')

# Inicializar el contexto de conversación y el historial
conversation_history = []
context = ""

propmtInicial = Path(r"C:\Users\makreb\OneDrive\Escritorio\hack\hack_pue_24\paper.txt").read_text().splitlines()
conversation_history.append(', '.join(propmtInicial))

""" 
while True: """
prompt = input_data

# Actualizar el historial de conversación
conversation_history.append(prompt)

# Actualizar el contexto como una concatenación del historial
context = ' '.join(conversation_history)

# Generar respuesta basada en el contexto
response = model.generate_content(context)
result = ''.join([p.text for p in response.candidates[0].content.parts])

print(result)
