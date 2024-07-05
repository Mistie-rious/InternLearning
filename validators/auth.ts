import { check } from "express-validator";

const signupvalidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("fullname").isString().withMessage("Fullname is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage('Password must be more than 6 characters')
    .notEmpty()
    .withMessage("Password is required"),
];

const signinvalidator = [
    check("email")
      .isEmail()
      .withMessage("Invalid Email")
      .notEmpty()
      .withMessage("Email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage('Password must be more than 6 characters')
      .notEmpty()
      .withMessage("Password is required"),
  ];

const emailValidator = [
    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email is required"),
  ]

const codeValidator = [
    check('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required'),

    check('code')
    .isLength({min: 6})
    .withMessage('Invalid code')
    .notEmpty()
    .withMessage('Code is required')
    
]
  

export { signupvalidator, signinvalidator, emailValidator, codeValidator };
