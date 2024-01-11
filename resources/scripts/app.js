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
                } else {
                    body.style.fontFamily = 'Vazirmatn, sans-serif';
                    body.style.direction = 'rtl';
                    hero.setAttribute('dir', "rtl");
                    aboutImage.setAttribute('dir', "rtl");
                    button.forEach(element => {
                        element.setAttribute('dir', "rtl");
                    });
                }

                // titleOfDropdowns = {
                //     'allCategory': data[language].categories,
                //     'allProduct': data[language].products,
                //     'selected': data[language].selected,
                // };
                // console.log(titleOfDropdowns);


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

    function sliderMaker(sliderindex) {
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
            sliderMaker(sliderindex);
        }, 2000);
    }
    sliderMaker(sliderindex);

});
