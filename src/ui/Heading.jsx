import styled, { css } from "styled-components";

// Since this is the template literal we can use javascript inside this

// // const test = `text-align: center`;

// // To get syntax highliting use css function and in order to use the javascript inside it we need it other wise in some situation it will not work you can check out docs syled-comoponent-> helper-> css function
// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"}
// `;

// const Heading = styled.h1`
//   /* font-size: ${10 > 5 ? "5px" : "30px"}; */
//   font-size: 30px;
//   font-weight: 500;
//   ${test}
// `;

// export default Heading;

////********************************** pass in props
// go app.jsx add prop say as='h1' and recieve a props using callback function like this, use as props otherwise all will be h1 even thought styling is different that can producess accessbility issue and issue in seo
// line-height common to all
// as is special prop => So basically whatever I pass into this styled component with the as prop will be the element that will then be rendered in the HTML.

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
  
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
  
   line-height: 1.4
`;

export default Heading;
