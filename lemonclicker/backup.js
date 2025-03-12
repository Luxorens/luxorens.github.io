            var score = 0;
            var clickingPower = 1;

            var standCost = 15;
            var stands = 0;
            var friendCost = 100;
            var friends = 0;
            var storeCost = 1000;
            var stores = 0;

            function buyStand() {
                if (score >= standCost) {
                    score = score - standCost;
                    stands = stands + 1;
                    standCost = Math.round(standCost * 1.15);
                    document.getElementById("score").innerHTML = score;
                    document.getElementById("standcost").innerHTML = standCost;
                    document.getElementById("stands").innerHTML = stands;
                    updateScorePerSecond();
                }
            }

            function buyFriend() {
                if (score >= friendCost) {
                    score = score - friendCost;
                    friends = friends + 1;
                    friendCost = Math.round(friendCost * 1.15);
                    document.getElementById("score").innerHTML = score;
                    document.getElementById("friendcost").innerHTML = friendCost;
                    document.getElementById("friends").innerHTML = friends;
                    updateScorePerSecond();
                }
            }

            function buyStore() {
                if (score >= storeCost) {
                    score = score - storeCost;
                    stores = stores + 1;
                    storeCost = Math.round(storeCost * 1.15);
                    document.getElementById("score").innerHTML = score;
                    document.getElementById("storecost").innerHTML = storeCost;
                    document.getElementById("stores").innerHTML = stores;
                    updateScorePerSecond();
                }
            }

            function addToScore(amount) {
                score = score + amount;
                document.getElementById("score").innerHTML = score;
            }

            function updateScorePerSecond() {
                scorePerSecond = stands + friends * 5;
                document.getElementById("scorepersecond").innerHTML = scorePerSecond;
            }

            function loadGame() {
                var savedGame = JSON.parse(localStorage.getItem("gameSave"));
                if (typeof savedGame.score !== "undefined") score = savedGame.score;
                if (typeof savedGame.clickingPower !== "undefined") score = savedGame.clickingPower;
                if (typeof savedGame.standCost !== "undefined") score = savedGame.standCost;
                if (typeof savedGame.stands !== "undefined") score = savedGame.stands;
                if (typeof savedGame.friendCost !== "undefined") score = savedGame.friendCost;
                if (typeof savedGame.friends !== "undefined") score = savedGame.friends;
                if (typeof savedGame.storeCost !== "undefined") score = savedGame.storeCost;
                if (typeof savedGame.stores !== "undefined") score = savedGame.stores;
            }

            function saveGame() {
                var gameSave = {
                    score: score,
                    clickingPower: clickingPower,
                    standCost: standCost,
                    stands: stands,
                    friendCost: friendCost,
                    friends: friends,
                    storeCost: storeCost,
                    stores: stores
                };
                localStorage.setItem("gameSave", JSON.stringify(gameSave));
            }

            function resetGame() {
                if (confirm("Are you sure you want to reset your game?")) {
                    var gameSave = {};
                    localStorage.setItem("gameSave", JSON.stringify(gameSave));
                    location.reload();
                }
            }

            window.onload = function() {
                loadGame();
                updateScorePerSecond();
                document.getElementById("score").innerHTML = score;
                document.getElementById("standcost").innerHTML = standCost;
                document.getElementById("stands").innerHTML = stands;
                document.getElementById("friendcost").innerHTML = friendCost;
                document.getElementById("friends").innerHTML = friends;    
                document.getElementById("storecost").innerHTML = storeCost;
                document.getElementById("stores").innerHTML = stores;

            };

            setInterval(function() {
                score = score + stands;
                score = score + friends * 5;
                score = score + stores * 70;
                document.getElementById("score").innerHTML = score;

                document.title = score + " lemons - Lemon Clicker"
            }, 1000); // 1000ms = 1 second

            setInterval(function() {
                saveGame();
            }, 30000); //30000ms = 30 seconds

            document.addEventListener("keydown", function(event) {
                if (event.ctrlKey && event.which == 83) { // ctrl + s
                    event.preventDefault();
                }
            }, false);