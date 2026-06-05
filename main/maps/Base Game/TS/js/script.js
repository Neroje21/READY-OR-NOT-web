
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

document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("layout-img");
    const btn = document.getElementById("next-layout");
    const floorLabel = document.getElementById("layout-floor");

    let isFirst = true;

    btn.addEventListener("click", () => {
        if (isFirst) {
            img.src = "../../../../../IMG/map/layouts/brixley_talent_floor1.webp";
        } else {
            img.src = "../../../../../IMG/map/layouts/brixley_talent_ground.webp";
        }

        isFirst = !isFirst;
    });
});