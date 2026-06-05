
const arrowDown = document.getElementById('arrow-down');
const arrowUp = document.getElementById('arrow-up');
const section2 = document.getElementById('mission-layout');

window.addEventListener('scroll', () => {
    const inSection2 = window.scrollY >= section2.offsetTop - 50;

    arrowDown.style.opacity = inSection2 ? '0' : '0.7';
    arrowDown.style.pointerEvents = inSection2 ? 'none' : 'auto';

    arrowUp.style.opacity = inSection2 ? '0.7' : '0';
    arrowUp.style.pointerEvents = inSection2 ? 'auto' : 'none';
});

arrowDown.addEventListener('click', () => {
    section2.scrollIntoView({ behavior: 'smooth' });
});

arrowUp.addEventListener('click', () => {
    document.getElementById('mission-info').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener("DOMContentLoaded", function () {
    const img = document.getElementById("layout-img");
    const btn = document.getElementById("next-layout");
    const floorLabel = document.getElementById("layout-floor");

    if (!img || !btn || !floorLabel) return;

    const layouts = [
        "../../../../../IMG/map/layouts/clemente_hotel_floor1.webp",
        "../../../../../IMG/map/layouts/clemente_hotel_floor2.webp",
        "../../../../../IMG/map/layouts/clemente_hotel_roof.webp",
    ];

    const floorNames = [
        "Floor 1",
        "Floor 2",
        "Floor 3"
    ];

    let currentIndex = 0;

    btn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % layouts.length;
        img.src = layouts[currentIndex];
        floorLabel.textContent = floorNames[currentIndex];
    });
});