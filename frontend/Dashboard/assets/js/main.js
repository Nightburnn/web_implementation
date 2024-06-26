(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        if (all) {
            select(el, all).forEach(e => e.addEventListener(type, listener))
        } else {
            select(el, all).addEventListener(type, listener)
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Sidebar toggle
     */
    if (select('.toggle-sidebar-btn')) {
        on('click', '.toggle-sidebar-btn', function(e) {
            select('body').classList.toggle('toggle-sidebar')
        })
    }

    /**
     * Search bar toggle
     */
    if (select('.search-bar-toggle')) {
        on('click', '.search-bar-toggle', function(e) {
            select('.search-bar').classList.toggle('search-bar-show')
        })
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Initiate tooltips
     */
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    /**
     * Initiate quill editors
     */
    if (select('.quill-editor-default')) {
        new Quill('.quill-editor-default', {
            theme: 'snow'
        });
    }

    if (select('.quill-editor-bubble')) {
        new Quill('.quill-editor-bubble', {
            theme: 'bubble'
        });
    }

    if (select('.quill-editor-full')) {
        new Quill(".quill-editor-full", {
            modules: {
                toolbar: [
                    [{
                        font: []
                    }, {
                        size: []
                    }],
                    ["bold", "italic", "underline", "strike"],
                    [{
                            color: []
                        },
                        {
                            background: []
                        }
                    ],
                    [{
                            script: "super"
                        },
                        {
                            script: "sub"
                        }
                    ],
                    [{
                            list: "ordered"
                        },
                        {
                            list: "bullet"
                        },
                        {
                            indent: "-1"
                        },
                        {
                            indent: "+1"
                        }
                    ],
                    ["direction", {
                        align: []
                    }],
                    ["link", "image", "video"],
                    ["clean"]
                ]
            },
            theme: "snow"
        });
    }

    /**
     * Initiate TinyMCE Editor
     */
    const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

    tinymce.init({
        selector: 'textarea.tinymce-editor',
        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        editimage_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
        toolbar_sticky: true,
        toolbar_sticky_offset: isSmallScreen ? 102 : 108,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [{
                title: 'My page 1',
                value: 'https://www.tiny.cloud'
            },
            {
                title: 'My page 2',
                value: 'http://www.moxiecode.com'
            }
        ],
        image_list: [{
                title: 'My page 1',
                value: 'https://www.tiny.cloud'
            },
            {
                title: 'My page 2',
                value: 'http://www.moxiecode.com'
            }
        ],
        image_class_list: [{
                title: 'None',
                value: ''
            },
            {
                title: 'Some class',
                value: 'class-name'
            }
        ],
        importcss_append: true,
        file_picker_callback: (callback, value, meta) => {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
                callback('https://www.google.com/logos/google.jpg', {
                    text: 'My text'
                });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
                callback('https://www.google.com/logos/google.jpg', {
                    alt: 'My alt text'
                });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
                callback('movie.mp4', {
                    source2: 'alt.ogg',
                    poster: 'https://www.google.com/logos/google.jpg'
                });
            }
        },
        templates: [{
                title: 'New Table',
                description: 'creates a new table',
                content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
            },
            {
                title: 'Starting my story',
                description: 'A cure for writers block',
                content: 'Once upon a time...'
            },
            {
                title: 'New list with dates',
                description: 'New List with dates',
                content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
            }
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
    });

    /**
     * Initiate Bootstrap validation check
     */
    var needsValidation = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(needsValidation)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })

    /**
     * Initiate Datatables
     */
    const datatables = select('.datatable', true)
    datatables.forEach(datatable => {
        new simpleDatatables.DataTable(datatable, {
            perPageSelect: [5, 10, 15, ["All", -1]],
            columns: [{
                    select: 2,
                    sortSequence: ["desc", "asc"]
                },
                {
                    select: 3,
                    sortSequence: ["desc"]
                },
                {
                    select: 4,
                    cellClass: "green",
                    headerClass: "red"
                }
            ]
        });
    })


    // Function to fetch data from the API
    const fetchData = async(accountNumber, bankCode) => {
        try {
            const response = await fetch(`http://nubapi.test/api/verify?account_number=${accountNumber}&bank_code=${bankCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer Your_Bearer_Token' // Replace with your actual Bearer token
                }
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // Function to fetch banks and populate the select dropdown
    const fetchBanksAndPopulateDropdown = async() => {
        const selectAccounts = document.getElementById('selectAccounts');

        try {
            const response = await fetch('http://nubapi.test/api/banks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '6zt41TL2uZ9qvRfhPQ24DdcamhlGvLE7l8DyoEkDf9510580' // Replace with your actual Bearer token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch banks');
            }

            const banks = await response.json();
            banks.forEach(bank => {
                const option = document.createElement('option');
                option.value = bank.bank_code;
                option.textContent = bank.bank_name;
                selectAccounts.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching and populating Nigerian accounts:', error);
        }
    };
    // Array to store selected accounts
    let selectedAccounts = [];

    // Function to update the synced accounts information
    const updateSyncedAccountsInfo = () => {
        const selectAccounts = document.getElementById('selectAccounts');
        const accountNumberInput = document.getElementById('accountNumber');
        const bankSelect = document.getElementById('bank');
        const syncedAccountsInfo = document.getElementById('syncedAccountsInfo');

        // Get the selected bank and account number
        const selectedBank = bankSelect.options[bankSelect.selectedIndex].text;
        const accountNumber = accountNumberInput.value;

        // Add the selected account to the array if it doesn't already exist
        if (selectedBank && accountNumber && !selectedAccounts.find(account => account.bank === selectedBank && account.number === accountNumber)) {
            selectedAccounts.push({ bank: selectedBank, number: accountNumber });
        }

        // Update the synced accounts information
        if (selectedAccounts.length > 0) {
            const accountsList = selectedAccounts.map((account, index) => `${index + 1}.${account.bank}: ${account.number}`).join(' ');
            if (syncedAccountsInfo) {
                syncedAccountsInfo.textContent = `Your synced accounts: ${accountsList}`;
            }
        } else {
            if (syncedAccountsInfo) {
                syncedAccountsInfo.textContent = "Sync your bank accounts to manage your finances effectively.";
            }
        }
    };

    // Call the function when the form is submitted or when the bank or account number changes
    const form = document.querySelector('form');
    const bankSelect = document.getElementById('bank');
    const accountNumberInput = document.getElementById('accountNumber');

    if (form && bankSelect && accountNumberInput) {
        form.addEventListener('submit', updateSyncedAccountsInfo);
        bankSelect.addEventListener('change', updateSyncedAccountsInfo);
        accountNumberInput.addEventListener('input', updateSyncedAccountsInfo);
    }

    document.addEventListener("DOMContentLoaded", function () {
        const syncAccountsForm = document.getElementById("syncAccountsForm");
        const addAccountButton = document.getElementById("addAccountButton");
        const syncAccountButton = document.getElementById("syncAccountButton");
        const addedAccountsList = document.getElementById("addedAccountsList");
    
        // Function to save added accounts to local storage
        function saveAccountsToLocalStorage(accounts) {
            localStorage.setItem("addedAccounts", JSON.stringify(accounts));
        }
    
        // Function to retrieve added accounts from local storage
        function getAccountsFromLocalStorage() {
            const storedAccounts = localStorage.getItem("addedAccounts");
            return storedAccounts ? JSON.parse(storedAccounts) : [];
        }
    
        // Function to add account to the list
        function addAccountToList(account) {
            const listItem = document.createElement("li");
            listItem.textContent = account;
    
            // Add a remove button for each account
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
            removeButton.addEventListener("click", function () {
                const index = storedAccounts.indexOf(account);
                if (index !== -1) {
                    storedAccounts.splice(index, 1);
                    saveAccountsToLocalStorage(storedAccounts);
                    addedAccountsList.removeChild(listItem);
                }
            });
    
            listItem.appendChild(removeButton);
            addedAccountsList.appendChild(listItem);
        }
    
        // Load previously added accounts from local storage
        const storedAccounts = getAccountsFromLocalStorage();
        storedAccounts.forEach(function (account) {
            addAccountToList(account);
        });
    
        syncAccountsForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // Sync accounts functionality
            Swal.fire({
                title: 'Syncing accounts...',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        title: 'Accounts synced successfully!',
                        icon: 'success'
                    });
                }
            });
        });
    
        addAccountButton.addEventListener("click", function () {
            const bankSelect = document.getElementById("bank");
            const accountNumberInput = document.getElementById("accountNumber");
            const bankName = bankSelect.options[bankSelect.selectedIndex].text;
            const accountNumber = accountNumberInput.value.trim();
            const newAccount = `${bankName}: ${accountNumber}`;
    
            if (accountNumber !== "") {
                if (storedAccounts.includes(newAccount)) {
                    Swal.fire({
                        title: 'Account already added.',
                        icon: 'warning'
                    });
                } else {
                    addAccountToList(newAccount);
                    storedAccounts.push(newAccount);
                    saveAccountsToLocalStorage(storedAccounts);
                    accountNumberInput.value = "";
                }
            } else {
                Swal.fire({
                    title: 'Please enter an account number.',
                    icon: 'error'
                });
            }
        });
    
        syncAccountButton.addEventListener("click", function () {
            // Sync accounts functionality
            Swal.fire({
                title: 'Syncing accounts...',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    Swal.fire({
                        title: 'Accounts synced successfully!',
                        icon: 'success'
                    }).then(() => {
                        // Redirect to "../index.html" after the user clicks "OK"
                        window.location.href = "././index.html";


                        // Generate random numbers for index data
                const randomIncome = Math.floor(Math.random() * 8000); // Random income between 0 and 8000
                const randomExpense = Math.floor(Math.random() * 8000); // Random expense between 0 and 8000
                const randomSavings = Math.floor(Math.random() * 8000); // Random savings between 0 and 8000

                // Update index numbers with random data
                console.log("Updating budget...");
                document.getElementById("income").innerText = '₦' + randomIncome.toLocaleString();
                document.getElementById("expense").innerText = '₦' + randomExpense.toLocaleString();
                document.getElementById("savings").innerText = '₦' + randomSavings.toLocaleString();


                    });
                }
            });
        });
        
    });
    
    
    // Function to populate values for balance, expenses summary, and balance trends
    function populateValues() {
        // Balance Trends (Chart)
        var reportsChart = document.querySelector('#reportsChart');
        var apexChart = ApexCharts.getInstance(reportsChart);
        apexChart.updateSeries([
            { data: [250000, 280000, 300000, 270000, 320000, 350000] }, // Update income data
            { data: [180000, 200000, 220000, 210000, 240000, 250000] }, // Update expense data
            { data: [70000, 80000, 80000, 60000, 80000, 100000] } // Update savings data
        ]);
    }

    // Function to increase values by 49 percent
    function increaseValues() {
        // Balance
        var balanceValue = document.querySelector('.info-card.sales-card h6').textContent;
        var balanceAmount = parseInt(balanceValue.replace('₦', '').replace(',', ''));
        var increasedBalance = balanceAmount * 1.49;
        document.querySelector('.info-card.sales-card h6').textContent = '₦' + increasedBalance.toLocaleString();

        // Expenses Summary
        var expensesValue = document.querySelector('.info-card.revenue-card h6').textContent;
        var expensesAmount = parseInt(expensesValue.replace('₦', '').replace(',', ''));
        var increasedExpenses = expensesAmount * 1.49;
        document.querySelector('.info-card.revenue-card h6').textContent = '₦' + increasedExpenses.toLocaleString();

        // Balance Trends (Chart)
        var reportsChart = document.querySelector('#reportsChart');
        var apexChart = ApexCharts.getInstance(reportsChart);
        var seriesData = apexChart.w.globals.series.slice();
        seriesData.forEach((data, index) => {
            seriesData[index] = data.map(value => value * 1.49);
        });
        apexChart.updateSeries(seriesData);
    }

    // Event listener for Button 1 (populate values)
    document.getElementById('addAccountButton').addEventListener('click', populateValues);

    // Event listener for Button 2 (increase values by 49 percent)
    document.getElementById('syncAccountButton').addEventListener('click', increaseValues);

    /**
     * Autoresize echart charts
     */
    const mainContainer = select('#main');
    if (mainContainer) {
        setTimeout(() => {
            new ResizeObserver(function() {
                select('.echart', true).forEach(getEchart => {
                    echarts.getInstanceByDom(getEchart).resize();
                })
            }).observe(mainContainer);
        }, 200);
    }
// Get the news container and items
var newsContainer = document.getElementById('news-container');
var newsItems = document.querySelectorAll('.news-item');
var currentIndex = 0;
var itemWidth = newsItems[0].offsetWidth;

// Function to show the current news item
function showNewsItem(index) {
    // Calculate the new position for the slideshow
    var newPosition = -index * itemWidth + 'px';
    // Apply the new position to the news items container
    newsContainer.style.transform = 'translateX(' + newPosition + ')';
    // Update the current index
    currentIndex = index;
}

// Show the first news item initially
showNewsItem(currentIndex);

// Event listener for the "Next" button
document.getElementById('nextButton').addEventListener('click', function() {
    if (currentIndex < newsItems.length - 1) {
        showNewsItem(currentIndex + 1);
    }
});

// Event listener for the "Previous" button
document.getElementById('prevButton').addEventListener('click', function() {
    if (currentIndex > 0) {
        showNewsItem(currentIndex - 1);
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // Event listener for Add Account button
    document.getElementById('addAccountButton').addEventListener('click', function() {
        // Set a session variable to indicate the button click
        sessionStorage.setItem('buttonClicked', 'addAccount');
        // Redirect to the second page
        window.location.href = 'index.html';
    });

    // Event listener for Sync Accounts button
    document.getElementById('syncAccountButton').addEventListener('click', function() {
        // Set a session variable to indicate the button click
        sessionStorage.setItem('buttonClicked', 'syncAccount');
        
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var expenses = balance * 0.4; // Initial expenses (40% of balance)
    updateValues();

    // Function to update balance and expenses on the page
    function updateValues() {
        // Update balance
        document.getElementById('balance').textContent = '₦' + balance.toFixed(2);

        // Update expenses
        document.getElementById('expenses').textContent = '₦' + expenses.toFixed(2);

        // Update expenses increase/decrease status
        var increase = (expenses - (balance * 0.4)) > 0;
        var statusText = increase ? 'Increase' : 'Decrease';
        document.getElementById('expenses-status').textContent = Math.abs(expenses - (balance * 0.4)).toFixed(2) + '% ' + statusText;
    }

    // Event listener for Add Account button
    document.getElementById('addAccountButton').addEventListener('click', function() {
        // Update balance and expenses based on Add Account button logic
        // For example:
        balance -= 100; // Example deduction from balance
        expenses = balance * 0.4; // Recalculate expenses
        updateValues();
    });

    // Event listener for Sync Accounts button
    document.getElementById('syncAccountButton').addEventListener('click', function() {
        // Update balance and expenses based on Sync Accounts button logic
        // For example:
        balance *= 1.73; // Example increase in balance by 73%
        expenses = balance * 0.4; // Recalculate expenses
        updateValues();
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Check if the flag is set indicating "Sync Accounts" button was clicked on the other page
    var syncAccountsClicked = sessionStorage.getItem("syncAccountsClicked");
    if (syncAccountsClicked === "true") {
        // Call the function to initialize ApexCharts with the new data
        initializeApexCharts();
        // Remove the flag from sessionStorage
        sessionStorage.removeItem("syncAccountsClicked");
    }
});
 // Function to initialize ApexCharts with the new data
 function initializeApexCharts() {
    new ApexCharts(document.querySelector("#reportsChart"), {
        series: [{
            name: 'Income',
            data: [250000, 280000, 300000, 270000, 320000, 350000], // Sample income data in Naira
        }, {
            name: 'Expenses',
            data: [180000, 200000, 220000, 210000, 240000, 250000], // Sample expense data in Naira
        }, {
            name: 'Savings',
            data: [70000, 80000, 80000, 60000, 80000, 100000], // Sample savings data in Naira
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        markers: {
            size: 4
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d'],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.4,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            type: 'datetime',
            categories: ["2023-09-19", "2023-10-19", "2023-11-19", "2023-12-19", "2024-01-19", "2024-02-19"], // Adjusted for the past 6 months
            labels: {
                format: 'MMM yy', // Format the x-axis labels as month and year
            }
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return '₦' + value.toLocaleString(); // Format y-axis labels as currency in Naira
                }
            }
        },
        tooltip: {
            x: {
                format: 'MMM yy' // Format tooltip date as month and year
            },
            y: {
                formatter: function(value) {
                    return '₦' + value.toLocaleString(); // Format tooltip value as currency in Naira
                }
            }
        }
    }).render();
}

// Function to update recent transactions
function updateRecentTransactions(transactions) {
    const recentTransactionsContainer = document.getElementById('recentTransactions');
    recentTransactionsContainer.innerHTML = ''; // Clear previous content

    // If there are transactions, display them
    if (transactions.length > 0) {
        transactions.forEach(transaction => {
            const activityItem = document.createElement('div');
            activityItem.classList.add('activity-item', 'd-flex');

            const activityContent = document.createElement('div');
            activityContent.classList.add('activity-content');
            activityContent.textContent = transaction;

            activityItem.appendChild(activityContent);
            recentTransactionsContainer.appendChild(activityItem);
        });
    } else {
        // If there are no transactions, display the default message
        const activityItem = document.createElement('div');
        activityItem.classList.add('activity-item', 'd-flex');

        const activityContent = document.createElement('div');
        activityContent.classList.add('activity-content');
        activityContent.textContent = 'No recent transactions';

        activityItem.appendChild(activityContent);
        recentTransactionsContainer.appendChild(activityItem);
    }
}

// Check if there are stored transactions from another page
document.addEventListener('DOMContentLoaded', function() {
    const storedTransactions = JSON.parse(localStorage.getItem('recentTransactions')) || [];
    updateRecentTransactions(storedTransactions);
});

    
})();