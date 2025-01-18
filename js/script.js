const data = {
  planet: {
    ArcCorp: [
      'Area 18',
      // other facilities...
    ],
    Crusader: [
      'Orison',
      // other facilities...
    ],
    Hurston: [
      'Lorville',
      'Covalex Distribution Centre S1DC06',
      'Greycat Stanton 1 Production Complex-B',
      'HDPC-Cassillo',
      'HDPC-Farnesway',
      'Sakura Sun Magnolia Workcenter'
    ],
    Microtech: [
      'New Babbage',
      'Covalex Distribution Centre S4DC05',
      'Greycat Stanton IV Production Complex-A',
      'Sakura Sun Goldenrod Workcenter',
      'microTech Logistics Depot S4LD01',
      'microTech Logistics Depot S4LD13',
      'Shubin Mining Facility SM0-10', // New drop-off point
      'Shubin Mining Facility SM0-13', // New drop-off point
      'Shubin Mining Facility SM0-18', // New drop-off point
      'Shubin Mining Facility SM0-22'  // New drop-off point
    ],
  },
  station: {
    'Port Tressler': [],
    'Everus Harbor': [],
    'Baijini Point': [],
    'Seraphim Station': [],
    'ARC-L1': [],
    'CRU-L1': [],
    'CRU-L4': [],
    'CRU-L5': [],
    'HUR-L1': [],
    'HUR-L2': [],
    'HUR-L3': [],
    'HUR-L4': [],
    'HUR-L5': [],
    'MIC-L1': []
  },
  moon: {
    ArcCorp: {
      Lyria: [
        'Humboldt Mine',
        'Loveridge Mineral Reserve',
        'Shubin Mining Facility SAL-2',
        'Shubin Mining Facility SAL-5'
      ],
      Wala: [
        'ArcCorp Mining Area 045',
        'ArcCorp Mining Area 048',
        'ArcCorp Mining Area 056',
        'ArcCorp Mining Area 061',
        'Samson & Sons Salvage Center',
        'Shady Glen Farms'
      ],
    },
    Crusader: {
      Cellin: [
        'Gallee Family Farms',
        'Hickes Research Outpost',
        'Terra Mills Hydrofarm',
        'Tram & Myers Mining'
      ],
      Daymar: [
        'ArcCorp Mining Area 141',
        'Bountiful Harvest Hydroponics',
        'Kudre Ore',
        'Shubin Mining Facility SCD-1',
        'Brios Breaker Yard'
      ],
      Lyria: [
        'Humboldt Mine',
        'Loveridge Mineral Reserve',
        'Shubin Mining Facility SAL-2',
        'Shubin Mining Facility SAL-5'
      ],
      Yela: [
        'ArcCorp Mining Area 157',
        'Benson Mining Outpost',
        'Deakins Research Outpost'
      ],
      PortOlisar: [
        'Crusader Distribution Centre',
        'Crusader Logistics',
        'GrimHex Outpost',
        'Port Olisar Central'
      ]
    },
    Hurston: {
      Arial: [
        'HDMS-Bezdek',
        'HDMS-Lathan'
      ],
      Aberdeen: [
        'HDMS-Anderson',
        'HDMS-Norgaard'
      ],
      Ita: [
        'HDMS-Ryder',
        'HDMS-Woodruff'
      ],
      Magda: [
        'HDMS-Hahn',
        'HDMS-Perlman'
      ]
    },
    Microtech: {
      Calliope: [
        'Rayari Anvik Research Outpost',
        'Rayari Kaltag Research Outpost',
        'Shubin Mining Facility SMCa-6',
        'Shubin Mining Facility SMCa-8'
      ],
      Clio: [
        'Rayari Cantwell Research Outpost',
        'Rayari McGrath Research Outpost'
      ],
      Euterpe: [
        'Devlin Scrap & Salvage'
      ],
    }
  },
  commodities: [
    'Aluminium',
    'Carbon',
    'Corundum',
    'Processed Food',
    'Pressurized ice',
    'Quartz',
    'Silicon',
    'Stims',
    'Tin',
    'Titanium',
    'Tungsten',
    'Hydrogen Fuel',      // New commodity
    'Quantum Fuel',       // New commodity
    'Ship Ammunition',    // New commodity
    'Scrap',              // New commodity
    'Waste'               // New commodity
  ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to the top of the page on load
    window.scrollTo(0, 0); // Scroll to the top

  // Load history table on page load
  updateHistoryTable();

  // Add event listener for Enter key on amount input
  const amountInput = document.getElementById('amount');
  
  amountInput.addEventListener('keypress', function(e) {
    // Check if the pressed key is Enter
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      
      // Trigger the Add Entry button click
      document.getElementById('addEntryBtn').click();
    }
  });

  // Add event listener for drop-off point selection
  const dropOffPointSelect = document.getElementById('dropOffPoint');
  dropOffPointSelect.addEventListener('change', () => {
    console.log('Drop-off point selected:', dropOffPointSelect.value); // Debugging line
    // Focus on the amount input when a drop-off point is selected
    amountInput.focus();
    // Select all the text in the amount input
    amountInput.select();
  });

  // Add event listener for commodity selection
  const commoditySelect = document.getElementById('commodity');
  commoditySelect.addEventListener('change', () => {
    // Focus on the amount input when a commodity is selected
    amountInput.focus();
  });

  populateMoons();

  const colorPicker = document.getElementById('accentColor');
  
  // Load saved color preference
  const savedColor = localStorage.getItem('primaryColor') || '#4CAF50';
  colorPicker.value = savedColor;
  updatePrimaryColor(savedColor);
  
  // Add change event listener for real-time updates
  colorPicker.addEventListener('input', (e) => {
    updatePrimaryColor(e.target.value);
  });
  
  // Add change event listener for final value
  colorPicker.addEventListener('change', (e) => {
    updatePrimaryColor(e.target.value);
  });

    initializeEventListeners();

    // Function to populate the Quick Lookup dropdown
    function populateQuickLookup() {
        const quickLookupSelect = document.getElementById('quickLookup');
        const startingLocationSelect = document.getElementById('startingLocation');
        quickLookupSelect.innerHTML = ''; // Clear previous options
        startingLocationSelect.innerHTML = ''; // Clear previous options

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select an option';
        quickLookupSelect.appendChild(defaultOption);

        const defaultStartingOption = document.createElement('option');
        defaultStartingOption.value = '';
        defaultStartingOption.textContent = 'Select a starting location';
        startingLocationSelect.appendChild(defaultStartingOption);

        // Populate with station locations
        const stationGroup = document.createElement('optgroup');
        stationGroup.label = 'Stations';
        Object.keys(data.station).forEach(station => {
            const option = document.createElement('option');
            option.value = `station|${station}`;
            option.textContent = station; // Use station name as the display text
            stationGroup.appendChild(option);
        });
        quickLookupSelect.appendChild(stationGroup);

        // Populate with all drop-off points under a single "Planets" category
        const planetGroup = document.createElement('optgroup');
        planetGroup.label = 'Planets'; // Generalized label for all planets
        Object.keys(data.planet).forEach(planet => {
            data.planet[planet].forEach(dropOffPoint => {
                const option = document.createElement('option');
                option.value = `planet|${planet}|${dropOffPoint}`;
                option.textContent = dropOffPoint; // Use drop-off point as the display text
                planetGroup.appendChild(option);
            });
        });
        quickLookupSelect.appendChild(planetGroup);

        // Populate with moon locations under a generalized label
        Object.keys(data.moon).forEach(planet => {
            const moonGroup = document.createElement('optgroup');
            moonGroup.label = `${planet} Moons`; // Generalized label for all moons under the planet
            Object.keys(data.moon[planet]).forEach(moon => {
                data.moon[planet][moon].forEach(dropOffPoint => {
                    const option = document.createElement('option');
                    option.value = `moon|${planet}|${moon}|${dropOffPoint}`;
                    option.textContent = dropOffPoint; // Use drop-off point as the display text
                    moonGroup.appendChild(option);
                });
            });
            quickLookupSelect.appendChild(moonGroup);
        });
    }

    // Call the function to populate the Quick Lookup dropdown on page load
    populateQuickLookup();

    // Function to handle Quick Lookup selection
    function handleQuickLookupSelection() {
        const quickLookupSelect = document.getElementById('quickLookup');
        const quickLookupSearch = document.getElementById('quickLookupSearch'); // Reference to the search box
        const locationTypeSelect = document.getElementById('locationType');
        const locationSelect = document.getElementById('location');
        const moonSelect = document.getElementById('moon');
        const dropOffPointSelect = document.getElementById('dropOffPoint');

        // Function to filter options based on search input
        quickLookupSearch.addEventListener('input', () => {
            const searchValue = quickLookupSearch.value.toLowerCase();
            const options = quickLookupSelect.querySelectorAll('option');

            // Show the dropdown
            quickLookupSelect.style.display = 'block';

            options.forEach(option => {
                const isVisible = option.textContent.toLowerCase().includes(searchValue);
                option.style.display = isVisible ? 'block' : 'none';
            });

            // Always keep dropdown open
            quickLookupSelect.style.display = 'block'; // Keep dropdown open regardless of visible options
        });

        quickLookupSelect.addEventListener('change', () => {
            const selectedValue = quickLookupSelect.value;
            if (!selectedValue) return;

            const [type, planet, moonOrDropOffPoint, dropOffPoint] = selectedValue.split('|');

            // Clear the search input when an option is selected
            quickLookupSearch.value = ''; // Clear the search bar

            if (type === 'station') {
                locationTypeSelect.value = 'station';
                locationSelect.innerHTML = ''; // Clear existing options
                Object.keys(data.station).forEach(station => {
                    const option = document.createElement('option');
                    option.value = station;
                    option.textContent = station;
                    locationSelect.appendChild(option);
                });
                locationSelect.value = planet; // Set location to the selected station
                moonSelect.value = '';
                dropOffPointSelect.value = dropOffPoint;
            } else if (type === 'planet') {
                locationTypeSelect.value = 'planet';
                locationSelect.innerHTML = ''; // Clear existing options
                Object.keys(data.planet).forEach(planetName => {
                    const option = document.createElement('option');
                    option.value = planetName;
                    option.textContent = planetName;
                    locationSelect.appendChild(option);
                });
                locationSelect.value = planet; // Set location to the selected planet
                moonSelect.innerHTML = `<option value="">-- Select Moon --</option>`;
                dropOffPointSelect.innerHTML = '';
                const option = document.createElement('option');
                option.value = moonOrDropOffPoint;
                option.textContent = moonOrDropOffPoint;
                dropOffPointSelect.appendChild(option);
            } else if (type === 'moon') {
                locationTypeSelect.value = 'planet';
                locationSelect.innerHTML = ''; // Clear existing options
                Object.keys(data.planet).forEach(planetName => {
                    const option = document.createElement('option');
                    option.value = planetName;
                    option.textContent = planetName;
                    locationSelect.appendChild(option);
                });
                locationSelect.value = planet; // Set location to the selected planet
                moonSelect.innerHTML = ''; // Clear existing options

                // Only show the selected moon in the dropdown
                const option = document.createElement('option');
                option.value = moonOrDropOffPoint; // Use the selected moon
                option.textContent = moonOrDropOffPoint; // Display the selected moon
                moonSelect.appendChild(option);

                dropOffPointSelect.innerHTML = '';
                const dropOffOption = document.createElement('option');
                dropOffOption.value = dropOffPoint;
                dropOffOption.textContent = dropOffPoint;
                dropOffPointSelect.appendChild(dropOffOption);
            }

            // Focus on the amount input when a Quick Lookup option is selected
            setTimeout(() => {
                amountInput.focus();
            }, 100); // Add a delay to ensure the focus is set
        });

        // Add event listener to reset Quick Lookup when a location is selected
        locationSelect.addEventListener('change', () => {
            quickLookupSelect.value = ''; // Reset Quick Lookup selection
            quickLookupSearch.value = ''; // Clear the search input
        });

        // Add event listener for location type change
        locationTypeSelect.addEventListener('change', () => {
            if (locationTypeSelect.value === 'planet') {
                // Logic to handle when location type changes to planet
                // You can add any additional logic here if needed
            }
        });
    }

    // Call the function to initialize the Quick Lookup functionality
    handleQuickLookupSelection();

    // Function to populate locations based on type
    function populateLocations() {
        const selectedType = locationTypeSelect.value;
        const moonGroup = document.querySelector('.form-group:nth-child(3)'); // Moon dropdown
        const dropOffGroup = document.querySelector('.form-group:nth-child(4)'); // Drop-off point dropdown
        
        // Clear existing options
        locationSelect.innerHTML = '';

        // Add default option with appropriate text
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = selectedType === 'station' ? '-- Select Station --' : '-- Select Planet --';
        defaultOption.disabled = true; // Make default option unclickable
        defaultOption.selected = true; // Set as selected
        locationSelect.appendChild(defaultOption);
        
        // Show/hide moon and drop-off point based on location type
        if (selectedType === 'station') {
            moonGroup.style.display = 'none';
            dropOffGroup.style.display = 'none';
            
            // Add original stations
            const originalStations = [
                { value: 'Port Olisar', text: 'Port Olisar' },
                { value: 'Port Tressler', text: 'Port Tressler' },
                { value: 'Grim HEX', text: 'Grim HEX' },
                { value: 'Everus Harbor', text: 'Everus Harbor' }
            ];

            originalStations.forEach(station => {
                const option = document.createElement('option');
                option.value = station.value;
                option.textContent = station.text;
                locationSelect.appendChild(option);
            });

            // Add Lagrange stations
            const lagrangeStations = [
                { value: 'ARC-L1', text: 'ARC-L1 Wide Forest Station' },
                { value: 'CRU-L1', text: 'CRU-L1 Ambitious Dream Station' },
                { value: 'CRU-L4', text: 'CRU-L4 Shallow Fields Station' },
                { value: 'CRU-L5', text: 'CRU-L5 Beautiful Glen Station' },
                { value: 'HUR-L1', text: 'HUR-L1 Green Glade Station' },
                { value: 'HUR-L2', text: 'HUR-L2 Faithful Dream Station' },
                { value: 'HUR-L3', text: 'HUR-L3 Thundering Express Station' },
                { value: 'HUR-L4', text: 'HUR-L4 Melodic Fields Station' },
                { value: 'HUR-L5', text: 'HUR-L5 High Course Station' },
                { value: 'MIC-L1', text: 'MIC-L1 Shallow Frontier Station' }
            ];

            let lastPrefix = '';

            lagrangeStations.forEach(station => {
                const prefix = station.value.substring(0, 3); // Get the first three letters

                // Add separator if the prefix has changed
                if (prefix !== lastPrefix) {
                    const separator = document.createElement('option');
                    separator.value = '';
                    separator.textContent = '------';
                    locationSelect.appendChild(separator);
                    lastPrefix = prefix; // Update the last prefix
                }

                const option = document.createElement('option');
                option.value = station.value;
                option.textContent = station.text;
                locationSelect.appendChild(option);
            });
        } else if (selectedType === 'planet') {
            moonGroup.style.display = 'flex'; // Show moon dropdown
            dropOffGroup.style.display = 'flex'; // Show drop-off point dropdown

            // Populate with planets
            const planets = Object.keys(data.planet);
            planets.forEach(planet => {
                const option = document.createElement('option');
                option.value = planet;
                option.textContent = planet;
                locationSelect.appendChild(option);
            });
        }

        // Reset the drop-off point and commodities
        populateDropOffPoints();
        populateCommodities();
    }

    // Function to populate drop-off points based on the selected location
    function populateDropOffPoints() {
        try {
            const selectedLocation = locationSelect.value;
            const selectedMoon = moonSelect.value;
            const selectedType = locationTypeSelect.value;

            // Clear existing options
            dropOffPointSelect.innerHTML = '';

            // Add default option with new text
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Select Drop-off Point --';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            dropOffPointSelect.appendChild(defaultOption);

            // Add event listener to hide the default option when interacting with the dropdown
            dropOffPointSelect.addEventListener('focus', () => {
                defaultOption.style.display = 'none'; // Hide the default option
            });

            // Case 1: Planet selected with no moon - show planet facilities
            if (selectedType === 'planet' && selectedLocation && !selectedMoon) {
                moonSelect.value = ''; // Clear the moon selection when a planet is selected
                const dropOffPoints = data.planet[selectedLocation] || [];
                
                // Check if ArcCorp is selected
                if (selectedLocation === 'ArcCorp') {
                    // Add the City option above Area 18
                    const cityOption = document.createElement('option');
                    cityOption.value = 'City';
                    cityOption.textContent = '-- City --';
                    cityOption.disabled = true; // Make City option unclickable
                    dropOffPointSelect.appendChild(cityOption); // Add City option

                    // Add Area 18 after City
                    dropOffPoints.forEach(point => {
                        if (point === 'Area 18') {
                            const option = document.createElement('option');
                            option.value = point;
                            option.textContent = point;
                            dropOffPointSelect.appendChild(option);
                        }
                    });
                }

                // Check if Crusader is selected
                if (selectedLocation === 'Crusader') {
                    // Add the City option above Orison
                    const cityOption = document.createElement('option');
                    cityOption.value = 'City';
                    cityOption.textContent = '-- City --';
                    cityOption.disabled = true; // Make City option unclickable
                    dropOffPointSelect.appendChild(cityOption); // Add City option

                    // Add Orison after City
                    dropOffPoints.forEach(point => {
                        if (point === 'Orison') {
                            const option = document.createElement('option');
                            option.value = point;
                            option.textContent = point;
                            dropOffPointSelect.appendChild(option);
                        }
                    });
                }

                // Check if Hurston is selected
                if (selectedLocation === 'Hurston') {
                    // Add the City option above Lorville
                    const cityOption = document.createElement('option');
                    cityOption.value = 'City';
                    cityOption.textContent = '-- City --';
                    cityOption.disabled = true; // Make City option unclickable
                    dropOffPointSelect.appendChild(cityOption); // Add City option

                    // Add Lorville after City
                    dropOffPoints.forEach(point => {
                        if (point === 'Lorville') {
                            const option = document.createElement('option');
                            option.value = point;
                            option.textContent = point;
                            dropOffPointSelect.appendChild(option);
                        }
                    });

                    // Add the unclickable Distribution Centers option below Lorville
                    const distributionCentersOption = document.createElement('option');
                    distributionCentersOption.value = 'Distribution Centers';
                    distributionCentersOption.textContent = '-- Distribution Centers --';
                    distributionCentersOption.disabled = true; // Make Distribution Centers option unclickable
                    dropOffPointSelect.appendChild(distributionCentersOption); // Add Distribution Centers option
                }

                dropOffPoints.forEach(point => {
                    if (point !== 'Area 18' && point !== 'Orison' && point !== 'Lorville' && point !== 'Farnesway') { // Skip adding Area 18, Orison, Lorville, and Farnesway
                        const option = document.createElement('option');
                        option.value = point;
                        option.textContent = point;
                        dropOffPointSelect.appendChild(option);
                    }
                });

                // Ensure the correct drop-off point is selected
                if (dropOffPoints.length > 0) {
                    dropOffPointSelect.value = dropOffPoints[0];
                }
                return;
            }

            // Case 2: Planet and moon selected - show moon facilities
            if (selectedType === 'planet' && selectedLocation && selectedMoon) {
                // Add the moon name header if not already present
                const moonHeader = document.createElement('option');
                moonHeader.value = '';
                moonHeader.textContent = `${selectedMoon} Facilities`;
                moonHeader.disabled = true;
                dropOffPointSelect.appendChild(moonHeader);

                // Get moon facilities from data structure
                const moonFacilities = data.moon[selectedLocation][selectedMoon] || [];
                moonFacilities.forEach(facility => {
                    const option = document.createElement('option');
                    option.value = facility;
                    option.textContent = facility;
                    dropOffPointSelect.appendChild(option);
                });

                // Ensure the correct drop-off point is selected
                if (moonFacilities.length > 0) {
                    dropOffPointSelect.value = moonFacilities[0];
                }
                return; // Exit after adding moon facilities
            }

            // Case 3: Station selected
            if (selectedType === 'station') {
                const stationFacilities = data.station[selectedLocation] || [];
                stationFacilities.forEach(facility => {
                    if (facility !== 'Farnesway') { // Skip adding Farnesway
                        const option = document.createElement('option');
                        option.value = facility;
                        option.textContent = facility;
                        dropOffPointSelect.appendChild(option);
                    }
                });
                return;
            }

            // Case 4: Hurston selected - ensure Lorville is at the top
            if (selectedType === 'planet' && selectedLocation === 'Hurston') {
                const lorvilleOption = document.createElement('option');
                lorvilleOption.value = 'Lorville';
                lorvilleOption.textContent = 'Lorville';
                dropOffPointSelect.appendChild(lorvilleOption); // Add Lorville first
            }

            // Populate drop-off points for Hurston
            const dropOffPoints = data.planet[selectedLocation] || [];
            dropOffPoints.forEach(point => {
                if (point !== 'Lorville' && point !== 'Farnesway') { // Skip adding Lorville and Farnesway again
                    const option = document.createElement('option');
                    option.value = point;
                    option.textContent = point;
                    dropOffPointSelect.appendChild(option);
                }
            });

            // Ensure the correct drop-off point is selected
            if (dropOffPoints.length > 0) {
                dropOffPointSelect.value = dropOffPoints[0];
            }

            // Note: Ensure that no sorting is applied to the drop-off points
            // The order of drop-off points is maintained as defined in the data structure.

        } catch (error) {
            console.error('Error in populateDropOffPoints:', error);
            if (dropOffPointSelect) {
                dropOffPointSelect.innerHTML = '<option value="">Select a location first</option>';
            }
        }
    }

    // Initialize the page
    populateLocations();
    populateCommodities();
    updateResultTable();

    // Event listeners
    locationTypeSelect.addEventListener('change', populateLocations);
    locationSelect.addEventListener('change', () => {
        populateMoons();
        populateDropOffPoints();
    });
    addEntryBtn.addEventListener('click', addEntry);
    clearLogBtn.addEventListener('click', handleClearLog);
});

