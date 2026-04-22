/* =============================================================
   1. DATA — Array of Objects
      Each item in fitnessWearables is an OBJECT with key-value
      pairs that describe one device. Together they form an ARRAY
      that acts as our "database."
   ============================================================= */

const fitnessWearables = [
  {
    name: "Apple Watch Ultra 3",
    brand: "Apple",
    price: 799,          
    batteryLife: 72,      
    formFactor: "Watch",
    sensors: ["ECG", "SpO2", "Heart Rate", "Temperature", "Depth Gauge", "GPS"],
    subscription: 0,      
    image: "assets/images/AppleWatchUltra3.jpeg",
    rating: 4.7
  },
  {
    name: "Apple Watch Series 11",
    brand: "Apple",
    price: 499,
    batteryLife: 36,
    formFactor: "Watch",
    sensors: ["ECG", "SpO2", "Heart Rate", "Temperature", "Crash Detection"],
    subscription: 0,
    image: "assets/images/AppleWatchSeries11.jpeg",
    rating: 4.5
  },
  {
    name: "Whoop 5.0",
    brand: "Whoop",
    price: 0,         
    batteryLife: 336,     
    formFactor: "Band",
    sensors: ["Medical-grade ECG", "SpO2", "Skin Temp", "Stress Monitor", "HRV"],
    subscription: 30,
    image: "assets/images/Whoop5.0.webp",
    rating: 4.3 
  },
  {
    name: "Oura Ring 4",
    brand: "Oura",
    price: 349,
    batteryLife: 192,     
    formFactor: "Ring",
    sensors: ["HRV", "SpO2", "Temperature", "Sleep Staging", "Heart Rate"],
    subscription: 6,
    image: "assets/images/OuraRing4.png",
    rating: 4.6
  },
  {
    name: "Garmin Fenix 8",
    brand: "Garmin",
    price: 899,
    batteryLife: 480,     
    formFactor: "Watch",
    sensors: ["ECG", "SpO2", "Heart Rate", "GPS", "Altimeter", "HRV", "Solar Charging"],
    subscription: 0,
    image: "assets/images/GarminFenix8.webp",
    rating: 4.8
  },
  {
    name: "Garmin Venu 4",
    brand: "Garmin",
    price: 449,
    batteryLife: 312,     
    formFactor: "Watch",
    sensors: ["Heart Rate", "SpO2", "GPS", "HRV", "Stress", "Hydration"],
    subscription: 0,
    image: "assets/images/GarminVenu4.webp",
    rating: 4.4
  },
  {
    name: "Samsung Galaxy Watch 8",
    brand: "Samsung",
    price: 299,
    batteryLife: 60,      
    formFactor: "Watch",
    sensors: ["ECG", "SpO2", "Heart Rate", "BIA Body Comp", "Temperature", "GPS"],
    subscription: 0,
    image: "assets/images/samsungGalaxyWatch8.webp",
    rating: 4.3
  },
  {
    name: "Fitbit Charge 7",
    brand: "Fitbit",
    price: 179,
    batteryLife: 168,       
    formFactor: "Band",
    sensors: ["Heart Rate", "SpO2", "EDA (Stress)", "Temperature", "GPS"],
    subscription: 10,
    image: "assets/images/FitbitCharge7.webp",
    rating: 4.1
  },
  {
    name: "Google Pixel Watch 4",
    brand: "Google",
    price: 399,
    batteryLife: 48,        
    formFactor: "Watch",
    sensors: ["ECG", "SpO2", "Heart Rate", "cEDA Stress", "Temperature", "GPS"],
    subscription: 0,
    image: "assets/images/GooglePixelWatch4.jpg",
    rating: 4.2
  },
  {
    name: "Amazfit Balance 2",
    brand: "Amazfit",
    price: 249,
    batteryLife: 336,     
    formFactor: "Watch",
    sensors: ["Heart Rate", "SpO2", "Temperature", "Stress", "GPS", "Sleep Staging"],
    subscription: 0,
    image: "assets/images/AmazfitBalance2.webp",
    rating: 4.2
  },
  {
    name: "RingConn Gen 2",
    brand: "RingConn",
    price: 279,
    batteryLife: 168,     
    formFactor: "Ring",
    sensors: ["Heart Rate", "SpO2", "HRV", "Sleep Staging", "Temperature"],
    subscription: 0,     
    image: "assets/images/RingConnGen2.webp",
    rating: 4.1
  },
  {
    name: "Withings ScanWatch Nova",
    brand: "Withings",
    price: 299,
    batteryLife: 720,     
    formFactor: "Watch",
    sensors: ["ECG", "SpO2", "Heart Rate", "Temperature", "HRV"],
    subscription: 10,
    image: "assets/images/WithingsScanWatchNova.jpg",
    rating: 4.3
  }
];


