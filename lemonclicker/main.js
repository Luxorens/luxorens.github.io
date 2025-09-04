

function formatNumber(number) {
    if (number >= 1e12) {
        return (number / 1e12).toFixed(1) + 'T'; // Trillions
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + 'B'; // Billions
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + 'M'; // Millions
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + 'K'; // Thousands
    } else {
        return number.toString(); // Less than 1000
    }
}

//game settings
var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.22,
    increment: 1,

    addToScore: function(amount) {

        this.score += amount;
        this.totalScore += amount;
        updateBuildingVisibility();
        display.updateScore();
        display.updateShop();
        display.updateUpgrades();
    },

    getScorePerSecond: function() {
        var getScorePerSecond = 0;
        for (i = 0; i < building.name.length; i++) {
            getScorePerSecond += building.income[i] * building.count[i];
        }
        return getScorePerSecond;
    },

    addLemons: function(amount) {
        this.score += amount;
        console.log(`${amount} lemons added! You now have ${this.score} lemons.`);
        document.getElementById("score").textContent = "Lemons: " + this.score;
    },

    freeLemons: function() {
        console.log("up on a hill, that's where we begin");
    },

    devtag: function() {
        console.log("DEV-TAG: WEBSITE IS A WORK OF LUXORENS 2025. ALL IMAGES (exception: lemon button) ARE PROPERTY OF LUXORENS. ALL CODE IS PROPERTY OF LUXORENS. SWEETALERT2 IS USED UNDER FAIR CONDITIONS");
    },

    setLemons: function(amount) {
        this.score = amount;
        console.log(`Lemon count set to ${this.score}.`);
        document.getElementById("score").textContent = "Lemons: " + this.score;
    },

    resetLemons: function() {
        this.score = 0;
        console.log("Lemons have been reset.");
        document.getElementById("score").textContent = "Lemons: " + this.score;
    }
};

//achievements
var achievements = {
    number: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
    ],
    name: [
        "Business Starter",
        "Stands Galore",
        "Rich in lemons",
        "Famous Economist",
        "Retired",
        "Town Mayor"
    ],
    description: [
        "Produce 100 lemons",
        "Own 100 buildings",
        "Produce 10K lemons",
        "Produce 100K lemons",
        "Produce 1 million lemons",
        "Own 1000 buildings"
    ],
    image: [
        "businessstarter.png",
        "standsgalore.png",
        "richinlemons.png",
        "placeholder.png",
        "placeholder.png",
        "placeholder.png"
    ],
    requirement: [
        { type: "lemons", value: 100},
        { type: "buildings", value: 100},
        { type: "lemons", value: 10000},
        { type: "lemons", value: 100000},
        { type: "lemons", value: 1000000},
        { type: "buildings", value: 1000}
    ],
    unlocked: [false, false, false, false, false, false]
};

//buildings
var building = {
    name: [
        "Stand",
        "Friend",
        "Tree",
        "Store",
        "Factory",
        "Bank",
        "Mine"
    ],
    description: [
        "Run a stand",
        "Hire some friends to help",
        "Grow your own lemons",
        "Open a lemon store",
        "Mass-produce lemons",
        "Start a lemon economy",
        "Mine for lemons"
    ],
    image: [
        "lemonadestand.png",
        "friend.png",
        "tree.png",
        "store.png",
        "factory.png",
        "bank.png",
        "mineco.png"
    ],
    count: [0, 0, 0, 0, 0, 0, 0],
    income: [
        1,
        5,
        10,
        20,
        50,
        300,
        600
    ],
    cost: [
        15,
        100,
        500,
        1000,
        15000,
        600000,
        1000000
    ],
    unlockRequirement: [0, 0, 50, 100, 1000, 10000, 20000],
    isVisible: [false, false, false, false, false, false, false],

    purchase: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.15);
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
        }
    }
};

