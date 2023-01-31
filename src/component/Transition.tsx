import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { SwitchTransition, Transition } from "react-transition-group";

const TransitionComponent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const entryAnimation = () => {
    gsap.set(".Page", { opacity: 0.4 });
    gsap
      .timeline({ paused: true })
      .to(".Page", {
        opacity: 1,
        duration: 0.8,
        ease: "expo.easeInOut",
      })
      .play();
  };

  const exitAnimation = () => {
    gsap.set(".PageTransition__Overlay", { zIndex: 12, display: "initial" });
    gsap.set(".Overlay__One", { rotate: -12 });
    gsap.set(".Overlay__Two", { rotate: 12 });
    gsap.set(".Overlay__Three", { rotate: -12 });
    gsap.set(".Overlay__Four", { rotate: 12 });
    gsap
      .timeline({ paused: true })
      .to(".PageTransition__Overlay", {
        top: "-200",
        rotate: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.easeInOut",
      })
      .play();
  };

  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        appear={true}
        timeout={{
          appear: 800,
          enter: 800,
          exit: 1400,
        }}
        onEnter={entryAnimation}
        onExit={exitAnimation}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
