const fs = require('fs');
let html = fs.readFileSync('C:/Users/arslanmetealp72/.gemini/antigravity/scratch/duconnect-app/index.html', 'utf8');

const repairs = [
    [/>Anasayfa<\/a>/g, '>Ana Sayfa</a>'],
    [/>zellikler<\/a>/g, '>Özellikler</a>'],
    [/>Hakkmzda<\/a>/g, '>Hakkımızda</a>'],
    [/>Ekibimiz<\/a>/g, '>Ekibimiz</a>'],
    [/>Sponsorluk & letiim<\/a>/g, '>Sponsorluk & İletişim</a>'],
    [/>Uygulamay ndir<\/a>/g, '>Uygulamayı İndir</a>'],
    [/>Yeni Nesil Kamps Deneyimi/g, '>Yeni Nesil Kampüs Deneyimi'],
    [/>niversite Hayatnz/g, '>Üniversite Hayatınızı'],
    [/>Tek Noktadan/g, '>Tek Noktadan'],
    [/>Ynetin<\/span>/g, '>Yönetin</span>'],
    [/>Duconnect ile ders notlarna, etkinliklere ve kamps ii iletiime annda ulan. Uygulamamz yandaki ekrandan hemen test edebilirsiniz.</g, '>Duconnect ile ders notlarına, etkinliklere ve kampüs içi iletişime anında ulaşın. Uygulamamızı yandaki ekrandan hemen test edebilirsiniz.<'],
    [/>Hemen ndirin<\/a>/g, '>Hemen İndirin</a>'],
    [/>Men<\/button>/g, '>Menü</button>'],
    [/>Ana Sayfa<\/button>/g, '>Ana Sayfa</button>'],
    [/>Ders Notlar<\/button>/g, '>Ders Notları</button>'],
    [/>letiim<\/button>/g, '>İletişim</button>'],
    [/>Özellikler<\/h2>/g, '>Özellikler</h2>'],
    [/>Daha Fazla Payla, Daha Fazla Elen<\/p>/g, '>Daha Fazla Paylaş, Daha Fazla Eğlen</p>'],
    [/>Geni kapsaml platformumuzla ihtiya duyduunuz her ey elinizin altnda.<\/p>/g, '>Geniş kapsamlı platformumuzla ihtiyaç duyduğunuz her şey elinizin altında.</p>'],
    [/>Kulp & Etkinlikler<\/h3>/g, '>Kulüp & Etkinlikler</h3>'],
    [/>Kampsteki hibir partiyi, konferans veya kulp toplantsn karmayn.<\/p>/g, '>Kampüsteki hiçbir partiyi, konferansı veya kulüp toplantısını kaçırmayın.</p>'],
    [/>Kesintisiz letiim<\/h3>/g, '>Kesintisiz İletişim</h3>'],
    [/>Blm arkadalarnzla tartn, yeni insanlarla tann ve kamps kltrnn bir paras olun. Gvenli mesajlama altyaps ile her zaman bal kaln.<\/p>/g, '>Bölüm arkadaşlarınızla tartışın, yeni insanlarla tanışın ve kampüs kültürünün bir parçası olun. Güvenli mesajlaşma altyapısı ile her zaman bağlı kalın.</p>'],
    [/>Hakkmzda<\/h2>/g, '>Hakkımızda</h2>'],
    [/>Dijital A<\/strong>/g, '>Dijital Ağ</strong>'],
    [/>Kulpler, mentrler ve iletmelerle kesintisiz profesyonel balantlar.<\/span>/g, '>Kulüpler, mentörler ve işletmelerle kesintisiz profesyonel bağlantılar.</span>'],
    [/>Ekibimizle Tann<\/h2>/g, '>Ekibimizle Tanışın</h2>'],
    [/>Bizden Haberler \(\@duconnectresmi\)<\/h2>/g, '>Bizden Haberler (@duconnectresmi)</h2>'],
    [/>Kampsten en gncel kareler, duyurular ve etkinlikler.<\/p>/g, '>Kampüsten en güncel kareler, duyurular ve etkinlikler.</p>'],
    [/>Google Play'den ndir/g, '>Google Play\'den İndir'],
    [/>App Store'dan ndir/g, '>App Store\'dan İndir'],
    [/>letiim & Sponsorluk<\/h2>/g, '>İletişim & Sponsorluk</h2>'],
    [/>Bize ulamak, sponsorluk grmeleri yapmak veya geri bildirimde bulunmak iin aadaki formu kullanabilirsiniz.<\/p>/g, '>Bize ulaşmak, sponsorluk görüşmeleri yapmak veya geri bildirimde bulunmak için aşağıdaki formu kullanabilirsiniz.</p>'],
    [/>Dzce niversitesi Kamps, Dzce<\/p>/g, '>Düzce Üniversitesi Kampüsü, Düzce</p>'],
    [/>Duconnect Yeni Form Gnderisi!/g, '>Duconnect Yeni Form Gönderisi!'],
    [/>Adnz Soyadnz<\/label>/g, '>Adınız Soyadınız</label>'],
    [/>Sponsorluk Grmesi<\/option>/g, '>Sponsorluk Görüşmesi</option>'],
    [/>Genel letiim \/ Bilgi Alma<\/option>/g, '>Genel İletişim / Bilgi Alma</option>'],
    [/>Mesajnz<\/label>/g, '>Mesajınız</label>'],
    [/>Bize ne sylemek istersiniz\?<\/textarea>/g, '>Bize ne söylemek istersiniz?</textarea>'],
    [/>Mesaj Gnder<\/button>/g, '>Mesajı Gönder</button>'],
    [/>Gizlilik Szlemesi<\/a>/g, '>Gizlilik Sözleşmesi</a>'],
    [/>KVKK Aydnlatma Metni<\/a>/g, '>KVKK Aydınlatma Metni</a>'],
    [/>Tm haklar sakldr.<\/p>/g, '>Tüm hakları saklıdır.</p>']
];

