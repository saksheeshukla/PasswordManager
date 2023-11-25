        //HOMEWORK
        //INSTEAD OF ALERT YOU WILL HAVE TO CHANGE THE COPY BUTTON IN TO CLICK SIGN
        //BASICALLY CHANGE THE ICON


        //EDIT FUNCTIONALITY
        //CREATE ANOTHER COLUMN FOR EDIT BUTTON AND IF YOU CLICK THE EDIT BUTTON ALL IN ROW SHOULD BE EDITABLE 
        //AND CREATE ANOTHER COLUMN FOR SAVE BUTTON IT SHOULD POPULATE AGAIN

//json is a way to transfer data from one web to other*/
// Edit data

let isEditing = false;
let passwordData = []; // Initialize globally

const EditPasswordData = (index) => {
    isEditing = !isEditing;
    populateSavedPasswordDetails();   // Rerender the table
};

const SavePasswordData = (index) => {
    // Retrieve the edited values from the input fields or use the existing values if not in editing mode
    const updatedWebsite = isEditing ? document.querySelector(`.website-input-${index}`).value : passwordData[index].Website;
    const updatedUsername = isEditing ? document.querySelector(`.username-input-${index}`).value : passwordData[index].Username;
    const updatedPassword = isEditing ? document.querySelector(`.password-input-${index}`).value : passwordData[index].Password;

    // Update the data
    passwordData[index].Website = updatedWebsite;
    passwordData[index].Username = updatedUsername;
    passwordData[index].Password = updatedPassword;

    // Save the updated data to localStorage
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));

    // Toggle the editing status and rerender the table
    isEditing = false;
    populateSavedPasswordDetails();
};

const copyContent = (content, iconID) => {
    navigator.clipboard.writeText(content).then(() => {
        // Change the copy button to a check sign or another appropriate icon
        alert("Copied!");
        Change(iconID);
    }).catch(err => {
        alert("Copy failed!");
    });
}

function Change(iconID) {
    const icon = document.getElementById(iconID);
    if (icon && icon.className === "fa-regular fa-clipboard copy") {
        icon.className = "fa-solid fa-check";
    } else {
        icon.className = "fa-regular fa-clipboard copy";
    }
}

const hidePassword = (password) => {
    let hiddenPassword = "";
    for (let i = 0; i < password.length; i++) {
        hiddenPassword += "*";
    }
    return hiddenPassword;
}

const deletePasswordData = (index) => {
    let passwordDetails = localStorage.getItem("passwordDetails");
    passwordData = JSON.parse(passwordDetails); // Update the global passwordData
    passwordData.splice(index, 1);
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password data deleted successfully");
    populateSavedPasswordDetails();
}

const populateSavedPasswordDetails = () => {
    let table = document.querySelector("table");
    let passwordDetails = localStorage.getItem("passwordDetails");
    if (passwordDetails == null) {
        table.innerHTML = "No details available";
    } else {
        passwordData = JSON.parse(passwordDetails); // Update the global passwordData
        table.innerHTML = `<tr>
            <th style="background-color:lightgray">Website</th>
            <th style="background-color:lightgray">Username</th>
            <th style="background-color:lightgray">Password</th>
            <th style="background-color:lightgray">Action</th>
        </tr>`;
        let html = "";
        let color = "lightgray";

        for (let i = 0; i < passwordData.length; i++) {
            if (i % 2 == 0) {
                color = "white";
            } else {
                color = "whitesmoke";
            }
            const row = passwordData[i];
            html += `
                <tr>
                    <th style="background-color: ${color};">${isEditing ? `<input type="text" class="website-input-${i}" value="${row.Website}">` : row.Website} <i id="icon-${i}-1" onClick="copyContent('${row.Website}', 'icon-${i}-1')" class="fa-regular fa-clipboard copy"></i></th>
                    <th style="background-color: ${color};">${isEditing ? `<input type="text" class="username-input-${i}" value="${row.Username}">` : row.Username} <i id="icon-${i}-2" onClick="copyContent('${row.Username}', 'icon-${i}-2')" class="fa-regular fa-clipboard copy"></i></th>
                    <th style="background-color: ${color};">${isEditing ? `<input type="password" class="password-input-${i}" value="${row.Password}">` : hidePassword(row.Password)} <i id="icon-${i}-3" onClick="copyContent('${row.Password}', 'icon-${i}-3')" class="fa-regular fa-clipboard copy"></i></th>
                    <th style="background-color: ${color};">
                        <button class="delete-btn" onClick="deletePasswordData('${i}')">Delete</button>
                        <button class="delete-btn" onClick="EditPasswordData('${i}')">${isEditing ? 'Cancel' : 'Edit'}</button>
                        <button class="delete-btn" onClick="SavePasswordData('${i}')">Save</button>
                    </th>
                </tr>`;
        }
        table.innerHTML = table.innerHTML + html;
    }
}

// Initial rendering
populateSavedPasswordDetails();

document.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault();
    let passwordDetails = localStorage.getItem("passwordDetails");
    if (passwordDetails == null) {
        passwordData = []; // Initialize if not already
    } else {
        passwordData = JSON.parse(passwordDetails); // Update the global passwordData
    }

    passwordData.push({
        Website: Website.value,
        Username: Username.value,
        Password: Password.value
    });

    // Save the updated data to localStorage
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password details saved");

    Website.value = "";
    Username.value = "";
    Password.value = "";

    // Rerender the table with updated data
    populateSavedPasswordDetails();
});
