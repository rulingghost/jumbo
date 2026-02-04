/**
 * JUMBO PRESTIGE ANALYTICS v11 - ULTIMATE EDITION
 * A high-performance, animation-rich enterprise dashboard for 1000+ Global Units.
 */

let allStores = [];
let map;
let markerCluster;
let currentView = 'Global'; 
let selectedRegion = 'All';
let selectedStore = null;

const COUNTRIES = ['Hollanda', 'Türkiye', 'Almanya', 'İtalya', 'İspanya', 'ABD', 'Asya'];
const TOTAL_NODE_TARGET = 1000;

// Dynamic Data Pools
const mPool = ['Johan Vermeer', 'Selin Demir', 'Mark Jansen', 'Emre Kaya', 'Hans Müller', 'Elena Rossi', 'David Smith', 'Sophie Laurent'];
const activityLog = [];

/**
 * Advanced Data Generator
 */
function generateCoreData() {
    const data = [];
    const cityCoords = {
        'Hollanda': [[52.37, 4.89], [51.92, 4.47], [52.09, 5.12]],
        'Türkiye': [[41.00, 28.97], [39.93, 32.85], [38.42, 27.14]],
        'Almanya': [[52.52, 13.40], [48.13, 11.58], [53.55, 9.99]],
        'İtalya': [[41.90, 12.49], [45.46, 9.18]],
        'İspanya': [[40.41, -3.70], [41.38, 2.17]],
        'ABD': [[40.71, -74.00], [34.05, -118.24]],
        'Asya': [[35.67, 139.65], [25.20, 55.27]]
    };

    for (let i = 1; i <= TOTAL_NODE_TARGET; i++) {
        const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        const base = cityCoords[country][Math.floor(Math.random() * cityCoords[country].length)];
        const lat = base[0] + (Math.random() - 0.5) * 1.2;
        const lng = base[1] + (Math.random() - 0.5) * 1.2;
        
        const rev = 150000 + Math.floor(Math.random() * 850000);
        const perf = 45 + Math.floor(Math.random() * 55);
        
        data.push({
            id: `JB-NODE-${1000 + i}`,
            name: `${country} Strategic Unit #${1000 + i}`,
            manager: mPool[Math.floor(Math.random() * mPool.length)],
            country: country,
            city: `${country} Operational Hub`,
            coords: [lat, lng],
            status: perf > 55 ? 'Aktif' : 'Denetim',
            revenue: rev,
            rent: 12000 + Math.floor(Math.random() * 45000),
            staff: 15 + Math.floor(Math.random() * 150),
            perf: perf,
            inventory: 65 + Math.floor(Math.random() * 35),
            history: Array.from({length: 12}, () => 40 + Math.floor(Math.random() * 60))
        });
    }
    return data;
}

/**
 * System Init
 */
function initv11System() {
    try {
        allStores = generateCoreData();
        setupMap();
        renderSidebar();
        updateGlobalKPIs();
        startActivityStream();
        
        // Hide loader with a smooth transition
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }
    } catch(e) {
        console.error("System Boot Error:", e);
        document.getElementById('loader').style.display = 'none';
    }
}

