var slideIndex = 0;
let confetti = [];
const fps = 30;

// Next/previous controls
const plusSlides = (n) => {
    displaySlide(slideIndex += n);
}

const displaySlide = (n) => {
    var i;
    const slides = document.getElementsByClassName("slide");
    if (n >= slides.length) {
        slideIndex = slides.length - 1;
    }
    if (n < 0) {
        slideIndex = 0;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    const slide = slides[slideIndex];
    const theStyleInQuestion = slide.style;

    theStyleInQuestion.display = "grid";
    theStyleInQuestion.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
    theStyleInQuestion.columnGap = "2rem";
    theStyleInQuestion.rowGap = "2rem";
    theStyleInQuestion.alignItems = "center";

    // unique styling based on HTML class tags
    const slideClassNames = slide.className.split(' ');

    const confetti = document.getElementById("canvas");
    if (slideClassNames.includes('confetti')) {
        confetti.style.display = "block";
        theStyleInQuestion.color = "white";

        clearInterval(refreshIntervalId); // prevent interval from getting infinitely faster
        confettiAnimation();
        refreshIntervalId = setInterval(confettiAnimation, 1000 / fps);
    } else {
        confetti.style.display = "none";
        clearInterval(refreshIntervalId);
    }

    if (slideClassNames.includes('darkTheme')) {
        document.body.style.backgroundColor = "#333333";
        theStyleInQuestion.color = "white";
    } else {
        document.body.style.backgroundColor = "white";
    }

    if (slideClassNames.includes('quote')) {
        document.body.style.backgroundColor = "#fcfcfc"; // subtle grey
    }
}

const confettiAnimation = () => {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    confetti.forEach((c) => {
        if (c.y > context.canvas.height) {
            i = confetti.indexOf(c);
            if (i !== -1) {
                confetti.splice(i, 1);
                makeCircle(-1);
            }
        }

        context.beginPath();
        context.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        context.fillStyle = c.color;
        context.fill();
        c.fall();
    });
}

const colors = ["#defde0", "#fddfdf", "#f0defd", "#def3fd", "#fcf7de"];
const changeBackgroundColor = (index) => {
    document.body.style.backgroundColor = colors[index % colors.length];
} 

const getRandomNum = (upTo) => upTo * Math.random();
const getRandomColor = () => '#' + Math.floor((1 << 24) * Math.random()).toString(16);

const makeCircle = (y) => {
    confetti.push(new Circle(getRandomNum(context.canvas.width),
        y,
        getRandomNum(6),
        getRandomColor(),
        getRandomNum(1) + 3,
        getRandomNum(.5) - .25
    ))
};

document.onkeydown = (e) => {
    const keyCode = e.keyCode;
    if (keyCode == 37) { // left
        plusSlides(-1);
    } else if (keyCode == 39) { // right
        plusSlides(1);
    }
};

window.onload = () => {
    canvas = $('#canvas')[0];
    context = canvas.getContext('2d');

    // initialize refreshIntervalId
    refreshIntervalId = setInterval(confettiAnimation, 1000 / fps);

    displaySlide(slideIndex = 0);

    for (let i = 0; i < 300; i++) {
        makeCircle(getRandomNum(context.canvas.height));
    }
}