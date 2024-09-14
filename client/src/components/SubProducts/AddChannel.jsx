// // AddChannel.js
// import React, { forwardRef, useImperativeHandle } from "react";

// const AddChannel = forwardRef((props, ref) => {
//   // Expose the `showModal` function to parent components using `useImperativeHandle`
//   useImperativeHandle(ref, () => ({
//     showModal() {
//       const modalElement = document.getElementById("exampleModalToggle");
//       const modal = new window.bootstrap.Modal(modalElement);
//       modal.show();
//     },
//   }));

//   return (
//     <div>
//       <div
//         className="modal fade"
//         id="exampleModalToggle"
//         aria-hidden="true"
//         aria-labelledby="exampleModalToggleLabel"
//         tabIndex="-1"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalToggleLabel">
//                 Add Sub-Category for Channel
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="length" className="form-label">
//                     Length
//                   </label>
//                   <input type="text" className="form-control" id="length" />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="width" className="form-label">
//                     Width
//                   </label>
//                   <input type="text" className="form-control" id="width" />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="weight" className="form-label">
//                     Weight
//                   </label>
//                   <input type="text" className="form-control" id="weight" />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 className="btn btn-primary"
//                 data-bs-target="#exampleModalToggle2"
//                 data-bs-toggle="modal"
//                 data-bs-dismiss="modal"
//               >
//                 Add Category
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default AddChannel;
