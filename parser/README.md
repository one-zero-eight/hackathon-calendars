Here’s a `README.md` file for the two scripts:

---

# PDF to Events Processor

This project consists of two stages:

1. **Extracting and parsing event data from a PDF document.**
2. **Transforming and exporting structured event data into JSON format.**

The scripts are designed to process PDF files containing event-related data (such as sports events), extract tables and attributes, and output the final data in a JSON format suitable for further use.

---

## Stage 1: PDF Processing

### Description

The script `stage_1_pdf_processing.py` extracts tables and labels from a PDF file. It identifies sections, such as event names and participant counts, and parses the tables using bounding box information.

**### Features**

- **Anchoring**: Identifies key labels and text sections like "Наименование", "Основной состав", and "Молодежный (резервный) состав".
- **Table Extraction**: Extracts tabular data related to event details.
- **Debug Mode**: Annotates and visualizes bounding boxes and extracted tables for debugging.
- **Output Formats**:
  - CSV: `label_locations.csv` and `postprocessed_label_locations.csv`.
  - PDF: Annotated debug output (`debugged_output.pdf`).

### Usage

1. Download the PDF file from the [link](https://storage.minsport.gov.ru/cms-uploads/cms/II_chast_EKP_2024_14_11_24_65c6deea36.pdf),
   it is from the [Ministry of Sports of the Russian Federation](https://minsport.gov.ru/).
2. Install the required dependencies:
   ```bash
   pip install pandas pdfplumber pypdf tqdm
   ```
3. Run the script:
   ```bash
   python stage_1_pdf_processing.py <path_to_pdf> --debug
   ```

4. Outputs:
   - Intermediate CSV files with label and table data.
   - `events.csv` with extracted table details.
   - Debug annotations (if `--debug` is used).

---

## Stage 2: JSON Export

### Description

The script `stage_2_extract_attributes.py` processes the extracted event data (`events.csv`) into a JSON format.
It validates and enriches the data, such as:
- Parsing and converting date ranges.
- Cleaning and formatting participant counts and locations.
- Extracting structured attributes like age ranges, gender, and disciplines using prior knowledge.

### Features

- **Data Validation**:
  - Ensures unique indices in the CSV file.
  - Validates and converts date ranges.
- **Data Cleaning**:
  - Removes unwanted text like "ПО НАЗНАЧЕНИЮ".
  - Strips excess whitespace.
- **Attribute Extraction**:
  - Uses helper functions to map descriptions and locations (`parse_description` and `parse_location`).
- **JSON Output**:
  - Produces a structured `events.json` file with all parsed details.

### Usage

1. Install the required dependencies:
   ```bash
   pip install pandas
   ```

2. Run the script:
   ```bash
   python stage_2_extract_attributes.py
   ```

3. Outputs:
   - `events.json`: A JSON file containing structured event data.

---

## JSON Output Format

Each event in the `events.json` file is represented as follows:

```json
{
    "ekp_id": "<unique_identifier>",
    "title": "<event_title>",
    "description": "<event_description>",
    "gender": "<gender>",
    "age_min": "<minimum_age>",
    "age_max": "<maximum_age>",
    "sport": "<sport>",
    "discipline": ["<discipline_1>", "<discipline_2>"],
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD",
    "location": [
        {
            "country": "<country>",
            "region": "<region>",
            "city": "<city>"
        }
    ],
    "participant_count": 108
}
```