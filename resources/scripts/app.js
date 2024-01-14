// Theme Function  //////////////////////////////////////////////////////////
function themeJS() {

    const darkThemeButton = document.querySelector(`.dark-button-theme`);
    const lightThemeButton = document.querySelector(`.light-button-theme`);
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches;
    const navLogo = document.querySelector(`.header-logo img`);


    // start theme initialize
    themeInitializer();

    // theme setter function
    function themeSetter(theme) {
        if (theme === `dark`) {
            darkThemeSetter();
        }
        else {
            lightThemeSetter();
        }
    }

    // check user theme prefrences and local storage theme
    function themeInitializer() {
        let selectedTheme = localStorage.getItem('theme');
        if (!selectedTheme) {
            if (prefersDark) {
                themeSetter('dark');
                localStorage.setItem('theme', 'dark');

            } else {
                themeSetter('light');
                localStorage.setItem('theme', 'light');
            }

        } else {
            themeSetter(localStorage.getItem('theme'));
        }
    }

    // change to dark theme
    darkThemeButton.addEventListener('click', () => {
        localStorage.setItem('theme', 'dark');
        darkThemeSetter();
    })

    // change to light theme
    lightThemeButton.addEventListener('click', () => {
        localStorage.setItem('theme', 'light');
        lightThemeSetter();
    })

    // dark theme setter function
    function darkThemeSetter() {

        const allTagsTheme = document.querySelectorAll(`.theme`);
        allTagsTheme.forEach(element => {
            element.classList.remove(`light-theme`);
            element.classList.add(`dark-theme`);
        });

        const allTagsThemeReverse = document.querySelectorAll(`.theme-reverse`);
        allTagsThemeReverse.forEach(element => {
            element.classList.remove(`dark-theme`);
            element.classList.add(`light-theme`);
        });



        const allTagsText = document.querySelectorAll(`.theme-text`);
        allTagsText.forEach(element => {
            element.classList.remove(`light-theme-text`);
            element.classList.add(`dark-theme-text`);
        });

        const allTagsTextReversed = document.querySelectorAll(`.theme-text-reverse`);
        allTagsTextReversed.forEach(element => {
            element.classList.remove(`dark-theme-text`);
            element.classList.add(`light-theme-text`);
        });

        // if (mainLogo) {
        //     mainLogo.setAttribute(`src`, `resources/images/gcctrade-logo-light.svg`);
        // }
        // if (navLogo) {
        //     navLogo.setAttribute(`src`, `resources/images/gcctrade-logo-dark.svg`);
        // }
        darkThemeButton.style.display = `none`;
        lightThemeButton.style.display = `flex`;
    }

    // light theme setter function
    function lightThemeSetter() {
        const allTagsTheme = document.querySelectorAll(`.theme`);
        allTagsTheme.forEach(element => {
            element.classList.remove(`dark-theme`);
            element.classList.add(`light-theme`);
        });

        const allTagsThemeReverse = document.querySelectorAll(`.theme-reverse`);
        allTagsThemeReverse.forEach(element => {
            element.classList.remove(`light-theme`);
            element.classList.add(`dark-theme`);
        });


        const allTagsText = document.querySelectorAll(`.theme-text`);
        allTagsText.forEach(element => {
            element.classList.remove(`dark-theme-text`);
            element.classList.add(`light-theme-text`);
        });

        const allTagsTextReversed = document.querySelectorAll(`.theme-text-reverse`);
        allTagsTextReversed.forEach(element => {
            element.classList.remove(`light-theme-text`);
            element.classList.add(`dark-theme-text`);
        });

        // if (mainLogo) {
        //     mainLogo.setAttribute(`src`, `resources/images/gcctrade-logo-dark.svg`);
        // }
        // if (navLogo) {
        //     navLogo.setAttribute(`src`, `resources/images/gcctrade-logo-light.svg`);
        // }
        darkThemeButton.style.display = `flex`;
        lightThemeButton.style.display = `none`;
    }
}
themeJS();



// Language Function  //////////////////////////////////////////////////////

