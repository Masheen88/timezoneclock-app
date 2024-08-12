import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  BsChatDots,
  BsImage,
  BsLayersFill,
  BsShare,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { gsap } from "gsap";

const ToolbarButton = ({ Icon, isActive }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const currentButtonRef = buttonRef.current;
    gsap.to(currentButtonRef, { duration: 0.2, scale: 1, ease: "power2.out" });

    const onEnter = () =>
      gsap.to(currentButtonRef, {
        duration: 0.2,
        scale: 1.1,
        ease: "power2.out",
      });
    const onLeave = () =>
      gsap.to(currentButtonRef, {
        duration: 0.2,
        scale: 1,
        ease: "power2.out",
      });

    currentButtonRef.addEventListener("mouseenter", onEnter);
    currentButtonRef.addEventListener("mouseleave", onLeave);

    return () => {
      currentButtonRef?.removeEventListener("mouseenter", onEnter);
      currentButtonRef?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`p-2 rounded-full transition-colors duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
                  }`}
    >
      <Icon size={20} />
    </button>
  );
};

const CircleButton = ({ children, isActive }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.to(buttonRef.current, { duration: 0.2, scale: 1, ease: "power2.out" });

    const onEnter = () =>
      gsap.to(buttonRef.current, {
        duration: 0.2,
        scale: 1.1,
        ease: "power2.out",
      });
    const onLeave = () =>
      gsap.to(buttonRef.current, {
        duration: 0.2,
        scale: 1,
        ease: "power2.out",
      });

    buttonRef.current.addEventListener("mouseenter", onEnter);
    buttonRef.current.addEventListener("mouseleave", onLeave);
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                  transition-colors duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
    >
      {children}
    </button>
  );
};

const Toolbar = () => {
  const toolbarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      toolbarRef.current,
      { opacity: 0, y: 20 },
      { duration: 1.5, opacity: 1, y: 0, ease: "power3.out" }
    );
  }, []);

  return (
    <>
      <div
        ref={toolbarRef}
        className="bg-white dark:bg-gray-800 rounded-full p-2 flex items-center space-x-2 shadow-lg transition-colors duration-300"
      >
        <ToolbarButton Icon={BsChatDots} />
        <ToolbarButton Icon={BsImage} />
        <ToolbarButton Icon={BsLayersFill} />
        <CircleButton isActive>1</CircleButton>
        <CircleButton>2</CircleButton>
        <CircleButton>9+</CircleButton>
        <ToolbarButton Icon={BsShare} />
        <ToolbarButton Icon={BsThreeDotsVertical} />
      </div>
    </>
  );
};

ToolbarButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool,
};

CircleButton.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
};

export default Toolbar;