// Function to update the history table
function updateHistoryTable() {
    const historyContainer = document.getElementById('historyContainer');
    const deliveryHistory = JSON.parse(localStorage.getItem('deliveryHistory')) || [];

    // Clear the container
    historyContainer.innerHTML = '';

    if (deliveryHistory.length === 0) {
        const placeholder = document.createElement('p');
        placeholder.textContent = 'No delivery history available.';
        placeholder.style.textAlign = 'center';
        placeholder.style.color = '#555';
        historyContainer.appendChild(placeholder);
        return;
    }

    // Create a table for the history
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Table header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Date</th>
        <th>Drop-off Point</th>
        <th>Commodity</th>
        <th>Current Amount</th>
        <th>Original Amount</th>
        <th>Status</th>
    `;
    table.appendChild(headerRow);

    // Group entries by date and then by trip ID
    const groupedByDate = {};
    deliveryHistory.forEach(entry => {
        const date = entry.date; // Ensure date is stored with each entry
        if (!groupedByDate[date]) {
            groupedByDate[date] = {};
        }

        // Group by trip ID
        const tripId = entry.missionId; // Assuming missionId is the trip ID
        if (!groupedByDate[date][tripId]) {
            groupedByDate[date][tripId] = {};
        }

        Object.keys(entry.dropOffPoints).forEach(dropOffPoint => {
            entry.dropOffPoints[dropOffPoint].commodities.forEach(commodity => {
                if (!groupedByDate[date][tripId][commodity.commodity]) {
                    groupedByDate[date][tripId][commodity.commodity] = [];
                }
                groupedByDate[date][tripId][commodity.commodity].push({
                    dropOffPoint,
                    currentAmount: commodity.currentAmount,
                    originalAmount: commodity.originalAmount
                });
            });
        });
    });

    // Create sections for each date
    Object.keys(groupedByDate).forEach(date => {
        const dateSection = document.createElement('div');
        dateSection.className = 'date-section';

        // Date header
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = date;
        dateHeader.style.cursor = 'pointer';
        dateHeader.onclick = () => {
            const dateContent = dateSection.querySelector('.date-content');
            dateContent.style.display = dateContent.style.display === 'none' ? 'block' : 'none';
        };
        dateSection.appendChild(dateHeader);

        // Date content container
        const dateContent = document.createElement('div');
        dateContent.className = 'date-content';
        dateContent.style.display = 'none'; // Initially hidden

        // Add mission sections for this date
        Object.keys(groupedByDate[date]).forEach(tripId => {
            const missionSection = document.createElement('div');
            missionSection.className = 'mission-section';

            // Mission ID header
            const missionHeader = document.createElement('h4');
            missionHeader.textContent = `Trip: ${tripId}`;
            missionHeader.style.cursor = 'pointer';
            missionHeader.onclick = () => {
                const missionContent = missionSection.querySelector('.mission-content');
                missionContent.style.display = missionContent.style.display === 'none' ? 'block' : 'none';
            };
            missionSection.appendChild(missionHeader);

            // Mission content
            const missionContentDiv = document.createElement('div');
            missionContentDiv.className = 'mission-content';
            missionContentDiv.style.display = 'none'; // Initially hidden

            // Create commodities table
            const commoditiesTable = document.createElement('table');
            commoditiesTable.style.width = '100%';
            commoditiesTable.style.borderCollapse = 'collapse';

            // Display all drop-off points for this trip's commodities
            Object.keys(groupedByDate[date][tripId]).forEach(commodity => {
                // Create a collapsible header for the commodity
                const commodityHeader = document.createElement('tr');
                const commodityCell = document.createElement('td');
                commodityCell.colSpan = 5; // Span across both columns
                commodityCell.style.fontWeight = 'bold';
                commodityCell.style.cursor = 'pointer';
                commodityCell.textContent = `Commodity: ${commodity}`; // Display commodity name
                commodityCell.onclick = (event) => {
                    // Check if the click target is not one of the text boxes
                    if (event.target !== textBox1 && event.target !== textBox2) {
                        const commodityContent = commodityHeader.nextElementSibling; // Get the next row (the content)
                        commodityContent.style.display = commodityContent.style.display === 'none' ? 'table-row' : 'none';
                    }
                };
                
                // Create a text box next to the commodity header
                const textBox1 = document.createElement('input');
                textBox1.type = 'text';
                textBox1.placeholder = 'Mission Reward'; // Placeholder text for the first text box
                textBox1.style.width = '100px'; // Set a width for the first text box
                textBox1.style.marginLeft = '10px'; // Add some space between the header and the first text box

                // Add an event listener to format the input value for the first text box
                textBox1.addEventListener('input', function() {
                    // Remove any non-digit characters
                    let value = this.value.replace(/\D/g, '');
                    
                    // Format the number with commas
                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    
                    // Update the text box value
                    this.value = value;

                    // Calculate and update the Estimated Payout
                    const missionReward = parseFloat(this.value.replace(/,/g, '')) || 0; // Get the value from the Mission Reward text box

                    // Calculate Estimated Payout using total values from the total row
                    if (totalOriginalAmount > 0) {
                        const estimatedPayout = Math.floor((missionReward / totalOriginalAmount) * totalCurrentAmount); // Round down to nearest whole number
                        textBox2.value = estimatedPayout.toLocaleString(); // Update the Estimated Payout text box with formatted value
                    } else {
                        textBox2.value = ''; // Clear the Estimated Payout if original amount is zero
                    }
                });

                // Create a second text box next to the first one
                const textBox2 = document.createElement('input');
                textBox2.type = 'text';
                textBox2.placeholder = 'Estimated Payout'; // Change placeholder text to "Estimated Payout"
                textBox2.style.width = '100px'; // Set a width for the second text box
                textBox2.style.marginLeft = '10px'; // Add some space between the first and second text box

                // Add an event listener to format the input value for the second text box
                textBox2.addEventListener('input', function() {
                    // Remove any non-digit characters
                    let value = this.value.replace(/\D/g, '');
                    
                    // Format the number with commas
                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '');
                    
                    // Update the text box value
                    this.value = value;
                });

                // Append both text boxes to the commodity cell
                commodityCell.appendChild(textBox1);
                commodityCell.appendChild(textBox2);
                
                commodityHeader.appendChild(commodityCell);
                commoditiesTable.appendChild(commodityHeader);

                // Create a row for the drop-off points
                const dropOffContentRow = document.createElement('tr');
                dropOffContentRow.style.display = 'none'; // Initially hidden

                const dropOffContentCell = document.createElement('td');
                dropOffContentCell.colSpan = 5; // Span across both columns
                const dropOffTable = document.createElement('table');
                dropOffTable.style.width = '100%';
                dropOffTable.style.borderCollapse = 'collapse';

                const dropOffHeaderRow = document.createElement('tr');
                dropOffHeaderRow.innerHTML = `
                    <th style="border: 1px solid #ddd; padding: 8px;">Drop-off Point</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Current Amount</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Original Amount</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">%</th>
                `;
                dropOffTable.appendChild(dropOffHeaderRow);

                // Initialize total amounts for this commodity
                let totalCurrentAmount = 0;
                let totalOriginalAmount = 0;

                // Display all drop-off points for this commodity
                groupedByDate[date][tripId][commodity].forEach(({ dropOffPoint, currentAmount, originalAmount }) => {
                    const row = document.createElement('tr');
                    const percentage = ((currentAmount / originalAmount) * 100).toFixed(2); // Calculate percentage
                    row.innerHTML = `
                        <td style="border: 1px solid #ddd; padding: 8px;">${dropOffPoint}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${currentAmount}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${originalAmount}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; ${percentage < 55 ? 'background-color: red; color: white;' : ''}">${percentage}%</td>
                    `;
                    dropOffTable.appendChild(row);

                    // Update totals
                    totalCurrentAmount += parseFloat(currentAmount); // Ensure we are adding numbers
                    totalOriginalAmount += parseFloat(originalAmount); // Ensure we are adding numbers
                });

                // Add the total row for this commodity
                const totalRow = document.createElement('tr');
                totalRow.innerHTML = `
                    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Total</td>
                    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${totalCurrentAmount}</td>
                    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${totalOriginalAmount}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;"></td>
                `;
                dropOffTable.appendChild(totalRow);

                dropOffContentCell.appendChild(dropOffTable);
                dropOffContentRow.appendChild(dropOffContentCell);
                commoditiesTable.appendChild(dropOffContentRow);
            });

            missionContentDiv.appendChild(commoditiesTable);
            missionSection.appendChild(missionContentDiv);
            dateContent.appendChild(missionSection);
        });

        dateSection.appendChild(dateContent);
        historyContainer.appendChild(dateSection);
    });

    initializeEventListeners();
}



// Sort the arrays alphabetically
//Object.keys(data.planet).forEach(planet => data.planet[planet].sort());
//Object.keys(data.station).forEach(station => data.station[station].sort());
//data.commodities.sort()//

const locationTypeSelect = document.getElementById('locationType');
const locationSelect = document.getElementById('location');
const dropOffPointSelect = document.getElementById('dropOffPoint');
const commoditySelect = document.getElementById('commodity');
const amountInput = document.getElementById('amount');
const addEntryBtn = document.getElementById('addEntryBtn');
const clearLogBtn = document.getElementById('clearLogBtn');
const resultTable = document.getElementById('resultTable');

// Flag to track first click on Clear Log button
let clearLogClicked = false;

// Function to populate locations based on type
function populateLocations() {
    const selectedType = locationTypeSelect.value;
    const moonGroup = document.querySelector('.form-group:nth-child(3)'); // Moon dropdown
    const dropOffGroup = document.querySelector('.form-group:nth-child(4)'); // Drop-off point dropdown
    
    // Clear existing options
    locationSelect.innerHTML = '';

    // Add default option with appropriate text
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = selectedType === 'station' ? '-- Select Station --' : '-- Select Planet --';
    defaultOption.disabled = true; // Make default option unclickable
    defaultOption.selected = true; // Set as selected
    locationSelect.appendChild(defaultOption);
    
    // Show/hide moon and drop-off point based on location type
    if (selectedType === 'station') {
        moonGroup.style.display = 'none';
        dropOffGroup.style.display = 'none';
        
        // Add original stations
        const originalStations = [
            { value: 'Port Olisar', text: 'Port Olisar' },
            { value: 'Port Tressler', text: 'Port Tressler' },
            { value: 'Grim HEX', text: 'Grim HEX' },
            { value: 'Everus Harbor', text: 'Everus Harbor' }
        ];

        originalStations.forEach(station => {
            const option = document.createElement('option');
            option.value = station.value;
            option.textContent = station.text;
            locationSelect.appendChild(option);
        });

        // Add Lagrange stations
        const lagrangeStations = [
            { value: 'ARC-L1', text: 'ARC-L1 Wide Forest Station' },
            { value: 'CRU-L1', text: 'CRU-L1 Ambitious Dream Station' },
            { value: 'CRU-L4', text: 'CRU-L4 Shallow Fields Station' },
            { value: 'CRU-L5', text: 'CRU-L5 Beautiful Glen Station' },
            { value: 'HUR-L1', text: 'HUR-L1 Green Glade Station' },
            { value: 'HUR-L2', text: 'HUR-L2 Faithful Dream Station' },
            { value: 'HUR-L3', text: 'HUR-L3 Thundering Express Station' },
            { value: 'HUR-L4', text: 'HUR-L4 Melodic Fields Station' },
            { value: 'HUR-L5', text: 'HUR-L5 High Course Station' },
            { value: 'MIC-L1', text: 'MIC-L1 Shallow Frontier Station' }
        ];

        let lastPrefix = '';

        lagrangeStations.forEach(station => {
            const prefix = station.value.substring(0, 3); // Get the first three letters

            // Add separator if the prefix has changed
            if (prefix !== lastPrefix) {
                const separator = document.createElement('option');
                separator.value = '';
                separator.textContent = '------';
                locationSelect.appendChild(separator);
                lastPrefix = prefix; // Update the last prefix
            }

            const option = document.createElement('option');
            option.value = station.value;
            option.textContent = station.text;
            locationSelect.appendChild(option);
        });
    } else if (selectedType === 'planet') {
        moonGroup.style.display = 'flex'; // Show moon dropdown
        dropOffGroup.style.display = 'flex'; // Show drop-off point dropdown

        // Populate with planets
        const planets = Object.keys(data.planet);
        planets.forEach(planet => {
            const option = document.createElement('option');
            option.value = planet;
            option.textContent = planet;
            locationSelect.appendChild(option);
        });
    }

    // Reset the drop-off point and commodities
    populateDropOffPoints();
    populateCommodities();
}

// Function to populate drop-off points based on the selected location
function populateDropOffPoints() {
    try {
        const selectedLocation = locationSelect.value;
        const selectedMoon = moonSelect.value;
        const selectedType = locationTypeSelect.value;

        // Clear existing options
        dropOffPointSelect.innerHTML = '';

        // Add default option with new text
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Select Drop-off Point --';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropOffPointSelect.appendChild(defaultOption);

        // Add event listener to hide the default option when interacting with the dropdown
        dropOffPointSelect.addEventListener('focus', () => {
            defaultOption.style.display = 'none'; // Hide the default option
        });

        // Case 1: Planet selected with no moon - show planet facilities
        if (selectedType === 'planet' && selectedLocation && !selectedMoon) {
            moonSelect.value = ''; // Clear the moon selection when a planet is selected
            const dropOffPoints = data.planet[selectedLocation] || [];
            
            // Check if ArcCorp is selected
            if (selectedLocation === 'ArcCorp') {
                // Add the City option above Area 18
                const cityOption = document.createElement('option');
                cityOption.value = 'City';
                cityOption.textContent = '-- City --';
                cityOption.disabled = true; // Make City option unclickable
                dropOffPointSelect.appendChild(cityOption); // Add City option

                // Add Area 18 after City
                dropOffPoints.forEach(point => {
                    if (point === 'Area 18') {
                        const option = document.createElement('option');
                        option.value = point;
                        option.textContent = point;
                        dropOffPointSelect.appendChild(option);
                    }
                });
            }

            // Check if Crusader is selected
            if (selectedLocation === 'Crusader') {
                // Add the City option above Orison
                const cityOption = document.createElement('option');
                cityOption.value = 'City';
                cityOption.textContent = '-- City --';
                cityOption.disabled = true; // Make City option unclickable
                dropOffPointSelect.appendChild(cityOption); // Add City option

                // Add Orison after City
                dropOffPoints.forEach(point => {
                    if (point === 'Orison') {
                        const option = document.createElement('option');
                        option.value = point;
                        option.textContent = point;
                        dropOffPointSelect.appendChild(option);
                    }
                });
            }

            // Check if Hurston is selected
            if (selectedLocation === 'Hurston') {
                // Add the City option above Lorville
                const cityOption = document.createElement('option');
                cityOption.value = 'City';
                cityOption.textContent = '-- City --';
                cityOption.disabled = true; // Make City option unclickable
                dropOffPointSelect.appendChild(cityOption); // Add City option

                // Add Lorville after City
                dropOffPoints.forEach(point => {
                    if (point === 'Lorville') {
                        const option = document.createElement('option');
                        option.value = point;
                        option.textContent = point;
                        dropOffPointSelect.appendChild(option);
                    }
                });

                // Add the unclickable Distribution Centers option below Lorville
                const distributionCentersOption = document.createElement('option');
                distributionCentersOption.value = 'Distribution Centers';
                distributionCentersOption.textContent = '-- Distribution Centers --';
                distributionCentersOption.disabled = true; // Make Distribution Centers option unclickable
                dropOffPointSelect.appendChild(distributionCentersOption); // Add Distribution Centers option
            }

            dropOffPoints.forEach(point => {
                if (point !== 'Area 18' && point !== 'Orison' && point !== 'Lorville' && point !== 'Farnesway') { // Skip adding Area 18, Orison, Lorville, and Farnesway
                    const option = document.createElement('option');
                    option.value = point;
                    option.textContent = point;
                    dropOffPointSelect.appendChild(option);
                }
            });

            // Ensure the correct drop-off point is selected
            if (dropOffPoints.length > 0) {
                dropOffPointSelect.value = dropOffPoints[0];
            }
            return;
        }

        // Case 2: Planet and moon selected - show moon facilities
        if (selectedType === 'planet' && selectedLocation && selectedMoon) {
            // Add the moon name header if not already present
            const moonHeader = document.createElement('option');
            moonHeader.value = '';
            moonHeader.textContent = `${selectedMoon} Facilities`;
            moonHeader.disabled = true;
            dropOffPointSelect.appendChild(moonHeader);

            // Get moon facilities from data structure
            const moonFacilities = data.moon[selectedLocation][selectedMoon] || [];
            moonFacilities.forEach(facility => {
                const option = document.createElement('option');
                option.value = facility;
                option.textContent = facility;
                dropOffPointSelect.appendChild(option);
            });

            // Ensure the correct drop-off point is selected
            if (moonFacilities.length > 0) {
                dropOffPointSelect.value = moonFacilities[0];
            }
            return; // Exit after adding moon facilities
        }

        // Case 3: Station selected
        if (selectedType === 'station') {
            const stationFacilities = data.station[selectedLocation] || [];
            stationFacilities.forEach(facility => {
                if (facility !== 'Farnesway') { // Skip adding Farnesway
                    const option = document.createElement('option');
                    option.value = facility;
                    option.textContent = facility;
                    dropOffPointSelect.appendChild(option);
                }
            });
            return;
        }

        // Case 4: Hurston selected - ensure Lorville is at the top
        if (selectedType === 'planet' && selectedLocation === 'Hurston') {
            const lorvilleOption = document.createElement('option');
            lorvilleOption.value = 'Lorville';
            lorvilleOption.textContent = 'Lorville';
            dropOffPointSelect.appendChild(lorvilleOption); // Add Lorville first
        }

        // Populate drop-off points for Hurston
        const dropOffPoints = data.planet[selectedLocation] || [];
        dropOffPoints.forEach(point => {
            if (point !== 'Lorville' && point !== 'Farnesway') { // Skip adding Lorville and Farnesway again
                const option = document.createElement('option');
                option.value = point;
                option.textContent = point;
                dropOffPointSelect.appendChild(option);
            }
        });

        // Ensure the correct drop-off point is selected
        if (dropOffPoints.length > 0) {
            dropOffPointSelect.value = dropOffPoints[0];
        }

        // Note: Ensure that no sorting is applied to the drop-off points
        // The order of drop-off points is maintained as defined in the data structure.

    } catch (error) {
        console.error('Error in populateDropOffPoints:', error);
        if (dropOffPointSelect) {
            dropOffPointSelect.innerHTML = '<option value="">Select a location first</option>';
        }
    }
}

// Function to populate commodities
function populateCommodities() {
  commoditySelect.innerHTML = ''; // Clear previous options
  data.commodities.forEach(commodity => {
    const option = document.createElement('option');
    option.value = commodity;
    option.textContent = commodity;
    commoditySelect.appendChild(option);
  });
}

// Function to handle clearing the log
function handleClearLog() {
    if (!clearLogClicked) {
        showNotification('Click again to confirm clearing the logs.');
        clearLogClicked = true;
        return;
    }

    localStorage.removeItem('cargoEntries');
    updateResultTable(); // Keep the manifest title and re-render the table without any entries

    // Update the total cargo amount based on original amounts
    updateTotalCargo(); // Ensure the total is updated after clearing the log

    clearLogClicked = false;
    showNotification('Logs have been cleared.');
}

// Initialize the page
populateLocations();
populateCommodities();
updateResultTable();

// Event listeners
locationTypeSelect.addEventListener('change', populateLocations);
locationSelect.addEventListener('change', () => {
  populateMoons();
  populateDropOffPoints();
});
addEntryBtn.addEventListener('click', addEntry);
clearLogBtn.addEventListener('click', handleClearLog);

// Tab switching function
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = 'none';
  }

  const tabLinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove('active');
  }

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.classList.add('active');
}

// Default to Deliveries tab
document.getElementById('deliveriesTab').click();


// Delivery history

function addDeliveryToHistory(entry) {
  let deliveryHistory = JSON.parse(localStorage.getItem('deliveryHistory')) || [];

  // Add a new entry with date and time
  const now = new Date();
  const deliveryEntry = {
    ...entry,
    date: now.toISOString().split('T')[0], // Get only the date part (YYYY-MM-DD)
    time: now.toLocaleTimeString(),        // Get local time string
    missionReward: entry.missionReward // Include missionReward in the entry
  };

  deliveryHistory.push(deliveryEntry);
  localStorage.setItem('deliveryHistory', JSON.stringify(deliveryHistory));

  updateHistoryTable();
}

// Add new function to group history entries by date
function groupHistoryByDate(history) {
  return history.reduce((groups, entry) => {
    if (!groups[entry.date]) {
      groups[entry.date] = {};
    }
    if (!groups[entry.date][entry.dropOffPoint]) {
      groups[entry.date][entry.dropOffPoint] = [];
    }
    groups[entry.date][entry.dropOffPoint].push(entry);
    return groups;
  }, {});
}

// Function to move delivered entries to the history table
function moveDeliveredToHistory() {
    let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];
    const deliveredEntries = cargoEntries.filter(entry => entry.status === 'Delivered');

    if (deliveredEntries.length === 0) {
        showNotification('No delivered entries to move to history.');
        return;
    }

    let historyEntries = JSON.parse(localStorage.getItem('deliveryHistory')) || [];

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Count existing missions for today only
    const todayMissionCount = historyEntries.filter(entry => {
        return entry.date === today && entry.missionId.startsWith('#');
    }).length;

    // Create mission ID with sequential number (resets each day)
    const missionNumber = todayMissionCount + 1;
    const missionId = `#${missionNumber}`;

    // Create a simple history entry with numbered mission ID and date
    const historyEntry = {
        missionId: missionId,
        date: today,
        dropOffPoints: {}
    };

    // Group delivered entries by drop-off point
    deliveredEntries.forEach(entry => {
        const dropOffPoint = entry.dropOffPoint;

        if (!historyEntry.dropOffPoints[dropOffPoint]) {
            historyEntry.dropOffPoints[dropOffPoint] = {
                commodities: []
            };
        }

        historyEntry.dropOffPoints[dropOffPoint].commodities.push({
            commodity: entry.commodity,
            currentAmount: entry.currentAmount,
            originalAmount: entry.originalAmount
        });
    });

    historyEntries.push(historyEntry);
    localStorage.setItem('deliveryHistory', JSON.stringify(historyEntries));

    cargoEntries = cargoEntries.filter(entry => entry.status !== 'Delivered');
    localStorage.setItem('cargoEntries', JSON.stringify(cargoEntries));

    updateResultTable();
    updateHistoryTable();

    // Update the total cargo amount based on original amounts
    updateTotalCargo(); // Ensure the total is updated after moving delivered entries

    showNotification(`All delivered entries have been moved to history under Mission ${missionId}`);

    // Apply colors to new history elements
    const historyElements = document.querySelectorAll(`
        .date-section h3,
        .mission-section h4,
        .drop-off-section h5
    `);
    applyCurrentColor(historyElements);
}

