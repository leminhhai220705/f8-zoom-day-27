const players = [
  {
    id: 1,
    name: "card1",
  },
  {
    id: 2,
    name: "card2",
  },
  {
    id: 3,
    name: "card3",
  },
  {
    id: 4,
    name: "card4",
  },
  {
    id: 5,
    name: "card5",
  },
  {
    id: 6,
    name: "card6",
  },
];

function CardSurf(selector, options = {}) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`${selector} is not found`);
    return;
  }

  this.opt = Object.assign(
    {
      assistance: ["mobile", "desktop"],
    },
    options,
  );

  this.start = () => {
    this.currentIndex = players.length - 1;
    this.currentPlayer = players[this.currentIndex];
    let isMoving = false;

    let startPositionX = 0;
    let startPositionY = 0;

    const updateItem = (per, duration) => {
      this.currentItem.style.transition = `transform ${duration}ms ease-out`;
      this.currentItem.style.transform = `translateX(${per}%)`;

      setTimeout(() => {
        players.pop();
        this.currentIndex = Math.max(0, players.length - 1); // 6 5 4
        this.currentPlayer = players[this.currentIndex];
        this.isAnimating = false;
        this.currentItem.remove();
      }, duration);
    };

    if (this.opt.assistance.includes("mobile")) {
      this.isAnimating = false;
      this.startMobile = () => {
        this.container.ontouchstart = (e) => {
          startPositionX = e.touches[0].clientX;
          startPositionY = e.touches[0].clientY;

          if (this.isAnimating) return;
          if (players.length) {
            this.currentItem = this.container.querySelector(
              `[data-id="${this.currentPlayer.id}"]`,
            );

            console.log("startPosX: ", startPositionX);
          }
        };

        this.container.ontouchend = (e) => {
          if (!this.isAnimating) {
            this.isAnimating = true;
            if (this.distanceX < -100) {
              updateItem(-100, 250);
            } else if (this.distanceX > 100) {
              updateItem(100, 250);
            } else {
              this.currentItem.style.transition = `transform 0.5s ease-out, translate 0.3s ease-out`;
              this.currentItem.style.translate = ``;
              this.currentItem.style.transform = "";
              this.isAnimating = false;
            }
          }

          isMoving = false;
        };

        this.container.addEventListener(
          "touchmove",
          (e) => {
            e.preventDefault();
            if (this.isAnimating) return;

            this.currentItem.style.transition = "";
            isMoving = true;

            if (players.length) {
              this.distanceX = e.touches[0].clientX - startPositionX; //  - 357
              this.distanceY = e.touches[0].clientY - startPositionY;
              this.currentItem.style.translate = `${this.distanceX}px ${this.distanceY}px`;
              this.currentItem.style.transform = `rotate(${
                this.distanceX / 30
              }deg) `;

              if (this.distanceX < -30) {
                this.currentItem.style.boxShadow =
                  "0 0 30px rgba(255, 0, 0, 0.4)";
                this.currentItem.style.border =
                  "2px solid rgba(255, 0, 0, 0.5)";
              } else if (this.distanceX > 30) {
                this.currentItem.style.boxShadow =
                  "0 0 30px rgba(0, 255, 0, 0.4)";
                this.currentItem.style.border =
                  "2px solid rgba(0, 255, 0, 0.5)";
              } else {
                this.currentItem.style.boxShadow = "none";
                this.currentItem.style.border = "none";
              }
            }
          },
          {
            passive: false,
          },
        );
      };

      this.startMobile();
    }
  };
}

const surf = new CardSurf("#card-container", {
  assistance: ["mobile", "desktop"],
});

surf.start();
