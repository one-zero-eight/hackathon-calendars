import { $api } from "@/api";
import { useMe } from "@/api/me.ts";
import { SchemaSort } from "@/api/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { Filters } from "@/lib/types.ts";
import { useQueries } from "@tanstack/react-query";
import { deepEqual } from "@tanstack/react-router";
import { FaRegStar, FaStar } from "react-icons/fa";

export function SaveFilters({
  filters,
  sort,
}: {
  filters: Filters | undefined;
  sort: SchemaSort | undefined;
}) {
  const { data: me, refetch } = useMe();
  const { mutateAsync: createShare } = $api.useMutation(
    "post",
    "/events/search/share",
  );
  const { mutateAsync: setFavorites } = $api.useMutation(
    "put",
    "/users/favorites",
  );
  const selections = useQueries({
    queries:
      me?.favorites?.map((v) =>
        $api.queryOptions("get", "/events/search/share/{selection_id}", {
          params: { path: { selection_id: v } },
        }),
      ) ?? [],
  });

  const currentSelection = selections?.find((v) =>
    deepEqual(v?.data?.filters, filters, { partial: true }),
  );
  console.log(selections, filters);
  console.log(currentSelection);

  const save = async () => {
    if (!me) return;

    if (!currentSelection) {
      const selection = await createShare({
        body: { filters: filters || {}, sort: sort || {} },
      });
      if (selection) {
        await setFavorites({
          body: { favorite_ids: [...me.favorites, selection.id] },
        });
      }
    } else {
      await setFavorites({
        body: {
          favorite_ids: me.favorites.filter(
            (v) => v !== (currentSelection.data?.id ?? ""),
          ),
        },
      });
    }
    refetch();
  };

  return (
    <>
      <Button className="w-full" onClick={() => save()}>
        {!currentSelection ? (
          <>
            <FaRegStar />
            Сохранить подборку
          </>
        ) : (
          <>
            <FaStar />
            Сохранено. Посмотрите в профиле
          </>
        )}
      </Button>
    </>
  );
}
