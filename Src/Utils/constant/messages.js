const generateMessage = (entity ) => ({
    alreadyExist: `${entity.toLowerCase()}.alreadyExist`,
    notFound: `${entity.toLowerCase()}.notFound`,
    failToCreate: `${entity.toLowerCase()}.failToCreate`,
    failToUpdate: `${entity.toLowerCase()}.failToUpdate`,
    failToDelete: `${entity.toLowerCase()}.failToDelete`,
    createdSuccessfully: `${entity.toLowerCase()}.createdSuccessfully`,
    updateSuccessfully: `${entity.toLowerCase()}.updateSuccessfully`,
    deleteSuccessfully: `${entity.toLowerCase()}.deleteSuccessfully`,
    notAllowed: `${entity.toLowerCase()}.notAllowed`,
    verifiedSuccessfully: `${entity.toLowerCase()}.verifiedSuccessfully`,
    Recommended:`${entity.toLowerCase()}.Recommended`
  });
  export const messages = {

    user: {
      ...generateMessage("User"),
      verified: "user.verified",
      notAuthorized: "user.notAuthorized",
      invalidCredential: "user.invalidCredential",
      changePassword: "user.changePassword",
      AlreadyHasOtp: "user.AlreadyHasOtp",
      checkEmail:"user.checkEmail",
      invalidOTP:"user.invalidOTP", 
      expireOTP :"user.expireOTP",
      login:"user.login",
      loginSuccessfully:"user.loginSuccessfully",
      Incorrect:"user.Incorrect",
      AlreadyVerified:"user.AlreadyVerified",
      InvalidBearerToken:"user.InvalidBearerToken",
       notAuthenticated:"user.notAuthenticated"
    },
    
   event:{...generateMessage("Event"),
    missingFields:"event.missingFields"
   },
   booking:generateMessage("Booking"),

  
  };