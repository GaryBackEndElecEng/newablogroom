// function insertBackgroundImage({ css, url }) {
//   let cssArr = css.split(";");
//   cssArr = cssArr.map((strCss) => {
//     const startReg = /(background)\-(image)\:url\(/g;
//     const endReg = /\)/g;
//     const insert_ = `background-image:url(${url})`;
//     strCss = insertMatch({ str: strCss, startReg, endReg, insert: insert_ });
//     return strCss;
//   });

//   return cssArr.join(";").trim();
// }

// const insertMatch = ({ str, startReg, endReg, insert }) => {
//   let insert_inner = str;
//   const startMatches = [...str.matchAll(startReg)];
//   const endMatches = [...str.matchAll(endReg)];
//   if (
//     startMatches &&
//     endMatches &&
//     typeof startMatches === "object" &&
//     typeof endMatches === "object"
//   ) {
//     for (const start of startMatches) {
//       if (start && start[0]) {
//         const _start = start.index;
//         const len = str.length;
//         for (const end of endMatches) {
//           if (end && end[0]) {
//             const end_ = end.index + end[0].length;
//             const innerStart = str.slice(0, start - 1);
//             const innerEnd = str.slice(end_, len - (end_ + 1));
//             const strInsert = str.slice(start, end_);
//             insert_inner = innerStart + insert + innerEnd;
//           }
//         }
//       }
//     }
//   }
//   return insert_inner;
// };
