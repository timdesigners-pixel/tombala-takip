# 🎱 Astra Xtreme Tombala Takip OS
> **Wi-Fi Erişim Noktası (Hotspot) Canlı Senkronizasyon & Görünüm Düzenleme Destekli Profesyonel Mobil Uygulama**

Astra Tombala Takip OS, geleneksel 1–90 torba tombala oyununu akıllı telefonlar, tabletler ve bilgisayarlar üzerinde gerçek zamanlı olarak takip etmenizi sağlayan, yerel Wi-Fi erişim noktası (Hotspot / Taşınabilir Bağlantı Noktası) üzerinden internet gerekmeksizin tüm oyuncularla anlık çift yönlü senkronize olan ve kapsamlı canlı görünüm/tema düzenleme motoruna sahip profesyonel bir mobil platformdur.

---

## 🌟 Öne Çıkan Ana Özellikler

### 1. 📶 Wi-Fi Erişim Noktası (Hotspot) & LAN Canlı Senkronizasyonu
* **İnternetsiz Yerel Ağ / Hotspot Takibi**: Tek bir telefon Kişisel Erişim Noktası (Hotspot) açtığında veya ortak bir Wi-Fi ağına bağlandığında, diğer tüm oyuncular QR kodu okutarak veya IP adresini girerek saniyeler içinde bağlanır.
* **Çift Yönlü Anlık Senkron (Real-time 2-way Sync)**: Çekilen numaralar, yapılan çinkolar, tombala duyuruları ve kart durumları tüm bağlı cihazlara **< 20ms** gecikmeyle canlı yansıtılır.
* **Görsel QR Kod**: Uygulama içi dinamik SVG QR kod oluşturucu sayesinde diğer telefonlar kamera ile doğrudan odaya katılır.
* **Bağlantı & Eşzamanlılık Koruması**: Eşzamanlı çekilişlerde optimistic revision kontrolü ile çakışmaları engeller.

### 2. 🎨 Kapsamlı Görünüm & Tema Düzenleyici (Layout & Theme Customizer)
* **5 Canlı Tasarım Teması**:
  * 🌌 **Astra Cyberpunk**: Varsayılan yüksek kontrastlı neon cyan, gold ve glassmorphism.
  * 🎰 **Casino Emerald**: Klasik yeşil çuha, kumarhane altın sarısı ve zarif doku.
  * 🖤 **Midnight OLED**: Saf siyah arka plan (%0 pil tüketimi) ve yüksek kontrastlı beyaz-amber öğeler.
  * 🪵 **Klasik Kahvehane**: Sıcak ahşap çerçeveler, nostaljik kahve tonları.
  * ☀️ **High Contrast (Güneş Işığı Modu)**: Dış mekan veya aşırı aydınlık salonlarda maksimum okunabilirlik.
* **Ölçekleme & Boyut İnce Ayarları**:
  * Kart boyutu ölçekleme (%70 - %140)
  * Kart hücre yazı boyutu ölçekleme (11px - 24px)
  * Pano sütun düzeni (9, 10, 15, 18 sütun)
* **Ekran & Yerleşim Modları**:
  * 📱 **Standart Dinamik Yerleşim**: Kartlar ve 1-90 pano dengeli görünümde.
  * 🃏 **Sadece Kartlar**: Panoyu gizleyerek tüm ekranı kartlara ayırır.
  * 🔢 **Sadece Pano**: Projektör, monitör veya TV ekranına yansıtmak için dev 1-90 torba ekranı.
  * 📺 **Tek Ekran (Fit)**: Kaydırma çubuğu olmadan her şeyi tek ekrana sığdıran kompakt düzen.
  * 📐 **Alternatif Yatay Pano**: Altta sabit 18 sütunlu kompakt pano.
  * 🌗 **Sol (Benim) & Sağ (Arkadaşım)**: İki oyuncunun kartlarını yan yana sütunlarda ayrı ayrı takip etme.

### 3. 🎯 Gelişmiş Tombala Takip Motoru
* **Çoklu Giriş Yöntemleri**:
  * 🔢 **Büyük Elle Sayı Girişi (Numpad)**: Hızlı ve hatasız giriş.
  * 🗣️ **Sesli Türkçe Giriş ve Türkçe TTS Anons**: Numarayı mikrofondan tanır ve "Bende kart 78", "1. Çinko!" şeklinde seslendirir.
  * ⌨️ **Fiziki Klavye**: Klavyeden 1–90 yazıp Enter'a basarak anında işaretleme.
* **Sıradaki Hedef & Yaklaşma Uyarıları**:
  * 1. Çinko, 2. Çinko ve Tombala için kartların kaç sayı kaldığını anlık hesaplar.
  * 1 sayı kala **"🔥 TEK SAYI KALDI"** büyük flaş uyarısı ve sesli bildirim verir.
