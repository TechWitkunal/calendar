const wapper = document.querySelector(".wapper");
const innerData = document.querySelector(".inner_data");
const sideBar = document.querySelector(".side_bar");
const yearTitle = document.querySelector(".side_bar .year p");
const selectDate = document.querySelector(".side_bar .year #selectDate");
const burger = document.querySelector(".burger");
const monthsElement = document.querySelector(".side_bar .months");
const monthAll = document.querySelectorAll(".side_bar .months .month");
const eventDate = document.querySelector(".wapper .events .title");
const events = document.querySelector(".wapper .events");
const closeEvent = document.querySelector(".wapper .close_event_button");
const dropdownItem = document.querySelectorAll(".dropdown .dropdown-item");

let burgerClick = 0;
let closeEventCount = 0;


function setWidthOfCalender() {
    if (wapper.classList.contains("active_events") && !(wapper.classList.contains("active_side_bar"))) {
        innerData.style.cssText = "width: calc(100% - 380px); margin-left: -200px;";
        burger.style.left = "0";
        // console.log("not contains active side bar and contains active events");
    } else if (wapper.classList.contains("active_side_bar") && !(wapper.classList.contains("active_events"))) {
        innerData.style.cssText = "width: calc(100% - 200px)";
        burger.style.left = "200px";
        sideBar.style.boxShadow = "0 0 18px -3px rgba(0, 0, 0, .65)";
        // console.log("contains active side bar and not contains active events");
    } else {
        if (burgerClick == 1 && closeEventCount == 1) {
            // innerData.style.cssText = "width: 100%";
            innerData.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%";
            // burger.style.left = "200px";
            burger.style.cssText = "top: 0px; left: 0px";
            // sideBar.style.boxShadow = "0 0 18px -3px rgba(0, 0, 0, .65)";
        } else {
            innerData.style.cssText = "width: calc(100% - 580px); margin-left: 0px;";
            burger.style.left = "200px";
            sideBar.style.boxShadow = "0 0 18px -3px rgba(0, 0, 0, .65)";
        }
        // console.log("else");
    }
}

burger.addEventListener("click", () => {
    if (burgerClick == 0) {
        wapper.classList.remove("active_side_bar");
        sideBar.style.cssText = "transform: translateX(-100%); box-shadow: 0px";
        // sideBar.style.transform = "translateX(-100%)";
        // sideBar.style.boxShadow="";
        burgerClick++;
        setWidthOfCalender()
        // console.log("hide")
    } else {
        // console.log("show")
        wapper.classList.add("active_side_bar");
        sideBar.style.cssText = "transform: translateX(0%); box-shadow: 0 0 18px -3px rgba(0, 0, 0, .65)";

        // sideBar.style.transform = "translateX(0%)";
        // sideBar.style.boxShadow="0 0 18px -3px rgba(0, 0, 0, .65)";
        burgerClick--;
        setWidthOfCalender()
    }
})

closeEvent.addEventListener("click", () => {
    if (closeEventCount == 0) {
        wapper.classList.remove("active_events");
        closeEventCount++;
        setWidthOfCalender()
        // console.log("hide")
    } else {
        // console.log("show")
        wapper.classList.add("active_events");
        closeEventCount--;
        setWidthOfCalender()
    }
})

const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevIcon = document.querySelector(".previous_year");
const nextIcon = document.querySelector(".next_year");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();


    let daysToRenderFromLastMonth = firstDayOfMonth - 1;
    let liTag = "";
    for (let i = daysToRenderFromLastMonth; i >= 0; i--) {
        liTag += `<li class="inactive" id="${lastDateOfLastMonth - i} ${months[currMonth - 1]}, ${currYear}">${lastDateOfLastMonth - i}</li>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" id="${i} ${months[currMonth]}, ${currYear}">${i}</li>`;
    }
    let daysToRenderFromNextMonth = 6 - lastDayOfMonth;
    if (currMonth != 11) {
        for (let i = 1; i <= daysToRenderFromNextMonth; i++) {
            liTag += `<li class="inactive" id="${i} ${months[currMonth + 1]}, ${currYear}">${i}</li>`;
        }
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

    prevIcon.addEventListener("click", () => {
        currMonth--;
        if (currMonth < 0) {
            currYear--;
            currMonth = 11;
        }
        date = new Date(currYear, currMonth, new Date().getDate());
        addActiveToMonths()
        updateEventDate("No", "")
        renderCalendar();
    });

    nextIcon.addEventListener("click", () => {
        currMonth++;
        if (currMonth > 11) {
            currYear++;
            currMonth = 0;
        }
        date = new Date(currYear, currMonth, new Date().getDate());
        addActiveToMonths()
        updateEventDate("No", "")
        renderCalendar();
    });


    function updateEventDate(yesNo, value) {
        if (yesNo == "Yes") {
            eventDate.innerHTML = value + " " + months[currMonth] + " " + currYear;
            yearTitle.innerHTML = currYear;
            return;
        }
        eventDate.innerHTML = date.getDate() + " " + months[currMonth] + " " + currYear;
        yearTitle.innerHTML = currYear;
    }

    function addClass() {
        monthAll.forEach(selectElement => {
            selectElement.addEventListener("click", () => {
                currMonth = selectElement.id - 1;
                renderCalendar()
                // console.log("add class")
            })
        })
    }

    function addActiveToMonths() {
        monthAll.forEach(monthElement => {
            if (monthElement.classList.contains("active")) {
                monthElement.classList.remove("active");
            }
        });
        monthAll[currMonth].classList.add("active");
    }

    // select all the month elements
    const monthElements = document.querySelectorAll('.month');

    // loop through each month element and add a click event listener
    monthElements.forEach(function (monthElement) {
        monthElement.addEventListener('click', function () {
            // remove the active class from all the month elements
            monthElements.forEach(function (month) {
                month.classList.remove('active');
            });

            // add the active class to the clicked month element
            updateEventDate("No", "")
            monthElement.classList.add('active');
        });
        // console.log("update")
    });

    function removeActive() {
        for (let i = 0; i < dropdownItem.length; i++) {
            if (dropdownItem[i].classList.contains("active")) dropdownItem[i].classList.remove("active");
        }
    }

    function addActive(element) {
        element.classList.add("active");
    }

    const alternateStyles = document.querySelectorAll(".alternate_style")

    function bodyThemeChange(elementID) {
        alternateStyles.forEach((style) => {
            if (elementID === style.getAttribute("title")) {
                style.removeAttribute("disabled");
            }
            else {
                style.setAttribute("disabled", "true");
            }
        })
    }

    dropdownItem.forEach(element => {
        element.addEventListener("click", () => {
            removeActive()
            addActive(element)
            bodyThemeChange(element.id);
        })
    })

    selectDate.addEventListener("input", () => {
        const value = new Date(selectDate.value);
        const year = value.getFullYear();
        const month = value.getMonth() + 1;
        // console.log(year +", " + month + ", "+ value.getDate())
        currYear = value.getFullYear();
        currMonth = value.getMonth()
        updateEventDate("Yes", value.getDate())
        renderCalendar()
    })

    function callAllFunction(element, yesNo) {
        bodyThemeChange(element);
        removeActive();
        addActive(document.querySelector(`#${element}`));
        addActiveToMonths()
        setWidthOfCalender();
        renderCalendar();
        addClass();
        updateEventDate("No", "")
        if (yesNo == "closeSideBar") burger.click();
        else if (yesNo == "notCloseSideBar") {
            console.log("KJHGFD")
        } else {
            console.log("Error at line: 225 of value of yesNo variable");
        }
    }

    callAllFunction("theme2", "notCloseSideBar");