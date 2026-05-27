import { createActor } from "@/backend";
import type { CreateActorOptions } from "@/backend";

function getIcHost(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const hostname = window.location.hostname;
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".icp1.io") ||
    hostname.endsWith(".icp0.io") ||
    hostname.endsWith(".ic0.app") ||
    hostname.endsWith(".raw.ic0.app")
  ) {
    return undefined;
  }
  return "https://ic0.app";
}

export function createActorWithHost(
  canisterId: string,
  uploadFile: (file: any) => Promise<Uint8Array>,
  downloadFile: (file: Uint8Array) => Promise<any>,
  options: CreateActorOptions = {},
) {
  const host = getIcHost();
  let mergedOptions = options;
  if (host && !options.agent) {
    mergedOptions = {
      ...options,
      agentOptions: {
        ...options.agentOptions,
        host,
      },
    };
  }
  return createActor(canisterId, uploadFile, downloadFile, mergedOptions);
}