* **İlk 21 Özel Oyunu**:
  * İlk 21 çekilişte 2 veya 3 sayıyı bulma yan oyununu otomatik takip eder ve kilitler.
* **Maliyet / Kâr ve Çift Seans Hesap Defteri**:
  * Kart alış maliyetleri, ikramiye çarpanları ve çift seans (2× öde, sonraki el ücretsiz) hesaplarını otomatik tutar.

---

## 📁 Proje Dizin Yapısı

```
tombala-takip/
├── android/                         # Android Studio & Gradle Mobil Projesi
│   ├── app/
│   │   ├── build.gradle.kts         # Android uygulama derleme kuralları (SDK 34)
│   │   └── src/main/
│   │       ├── AndroidManifest.xml  # Wi-Fi, Hotspot, Ses, Kamera izinleri
│   │       ├── assets/              # Derlenmiş mobil uygulama varlıkları
│   │       │   └── index.html       # Dahili tam özellikli Tombala Takip OS
│   │       └── kotlin/com/example/tombalatakip/
│   │           └── MainActivity.kt  # Donanım hızlandırmalı Android WebView ve Wi-Fi köprüsü
│   ├── gradle/                      # Gradle yapılandırma ve kütüphane versiyonları
│   ├── build.gradle.kts             # Kök Gradle derleme scripti
│   ├── gradlew.bat                  # Windows Gradle derleme aracı
│   └── local.properties             # Android SDK dizin bağlantısı
├── www/
│   └── index.html                   # Astra Tombala OS Web & Mobil Çekirdeği
├── server.js                        # Node.js Wi-Fi Erişim Noktası WebSocket/HTTP Sunucusu
├── yerel_sunucu.py                  # Sıfır bağımlılıklı Python 3 Wi-Fi Sunucusu
├── package.json                     # Node.js bağımlılık ve script tanımları
└── README.md                        # Kullanım kılavuzu ve dökümantasyon
```

---

## 🚀 Kurulum ve Çalıştırma

### 1. Mobil Uygulama Olarak Derleme (Android APK)
Projeyi Android cihazınızda tam ekran yerel uygulama olarak çalıştırmak için:

```powershell
# Android dizinine gidin
cd c:\Users\pc\github\tombala-takip\android

# Debug APK'sını derleyin
.\gradlew.bat assembleDebug
```
Derlenen APK dosyası şu konumda oluşturulur:
`android/app/build/outputs/apk/debug/app-debug.apk`

Cihaza doğrudan yüklemek için:
```powershell
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

### 2. Wi-Fi Erişim Noktası Üzerinden Canlı Takip Sunucusu Başlatma

#### Seçenek A: Node.js ile (WebSocket + Statik HTTP)
```powershell
npm install
npm start
```

#### Seçenek B: Python 3 ile (Herhangi bir paket yükleme gerekmez)
```powershell
python yerel_sunucu.py
```

Sunucu başladığında konsolda yerel Wi-Fi IP adresiniz görüntülenir:
```
=================================================================
🚀 ASTRA TOMBALA OS · WI-FI ERİŞİM NOKTASI SENKRON SUNUCUSU AÇIK!
=================================================================
Aynı Wi-Fi veya Kişisel Erişim Noktasına (Hotspot) bağlı cihazlar
aşağıdaki adreslerden herhangi birini tarayıcıda açabilir:

  👉 [Wi-Fi]    http://192.168.1.105:3000
  👉 [Hotspot]  http://192.168.43.1:3000
  👉 [Local]    http://localhost:3000
=================================================================
```

---

## 📱 Kullanım Kılavuzu

1. **Host (Sunucu) Cihaz**:
   - Android uygulamasını veya sunucuyu başlatın.
   - Üst bardaki **"📶 Wi-Fi Hazır"** rozetine dokunun.
   - Görüntülenen QR kodu masadaki diğer arkadaşlarınızın telefonuna okutun.
2. **Oyuncu (İstemci) Cihazlar**:
   - QR kodu tarayarak doğrudan odaya bağlanır.
   - Herkes kendi kartlarını **👈 Benim** veya **👉 Arkadaş** olarak işaretleyebilir.
3. **Çekiliş Sırasında**:
   - Host veya herhangi bir oyuncu bir sayı çektiğinde veya elle girdiğinde tüm bağlı telefonlarda sayı aynı anda yeşil/altın rengine döner.
   - Çinko veya Tombala yapıldığında tüm telefonlarda aynı anda konfeti ve sesli uyarı verilir.
4. **Görünüm Düzenleme**:
   - Üst bardaki **🎨** ikonuna veya logoya dokunarak **Görünüm & Tema Düzenleyici**'yi açın.
   - İstediğiniz renk temasını seçin, kart boyutunu veya pano sütun sayısını kaydırıcılarla ayarlayın.
   - **💾 Görünümü Kaydet** butonuna basarak ayarlarınızı profil olarak saklayın.

---

## 📄 Lisans
MIT License © 2026 Astra Team.
