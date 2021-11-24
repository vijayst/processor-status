# Processor Status

## Tasks

- Populate firestore (60)
- Query with pagination (10)
- Display timeline (30)
- Display squares (60)
- Display colors (30)
- Animation (60)
- Virtualisation (120)

## Data structure

- Processor collection with name
- EventSummary collection with
  - tick (number between 1 - 100)
  - errorCount (random between 0 - 5)
  - warningCount (random between 0 - 20)
  - successCount (random between 0 - 5)
  - infoCount (random between 0 - 100)
  - processorId

## Color decision

Display one color based on order of precedence: error, warning, success, info

## Data population

Error: Randomise between 1 and 100. All values <= 95 is 0. errorCount = random - 95.
Warning: Randomise between 1 and 100. All values <= 80 is 0. warningCount = random - 80.
Success: Randomise between 1 and 10. All values <= 5 is 0. successCount = random - 5.
Info: Ramdomise between 1 and 200. All values below 100 is 0. infoCount = random - 100.

There will be some cells with no events with this logic.
