import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { SwitchTransition, Transition } from "react-transition-group";

const TransitionComponent = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const entryAnimation = () => {
    gsap.set(".Page", { opacity: 0.4, yPercent: 10 });
    gsap
      .timeline({ paused: true })
      .to(".Page", {
        opacity: 1,
        yPercent: 0,
        duration: 0.2,
        ease: "expo.easeInOut",
      })
      .play();
  };

  const exitAnimation = () => {
    gsap.set(".PageTransition__Overlay", { zIndex: 12, display: "initial" });
    gsap.set(".Overlay__One", { rotate: -6 });
    gsap.set(".Overlay__Two", { rotate: 6 });
    gsap.set(".Overlay__Three", { rotate: -6 });
    gsap.set(".Overlay__Four", { rotate: 6 });
    gsap
      .timeline({ paused: true })
      .to(".PageTransition__Overlay", {
        top: "-200",
        rotate: 0,
        duration: 1.2,
        stagger: 0.2,
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
          appear: 100,
          enter: 200,
          exit: 1800,
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
