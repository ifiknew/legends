const delay = (time: number) => {
  return new Promise((r) => {
    setTimeout(r, time);
  })
}
export default delay