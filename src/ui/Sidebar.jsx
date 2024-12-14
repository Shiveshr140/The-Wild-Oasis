import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

// // from the first row all the way to last grid-row: 1/-1;
// const StyledSidebar = styled.aside`
//   background-color: var(--color-grey-0);
//   padding: 3.2rem 2.4rem;
//   border-right: 1px solid var(--color-grey-100);
//   grid-row: 1/-1;
// `;

// function Sidebar() {
//   return (
//     <StyledSidebar>
//       SIDEBAR
//     </StyledSidebar>
//   );
// }

// export default Sidebar;

////*************************************** Building the Sidebar and Main Navigation
// MainNav.jsx
// flex just for space b/w elements

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2 rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