let language;
let servicesInfo;
function languageJS() {

    const languageButton = document.querySelector(`.language-button`);
    const languageWrapper = document.querySelector(`.languages`);

    // check and save prefered language on local storage
    language = localStorage.getItem("language");
    if (!language) {
        localStorage.setItem("language", "english");
        languageInitializer(language);
    } else {
        languageInitializer(language);
    }

    // Function to show the language list
    function showLanguageList() {
        languageWrapper.style.display = 'flex';
    }

    // Function to hide the language list
    function hideLanguageList() {
        languageWrapper.style.display = 'none';
    }

    // Event listener for the button click
    languageButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from bubbling to the document
        if (languageWrapper.style.display === 'none' || languageWrapper.style.display === '') {
            showLanguageList();
        } else {
            hideLanguageList();
        }
    });

    // Event listener for clicks on the document
    document.addEventListener('click', function () {
        hideLanguageList();
    });

    // Prevent language list from hiding when clicking inside the languageWrapper
    languageWrapper.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from bubbling to the document
    });


    // Event listeners for each language
    const languages = document.querySelectorAll(`.lang-item`);
    languages.forEach(lang => {
        lang.addEventListener('click', function () {
            language = this.getAttribute('data-lang');
            // console.log('Selected language:', language);
            localStorage.setItem("language", language);
            languageInitializer(language);
            hideLanguageList();

            // // Revoke page maker
            // if (page === `/`) {
            //     indexPageMaker();
            // } else if (page === '/explorer') {
            //     // dropDownMaker();
            //     explorerPageMaker();
            //     dropdownCloser();
            // } else {
            //     history.pushState(null, null, `/${username}`);
            //     renderPage(`/${username}`)
            // }

        });
    });


    // language initilaezer and Updater
    function languageInitializer(language) {
        fetch(`resources/data/languages/${language}/info.json`)
            .then(response => response.json())
            .then(data => {

                const elements = document.querySelectorAll(`[data-lang]`);
                elements.forEach(element => {
                    const key = element.getAttribute('data-lang');
                    if (data[language] && data[language][key]) {
                        if (element.tagName.toLowerCase() === 'input' && element.getAttribute('type') === 'text') {
                            // Check if it's an input element with type="text" and set placeholder
                            element.setAttribute('placeholder', data[language][key]);
                        } else {
                            // For other elements, set text content
                            element.innerHTML = data[language][key];
                        }
                    }
                });

                // Change font and direction based on the language
                const body = document.querySelector('body');
                const hero = document.querySelector('.hero');
                const aboutImage = document.querySelector('.about-image img')
                const button = document.querySelectorAll('button');

                if (language === 'english') {
                    body.style.fontFamily = 'Poppins, sans-serif';
                    body.style.direction = 'ltr';
                    hero.setAttribute('dir', "ltr");
                    aboutImage.setAttribute('dir', "ltr");
                    button.forEach(element => {
                        element.setAttribute('dir', "ltr");
                    });
                    websireDirection = 'ltr';

                    // update servicees language
                    fetch(`resources/data/services/${language}/services.json`)
                        .then(response => response.json())
                        .then(data => {
                            serviceMaker(data);
                        });

                } else {
                    body.style.fontFamily = 'Vazirmatn, sans-serif';
                    body.style.direction = 'rtl';
                    hero.setAttribute('dir', "rtl");
                    aboutImage.setAttribute('dir', "rtl");
                    button.forEach(element => {
                        element.setAttribute('dir', "rtl");
                    });
                    // update servicees language
                    fetch(`resources/data/services/${language}/services.json`)
                        .then(response => response.json())
                        .then(data => {
                            serviceMaker(data);
                        });
                }



            })
            .catch(error => {
                console.error('Error fetching language file:', error);
            });

        // set font of input tag
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.fontFamily = language === 'english' ? 'Poppins, sans-serif' : 'Vazirmatn, sans-serif';
        });
    }
}
languageJS();

// Slider //////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    let sliderindex = 0;
    const imageShow = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 1], [4, 5, 6, 1, 2], [5, 6, 1, 2, 3], [6, 1, 2, 3, 4, 5]];
    const slider = document.querySelector('.slider');

    function sliderMakerPartner(sliderindex) {
        slider.innerHTML = `
            <div class="slider-item"><img src="resources/images/brand_img0${imageShow[sliderindex][0]}.png" alt="Company 1"></div>
            <div class="slider-item"><img src="resources/images/brand_img0${imageShow[sliderindex][1]}.png" alt="Company 2"></div>
            <div class="slider-item"><img src="resources/images/brand_img0${imageShow[sliderindex][2]}.png" alt="Company 3"></div>
            <div class="slider-item"><img src="resources/images/brand_img0${imageShow[sliderindex][3]}.png" alt="Company 4"></div>
            <div class="slider-item"><img src="resources/images/brand_img0${imageShow[sliderindex][4]}.png" alt="Company 5"></div>
        `;

        sliderindex += 1;
        if (sliderindex === 6) sliderindex = 0;

        // Call sliderMaker again after 3000 milliseconds
        setTimeout(function () {
            sliderMakerPartner(sliderindex);
        }, 2000);
    }
    sliderMakerPartner(sliderindex);

});








