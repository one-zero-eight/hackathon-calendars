import { $api } from "@/api";
import { useMe } from "@/api/me.ts";
import { Button } from "@/components/ui/button.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function TopBar() {
  const { data: me } = useMe();

  const queryClient = useQueryClient();
  const { mutate: performLogout } = $api.useMutation("post", "/users/logout", {
    onSettled: () => queryClient.resetQueries(),
  });

  return (
    <div className="flex h-[--header-height] w-full justify-between border-b-[1px]">
      <div className="flex items-center gap-2 px-2">
        <img src="/favicon.png" className="h-8 w-8" />
        <Button asChild variant="link">
          <Link to="/" activeProps={{ style: { backgroundColor: "#ddd" } }}>
            Главная
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link
            to="/sports"
            activeProps={{ style: { backgroundColor: "#ddd" } }}
          >
            Виды спорта
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link
            to="/calendar"
            activeProps={{ style: { backgroundColor: "#ddd" } }}
          >
            Календарь
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link
            to="/search"
            activeProps={{ style: { backgroundColor: "#ddd" } }}
          >
            Поиск
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 px-2">
        {!me ? (
          <Button asChild variant="link">
            <Link
              to="/auth/login"
              activeProps={{ style: { backgroundColor: "#ddd" } }}
            >
              Войти
            </Link>
          </Button>
        ) : (
          <>
            <div className="text-lg">{me.login}</div>
            <Button asChild variant="link">
              <Link
                to="/profile"
                activeProps={{ style: { backgroundColor: "#ddd" } }}
              >
                Профиль
              </Link>
            </Button>
            <Button variant="link" onClick={() => performLogout({})}>
              Выйти
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
