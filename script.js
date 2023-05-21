//work flow
//Fetch user from API
//Store those user in global array
//display user in the UI

let userList = [];

const apiEp = "https://randomuser.me/api?";
const countEle = document.getElementById("count");

const displayElm = document.getElementById("list");

const fetchUsers = async (path = "results=20") => {
  //Promise
  /* fetch(apiEp)
    .then((response) => 
      return response.json();
    })

    .then((data) => {
      userList = data.results;
      console.log(data);
    })

    .catch((error) => {
      console.log(error);
    }); */

  //async/wait

  try {
    const response = await fetch(apiEp + path);
    const data = await response.json();
    userList = data.results;
    displayUser(userList);
    console.log(data.results);
  } catch (error) {
    console.log(error);
  }
};

fetchUsers();

const displayUser = (displayArg) => {
  let str = "";

  displayArg.forEach((usr) => {
    str += `<div class="card" style="width: 18rem;">
     <img src="${usr?.picture?.large}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${usr?.name.title} ${usr?.name?.first} ${usr?.name?.last}   </h5> <br> <i class="fa-solid fa-phone"></i>  ${usr?.phone}  <br>  <i class="fa-solid fa-envelope"></i>  ${usr?.email} <br>  ${usr?.location?.street?.number} ${usr?.location?.street?.name} ${usr?.location?.city} ${usr?.location?.country}     <br> <br>
      
     </div>
   </div>
   `;
  });
  displayElm.innerHTML = str;
  countEle.innerText = displayArg.length;
};

document.getElementById("select").addEventListener("change", (e) => {
  const { value } = e.target;
  const path = `results=20&gender=` + value;
  fetchUsers(path);
});

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const { value } = e.target;

  const filteredUser = userList.filter((item) => {
    console.log(item);
    const fullName = (
      item.name.first +
      " " +
      item.name.last
    ).toLocaleLowerCase();
    return fullName.includes(value.toLocaleLowerCase());
  });

  displayUser(filteredUser);
});
