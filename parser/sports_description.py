import pandas as pd

disciplines_df = pd.read_csv("disciplines.csv", header=None)

sports = disciplines_df[0].unique()

with open("sports_description.yaml") as f:
    import yaml

    sports_desc = yaml.safe_load(f)

print("Matching Sports:")
# check for matching sports
for sport in sports:
    if sport in sports_desc:
        print(f"{sport}:\n  {sports_desc[sport][:100]}...")
print("\n")

# check for extra sports
print("Extra sports:")
for sport in sports_desc:
    if sport not in sports:
        print(f"{sport}:\n  {sports_desc[sport]}")

print("\n")
print("Missing sports:")
# check for missing sports
for sport in sports:
    if sport not in sports_desc:
        print(f"{sport}:\n  _")

# save to json
with open("sports_description.json", "w") as f:
    import json

    json.dump(sports_desc, f, ensure_ascii=False, indent=2)
