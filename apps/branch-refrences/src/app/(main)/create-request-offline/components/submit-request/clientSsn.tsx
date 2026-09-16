import { useUserStore } from '@branch-services/hooks';

export default function useClientSsn() {
  return useUserStore().user?.clientSsn ?? null;
}
