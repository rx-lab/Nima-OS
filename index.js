// ==============================
// DATE & TIME
// ==============================

function updateDateTime() {
    const now = new Date();

    $("#time").text(
        now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        })
    );

    $("#date").text(
        now.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    );
}

updateDateTime();
setInterval(updateDateTime, 1000);


// ==============================
// LOADING
// ==============================

window.addEventListener("load", function () {

    const tl = gsap.timeline();

    tl
        // Loading text
        .to(".loading-text", {
            duration: 4,
            text: "Loading Nima OS...",
            ease: "none"
        })

        // Welcome text
        .to(".loading-text", {
            duration: 2,
            text: "Welcome to Nima OS",
            ease: "none"
        })

        // Hide loading
        .to(".loading", {
            y: "-100%",
            duration: 0.8,
            delay: 0.5,
            ease: "power2.out",

            onComplete: () => {
                $(".loading").hide();
            }
        })

        // Navbar
        .fromTo("nav",
            {
                y: -30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }
        )

        // Nima OS text
        .to("nav h1", {
            duration: 1.2,
            text: "Nima OS",
            ease: "none"
        })

        // Date & time
        .fromTo(".datetime",
            {
                opacity: 0,
                x: 20
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out"
            }
        )

        // Apps
        .fromTo(".app",
            {
                opacity: 0,
                x: -30,
                scale: 0.8
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.12,
                ease: "back.out(1.5)"
            }
        );

});


// ==============================
// GSAP PLUGINS
// ==============================

gsap.registerPlugin(Draggable, SplitText);


// ==============================
// MAIN
// ==============================

