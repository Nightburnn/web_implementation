// Import Axios
import axios from 'axios';

// Define the base URL of your backend API
const baseURL = 'http://localhost:5000/api';


// Function to test the News API
const testNewsAPI = async () => {
  try {
    const response = await axios.get(`${baseURL}/news`);
    console.log('News API Response:', response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

// Function to test the Transactions API
const testTransactionsAPI = async () => {
  try {
    const response = await axios.get(`${baseURL}/transactions`);
    console.log('Transactions API Response:', response.data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

// Function to test the Accounts API
const testAccountsAPI = async () => {
  try {
    const response = await axios.get(`${baseURL}/accounts`);
    console.log('Accounts API Response:', response.data);
  } catch (error) {
    console.error('Error fetching accounts:', error);
  }
};

// Call the test functions
testNewsAPI();
testTransactionsAPI();
testAccountsAPI();
