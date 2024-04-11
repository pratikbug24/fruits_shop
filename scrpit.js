// script.js
const fruitList = document.getElementById('fruit-list');
const cartList = document.getElementById('cart-list');
const checkoutBtn = document.getElementById('checkout-btn');

fruitList.addEventListener('click', (e) => {
    if (e.target.classList.contains('fruit')) {
        const fruitName = e.target.innerText;
        const newCartItem = document.createElement('li');
        newCartItem.textContent = fruitName;
        cartList.appendChild(newCartItem);
    }
});

checkoutBtn.addEventListener('click', () => {
    alert('Thank you for shopping with us!');
    cartList.innerHTML = '';
});

// Set your publishable key
var stripe = Stripe('YOUR_PUBLIC_KEY');

// Create an instance of Elements
var elements = stripe.elements();

// Create an instance of the card Element
var card = elements.create('card');

// Add an instance of the card Element into the `card-element` div
card.mount('#card-element');

// Handle real-time validation errors from the card Element
card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Handle form submission
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    form.querySelector('button').disabled = true;

    // Create payment token
    stripe.createToken(card).then(function(result) {
        if (result.error) {
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;

            // Enable the submit button
            form.querySelector('button').disabled = false;
        } else {
            // Send the token to your server to process the payment
            // In a real application, you would send the token to your backend server to complete the payment process
            // You'll handle the server-side part to reserve the payment and process it
            var token = result.token;
            console.log(token);

            // For demonstration purposes, you can display a success message here
            alert('Payment successful!');

            // Redirect the user to a thank you page or any other page
            window.location.href = 'thank_you.html';
        }

        function searchFunction() {
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('searchInput');
            filter = input.value.toUpperCase();
            ul = document.getElementById("searchResults");
            li = ul.getElementsByTagName('li');
          
            for (i = 0; i < li.length; i++) {
              a = li[i].getElementsByTagName("a")[0];
              txtValue = a.textContent || a.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
              } else {
                li[i].style.display = "none";
              }
            }
          }
          
    });
});

// Function to handle responsive layout adjustments
function handleResponsiveLayout() {
    // Check if the viewport width is less than or equal to 600 pixels (considered as mobile devices)
    if (window.innerWidth <= 600) {
      // Modify the header styles
      document.querySelector('header').style.padding = '10px';
      document.querySelector('header h1').style.fontSize = '1.5em';
  
      // Modify the main content styles
      document.querySelector('main').style.padding = '10px';
  
      // Modify the footer styles
      document.querySelector('footer').style.padding = '5px';
    } else {
      // Reset styles to default for larger screens
      document.querySelector('header').style.padding = '20px';
      document.querySelector('header h1').style.fontSize = '2em';
  
      document.querySelector('main').style.padding = '20px';
  
      document.querySelector('footer').style.padding = '10px';
    }
  }
  
  // Call the function initially
  handleResponsiveLayout();
  
  // Add event listener for window resize to handle changes dynamically
  window.addEventListener('resize', handleResponsiveLayout);
  