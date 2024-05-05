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

// Function to save data to Firestore
function saveDataToFirestore(documentName, data) {
    // Add a new document with the provided name to the "checklist" collection
    return db.collection("checklist").doc(documentName).set(data);
}

// Example: Save data when the "Save" button is clicked
const newSaveBtn = document.getElementById('newSaveBtn');
newSaveBtn.addEventListener('click', function() {
    const titleInput = document.querySelector('.title');
    const documentName = titleInput.value.trim(); // Trim whitespace from the input
    
    // Ensure the document name is not empty
    if (documentName === '') {
        alert('Please enter a title for the document!');
        return; // Stop further execution
    }

    const tableRows = document.querySelectorAll('#checklistTable tbody tr');
    const rowDataArray = [];

    // Include the header row if present

    // Iterate over each row
    tableRows.forEach((row) => {
        const cells = row.cells;
        const rowData = {
            id: cells[0].innerText,
            drawingNumber: cells[1].querySelector('.drawing-number').value,
            title: cells[2].querySelector('.title').value,
            responsibility: cells[3].querySelector('.Responsibility').value,
            priority: cells[4].querySelector('.priority').value,
            status: cells[5].querySelector('.status').value,
            remarks: cells[6].querySelector('.comment').value,
            link: cells[7].querySelector('.link').value,
            dateReceived: cells[8].querySelector('.date-received').value
        };
        rowDataArray.push(rowData);
    });

    // Save all row data to Firestore
    saveAllRowsToFirestore(documentName, rowDataArray);
});

// Function to save all row data to Firestore
function saveAllRowsToFirestore(documentName, rowDataArray) {
    // Save rowDataArray as a single document in Firestore
    saveDataToFirestore(documentName, { rowDataArray })
    .then(() => {
        alert('Data saved successfully!');
        console.log("Document successfully written to Firestore:", rowDataArray);
        // You can add any success handling code here
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        // You can add any error handling code here
    });
}