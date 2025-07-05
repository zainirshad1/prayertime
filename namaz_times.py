import requests
import datetime

# Simulate a database of mosques with "custom" timings (in reality, fetch from a real database or API)
MOSQUES = [
    {
        "name": "Central Mosque",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "friday_prayer": "13:30",
        "custom_timings": {
            "Fajr": "04:15",
            "Dhuhr": "13:00",
            "Asr":  "17:00",
            "Maghrib": "20:30",
            "Isha": "22:00",
        }
    },
    {
        "name": "Community Mosque",
        "latitude": 40.7306,
        "longitude": -73.9352,
        "friday_prayer": "13:45",
        "custom_timings": None  # No custom timings; use API
    }
]

def get_location():
    """Try to detect the user's location via IP (fallback)."""
    try:
        res = requests.get("https://ipapi.co/json/")
        data = res.json()
        return float(data["latitude"]), float(data["longitude"]), data["city"]
    except Exception:
        print("Could not detect location automatically.")
        return None, None, None

def list_nearby_mosques(lat, lon, radius_km=10):
    """Return mosques within a radius (very simplified)"""
    def haversine(lat1, lon1, lat2, lon2):
        from math import radians, cos, sin, asin, sqrt
        R = 6371  # Earth radius in km
        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)
        a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        return R * c
    nearby = []
    for m in MOSQUES:
        dist = haversine(lat, lon, m["latitude"], m["longitude"])
        if dist <= radius_km:
            nearby.append(m)
    return nearby

def fetch_prayer_times(lat, lon, date=None):
    """Fetch prayer times from Aladhan API"""
    if date is None:
        date = datetime.date.today().strftime("%Y-%m-%d")
    url = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lon}&method=2"
    res = requests.get(url)
    timings = res.json()["data"]["timings"]
    return timings

def main():
    print("Detecting location...")
    lat, lon, city = get_location()
    if lat is None:
        lat = float(input("Enter your latitude: "))
        lon = float(input("Enter your longitude: "))
        city = "your area"
    print(f"Detected location: {city} ({lat}, {lon})")
    
    mosques = list_nearby_mosques(lat, lon)
    mosque = None
    if mosques:
        print("Nearby mosques:")
        for idx, m in enumerate(mosques):
            print(f"{idx+1}. {m['name']}")
        choice = input("Select a mosque by number or press Enter to use standard timings: ")
        if choice and choice.isdigit() and 1 <= int(choice) <= len(mosques):
            mosque = mosques[int(choice)-1]
    
    print("\nPrayer Times:")
    today = datetime.date.today().strftime("%Y-%m-%d")
    if mosque and mosque["custom_timings"]:
        times = mosque["custom_timings"]
        print(f"Timings for {mosque['name']}:")
    else:
        # Use detected or entered location
        times = fetch_prayer_times(lat, lon, today)
        if mosque:
            print(f"API Timings for {mosque['name']}:")
        else:
            print(f"API Timings for {city}:")
    
    for salat in ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]:
        print(f"{salat}: {times[salat]}")
    
    # Friday prayer (Jumuah)
    weekday = datetime.datetime.today().weekday()  # 4 = Friday
    if weekday == 4:
        if mosque and mosque.get("friday_prayer"):
            print(f"Jumu'ah (Friday prayer): {mosque['friday_prayer']}")
        else:
            # Default: same as Dhuhr
            print(f"Jumu'ah (Friday prayer): {times['Dhuhr']}")

if __name__ == "__main__":
    main()