// Dark mode toggle with persistence
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Save preference to localStorage
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Save preference to localStorage
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Check for saved theme preference when page loads
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// Add event listeners for input boxes
document.addEventListener('click', function(e) {
  // Check if the clicked element is an input of type number
  if (e.target.matches('input[type="number"]')) {
    e.target.select(); // Select all text in the input
  }
});

// Add event listener for Enter key in input boxes
document.addEventListener('keypress', function(e) {
  // Check if the pressed key is Enter
  if (e.key === 'Enter') {
    // For the amount input at the top
    if (e.target.id === 'amount') {
      e.preventDefault();
      addEntry();
    }
    // For update amount inputs in the table
    else if (e.target.matches('table input[type="number"]')) {
      e.preventDefault();
      const id = e.target.id.replace('updateAmount_', '');
      updateCargo(id);
    }
  }
});

// Update the updateCargo function to work with both button clicks and Enter key
async function updateCargo(id) {
  const newAmount = document.getElementById(`updateAmount_${id}`).value;
  let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];

  // Find the entry to get the original amount
  const entry = cargoEntries.find(entry => entry.id === id);
  if (!entry) return;

  // Validate the new amount
  if (!newAmount || isNaN(newAmount) || newAmount <= 0) {
    showNotification('Please enter a valid amount.');
    return;
  }

  // Check if new amount exceeds original amount
  if (parseInt(newAmount) > parseInt(entry.originalAmount)) {
    showNotification(`Amount cannot exceed original amount of ${entry.originalAmount}`);
    document.getElementById(`updateAmount_${id}`).value = entry.currentAmount;
    return;
  }

  // Update the current amount
  cargoEntries = cargoEntries.map(entry => {
    if (entry.id === id) {
      entry.currentAmount = parseInt(newAmount);
    }
    return entry;
  });

  // Save updated entries to local storage
  localStorage.setItem('cargoEntries', JSON.stringify(cargoEntries));

  // Update the table
  updateResultTable();
}

