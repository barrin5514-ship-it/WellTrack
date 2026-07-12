/* ==========================================================================
   WellTrack JavaScript
   Core Front-End Application Functionality
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================================
       1. APPLICATION SETTINGS
       ====================================================================== */

    const WATER_GOAL = 128;
    const WATER_INCREMENT = 12;
    const MAX_ACTIVITY_ITEMS = 8;
    const STORAGE_KEY = "welltrack-app-data";

    /* ======================================================================
       2. HTML ELEMENTS
       ====================================================================== */

    const supplementCards = Array.from(
        document.querySelectorAll(".supplement-card")
    );

    const supplementButtons = Array.from(
        document.querySelectorAll(".supplement-card button")
    );

    const totalSupplements = supplementCards.length;

    const supplementCounter = document.querySelector(
        ".dashboard-card:nth-child(1) p"
    );

    const dashboardWaterText = document.querySelector(
        ".dashboard-card:nth-child(2) p"
    );

    const waterProgressBar = document.querySelector(
        "#water progress"
    );

    const waterSectionText = document.querySelector(
        "#water progress + p"
    );

    const waterButton = document.getElementById("water-btn");
    const resetButton = document.getElementById("reset-btn");
    const searchBar = document.getElementById("searchBar");
    const recentActivityList = document.querySelector("#history ul");
    const supplementGrid = document.querySelector(".supplement-grid");

    const quickActionButtons = Array.from(
        document.querySelectorAll(".action-buttons button")
    );

    /* ======================================================================
       3. APPLICATION STATE
       ====================================================================== */

    const today = getDateKey();

    let appState = {
        date: today,
        water: 64,
        takenSupplements: [],
        activities: []
    };

    /* ======================================================================
       4. INITIALIZE APPLICATION
       ====================================================================== */

    loadAppState();
    resetForNewDay();
    restoreInterface();
    setupEventListeners();

    /* ======================================================================
       5. EVENT LISTENERS
       ====================================================================== */

    function setupEventListeners() {

        supplementButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const card = button.closest(".supplement-card");

                if (!card || card.classList.contains("taken")) {
                    return;
                }

                const supplementName = card
                    .querySelector("h3")
                    ?.textContent
                    .trim();

                if (!supplementName) {
                    return;
                }

                if (!appState.takenSupplements.includes(supplementName)) {
                    appState.takenSupplements.push(supplementName);
                }

                markCardAsTaken(
                    card,
                    button,
                    supplementName
                );

                logActivity(
                    `✔ ${supplementName} taken — ${getCurrentTime()}`
                );

                updateSupplementCounter();
                saveAppState();

            });

        });

        if (waterButton) {

            waterButton.addEventListener("click", () => {

                if (appState.water >= WATER_GOAL) {
                    return;
                }

                const previousWater = appState.water;

                appState.water = Math.min(
                    appState.water + WATER_INCREMENT,
                    WATER_GOAL
                );

                const amountAdded =
                    appState.water - previousWater;

                updateWaterInterface();

                logActivity(
                    `💧 Water logged — ${amountAdded} oz at ${getCurrentTime()}`
                );

                saveAppState();

            });

        }

        if (searchBar) {
            searchBar.addEventListener("input", filterSupplements);
        }

        if (resetButton) {
            resetButton.addEventListener("click", resetToday);
        }

        setupQuickActions();

    }

    /* ======================================================================
       6. SUPPLEMENT TRACKING
       ====================================================================== */

    function markCardAsTaken(
        card,
        button,
        supplementName
    ) {

        card.classList.add("taken");

        button.textContent = "✔ Taken";
        button.disabled = true;

        button.setAttribute("aria-pressed", "true");

        button.setAttribute(
            "aria-label",
            `${supplementName} has been marked as taken`
        );

    }

    function updateSupplementCounter() {

        const completedCount =
            appState.takenSupplements.length;

        if (supplementCounter) {
            supplementCounter.textContent =
                `${completedCount} / ${totalSupplements}`;
        }

    }

    /* ======================================================================
       7. HYDRATION TRACKING
       ====================================================================== */

    function updateWaterInterface() {

        if (dashboardWaterText) {
            dashboardWaterText.textContent =
                `${appState.water} oz`;
        }

        if (waterProgressBar) {

            waterProgressBar.max = WATER_GOAL;
            waterProgressBar.value = appState.water;

            waterProgressBar.setAttribute(
                "aria-label",
                "Daily water intake"
            );

            waterProgressBar.setAttribute(
                "aria-valuenow",
                String(appState.water)
            );

            waterProgressBar.setAttribute(
                "aria-valuemin",
                "0"
            );

            waterProgressBar.setAttribute(
                "aria-valuemax",
                String(WATER_GOAL)
            );

        }

        if (waterSectionText) {
            waterSectionText.textContent =
                `${appState.water} oz / ${WATER_GOAL} oz`;
        }

        if (waterButton) {

            const goalReached =
                appState.water >= WATER_GOAL;

            waterButton.disabled = goalReached;

            waterButton.textContent = goalReached
                ? "✓ Water Goal Reached"
                : `➕ Add ${WATER_INCREMENT} oz`;

        }

    }

    /* ======================================================================
       8. SUPPLEMENT SEARCH
       ====================================================================== */

    function filterSupplements() {

        if (!searchBar) {
            return;
        }

        const searchText =
            searchBar.value.trim().toLowerCase();

        let visibleCards = 0;

        supplementCards.forEach((card) => {

            const cardText =
                card.textContent.toLowerCase();

            const matches =
                cardText.includes(searchText);

            card.style.display = matches ? "" : "none";

            if (matches) {
                visibleCards++;
            }

        });

        updateEmptySearchMessage(
            visibleCards,
            searchText
        );

    }

    function updateEmptySearchMessage(
        visibleCards,
        searchText
    ) {

        if (!supplementGrid) {
            return;
        }

        let message = document.getElementById(
            "empty-search-message"
        );

        if (!message) {

            message = document.createElement("p");

            message.id = "empty-search-message";
            message.className = "empty-message";

            message.textContent =
                "No supplements matched your search.";

            supplementGrid.insertAdjacentElement(
                "afterend",
                message
            );

        }

        const showMessage =
            searchText !== "" && visibleCards === 0;

        message.style.display =
            showMessage ? "block" : "none";

    }

    /* ======================================================================
       9. RECENT ACTIVITY
       ====================================================================== */

    function logActivity(text) {

        const activity = {
            text,
            timestamp: Date.now()
        };

        appState.activities.unshift(activity);

        appState.activities =
            appState.activities.slice(
                0,
                MAX_ACTIVITY_ITEMS
            );

        renderActivities();

    }

    function renderActivities() {

        if (!recentActivityList) {
            return;
        }

        recentActivityList.innerHTML = "";

        if (appState.activities.length === 0) {

            const emptyItem =
                document.createElement("li");

            emptyItem.textContent =
                "No activity has been recorded today.";

            recentActivityList.appendChild(
                emptyItem
            );

            return;

        }

        appState.activities.forEach((activity) => {

            const listItem =
                document.createElement("li");

            listItem.textContent =
                activity.text;

            recentActivityList.appendChild(
                listItem
            );

        });

    }

    /* ======================================================================
       10. QUICK ACTION BUTTONS
       ====================================================================== */

    function setupQuickActions() {

        quickActionButtons.forEach((button) => {

            if (button.id === "reset-btn") {
                return;
            }

            const buttonText =
                button.textContent.trim().toLowerCase();

            if (buttonText.includes("log water")) {

                button.addEventListener("click", () => {

                    if (waterButton) {
                        waterButton.click();
                    }

                    document
                        .getElementById("water")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                });

            }

            if (buttonText.includes("view schedule")) {

                button.addEventListener("click", () => {

                    document
                        .getElementById("today")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                });

            }

            if (buttonText.includes("add supplement")) {

                button.addEventListener("click", () => {

                    showDemoMessage(
                        "Adding custom supplements is planned for a future version."
                    );

                });

            }

            if (buttonText.includes("add medication")) {

                button.addEventListener("click", () => {

                    showDemoMessage(
                        "Medication entry is planned for a future version."
                    );

                });

            }

        });

    }

    function showDemoMessage(message) {

        let notification =
            document.getElementById("demo-notification");

        if (!notification) {

            notification =
                document.createElement("div");

            notification.id = "demo-notification";

            notification.setAttribute(
                "role",
                "status"
            );

            notification.setAttribute(
                "aria-live",
                "polite"
            );

            Object.assign(
                notification.style,
                {
                    position: "fixed",
                    right: "20px",
                    bottom: "20px",
                    maxWidth: "320px",
                    padding: "15px 18px",
                    borderRadius: "10px",
                    background: "#1b5e20",
                    color: "#ffffff",
                    boxShadow:
                        "0 8px 20px rgba(0, 0, 0, 0.2)",
                    zIndex: "2000"
                }
            );

            document.body.appendChild(notification);

        }

        notification.textContent = message;
        notification.hidden = false;

        window.clearTimeout(
            notification.hideTimer
        );

        notification.hideTimer =
            window.setTimeout(() => {
                notification.hidden = true;
            }, 3500);

    }

    /* ======================================================================
       11. RESTORE SAVED INTERFACE
       ====================================================================== */

    function restoreInterface() {

        const availableNames =
            supplementCards
                .map((card) =>
                    card
                        .querySelector("h3")
                        ?.textContent
                        .trim()
                )
                .filter(Boolean);

        appState.takenSupplements =
            appState.takenSupplements.filter(
                (name) =>
                    availableNames.includes(name)
            );

        supplementCards.forEach((card) => {

            const supplementName = card
                .querySelector("h3")
                ?.textContent
                .trim();

            const button =
                card.querySelector("button");

            if (
                supplementName &&
                button &&
                appState.takenSupplements.includes(
                    supplementName
                )
            ) {

                markCardAsTaken(
                    card,
                    button,
                    supplementName
                );

            } else if (button) {

                card.classList.remove("taken");

                button.textContent =
                    "✔ Mark Taken";

                button.disabled = false;

                button.setAttribute(
                    "aria-pressed",
                    "false"
                );

                if (supplementName) {

                    button.setAttribute(
                        "aria-label",
                        `Mark ${supplementName} as taken`
                    );

                }

            }

        });

        updateSupplementCounter();
        updateWaterInterface();
        renderActivities();
        saveAppState();

    }

    /* ======================================================================
       12. AUTOMATIC DAILY RESET
       ====================================================================== */

    function resetForNewDay() {

        if (appState.date === today) {
            return;
        }

        appState = {
            date: today,
            water: 0,
            takenSupplements: [],
            activities: []
        };

        saveAppState();

    }

    /* ======================================================================
       13. MANUAL RESET
       ====================================================================== */

    function resetToday() {

        const confirmed = window.confirm(
            "Reset all supplement, hydration, and activity progress for today?"
        );

        if (!confirmed) {
            return;
        }

        appState = {
            date: today,
            water: 0,
            takenSupplements: [],
            activities: []
        };

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {

            console.error(
                "WellTrack could not clear its saved data:",
                error
            );

        }

        if (searchBar) {
            searchBar.value = "";
        }

        supplementCards.forEach((card) => {
            card.style.display = "";
        });

        const emptySearchMessage =
            document.getElementById(
                "empty-search-message"
            );

        if (emptySearchMessage) {
            emptySearchMessage.style.display = "none";
        }

        restoreInterface();

        showDemoMessage(
            "Today's progress has been reset."
        );

        document
            .getElementById("dashboard")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    }

    /* ======================================================================
       14. LOCAL STORAGE
       ====================================================================== */

    function saveAppState() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(appState)
            );

        } catch (error) {

            console.error(
                "WellTrack could not save its data:",
                error
            );

        }

    }

    function loadAppState() {

        try {

            const savedData =
                localStorage.getItem(STORAGE_KEY);

            if (!savedData) {
                return;
            }

            const parsedData =
                JSON.parse(savedData);

            appState = {

                date:
                    typeof parsedData.date === "string"
                        ? parsedData.date
                        : today,

                water:
                    Number.isFinite(parsedData.water)
                        ? Math.min(
                            Math.max(
                                parsedData.water,
                                0
                            ),
                            WATER_GOAL
                        )
                        : 64,

                takenSupplements:
                    Array.isArray(
                        parsedData.takenSupplements
                    )
                        ? parsedData.takenSupplements
                        : [],

                activities:
                    Array.isArray(
                        parsedData.activities
                    )
                        ? parsedData.activities.slice(
                            0,
                            MAX_ACTIVITY_ITEMS
                        )
                        : []

            };

        } catch (error) {

            console.error(
                "WellTrack could not load saved data:",
                error
            );

            localStorage.removeItem(
                STORAGE_KEY
            );

        }

    }

    /* ======================================================================
       15. DATE AND TIME UTILITIES
       ====================================================================== */

    function getDateKey() {

        const now = new Date();

        const year =
            now.getFullYear();

        const month = String(
            now.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            now.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }

    function getCurrentTime() {

        return new Date().toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

    }

});