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


document.addEventListener("DOMContentLoaded", function() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy server to bypass CORS
    const apiUrl = 'https://money.cnn.com/services/api/v2/news/headlines/specials'; // CNN finance news API endpoint

    const newsContainer = document.getElementById("news-container");

    // Function to fetch news from the API
    async function fetchNews() {
        try {
            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching news:', error);
            return null;
        }
    }

    // Function to display news
    function displayNews(newsData) {
        const headlines = newsData && newsData.result && newsData.result.headlines;
        if (headlines && headlines.length > 0) {
            const randomIndex = Math.floor(Math.random() * headlines.length);
            const randomHeadline = headlines[randomIndex];
            const postItem = document.createElement("div");
            postItem.classList.add("post-item", "clearfix");
            postItem.innerHTML = `
                <h4><a href="${randomHeadline.url}">${randomHeadline.title}</a></h4>
                <p>${randomHeadline.summary}</p>
            `;
            newsContainer.innerHTML = ''; // Clear previous content
            newsContainer.appendChild(postItem);
        }
    }

    // Function to update news every 10 seconds
    async function updateNews() {
        const newsData = await fetchNews();
        if (newsData) {
            displayNews(newsData);
        }
    }

    // Initial display
    updateNews();

    // Set interval to update news every 10 seconds
    setInterval(updateNews, 10000);
});

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

})();