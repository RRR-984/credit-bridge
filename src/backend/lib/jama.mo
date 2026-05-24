import List "mo:core/List";
import Common "../types/common";
import JamaTypes "../types/jama";
import Time "mo:core/Time";

module {
  public type Jama = JamaTypes.Jama;
  public type JamaView = JamaTypes.JamaView;
  public type CreateJamaArgs = JamaTypes.CreateJamaArgs;
  public type UpdateJamaArgs = JamaTypes.UpdateJamaArgs;

  public func toView(j : Jama) : JamaView {
    {
      id = j.id;
      customerId = j.customerId;
      amount = j.amount;
      paymentType = j.paymentType;
      notes = j.notes;
      createdAt = j.createdAt;
    };
  };

  public func create(
    jamaList : List.List<Jama>,
    state : { var nextJamaId : Nat },
    owner : Principal,
    args : CreateJamaArgs,
  ) : JamaView {
    let id = state.nextJamaId;
    state.nextJamaId += 1;
    let j : Jama = {
      id;
      customerId = args.customerId;
      owner;
      var amount = args.amount;
      var paymentType = args.paymentType;
      var notes = args.notes;
      createdAt = Time.now();
    };
    jamaList.add(j);
    toView(j);
  };

  public func getByCustomer(
    jamaList : List.List<Jama>,
    owner : Principal,
    customerId : Common.CustomerId,
  ) : [JamaView] {
    jamaList
      .filter(func(j) { j.owner == owner and j.customerId == customerId })
      .map<Jama, JamaView>(func(j) { toView(j) })
      .toArray();
  };

  public func update(
    jamaList : List.List<Jama>,
    owner : Principal,
    id : Common.JamaId,
    args : UpdateJamaArgs,
  ) : ?JamaView {
    switch (jamaList.find(func(j) { j.owner == owner and j.id == id })) {
      case null { null };
      case (?j) {
        j.amount := args.amount;
        j.paymentType := args.paymentType;
        j.notes := args.notes;
        ?toView(j);
      };
    };
  };

  public func remove(
    jamaList : List.List<Jama>,
    owner : Principal,
    id : Common.JamaId,
  ) : Bool {
    let before = jamaList.size();
    let kept = jamaList.filter(func(j) { not (j.owner == owner and j.id == id) });
    if (kept.size() < before) {
      jamaList.clear();
      jamaList.addAll(kept.values());
      true;
    } else {
      false;
    };
  };

  // Sum all jama amounts for a customer (for balance recalculation)
  public func totalForCustomer(
    jamaList : List.List<Jama>,
    owner : Principal,
    customerId : Common.CustomerId,
  ) : Nat {
    jamaList
      .filter(func(j) { j.owner == owner and j.customerId == customerId })
      .foldLeft(0, func(acc : Nat, j : Jama) : Nat { acc + j.amount });
  };

  // Sum jama for today (for dashboard todayCollection)
  public func todayTotal(
    jamaList : List.List<Jama>,
    owner : Principal,
    dayStartNs : Int,
  ) : Nat {
    jamaList
      .filter(func(j) { j.owner == owner and j.createdAt >= dayStartNs })
      .foldLeft(0, func(acc : Nat, j : Jama) : Nat { acc + j.amount });
  };
};
