import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { SwitchTransition, Transition } from "react-transition-group";

const TransitionComponent = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const entryAnimation = () => {
        gsap.set(".Page", { yPercent: 10 });
        gsap.set(".Overlay__Five", { rotation: 10 });
        gsap.set(".EntryTransition__Overlay", {
            zIndex: 12,
            display: "initial",
            yPercent: "-100",
        });
        gsap.timeline({ paused: true })
            .to(
                ".EntryTransition__Overlay",
                {
                    yPercent: "-200",
                    rotation: 0,
                    duration: 0.8,
                    ease: "expo.easeIn",
                },
                0
            )
            .to(
                ".Page",
                {
                    yPercent: 0,
                    duration: 0.4,
                    ease: "expo.easeInOut",
                },
                "<"
            )
            .play();
    };

    const exitAnimation = () => {
        gsap.set(".ExitTransition__Overlay", {
            zIndex: 12,
            display: "initial",
        });
        gsap.set(".Overlay__One", { rotation: -10 });
        gsap.set(".Overlay__Two", { rotation: 10 });
        gsap.set(".Overlay__Three", { rotation: -10 });
        gsap.set(".Overlay__Four", { rotation: 10 });
        gsap.timeline({ paused: true })
            .to(".ExitTransition__Overlay", {
                yPercent: "-100",
                rotation: 0,
                duration: 0.8,
                stagger: 0.16,
                ease: "expo.easeOut",
            })
            .play();
    };

    return (
        <SwitchTransition>
            <Transition
                key={location.pathname}
                appear={true}
                timeout={{
                    appear: 0,
                    enter: 800,
                    exit: 1240,
                }}
                unmountOnExit
                onEnter={entryAnimation}
                onExit={exitAnimation}
            >
                {children}
            </Transition>
        </SwitchTransition>
    );
};

export default TransitionComponent;
