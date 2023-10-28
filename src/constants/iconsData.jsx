import CartLottie from "/public/assets/icons/cart.json";
import HeartLottie from "/public/assets/icons/heart.json";
import GuyWithBookLottie from "/public/assets/icons/guy.json";

export let cartObj = {
  loop: true,
  autoplay: true,
  animationData: CartLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export let heartObj = {
  loop: true,
  autoplay: true,
  animationData: HeartLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export let guyWithBookObj = {
  loop: true,
  autoplay: true,
  animationData: GuyWithBookLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
