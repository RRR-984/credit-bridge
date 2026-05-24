import ProfileLib "../lib/profile";
import ProfileTypes "../types/profile";

mixin (profileState : ProfileLib.State) {
  public func getUserProfile() : async ProfileTypes.UserProfile {
    ProfileLib.get(profileState);
  };

  public func updateUserProfile(profile : ProfileTypes.UserProfile) : async () {
    ProfileLib.set(profileState, profile);
  };
};
