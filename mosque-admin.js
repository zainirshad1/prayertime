// mosque-admin.js - Mosque admin functionality
function showMosqueAdminView(mosqueId) {
    const mosque = mosques[mosqueId];
    if (mosque) {
        document.getElementById('content-container').innerHTML = `
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h3 class="font-bold text-gray-500 mb-4">Manage ${mosque.name}</h3>
                <form id="mosque-admin-form">
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Fajr</label>
                        <input type="time" id="admin-fajr" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.fajr.split(' ')[0]}">
                        <label class="block text-gray-700 mb-2">Azan Fajr</label>
                        <input type="time" id="admin-azan-fajr" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.azan.fajr}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Dhuhr</label>
                        <input type="time" id="admin-dhuhr" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.dhuhr.split(' ')[0]}">
                        <label class="block text-gray-700 mb-2">Azan Dhuhr</label>
                        <input type="time" id="admin-azan-dhuhr" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.azan.dhuhr}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Asr</label>
                        <input type="time" id="admin-asr" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.asr.split(' ')[0]}">
                        <label class="block text-gray-700 mb-2">Azan Asr</label>
                        <input type="time" id="admin-azan-asr" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.azan.asr}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Maghrib</label>
                        <input type="time" id="admin-maghrib" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.maghrib.split(' ')[0]}">
                        <label class="block text-gray-700 mb-2">Azan Maghrib</label>
                        <input type="time" id="admin-azan-maghrib" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.azan.maghrib}">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 mb-2">Isha</label>
                        <input type="time" id="admin-isha" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.isha.split(' ')[0]}">
                        <label class="block text-gray-700 mb-2">Azan Isha</label>
                        <input type="time" id="admin-azan-isha" class="bg-gray-100 rounded-lg px-3 py-2" value="${mosque.azan.isha}">
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Save Changes
                        </button>
                    </div>
                </form>
                <div class="mt-4">
                    <button id="start-broadcast-btn" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Start Live Broadcast
                    </button>
                    <div id="broadcast-status" class="mt-2 text-gray-500 hidden">Broadcasting live...</div>
                </div>
            </div>
        `;
        
        // Handle form submission
        document.getElementById('mosque-admin-form').addEventListener('submit', function(e) {
            e.preventDefault();
            mosque.fajr = document.getElementById('admin-fajr').value + ' AM';
            mosque.dhuhr = document.getElementById('admin-dhuhr').value + ' PM';
            mosque.asr = document.getElementById('admin-asr').value + ' PM';
            mosque.maghrib = document.getElementById('admin-maghrib').value + ' PM';
            mosque.isha = document.getElementById('admin-isha').value + ' PM';
            mosque.azan.fajr = document.getElementById('admin-azan-fajr').value;
            mosque.azan.dhuhr = document.getElementById('admin-azan-dhuhr').value;
            mosque.azan.asr = document.getElementById('admin-azan-asr').value;
            mosque.azan.maghrib = document.getElementById('admin-azan-maghrib').value;
            mosque.azan.isha = document.getElementById('admin-azan-isha').value;
            alert('Prayer and Azan times updated successfully for ' + mosque.name);
        });

        // Handle start broadcast button
        document.getElementById('start-broadcast-btn').addEventListener('click', function() {
            const broadcastStatus = document.getElementById('broadcast-status');
            broadcastStatus.classList.remove('hidden');
            broadcastStatus.textContent = "Broadcasting live from " + mosque.name;
            // Here you can add the logic to start the actual broadcast
        });
    }
}