// Add this new function to handle button clicks
async function updateCargoClick(id) {
  await updateCargo(id);
}

// Function to populate moons
function populateMoons() {
    const selectedLocation = locationSelect.value;
    const selectedType = locationTypeSelect.value;

    // Clear existing options
    moonSelect.innerHTML = '';

    // Add default option as the first option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select Moon --'; // Default text
    defaultOption.disabled = true; // Make it unclickable
    defaultOption.selected = true; // Set it as selected
    moonSelect.appendChild(defaultOption); // Append to the moon select

    if (selectedType === 'planet' && selectedLocation) {
        const moons = Object.keys(data.moon[selectedLocation]);
        moons.forEach(moon => {
            const option = document.createElement('option');
            option.value = moon;
            option.textContent = moon;
            moonSelect.appendChild(option);
        });
    }
}

// Make sure we have the moon select element
const moonSelect = document.getElementById('moon');

// Call populateMoons initially
document.addEventListener('DOMContentLoaded', () => {
  populateMoons();
});

locationSelect.addEventListener('change', () => {
  populateMoons();
  populateDropOffPoints();
});

moonSelect.addEventListener('change', populateDropOffPoints);

function populateLocationTypes() {
  const locationTypeSelect = document.getElementById('locationTypeSelect');
  const locationTypes = ['planet', 'station']; // Add other types if necessary

  locationTypeSelect.innerHTML = ''; // Clear previous options
  locationTypes.sort(); // Sort the options alphabetically

  locationTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize the first letter
    locationTypeSelect.appendChild(option);
  });
}

