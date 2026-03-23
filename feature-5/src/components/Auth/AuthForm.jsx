import React from "react";
//TODO: Add registration fields and logic
const AuthForm = ({ user, onChange, onSubmit, mode }) => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Login to Message Board</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="email"
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="password"
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         {/* Only show for register */}
//         {mode === "register" && (
//           <>
//             <div>
//               <label>First Name</label>
//               <br />
//               <input
//                 type="text"
//                 value={user.firstName || ""}
//                 onChange={onChange}
//                 name="firstName"
//                 placeholder="first name"
//                 required
//               />
//             </div>

//             <div>
//               <label>Last Name</label>
//               <br />
//               <input
//                 type="text"
//                 value={user.lastName || ""}
//                 onChange={onChange}
//                 name="lastName"
//                 placeholder="last name"
//                 required
//               />
//             </div>
//           </>
//         )}

//         {/* Always show */}
//         <div>
//           <label>Email</label>
//           <br />
//           <input
//             type="email"
//             value={user.email}
//             onChange={onChange}
//             name="email"
//             placeholder="email"
//             required
//           />
//         </div>

//         <div>
//           <label>Password</label>
//           <br />
//           <input
//             type="password"
//             value={user.password}
//             onChange={onChange}
//             name="password"
//             placeholder="password"
//             required
//           />
//         </div>

//         <div>
//           <button type="submit">
//             {mode === "login" ? "Login" : "Register"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default AuthForm;
