import Common "common";

module {
  public type AdminStats = {
    totalCustomers : Nat;
    totalUdhar : Nat;
    totalJama : Nat;
    blockedCount : Nat;
    totalUdharAmount : Float;
    totalJamaAmount : Float;
  };

  // Shared state record passed to admin mixin
  public type AdminState = {
    var adminPrincipal : ?Principal;
  };

  public func newState() : AdminState {
    { var adminPrincipal = null };
  };
};