// Event listener for location type selection
locationTypeSelect.addEventListener('change', () => {
  // Clear the moon dropdown
  moonSelect.innerHTML = ''; // Clear previous options

  // Add a blank option as the default
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a Moon'; // You can customize this text
  defaultOption.disabled = true; // Disable the default option
  defaultOption.selected = true; // Set it as the selected option
  moonSelect.appendChild(defaultOption);

  // Populate moons based on the selected location type
  if (locationTypeSelect.value === 'planet') {
    populateMoons(); // Call your function to populate moons
  }
});

// Function to delete the delivery history
function deleteHistory() {
    // Remove delivery history from local storage
    localStorage.removeItem('deliveryHistory');
    
    // Update the history table to reflect the cleared history
    updateHistoryTable(); // Call the function to refresh the history display
    
    // Show a notification to the user
    showNotification('Delivery history has been deleted.');
}

// Add event listener for the Delete History button
document.getElementById('deleteHistoryBtn').addEventListener('click', () => {
    console.log('Delete History button clicked'); // Debugging line
    deleteHistory();
});

// Example function to handle adding the entry
function handleAddButtonClick() {
  const dropOffPoint = dropOffPointSelect.value; // Get the selected drop-off point
  if (dropOffPoint) {
    addEntryToTable(dropOffPoint); // Call the function to add the entry to the table
  } else {
    alert('Please select a drop-off point.'); // Alert if no drop-off point is selected
  }
}

// Function to clear the log
function clearLog() {
  const table = document.getElementById('yourTableId'); // Replace with your actual table ID
  while (table.rows.length > 0) {
    table.deleteRow(0); // Remove all rows from the table
  }
}

// Event listener for the Clear Log button
const clearLogButton = document.getElementById('clearLogButton'); // Replace with your actual button ID
clearLogButton.addEventListener('click', () => {
  clearLog(); // Call the clear log function
});

// Assuming you have a function that sets up the drop-off points
function setupDropOffPoints() {
  const container = document.getElementById('dropOffContainer'); // Replace with your actual container ID

  // Create and append the Mission label
  const missionLabel = document.createElement('h3');
  missionLabel.textContent = 'Mission';
  container.appendChild(missionLabel);

  // Create and append the Drop-off Points label
  const dropOffLabel = document.createElement('h3');
  dropOffLabel.textContent = 'Drop-off Points';
  container.appendChild(dropOffLabel);

  // Create and append the drop-off points select element
  const dropOffPointSelect = document.createElement('select');
  dropOffPointSelect.id = 'dropOffPointSelect';
  container.appendChild(dropOffPointSelect);

  // Populate drop-off points as needed
}

// Function to set up the history tab
function setupHistoryTab() {
  const historyTab = document.getElementById('historyTab');
  historyTab.innerHTML = ''; // Clear existing content

  // Create and append labels
  createLabel(historyTab, 'Trip', 'h3');
  createLabel(historyTab, 'Details', 'h4');
  createLabel(historyTab, 'Missions', 'h4');

  // Create and append the history table
  const table = createTable(['Commodity', 'Drop-off Point', 'Amount', 'Actions']);
  historyTab.appendChild(table);
}

// Helper function to create and append labels with smaller font size
function createLabel(container, text, tag) {
  const label = document.createElement(tag);
  label.textContent = text;
  label.style.fontSize = '12px'; // Set the font size to a smaller size
  container.appendChild(label);
}

// Helper function to create a table with headers
function createTable(headers) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);
  table.id = 'historyTable'; // Set the ID for the table

  return table;
}

// Function to add an entry to the history
function addEntryToHistory(commodityName, dropOffPoint, amount) {
  const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0]; // Get the tbody of the history table
  const row = historyTable.insertRow(); // Create a new row for the history entry

  // Create a cell for the commodity name
  const commodityCell = row.insertCell(0);
  commodityCell.textContent = commodityName.toLowerCase(); // Set the commodity name in lowercase

  // Create a cell for the drop-off point
  const dropOffPointCell = row.insertCell(1);
  dropOffPointCell.textContent = dropOffPoint; // Set the drop-off point

  // Create a cell for the amount
  const amountCell = row.insertCell(2);
  amountCell.textContent = amount; // Set the amount

  // Create a cell for the text box next to the commodity ID
  const textBoxCell = row.insertCell(3);
  const textBox = document.createElement('input');
  textBox.type = 'text';
  textBox.placeholder = 'Mission Reward'; // Change placeholder text to "Mission Reward"
  textBox.style.width = '100px'; // Set a width for the text box
  textBox.style.marginLeft = '10px'; // Add some space between the header and the text box

  // Add an event listener to format the input value
  textBox.addEventListener('input', function() {
    // Remove any non-digit characters
    let value = this.value.replace(/\D/g, '');
    
    // Format the number with commas
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Update the text box value
    this.value = value;

    // Calculate and update the Estimated Payout
    const missionReward = parseFloat(this.value.replace(/,/g, '')) || 0; // Get the value from the Mission Reward text box

    // Calculate Estimated Payout using total values from the total row
    if (totalOriginalAmount > 0) {
        const estimatedPayout = Math.floor((missionReward / totalOriginalAmount) * totalCurrentAmount); // Round down to nearest whole number
        textBox2.value = estimatedPayout.toLocaleString(); // Update the Estimated Payout text box with formatted value
    } else {
        textBox2.value = ''; // Clear the Estimated Payout if original amount is zero
    }
  });

  // Append the text box to the commodity cell
  commodityCell.appendChild(textBox);
  
  commodityHeader.appendChild(commodityCell);
  commoditiesTable.appendChild(commodityHeader);

  // Create a row for the drop-off points
  const dropOffContentRow = document.createElement('tr');
  dropOffContentRow.style.display = 'none'; // Initially hidden

  const dropOffContentCell = document.createElement('td');
  dropOffContentCell.colSpan = 5; // Span across both columns
  const dropOffTable = document.createElement('table');
  dropOffTable.style.width = '100%';
  dropOffTable.style.borderCollapse = 'collapse';

  const dropOffHeaderRow = document.createElement('tr');
  dropOffHeaderRow.innerHTML = `
    <th style="border: 1px solid #ddd; padding: 8px;">Drop-off Point</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Current Amount</th>
    <th style="border: 1px solid #ddd; padding: 8px;">Original Amount</th>
    <th style="border: 1px solid #ddd; padding: 8px;">%</th>
  `;
  dropOffTable.appendChild(dropOffHeaderRow);

  // Initialize total amounts for this commodity
  let totalCurrentAmount = 0;
  let totalOriginalAmount = 0;

  // Display all drop-off points for this commodity
  groupedByDate[date][tripId][commodity].forEach(({ dropOffPoint, currentAmount, originalAmount }) => {
    const row = document.createElement('tr');
    const percentage = ((currentAmount / originalAmount) * 100).toFixed(2); // Calculate percentage
    row.innerHTML = `
      <td style="border: 1px solid #ddd; padding: 8px;">${dropOffPoint}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${currentAmount}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${originalAmount}</td>
      <td style="border: 1px solid #ddd; padding: 8px; ${percentage < 55 ? 'background-color: red; color: white;' : ''}">${percentage}%</td>
    `;
    dropOffTable.appendChild(row);

    // Update totals
    totalCurrentAmount += parseFloat(currentAmount); // Ensure we are adding numbers
    totalOriginalAmount += parseFloat(originalAmount); // Ensure we are adding numbers
  });

  // Add the total row for this commodity
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Total</td>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${totalCurrentAmount}</td>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${totalOriginalAmount}</td>
    <td style="border: 1px solid #ddd; padding: 8px;"></td>
  `;
  dropOffTable.appendChild(totalRow);

  dropOffContentCell.appendChild(dropOffTable);
  dropOffContentRow.appendChild(dropOffContentCell);
  commoditiesTable.appendChild(dropOffContentRow);
}

// Example function to handle adding an entry from the deliveries table
function handleDeliveryToHistory() {
  const commodityName = document.getElementById('commoditySelect').value; // Get the selected commodity name
  const dropOffPoint = dropOffPointSelect.value; // Get the selected drop-off point
  const amount = document.getElementById('amountInput').value; // Get the amount
  const missionRewardInput = document.getElementById('missionRewardInput'); // Get the mission reward input
  const missionReward = missionRewardInput.value; // Get the mission reward

  if (commodityName && dropOffPoint && amount) {
    const entry = {
      commodity: commodityName,
      dropOffPoint: dropOffPoint,
      currentAmount: amount,
      originalAmount: amount,
      missionReward: missionReward // Include missionReward in the entry
    };
    addEntryToHistory(entry); // Call the function to add the entry to the history

    // Save the mission reward to local storage with a unique key
    const uniqueId = `missionReward_${new Date().getTime()}`; // Create a unique ID based on timestamp
    localStorage.setItem(uniqueId, missionReward); // Save the mission reward
  } else {
    alert('Please select a commodity, drop-off point, and enter an amount.'); // Alert if any field is missing
  }
}

// Call setupHistoryTab when needed
setupHistoryTab();

// Function to update the primary color
function updatePrimaryColor(color) {
  // Store the color preference
  localStorage.setItem('primaryColor', color);
  
  // Update CSS variable
  document.documentElement.style.setProperty('--primary-color', color);
  
  // Update all elements that use the green color
  const elements = document.querySelectorAll(`
    .form-section button:not(.remove-btn):not(#clearLogBtn),
    button.action-btn:not(.remove-btn),
    .collapsible,
    .date-section h3,
    .mission-section h4,
    .drop-off-section h5,
    .reset-btn,
    input:checked + .slider,
    #addEntryBtn,
    #moveDeliveredBtn,
    .delivered,
    .action-btn.update-btn,
    .tablinks.active,
    th
  `);
  
  elements.forEach(element => {
    if (element.matches('th')) {
      element.style.backgroundColor = color;
      element.style.color = 'white';
      element.style.borderColor = adjustColor(color, -20);
    } else if (!element.matches('.remove-btn') && !element.matches('#clearLogBtn')) {
      element.style.backgroundColor = color;
    }
  });

  // Update hover states by injecting updated CSS
  const styleElement = document.getElementById('dynamic-styles') || document.createElement('style');
  if (!styleElement.id) styleElement.id = 'dynamic-styles';
  
  styleElement.textContent = `
    .form-section button:not(.remove-btn):not(#clearLogBtn):hover,
    button.action-btn:not(.remove-btn):hover,
    .collapsible:hover,
    .reset-btn:hover,
    #addEntryBtn:hover,
    #moveDeliveredBtn:hover,
    .delivered:hover,
    .action-btn.update-btn:hover {
      background-color: ${adjustColor(color, -20)}!important;
    }

    /* Force active tab color */
    .tablinks.active {
      background-color: ${color}!important;
    }

    /* Ensure inactive tabs remain gray */
    .tablinks:not(.active) {
      background-color: #333!important;
    }

    /* Keep remove button and clear log button red */
    .remove-btn, #clearLogBtn {
      background-color: #f44336!important;
    }

    .remove-btn:hover, #clearLogBtn:hover {
      background-color: #d32f2f!important;
    }

    /* Force table header styling */
    th {
      background-color: ${color}!important;
      color: white!important;
      border-color: ${adjustColor(color, -20)}!important;
    }

    /* Dark mode compatibility */
    [data-theme="dark"] th {
      background-color: ${color}!important;
      color: white!important;
      border-color: ${adjustColor(color, -20)}!important;
    }
  `;
  
  if (!styleElement.parentElement) {
    document.head.appendChild(styleElement);
  }
}

// Helper function to darken/lighten color for hover states
function adjustColor(color, amount) {
  const clamp = (val) => Math.min(Math.max(val, 0), 255);
  
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Adjust each component
  const adjustR = clamp(r + amount);
  const adjustG = clamp(g + amount);
  const adjustB = clamp(b + amount);
  
  // Convert back to hex
  const getHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${getHex(adjustR)}${getHex(adjustG)}${getHex(adjustB)}`;
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  const colorPicker = document.getElementById('accentColor');
  
  // Load saved color preference
  const savedColor = localStorage.getItem('primaryColor') || '#4CAF50';
  colorPicker.value = savedColor;
  updatePrimaryColor(savedColor);
  
  // Add change event listener for real-time updates
  colorPicker.addEventListener('input', (e) => {
    updatePrimaryColor(e.target.value);
  });
  
  // Add change event listener for final value
  colorPicker.addEventListener('change', (e) => {
    updatePrimaryColor(e.target.value);
  });

  // Populate locations and drop-off points on page load
  populateLocations();
  populateDropOffPoints();

  // Add event listener for location type change
  locationTypeSelect.addEventListener('change', () => {
      populateLocations(); // Populate locations based on the selected type
  });

  // Add event listener for location change
  locationSelect.addEventListener('change', () => {
      populateMoons(); // Populate moons based on the selected location
      populateDropOffPoints(); // Populate drop-off points based on the selected location
  });

  // Other initialization code...
  handleQuickLookupSelection();
  // ...
});

