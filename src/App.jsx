import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, MessageSquare, LayoutDashboard, Users, Box, MapPin, 
  Calculator, BarChart3, Brain, Building2, ShieldCheck, Smartphone, Code2, 
  CheckCircle2, Target, Layers, Zap, Video, Fingerprint, CreditCard, PackageSearch, 
  TrendingUp, Wallet, FileText
} from 'lucide-react';

const slides = [
  {
    id: 1,
    type: 'cover',
    bg: '/media0.png',
    title: 'JUMBO CRM ÇÖZÜMÜ SUNUMU',
    subtitle: 'Tüm İş Süreçlerinizi Tek Panelden Yönetin',
    items: [
      { icon: <LayoutDashboard size={20} />, text: 'Yönetim' },
      { icon: <Users size={20} />, text: 'İnsan Kaynakları' },
      { icon: <Box size={20} />, text: 'Stok & Şube Takibi' },
      { icon: <Calculator size={20} />, text: 'Muhasebe' },
      { icon: <BarChart3 size={20} />, text: 'Raporlama' },
      { icon: <Brain size={20} />, text: 'Yapay Zeka Destekli Analizler' }
    ],
    notes: 'Hoş geldiniz. Bugün sizlere JUMBO CRM çözümümüzü tanıtacağız. Bu sistem, kurumunuzun tüm operasyonel damarlarını tek bir merkezde toplayan dijital bir omurga niteliğindedir.'
  },
  {
    id: 2,
    type: 'content',
    bg: '/media1.png',
    tag: 'CRM NEDİR?',
    title: 'Customer & Company Resource Management',
    items: [
      { icon: <Building2 />, text: 'Tüm şirket operasyonlarını tek merkezden yönetmeyi sağlar.' },
      { icon: <Target />, text: 'Veriye dayalı hızlı ve doğru karar alma mekanizması sunar.' },
      { icon: <Zap />, text: 'Şube, stok, İK ve finansal süreçlerde maksimum verimlilik hedefler.' },
      { icon: <Brain />, text: 'Yapay zeka destekli maliyet ve kârlılık optimizasyonu sağlar.' }
    ],
    notes: 'CRM bizim için sadece müşteri yönetimi değil, aynı zamanda şirket kaynaklarının (personel, stok, finans) bütünleşik yönetimidir.'
  },
  {
    id: 3,
    type: 'content',
    tag: 'MİMARİ',
    title: 'Sistem Genel Yapısı',
    items: [
      { icon: <Layers />, text: 'Modüler ve ölçeklenebilir yapı (Siz büyüdükçe sistem büyür).' },
      { icon: <Building2 />, text: 'Küçük / Orta / Büyük ölçekli tüm firmalara uygun esneklik.' },
      { icon: <ShieldCheck />, text: 'Rol bazlı detaylı yetkilendirme ve güvenlik.' },
      { icon: <Smartphone />, text: 'Web & Mobil uyumlu kullanıcı deneyimi.' },
      { icon: <Code2 />, text: 'API & Donanım entegrasyonlarına açık modern altyapı.' }
    ],
    notes: 'Sistemimiz modüler bir yapıdadır. Bu sayede sadece ihtiyacınız olan modülleri kullanabilir, ileride yeni özellikler ekleyebilirsiniz.'
  },
  {
    id: 4,
    type: 'content',
    bg: '/media3.png',
    tag: 'YÖNETİM',
    title: 'Ana Sayfa (Admin Paneli)',
    items: [
      { icon: <LayoutDashboard />, text: 'Merkezi Yönetim Paneli: Tüm sistemi tek bakışta görün.' },
      { icon: <Users />, text: 'Kullanıcı ekleme ve modül bazlı yetkilendirme.' },
      { icon: <Wallet />, text: 'Aylık / Yıllık gelir - gider özetleri.' },
      { icon: <MapPin />, text: 'Mağaza ve şehir bazlı gelişmiş filtreleme.' },
      { icon: <TrendingUp />, text: 'Anlık finansal durum ve canlı performans göstergeleri.' }
    ],
    notes: 'Admin paneli, karar vericiler için bir "kontrol odası"dır. Şirketin o anki mali nabzını ve şube performanslarını buradan izleyebilirsiniz.'
  },
  {
    id: 5,
    type: 'content',
    tag: 'PERSONEL',
    title: 'İnsan Kaynakları Yönetimi',
    subtitle: 'Küçük & Büyük Ölçekli Firmalar İçin Uçtan Uca Takip',
    items: [
      { icon: <Layers />, text: 'Organizasyon hiyerarşisi ve birim yönetimi.' },
      { icon: <Calculator />, text: 'Çalışan maaş, prim ve ödeme yönetimi.' },
      { icon: <FileText />, text: 'İzin, rapor ve izin talep onay süreçleri.' },
      { icon: <Users />, text: 'İşe alım ve başvuru takip sistemi (ATS).' },
      { icon: <CheckCircle2 />, text: 'Performans ve görev bazlı değerlendirme puanları.' }
    ],
    notes: 'İK modülümüz, çalışanın işe alımından performans takibine kadar tüm yaşam döngüsünü dijitalleştirir.'
  },
  {
    id: 6,
    type: 'content',
    bg: '/media4.png',
    tag: 'ENVANTER',
    title: 'Stok Takip Sistemi',
    subtitle: 'Şirket & Şube Bazlı Gerçek Zamanlı Takip',
    items: [
      { icon: <PackageSearch />, text: 'Ürün ve malzeme bazlı detaylı stok bilgisi.' },
      { icon: <Zap />, text: 'Minimum / Maksimum stok alarm sistemi.' },
      { icon: <TrendingUp />, text: 'Yüzdesel stok düşüş & artış otomatik uyarıları.' },
      { icon: <Building2 />, text: 'Şube bazlı satış, kâr & zarar tabloları.' },
      { icon: <BarChart3 />, text: 'Yıllık harcama ve kazanç analiz grafikleri.' }
    ],
    notes: 'Stok takibi, perakende ve hizmet sektörünün can damarıdır. Sistem kritik seviyeye gelen ürünlerde sizi otomatik olarak uyarır.'
  },
  {
    id: 7,
    type: 'content',
    tag: 'OPERASYON',
    title: 'Akıllı Satın Alma & Depo Yönetimi',
    items: [
      { icon: <Wallet />, text: 'Tedarikçi fiyat tekliflerinin merkezi karşılaştırılması.' },
      { icon: <Brain />, text: 'Yapay zeka destekli en kârlı satın alma önerileri.' },
      { icon: <Box />, text: 'Ana depo → şube talep ve transfer süreçleri.' },
      { icon: <CheckCircle2 />, text: 'Talep, onay ve teslimat takip ekranları.' }
    ],
    notes: 'Satın alma modülümüz, yapay zeka kullanarak geçmiş verilerden hangi tedarikçinin daha karlı olduğunu size önerir.'
  },
  {
    id: 8,
    type: 'content',
    bg: '/media2.png',
    tag: 'BÜYÜME',
    title: 'Şube & Franchising Takibi',
    items: [
      { icon: <MapPin />, text: 'Şube listeleri, lokasyon bazlı detay ekranları.' },
      { icon: <FileText />, text: 'Franchising başvuru ve talep form yönetimi.' },
      { icon: <TrendingUp />, text: 'Aylık / Yıllık şube kâr – zarar bilançoları.' },
      { icon: <Calculator />, text: 'Şube bazlı personel ve maaş maliyet analizleri.' },
      { icon: <Users />, text: 'Görev dağılımları ve şube performans grafikleri.' }
    ],
    notes: 'Franchising yapısındaki firmalar için şubeler arası standardizasyon ve finansal denetim sağlar.'
  },
  {
    id: 9,
    type: 'content',
    tag: 'FİNANS',
    title: 'Muhasebe Modülü',
    items: [
      { icon: <Building2 />, text: 'Tedarikçi ve hizmet sağlayıcı firma yönetimi.' },
      { icon: <FileText />, text: 'Ürün talep ve dijital faturalandırma süreçleri.' },
      { icon: <Wallet />, text: 'Cari takip: Firma bazlı alacak – verecek yönetimi.' },
      { icon: <Brain />, text: 'Şube gelirine göre satın alma kârlılık analizleri.' }
    ],
    notes: 'Muhasebe modülümüz operasyonla entegredir. Bir satın alma yapıldığında borç-alacak ilişkisi otomatik kurulur.'
  },
  {
    id: 10,
    type: 'content',
    bg: '/media3.png',
    tag: 'ANALİZ',
    title: 'Raporlama Sistemi',
    items: [
      { icon: <FileText />, text: 'Aylık / Yıllık detaylı gider pusulası.' },
      { icon: <Layers />, text: 'Kalem bazlı harcama ve maliyet detayları.' },
      { icon: <TrendingUp />, text: 'Firma & ürün bazlı kâr marjı analizleri.' },
      { icon: <Brain />, text: 'Yapay zeka destekli maliyet öngörü tabloları.' },
      { icon: <Smartphone />, text: 'Özelleştirilebilir rapor tasarımı ve PDF/Excel çıktı.' }
    ],
    notes: 'Veri, işlendiğinde değer kazanır. Raporlama sistemimiz size karar vermeniz için gerekli temiz ve analiz edilmiş bilgiyi sunar.'
  },
  {
    id: 11,
    type: 'content',
    tag: 'GELECEK',
    title: 'Yapay Zeka Destekli Özellikler',
    subtitle: 'Algoritmalar Sizin İçin Çalışsın',
    items: [
      { icon: <Brain />, text: 'Satın alma karar önerileri ve trend analizleri.' },
      { icon: <Target />, text: 'Tedarikçi fiyat teklif karşılaştırma algoritmaları.' },
      { icon: <TrendingUp />, text: 'Gelecek dönem kâr – zarar tahminlemeleri.' },
      { icon: <Users />, text: 'CV analiz ve adayı pozisyonla eşleştirme önerileri.' },
      { icon: <Zap />, text: 'Otomatik maliyet optimizasyonu raporları.' }
    ],
    notes: 'AI modülümüz, sadece olanı göstermez, olabilecekleri tahmin ederek sizi risklere karşı korur.'
  },
  {
    id: 12,
    type: 'content',
    tag: 'ENTEGRASYON',
    title: 'Opsiyonel Entegrasyonlar',
    items: [
      { icon: <CreditCard />, text: 'NFC Kart: Görev ve yetki kontrol sistemleri.' },
      { icon: <Box />, text: 'Barkod: Depo & Stok donanım entegrasyonu.' },
      { icon: <LayoutDashboard />, text: 'Kasa: Satış noktası (POS) uygulamaları.' },
      { icon: <Video />, text: 'Güvenlik: Kamera sistemleri tek panel izleme.' },
      { icon: <Fingerprint />, text: 'Biometrik: Parmak izi/Yüz tanıma giriş-çıkış takip.' }
    ],
    notes: 'Donanım tarafında da yanınızdayız. Mevcut donanımlarınızla veya önerdiğimiz yeni nesil cihazlarla tam entegre çalışıyoruz.'
  },
  {
    id: 13,
    type: 'content',
    bg: '/media1.png',
    tag: 'AVANTAJLAR',
    title: 'Sağladığı Faydalar',
    items: [
      { icon: <Zap />, text: 'Operasyonel maliyetlerde ciddi düşüş.' },
      { icon: <Target />, text: 'Hızlı ve veriye dayalı doğru karar alma.' },
      { icon: <ShieldCheck />, text: 'Şeffaf, izlenebilir ve güvenli süreçler.' },
      { icon: <TrendingUp />, text: 'Sürdürülebilir kârlılık artışı.' },
      { icon: <CheckCircle2 />, text: 'İnsan hatalarının ve suistimallerin minimuma indirilmesi.' }
    ],
    notes: 'Sistem kurulumundan kısa bir süre sonra verimlilik artışını ve maliyetlerin kontrol altına alındığını net şekilde göreceksiniz.'
  },
  {
    id: 14,
    type: 'content',
    tag: 'SONUÇ',
    title: 'Tek Platform – Tam Kontrol',
    subtitle: 'Geleceğin Yönetim Standardı',
    items: [
      { icon: <LayoutDashboard />, text: 'Yönetim & Finans & İK' },
      { icon: <Box />, text: 'Stok & Şube & Raporlama' },
      { icon: <ShieldCheck />, text: 'Hepsi tek sistemde, güvenli ve ölçeklenebilir.' }
    ],
    notes: 'Özetle JUMBO CRM; dağınık yapıları toplar, karmaşayı çözer ve size sadece şirketinizin büyümesine odaklanma fırsatı verir.'
  },
  {
    id: 15,
    type: 'cover',
    bg: '/media0.png',
    title: 'Teşekkürler',
    subtitle: 'Sorularınız için memnuniyetle yardımcı oluruz.',
    author: 'JUMBO CRM SOLUTIONS',
    date: 'Geleceği Birlikte Yönetelim',
    notes: 'Sunumumuzu dinlediğiniz için teşekkürler. Şimdi sorularınızı alabiliriz veya isterseniz canlı bir demo gerçekleştirebiliriz.'
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'n' || e.key === 'N') setShowNotes(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className={`presentation-container ${showNotes ? 'notes-active' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`slide active ${slide.type === 'cover' ? 'cover-slide' : ''}`}
          style={slide.bg ? { 
            backgroundImage: `linear-gradient(rgba(10, 11, 16, 0.8), rgba(10, 11, 16, 0.85)), url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {}}
        >
          <div className="slide-content">
            {slide.tag && (
              <motion.span 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="tag"
              >
                {slide.tag}
              </motion.span>
            )}
            
            {slide.type === 'cover' ? (
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="animate-fade-in"
              >
                <h1>{slide.title}</h1>
                <p style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', marginBottom: '3rem' }}>{slide.subtitle}</p>
                {slide.items && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                    {slide.items.map((item, i) => (
                      <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ color: 'var(--accent-primary)' }}>{item.icon}</div>
                        <span style={{ fontSize: '1rem', fontWeight: 500 }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: '4rem', opacity: 0.7 }}>
                  <h3 style={{ color: 'white' }}>{slide.author}</h3>
                  <p style={{ fontSize: '1rem' }}>{slide.date}</p>
                </div>
              </motion.div>
            ) : (
              <div className="animate-fade-in">
                <motion.h2 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  {slide.title}
                </motion.h2>
                {slide.subtitle && <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>{slide.subtitle}</p>}
                
                <div className="glass-card">
                  <div className="grid-2">
                    {slide.items.map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}
                      >
                        <div style={{ padding: '1rem', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                          {item.icon}
                        </div>
                        <div>
                          <p style={{ color: 'white', marginBottom: '0.2rem', fontWeight: 500, fontSize: '1.2rem' }}>{item.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="nav-controls">
        <button className="nav-btn" onClick={() => setShowNotes(!showNotes)} title="Konuşma Notları (N)">
          <MessageSquare size={24} />
        </button>
        <button className="nav-btn" onClick={prevSlide} disabled={currentSlide === 0}>
          <ChevronLeft size={32} />
        </button>
        <div style={{ background: 'var(--glass-bg)', padding: '0 1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', fontSize: '0.9rem', border: '1px solid var(--glass-border)' }}>
          {currentSlide + 1} / {slides.length}
        </div>
        <button className="nav-btn" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />

      <motion.div 
        className="speak-notes"
        initial={false}
        animate={{ opacity: showNotes ? 1 : 0, y: showNotes ? 0 : 20 }}
      >
        <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={16} /> Sunum Notları
        </h4>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, color: '#eee' }}>{slide.notes}</p>
      </motion.div>
    </div>
  );
}

export default App;