// Services Slider ////////////////////////////////////////////////////////

// function serviceMaker(serviceInfo) {

//     let currentIndex = 0;
//     const servicesPerSlide = 4; // Adjust this value based on the number of services you want to show per slide
//     let servicesInfo; // Global variable to store the fetched services data

//     // Simulated data for testing (replace this with your actual fetched data)
//     const simulatedData = serviceInfo;

//     // Function to initialize services data
//     function initServicesData() {
//         // Use this line if you are fetching data from a server
//         // fetchAndDisplayServices(localStorage.getItem("language"));

//         // Simulated data for testing
//         servicesInfo = simulatedData;
//         fetchAndDisplayServices();
//     }

//     // Function to fetch and display services
//     function fetchAndDisplayServices() {
//         const services = Object.values(servicesInfo.services);

//         // Create service cards
//         const servicesCardsContainer = document.querySelector('.services-cards');
//         servicesCardsContainer.innerHTML = "";
//         servicesCardsContainer.innerHTML = '';
//         services.forEach((service) => {
//             const servicesCard = document.createElement('div');
//             servicesCard.classList.add('services-card', 'theme', 'theme-text');
//             servicesCard.innerHTML = `
//         <div class="service-card-header">
//             <i class="fa ${service.icon}"></i>
//             <h4 data-lang="${service.title}">${service.title}</h4>
//         </div>
//         <p data-lang="${service.description}">${service.description}</p>
//         <div class="service-button">
//             <a href="" class="button-primary" data-lang="buttonReadMore">
//                 ${serviceInfo.buttonReadMore}
//             </a>
//         </div>
//       `;

//             servicesCardsContainer.appendChild(servicesCard);
//         });

//         // Show the initial set of cards
//         showServices();

//         // Set up the slider interval
//         setInterval(() => {
//             currentIndex = (currentIndex + 1) % (services.length - servicesPerSlide + 1);
//             showServices();
//         }, 2500);
//     }

//     // Function to show the current set of services
//     function showServices() {
//         const servicesCards = document.querySelectorAll('.services-card');
//         servicesCards.forEach((card, index) => {
//             if (index >= currentIndex && index < currentIndex + servicesPerSlide) {
//                 card.style.display = 'block';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     }

//     // Function to handle language change
//     function onLanguageChange(newLanguage) {
//         // Use this line if you are fetching data from a server
//         // fetchAndDisplayServices(newLanguage);

//         // Simulated data for testing
//         initServicesData();
//     }

//     // Example: Simulating a language change
//     // Replace this with the actual code to detect and handle language changes
//     const initialLanguage = localStorage.getItem("language") || "defaultLanguage";
//     onLanguageChange(initialLanguage);
//     themeJS();
// }

