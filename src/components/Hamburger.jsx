export default function Hamburger({ isOpen, toggleSidebar }) {
  return (
    <div
      className="z-40 block lg:hidden focus:outline-none cursor-pointer w-[30px] h-[30px] transition-all duration-200 relative top-[6px]"
      type="button"
      onClick={() => toggleSidebar(!isOpen)}
    >
      <div
        className={`absolute w-[30px] h-[2px] top-0 left-0 bg-white rotate-0 transition-all duration-500 ${isOpen && 'rotate-45 translate-y-[14px] translate-x-[-6px]'}`}
      ></div>
      <div
        className={`absolute w-[30px] h-[2px] top-0 left-0 bg-white rotate-0 transition-all duration-500 translate-y-[7px] ${isOpen && 'hidden'}`}
      ></div>
      <div
        className={`absolute w-[30px] h-[2px] top-0 left-0 bg-white rotate-0 transition-all duration-500 translate-y-[14px] ${isOpen && '-rotate-45 translate-y-[5px] translate-x-[-8px]'}`}
      ></div>
    </div>

  );
}