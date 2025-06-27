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
    if (this.opt.assistance.includes("mobile")) {
      this.isAnimating = false;
      this.startMobile = () => {
        this.container.ontouchstart = (e) => {
          if (this.isAnimating) return;

          if (players.length) {
            this.currentItem = this.container.querySelector(
              `[data-id="${this.currentPlayer.id}"]`,
            );

            startPositionX = e.touches[0].clientX;
            startPositionY = e.touches[0].clientY;
          }
        };

        this.container.ontouchend = (e) => {
          if (isMoving) {
            this.isAnimating = true;
            if (e.changedTouches[0].clientX < 70) {
              this.currentItem.style.transition = `transform 0.3s ease-out`;
              this.currentItem.style.transform = "translateX(-100%)";
              players.pop();
              this.currentIndex = players.length - 1;
              this.currentPlayer = players[this.currentIndex];
              setTimeout(() => {
                this.isAnimating = false;
                this.currentItem.remove();
              }, 300);
            } else if (e.changedTouches[0].clientX > 200) {
              this.currentItem.style.transition = `transform 0.3s ease-out`;
              this.currentItem.style.transform = "translateX(100%)";
              players.pop();
              this.currentIndex = players.length - 1;
              this.currentPlayer = players[this.currentIndex];
              setTimeout(() => {
                this.isAnimating = false;
                this.currentItem.remove();
              }, 300);
            } else {
              this.currentItem.style.transition = `transform 0.3s ease-out, 0.3s ease-out`;
              this.currentItem.style.translate = `none`;
              this.currentItem.style.transform = "none";
            }
          }

          isMoving = false;
        };

        this.container.ontouchmove = (e) => {
          isMoving = true;
          e.preventDefault();
          if (players.length) {
            this.distanceX = e.touches[0].clientX - startPositionX;
            this.distanceY = e.touches[0].clientY - startPositionY;
            this.currentItem.style.translate = `${this.distanceX}px ${this.distanceY}px`;
            this.currentItem.style.transform = `rotate(${
              this.distanceX / 30
            }deg) `;
          }
        };
      };

      this.startMobile();
    }
  };
}

const surf = new CardSurf("#card-container", {
  assistance: ["mobile", "desktop"],
});

surf.start();
