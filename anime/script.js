document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const bottomSection = document.querySelector('.bottom-section');

    // toggleBtn.addEventListener('click', function() {
    //     bottomSection.classList.toggle('collapsed');
    //     if (bottomSection.classList.contains('collapsed')) {
    //         toggleBtn.innerText = '▼';
    //     } else {
    //         toggleBtn.innerText = '▲';
    //     }
    // });

    document.addEventListener('input', function(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'input' && target.type === 'text' || target.tagName.toLowerCase() === 'textarea') {
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
        }
    });
    

    const newTaskBtn = document.getElementById('newTaskBtn');
    const newHeaderBtn = document.getElementById('newHeaderBtn');
    const checklistTable = document.getElementById('checklistTable').getElementsByTagName('tbody')[0];

    let rowIdCounter = 0; // Counter for auto incrementing row IDs

    newTaskBtn.addEventListener('click', function() {
        addNewRow();
    });

    newHeaderBtn.addEventListener('click', function() {
        addNewHeader();
    });

    checklistTable.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const row = target.closest('tr');
            if (row.classList.contains('header-row')) {
                row.remove();
            } else {
                row.remove();
                renumberRows();
            }
        }
    });

    function addNewRow() {
        rowIdCounter++;
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td style="font-weight:bolder;">${rowIdCounter}</td>
        <td><textarea placeholder="Enter drawing number" class="drawing-number"></textarea></td>
        <td><textarea placeholder="Enter title" class="title"></textarea></td>
        <td><textarea placeholder="" class="Responsibility"></textarea></td>
         <td>
            <select class="priority" style="min-width:105px;" onchange="changeStatusColor(this)">
            <option value=""  style="display:none;"> Priority</option>
                <option value="High" style=" color:white; background-color: #D50000;">High</option>
                <option value="Medium" style=" color:white; background-color: #D3B001;">Medium</option>
                <option value="Low" style="color:white;background-color:#239D01; ">Low</option>
            </select>
        </td>
        <td>
            <select class="status" style="min-width:150px;" onchange="changeStatusColor(this)">
                <option value=""  style="display:none;">Status</option>
                <option value="Not Received" style=" color:white; background-color: #D50000;">Not Received</option>
                <option value="Received" style=" color:white; background-color: #239D01;">Received</option>
                <option value="Not Applicable<"style=" color:black; ">Not Applicable</option>
            </select>
        </td>
        <td><textarea placeholder=" " class="comment"></textarea></td>
        <td><textarea placeholder="" class="link"></textarea></td>
        <td><input type="date" class="date-received"></td>
        <td><button class="delete-btn"><i class="fas fa-trash-alt"></i></button></td>
    `;
        checklistTable.appendChild(newRow);
        // Reapply delete functionality to all delete buttons after adding a new row
        applyDeleteFunctionality();
    }

    function applyDeleteFunctionality() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                if (row.classList.contains('header-row')) {
                    row.remove();
                } else {
                    row.remove();
                    renumberRows();
                }
            });
        });
    }

    function addNewHeader() {
        const newHeaderRow = document.createElement('tr');
        newHeaderRow.className = 'header-row';
        newHeaderRow.innerHTML = `<td style="font-weight:bolder;">${rowIdCounter}</td>
        <td><textarea placeholder="Enter drawing number" class="drawing-number"></textarea></td>
        <td "><textarea style="z-index: -1;position: absolute; width:2px;" placeholder="Enter title" class="title"></textarea></td>
        <td><textarea style="z-index: -1;position: absolute; width:2px;" placeholder="" class="Responsibility"></textarea></td>
         <td>
            <select style="z-index: -1;position: absolute; width:2px;" class="priority" style="min-width:105px;" onchange="changeStatusColor(this)">
            <option value=""  style="display:none;"> Priority</option>
                <option value="High" style=" color:white; background-color: #D50000;">High</option>
                <option value="Medium" style=" color:white; background-color: #D3B001;">Medium</option>
                <option value="Low" style="color:white;background-color:#239D01; ">Low</option>
            </select>
        </td>
        <td>
            <select  style="z-index: -1;position: absolute; width:2px;" class="status" style="min-width:150px;" onchange="changeStatusColor(this)">
                <option value=""  style="display:none;">Status</option>
                <option value="Not Received" style=" color:white; background-color: #D50000;">Not Received</option>
                <option value="Received" style=" color:white; background-color: #239D01;">Received</option>
                <option value="Not Applicable<"style=" color:black; ">Not Applicable</option>
            </select>
        </td>
        <td><textarea style="z-index: -1;position: absolute; width:2px;" placeholder=" " class="comment"></textarea></td>
        <td><textarea  style="z-index: -1;position: absolute; width:2px;" placeholder="" class="link"></textarea></td>
        <td><input style="z-index: -1;position: absolute; width:2px; "  type="date" class="date-received"></td>
        <td><button class="delete-btn"><i class="fas fa-trash-alt"></i></button></td>
     `;
        checklistTable.appendChild(newHeaderRow);
        saveHeaderData();
        // Reapply delete functionality to all delete buttons after adding a new header
        applyDeleteFunctionality();
    }

    function renumberRows() {
        const rows = checklistTable.querySelectorAll('tr:not(.header-row)');
        rows.forEach((row, index) => {
            row.cells[0].innerText = index + 1;
        });
    }
});

function changeStatusColor(select) {
    const selectedOption = select.options[select.selectedIndex];
    const selectedColor = selectedOption.style.backgroundColor;
    const selectColor = selectedOption.style.color;
    select.style.color=selectColor
    select.style.backgroundColor = selectedColor;
}
 // <td colspan="8" class="headertext">