function setupMap() {
    const bounds = L.latLngBounds(L.latLng(-85, -179), L.latLng(85, 179));
    map = L.map('map', {
        center: [25, 10], zoom: 3, minZoom: 2, maxZoom: 18,
        zoomControl: false, attributionControl: false, maxBounds: bounds
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { noWrap: true }).addTo(map);

    // V11 CLUSTER DESIGN
    markerCluster = L.markerClusterGroup({
        maxClusterRadius: 40,
        disableClusteringAtZoom: 16,
        iconCreateFunction: (cluster) => {
            const count = cluster.getChildCount();
            const sizeClass = count < 50 ? 'v11-sm' : (count < 200 ? 'v11-md' : 'v11-lg');
            return L.divIcon({
                html: `<div class="v11-cluster ${sizeClass}"><span>${count}</span></div>`,
                className: 'v11-cluster-wrap',
                iconSize: [45, 45]
            });
        }
    });
    
    syncMarkers('All');
    map.addLayer(markerCluster);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
}

function syncMarkers(country = 'All') {
    markerCluster.clearLayers();
    const filtered = country === 'All' ? allStores : allStores.filter(s => s.country === country);
    
    filtered.forEach(s => {
        let statusColor = s.perf > 85 ? '#10b981' : (s.perf > 65 ? '#f59e0b' : '#ef4444');
        
        // MARKET ICON ENFORCED
        const icon = L.divIcon({
            className: 'v11-node-marker',
            html: `<div class="v11-pin" style="background:${statusColor}"><i class="fas fa-store"></i></div>`,
            iconSize: [32, 32], iconAnchor: [16, 16]
        });

        const m = L.marker(s.coords, { icon: icon });
        
        // INTERACTIVE DATA ON HOVER
        m.bindTooltip(`
            <div class="v11-map-tip">
                <div class="tip-id">${s.id}</div>
                <div class="tip-rev">Ciro: <b>$${(s.revenue/1000).toFixed(0)}k</b></div>
                <div class="tip-perf">Skor: <b style="color:${statusColor}">${s.perf}%</b></div>
            </div>
        `, { direction: 'top', offset: [0, -10], opacity: 1, sticky: true });

        m.on('click', () => zoomToStore(s));
        markerCluster.addLayer(m);
    });

    const avg = Math.round(filtered.reduce((a, b) => a + b.perf, 0) / filtered.length);
    document.getElementById('mapPerfAvg').textContent = `%${avg}`;
}

/**
 * Sidebar Tiered Engine
 */
function renderSidebar() {
    const box = document.getElementById('sidebarContent');
    box.style.opacity = '0';
    
    setTimeout(() => {
        box.innerHTML = '';
        if (currentView === 'Global') renderGlobal(box);
        else if (currentView === 'Region') renderRegion(box, selectedRegion);
        else if (currentView === 'Store') renderStore(box, selectedStore);
        box.style.opacity = '1';
    }, 200);
}

function renderGlobal(box) {
    COUNTRIES.forEach(c => {
        const stores = allStores.filter(s => s.country === c);
        const totalRev = stores.reduce((a, b) => a + b.revenue, 0);
        const avgEff = Math.round(stores.reduce((a, b) => a + b.perf, 0) / stores.length);

        const card = document.createElement('div');
        card.className = 'v11-region-card';
        card.innerHTML = `
            <div class="v11-card-top">
                <h3>${c.toUpperCase()}</h3>
                <span class="v11-count">${stores.length} Şube</span>
            </div>
            <div class="v11-card-metrics">
                <div class="v11-m-item"><small>TOTAL VOLUME</small><strong>$${(totalRev/1000000).toFixed(2)}M</strong></div>
                <div class="v11-m-item"><small>NODAL SCORE</small><strong class="${avgEff > 80 ? 'green' : (avgEff > 60 ? 'orange' : 'red')}">%${avgEff}</strong></div>
            </div>
            <div class="v11-prog-bg"><div class="v11-prog-fill" style="width:${avgEff}%"></div></div>
            <button onclick="drillToRegion('${c}')" class="v11-btn-drill">OPERASYONU YÖNET <i class="fas fa-arrow-right"></i></button>
        `;
        box.appendChild(card);
    });
}

function renderRegion(box, country) {
    const list = allStores.filter(s => s.country === country);
    box.innerHTML = `
        <div class="v11-header-nav">
            <button onclick="goBack()" class="v11-back-btn"><i class="fas fa-chevron-left"></i> GLOBAL FİLO</button>
            <h2>${country} Analizi</h2>
        </div>
        <div class="v11-node-list">
            ${list.slice(0, 100).map(s => `
                <div class="v11-list-row" onclick="showStoreById('${s.id}')">
                    <div class="v11-row-main">
                        <strong>${s.id}</strong>
                        <p>${s.manager} | %${s.perf}</p>
                    </div>
                    <div class="v11-row-data">
                        <span class="v11-rev-txt">$${(s.revenue/1000).toFixed(0)}k</span>
                        <div class="v11-dot ${s.perf > 70 ? 'active' : 'warn'}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderStore(box, s) {
    const netProfit = s.revenue - s.rent - (s.staff * 1750);
    box.innerHTML = `
        <div class="v11-header-nav">
            <button onclick="goBack()" class="v11-back-btn"><i class="fas fa-chevron-left"></i> ${s.country} LİSTESİ</button>
            <h2>Birim: ${s.id}</h2>
        </div>
        <div class="v11-store-master">
            <div class="v11-hero-section">
                <div class="v11-hero-avatar"><i class="fas fa-user-circle"></i></div>
                <div class="v11-hero-text">
                    <label>BÖLGE DİREKTÖRÜ</label>
                    <strong>${s.manager}</strong>
                </div>
                <div class="v11-status-pill ${s.status === 'Aktif' ? 'on' : 'off'}">${s.status.toUpperCase()}</div>
            </div>

            <div class="v11-grid-stats">
                <div class="v11-stat-box"><label>GROSS VOLUME</label><strong>$${s.revenue.toLocaleString()}</strong></div>
                <div class="v11-stat-box"><label>MONTHLY RENT</label><strong class="red">$${s.rent.toLocaleString()}</strong></div>
                <div class="v11-stat-box"><label>EFFICIENCY</label><strong class="green">%${s.perf}</strong></div>
                <div class="v11-stat-box"><label>EST. NET PROFIT</label><strong class="${netProfit > 0 ? 'green' : 'red'}">$${netProfit.toLocaleString()}</strong></div>
            </div>

            <div class="v11-live-chart">
                <label>OP-EFFICIENCY TREND (12 DAYS)</label>
                <div class="v11-bars">
                    ${s.history.map(h => `<div class="v11-bar" style="height:${h}%" title="%${h}"></div>`).join('')}
                </div>
            </div>

            <div class="v11-detailed-metrics">
                <div class="v11-detail-row"><span>Personel Kaynağı</span><strong>${s.staff} Units</strong></div>
                <div class="v11-detail-row"><span>Envanter Durumu</span><strong>%${s.inventory}</strong></div>
                <div class="v11-detail-row"><span>Mağaza Kodu</span><strong>${s.id}</strong></div>
            </div>

            <div class="v11-action-hub">
                <button class="v11-primary-btn"><i class="fas fa-file-invoice-dollar"></i> MALİ RAPOR AL</button>
                <button class="v11-secondary-btn" onclick="alert('Denetim emri iletildi.')"><i class="fas fa-clipboard-check"></i> DENETİM BAŞLAT</button>
            </div>
        </div>
    `;
}

/**
 * Navigation Logic
 */
function drillToRegion(c) {
    currentView = 'Region'; selectedRegion = c;
    renderSidebar(); syncMarkers(c);
    const coords = { 'Hollanda': [52.13, 5.29, 8], 'Türkiye': [38.96, 35.24, 6], 'Almanya': [51.16, 10.45, 6], 'İtalya': [41.87, 12.56, 6], 'İspanya': [40.46, -3.74, 6], 'ABD': [37.09, -95.71, 4], 'Asya': [30.0, 100.0, 4] };
    const t = coords[c];
    if(t) map.flyTo([t[0], t[1]], t[2], { duration: 2.5 });
}

function zoomToStore(s) {
    currentView = 'Store'; selectedStore = s;
    renderSidebar();
    map.flyTo(s.coords, 16, { duration: 2.5 });
}

function showStoreById(id) {
    const s = allStores.find(x => x.id === id);
    if(s) zoomToStore(s);
}

function goBack() {
    if (currentView === 'Store') currentView = 'Region';
    else { currentView = 'Global'; selectedRegion = 'All'; syncMarkers('All'); map.flyTo([25, 10], 3, { duration: 3 }); }
    renderSidebar();
}

function updateGlobalKPIs() {
    const totalRev = allStores.reduce((a, b) => a + b.revenue, 0);
    document.getElementById('totalRevenue').textContent = `$${(totalRev / 1000000).toFixed(1)}M`;
    document.getElementById('totalStores').textContent = allStores.length;
}

function startActivityStream() {
    const statusText = document.querySelector('.system-status span:last-child');
    const scenarios = ["Sistem Senkronize Ediliyor...", "1000 Node Aktif İzlendi.", "Bölge Analizi Tamamlandı.", "Operasyonel Veri Akışı Stabil.", "Güvenlik Denetimi Aktif."];
    setInterval(() => {
        statusText.style.opacity = '0';
        setTimeout(() => {
            statusText.textContent = scenarios[Math.floor(Math.random()*scenarios.length)];
            statusText.style.opacity = '1';
        }, 500);
    }, 4000);
}

// Global Search
document.getElementById('masterSearch').oninput = (e) => {
    const t = e.target.value.toLowerCase();
    if(!t) { renderSidebar(); return; }
    const filtered = allStores.filter(s => s.id.toLowerCase().includes(t) || s.manager.toLowerCase().includes(t) || s.country.toLowerCase().includes(t)).slice(0, 30);
    const box = document.getElementById('sidebarContent');
    box.innerHTML = `<h5 style="color:#94a3b8; font-size:0.7rem; margin-bottom:15px; letter-spacing:1px; text-transform:uppercase;">FİLTRE SONUÇLARI (${filtered.length})</h5>`;
    filtered.forEach(s => {
        const item = document.createElement('div');
        item.className = 'v11-list-row';
        item.innerHTML = `<div class="v11-row-main"><strong>${s.id}</strong><p>${s.country} | ${s.manager}</p></div>`;
        item.onclick = () => zoomToStore(s);
        box.appendChild(item);
    });
};

window.onload = initv11System;
