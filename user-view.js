// user-view.js - User specific functionality
function loadUser View() {
    const mosqueId = 'central'; // Example: Get the mosque ID dynamically based on user location
    const mosque = mosques[mosqueId];
    
    document.getElementById('user-view').innerHTML = `
        <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="font-bold text-gray-500 mb-4">Prayer Times for ${mosque.name}</h3>
            <ul>
                <li>Fajr: ${mosque.fajr} (Azan: ${mosque.azan.fajr})</li>
                <li>Dhuhr: ${mosque.dhuhr} (Azan: ${mosque.azan.dhuhr})</li>
                <li>Asr: ${mosque.asr} (Azan: ${mosque.azan.asr})</li>
                <li>Maghrib: ${mosque.maghrib} (Azan: ${mosque.azan.maghrib})</li>
                <li>Isha: ${mosque.isha} (Azan: ${mosque.azan.isha})</li>
                <li>Jumu'ah: ${mosque.jumuah} (Azan: ${mosque.azan.dhuhr})</li> <!-- Display Jumu'ah -->
            </ul>
            <div id="live-broadcast-status" class="mt-4 text-green-600">
                Live Broadcast: <span id="broadcast-status">Not Started</span>
            </div>
        </div>
    `;
}
