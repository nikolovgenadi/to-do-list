import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/css/style.css";
document.addEventListener("DOMContentLoaded", () => {
    let list = [];
    const saveToList = () => {
        let UserInputElement = document.getElementById("add-input");
        let userInput = UserInputElement.value.trim();
        if (userInput) {
            UserInputElement.value = "";
            let newItem = {
                text: userInput,
                id: list.length + 1,
                completed: false,
            };
            list.push(newItem);
            console.log("it worked", newItem);
            console.log(list);
            if (list.length > 0) {
                CreateListItem(newItem.id);
            }
        }
    };
    const CreateListItem = (id) => {
        const item = list.find((item) => item.id === id);
        if (item) {
            const ListContainer = document.getElementById("list-wrapper");
            const createListDiv = document.createElement("div");
            createListDiv.classList.add("form-group");
            createListDiv.setAttribute("id", `div${id}`);
            ListContainer?.appendChild(createListDiv);
            const createListDivCheck = document.createElement("div");
            createListDivCheck.classList.add("form-check");
            createListDivCheck.setAttribute("id", `div-check${id}`);
            createListDiv.appendChild(createListDivCheck);
            const createCheckForListDiv = document.createElement("input");
            createCheckForListDiv.classList.add("form-check-input");
            createCheckForListDiv.setAttribute("type", "checkbox");
            createCheckForListDiv.setAttribute("id", `check${id}`);
            createListDivCheck.appendChild(createCheckForListDiv);
            const checkbox = document.getElementById(`check${id}`);
            checkbox?.addEventListener("change", (event) => {
                if (event.target.checked) {
                    const CheckedNote = document.getElementById(`div${id}`);
                    CheckedNote?.classList.add("checked");
                }
                else {
                    const CheckedNote = document.getElementById(`div${id}`);
                    CheckedNote?.classList.remove("checked");
                }
            });
            const createListDivInput = document.createElement("input");
            createListDivInput.setAttribute("type", "text");
            createListDivInput.value = item.text;
            createListDivInput.classList.add("form-control");
            createListDivInput.setAttribute("id", `input${id}`);
            createListDiv.appendChild(createListDivInput);
            const createListBtn = document.createElement("button");
            createListBtn.setAttribute("type", "delete");
            createListBtn.setAttribute("id", `delete-btn${id}`);
            createListBtn.classList.add("btn-primary");
            createListBtn.textContent = "X";
            createListDiv.appendChild(createListBtn);
            const savedItem = JSON.stringify(item);
            localStorage.setItem(`item${id}`, savedItem);
        }
    };
    const clearListContainer = () => {
        const allDivNotes = document.querySelector(".to-do-list-wrapper");
        const allDivNotesChildren = allDivNotes?.querySelectorAll("*");
        allDivNotesChildren?.forEach((element) => element.remove());
    };
    // const UpdateListTodos = () => {
    // }
    const removeFromList = (id) => {
        const parentElementToDelete = document.getElementById("list-wrapper");
        const elementsToDelete = parentElementToDelete?.querySelectorAll(`#div${id}`);
        elementsToDelete?.forEach((element) => element.remove());
    };
    //   const removeFromList = (id) => {
    //     const parentElementToDelete = document.getElementById(`div${id}`);
    //     const elementsToDelete = parentElementToDelete?.querySelectorAll("*");
    //     elementsToDelete?.forEach((element) => element.remove());
    //   };
    const arrayItemIds = list.map((item) => item.id);
    localStorage.setItem("arrayItemIds", JSON.stringify(arrayItemIds));
    const storedIds = JSON.parse(localStorage.getItem("arrayItemIds") || "[]");
    const deleteNoteById = (id) => {
        list = list.filter((item) => item.id !== id);
        localStorage.setItem("arrayItemIds", JSON.stringify(list.map((item) => item.id)));
        console.log("deleted");
        removeFromList(id);
    };
    storedIds.forEach((id) => {
        const deleteNoteBtn = document.getElementById(`delete-btn${id}`);
        if (deleteNoteBtn) {
            deleteNoteBtn.addEventListener("click", () => deleteNoteById(id));
        }
    });
    const AddNewNoteBtn = document.getElementById("add-btn");
    AddNewNoteBtn.addEventListener("click", saveToList);
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches('[id="delete-all"]')) {
            clearListContainer();
            console.log("delete all");
        }
        else if (target.matches('[id^="delete-btn"]')) {
            const id = parseInt(target.id.replace("delete-btn", ""), 10);
            deleteNoteById(id);
        }
        ;
    });
});
