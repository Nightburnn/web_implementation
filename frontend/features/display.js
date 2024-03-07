fetch('http://localhost:5000/api/users/dashboard', {
  method: 'GET',
  credentials: 'include', // Include cookies for authentication
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }
    return response.json();
  })
  .then(data => {
    // Handle the retrieved user information
    console.log('User information:', data);
    
    // Assuming your frontend has an element with ID "username" to display the user's name
    document.getElementById('username').textContent = data.fullName;
    
    // You can also access other user information like email if needed
    // document.getElementById('email').textContent = data.email;
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error
  });
