function filterByFields(data, fields, filter) {
    if (data.length === 0) return data;
    const unordered = data.reduce((rv, x) => {
      const inc = fields.map((field) => {
        if (typeof x[field] === 'string') {
          return x[field].toLowerCase().includes(filter.toLowerCase());
        }
        return false;
      });
  
      const match = Boolean(inc.find(i => i));
  
      if (match) {
        rv.push(x);
      }
      return rv;
    }, []);
  
    return unordered;
}
  
export default filterByFields;