import re

path = 'C:/Users/arslanmetealp72/.gemini/antigravity/scratch/duconnect-app/style.css'
with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# Fix app-btn color
css = re.sub(r'(\.app-btn\s*\{[^}]*color:\s*)var\(--text-primary\)', r'\1#ffffff', css)

with open(path, 'w', encoding='utf-8') as f:
    f.write(css)

print("App btn fixed")
