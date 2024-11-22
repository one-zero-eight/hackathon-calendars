import { AgeFilter } from "@/components/filters/AgeFilter.tsx";
import { DatesFilter } from "@/components/filters/DatesFilter.tsx";
import { Gender, GenderSelect } from "@/components/filters/GenderSelect.tsx";
import { Level, LevelSelect } from "@/components/filters/LevelSelect.tsx";
import { LocationSelect } from "@/components/filters/LocationSelect.tsx";
import { ParticipantsCountFilter } from "@/components/filters/ParticipantsCountFilter.tsx";
import { SearchInput } from "@/components/filters/SearchInput.tsx";
import { SportDisciplineSelect } from "@/components/filters/SportDisciplineSelect.tsx";
import { SportSelect } from "@/components/filters/SportSelect.tsx";
import { SportEventsList } from "@/components/SportEventsList.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const Route = createFileRoute("/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(
    null,
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [gender, setGender] = useState<Gender | null>(null);
  const [age, setAge] = useState<{
    start: number | null;
    end: number | null;
  }>({ start: null, end: null });
  const [participantsCount, setParticipantsCount] = useState<{
    start: number | null;
    end: number | null;
  }>({ start: null, end: null });
  const [country, setCountry] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [level, setLevel] = useState<Level | null>(null);

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl">Календарь</h1>
      <SearchInput value={search} onChange={setSearch} />
      <div className="flex flex-row flex-wrap gap-2">
        <SportSelect
          value={selectedSport}
          onChange={(v) => {
            setSelectedSport(v);
            setSelectedDiscipline(null);
          }}
        />
        <SportDisciplineSelect
          sport={selectedSport}
          value={selectedDiscipline}
          onChange={setSelectedDiscipline}
        />
      </div>
      <DatesFilter dateRange={dateRange} onChange={setDateRange} />
      <LocationSelect
        country={country}
        region={region}
        onChange={(c, r) => {
          setCountry(c);
          setRegion(r);
        }}
      />
      <div className="flex flex-row flex-wrap gap-2">
        <GenderSelect value={gender} onChange={setGender} />
        <AgeFilter
          start={age.start}
          end={age.end}
          onChange={(start, end) => setAge({ start, end })}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        <LevelSelect value={level} onChange={setLevel} />
        <ParticipantsCountFilter
          start={participantsCount.start}
          end={participantsCount.end}
          onChange={(start, end) => setParticipantsCount({ start, end })}
        />
      </div>
      <SportEventsList />
    </div>
  );
}
