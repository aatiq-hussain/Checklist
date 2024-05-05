// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxRmtuZUJUgQd0XQqD808i6L2Dh8qRXAs",
    authDomain: "checklist-f3d09.firebaseapp.com",
    projectId: "checklist-f3d09",
    storageBucket: "checklist-f3d09.appspot.com",
    messagingSenderId: "353900328290",
    appId: "1:353900328290:web:7fb3be86c494fa1438a83b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Function to fetch document names and populate dropdown
function populateDocumentSelector() {
    const documentSelector = document.getElementById('documentSelector');
    db.collection('checklist').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = doc.data().title; // Set the text content to display document name
                documentSelector.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching documents: ", error);
        });
}


// Function to fetch and display checklist data
function displayChecklistData(documentId) {
    if (!documentId) {
        console.error("Document ID is empty or undefined!");
        return;
    }

    const checklistBody = document.getElementById('checklistBody');
    checklistBody.innerHTML = ''; // Clear existing rows

    db.collection('checklist').doc(documentId).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                if (data.rowDataArray) {
                    data.rowDataArray.forEach((row) => {
                        const newRow = document.createElement('tr');
                        newRow.innerHTML = `
                            <td>${row.id || ''}</td>
                            <td>${row.drawingNumber|| ''}</td>
                            <td>${row.title || ''}</td>
                            <td>${row.responsibility || ''}</td>
                            <td>${row.priority || ''}</td>
                            <td>${row.status || ''}</td>
                            <td>${row.remarks || ''}</td>
                            <td>${row.link || ''}</td>
                            <td>${row.dateReceived || ''}</td>
                            <td>Action</td>
                        `;
                        checklistBody.appendChild(newRow);
                    });
                } else {
                    console.error("No rowDataArray found in document data!");
                }
            } else {
                console.error("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error fetching document: ", error);
        });
}

// Function to populate dropdown options with document names from Firestore
function populateDropdownOptionsWithDocumentNames() {
    const dropdownMenu = document.getElementById('dropdownMenu');

    db.collection('checklist').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const documentName = doc.id;
                const optionElement = document.createElement('a');
                optionElement.href = '#';
                optionElement.textContent = documentName;
                optionElement.onclick = function() {
                    document.getElementById('dropdownToggle').textContent = documentName;
                    closeDropdown();
                    // Call a function to display checklist data for the selected document
                    displayChecklistData(documentName);
                };
                dropdownMenu.appendChild(optionElement);
            });
        })
        .catch((error) => {
            console.error('Error fetching document names from Firestore: ', error);
        });
}

// Call the function to populate dropdown options with document names
populateDropdownOptionsWithDocumentNames();


function populateDropdownOptionsWithOptions(optionsArray) {
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (!dropdownMenu) {
        console.error('Dropdown menu element not found.');
        return;
    }

    if (!Array.isArray(optionsArray)) {
        console.error('Invalid options array.');
        return;
    }

    optionsArray.forEach(option => {
        const optionElement = document.createElement('a');
        optionElement.href = '#';
        optionElement.textContent = option.value;
        optionElement.onclick = function() {
            document.getElementById('dropdownToggle').textContent = option.value;
            closeDropdown();
        };
        dropdownMenu.appendChild(optionElement);
    });
}

function openDropdown() {
    document.getElementById('dropdownMenu').style.display = 'block';
}

function closeDropdown() {
    document.getElementById('dropdownMenu').style.display = 'none';
}

// Example usage:


document.getElementById('dropdownToggle').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.style.display === 'block') {
        closeDropdown();
    } else {
        openDropdown();
    }
});

// Close the dropdown when clicking outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
        closeDropdown();
    }
}

// Event listener for document selector
document.getElementById('documentSelector').addEventListener('change', (event) => {
    const selectedDocumentId = event.target.value;
    displayChecklistData(selectedDocumentId);
});

// Populate document selector on page load
populateDocumentSelector();
