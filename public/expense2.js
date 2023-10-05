

function saveToDb(event){
    event.preventDefault()
    const amount = event.target.amount.value;
    const category = event.target.category.value;
    const description = event.target.description.value;

    const userDetails ={
        amount,
        category,
        description
    }

    axios.post("http://localhost:4000/expense", userDetails)
    .then((res) => {
        console.log(res);
    })
    .catch(err => console.log(err));

    // appending userdetails in the list (display on screen)
    
}

function showUserOnScreen(userDetails){
    const parentElement = document.getElementById('items');

    const childElement = document.createElement('li');
    childElement.className = 'list-group-item';
    childElement.appendChild(document.createTextNode(`Amount-${userDetails.amount} ; Category-${userDetails.category} ; description:${userDetails.description}`));
    parentElement.appendChild(childElement);

    //adding del and edit btns

    const delbtn = document.createElement('button');
    const editBtn = document.createElement('button');

    delbtn.textContent = 'DELETE';
    editBtn.textContent = 'EDIT';

    delbtn.className = 'btn btn-danger btn-sm float-right delete';
    editBtn.className = 'btn btn-sm btn-dark float-right';

    // del btn functionality
    delbtn.onclick = () => {
        const id = userDetails.id;
        axios.delete(`http://localhost:4000/expense/${id}`)
        .then((res) => {
            parentElement.removeChild(childElement);
        })
        .catch(err => console.log(err));
        
    }

    
    
    //edit btn functionality
    editBtn.onclick = () => {
       
        parentElement.removeChild(childElement);
        document.getElementById('amount').value = userDetails.amount;
        document.getElementById('category').value = userDetails.category;
        document.getElementById('desc').value = userDetails.description;

    }
    childElement.appendChild(delbtn);
    childElement.appendChild(editBtn);
    parentElement.appendChild(childElement);

    // document.getElementById('amount').value = "";
    // document.getElementById('category').value = "Movie";
    // document.getElementById('desc').value = "";

}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:4000/expense")
    .then((res) => {
        for(var i=0;i<res.data.length;i++)
        {
            showUserOnScreen(res.data[i]);            
        }
    })
    .catch(err => console.log(err));
})