const fs = require('fs');
const path = 'C:/Users/arslanmetealp72/.gemini/antigravity/scratch/duconnect-app/index.html';
let html = fs.readFileSync(path, 'utf8');

// Insert Navbar link
html = html.replace('<li><a href=\"#about\" onclick=\"closeMobileMenu()\">Hakk\\u0131m\\u0131zda</a></li>', '<li><a href=\"#about\" onclick=\"closeMobileMenu()\">Hakk\\u0131m\\u0131zda</a></li>\n                <li><a href=\"#arena\" onclick=\"closeMobileMenu()\">Arena</a></li>');
html = html.replace('<li><a href=\"#about\" onclick=\"closeMobileMenu()\">Hakkımızda</a></li>', '<li><a href=\"#about\" onclick=\"closeMobileMenu()\">Hakkımızda</a></li>\n                <li><a href=\"#arena\" onclick=\"closeMobileMenu()\">Arena</a></li>');

// Insert Arena Section
const arenaHTML = \
    <!-- Arena Winners Section -->
    <section id="arena">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Arena Kazananlar\u0131</h2>
                <p class="section-subtitle">D\u00fcConnect ekosistemini canl\u0131 tutan ve s\u0131ralamaya girmeye hak kazananlar\u0131 tebrik ederiz!</p>
            </div>
            
            <div class="semester-selector">
                <button class="semester-btn active" data-semester="26-bahar" onclick="switchSemester('26-bahar')">26-Bahar D\u00f6nemi</button>
                <!-- Add more semesters here in the future -->
            </div>

            <div class="category-toggle">
                <button class="category-btn" data-category="ogrenci" onclick="switchCategory('ogrenci')">\u00d6\u011frenci</button>
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
\;

html = html.replace('<!-- Team Section -->', arenaHTML + '\n    <!-- Team Section -->');

fs.writeFileSync(path, html, 'utf8');
console.log('HTML updated successfully');
