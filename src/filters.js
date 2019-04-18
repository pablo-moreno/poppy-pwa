export const format = (date) => {
  const mDate = new Date(date)
  const h = mDate.getHours()
  const m = mDate.getMinutes()
  return `${(h < 10) ? `0${h}` : h}:${(m < 10) ? `0${m}` : m}`
}
