import sys
import io

path = 'C:/Users/arslanmetealp72/.gemini/antigravity/scratch/duconnect-app/index.html'
with io.open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# Insert Navbar link
html = html.replace(
    '<li><a href="#about" onclick="closeMobileMenu()">Hakkımızda</a></li>',
    '<li><a href="#about" onclick="closeMobileMenu()">Hakkımızda</a></li>\n                <li><a href="#arena" onclick="closeMobileMenu()">Arena</a></li>'
)

arena_html = '''
    <!-- Arena Winners Section -->
    <section id="arena">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Arena Kazananları</h2>
                <p class="section-subtitle">DüConnect ekosistemini canlı tutan ve sıralamaya girmeye hak kazananları tebrik ederiz!</p>
            </div>
            
            <div class="semester-selector">
                <button class="semester-btn active" data-semester="26-bahar" onclick="switchSemester('26-bahar')">26-Bahar Dönemi</button>
            </div>

            <div class="category-toggle">
                <button class="category-btn" data-category="ogrenci" onclick="switchCategory('ogrenci')">Öğrenci</button>
                <button class="category-btn active" data-category="topluluk" onclick="switchCategory('topluluk')">Topluluk</button>
            </div>

            <div class="podium-container" id="arena-podium">
                <!-- Rendered by JS -->
            </div>

            <div class="arena-others" id="arena-others" style="display:none;">
                <!-- Rendered by JS -->
            </div>

            <div class="arena-sponsors" id="arena-sponsors">
                <!-- Rendered by JS -->
            </div>
        </div>
    </section>
'''

html = html.replace('<!-- Team Section -->', arena_html + '\n    <!-- Team Section -->')

with io.open(path, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML updated successfully")
