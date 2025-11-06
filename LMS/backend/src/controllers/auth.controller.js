



export const registerUser = (req, res, next) => {
    try{
        const {name, email, password, role="learner"} = req.body;

        
    }catch(e) {
        next(e)
    }
}

























// // controllers/auth.controller.js


// // ---- Config ----
// const JWT_EXPIRES = "2h";
// const JWT_ISSUER = "your-app";
// const JWT_AUDIENCE = "your-app-users";
// const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12", 10);

// // ---- Validation schema (Zod) ----
// const registerSchema = z.object({
//   username: z
//     .string({ required_error: "username is required" })
//     .trim()
//     .min(3, "username must be at least 3 chars")
//     .max(32, "username must be at most 32 chars")
//     .regex(/^[a-zA-Z0-9._-]+$/, "username can contain letters, numbers, ., _, -"),
//   password: z
//     .string({ required_error: "password is required" })
//     .min(8, "password must be at least 8 chars")
//     .max(128, "password is too long"),
// });

// export const register = async (req, res, next) => {
//   try {
//     // 1) Validate + normalize input
//     const parsed = registerSchema.safeParse(req.body);
//     if (!parsed.success) {
//       const msg = parsed.error.errors?.[0]?.message || "Invalid input";
//       return next(new MyError(msg, 400));
//     }

//     let { username, password } = parsed.data;
//     username = username.toLowerCase();

//     // 2) Optional: small password strength guard (at least one number & letter)
//     if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
//       return next(new MyError("password must include letters and numbers", 400));
//     }

//     // 3) Hash password (configurable rounds)
//     const hashPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

//     // 4) Create user inside a transaction
//     const result = await sequelize.transaction(async (t) => {
//       // Rely on DB unique constraint for race-safety
//       const newUser = await User.create(
//         {
//           username,
//           password: hashPassword,
//         },
//         { transaction: t }
//       );
//       return newUser;
//     });

//     // 5) Issue JWT
//     const tokenPayload = { id: result.id, role: result.role };
//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: JWT_EXPIRES,
//       issuer: JWT_ISSUER,
//       audience: JWT_AUDIENCE,
//     });

//     // 6) Secure cookie options
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
//       sameSite: "lax", // helps mitigate CSRF for typical form posts
//       maxAge: 2 * 60 * 60 * 1000, // 2h
//       path: "/",
//     });

//     // 7) Minimal, safe response (no sensitive fields)
//     return res.status(201).json({
//       success: true,
//       message: "user created",
//       user: {
//         id: result.id,
//         username: result.username,
//         role: result.role,
//         // only include these if you truly need them
//         // balance: result.balance,
//         // plan: result.plan,
//       },
//     });
//   } catch (err) {
//     // Handle "username already exists" from DB unique constraint cleanly
//     if (err?.name === "SequelizeUniqueConstraintError") {
//       return next(new MyError("username not available", 409));
//     }

//     console.error("error at register controller:", err);
//     return next(new MyError("Internal Server Error", 500));
//   }
// };


// export const login = async (req, res, next) => {
//     try {
//         const { username, password } = req.body;

//         if(!username || !password) {
//             return next(new MyError("Field are require", 400));
//         }

//         const user = await User.findOne({
//             where: {
//                 username: username,
//             }
//         })

//         if(!user) {
//             return next(new MyError("You are not register", 400));
//         }
        
//         const isAllow = await bcrypt.compare(password, user.password);
        
//         if(!isAllow) {
//             return next(new MyError("Wrong username and password", 400));
//         }

//         const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '2h'});
//         res.cookie('token', token, {
//             httpOnly: true,
//             maxAge: 2 * 60 * 60 * 1000,
//         })

//         return res.status(200).json({success: true, message: "Login successfuly", user: {
//             id: user.id,
//             username: user.username,
//             role: user.role,
//             balance: user.balance,
//             plan: user.plan
//         }});

  

//     } catch (error) {
//         console.log("error at login controller "+ error.message);
//         return next(new MyError("Internal Server", 500));
//     }
// };