function serviceMaker(serviceInfo) {
    let currentIndex = 0;
    const servicesPerSlide = 4;
    let servicesInfo;
    let services; // Define services at a broader scope
    const simulatedData = serviceInfo;
    let sliderInterval;

    function initServicesData() {
        servicesInfo = simulatedData;
        fetchAndDisplayServices();
    }

    function fetchAndDisplayServices() {
        services = Object.values(servicesInfo.services); // Assign to services variable
        const servicesCardsContainer = document.querySelector('.services-cards');
        servicesCardsContainer.innerHTML = "";
        servicesCardsContainer.innerHTML = '';
        services.forEach((service) => {
            const servicesCard = document.createElement('div');
            servicesCard.classList.add('services-card', 'theme', 'theme-text');
            servicesCard.innerHTML = `
                <div class="service-card-header">
                    <i class="fa ${service.icon}"></i>
                    <h4 data-lang="${service.title}">${service.title}</h4>
                </div>
                <p data-lang="${service.description}">${service.description}</p>
                <div class="service-button">
                    <a href="" class="button-primary" data-lang="buttonReadMore">
                        ${serviceInfo.buttonReadMore}
                    </a>
                </div>
            `;
            servicesCardsContainer.appendChild(servicesCard);
        });

        showServices();
        setSliderInterval();
    }

    function showServices() {
        const servicesCards = document.querySelectorAll('.services-card');
        servicesCards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + servicesPerSlide) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function setSliderInterval() {
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % (services.length - servicesPerSlide + 1);
            showServices();
        }, 2500);
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    function resumeSlider() {
        setSliderInterval();
    }

    function onLanguageChange(newLanguage) {
        initServicesData();
    }

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const servicesContainer = document.querySelector('.services-wrapper');

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + services.length) % (services.length - servicesPerSlide + 1);
        showServices();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % (services.length - servicesPerSlide + 1);
        showServices();
    });

    servicesContainer.addEventListener('mouseenter', stopSlider);
    servicesContainer.addEventListener('mouseleave', resumeSlider);

    const initialLanguage = localStorage.getItem("language") || "defaultLanguage";
    onLanguageChange(initialLanguage);
    themeJS();
}


// serviceMaker(/* pass your serviceInfo data here */);



// function services() {
//     language = localStorage.getItem("language");

//     fetch(`resources/data/services/${language}/services.json`)
//         .then(response => response.json())
//         .then(data => {

//             slideMaker(data);
//         })
//         .catch(error => {
//             console.error('Error fetching language file:', error);
//         });


//     function slideMaker(data) {
//         let servicesData = data;
//         if (!Array.isArray(servicesData)) {
//             console.error('Invalid data format. Expected an array.');
//             servicesData = []; // Set it to an empty array to avoid further issues
//         }

//         const slider = document.querySelector('.services-cards');

//         // Function to create HTML for a single service card
//         function createServiceCard(service) {
//             return `
//     <div class="services-card theme-reverse theme-text">
//         <div class="service-card-header">
//             <i class="fa ${service.icon}"></i>
//             <h4 data-lang="${service.title}">${service.title}</h4>
//         </div>
//         <p data-lang="${service.description}">${service.description}</p>
//         <div class="service-button">
//             <a href="" class="button-primary" data-lang="buttonReadMore">
//                 Read More
//             </a>
//         </div>
//     </div>
//   `;
//         }

//         // Function to render services in groups of 4
//         function renderServices(startIndex) {
//             const endIndex = startIndex + 4;
//             const servicesSlice = servicesData.slice(startIndex, endIndex);

//             slider.innerHTML = servicesSlice.map(createServiceCard).join('');
//         }

//         let currentIndex = 0;

//         // Initial render
//         renderServices(currentIndex);

//         // Function to shift the slider to the next set of services
//         function shiftSlider() {
//             currentIndex = (currentIndex + 4) % servicesData.length;
//             renderServices(currentIndex);
//         }

//         // Automatically shift slider every 5 seconds
//         setInterval(shiftSlider, 5000);











//         // let sliderindex = 0;
//         // const imageShow = [
//         //     [1, 2, 3, 4],
//         //     [2, 3, 4, 5],
//         //     [3, 4, 5, 6],
//         //     [4, 5, 6, 7],
//         //     [5, 6, 7, 8],
//         //     [6, 7, 8, 9],
//         //     [7, 8, 9, 10],
//         //     [8, 9, 10, 11],
//         //     [9, 10, 11, 12],
//         //     [10, 11, 12, 1],
//         //     [11, 12, 1, 2],
//         //     [12, 1, 2, 3]
//         // ];

//         // for (const subcategoryKey in data.services) {
//         //     if (data.services.hasOwnProperty(subcategoryKey)) {
//         //         const subcategory = data.services[subcategoryKey];

//         //         // Now 'subcategory' contains the information for each subcategory
//         //         const title = subcategory.title;
//         //         const description = subcategory.description;
//         //         const icon = subcategory.icon;

//         //         // Use the information as needed
//         //         console.log(`Title: ${title}`);
//         //         console.log(`Description: ${description}`);
//         //         console.log(`Icon: ${icon}`);
//         //     }
//         // }

//         // const slider = document.querySelector('.services-cards');



//         // function sliderMaker(sliderindex) {
//         //     slider.innerHTML = `

