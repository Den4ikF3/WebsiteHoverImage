const projects = [
  {
    id: 1,
    title: "Oblivion",
    year: "2023",
    image: "images/1.jfif"
  },
  {
    id: 2,
    title: "Fervor",
    year: "2023",
    image: "images/2.jfif"
  },
  {
    id: 3,
    title: "Essence",
    year: "2024",
    image: "images/3.jfif"
  },
  {
    id: 4,
    title: "Stillness",
    year: "2024",
    image: "images/4.jfif"
  },
  {
    id: 5,
    title: "Presence",
    year: "2024",
    image: "images/5.jfif"
  },
  {
    id: 6,
    title: "Resonance",
    year: "2024",
    image: "images/6.jfif"
  },
  {
    id: 7,
    title: "Clarity",
    year: "2025",
    image: "images/7.jfif"
  },
  {
    id: 8,
    title: "Arrival",
    year: "2025",
    image: "images/8.jfif"
  },
  {
    id: 9,
    title: "Flow",
    year: "2025",
    image: "images/9.jfif"
  },
  {
    id: 10,
    title: "Surrender",
    year: "2025",
    image: "images/10.jfif"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const projectsContainer = document.querySelector(".projects-container");
  const backgroundImage = document.getElementById("background-image");
  const loader = document.querySelector(".loader");
  const counterElement = document.querySelector(".loader-counter");
  const enterBtn = document.getElementById("enter-btn");
  renderProjects(projectsContainer);
  setupCursorHover();
  preloadImages();
  setupHoverEvents(backgroundImage, projectsContainer);

  enterBtn.addEventListener("click", () => {
    const audio = document.getElementById('background-music');
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio play error:", e));
    }

    enterBtn.style.display = "none";
    counterElement.style.display = "block";
    startLoaderAnimation(loader, counterElement);
  });
});

function startLoaderAnimation(loader, counter) {
  let current = 0;
  
  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 15) + 1;
    if (current > 100) current = 100;
    
    counter.textContent = current + "%";

    if (current === 100) {
      clearInterval(interval);
      
      setTimeout(() => {
        loader.classList.add("loader-hidden");
        
        setTimeout(() => {
            initialAnimation();
        }, 500); 
      }, 300);
    }
  }, 60);
}


function startLoaderAnimation(loader, counter) {
  let current = 0;
  const interval = setInterval(() => {
    current += Math.floor(Math.random() * 10) + 1; 
    
    if (current > 100) current = 100;
    
    counter.textContent = current + "%";

    if (current === 100) {
      clearInterval(interval);
      
      setTimeout(() => {
        loader.classList.add("loader-hidden");        
        setTimeout(() => {
            initialAnimation();
        }, 400); 
      }, 500);
    }
  }, 50);
}

function initialAnimation() {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(100%) rotate(2deg)";
    item.style.transformOrigin = "left bottom";

    setTimeout(() => {
      item.style.transition = "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
      item.style.opacity = "1";
      item.style.transform = "translateY(0) rotate(0deg)";
    }, index * 100);
  });
}

function renderProjects(container) {
  projects.forEach((project, index) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.dataset.id = project.id;
    projectItem.dataset.image = project.image;
    const indexFormatted = (index + 1).toString().padStart(2, '0');

    projectItem.innerHTML = `
      <div class="project-id">(${indexFormatted})</div>
      <div class="project-title">${project.title}</div>
      <div class="project-year">${project.year}</div>
    `;

    container.appendChild(projectItem);
  });
}

function initialAnimation() {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    setTimeout(() => {
      item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 60);
  });
}

function setupHoverEvents(backgroundImage, projectsContainer) {
  const projectItems = document.querySelectorAll(".project-item");
  let currentImage = null;
  let zoomTimeout = null;

  const preloadedImages = {};
  projects.forEach((project) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = project.image;
    preloadedImages[project.id] = img;
  });

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const imageUrl = this.dataset.image;

      if (zoomTimeout) {
        clearTimeout(zoomTimeout);
      }

      backgroundImage.style.transition = "none";
      backgroundImage.style.transform = "scale(1.2)";

      backgroundImage.src = imageUrl;
      backgroundImage.style.opacity = "1";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          backgroundImage.style.transition =
            "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          backgroundImage.style.transform = "scale(1.0)";
        });
      });

      currentImage = imageUrl;
    });
  });

  projectsContainer.addEventListener("mouseleave", function () {
    backgroundImage.style.opacity = "0";
    currentImage = null;
  });
}

function preloadImages() {
  projects.forEach((project) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = project.image;
  });
}

const cursor = document.getElementById("cursor");
const body = document.body;

document.addEventListener("mousemove", (e) => {
  requestAnimationFrame(() => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
});

const interactiveElements = document.querySelectorAll(".project-item, #enter-btn");

function setupCursorHover() {
    const allInteractive = document.querySelectorAll(".project-item, #enter-btn");
    
    allInteractive.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        body.classList.add("hovered");
      });
      el.addEventListener("mouseleave", () => {
        body.classList.remove("hovered");
      });
    });
}