// Update the reset function
function resetToDefaultColor() {
  const defaultColor = '#4CAF50';
  document.getElementById('accentColor').value = defaultColor;
  updatePrimaryColor(defaultColor);
}

// Add this function to apply the current color to new elements
function applyCurrentColor(elements) {
  const currentColor = localStorage.getItem('primaryColor') || '#4CAF50';
  elements.forEach(element => {
    if (element.matches('th')) {
      element.style.backgroundColor = currentColor;
      element.style.color = 'white';
      element.style.borderColor = adjustColor(currentColor, -20);
    } else if (!element.matches('.remove-btn') && !element.matches('#clearLogBtn')) {
      element.style.backgroundColor = currentColor;
    }
  });
}

// Add this to check if we're in a popup window
window.addEventListener('load', () => {
    if (window.opener) {
        document.title = "SC Cargo Tracker"; // Set a shorter title for the popup
        // Hide the popout button in the popup window
        const popoutBtn = document.getElementById('popoutBtn');
        if (popoutBtn) {
            popoutBtn.style.display = 'none';
        }
    }
});

// Add this function to handle the Deliveries pop-out
function openDeliveriesPopout() {
    // Calculate the desired window size
    const width = 1024;
    const height = 800;
    
    // Calculate center position
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    // Create the features string for the new window
    const features = [
        `width=${width}`,
        `height=${height}`,
        `left=${left}`,
        `top=${top}`,
        'alwaysOnTop=yes',
        'menubar=no',
        'toolbar=no',
        'location=no',
        'status=no',
        'scrollbars=yes',
        'resizable=yes'
    ].join(',');

    // Open the new window
    const popout = window.open(
        window.location.href + '?popup=deliveries',
        'DeliveriesWindow',
        features
    );

    if (popout) {
        // Store reference to the popup window
        window.deliveriesPopup = popout;
        
        // Add event listener to check when popup is closed
        const checkPopup = setInterval(() => {
            if (popout.closed) {
                clearInterval(checkPopup);
                window.deliveriesPopup = null;
            }
        }, 1000);
    }
}

// Add this to handle the popup window setup
window.addEventListener('load', () => {
    // Check if this is a popup window
    const urlParams = new URLSearchParams(window.location.search);
    const isPopup = urlParams.get('popup');
    
    if (isPopup === 'deliveries') {
        document.body.classList.add('popup-window');
        document.title = "SC Cargo Deliveries";
    } else {
        // Add click handler for popout button
        const popoutBtn = document.getElementById('deliveriesPopoutBtn');
        if (popoutBtn) {
            popoutBtn.addEventListener('click', openDeliveriesPopout);
        }
    }
});

// Add this to ensure data stays synced between windows
function syncDataBetweenWindows() {
    if (window.deliveriesPopup && !window.deliveriesPopup.closed) {
        // Sync data to popup
        window.deliveriesPopup.postMessage('sync-data', '*');
    }
}

// Add message listener for data sync
window.addEventListener('message', (event) => {
    if (event.data === 'sync-data') {
        updateResultTable();
    }
});

// Function to update the total cargo amount based on original amounts
function updateTotalCargo() {
    const cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];
    const totalCargo = cargoEntries.reduce((total, entry) => {
        return total + parseInt(entry.originalAmount || 0); // Sum originalAmount instead of currentAmount
    }, 0);
    document.getElementById('totalCargo').value = totalCargo; // Update the total cargo text box
}

// Modify the addEntry function to update the total cargo
function addEntry() {
    const location = locationSelect.value;
    const moon = moonSelect.value;
    const dropOffPoint = locationTypeSelect.value === 'station' ? location : dropOffPointSelect.value;
    const commodity = commoditySelect.value;
    const amount = amountInput.value;
    const startingLocation = document.getElementById('startingLocation').value; // Get the selected starting location

    if (!location || !commodity || !amount) {
        showNotification('Please fill all fields');
        return;
    }

    // Add specific check for drop-off point when not in station mode
    if (locationTypeSelect.value !== 'station' && !dropOffPoint) {
        showNotification('Please select a drop-off point');
        return;
    }

    let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];
    const newEntry = {
        id: new Date().toISOString(),
        location,
        moon,
        dropOffPoint,
        commodity,
        originalAmount: amount,
        currentAmount: amount,
        status: 'Pending',
        startingLocation // Include starting location in the entry
    };

    cargoEntries.push(newEntry);
    localStorage.setItem('cargoEntries', JSON.stringify(cargoEntries));
    
    // Clear the amount input box
    amountInput.value = '';
    
    // Clear the aUEC input boxes
    const aUECInputs = document.querySelectorAll('input[type="text"]'); // Adjust selector if necessary
    aUECInputs.forEach(input => {
        input.value = ''; // Clear each aUEC input box
    });

    updateResultTable();
    updateTotalCargo(); // Update the total cargo amount based on original amounts

    // Apply colors to new buttons after table update
    const newButtons = document.querySelectorAll(
        `button.action-btn,
        .delivered,
        .action-btn.update-btn`
    );
    applyCurrentColor(newButtons);
}

// Update the updateCargo function to also update the total cargo
async function updateCargo(id) {
    const newAmount = document.getElementById(`updateAmount_${id}`).value;
    let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];

    // Find the entry to get the original amount
    const entry = cargoEntries.find(entry => entry.id === id);
    if (!entry) return;

    // Validate the new amount
    if (!newAmount || isNaN(newAmount) || newAmount <= 0) {
        showNotification('Please enter a valid amount.');
        return;
    }

    // Check if new amount exceeds original amount
    if (parseInt(newAmount) > parseInt(entry.originalAmount)) {
        showNotification(`Amount cannot exceed original amount of ${entry.originalAmount}`);
        document.getElementById(`updateAmount_${id}`).value = entry.currentAmount;
        return;
    }

    // Update the current amount
    cargoEntries = cargoEntries.map(entry => {
        if (entry.id === id) {
            entry.currentAmount = parseInt(newAmount);
        }
        return entry;
    });

    // Save updated entries to local storage
    localStorage.setItem('cargoEntries', JSON.stringify(cargoEntries));

    // Update the table
    updateResultTable();
    updateTotalCargo(); // Update the total cargo amount based on original amounts
}

// Update the result table to reflect the latest cargo entries
function updateResultTable() {
    let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];

    // Clear the table first but keep the title
    const manifestTitle = document.getElementById('cargoManifestTitle');
    const table = document.createElement('table');

    // Table header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Drop-off Point</th>
        <th>Commodity</th>
        <th>Amount Delivered</th>
        <th>Actions</th>
        <th>Status</th>
    `;
    table.appendChild(headerRow);

    // Group entries by drop-off point
    const groupedEntries = groupByDropOffPoint(cargoEntries);

    Object.keys(groupedEntries).forEach(dropOffPoint => {
        const entries = groupedEntries[dropOffPoint];
        const firstEntry = entries[0];
        
        // Format location string
        const locationInfo = firstEntry.moon 
            ? ` (${firstEntry.location} - ${firstEntry.moon})`
            : ` (${firstEntry.location})`;

        // Create a new row for the drop-off point
        const dropOffRow = document.createElement('tr');
        dropOffRow.classList.add('drop-off-header');
        
        // Create the button with consistent text
        dropOffRow.innerHTML = `
            <td colspan="4" style="font-weight: bold; cursor: pointer;">
                ${dropOffPoint}<span style="font-size: 0.6em; color: #999;">${locationInfo}</span>
            </td>
            <td>
                <button class="action-btn" onclick="markDelivered('${dropOffPoint}')">Cargo Delivered</button>
            </td>
        `;
        table.appendChild(dropOffRow);

        // Create container for commodity rows
        const commodityRows = document.createElement('tbody');
        commodityRows.classList.add('commodity-rows');
        commodityRows.setAttribute('data-drop-off', dropOffPoint); // Set data attribute for identification
        
        // Add each commodity for the current drop-off point as individual rows
        entries.forEach(({ id, commodity, originalAmount, currentAmount, status, startingLocation }) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span style="font-size: 0.5em;">Pickup from: ${startingLocation}</span></td> <!-- Add "Pickup from:" and reduce size -->
                <td>${commodity}</td>
                <td>${currentAmount}/${originalAmount}</td>
                <td class="action-cell">
                    <input type="number" id="updateAmount_${id}" value="${currentAmount}" />
                    <button class="action-btn update-btn" onclick="updateCargoClick('${id}')">Update Cargo</button>
                    <button class="action-btn remove-btn" onclick="removeCargo('${id}')">Remove Cargo</button>
                </td>
                <td>${status}</td>
            `;
            commodityRows.appendChild(row);
        });

        table.appendChild(commodityRows);
        // Add click event to toggle visibility
        dropOffRow.querySelector('td').addEventListener('click', () => {
            const isExpanded = commodityRows.style.display !== 'none';
            commodityRows.style.display = isExpanded ? 'none' : '';
            dropOffRow.querySelector('td').setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Append the table to the result section
    resultTable.innerHTML = ''; // Clear existing table
    resultTable.appendChild(table);
}

// Function to group entries by drop-off point
function groupByDropOffPoint(entries) {
  return entries.reduce((groups, entry) => {
    if (!groups[entry.dropOffPoint]) {
      groups[entry.dropOffPoint] = [];
    }
    groups[entry.dropOffPoint].push(entry);
    return groups;
  }, {});
}

// Function to remove cargo entry by unique ID
function removeCargo(id) {
    let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];

    // Filter out the cargo entry with the matching ID
    cargoEntries = cargoEntries.filter(entry => entry.id !== id);

    // Save updated cargo entries back to local storage
    localStorage.setItem('cargoEntries', JSON.stringify(cargoEntries));

    // Update the table to reflect the removal
    updateResultTable();

    // Update the total cargo amount based on original amounts
    updateTotalCargo(); // Ensure the total is updated after removal
}

// Function to mark all cargo under a drop-off point as delivered
function markDelivered(dropOffPoint) {
  let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];
  let updated = false;

  // Normalize the drop-off point for comparison
  const normalizedTarget = dropOffPoint.toLowerCase().trim();

  // Update the status of all entries with the specified drop-off point
  cargoEntries = cargoEntries.map(entry => {
    const normalizedEntry = entry.dropOffPoint.toLowerCase().trim();

    if (normalizedEntry === normalizedTarget) {
      updated = true;
      return {
        ...entry,
        status: 'Delivered'
      };
    }
    return entry;
  });

  // Save updated cargo entries back to local storage
  localStorage.setItem('cargoEntries', JSON.stringify(cargoEntries));

  // Update only the relevant rows in the result table
  const rowsToUpdate = document.querySelectorAll(`.commodity-rows[data-drop-off="${dropOffPoint}"] tr`);
  rowsToUpdate.forEach(row => {
    const statusCell = row.querySelector('td:last-child'); // Assuming status is in the last cell
    if (statusCell) {
      statusCell.textContent = 'Delivered'; // Update the status cell
      statusCell.style.color = 'green'; // Optional: Change text color to green
    }
  });

  // Clear the corresponding aUEC input boxes for each commodity
  const commodities = Object.keys(cargoEntries).filter(entry => entry.dropOffPoint === dropOffPoint);
  commodities.forEach(commodity => {
    const aUECInput = document.querySelector(`input[type="text"][data-commodity="${commodity}"]`); // Adjust selector if necessary
    if (aUECInput) {
      aUECInput.value = ''; // Clear the input box
    }
  });

  // Show notification of successful status change
  if (updated) {
    showNotification(`Cargo for ${dropOffPoint} marked as delivered`);
  } else {
    showNotification('No matching entries found to mark as delivered');
  }

  // Collapse the specific cargo entry group
  const cargoRows = document.querySelectorAll(`.commodity-rows[data-drop-off="${dropOffPoint}"]`);
  cargoRows.forEach(row => {
    const isExpanded = row.style.display !== 'none';
    // Only collapse if it is currently expanded
    if (isExpanded) {
      row.style.display = 'none'; // Collapse the row
    }
  });
}