/* =============================================================
   2. HELPER — Calculate true 1-year cost of ownership
      Why: Some devices are "free" upfront but cost $30/mo.
      This function returns: devicePrice + (monthlyFee × 12)
   ============================================================= */

function getYearlyCost(item) {
  return item.price + item.subscription * 12;
}


/* =============================================================
   3. HELPER — Format battery life for display
      Converts hours to a human-readable string like "14 days"
   ============================================================= */

function formatBattery(hours) {
  if (hours >= 24) {
    const days = Math.round(hours / 24);
    return days + (days === 1 ? " day" : " days");
  }
  return hours + "h";
}


/* =============================================================
   4. HELPER — Return CSS class for battery level color coding
   ============================================================= */

function batteryClass(hours) {
  if (hours >= 96)  return "battery-good";  // 4+ days: green
  if (hours >= 36)  return "battery-ok";    // 1.5+ days: gold
  return "battery-low";                     // under 36h: red
}


/* =============================================================
   5. RENDER — displayItems(itemsToDisplay)
      This is the core function. It takes an array of device
      objects and builds HTML cards for each one inside the
      #card-container div.
   ============================================================= */

function displayItems(itemsToDisplay) {
  const container = document.querySelector("#card-container");
  container.innerHTML = "";  // Clear all current cards first

  // Update the results count text
  const countEl = document.querySelector("#results-count");
  countEl.textContent = `Showing ${itemsToDisplay.length} of ${fitnessWearables.length} devices`;

  // Show a friendly message if no results match the search/filter
  if (itemsToDisplay.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No devices found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    `;
    return;
  }

  // Loop through every item in the array and create a card for it
  itemsToDisplay.forEach(item => {
    const yearlyCost = getYearlyCost(item);
    const brandClass = "brand-" + item.brand.toLowerCase();

    // Format the upfront price display
    const priceDisplay = item.price === 0
      ? `<span class="price-device free">Free w/ Plan</span>`
      : `<span class="price-device">$${item.price}</span>`;

    // Build sensor tags HTML using forEach
    let sensorTagsHTML = "";
    item.sensors.forEach(sensor => {
      sensorTagsHTML += `<span class="sensor-tag">${sensor}</span>`;
    });

    // Subscription badge text
    const subBadge = item.subscription > 0
      ? `<span class="sub-badge has-sub">+$${item.subscription}/mo</span>`
      : `<span class="sub-badge no-sub">No Sub</span>`;

    // Build the full card HTML and add it to the container
    container.innerHTML += `
      <div class="card ${brandClass}">
        <div class="card-image-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy"
               onerror="this.src='https://placehold.co/400x220/1c2333/475569?text=${encodeURIComponent(item.name)}'">
          <span class="form-badge">${item.formFactor}</span>
          ${subBadge}
        </div>
        <div class="card-content">
          <p class="card-brand">${item.brand}</p>
          <h2>${item.name}</h2>
          <div class="card-price-row">
            ${priceDisplay}
            ${item.subscription > 0 ? `<span class="price-sub">+$${item.subscription}/mo</span>` : ""}
            <span class="price-yearly">$${yearlyCost}/yr</span>
          </div>
          <div class="card-specs">
            <div class="spec-item">
              <span class="spec-label">Battery</span>
              <span class="spec-value ${batteryClass(item.batteryLife)}">${formatBattery(item.batteryLife)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">1-Year Cost</span>
              <span class="spec-value">$${yearlyCost}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Rating</span>
              <span class="spec-value">⭐ ${item.rating}</span>
            </div>
          </div>
          <div class="sensors-wrap">${sensorTagsHTML}</div>
        </div>
      </div>
    `;
  });
}


/* =============================================================
   6. OPERATION A — searchItems(query)
      Filters the catalog to only show items whose name OR brand
      contains the search query text (case-insensitive).
      Uses: .filter() and .includes() and .toLowerCase()
   ============================================================= */

function searchItems(itemsArray, query) {
  if (!query) return itemsArray;
  const lowerQuery = query.toLowerCase();

  return itemsArray.filter(item => {
    const nameMatch  = item.name.toLowerCase().includes(lowerQuery);
    const brandMatch = item.brand.toLowerCase().includes(lowerQuery);
    return nameMatch || brandMatch;
  });
}


/* =============================================================
   7. OPERATION B — filterByFormFactor(formFactor)
      Shows only devices that match a selected form factor,
      e.g., "Watch", "Band", or "Ring".
      Uses: .filter() with a strict equality check (===)
   ============================================================= */

function filterByFormFactor(itemsArray, formFactor) {
  if (formFactor === "All") {
    return itemsArray;
  }

  return itemsArray.filter(item => {
    return item.formFactor === formFactor;
  });
}


/* =============================================================
   8. OPERATION C — sortItems(itemsArray, sortKey)
      Sorts any array of items based on a key like "price" or
      "yearly cost". Returns a NEW sorted array without changing
      the original.
      Uses: .slice() to copy, .sort() with a comparator function,
            and .map() to compute yearly cost for comparison.
   ============================================================= */

function sortItems(itemsArray, sortKey) {
  const sorted = [...itemsArray];

  if (sortKey === "price-asc")    return sorted.sort((a, b) => a.price - b.price);
  if (sortKey === "price-desc")   return sorted.sort((a, b) => b.price - a.price);
  if (sortKey === "battery-desc") return sorted.sort((a, b) => b.batteryLife - a.batteryLife);

  if (sortKey === "yearly-asc")   return sorted.sort((a, b) => getYearlyCost(a) - getYearlyCost(b));
  if (sortKey === "yearly-desc")  return sorted.sort((a, b) => getYearlyCost(b) - getYearlyCost(a));

  return sorted; 
}


/* =============================================================
   9. OPERATION D — filterLongBattery(itemsArray)
      The "Endurance Filter" — shows only devices with 48+ hours
      of battery life. This helps travelers find gear they won't
      need to charge every single night.
      Uses: .filter() with a numeric comparison (>)
   ============================================================= */

function filterLongBattery(itemsArray) {
  return itemsArray.filter(item => item.batteryLife > 48);
}


/* =============================================================
   10. COMBINED — applyAllFilters()
       Reads the current state of every control (search input,
       form factor dropdown, sort select, battery toggle) and
       applies them one by one in order, then calls displayItems.
   ============================================================= */

function applyAllFilters() {
  const searchQuery   = document.querySelector("#search-input").value.trim();
  const formFactor    = document.querySelector("#form-filter").value;
  const sortKey       = document.querySelector("#sort-select").value;
  const batteryActive = document.querySelector("#battery-toggle").classList.contains("active");
  const noSubActive   = document.querySelector("#sub-toggle").classList.contains("active");

  // Spread operator to create a copy, keep original dataset unchanged
  let results = [...fitnessWearables];

  // Step 1: Use our search function
  results = searchItems(results, searchQuery);

  // Step 2: Use our form factor function
  results = filterByFormFactor(results, formFactor);

  // Step 3: Apply the endurance toggle
  if (batteryActive) {
    results = filterLongBattery(results);
  }

  // Step 4: Apply the no sub toggle (Inline Filter)
  if (noSubActive) {
    results = results.filter(item => item.subscription === 0);
  }

  // Step 5: Sort the final list
  results = sortItems(results, sortKey);

  // Step 6: Update the active filters label
  const activeFiltersEl = document.querySelector("#active-filters");
  const tags = [];
  if (formFactor !== "All")  tags.push(formFactor);
  if (batteryActive)         tags.push("48 h+ Battery");
  if (noSubActive)           tags.push("No Subscription");
  if (searchQuery)           tags.push(`"${searchQuery}"`);
  if (sortKey !== "default") tags.push("Sorted");
  activeFiltersEl.textContent = tags.length > 0 ? "Active: " + tags.join(" · ") : "";

  displayItems(results);
}


/* =============================================================
   11. EVENT LISTENERS — Making the page interactive
       We attach listener functions to elements so JS knows
       WHEN to run our filter/search/sort functions.
   ============================================================= */

// Search button click
document.querySelector("#search-btn").addEventListener("click", () => {
  applyAllFilters();
});

// Also search when user presses Enter inside the input
document.querySelector("#search-input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    applyAllFilters();
  }
});

// Form factor dropdown change
document.querySelector("#form-filter").addEventListener("change", () => {
  applyAllFilters();
});

// Sort dropdown change
document.querySelector("#sort-select").addEventListener("change", () => {
  applyAllFilters();
});

// Battery toggle button — toggles the "active" class on/off
document.querySelector("#battery-toggle").addEventListener("click", () => {
  const btn = document.querySelector("#battery-toggle");
  btn.classList.toggle("active");
  const isActive = btn.classList.contains("active");
  btn.setAttribute("aria-pressed", isActive);  // Accessibility attribute
  applyAllFilters();
});

// No Sub toggle button
document.querySelector("#sub-toggle").addEventListener("click", () => {
  const btn = document.querySelector("#sub-toggle");
  btn.classList.toggle("active");
  const isActive = btn.classList.contains("active");
  btn.setAttribute("aria-pressed", isActive);  
  applyAllFilters();
});

// Reset button — clears everything back to default
document.querySelector("#reset-btn").addEventListener("click", () => {
  document.querySelector("#search-input").value = "";
  document.querySelector("#form-filter").value  = "All";
  document.querySelector("#sort-select").value  = "default";

  const batteryBtn = document.querySelector("#battery-toggle");
  batteryBtn.classList.remove("active");
  batteryBtn.setAttribute("aria-pressed", "false");

  const subBtn = document.querySelector("#sub-toggle");
  subBtn.classList.remove("active");
  subBtn.setAttribute("aria-pressed", "false");

  displayItems(fitnessWearables);

  document.querySelector("#active-filters").textContent = "";
});


/* =============================================================
   12. STARTER CODE FUNCTIONS (kept from original template)
   ============================================================= */

function quoteAlert() {
  console.log("Fun Fact button clicked!");
  alert(
    "⌚ Fun Fact: The Garmin Fenix 8 has up to 20 days of battery life — " +
    "that's more than the Oura Ring (8 days) and Apple Watch Ultra (3 days) combined!"
  );
}

function removeLastCard() {
  fitnessWearables.pop();        // Remove the last item from the array
  displayItems(fitnessWearables); // Re-render all remaining cards
  updateHeaderStats();            // Refresh devices, brands, and form factors
  console.log("Removed last item. Remaining:", fitnessWearables.length, "devices");
}


/* =============================================================
   13. INITIALIZE — Show all cards when the page first loads
   ============================================================= */

// A shared helper that keeps all 3 header stats in sync with the data
function updateHeaderStats() {
  const totalDevices = fitnessWearables.length;
  const uniqueBrands = new Set(fitnessWearables.map(item => item.brand)).size;
  const uniqueForms  = new Set(fitnessWearables.map(item => item.formFactor)).size;

  document.querySelector("#stat-count").textContent = totalDevices;
  document.querySelector("#brand-count").textContent = uniqueBrands;
  document.querySelector("#form-count").textContent  = uniqueForms;
}

document.addEventListener("DOMContentLoaded", () => {
  displayItems(fitnessWearables);
  updateHeaderStats(); // Run once when the page first loads
});