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
