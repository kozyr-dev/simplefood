export const helpers = {
  fadeOut(el: HTMLElement) {
    el.style.opacity = "1";

    (function fade() {
      if (parseFloat(el.style.opacity) - 0.1 < 0) {
        el.style.display = "none";
      } else {
        el.style.opacity = (parseFloat(el.style.opacity) - 0.1).toString();
        setTimeout(fade, 10);
      }
    })();
  },

  fadeIn(el: HTMLElement) {
    el.style.opacity = "0";
    el.style.display = "block";

    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val.toString();
        setTimeout(fade, 10);
      }
    })();
  },

  slideUp(target: HTMLElement, duration = 300) {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    window.setTimeout(() => {
      target.style.display = "none";
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  },

  slideDown(target: HTMLElement, duration = 300) {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;

    if (display === "none") display = "block";

    target.style.display = display;
    const height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  },

  slideToggle(target: HTMLElement, duration = 300) {
    if (window.getComputedStyle(target).display === "none") {
      helpers.slideDown(target, duration);
    } else {
      helpers.slideUp(target, duration);
    }
  },

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  },

  scrollToAnchor(id: string) {
    const el = document.querySelector(id);
    if (process.browser && el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  },

  getFullYear() {
    const today = new Date();
    return today.getFullYear();
  },

  truncate(str: string, no_words: number) {
    return str.split(" ").splice(0, no_words).join(" ");
  },
};

export default helpers;
