import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

////***************************************************** Building reusable context menu
// So basically if the currently openId is different from this list ID, then return nothing. But if the ID of the list matches the one that is currently open, then we want to render something. So then we do render this list of buttons. And so here, let's actually again return a portal. So create portal because this element here will also float on top of the UI.
// And so in cases like that, it's always a good idea to use a portal.

// const MenusContext = createContext();

// function Menus({ children }) {
//   const [openId, setOpenId] = useState("");
//   const close = () => setOpenId("");
//   const open = setOpenId;
//   return (
//     <MenusContext.Provider value={{ openId, close, open }}>
//       {children}
//     </MenusContext.Provider>
//   );
// }

// function Toggle({ id }) {
//   const { openId, close, open } = useContext(MenusContext);
//   const handleClick = (e) => {
//     openId === "" || openId !== id ? open(id) : close();
//   };
//   return (
//     <StyledToggle onClick={handleClick}>
//       <HiEllipsisVertical />
//     </StyledToggle>
//   );
// }
// function List({ id, children }) {
//   const { openId } = useContext(MenusContext);
//   if (openId !== id) return null;
//   return createPortal(
//     <StyledList position={{ x: 20, y: 20 }}>{children}</StyledList>,
//     document.body
//   );
// }

// function Button({ children }) {
//   return (
//     <li>
//       <StyledButton>{children}</StyledButton>
//     </li>
//   );
// }

// Menus.Menu = Menu; // styled component
// Menus.Toggle = Toggle;
// Menus.List = List;
// Menus.Button = Button;

// export default Menus;

//******** handle list
// Now this position of the list needs to be calculated as soon as this button here is clicked. And so let's do that right here in handleClick. So first off, here let's receive the event that has been fired off, so that click event. And so then on that, we can do e.target, and then we want to get the closest button, so just to make sure that we really get the position of the button and not of the SVG icon here. So this then basically does some DOM traversing,
// finding the closest button parent. And then here we can then call another DOM function, which is getBoundingClientRect. It's a weird name, but basically what this will do is to give us some data about the element's position.
// we want to get access to rect in list but we are calculating it in handleClick so make position state at the top level

// const MenusContext = createContext();

// function Menus({ children }) {
//   const [openId, setOpenId] = useState("");
//   const [position, setPosition] = useState(null);
//   const close = () => setOpenId("");
//   const open = setOpenId;
//   return (
//     <MenusContext.Provider
//       value={{ openId, position, close, open, setPosition }}
//     >
//       {children}
//     </MenusContext.Provider>
//   );
// }

// function Toggle({ id }) {
//   const { openId, close, open, setPosition } = useContext(MenusContext);
//   const handleClick = (e) => {
//     const rect = e.target.closest("button").getBoundingClientRect();
//     setPosition({
//       x: window.innerWidth - rect.width - rect.x,
//       y: rect.y + rect.height + 8,
//     });
//     openId === "" || openId !== id ? open(id) : close();
//   };
//   return (
//     <StyledToggle onClick={handleClick}>
//       <HiEllipsisVertical />
//     </StyledToggle>
//   );
// }
// function List({ id, children }) {
//   const { openId, position, close } = useContext(MenusContext);
//   const ref = useOutsideClick(close);
//   if (openId !== id) return null;
//   return createPortal(
//     <StyledList ref={ref} position={position}>
//       {children}
//     </StyledList>,
//     document.body
//   );
// }

// function Button({ children, icon, onClick }) {
//   const { close } = useContext(MenusContext);
//   function handleClick() {
//     onClick?.();
//     close();
//   }
//   return (
//     <li>
//       <StyledButton onClick={handleClick}>
//         {icon}
//         <span>{children}</span>
//       </StyledButton>
//     </li>
//   );
// }

// Menus.Menu = Menu; // styled component
// Menus.Toggle = Toggle;
// Menus.List = List;
// Menus.Button = Button;

// export default Menus;

////************************************ Make edit delete working
// go CabinRow.jsx

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, position, close, open, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  const handleClick = (e) => {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu; // styled component
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
