class Gallery {
  // The array to which the images will be added
  images = [];

  img;

  // Setting a tracker variable for the current image that's being shown
  currentImage = -1;

  btn1;

  btn2;

  btn3;

  constructor(galleryId, ...images) {
    this.images = images;

    const galleryDiv = document.getElementById(galleryId);

    const button1Div = document.querySelector("#btn1Cont");

    const button2Div = document.querySelector("#btn2Cont");

    // Flag variable to track whether the slideshow in active
    let flagSldsh = false;

    let slideShow;

    this.img = document.createElement("img");

    //Not allowing the user to click the right mouse key, preventing unnecessary action
    this.img.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
    });

    // Allow the right and left arrow keys to change images
    window.addEventListener("keydown", (ev) => {
      switch (ev.key) {
        case "ArrowRight":
          this.nextImage();
          break;
        case "ArrowLeft":
          this.previousImage();
      }
    });

    this.btn1 = document.querySelector(".btn1");

    this.btn2 = document.querySelector(".btn2");

    this.btn3 = document.querySelector("#btn3");

    this.btn3.innerHTML = "&#9654"; // play sign

    // Initiating the slideshow
    this.btn3.addEventListener("click", () => {
      if (!flagSldsh) {
        // Setting the button's content to the pause sign
        this.btn3.innerHTML = "&#10073;&#10073";

        // setting the function that changes the image to the next one on a loop every 3 seconds
        slideShow = setInterval(() => {
          this.nextImage();
        }, 3000);

        flagSldsh = true;
      } else {
        flagSldsh = false;

        // Restoring the
        this.btn3.innerHTML = "&#9654";

        // stopping the slide show
        clearInterval(slideShow);
      }
    });

    this.btn1.innerHTML = "<";

    this.btn2.innerHTML = ">";

    galleryDiv.appendChild(button1Div);

    galleryDiv.appendChild(button2Div);

    button1Div.appendChild(this.btn1);

    // Setting the next button to change the image to the next one
    this.btn1.addEventListener("click", () => this.previousImage());

    button2Div.appendChild(this.btn2);

    // Setting the previous button to change the image to the previous one

    this.btn2.addEventListener("click", () => this.nextImage());

    galleryDiv.appendChild(this.img);

    // Flag variable to track whether it's full screen mode
    let flagFullScr = false;

    // When clicking on the image it fills up the whole screen and the buttons are removed
    this.img.addEventListener("click", () => {
      if (!flagFullScr) {
        galleryDiv.requestFullscreen();

        flagFullScr = true;

        this.btn1.classList.add("btn1Remove");

        this.btn2.classList.add("btn2Remove");

        this.img.classList.add("changeHeight");
      }
    });

    // If the screen is already in full mode, exiting it (through the default esc key)
    // the buttons come back and the height of the images is restored
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        flagFullScr = false;

        this.btn1.classList.remove("btn1Remove");

        this.btn2.classList.remove("btn2Remove");

        this.img.classList.remove("changeHeight");
      }
    });

    this.nextImage();
  }

  // Defining the function that changes the image to the next one
  nextImage() {
    // increasing the value of the image tracker variable
    this.currentImage++;

    // When it gets to the last image, come back to the first one
    if (this.currentImage >= this.images.length) {
      this.currentImage = 0;
    }

    // Reset the slide effect of the image change to be used later
    this.img.classList.remove("slideFromLeft");

    // Setting each image to the appropriate one from the array of images we defined at the start
    this.img.src = this.images[this.currentImage];

    // Remove the class and add it again with a slight delay
    this.img.classList.remove("slideFromRight");
    void this.img.offsetWidth;
    this.img.classList.add("slideFromRight");
  }

  // Defining the function that changes the image to the previous one
  previousImage() {
    // decreasing the value of the image tracker variable
    this.currentImage--;

    // If we want to show the last image starting from the first, set the current image to the last image
    if (this.currentImage < 0) {
      this.currentImage = this.images.length - 1;
    }
    // Reset the slide effect of the image change to be used later
    this.img.classList.remove("slideFromRight");

    // Setting each image to the appropriate one from the array of images we defined at the start
    this.img.src = this.images[this.currentImage];

    this.img.classList.remove("slideFromLeft");
    void this.img.offsetWidth;
    this.img.classList.add("slideFromLeft");
  }
}

// Initializing the Gallery object, giving it the values of the gallery div and the images themselves
const gallery = new Gallery(
  "gallery1",
  "./images/img1.png",
  "./images/img2.png",
  "./images/img3.png",
  "./images/img4.png",
  "./images/img5.png",
  "./images/img6.png",
  "./images/img7.png",
  "./images/img8.png",
  "./images/img9.png",
  "./images/img10.png"
);
