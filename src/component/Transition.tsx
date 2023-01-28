import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { SwitchTransition, Transition } from "react-transition-group";

const TransitionComponent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const entryAnimation = () => {
    gsap.set(".Page", { y: 10 });
    gsap
      .timeline({ paused: true })
      .to(".Page", {
        y: 0,
        duration: 0.2,
        ease: "circ.inOut",
      })
      .play();
  };

  const exitAnimation = () => {
    gsap.set(".PageTransition__Overlay", { zIndex: 20 });
    gsap.set(".Overlay__One", { rotate: -20 });
    gsap.set(".Overlay__Two", { rotate: 20 });
    gsap.set(".Overlay__Three", { rotate: -20 });
    gsap
      .timeline({ paused: true })
      .to(".Overlay__One", {
        top: "-200",
        rotate: 0,
        duration: 1.2,
        ease: "circ.inOut",
      })
      .to(
        ".Overlay__Two",
        {
          top: "-200",
          rotate: 0,
          duration: 1.4,
          ease: "circ.inOut",
        },
        "<"
      )
      .to(
        ".Overlay__Three",
        {
          top: "-200",
          rotate: 0,
          duration: 1.4,
          delay: 0.2,
          ease: "circ.inOut",
        },
        "<"
      )
      .play();
  };

  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={1300}
        onEnter={entryAnimation}
        onExit={exitAnimation}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
