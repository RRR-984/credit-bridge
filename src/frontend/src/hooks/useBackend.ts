import {
  type CreateUdharArgs as BackendCreateUdharArgs,
  type UserProfile,
  createActor,
} from "@/backend";
import type {
  CreateCustomerArgs,
  CreateJamaArgs,
  CreateUdharArgs,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useActor_() {
  return useActor(createActor);
}

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useCustomers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCustomers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useCustomer(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["customer", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getCustomer(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
    staleTime: 30_000,
  });
}

export function useTransactionHistory(customerId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["transactions", customerId?.toString()],
    queryFn: async () => {
      if (!actor || customerId === undefined) return [];
      return actor.getTransactionHistory(customerId);
    },
    enabled: !!actor && !isFetching && customerId !== undefined,
    staleTime: 30_000,
  });
}

export function useUdharByCustomer(customerId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["udhar", customerId?.toString()],
    queryFn: async () => {
      if (!actor || customerId === undefined) return [];
      return actor.getUdharByCustomer(customerId);
    },
    enabled: !!actor && !isFetching && customerId !== undefined,
    staleTime: 30_000,
  });
}

export function useJamaByCustomer(customerId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["jama", customerId?.toString()],
    queryFn: async () => {
      if (!actor || customerId === undefined) return [];
      return actor.getJamaByCustomer(customerId);
    },
    enabled: !!actor && !isFetching && customerId !== undefined,
    staleTime: 30_000,
  });
}

export function useCreateCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: CreateCustomerArgs) => {
      if (!actor) throw new Error("Not connected");
      // Backend CreateCustomerArgs does not include email — strip it before calling
      const { email: _email, ...backendArgs } = args;
      return actor.createCustomer(backendArgs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useCreateUdhar() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: CreateUdharArgs) => {
      if (!actor) throw new Error("Not connected");
      return actor.createUdhar(args as unknown as BackendCreateUdharArgs);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({
        queryKey: ["udhar", data.customerId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions", data.customerId.toString()],
      });
    },
  });
}

export function useCreateJama() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: CreateJamaArgs) => {
      if (!actor) throw new Error("Not connected");
      return actor.createJama(args);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({
        queryKey: ["jama", data.customerId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions", data.customerId.toString()],
      });
    },
  });
}

export function useUpdateCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      args,
    }: { id: bigint; args: import("@/backend").UpdateCustomerArgs }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateCustomer(id, args);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["customer", data.id.toString()],
        });
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      }
    },
  });
}

export function useDeleteCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteCustomer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useGetProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserProfile();
      return result;
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useUpdateProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useAdminGetAdminPrincipal() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "principal"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.adminGetAdminPrincipal();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ── Admin hooks ──

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const { identity, loginStatus } = useInternetIdentity();
  return useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toText()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      return actor.isAdmin(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && loginStatus === "success" && !!identity,
    staleTime: 60_000,
  });
}

export function useAdminGetAllCustomers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetAllCustomers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAdminGetAllUdhar() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "udhar"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetAllUdhar();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAdminGetAllJama() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "jama"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetAllJama();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAdminGetStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.adminGetStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSetAdminPrincipal() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (p: Principal) => {
      if (!actor) throw new Error("Not connected");
      return actor.setAdminPrincipal(p);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}

export function useAdminUpdateCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      args,
    }: {
      id: bigint;
      args: import("@/backend").UpdateCustomerArgs;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminUpdateCustomer(id, args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAdminDeleteCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteCustomer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAdminBlockCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminBlockCustomer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}

export function useAdminUnblockCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminUnblockCustomer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}

export function useAdminDeleteUdhar() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteUdhar(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "udhar"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAdminDeleteJama() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteJama(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "jama"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
export function useGetDueTodayReminders() {
  // getDueTodayReminders is not yet in backend - derive from udhar data locally
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dueTodayReminders"],
    queryFn: async () => {
      if (!actor) return [];
      // Return empty array until backend exposes getDueTodayReminders
      return [] as Array<{
        customerId: bigint;
        customerName: string;
        amount: bigint;
        dueDate: bigint;
      }>;
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ── Customer Portal hooks ──

export function useLinkMyAccount() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerId,
      mobileNumber,
    }: {
      customerId: bigint;
      mobileNumber: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.linkMyAccount(customerId, mobileNumber);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCustomerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["myOutstandingBalance"] });
      queryClient.invalidateQueries({ queryKey: ["myTransactionHistory"] });
      queryClient.invalidateQueries({ queryKey: ["myPaymentRequests"] });
    },
  });
}

export function useGetMyCustomerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myCustomerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getMyCustomerProfile();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetMyOutstandingBalance() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myOutstandingBalance"],
    queryFn: async () => {
      if (!actor) return 0n;
      const result = await actor.getMyOutstandingBalance();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetMyTransactionHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myTransactionHistory"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getMyTransactionHistory();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSubmitPaymentRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      amount,
      paymentType,
      notes,
    }: {
      amount: bigint;
      paymentType: import("@/backend").PaymentType;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.submitPaymentRequest(
        amount,
        paymentType,
        notes,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPaymentRequests"] });
      queryClient.invalidateQueries({ queryKey: ["myOutstandingBalance"] });
      queryClient.invalidateQueries({ queryKey: ["ownerPendingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["ownerAllRequests"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useGetMyPaymentRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myPaymentRequests"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getMyPaymentRequests();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ── Owner approval hooks ──

export function useOwnerGetPendingPaymentRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ownerPendingRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.ownerGetPendingPaymentRequests();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useOwnerGetAllPaymentRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ownerAllRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.ownerGetAllPaymentRequests();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useOwnerApprovePaymentRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.ownerApprovePaymentRequest(requestId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerPendingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["ownerAllRequests"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}

export function useOwnerRejectPaymentRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      reason,
    }: {
      requestId: bigint;
      reason: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.ownerRejectPaymentRequest(requestId, reason);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerPendingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["ownerAllRequests"] });
    },
  });
}
