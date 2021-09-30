// variables
const courses = document.querySelector('#courses-list'),
    shoppingcartContent = document.querySelector('#cart-content tbody');
    clearcart = document.querySelector('#clear-cart')


// listeners
loadEventListeners();
// when a new 
function loadEventListeners(){
    courses.addEventListener('click', buyCourse)      
    shoppingcartContent.addEventListener('click', removeCourse)
    clearcart.addEventListener('click', clearAll)
}

// functions
function buyCourse(e){
    e.preventDefault()
    if(e.target.classList.contains('add-to-cart')){
        const course = e.target.parentElement.parentElement

        getcourseInfo(course)
    }
}

function getcourseInfo(course){
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    addintoCart(courseInfo)
   
}
 function addintoCart(course){
     const row = document.createElement('tr')
       
       row.innerHTML = `
       <tr>

       <td>
       <img src = "${course.image}" width=80>
       </td>
       <td> ${course.title}</td>
       <td>${course.price}</td>
       <td>
       <a href="#" class="remove" data-id="${course.id}">X</a>
       </td>
       
       </tr>
        `;
        shoppingcartContent.appendChild(row);
// add courses into storage

        saveintoStorage(course)
 }
//  add the courses into local Storage

 function saveintoStorage(course){
     let courses = getCoursesFromStorage();

    //  add course into the array
    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses));
 }
// get the contents from storage

 function getCoursesFromStorage(){
     let courses;

    if(localStorage.getItem('courses') == null){
        courses =[];
    }
    else{
        courses = JSON.parse(localStorage.getItem('courses'));

    }
 }

 function removeCourse(e){
     if(e.target.classList.contains('remove')){
         e.target.parentElement.parentElement.remove();
     }
 }
 function clearAll(){
     while(shoppingcartContent.firstChild){
         shoppingcartContent.removeChild(shoppingcartContent.firstChild);

     }
 }