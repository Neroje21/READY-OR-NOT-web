
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

    if (!img || !btn) return;

    const layouts = [
        "../../../IMG/layouts/23_mb_ground.png",
        "../../../IMG/layouts/23_mb_floor1.png",
        "../../../IMG/layouts/23_mb_floor2.png",
    ];

    let currentIndex = 0;

    btn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % layouts.length;
        img.src = layouts[currentIndex];
    });
});