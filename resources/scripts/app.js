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
        console.log('check1')
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
                const offerImage = document.querySelector(".video-cover");
                const chartLines = document.querySelector('.chart-lines ');

                if (language === 'english') {
                    body.style.fontFamily = 'Poppins, sans-serif';
                    body.style.direction = 'ltr';
                    hero.setAttribute('dir', "ltr");
                    aboutImage.setAttribute('dir', "ltr");
                    offerImage.setAttribute('dir', "ltr");
                    button.forEach(element => {
                        element.setAttribute('dir', "ltr");
                    });
                    chartLines.setAttribute('dir', "ltr");


                } else {
                    body.style.fontFamily = 'Vazirmatn, sans-serif';
                    body.style.direction = 'rtl';
                    hero.setAttribute('dir', "rtl");
                    aboutImage.setAttribute('dir', "rtl");
                    offerImage.setAttribute('dir', "rtl");
                    button.forEach(element => {
                        element.setAttribute('dir', "rtl");
                    });
                    chartLines.setAttribute('dir', "rtl");

                    // update servicees language

                }
                // update servicees language
                clearInterval(serviceInterval);
                fetch(`resources/data/services/${language}/services.json`)
                    .then(response => response.json())
                    .then(data => {

                        services(data);
                        console.log("check2")

                    }).catch(error => {
                        console.error('Error 212', error);
                    });


            })
            .catch(error => {
                console.error('Error 213', error);
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
let sliderindex = 1;
let serviceInterval;

function services(data) {
    const dataShow = [
        ['1', '2', '3', '4'],
        ['1', '2', '3', '4'],
        ['2', '3', '4', '5'],
        ['3', '4', '5', '6'],
        ['4', '5', '6', '7'],
        ['5', '6', '7', '8'],
        ['6', '7', '8', '9'],
        ['7', '8', '9', '10'],
        ['8', '9', '10', '11'],
        ['9', '10', '11', '12'],
        ['10', '11', '12', '1'],
        ['11', '12', '1', '2'],
        ['12', '1', '2', '3']
    ];

    const slider = document.querySelector('.services-cards');
    clearInterval(serviceInterval);

    function serviceMaker() {
        slider.innerHTML = '';
        dataShow[sliderindex].forEach(element => {
            const serviceInfo = data.services[element];

            if (serviceInfo) {
                slider.innerHTML += `
                    <!-- single service -->
                    <div class="services-card theme theme-text">
                        <div class="service-card-header">
                            <i class="fa ${serviceInfo.icon}"></i>
                            <h4>${serviceInfo.title}</h4>
                        </div>
                        <p>${serviceInfo.description}</p>
                        <div class="service-button">
                            <a href="" class="button-primary" data-lang="buttonReadMore">
                                ${data.buttonReadMore}
                            </a>
                        </div>
                    </div>
                `;
            }
        });

        themeJS();
    }
    serviceMaker();
    function startInterval() {
        serviceInterval = setInterval(() => {
            sliderindex += 1;
            if (sliderindex >= dataShow.length) sliderindex = 0;
            serviceMaker();
        }, 3000);
    }

    function stopInterval() {
        clearInterval(serviceInterval);
    }

    slider.addEventListener('mouseenter', stopInterval);
    slider.addEventListener('mouseleave', startInterval);

    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');

    nextButton.addEventListener('mouseenter', stopInterval);
    nextButton.addEventListener('mouseleave', startInterval);
    prevButton.addEventListener('mouseenter', stopInterval);
    prevButton.addEventListener('mouseleave', startInterval);


    nextButton.addEventListener('click', () => {
        sliderindex += 1;
        if (sliderindex >= dataShow.length) sliderindex = 0;
        serviceMaker();
    });

    prevButton.addEventListener('click', () => {
        sliderindex -= 1;
        if (sliderindex < 0) sliderindex = dataShow.length - 1;
        serviceMaker();
    });

    // Start the interval initially
    startInterval();
}

// Offers section /////////////////////////////////////////////////////////

const videoPlayerButton = document.querySelector(".video-runner");
const videoCloserButton = document.querySelector(".video-closer");
const videoPlayer = document.querySelector('.video-player');
const youtubeVideo = document.getElementById('youtubeVideo');

videoCloserButton.addEventListener("click", function () {
    youtubeVideo.src = '';
    videoPlayer.style.display = "none";
})

videoPlayerButton.addEventListener("click", function () {
    youtubeVideo.src = 'https://www.youtube.com/embed/6mkoGSqTqFI?si=FMuvhdYmYHW5UD3F';
    videoPlayer.style.display = "flex";
})



// Counter section ////////////////////////////////////////////////////////
function counter() {
    // Function to check if an element is in the viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate counting
    function animateCounter(counter, targetCount, step = 1, delay = 30) {
        var currentCount = 0;

        function updateCounter() {
            if (currentCount < targetCount) {
                currentCount += step;
                counter.innerText = "+" + Math.round(currentCount); // Include the "+" sign
                setTimeout(updateCounter, delay);
            }
        }

        updateCounter();
    }

    // Function to handle scroll event
    function handleScroll() {
        var counters = document.querySelectorAll('.counter span');
        var counterSection = document.querySelector('.counter-wrapper');

        if (isInViewport(counterSection)) {
            // Start counting animation for each counter
            counters.forEach(function (counter) {
                var targetCount = parseInt(counter.textContent.trim()); // Use current text content as target count
                animateCounter(counter, targetCount);
            });

            // Remove the scroll event listener after starting the animation
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
}
counter();

// initializer //////////
window.addEventListener("load", () => {
    themeJS();
    languageJS();
})