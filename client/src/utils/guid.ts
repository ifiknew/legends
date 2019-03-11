function guid() {
  const saved = localStorage.getItem('uuid')
  if (saved) { return saved }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
  localStorage.setItem('uuid', uuid)
  return uuid
}
export default guid