//upgrades
var upgrade = {
    name: [
        "Discount",
        "Quick Fingers I",
        "Quick Fingers II"
    ],
    description: [
        "Lemonade Stands are twice as efficient",
        "Doubles your clicks",
        "Doubles your clicks"
    ],
    image: [
        "discount.png",
        "quickfingers1.png",
        "quickfingers2.png"
    ],
    type: [
        "building",
        "lemons",
        "lemons"
    ],
    cost: [
        300,
        15000,
        500000
    ],
    buildingIndex: [
        0,
        null,
        null
    ],
    requirement: [
        10,
        1000,
        100000
    ],
    bonus: [
        2,
        2,
        2
    ],
    purchased: [false, false, false],

    purchase: function(index) {
        if (!this.purchased[index] && game.score >= this.cost[index]) {
            let canPurchase = false;

            if (this.type[index] === "building" &&
                building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                canPurchase = true;
                building.income[this.buildingIndex[index]] *= this.bonus[index];
            } else if (this.type[index] === "lemons" &&
                       game.totalScore >= this.requirement[index]) {
                canPurchase = true;
                game.clickValue *= this.bonus[index]; // doubles click value
            }

            if (canPurchase) {
                game.score -= this.cost[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();

                // Hide tooltip immediately after purchase
                document.getElementById("upgradeTooltip").style.display = "none";
            }
        }
    }
};

var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = formatNumber(game.score);
        document.getElementById("scorepersecond").innerHTML = formatNumber(game.getScorePerSecond());
        document.title = formatNumber(game.score) + " lemons - Lemon Clicker";
    },

updateShop: function() {
    const container = document.getElementById("shopContainer");
    container.innerHTML = "";

    for (let i = 0; i < building.name.length; i++) {
        if (game.score >= building.unlockRequirement[i]) {
            building.isVisible[i] = true;
        }

        if (building.isVisible[i]) {
            const table = document.createElement("table");
            table.className = "shopButton unselectable";
            table.onclick = () => building.purchase(i);

            table.innerHTML =
                '<tr>' +
                '<td id="image"><img src="images/' + building.image[i] + '"></td>' +
                '<td id="nameAndCost">' +
                '<p>' + building.name[i] + '</p>' +
                '<p><span>' + formatNumber(building.cost[i]) + '</span> lemons</p>' +
                '</td>' +
                '<td id="amount"><span>' + building.count[i] + '</span></td>' +
                '</tr>';

            table.addEventListener("mouseenter", () => {
                const tooltip = document.getElementById("buildingTooltip");
                tooltip.innerHTML = `
                    <strong>${building.name[i]}</strong><br>
                    Cost: ${formatNumber(building.cost[i])} lemons<br>
                    ${building.description[i]}
                `;

                // Make tooltip visible offscreen to measure it
                tooltip.style.display = "block";
                tooltip.style.left = "-9999px";

                const rect = table.getBoundingClientRect();
                const tooltipWidth = tooltip.offsetWidth;

                // Position tooltip to the left of the table, but keep it on screen
                let left = rect.left + window.scrollX - tooltipWidth - 10;
                if (left < 0) left = rect.right + 10; // fallback: put on the right if too far left

                tooltip.style.left = left + "px";
                tooltip.style.top = rect.top + window.scrollY + "px";
            });

            table.addEventListener("mouseleave", () => {
                document.getElementById("buildingTooltip").style.display = "none";
            });

            container.appendChild(table);
        }
    }
},

updateUpgrades: function() {
    const container = document.getElementById("upgradeContainer");
    container.innerHTML = "";

    for (let i = 0; i < upgrade.name.length; i++) {
        if (!upgrade.purchased[i]) {
            let upgradeAvailable = false;

            if (
                upgrade.type[i] === "building" &&
                building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]
            ) {
                upgradeAvailable = true;
            } else if (
                upgrade.type[i] === "lemons" &&
                game.totalScore >= upgrade.requirement[i]
            ) {
                upgradeAvailable = true;
            }

            if (upgradeAvailable) {
                // make grid item instead of card
                const div = document.createElement("div");
                div.className = "upgradeIcon";
                div.onclick = () => upgrade.purchase(i);

                const img = document.createElement("img");
                img.src = `images/${upgrade.image[i]}`;
                img.alt = upgrade.name[i];
                img.width = 48;
                img.height = 48;
                div.appendChild(img);

                // tooltip handling
                div.addEventListener("mouseenter", () => {
                    const tooltip = document.getElementById("upgradeTooltip");
                    tooltip.innerHTML = `
                        <strong>${upgrade.name[i]}</strong><br>
                        Cost: ${formatNumber(upgrade.cost[i])} lemons<br>
                        ${upgrade.description[i]}
                    `;
                    tooltip.style.top = div.offsetTop + "px";
                    tooltip.style.display = "block";
                });

                div.addEventListener("mouseleave", () => {
                    document.getElementById("upgradeTooltip").style.display = "none";
                });

                container.appendChild(div);
            }
        }
    }
},

    
    updateAchievements: function() {
        document.getElementById("achievementsContainer").innerHTML = "";
        
        for (let i = 0; i < achievements.name.length; i++) {
            let achievementItem = document.createElement('div');
            achievementItem.className = 'achievementItem';

            if (achievements.unlocked[i]) {
                achievementItem.innerHTML = `
                    <img src="images/${achievements.image[i]}" alt="${achievements.name[i]}">
                    <div class="achievementDetails">
                        <p class="achievementName">${achievements.name[i]}</p>
                        <p class="achievementDescription">${achievements.description[i]}</p>
                    </div>`;
            } else {
                achievementItem.innerHTML = `
                    <img src="images/locked.png" alt="Locked">
                    <div class="achievementDetails">
                        <p class="achievementName">${achievements.name[i]}</p>
                        <p class="achievementDescription">${achievements.description[i]}</p>
                    </div>`;
            }

            document.getElementById("achievementsContainer").appendChild(achievementItem);
        }
    }
    
};

