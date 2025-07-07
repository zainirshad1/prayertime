// common.js - Shared functions across all views
function updateCurrentTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', options);
    
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', dateOptions);
    
    // Determine current prayer time (this is demo logic)
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Demo prayer times
    const prayers = [
        { name: 'Fajr', time: { hour: 5, minute: 30 }, cardId: 'fajr-card' },
        { name: 'Dhuhr', time: { hour: 13, minute: 15 }, cardId: 'dhuhr-card' },
        { name: 'Asr', time: { hour: 16, minute: 45 }, cardId: 'asr-card' },
        { name: 'Maghrib', time: { hour: 18, minute: 30 }, cardId: 'maghrib-card' },
        { name: 'Isha', time: { hour: 20, minute: 0 }, cardId: 'isha-card' }
    ];
    
    // Reset all prayer cards
    document.querySelectorAll('.prayer-card').forEach(card => {
        card.classList.remove('current-prayer');
        card.classList.add('bg-white');
        card.classList.remove('bg-gradient-to-r', 'from-green-50', 'to-white');
    });
    
    // Find current prayer time
    let currentPrayer = null;
    let nextPrayer = null;
    
    for (let i = 0; i < prayers.length; i++) {
        const prayer = prayers[i];
        const nextIdx = (i + 1) % prayers.length;
        
        if ((hour > prayer.time.hour || (hour === prayer.time.hour && minute >= prayer.time.minute)) &&
            (hour < prayers[nextIdx].time.hour || (hour === prayers[nextIdx].time.hour && minute < prayers[nextIdx].time.minute))) {
            currentPrayer = prayer;
            nextPrayer = prayers[nextIdx];
            break;
        }
    }
    
    // If no current prayer found (before Fajr)
    if (!currentPrayer) {
        currentPrayer = prayers[prayers.length - 1];
        nextPrayer = prayers[0];
    }
    
    // Highlight current prayer
    const currentCard = document.getElementById(currentPrayer.cardId);
    if (currentCard) {
        currentCard.classList.add('current-prayer');
        currentCard.classList.remove('bg-white');
        currentCard.classList.add('bg-gradient-to-r', 'from-green-50', 'to-white');
    }
    
    // Show next prayer info
    if (nextPrayer) {
        const hourStr = nextPrayer.time.hour % 12 === 0 ? 12 : nextPrayer.time.hour % 12;
        const ampm = nextPrayer.time.hour >= 12 ? 'PM' : 'AM';
        const timeStr = `${hourStr}:${nextPrayer.time.minute.toString().padStart(2, '0')} ${ampm}`;
        
        document.getElementById('next-prayer-name').textContent = nextPrayer.name;
        document.getElementById('next-prayer-time').textContent = timeStr;
    }
}

// Update mosque prayer times based on selected mosque
function updateMosquePrayerTimes(mosqueId) {
    if (!mosqueId) return;
    
    const mosque = mosques[mosqueId];
    if (mosque) {
        document.getElementById('location-name').textContent = mosque.name;
        document.getElementById('fajr-card').querySelector('p').textContent = mosque.fajr;
        document.getElementById('dhuhr-card').querySelector('p').textContent = mosque.dhuhr;
        document.getElementById('asr-card').querySelector('p').textContent = mosque.asr;
        document.getElementById('maghrib-card').querySelector('p').textContent = mosque.maghrib;
        document.getElementById('isha-card').querySelector('p').textContent = mosque.isha;
    }
}
