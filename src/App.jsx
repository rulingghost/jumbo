import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, MessageSquare, LayoutDashboard, Users, Box, MapPin, 
  Calculator, BarChart3, Brain, Building2, ShieldCheck, Smartphone, Code2, 
  CheckCircle2, Target, Layers, Zap, Video, Fingerprint, CreditCard, PackageSearch, 
  TrendingUp, Wallet, FileText, Globe, Cpu, Award, ArrowRightCircle, ArrowLeftCircle
} from 'lucide-react';

// ... (slides array remains same as before)

const slides = [
  {
    id: 1,
    type: 'cover',
    bg: '/bg1.png',
    tag: 'JUMBO CRM SOLUTIONS',
    title: 'KURUMSAL CRM ÇÖZÜMÜ',
    subtitle: 'Tüm İş Süreçlerinizi Tek Panelden Yönetin',
    items: [
      { icon: <LayoutDashboard size={20} />, text: 'Yönetim' },
      { icon: <Users size={20} />, text: 'İnsan Kaynakları' },
      { icon: <Box size={20} />, text: 'Stok & Şube Takibi' },
      { icon: <Calculator size={20} />, text: 'Muhasebe' },
      { icon: <BarChart3 size={20} />, text: 'Raporlama' },
      { icon: <Brain size={20} />, text: 'AI Destekli' }
    ],
    notes: 'JUMBO CRM çözümümüze hoş geldiniz. Bu sistem, modern işletmelerin dijital dönüşüm yolculuğunda merkezi yönetim birimi olarak konumlandırılmıştır.'
  },
  {
    id: 2,
    type: 'content',
    bg: '/bg2.png',
    tag: 'TANIM',
    title: 'CRM Nedir?',
    subtitle: 'Customer & Company Resource Management',
    items: [
      { icon: <Globe />, text: 'Tüm şirket operasyonlarını tek merkezden yönetmeyi sağlar.' },
      { icon: <Target />, text: 'Veriye dayalı hızlı ve doğru karar alma mekanizması sunar.' },
      { icon: <Zap />, text: 'Şube, stok, İK ve finansal süreçlerde maksimum verimlilik hedefler.' },
      { icon: <Brain />, text: 'Yapay zeka destekli maliyet ve kârlılık optimizasyonu sağlar.' }
    ],
    notes: 'Bizim CRM yaklaşımımız sadece müşteri odaklı değil, aynı zamanda operasyonel mükemmeliyet odaklıdır.'
  },
  {
    id: 3,
    type: 'content',
    bg: '/bg3.png',
    tag: 'MİMARİ',
    title: 'Sistem Genel Yapısı',
    subtitle: 'Geleceğe Hazır Teknik Altyapı',
    items: [
      { icon: <Layers />, text: 'Modüler ve ölçeklenebilir yapı (Microservices Ready).' },
      { icon: <Building2 />, text: 'Küçük / Orta / Büyük ölçekli tüm firmalara uygun.' },
      { icon: <ShieldCheck />, text: 'Rol bazlı tam yetkilendirme ve audit log sistemi.' },
      { icon: <Smartphone />, text: 'Cross-platform Web & Mobil uyumlu arayüzler.' },
      { icon: <Code2 />, text: 'API & 3rd Party donanım entegrasyonlarına açık.' }
    ],
    notes: 'Teknik mimarimiz, yoğun trafiği ve büyük veriyi saniyeler içinde işleyebilecek şekilde kurgulanmıştır.'
  },
  {
    id: 4,
    type: 'content',
    bg: '/bg4.png',
    tag: 'KONTROL',
    title: 'Ana Sayfa (Admin Paneli)',
    subtitle: 'Şirketinizin Dijital Kokpiti',
    items: [
      { icon: <LayoutDashboard />, text: 'Merkezi Yönetim Paneli: Canlı performans izleme.' },
      { icon: <Users />, text: 'Kullanıcı yönetimi ve dinamik rol tanımlama.' },
      { icon: <Wallet />, text: 'Aylık / Yıllık gelir - gider projeksiyonları.' },
      { icon: <MapPin />, text: 'Global, bölgesel ve mağaza bazlı anlık filtreleme.' },
      { icon: <TrendingUp />, text: 'Kritik finansal KPI ve başarı göstergeleri.' }
    ],
    notes: 'Admin paneli, sadece veri göstermez; yöneticiye eyleme geçebileceği anlamlı içgörüler sunar.'
  },
  {
    id: 5,
    type: 'content',
    bg: '/bg5.png',
    tag: 'İNSAN KAYNAKLARI',
    title: 'İnsan Kaynakları Yönetimi',
    subtitle: 'Yetenek ve Performans Odaklı Yönetim',
    items: [
      { icon: <Layers />, text: 'Organizasyon şeması ve hiyerarşi kurgulama.' },
      { icon: <Calculator />, text: 'Maaş, yan haklar ve bordro ön hazırlık süreçleri.' },
      { icon: <FileText />, text: 'İzin, rapor ve masraf talep onay otomasyonu.' },
      { icon: <Users />, text: 'İşe alım portalı ve aday havuzu yönetimi.' },
      { icon: <Award />, text: 'Performans KPI ve 360 derece değerlendirme.' }
    ],
    notes: 'İnsan kaynağını verimli kullanmak, kârlılığın en gizli anahtarıdır. Biz bu süreci tamamen şeffaf hale getiriyoruz.'
  },
  {
    id: 6,
    type: 'content',
    bg: '/bg6.png',
    tag: 'STOK YÖNETİMİ',
    title: 'Stok Takip Sistemi',
    subtitle: 'Sıfır Hata, Maksimum Kontrol',
    items: [
      { icon: <PackageSearch />, text: 'Ürün ve sarf malzeme bazlı anlık stok takibi.' },
      { icon: <Zap />, text: 'Kritik stok seviyesi otomatik alarm mekanizması.' },
      { icon: <TrendingUp />, text: 'Stok devir hızı ve varyasyon analizleri.' },
      { icon: <Building2 />, text: 'Şube bazlı anlık kâr & zarar ve fire takibi.' },
      { icon: <Smartphone />, text: 'Mobil barkod okutma ile hızlı depo sayımı.' }
    ],
    notes: 'Sistemimiz, şubeler arasındaki stok dengesini koruyarak gereksiz satın alımların önüne geçer.'
  },
  {
    id: 7,
    type: 'content',
    bg: '/bg7.png',
    tag: 'SATIN ALMA',
    title: 'Akıllı Satın Alma & Depo',
    subtitle: 'Veriye Dayalı Tedarik Yönetimi',
    items: [
      { icon: <Wallet />, text: 'Merkezi satın alma ekranları ve onay hiyerarşisi.' },
      { icon: <Target />, text: 'Tedarikçi fiyat karşılaştırma ve geçmiş analizleri.' },
      { icon: <Brain />, text: 'AI Önerisi: En uygun zaman ve fiyatlı alım tahmini.' },
      { icon: <Box />, text: 'Ana depo → Şube arası talep ve sevk yönetimi.' },
      { icon: <CheckCircle2 />, text: 'Dijital irsaliye ve teslimat onay süreçleri.' }
    ],
    notes: 'Satın alma modülümüz, şirket içi taleplerin tek kanaldan, bütçe kontrolüyle yapılmasını sağlar.'
  },
  {
    id: 8,
    type: 'content',
    bg: '/bg8.png',
    tag: 'FRANCHISING',
    title: 'Şube & Franchising Takibi',
    subtitle: 'Sınırsız Büyüme, Merkezi Denetim',
    items: [
      { icon: <Globe />, text: 'Şube performans listeleri ve detaylı karne sistemi.' },
      { icon: <FileText />, text: 'Aday franchise başvuru ve evrak takip süreci.' },
      { icon: <BarChart3 />, text: 'Aylık / Yıllık şube kâr-zarar bilançoları.' },
      { icon: <Users />, text: 'Şube personel maliyeti ve verimlilik kıyaslama.' },
      { icon: <MapPin />, text: 'Harita üzerinde canlı satış yoğunluğu izleme.' }
    ],
    notes: 'Şube ağınızı büyütürken markanızın standardını ve finansal izlenebilirliğini korumanızı sağlıyoruz.'
  },
  {
    id: 9,
    type: 'content',
    bg: '/bg9.png',
    tag: 'MUHASEBE',
    title: 'Muhasebe Modülü',
    subtitle: 'Finansal Süreçlerde Tam Entegrasyon',
    items: [
      { icon: <Building2 />, text: 'Cari Kartlar: Tedarikçi ve müşteri yönetimi.' },
      { icon: <FileText />, text: 'E-Fatura entegrasyonu ve dijital arşivleme.' },
      { icon: <Wallet />, text: 'Ödeme ve tahsilat planlama, çek-senet takibi.' },
      { icon: <Calculator />, text: 'Operasyonel giderlerin otomatik muhasebeleşmesi.' },
      { icon: <Brain />, text: 'Finansal risk analizi ve nakit akış tahminleme.' }
    ],
    notes: 'Muhasebe artık sadece kayıt tutmak değil, veriden finansal güç yaratmaktır.'
  },
  {
    id: 10,
    type: 'content',
    bg: '/bg10.png',
    tag: 'VERİ ANALİZİ',
    title: 'Raporlama Sistemi',
    subtitle: 'Karmaşık Veriyi Karara Dönüştürün',
    items: [
      { icon: <FileText />, text: 'Detaylı gelir-gider pusulası ve nakit akış raporu.' },
      { icon: <Layers />, text: 'Ürün ve kategori bazlı kâr marjı analizleri.' },
      { icon: <TrendingUp />, text: 'Bölgesel ve dönemsel satış trend grafikleri.' },
      { icon: <CheckCircle2 />, text: 'Yöneticiye özel dinamik dashboard tasarımları.' },
      { icon: <Smartphone />, text: 'Otomatik periyodik rapor gönderimi (Email/Sms).' }
    ],
    notes: "Raporlarımız, dakikalarca bekleten Excel'lerin yerini alan, saniyeler içinde üretilen canlı verilerdir."
  },
  {
    id: 11,
    type: 'content',
    bg: '/bg11.png',
    tag: 'AI ENGINE',
    title: 'Yapay Zeka Özellikleri',
    subtitle: 'Sistemin Akıllı Beyni',
    items: [
      { icon: <Brain />, text: 'Optimum stok ve satın alma zamanlaması önerisi.' },
      { icon: <Target />, text: 'Tedarikçi puanlama ve teklif optimizasyonu.' },
      { icon: <TrendingUp />, text: 'Satış tahminleme ve talep yönetimi algoritmaları.' },
      { icon: <Users />, text: 'CV puanlama ve işe alım karar destek robotu.' },
      { icon: <Cpu />, text: 'Anomali tespiti: Beklenmedik giderlerde otomatik uyarı.' }
    ],
    notes: 'Yapay zeka katmanımız, insan gözünden kaçabilecek finansal ve operasyonel hataları tespit eder.'
  },
  {
    id: 12,
    type: 'content',
    bg: '/bg12.png',
    tag: 'DONANIM',
    title: 'Opsiyonel Entegrasyonlar',
    subtitle: 'Sanal ve Fiziksel Dünyanın Birleşimi',
    items: [
      { icon: <CreditCard />, text: 'NFC Kart: Yetki ve görev kontrol sistemleri.' },
      { icon: <PackageSearch />, text: 'Barkod & El Terminali: Hızlı depo süreçleri.' },
      { icon: <Smartphone />, text: 'Yeni nesil Kasa/POS cihazı tam entegrasyonu.' },
      { icon: <Video />, text: 'IP Kamera: Mağaza içi görüntüleme ve analiz.' },
      { icon: <Fingerprint />, text: 'Personel devam kontrol sistemleri (PDKS).' }
    ],
    notes: 'Donanım bağımsız yapımız sayesinde mevcut cihazlarınızı sisteme kolayca entegre edebiliriz.'
  },
  {
    id: 13,
    type: 'content',
    bg: '/bg13.png',
    tag: 'DEĞER ÖNERİSİ',
    title: 'Sağladığı Faydalar',
    subtitle: 'Neden JUMBO CRM?',
    items: [
      { icon: <Award />, text: "%25'e varan operasyonel maliyet tasarrufu." },
      { icon: <Zap />, text: 'Süreçlerde hız ve manuel iş yükünde azalma.' },
      { icon: <ShieldCheck />, text: 'Kurumsal hafıza ve şeffaf veri akışı.' },
      { icon: <TrendingUp />, text: 'Veriye dayalı yönetimle kârlılık artışı.' },
      { icon: <CheckCircle2 />, text: 'İnsan hatalarının minimuma çekilmesi.' }
    ],
    notes: 'JUMBO CRM bir maliyet değil, kendisini kısa sürede amorti eden stratejik bir yatırımdır.'
  },
  {
    id: 14,
    type: 'content',
    bg: '/bg14.png',
    tag: 'ÖZET',
    title: 'Tek Platform – Tam Kontrol',
    subtitle: 'Her Şey Tek Bir Çatı Altında',
    items: [
      { icon: <LayoutDashboard />, text: 'Uçtan uca tüm departmanların entegrasyonu.' },
      { icon: <Cpu />, text: 'Güçlü teknoloji ve yapay zeka altyapısı.' },
      { icon: <ShieldCheck />, text: 'Güvenli, ölçeklenebilir ve sürdürülebilir çözüm.' }
    ],
    notes: 'İşinizi karmaşadan kurtarın. JUMBO CRM ile geleceği bugünden yönetmeye başlayın.'
  },
  {
    id: 15,
    type: 'cover',
    bg: '/sarfea_logo.png',
    tag: 'İLETİŞİM',
    title: 'Teşekkür Ederiz',
    subtitle: 'Sorularınız ve Demo Talepleriniz İçin Buradayız',
    author: 'SARFEA',
    date: 'February 2026',
    notes: 'Zaman ayırdığınız için teşekkürler. Şirketinize özel iş akışlarını netleştirmek için demo sürecini başlatmaya hazırız.'
  },
  {
    id: 16,
    type: 'content',
    bg: '/dashboard_preview.jpg',
    tag: 'ARAYÜZ ÖN İZLEME',
    title: 'Kullanıcı Dostu Panel',
    subtitle: 'Modern ve Erişilebilir Tasarım',
    items: [
      { icon: <LayoutDashboard />, text: 'Kişiselleştirilebilir ana sayfa mizanpajı.' },
      { icon: <Zap />, text: 'Göz yormayan, yüksek kontrastlı dijital arayüz.' },
      { icon: <Smartphone />, text: 'Her cihazdan (Tablet, PC, Mobil) kesintisiz erişim.' },
      { icon: <CheckCircle2 />, text: 'Kullanıcı deneyimi (UX) odaklı hızlı işlem menüleri.' }
    ],
    notes: 'Sistemimizin arayüzü, en karmaşık verileri bile en sade haliyle sunacak şekilde tasarlanmıştır.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showInSlidePreview, setShowInSlidePreview] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setShowInSlidePreview(false);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setShowInSlidePreview(false);
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
      {/* Background Orbs */}
      <div className="glow-orb glow-1"></div>
      <div className="glow-orb glow-2"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="slide active"
          style={{ 
            backgroundImage: slide.id === 15 
              ? `linear-gradient(rgba(5, 6, 10, 0.4), rgba(5, 6, 10, 0.6)), url(${slide.bg})`
              : `linear-gradient(rgba(5, 6, 10, 0.75), rgba(5, 6, 10, 0.85)), url(${slide.bg})`,
            backgroundSize: slide.id === 15 ? 'contain' : 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: slide.id === 16 ? 'blur(15px) scale(1.1)' : 'none'
          }}
        >
          <div className="slide-content">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={(slide.id === 16) ? { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' } : {}}
            >
              <div className="text-side" style={{ position: 'relative' }}>
                {slide.id === 5 && (
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowInSlidePreview(!showInSlidePreview)}
                    style={{
                      position: 'absolute',
                      right: '-80px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      color: 'rgba(255, 255, 255, 0.4)',
                      zIndex: 100,
                      padding: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                    title={showInSlidePreview ? "Görseli Kapat" : "Görseli Göster"}
                  >
                    {showInSlidePreview ? <ArrowRightCircle size={48} /> : <ArrowLeftCircle size={48} />}
                  </motion.button>
                )}

                <motion.span variants={itemVariants} className="tag">
                  {slide.tag}
                </motion.span>
                
                <motion.h1 
                  variants={itemVariants} 
                  style={slide.type !== 'cover' ? { fontSize: '3.5rem', textTransform: 'none', letterSpacing: '-1px' } : {}}
                >
                  {slide.title}
                </motion.h1>

                {slide.subtitle && (
                  <motion.p 
                    variants={itemVariants}
                    style={{ fontSize: '1.6rem', color: 'var(--accent-primary)', marginBottom: '3rem', fontWeight: 500 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                )}

                {slide.type === 'cover' ? (
                  <motion.div 
                    variants={containerVariants}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}
                  >
                    {slide.items && slide.items.map((item, i) => (
                      <motion.div key={i} variants={itemVariants} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ color: 'var(--accent-primary)' }}>{item.icon}</div>
                        <span style={{ fontSize: '1rem', fontWeight: 600 }}>{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants} className="glass-card" style={slide.id === 16 ? { padding: '2rem' } : {}}>
                    <div className={slide.id === 16 ? "grid-1" : "grid-2"}>
                      {slide.items && slide.items.map((item, i) => (
                        <motion.div 
                          key={i} 
                          variants={itemVariants}
                          whileHover={{ x: 10, transition: { duration: 0.2 } }}
                          style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}
                        >
                          <div style={{ 
                            padding: '1.2rem', 
                            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1), rgba(79, 172, 254, 0.1))', 
                            border: '1px solid rgba(0, 242, 254, 0.2)', 
                            borderRadius: '20px', 
                            color: 'var(--accent-primary)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                          }}>
                            {React.cloneElement(item.icon, { size: 28 })}
                          </div>
                          <div style={{ paddingTop: '0.4rem' }}>
                            <p style={{ color: 'white', fontWeight: 500, fontSize: '1.3rem', lineHeight: 1.4 }}>{item.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Overlaid Dashboard Preview for Slide 5 */}
                <AnimatePresence>
                  {slide.id === 5 && showInSlidePreview && (
                    <motion.div 
                      initial={{ x: 200, opacity: 0, scale: 0.9 }}
                      animate={{ x: 600, y: -180, opacity: 1, scale: 1 }}
                      exit={{ x: 200, opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                      style={{ 
                        position: 'absolute', 
                        width: '850px',
                        zIndex: 200,
                        pointerEvents: 'none',
                        top: '50%'
                      }}
                    >
                      <img 
                        src="/dashboard_preview.jpg" 
                        alt="Dashboard Preview" 
                        style={{ 
                          width: '100%', 
                          borderRadius: '32px', 
                          boxShadow: '0 50px 100px rgba(0,0,0,0.9)',
                          border: '2px solid rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(20px)'
                        }} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {slide.id === 16 && (
                <motion.div 
                  initial={{ x: 100, opacity: 0, rotateY: -20 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  exit={{ x: 100, opacity: 0, rotateY: -20 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  style={{ perspective: '1000px' }}
                >
                  <img 
                    src={slide.bg} 
                    alt="Dashboard Preview" 
                    style={{ 
                      width: '100%', 
                      borderRadius: '24px', 
                      boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }} 
                  />
                </motion.div>
              )}

              {slide.type === 'cover' && slide.id === 15 && (
                 <div style={{ marginTop: '3rem', opacity: 0.7 }}>
                  <p style={{ fontSize: '1.2rem', color: '#fff' }}>{slide.author}</p>
                  <p style={{ fontSize: '1rem' }}>{slide.date}</p>
                </div>
              )}
            </motion.div>
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
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '0 1.5rem', 
          height: '56px',
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          fontSize: '1rem', 
          fontWeight: 600,
          border: '1px solid var(--glass-border)',
          color: 'var(--accent-primary)'
        }}>
          {currentSlide + 1} <span style={{ opacity: 0.4, margin: '0 0.5rem' }}>/</span> {slides.length}
        </div>
        <button className="nav-btn" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />

      <AnimatePresence>
        {showNotes && (
          <motion.div 
            className="speak-notes"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.2rem' }}>
              <MessageSquare size={20} /> Sunum Notları
            </h4>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', margin: 0, color: '#ddd' }}>{slide.notes}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div style={{ position: 'fixed', top: '2.5rem', left: '2.5rem', zIndex: 100, opacity: 0.5 }}>
         <Building2 color="#fff" size={32} />
      </div>
    </div>
  );
}

export default App;
