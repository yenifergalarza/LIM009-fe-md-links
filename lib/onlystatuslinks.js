// const onlystatusLinks = (arrayCount) => {
//     let url;
//     Promise.all(
//       arrayCount.map(function (link) {
//         url = link.href;
//         axios.get(url).then(res => {
//          link.statustext="Ok";
//         link.status=res.status;
//         }).catch(err => {
//           //console.log(err.response.status);
//           if (err.response.status) {
//             /*  */
//             // brokenLinks.push(err.response.status);
//             link.statustext="Fail";
//            link.status=err.response.status;
//           };
//           console.log(`${ link.file} ${ link.href} ${  link.statustext} ${  link.status}  ${  link.text}`);
//           return arrayCount;
//         })
//       })
//     )
//   };
"use strict";