//         //     <!-- single service -->
//         //                     <div class="services-card  theme-reverse theme-text">
//         //                         <div class="service-card-header">
//         //                             <i class="fa fa-bank"></i>
//         //                             <h4 data-lang="serviceOneTitle">Corporate Governance Consulting</h4>
//         //                         </div>
//         //                         <p data-lang="serviceOneDescription">
//         //                             Offer consulting services to help companies establish effective corporate governance
//         //                             frameworks, policies, and procedures.
//         //                         </p>
//         //                         <div class="service-button">
//         //                             <a href="" class="button-primary" data-lang="buttonReadMore">
//         //                                 Read More
//         //                             </a>
//         //                         </div>
//         //                     </div>

//         //                     <!-- single service -->
//         //                     <div class="services-card  theme-reverse theme-text">
//         //                         <div class="service-card-header">
//         //                             <i class="fa  fa-calculator "></i>
//         //                             <h4 data-lang="serviceTwoTitle">Board Evaluation Services</h4>
//         //                         </div>
//         //                         <p data-lang="serviceTwoDescription">
//         //                             Provide independent assessments of board performance, including evaluations of
//         //                             individual directors and overall board
//         //                             effectiveness.
//         //                         </p>
//         //                         <div class="service-button">
//         //                             <a href="" class="button-primary" data-lang="buttonReadMore">
//         //                                 Read More
//         //                             </a>
//         //                         </div>
//         //                     </div>

//         //                     <!-- single service -->
//         //                     <div class="services-card  theme-reverse theme-text">
//         //                         <div class="service-card-header">
//         //                             <i class="fa fa-check-square"></i>
//         //                             <h4 data-lang="serviceThreeTitle">Compliance Training</h4>
//         //                         </div>
//         //                         <p data-lang="serviceThreeDescription">Develop and deliver training programs on regulatory
//         //                             compliance, ethics, and corporate governance best practices for
//         //                             employees at all levels.
//         //                         </p>
//         //                         <div class="service-button">
//         //                             <a href="" class="button-primary" data-lang="buttonReadMore">
//         //                                 Read More
//         //                             </a>
//         //                         </div>
//         //                     </div>

//         //                     <!-- single service -->
//         //                     <div class="services-card  theme-reverse theme-text">
//         //                         <div class="service-card-header">
//         //                             <i class="fa   fa-pencil-square "></i>
//         //                             <h4 data-lang="serviceFourTitle">Secretarial Services Outsourcing</h4>
//         //                         </div>
//         //                         <p data-lang="serviceFourDescription">Offer outsourced secretarial services to companies
//         //                             that require assistance with administrative tasks such as maintaining
//         //                             statutory registers, filing annual returns, and managing board meetings.

//         //                         </p>
//         //                         <div class="service-button">
//         //                             <a href="" class="button-primary" data-lang="buttonReadMore">
//         //                                 Read More
//         //                             </a>
//         //                         </div>
//         //                     </div>

//         //     `;

//         //     sliderindex += 1;
//         //     if (sliderindex === 6) sliderindex = 0;

//         //     // Call sliderMaker again after 3000 milliseconds
//         //     setTimeout(function () {
//         //         sliderMaker(sliderindex);
//         //     }, 2000);
//         // }
//         // sliderMaker(sliderindex);

//     }

// };

// services();


// document.addEventListener('DOMContentLoaded', function () {
//     const servicesCards = document.querySelector('.services-cards');
//     const prevButton = document.getElementById('prevButton');
//     const nextButton = document.getElementById('nextButton');

//     const cardWidth = document.querySelector('.services-card').offsetWidth + 20;
//     let currentSlide = 0;

//     function updateSlider() {
//         servicesCards.style.transform = `translateX(${-currentSlide * cardWidth}px)`;
//     }

//     function nextSlide() {
//         currentSlide++;
//         if (currentSlide >= servicesCards.children.length) {
//             currentSlide = 0;
//         }
//         updateSlider();
//     }

//     function prevSlide() {
//         currentSlide--;
//         if (currentSlide < 0) {
//             currentSlide = servicesCards.children.length - 1;
//         }
//         updateSlider();
//     }

//     nextButton.addEventListener('click', nextSlide);
//     prevButton.addEventListener('click', prevSlide);

//     // Automatic slider with a 5-second interval (adjust as needed)
//     setInterval(nextSlide, 2000);
// });



