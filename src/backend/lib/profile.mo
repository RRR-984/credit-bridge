import ProfileTypes "../types/profile";

module {
  public type State = { var profile : ProfileTypes.UserProfile };

  public func newState() : State = {
    var profile = ProfileTypes.defaultProfile;
  };

  public func get(state : State) : ProfileTypes.UserProfile {
    state.profile;
  };

  public func set(state : State, updated : ProfileTypes.UserProfile) {
    state.profile := updated;
  };
};
