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
    <div className="flex h-12 w-full justify-between border-b-[1px]">
      <div className="flex items-center gap-2 px-2">
        <Button asChild variant="link">
          <Link to="/">Главная</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/sports">Виды спорта</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/calendar">Календарь</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/search">Поиск</Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 px-2">
        {!me ? (
          <Button asChild variant="ghost">
            <Link to="/auth/login">Войти</Link>
          </Button>
        ) : (
          <>
            <div className="text-lg">{me.login}</div>
            <Button asChild variant="ghost">
              <Link to="/profile">Профиль</Link>
            </Button>
            <Button variant="ghost" onClick={() => performLogout({})}>
              Выйти
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
