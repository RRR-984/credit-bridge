module {
  public type UserProfile = {
    country : Text;
    currency : Text;
    timezone : Text;
    dateFormat : Text;
    language : Text;
    businessName : Text;
    mobileNumber : Text;
  };

  public let defaultProfile : UserProfile = {
    country = "India";
    currency = "INR";
    timezone = "Asia/Kolkata";
    dateFormat = "DD/MM/YYYY";
    language = "en";
    businessName = "";
    mobileNumber = "";
  };
};