$(document).ready(function () {


    // ==============================
    // OPEN WINDOW
    // ==============================

    let topZIndex = 500;

    function openWindow(selector) {

        const win = $(selector);

        gsap.killTweensOf(win);

        topZIndex++;
        win.css("z-index", topZIndex);

        gsap.set(win, {
            display: "flex",
            scale: 0.7,
            opacity: 0
        });

        gsap.to(win, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
        });
    }


    // ==============================
    // CLOSE WINDOW
    // ==============================

    function closeWindow(button, window, dock = null) {

        $(button).click(function () {

            $(window).hide();

            if (dock) {
                $(dock).css("color", "");
            }
        });
    }


    // ==============================
    // SPLIT TEXT
    // ==============================

    const aboutSplit = new SplitText(".about-split", {
        type: "words, chars"
    });


    // ==============================
    // SETTINGS
    // ==============================

    $("#settingsbtn").click(() => {
        openWindow(".settings");
    });


    // ==============================
    // SKILLS
    // ==============================

    $("#skillsbtn").click(() => {

        openWindow(".skills");

        gsap.fromTo(
            ".skill-card",
            {
                y: 150,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.07,
                ease: "power3.out"
            }
        );

    });


    // ==============================
    // ABOUT
    // ==============================

    $("#aboutbtn, #about").click(() => {

        openWindow(".about-me");

        gsap.fromTo(
            aboutSplit.chars,
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.005,
                ease: "power3.out"
            }
        );

        $("#about").css("color", "white");

        gsap.from(".number", {
            innerText: 0,
            duration: 2,
            snap: {
                innerText: 1
            }
        });

    });


    // ==============================
    // CONTACT
    // ==============================

    $("#contactbtn, #contact").click(() => {

        openWindow(".contact");

        gsap.fromTo(
            ".email, .instagram, .telegram, .github",
            {
                scale: 0,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                stagger: 0.08,
                ease: "back.out(1.7)"
            }
        );

        $("#contact").css("color", "white");
    });


    // ==============================
    // MUSIC WINDOW
    // ==============================

    $("#music-btn, #music-dock").click(() => {

        openWindow(".music");

        $("#music-dock").css("color", "white");

    });


    // ==============================
    // PORTFOLIO
    // ==============================

    $("#portfoliobtn, #portfoliobtn-dock").click(() => {

        openWindow(".portfolio");

        gsap.fromTo(
            ".project-card",
            {
                y: 150,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.08,
                ease: "power3.out"
            }
        );

        $("#portfoliobtn-dock").css("color", "white");

    });


    // ==============================
    // FONTS
    // ==============================

    $(".setting-option-fonts").click(() => {
        openWindow(".font-window");
    });


    // ==============================
    // SETTINGS OPTIONS
    // ==============================

    $(".setting-option-background").click(() => {
        openWindow(".backgrounds");
    });

    $(".setting-option-theme").click(() => {
        openWindow(".themes");
    });


    // ==============================
    // BACKGROUNDS
    // ==============================

    const backgrounds = {
        "#set-bg-samurai": "img/desktopbg.webp",
        "#set-bg-dramatic": "img/dramatic-scenery-3840x2160-20802.webp",
        "#set-bg-bender": "img/bender-futurama-3840x2160-17539.webp",
        "#set-bg-pikachu": "img/pikachu-pixel-art-12800x7200-15216.webp",
        "#set-bg-hello": "img/hello-world-pixel-7680x4320-15168.webp"
    };

    Object.entries(backgrounds).forEach(([button, image]) => {

        $(button).click(() => {
            $("body").css(
                "background-image",
                `url('${image}')`
            );
        });

    });


    // ==============================
    // THEMES
    // ==============================

    $("#purple").click(() => {
        $("body *").not(".bottom-icon i").css("color", "purple");
    });

    $("#yellow").click(() => {
        $("body *").not(".bottom-icon i").css("color", "yellow");
    });

    $("#white").click(() => {
        $("body *").not(".bottom-icon i").css("color", "white");
    });

    $("#red").click(() => {
        $("body *").not(".bottom-icon i").css("color", "red");
    });

    $("#blue").click(() => {
        $("body *").not(".bottom-icon i").css("color", "blue");
    });


    // ==============================
    // FONTS
    // ==============================

    const fonts = {
        "#singlet": "sniglet",
        "#dynapuf": "dynapuf",
        "#michroma": "michroma",
        "#mirandsans": "mranda",
        "#monsieurl": "monsieurl",
        "#nabla": "nabla",
        "#snowburstone": "snowburstone"
    };

    Object.entries(fonts).forEach(([button, font]) => {

        $(button).click(function () {

            $("body *").not(".font-btns button").css(
                "font-family",
                `"${font}"`
            );

        });

    });


    // ==============================
    // DOCK ACTIVE ICONS
    // ==============================

    $("#aboutbtn").click(() => {
        $(".bottom-icon:first i").css("color", "white");
    });

    $("#contactbtn").click(() => {
        $(".bottom-icon:eq(1) i").css("color", "white");
    });

    $("#portfoliobtn").click(() => {
        $(".bottom-icon:eq(2) i").css("color", "white");
    });


    // ==============================
    // CLOSE BUTTONS
    // ==============================

    closeWindow(
        ".close-settings",
        ".settings"
    );

    closeWindow(
        ".close-settings-backgrounds",
        ".backgrounds"
    );

    closeWindow(
        ".close-settings-themes",
        ".themes"
    );

    closeWindow(
        ".close-settings-fonts",
        ".font-window"
    );

    closeWindow(
        ".close-settings-about",
        ".about-me",
        ".bottom-icon:first i"
    );

    closeWindow(
        ".close-settings-contact",
        ".contact",
        ".bottom-icon:eq(1) i"
    );

    closeWindow(
        ".close-settings-portfolio",
        ".portfolio",
        ".bottom-icon:eq(2) i"
    );

    closeWindow(
        ".close-settings-skills",
        ".skills"
    );

    closeWindow(
        ".close-settings-music",
        ".music",
        "#music-dock"
    );


    // ==============================
    // CLICK SOUND
    // ==============================

    const clickSound = $("#click-sound")[0];

    $(".app, .bottom-icon, button").click(function () {

        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }

    });


    // ==============================
    // MUSIC PLAYER
    // ==============================

    const songs = [

        {
            image: "img/song1.webp",
            name: "We're Finally...",
            artist: "HOME",
            audio: "music/01 Home - We re Finally Landing.m4a"
        },

        {
            image: "img/song3.webp",
            name: "After Dark",
            artist: "Mr. Kitty",
            audio: "music/09. After Dark.m4a"
        },

        {
            image: "img/song2.webp",
            name: "Resonance",
            artist: "HOME",
            audio: "music/HOME – Resonance_1_1.m4a"
        }

    ];


    const songImage = $("#song-image")[0];
    const songName = $("#song-name")[0];
    const songArtist = $("#song-artist")[0];
    const songSlider = $("#slider-song")[0];
    const playPauseBtn = $("#playpause-song")[0];
    const nextSong = $("#next-song")[0];
    const prevSong = $("#prev-song")[0];

    const audio = new Audio();

    let currentSongIndex = 0;


    // ==============================
    // UPDATE SONG
    // ==============================

    function updateSong() {

        const song = songs[currentSongIndex];

        songImage.src = song.image;
        songName.innerText = song.name;
        songArtist.innerText = song.artist;

        audio.src = song.audio;

        audio.onloadedmetadata = () => {

            songSlider.value = 0;
            songSlider.max = audio.duration;

        };

    }


    // ==============================
    // PLAY / PAUSE
    // ==============================

    playPauseBtn.addEventListener("click", function () {

        if (audio.paused) {

            audio.play();

            playPauseBtn.classList.remove("bi-play-fill");
            playPauseBtn.classList.add("bi-pause-fill");

        } else {

            audio.pause();

            playPauseBtn.classList.remove("bi-pause-fill");
            playPauseBtn.classList.add("bi-play-fill");

        }

    });


    // ==============================
    // NEXT
    // ==============================

    nextSong.addEventListener("click", function () {

        if (currentSongIndex >= songs.length - 1) return;

        currentSongIndex++;

        updateSong();

        playPauseBtn.classList.remove("bi-pause-fill");
        playPauseBtn.classList.add("bi-play-fill");

    });


    // ==============================
    // PREVIOUS
    // ==============================

    prevSong.addEventListener("click", function () {

        if (currentSongIndex <= 0) return;

        currentSongIndex--;

        updateSong();

        playPauseBtn.classList.remove("bi-pause-fill");
        playPauseBtn.classList.add("bi-play-fill");

    });


    // ==============================
    // MUSIC SLIDER
    // ==============================

    songSlider.addEventListener("input", function () {
        audio.currentTime = this.value;
    });

    audio.addEventListener("timeupdate", function () {
        songSlider.value = audio.currentTime;
    });


    // شروع آهنگ اول
    updateSong();

});


// ==============================
// DRAGGABLE WINDOWS
// ==============================

const windowsForDrag = [
    ".settings",
    ".backgrounds",
    ".themes",
    ".contact",
    ".about-me",
    ".portfolio",
    ".skills",
    ".music",
    ".app",
    ".font-window"
];

// تشخیص صحیح موبایل با استفاده از window.innerWidth
const isMobileDevice = window.innerWidth <= 768;

// فقط در دسکتاپ قابلیت درگ فعال شود
if (!isMobileDevice) {
    windowsForDrag.forEach(selector => {

        Draggable.create(selector, {
            type: "x,y",
            edgeResistance: 0.8,
            bounds: "body"
        });

    });
}