function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased, // Make sure this is saved
        achievementsUnlocked: achievements.unlocked
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
    console.log("Game saved successfully");
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Game saved"
      });
}


function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    
    if (savedGame !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.achievementsUnlocked !== "undefined") achievements.unlocked = savedGame.achievementsUnlocked; // Load the unlocked achievements

        if (typeof savedGame.buildingCount !== "undefined") {
            for (let i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }

        if (typeof savedGame.buildingIncome !== "undefined") {
            for (let i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }

        if (typeof savedGame.buildingCost !== "undefined") {
            for (let i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }

        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (let i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }

        console.log("Game loaded successfully");
    }
}


function resetGame() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Reset"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          var gameSave = {};
          localStorage.setItem("gameSave", JSON.stringify(gameSave));
          localStorage.removeItem("achievementsUnlocked");
          localStorage.removeItem("achievementContainerHTML");
          achievements.unlocked = [false];
          document.getElementById("achievementContainer").innerHTML = "<h3>Achievements</h3>";
          location.reload();
        }
      });
}

function updateBuildingVisibility() {
    for (let i = 0; i < building.name.length; i++) {
        if (game.score >= building.unlockRequirement[i]) {
            building.isVisible[i] = true;
        }
    }
}

function unlockAchievement(index) {
    achievements.unlocked[index] = true;
    const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        imageUrl: "images/" + achievements.image[index],
        title: achievements.name[index] + " unlocked!",
        text: achievements.description[index]
      });

    // Optionally, you can display unlocked achievements in a dedicated section of the game.
    document.getElementById("achievementContainer").innerHTML += `
    <div class="tooltip">
        <img style="cursor:help;" id="${achievements.number[index]}" src="images/${achievements.image[index]}" alt="achievement">
            <span class="tooltiptext"><b>${achievements.name[index]}</b><br>${achievements.description[index]}</span>
    </div>`;
        saveAchievements();
}

function saveAchievements () {
    localStorage.setItem("achievementsUnlocked", JSON.stringify(achievements.unlocked));
    localStorage.setItem("achievementContainerHTML", document.getElementById("achievementContainer").innerHTML);
}

function loadAchievements() {
    let savedAchievements = JSON.parse(localStorage.getItem("achievementsUnlocked"));
    if (savedAchievements !== null) {
        achievements.unlocked = savedAchievements;
    }

    let savedAchievementHTML = localStorage.getItem("achievementContainerHTML");
    if (savedAchievementHTML !== null) {
        document.getElementById("achievementContainer").innerHTML = savedAchievementHTML;
    }
}

function checkAchievements() {
    for (let i = 0; i < achievements.name.length; i++) {
        if (!achievements.unlocked[i]) {
            let requirement = achievements.requirement[i];
            
            if (requirement.type === "clicks" && game.totalClicks >= requirement.value) {
                unlockAchievement(i);
            } else if (requirement.type === "lemons" && game.totalScore >= requirement.value) {
                unlockAchievement(i);
            } else if (requirement.type === "buildings" && building.count.reduce((a, b) => a + b, 0) >= requirement.value) {
                unlockAchievement(i);
            }
        }
    }
}

