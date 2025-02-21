import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useHandleLogout() {
  const router = useRouter();

  return (showToast?: boolean) => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    if (showToast) {
      toast.error("Sessão expirada, faça o login novamente.");
    }

    router.push("/auth/login");
  };
}