// document.addEventListener('DOMContentLoaded', function () {
//     const servicesCards = document.querySelector('.services-cards');
//     const prevButton = document.getElementById('prevButton');
//     const nextButton = document.getElementById('nextButton');

//     const cardWidth = document.querySelector('.services-card').offsetWidth + 20;
//     let currentSlide = 0;
//     let intervalId; // to store the interval ID

//     function updateSlider() {
//         servicesCards.style.transform = `translateX(${-currentSlide * cardWidth}px)`;
//     }

//     function nextSlide() {
//         currentSlide++;
//         if (currentSlide >= servicesCards.children.length) {
//             currentSlide = 0;
//         }
//         updateSlider();
//     }

//     function prevSlide() {
//         currentSlide--;
//         if (currentSlide < 0) {
//             currentSlide = servicesCards.children.length - 1;
//         }
//         updateSlider();
//     }

//     function startSlider() {
//         intervalId = setInterval(nextSlide, 2000);
//     }

//     function pauseSlider() {
//         clearInterval(intervalId);
//     }

//     nextButton.addEventListener('click', function () {
//         pauseSlider();
//         nextSlide();
//         startSlider();
//     });

//     prevButton.addEventListener('click', function () {
//         pauseSlider();
//         prevSlide();
//         startSlider();
//     });

//     servicesCards.addEventListener('mouseover', pauseSlider);
//     servicesCards.addEventListener('mouseout', startSlider);

//     // Automatic slider with a 5-second interval (adjust as needed)
//     startSlider();
// });

// function serviceSlider(websiteDirection) {
//     const servicesCards = document.querySelector('.services-cards');
//     const prevButton = document.getElementById('prevButton');
//     const nextButton = document.getElementById('nextButton');

//     const cardWidth = document.querySelector('.services-card').offsetWidth + 20;
//     let currentSlide = 0;
//     let intervalId;

//     // function updateSlider() {
//     //     // let translation = websireDirection === 'rtl' ? `-${currentSlide * cardWidth}px` : `${-currentSlide * cardWidth}px`;
//     //     let translation = websireDirection === 'rtl' ? `${currentSlide * cardWidth}px` : `-${currentSlide * cardWidth}px`;

//     //     servicesCards.style.transform = `translateX(${translation})`;
//     // }

//     // function updateSlider() {
//     //     let translation;
//     //     if (websireDirection === 'rtl') {
//     //         translation = currentSlide === 0 ? `0` : `-${currentSlide * cardWidth}px`;
//     //     } else {
//     //         translation = currentSlide === servicesCards.children.length - 1 ? `0` : `-${currentSlide * cardWidth}px`;
//     //     }
//     //     servicesCards.style.transform = `translateX(${translation})`;
//     // }

//     function updateSlider() {
//         const translation = websiteDirection === 'rtl' ? `${currentSlide * cardWidth}px` : `-${currentSlide * cardWidth}px`;
//         servicesCards.style.transform = `translateX(${translation})`;
//     }

//     function nextSlide() {
//         currentSlide++;
//         if (currentSlide >= servicesCards.children.length) {
//             currentSlide = 0;
//         }
//         updateSlider();
//     }


//     function prevSlide() {
//         currentSlide--;
//         if (currentSlide < 0) {
//             currentSlide = servicesCards.children.length - 1;
//         }
//         updateSlider();
//     }



//     function startSlider() {
//         intervalId = setInterval(nextSlide, 2500);
//     }

//     function pauseSlider() {
//         clearInterval(intervalId);
//     }

//     function changeDirection() {
//         // Update the website direction variable
//         // websiteDirection = getComputedStyle(document.body).direction;

//         // Stop the slider, reset currentSlide, and update the slider
//         pauseSlider();
//         currentSlide = 0;
//         updateSlider();
//         startSlider();
//     }

//     nextButton.addEventListener('click', function () {
//         pauseSlider();
//         nextSlide();
//         startSlider();
//     });

//     prevButton.addEventListener('click', function () {
//         pauseSlider();
//         prevSlide();
//         startSlider();
//     });

//     servicesCards.addEventListener('mouseover', pauseSlider);
//     servicesCards.addEventListener('mouseout', startSlider);

//     startSlider();

//     const observer = new MutationObserver(() => {
//         changeDirection();
//     });

//     observer.observe(document.body, { attributes: true, attributeFilter: ['dir'] });
// }