function toggleAchievements() {
    var x = document.getElementById("achievementPreContainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function messageSent() {
    document.getElementById("submitform").style.display = "none";
    document.getElementById("submittext").innerHTML = "Bug submitted";
}

function closeAchievements() {
    document.getElementById("achievementPreContainer").style.display = "none";
}

function showClickEffect(text) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = text;
    clickerContainer.appendChild(effect);

    const rect = clicker.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY - rect.top;
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';

    effect.style.animation = 'float-up 0.5s ease-out forwards';

    effect.addEventListener('animationend', () => {
        effect.remove();
    });
}

function earlyaccess() {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: "WARNING: GAME IN VERY EARLY ACCESS",
        text: "Bugs, compatibility issues and fatal errors may occur! YOU MAY LOSE YOUR SAVE DATA IN A FUTURE UPDATE",
        showConfirmButton: true,
        confirmButtonText: 'I accept the risk'
      });
}

const clicker = document.getElementById('clicker');
const clickerContainer = document.querySelector('.clickerContainer');
const style = document.createElement('style');
style.textContent = `
    .click-effect {
        position: absolute;
        color:rgb(0, 0, 0);
        font-size: 25px;
        font-weight: bold;
        pointer-events: none;
        transform: translate(-50%, 0%);
    }

    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translate(-50%, 0px);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -100px);
        }
    }
`;
document.head.appendChild(style);

document.getElementById("clicker").addEventListener("click", function() {
    game.totalClicks++;
    showClickEffect('+');
    game.addToScore(game.clickValue);
}, false);

window.onload = function() {
    loadGame();
    loadAchievements();
    updateBuildingVisibility();
    display.updateScore();
    display.updateUpgrades();
    display.updateShop();
};

window.onclick = function(event) {
    let modal = document.getElementById("achievementPreContainer");
    if (event.target == modal) {
        closeAchievements();
    }
}

setInterval(function() {
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    display.updateScore();
    checkAchievements();
}, 1000); // 1000ms = 1 second

setInterval(function() {
    display.updateScore();
}, 10000);

setInterval(function() {
    saveGame();
}, 30000); //30000ms = 30 seconds

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { // ctrl + s
        event.preventDefault();
        saveGame();
    }
}, false);

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.shiftKey && event.which == 90) { // ctrl + shift + z
        Swal.fire({
            icon: "info",
            title: "Console Commands",
            text: "game.addLemons(count); game.setLemons(count); game.resetLemons();"
        });
    }
}, false);

document.addEventListener("DOMContentLoaded", function() {
    // check if the user has visited the site before
    if (!localStorage.getItem('hasVisited')) {
        // will only run first visit
        Swal.fire({
            position: "top-end",
            icon: "info",
            title: "Welcome to Lemon Clicker",
            text: "Use Ctrl-S to save and M to close achievements list if the screen gets too cluttered. Game saves every 30 seconds.",
            showConfirmButton: true
          }).then((result => {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "WARNING: GAME IN VERY EARLY ACCESS",
                text: "Bugs, compatibility issues and fatal errors may occur! YOU MAY LOSE YOUR SAVE DATA IN A FUTURE UPDATE",
                showConfirmButton: true,
                confirmButtonText: 'I accept the risk'
              });
          }));
        //flags that the user has visited
        localStorage.setItem('hasVisited', 'true');
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "info",
            title: "Welcome back!",
            text: "Press I to view list of commands if you forgot them"
          });
    }
});

document.addEventListener("keydown", function(event) {
    if (event.which == 13) {
        game.totalClicks++;
        game.addToScore(game.clickValue);
        checkAchievements();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.which == 73) {
        Swal.fire({
            position: "top-end",
            icon: "info",
            title: "Welcome to Lemon Clicker",
            text: "Use Ctrl-S to save and M to open/close achievements. Game saves every 30 seconds.",
            showConfirmButton: true
          });
    }
}, false);

document.addEventListener("keydown", function(event) {
    if (event.which == 77) {
        toggleAchievements();
    }
})

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        lastTimeVisible = new Date().getTime();
    } else {
        let currentTime = new Date().getTime();
        let timeAway = (currentTime - lastTimeVisible) / 1000; // Time in seconds

        let wholeTimeAway = Math.round(timeAway);

        let lemonsProduced = game.getScorePerSecond() * wholeTimeAway;

        game.score += lemonsProduced;
        game.totalScore += lemonsProduced;

        display.updateScore();

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "info",
            title: `You produced ${formatNumber(lemonsProduced)} lemons while you were AFK.`
          });
    }

});
