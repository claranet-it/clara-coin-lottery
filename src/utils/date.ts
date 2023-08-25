const intDateTime = new Intl.DateTimeFormat('it-IT', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  formatMatcher: 'best fit'
})

export function formatDate(date: Date): string {
  return intDateTime.format(date)
}