// Function to update the current amount for a cargo entry
function updateCargo(id) {
  const newAmount = document.getElementById(`updateAmount_${id}`).value;
  let cargoEntries = JSON.parse(localStorage.getItem('cargoEntries')) || [];
  
  // Find the entry to get the original amount
  const entry = cargoEntries.find(entry => entry.id === id);
  if (!entry) return;

  // Validate the new amount
  if (!newAmount || isNaN(newAmount) || newAmount <= 0) {
    showNotification('Please enter a valid amount.');
    return;
  }

  // Check if new amount exceeds original amount
  if (parseInt(newAmount) > parseInt(entry.originalAmount)) {
    showNotification(`Amount cannot exceed original amount of ${entry.originalAmount}`);
    document.getElementById(`updateAmount_${id}`).value = entry.currentAmount;
    return;
  }

  // Update the current amount
  cargoEntries = cargoEntries.map(entry => {
    if (entry.id === id) {
      entry.currentAmount = parseInt(newAmount);
    }
    return entry;
  });

  // Save updated entries to local storage
  localStorage.setItem('cargoEntries', JSON.stringify(cargoEntries));

  // Update the table
  updateResultTable();
}

// Add this function to handle notifications
function showNotification(message, duration = 5000) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      notification.style.display = 'none';
      notification.style.animation = 'slideIn 0.3s ease-out';
    }, 300);
  }, duration);
}

// Add event listeners for input boxes
document.addEventListener('click', function(e) {
  // Check if the clicked element is an input of type number
  if (e.target.matches('input[type="number"]')) {
    e.target.select(); // Select all text in the input
  }
});

// Add event listener for Enter key in input boxes
document.addEventListener('keypress', function(e) {
  // Check if the pressed key is Enter
  if (e.key === 'Enter') {
    // For the amount input at the top
    if (e.target.id === 'amount') {
      e.preventDefault();
      addEntry();
    }
    // For update amount inputs in the table
    else if (e.target.matches('table input[type="number"]')) {
      e.preventDefault();
      const id = e.target.id.replace('updateAmount_', '');
      updateCargo(id);
    }
  }
});

// Add window mode toggle functionality
const { ipcRenderer } = require('electron');

document.getElementById('windowModeToggle').addEventListener('click', () => {
    ipcRenderer.send('toggle-window-mode');
    document.body.classList.toggle('borderless');
});

// Function to initialize event listeners
function initializeEventListeners() {
    const tabs = document.querySelectorAll('.tab'); // Adjust the selector based on your HTML structure

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Optional: adds a smooth scrolling effect
                });
            });
        });
}

// Call this function after your DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const locationTypeSelect = document.getElementById('locationType');
    
    // Set default value for Location Type to Planet
    locationTypeSelect.value = 'planet'; // Set default to Planet

    // Other initialization code...
    handleQuickLookupSelection();
    // ...
});

// Function to clear the history
function clearHistory() {
    // Clear the delivery history from local storage
    localStorage.removeItem('deliveryHistory');
    
    // Clear the cargo entries from local storage
    localStorage.removeItem('cargoEntries');

    // Remove all aUEC input boxes from local storage
    const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith('aUECValue_'));
    
    console.log('Keys to remove:', keysToRemove); // Debugging line to see which keys will be removed

    keysToRemove.forEach(key => {
        localStorage.removeItem(key); // Remove each aUEC input box value
        console.log(`Removed key: ${key}`); // Debugging line to confirm removal
    });

    // Clear the aUEC input boxes in the UI
    const aUECInputs = document.querySelectorAll('input[type="text"]'); // Adjust selector if necessary
    aUECInputs.forEach(input => {
        input.value = ''; // Clear each aUEC input box
    });

    // Update the history table to reflect the cleared history
    updateHistoryTable();

    // Show notification of successful history clearance
    showNotification('History cleared successfully.');
}

// Assuming you have a button with an ID of 'deleteHistoryBtn'
document.getElementById('deleteHistoryBtn').addEventListener('click', clearHistory);

// Function to clear all aUECValue keys from local storage
function clearValues() {
    // Get all keys that start with 'aUECValue_'
    const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith('aUECValue_'));
    
    console.log('Keys to remove:', keysToRemove); // Debugging line to see which keys will be removed

    keysToRemove.forEach(key => {
        localStorage.removeItem(key); // Remove each aUEC input box value
        console.log(`Removed key: ${key}`); // Debugging line to confirm removal
    });

    // Optionally, you can show a notification
    showNotification('All aUEC values cleared successfully.');
}

// Add event listener for the Clear Values button
document.getElementById('clearValuesBtn').addEventListener('click', clearValues);

// Add event listener for commodity selection
commoditySelect.addEventListener('change', () => {
    // Focus on the amount input when a commodity is selected
    amountInput.focus();
});

// Add the total value input box after the commodity rows
const totalValueInput = document.createElement('input');
totalValueInput.type = 'text';
totalValueInput.placeholder = 'Total Value';
totalValueInput.style.marginLeft = '5px'; // Reduced spacing
totalValueInput.style.width = '80px'; // Set a fixed width for the Total Value input
totalValueInput.style.border = 'none'; // Remove the border
totalValueInput.style.borderRadius = '4px';
totalValueInput.style.padding = '2px'; // Reset padding to original value
totalValueInput.style.height = '24px'; // Set a specific height for the input
totalValueInput.style.fontSize = '15px'; // Match the font size of the input
totalValueInput.readOnly = true; // Make it read-only since it will be calculated

// Function to update the total value
function updateTotalValue() {
    let totalValue = 0;
    const aUECInputs = document.querySelectorAll('input[type="text"][placeholder="Value"]'); // Select all aUEC input boxes

    aUECInputs.forEach(input => {
        const value = parseFloat(input.value.replace(/,/g, '')) || 0; // Parse the value, default to 0 if NaN
        totalValue += value; // Add to total
    });

    totalValueInput.value = formatNumberWithCommas(totalValue.toString()); // Update the total value input
}

// Add event listener to each aUEC input to update total value on input
aUECInput.addEventListener('input', updateTotalValue);

// Call updateTotalValue initially to set the correct total
updateTotalValue();

// Function to populate the Quick Lookup dropdown
function populateQuickLookup() {
    const quickLookupSelect = document.getElementById('quickLookup');
    const startingLocationSelect = document.getElementById('startingLocation');
    quickLookupSelect.innerHTML = ''; // Clear previous options
    startingLocationSelect.innerHTML = ''; // Clear previous options

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select an option';
    quickLookupSelect.appendChild(defaultOption);

    const defaultStartingOption = document.createElement('option');
    defaultStartingOption.value = '';
    defaultStartingOption.textContent = 'Select a starting location';
    startingLocationSelect.appendChild(defaultStartingOption);

    // Populate with station locations
    const stationGroup = document.createElement('optgroup');
    stationGroup.label = 'Stations';
    Object.keys(data.station).forEach(station => {
        const option = document.createElement('option');
        option.value = `station|${station}`;
        option.textContent = station; // Use station name as the display text
        stationGroup.appendChild(option);
    });
    quickLookupSelect.appendChild(stationGroup);

    // Populate with all drop-off points under a single "Planets" category
    const planetGroup = document.createElement('optgroup');
    planetGroup.label = 'Planets'; // Generalized label for all planets
    Object.keys(data.planet).forEach(planet => {
        data.planet[planet].forEach(dropOffPoint => {
            const option = document.createElement('option');
            option.value = `planet|${planet}|${dropOffPoint}`;
            option.textContent = dropOffPoint; // Use drop-off point as the display text
            planetGroup.appendChild(option);
        });
    });
    quickLookupSelect.appendChild(planetGroup);

    // Populate with moon locations under a generalized label
    Object.keys(data.moon).forEach(planet => {
        const moonGroup = document.createElement('optgroup');
        moonGroup.label = `${planet} Moons`; // Generalized label for all moons under the planet
        Object.keys(data.moon[planet]).forEach(moon => {
            data.moon[planet][moon].forEach(dropOffPoint => {
                const option = document.createElement('option');
                option.value = `moon|${planet}|${moon}|${dropOffPoint}`;
                option.textContent = dropOffPoint; // Use drop-off point as the display text
                moonGroup.appendChild(option);
            });
        });
        quickLookupSelect.appendChild(moonGroup);
    });
}

// Call the function to populate the Quick Lookup dropdown on page load
document.addEventListener('DOMContentLoaded', () => {
    populateQuickLookup();
});

// Add this function to handle Quick Lookup selection
function handleQuickLookupSelection() {
    const quickLookupSelect = document.getElementById('quickLookup');
    const quickLookupSearch = document.getElementById('quickLookupSearch'); // Reference to the search box
    const locationTypeSelect = document.getElementById('locationType');
    const locationSelect = document.getElementById('location');
    const moonSelect = document.getElementById('moon');
    const dropOffPointSelect = document.getElementById('dropOffPoint');

    // Function to filter options based on search input
    quickLookupSearch.addEventListener('input', () => {
        const searchValue = quickLookupSearch.value.toLowerCase();
        const options = quickLookupSelect.querySelectorAll('option');

        // Show the dropdown
        quickLookupSelect.style.display = 'block';

        options.forEach(option => {
            const isVisible = option.textContent.toLowerCase().includes(searchValue);
            option.style.display = isVisible ? 'block' : 'none';
        });

        // Always keep dropdown open
        quickLookupSelect.style.display = 'block'; // Keep dropdown open regardless of visible options
    });

    quickLookupSelect.addEventListener('change', () => {
        const selectedValue = quickLookupSelect.value;
        if (!selectedValue) return;

        const [type, planet, moonOrDropOffPoint, dropOffPoint] = selectedValue.split('|');

        // Clear the search input when an option is selected
        quickLookupSearch.value = ''; // Clear the search bar

        if (type === 'station') {
            locationTypeSelect.value = 'station';
            locationSelect.innerHTML = ''; // Clear existing options
            Object.keys(data.station).forEach(station => {
                const option = document.createElement('option');
                option.value = station;
                option.textContent = station;
                locationSelect.appendChild(option);
            });
            locationSelect.value = planet; // Set location to the selected station
            moonSelect.value = '';
            dropOffPointSelect.value = dropOffPoint;
        } else if (type === 'planet') {
            locationTypeSelect.value = 'planet';
            locationSelect.innerHTML = ''; // Clear existing options
            Object.keys(data.planet).forEach(planetName => {
                const option = document.createElement('option');
                option.value = planetName;
                option.textContent = planetName;
                locationSelect.appendChild(option);
            });
            locationSelect.value = planet; // Set location to the selected planet
            moonSelect.innerHTML = `<option value="">-- Select Moon --</option>`;
            dropOffPointSelect.innerHTML = '';
            const option = document.createElement('option');
            option.value = moonOrDropOffPoint;
            option.textContent = moonOrDropOffPoint;
            dropOffPointSelect.appendChild(option);
        } else if (type === 'moon') {
            locationTypeSelect.value = 'planet';
            locationSelect.innerHTML = ''; // Clear existing options
            Object.keys(data.planet).forEach(planetName => {
                const option = document.createElement('option');
                option.value = planetName;
                option.textContent = planetName;
                locationSelect.appendChild(option);
            });
            locationSelect.value = planet; // Set location to the selected planet
            moonSelect.innerHTML = ''; // Clear existing options

            // Only show the selected moon in the dropdown
            const option = document.createElement('option');
            option.value = moonOrDropOffPoint; // Use the selected moon
            option.textContent = moonOrDropOffPoint; // Display the selected moon
            moonSelect.appendChild(option);

            dropOffPointSelect.innerHTML = '';
            const dropOffOption = document.createElement('option');
            dropOffOption.value = dropOffPoint;
            dropOffOption.textContent = dropOffPoint;
            dropOffPointSelect.appendChild(dropOffOption);
        }

        // Focus on the amount input when a Quick Lookup option is selected
        setTimeout(() => {
            amountInput.focus();
        }, 100); // Add a delay to ensure the focus is set
    });

    // Add event listener to reset Quick Lookup when a location is selected
    locationSelect.addEventListener('change', () => {
        quickLookupSelect.value = ''; // Reset Quick Lookup selection
        quickLookupSearch.value = ''; // Clear the search input
    });

    // Add event listener for location type change
    locationTypeSelect.addEventListener('change', () => {
        if (locationTypeSelect.value === 'planet') {
            // Logic to handle when location type changes to planet
            // You can add any additional logic here if needed
        }
    });
}

