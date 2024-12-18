//get the data

let users = [
    {
        profilePic: "images/p1.webp",
        displayPic: "images/d1.webp",
        pendingMsg: 9,
        location: "Peshawar, Pakistan",
        name: "Alex",
        age: 19,
        interests: [{
            icon: `<i class="text-sm ri-music-2-fill"></i>`,
            interest: "music",
        },
        {
            icon: `<i class="text-sm ri-football-line"></i>`,
            interest: "football",
        },
        ],
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut libero, vitae fugit rerum voluptate omnis.",
        isFriend: null
    },
    {
        profilePic: "images/p2.webp",
        displayPic: "images/d2.webp",
        pendingMsg: 3,
        location: "karachi, Pakistan",
        name: "Jack",
        age: 17,
        interests: [{
            icon: `<i class="text-sm ri-music-2-fill"></i>`,
            interest: "music",
        },
        {
            icon: `<i class="text-sm ri-roadster-fill"></i>`,
            interest: "driving",
        },
        ],
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut libero.",
        isFriend: null
    },
    {
        profilePic: "images/p3.webp",
        displayPic: "images/d3.webp",
        pendingMsg: 7,
        location: "Peshawar, Pakistan",
        name: "Jamal",
        age: 24,
        interests: [{
            icon: `<i class="text-sm ri-music-2-fill"></i>`,
            interest: "music",
        },
        {
            icon: `<i class="text-sm  ri-camera-fill"></i>`,
            interest: "photography",
        },
        ],
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut libero, vitae fugit rerum voluptate omnis.",
        isFriend: null
    },
    {
        profilePic: "images/p4.webp",
        displayPic: "images/d4.webp",
        pendingMsg: 1,
        location: "Islamabad, Pakistan",
        name: "Aditya",
        age: 21,
        interests: [{
            icon: `<i class="text-sm ri-music-2-fill"></i>`,
            interest: "music",
        },
        {
            icon: `<i class="text-sm ri-brush-ai-fill"></i>`,
            interest: "painting",
        },
        ],
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut libero, vitae fugit rerum voluptate omnis.",
        isFriend: null
    },
]

// no need to write DQS every time
function select(elem) {
    return document.querySelector(elem);
}

let curr = 0;
let isAnimating = false;

function setData(index) {
    select(".nav img").src = users[index].profilePic;
    select(".bages h5").textContent = users[index].pendingMsg;
    select(".location h3").textContent = users[index].location;
    select(".name h1:nth-child(1)").textContent = users[index].name;
    select(".name h1:nth-child(2)").textContent = users[index].age;

    let clutter = "";
    users[index].interests.forEach((interest) => {
        clutter += ` <div class="tag flex items-center gap-3 bg-white/30 rounded-full px-3 py-1">
                            ${interest.icon} <h3 class="text-sm tracking-tight">${interest.interest}</h3>
                     </div>`
    });
    select(".tags").innerHTML = clutter;

    select(".bio p").textContent = users[index].bio;
}

(function setInitial() {
    select(".mainCard img").src = users[curr].displayPic;
    select(".incommingCard img").src = users[curr + 1]?.displayPic;  // ? means agar he toh lagado

    setData(curr);

    curr = 2;
})();

function changeImage() {
    if (!isAnimating) {
        isAnimating = true;
        let tl = gsap.timeline({
            onComplete: function () {
                isAnimating = false;
                let main = select(".mainCard");
                let incomming = select(".incommingCard");

                incomming.classList.remove("z-[2]");
                incomming.classList.add("z-[3]");
                incomming.classList.remove("incommingCard");

                main.classList.remove("z-[3]");
                main.classList.add("z-[2]");

                gsap.set(main, {   //kyukee main pechey gaya he toh wapas 1 kardo
                    scale: 1,
                    opacity: 1,
                });

                if (curr === users.length) curr = 0;
                select(".mainCard img").src = users[curr].displayPic;
                curr++;

                main.classList.remove("mainCard");
                incomming.classList.add("mainCard");
                main.classList.add("incommingCard");
            }
        });

        tl.to(".mainCard", {
            scale: 1.1,
            opacity: 0,
            ease: Circ,
            duration: .9
        }, "together")
            .from(".incommingCard", {
                scale: .9,
                opacity: 0,
                ease: Circ,
                duration: 1.1
            }, "together")
    }
}

let deny = select(".deny");
let accept = select(".accept");
// Same work on both buttons for now
deny.addEventListener("click", () => {
    changeImage();
    setData(curr - 1);
    gsap.from(".details .element", {
        y: "100%",
        stagger: .06,
        opacity: 0,
        duration: 1.5,
        ease: Power4.easeInOut
    })
});

accept.addEventListener("click", () => {
    changeImage();
    setData(curr - 1);
    gsap.from(".details .element", {
        y: "100%",
        stagger: .06,
        opacity: 0,
        duration: 1.5,
        ease: Power4.easeInOut
    })
});

(function containerCreator() {
    document.querySelectorAll(".element")
        .forEach((element) => {
            let div = document.createElement("div");
            div.classList.add(`${element.classList[1]}Container`, "overflow-hidden"); // element ke dosre class ke sath container likh do
            div.appendChild(element);
            select(".details").appendChild(div)
        })
})();