repairs.forEach(repair => {
    html = html.replace(repair[0], repair[1]);
});

// Since characters are thoroughly mangled by the multiple PS conversions:
// Let's do a brute force match on the garbled text I saw in the file:
html = html.replace(/DǬzce oniversitesi KampǬsǬ/g, 'Düzce Üniversitesi Kampüsü');
html = html.replace(/letiYim/g, 'İletişim');
html = html.replace(/grǬYmeleri/g, 'görüşmeleri');
html = html.replace(/aYaYdaki/g, 'aşağıdaki');
html = html.replace(/Duconnect yeni Form Gnderisi/g, 'Duconnect Yeni Form Gönderisi');
html = html.replace(/Adnz Soyadnz/g, 'Adınız Soyadınız');
html = html.replace(/GrǬYmesi/g, 'Görüşmesi');
html = html.replace(/Mesajnz/g, 'Mesajınız');
html = html.replace(/sylemek/g, 'söylemek');
html = html.replace(/Mesaj Gnder/g, 'Mesajı Gönder');
html = html.replace(/Gizlilik SzleYmesi/g, 'Gizlilik Sözleşmesi');
html = html.replace(/KVKK Aydnlatma Metni/g, 'KVKK Aydınlatma Metni');
html = html.replace(/TǬm haklar sakldr/g, 'Tüm hakları saklıdır');
html = html.replace(/ndir/g, 'İndir');
html = html.replace(/KampǬsten en gǬncel kareler/g, 'Kampüsten en güncel kareler');
html = html.replace(/ulaYmak/g, 'ulaşmak');
html = html.replace(/iin/g, 'için');
html = html.replace(/-rnek/g, 'Örnek');
html = html.replace(/Gizlilik SÃ¶zleÅŸmesi/g, 'Gizlilik Sözleşmesi');
html = html.replace(/KVKK AydÄ±nlatma Metni/g, 'KVKK Aydınlatma Metni');
html = html.replace(/TǬm haklar sakldr/g, 'Tüm hakları saklıdır');
html = html.replace(/Gizlilik SzleYmesi/g, 'Gizlilik Sözleşmesi');
html = html.replace(/KVKK Aydnlatma Metni/g, 'KVKK Aydınlatma Metni');

fs.writeFileSync('C:/Users/arslanmetealp72/.gemini/antigravity/scratch/duconnect-app/index.html', html, 'utf8');