// Call the function to initialize the Quick Lookup functionality
handleQuickLookupSelection();

// Add this function to build the payouts table
function buildPayoutsTable(missionReward) {
    console.log('Building payouts table with reward:', missionReward); // Debugging line
    const payoutsContainer = document.getElementById('payoutsContainer');
    const payoutsTable = document.createElement('table');
    payoutsTable.innerHTML = `
        <thead>
            <tr>
                <th>Mission Reward</th>
                <th>Estimated Payout</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${missionReward}</td>
                <td>${calculateEstimatedPayout(missionReward)}</td>
            </tr>
        </tbody>
    `;
    payoutsContainer.appendChild(payoutsTable);
    console.log('Payouts table added to container.'); // Debugging line
}

// Function to calculate estimated payout (you can adjust the logic as needed)
function calculateEstimatedPayout(missionReward) {
    return (parseFloat(missionReward) * 0.8).toFixed(2); // Example calculation
}

// Function to save all mission data to local storage
function saveMissionData(missionEntries) {
    localStorage.setItem('missionData', JSON.stringify(missionEntries));
}

// Function to load mission data from local storage
function loadMissionData() {
    const missionEntries = JSON.parse(localStorage.getItem('missionData')) || [];
    missionEntries.forEach(entry => {
        addMissionEntryToTable(entry); // Add each entry to the table
    });
}

// Function to add a mission entry to the table
function addMissionEntryToTable(entry) {
    const { id, missionReward, estimatedPayout } = entry;
    const payoutsContainer = document.getElementById('payoutsContainer');
    
    const payoutsTable = document.createElement('table');
    payoutsTable.innerHTML = `
        <thead>
            <tr>
                <th>Mission Reward</th>
                <th>Estimated Payout</th>
            </tr>
        </thead>
        <tbody>
            <tr id="entry-${id}">
                <td>${missionReward}</td>
                <td>${estimatedPayout}</td>
            </tr>
        </tbody>
    `;
    payoutsContainer.appendChild(payoutsTable);
}

// Ensure you have the correct reference to the Mission Reward input
const textBox1 = document.getElementById('missionRewardInput'); // Adjust the ID as necessary
const updateButton = document.getElementById('updateMissionRewardBtn'); // Reference to the button

// Load mission data when the page is loaded
document.addEventListener('DOMContentLoaded', loadMissionData);

// Function to update the mission reward
updateButton.addEventListener('click', function() {
    const missionReward = textBox1.value.replace(/,/g, '');
    const estimatedPayout = calculateEstimatedPayout(missionReward); // Calculate estimated payout

    // Create a unique ID for this entry
    const uniqueId = new Date().getTime(); // Use timestamp as a unique ID

    // Save the entry
    const missionEntry = {
        id: uniqueId,
        missionReward: missionReward,
        estimatedPayout: estimatedPayout
    };

    // Load existing entries from local storage
    const existingEntries = JSON.parse(localStorage.getItem('missionData')) || [];
    existingEntries.push(missionEntry); // Add the new entry
    saveMissionData(existingEntries); // Save all entries back to local storage

    console.log('Mission Reward Updated:', missionReward); // Debugging line
    addMissionEntryToTable(missionEntry); // Update the payouts table
});

// Modify the existing event listener for the Mission Reward text box
textBox1.addEventListener('input', function() {
    const missionReward = this.value.replace(/,/g, '');
    const estimatedPayout = calculateEstimatedPayout(missionReward); // Calculate estimated payout

    // Update the display without saving
    const uniqueId = new Date().getTime(); // Use timestamp as a unique ID
    addMissionEntryToTable({ id: uniqueId, missionReward, estimatedPayout }); // Update the payouts table
});

// Function to create a collapsible group for payouts
function createCollapsibleGroup(date, trip, commodity) {
    const groupContainer = document.createElement('div');
    groupContainer.className = 'collapsible-group';

    // Create the header for the collapsible group
    const header = document.createElement('div');
    header.className = 'collapsible-header';
    header.textContent = `${date} - Trip: ${trip} - Commodity: ${commodity}`;
    header.onclick = function() {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    };

    // Create the content area for the collapsible group
    const content = document.createElement('div');
    content.className = 'collapsible-content';
    content.style.display = 'none'; // Initially hidden

    // Add any additional information you want to display in the content area
    const info = document.createElement('p');
    info.textContent = 'Additional information about this trip can go here.';
    content.appendChild(info);

    // Append header and content to the group container
    groupContainer.appendChild(header);
    groupContainer.appendChild(content);

    return groupContainer;
}

// Example usage: Add collapsible groups to the payouts history
function addPayoutsHistory() {
    const payoutsHistory = document.getElementById('payoutsHistory');

    // Example data (replace this with your actual data)
    const exampleData = [
        { date: '2025-01-09', trip: '#1', commodity: 'Aluminium' },
        { date: '2025-01-10', trip: '#2', commodity: 'Gold' }
    ];

    exampleData.forEach(entry => {
        const group = createCollapsibleGroup(entry.date, entry.trip, entry.commodity);
        payoutsHistory.appendChild(group);
    });
}

// Call this function to populate the payouts history on page load
document.addEventListener('DOMContentLoaded', addPayoutsHistory);

// Function to update the mission reward
function updateMissionReward() {
    const missionRewardInput = document.getElementById('uniqueMissionRewardInput'); // Ensure this ID matches your HTML

    const missionReward = missionRewardInput.value.replace(/,/g, '');

    // Debugging: Log the value before saving
    console.log('Mission Reward:', missionReward);

    // Save the mission reward to local storage
    localStorage.setItem('missionReward', missionReward);
}

// Function to load mission data from local storage
function loadMissionData() {
    const missionRewardInput = document.getElementById('uniqueMissionRewardInput'); // Ensure this ID matches your HTML

    const savedMissionReward = localStorage.getItem('missionReward');

    // Debugging: Log the saved value
    console.log('Saved Mission Reward:', savedMissionReward);

    if (savedMissionReward) {
        missionRewardInput.value = savedMissionReward; // Populate the mission reward input
    }
}

// Call loadMissionData when the page loads
document.addEventListener('DOMContentLoaded', loadMissionData);

// Add event listener for mission reward input
const missionRewardInput = document.getElementById('uniqueMissionRewardInput'); // Ensure this ID matches your HTML

// Listen for input changes to save the mission reward
missionRewardInput.addEventListener('input', updateMissionReward);

// Add event listener for Enter key in mission reward input
missionRewardInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default form submission
        updateMissionReward(); // Call the function to save the mission reward
    }
});

let missionEntryCount = 0; // Counter to keep track of mission entries

function addMissionEntry() {
    missionEntryCount++; // Increment the counter for each new entry
    const uniqueId = `missionRewardInput_${missionEntryCount}`; // Create a unique ID

    // Create a new mission entry element
    const missionEntryDiv = document.createElement('div');
    missionEntryDiv.className = 'mission-entry'; // Add a class for styling if needed

    // Create the input for mission reward
    const missionRewardInput = document.createElement('input');
    missionRewardInput.type = 'text';
    missionRewardInput.id = uniqueId; // Set the unique ID
    missionRewardInput.placeholder = 'Enter Mission Reward';

    // Append the input to the mission entry div
    missionEntryDiv.appendChild(missionRewardInput);

    // Append the mission entry div to the container (make sure to have a container in your HTML)
    document.getElementById('missionEntriesContainer').appendChild(missionEntryDiv);

    // Add event listener for input changes to save the mission reward
    missionRewardInput.addEventListener('input', function() {
        localStorage.setItem(uniqueId, missionRewardInput.value); // Save the value to local storage
    });

    // Load saved value if it exists
    const savedValue = localStorage.getItem(uniqueId);
    if (savedValue) {
        missionRewardInput.value = savedValue; // Populate the input with the saved value
    }
}

function loadMissionEntries() {
    for (let i = 1; i <= missionEntryCount; i++) {
        const uniqueId = `missionRewardInput_${i}`;
        const savedValue = localStorage.getItem(uniqueId);
        if (savedValue) {
            const missionRewardInput = document.getElementById(uniqueId);
            if (missionRewardInput) {
                missionRewardInput.value = savedValue; // Populate the input with the saved value
            }
        }
    }
}

// Call loadMissionEntries when the page loads
document.addEventListener('DOMContentLoaded', loadMissionEntries);

function moveUp(button) {
  const row = button.closest('tr'); // Get the row of the clicked button
  const previousRow = row.previousElementSibling; // Get the previous row

  if (previousRow) {
    // Move the current row before the previous row
    const cargoManifestBody = document.getElementById('cargoManifestBody');
    cargoManifestBody.insertBefore(row, previousRow);
  }
}

function moveDown(button) {
  const row = button.closest('tr'); // Get the row of the clicked button
  const nextRow = row.nextElementSibling; // Get the next row

  if (nextRow) {
    // Move the current row after the next row
    const cargoManifestBody = document.getElementById('cargoManifestBody');
    cargoManifestBody.insertBefore(nextRow, row);
  }
}

// Add event listeners to the cargo manifest body
const cargoManifestBody = document.getElementById('cargoManifestBody');
cargoManifestBody.addEventListener('dragover', allowDrop);
cargoManifestBody.addEventListener('drop', drop);

function moveUp(button) {
  const row = button.closest('tr'); // Get the row of the clicked button
  const previousRow = row.previousElementSibling; // Get the previous row

  if (previousRow) {
    // Move the current row before the previous row
    const cargoManifestBody = document.getElementById('cargoManifestBody');
    cargoManifestBody.insertBefore(row, previousRow);
  }
}

function moveDown(button) {
  const row = button.closest('tr'); // Get the row of the clicked button
  const nextRow = row.nextElementSibling; // Get the next row

  if (nextRow) {
    // Move the current row after the next row
    const cargoManifestBody = document.getElementById('cargoManifestBody');
    cargoManifestBody.insertBefore(nextRow, row);
  }
}

function markAsDelivered(button) {
  const row = button.closest('tr'); // Get the row of the clicked button
  const statusCell = row.querySelector('.status'); // Find the status cell in the row

  if (statusCell) {
    statusCell.textContent = 'Cargo Delivered'; // Update the status text
    statusCell.style.color = 'green'; // Optional: Change text color to green
  }
}

function addEntryToCargoManifest() {
    const startingLocation = document.getElementById('startingLocation').value; // Get the selected starting location
    const dropOffPoint = document.getElementById('dropOffPoint').value; // Get the selected drop-off point
    const commodity = document.getElementById('commodity').value; // Get the selected commodity
    const amount = document.getElementById('amount').value; // Get the amount

    // Check if all fields are filled
    if (!startingLocation || !dropOffPoint || !commodity || !amount) {
        alert('Please fill in all fields.');
        return;
    }

    const cargoManifestBody = document.getElementById('cargoManifestBody');

    // Create a new row for the cargo manifest
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${dropOffPoint}</td>
        <td>${startingLocation}</td> <!-- Display starting location here -->
        <td>${commodity}</td>
        <td>${amount}</td>
        <td>
            <button class="action-btn update-btn" onclick="updateCargo(this)">Update Cargo</button>
            <button class="action-btn remove-btn" onclick="removeCargo(this)">Remove Cargo</button>
            <button class="action-btn delivered-btn" onclick="markAsDelivered(this)">Cargo Delivered</button>
        </td>
        <td class="status">Pending</td>
    `;

    // Append the new row to the cargo manifest table
    cargoManifestBody.appendChild(newRow);

    // Clear the input fields after adding the entry
    document.getElementById('amount').value = '';
    document.getElementById('dropOffPoint').value = '';
    document.getElementById('commodity').value = '';
    document.getElementById('startingLocation').value = ''; // Clear starting location
}














