let whiteGuy = {
    name: "Whitcher",
    armor: 0.1,
    damage: 10,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/hero.png"
};

let BlackGuy = {
    name: "Black Overlord",
    armor: 0.1,
    damage: 10,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/black_Hair.png"
};

let archerEasy = {
    name: "rcher 1",
    armor: 0.1,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/skeleton.png"
};

let archerStrong = {
    name: "rcher 2",
    armor: 0.1,
    agility: 1,
    health: 100,
    type: "",
    money: 0,
    imageUrl: "./assets/img/skeleton-strong.png"
};

let hero;
let intervalHeroAtack;
let intervalHitAnim;
let intervalEnemyoAtackAnim;

function init() {

    const heroArray = [whiteGuy, BlackGuy];
    const enemyArray = [archerEasy, archerStrong];

    let heroIndex = prompt("Выберите героя 0 - Whitcher, 1 - Black Overlord");
    hero = heroArray[heroIndex];
    console.log(hero);
    document.getElementById("hero").style.backgroundImage = `url(${hero.imageUrl})`
    updateStats();

    get("atack").onclick = animateHeroAtack;
};

window.onload = function () {
    init();
};

function updateStats() {
    get("hero-name").innerHTML = " name: " + hero.name;
    get("hero-damage").innerHTML = " damage: " + hero.damage;
    get("hero-armor").innerHTML = " armor: " + hero.armor;
    get("hero-money").innerHTML = " money: " + hero.money;
    get("hero-health").innerHTML = " health: " + hero.health;
};

function get(item) {
    return document.getElementById(item)
};

function randomInteger(min, max) {
    let randomInt = min + Math.random() * (max + 1 - min);
    return Math.round(randomInt);
};

function animateHeroAtack() {
    let position = 100;
    const interval = 100;
    const diff = 425;

    get("hero").style.transform = "translate(100px, -150px)";
    intervalHeroAtack = setInterval(() => {
        get("hero").style.backgroundPosition = `-${position}px -3095px`;
        if (position < 2400) {
            position += diff;
        } else {
            position = 100;
            get("hero").style.backgroundPosition = `-${position}px -3095px`;
            get("hero").style.transform = "translate(0px, 0px)";
            animateHitScript("enemy", "damage-enemy-container", 50);

            setTimeout(() => {
                animateEnemyAtack()
            }, 2000);
            stopAnimations(intervalHeroAtack);
        }
    }, interval);
};

function animateEnemyAtack() {
    let position = 0;
    const interval = 170;
    const diff = 415;

    intervalEnemyoAtackAnim = setInterval(() => {
        get("enemy").style.backgroundPosition = `-${position}px -2505px`;

        if (position < 2000) {
            position += diff;
        } else {
            position = 0;
            get("enemy").style.backgroundPosition = `0px -2505px`;
            animateHitScript("hero", "damage-hero-container", 34);
            stopAnimations(intervalEnemyoAtackAnim);
        }
    }, interval);
};

function animateHitScript(character, damageContainer, damage) {
    let position = 0;
    const interval = 140;
    const diff = 5;
    intervalHitAnim = setInterval(() => {

        get(character).style.transform = `translate(0px, -${position}px)`;
        get(damageContainer).innerHTML = damage;
        get(damageContainer).style.display = "block";
        get(damageContainer).style.transform = `translate(0px, -${position}px)`;

        if (position < 30) {
            position += diff;
        } else {
            position = 0;
            get(character).style.transform = "translate(0px, 0px)"
            get(damageContainer).style.transform = "translate(0px, 0px)"
            get(damageContainer).style.display = "none";
            stopAnimations(intervalHitAnim);
        };
    }, interval);
}

function stopAnimations(item) {
    clearInterval(item);
};