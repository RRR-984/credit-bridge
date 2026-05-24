import { LoadingScreen } from "@/components/LoadingScreen";
import { AdminRoute, ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const CustomersPage = lazy(() => import("@/pages/CustomersPage"));
const CustomerDetailPage = lazy(() => import("@/pages/CustomerDetailPage"));
const UdharNewPage = lazy(() => import("@/pages/UdharNewPage"));
const JamaNewPage = lazy(() => import("@/pages/JamaNewPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const AdminDashboardPage = lazy(() => import("@/pages/AdminDashboardPage"));
const AdminSetupPage = lazy(() => import("@/pages/AdminSetupPage"));
const AdminCustomersPage = lazy(() => import("@/pages/AdminCustomersPage"));
const AdminTransactionsPage = lazy(
  () => import("@/pages/AdminTransactionsPage"),
);
const TransactionsPage = lazy(() => import("@/pages/TransactionsPage"));
const CustomerPortalPage = lazy(() => import("@/pages/CustomerPortalPage"));
const PendingApprovalsPage = lazy(() => import("@/pages/PendingApprovalsPage"));

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

const rootRoute = createRootRoute({ component: Outlet });

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <CustomersPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const customerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers/$customerId",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <CustomerDetailPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const udharNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/udhar/new",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <UdharNewPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const jamaNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jama/new",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <JamaNewPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transactions",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <TransactionsPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <SettingsPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const adminSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/setup",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminSetupPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminDashboardPage />
      </Suspense>
    </AdminRoute>
  ),
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/customers",
  component: () => (
    <AdminRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminCustomersPage />
      </Suspense>
    </AdminRoute>
  ),
});

const adminTransactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/transactions",
  component: () => (
    <AdminRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminTransactionsPage />
      </Suspense>
    </AdminRoute>
  ),
});

const customerPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customer-portal",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <CustomerPortalPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const pendingApprovalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pending-approvals",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <PendingApprovalsPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  customersRoute,
  customerDetailRoute,
  udharNewRoute,
  jamaNewRoute,
  transactionsRoute,
  settingsRoute,
  customerPortalRoute,
  pendingApprovalsRoute,
  adminSetupRoute,
  adminDashboardRoute,
  adminCustomersRoute,
  adminTransactionsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <LoadingScreen />
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
}
