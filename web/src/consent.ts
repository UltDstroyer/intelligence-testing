/**
 * M0 only gates access to the placeholder lab.
 * Consent is deliberately held in memory, not silently persisted.
 * There is no telemetry/event submission endpoint in this milestone.
 */
export function canEnterLab(hasAcknowledged: boolean): boolean {
  return hasAcknowledged;
}
