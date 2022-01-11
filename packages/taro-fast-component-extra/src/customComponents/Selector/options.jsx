export function buildOption({
  label,
  value,
  description = null,
  disabled = false,
}) {
  return {
    label,
    description,
    value,
    disabled,
  };
}
