import gsap from "gsap";

export function onMouseEnter(buttonClass: string) {
    gsap.to(buttonClass, {
        scale: 1.1,
        duration: 0.2,
        ease: "power4.in",
    });
}

export function onMouseLeave(buttonClass: string) {
    gsap.to(buttonClass, {
        scale: 1,
        duration: 0.2,
        ease: "power4.Out",
    });
}

export function onClick(buttonClass: string, next: gsap.Callback) {
    gsap.timeline({ paused: true })
        .to(buttonClass, {
            duration: 0.1,
            scale: 0.8,
            ease: "expo.easeInOut",
        })
        .to(buttonClass, {
            duration: 0.1,
            scale: 1,
            ease: "expo.easeInOut",
            onComplete: next,
        })
        .play();
}
