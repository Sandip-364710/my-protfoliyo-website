$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });
    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });
    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });
    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
    // typing text animation script
    var typed = new Typed(".typing", {
        strings: [ "Developer", "frontend", "python"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    var typed = new Typed(".typing-2", {
        strings: ["Developer", "frontend", "Designer", "python"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});
let formDataArray = [];

        function submitForm() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const formData = { name, email, subject, message };
            formDataArray.push(formData);
            saveDataToLocal();
            displayFormData();
            clearForm();
        }

        function displayFormData() {
            // Display form data in the table
            const dataBody = document.getElementById('dataBody');
            dataBody.innerHTML = ''; // Clear existing rows

            formDataArray.forEach((data, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.subject}</td>
                    <td>${data.message}</td>
                    <td>
                        <button type="button" onclick="editRow(${index})">Edit</button>
                        <button type="button" onclick="deleteRow(${index})">Delete</button>
                    </td>
                `;
                dataBody.appendChild(row);
            });
        }

        function clearForm() {
            // Clear the form
            document.getElementById('contactForm').reset();
        }

        function deleteRow(index) {
            // Delete row from the array and redisplay data
            formDataArray.splice(index, 1);
            saveDataToLocal();
            displayFormData();
        }

        function editRow(index) {
            // Populate the form with data for editing
            const data = formDataArray[index];
            document.getElementById('name').value = data.name;
            document.getElementById('email').value = data.email;
            document.getElementById('subject').value = data.subject;
            document.getElementById('message').value = data.message;

            // Delete the row after populating the form
            deleteRow(index);
        }

        function saveDataToLocal() {
            // Save form data to local storage
            localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
        }

        function loadDataFromLocal() {
            // Load form data from local storage
            const storedData = localStorage.getItem('formDataArray');
            if (storedData) {
                formDataArray = JSON.parse(storedData);
                displayFormData();
            }
        }

        // Load existing data on page load
        loadDataFromLocal();