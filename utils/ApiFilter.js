class ApiFilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keywords = this.queryStr.keywords
      ? {
          name: {
            $regex: this.queryStr.keywords,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keywords });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const fieldsToRemove = ["keywords"];
    fieldsToRemove.forEach(field => delete queryCopy[field]);

    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    let parsedQuery = JSON.parse(queryStr);

    // Convert string numbers to numbers for comparison
    for (const key in parsedQuery) {
        if (typeof parsedQuery[key] === 'object') {
            for (const op in parsedQuery[key]) {
                const val = parsedQuery[key][op];
                if (!isNaN(val)) {
                    parsedQuery[key][op] = Number(val);
                }
            }
        }
    }

    console.log("Final MongoDB filter:", parsedQuery); // Debug log

    this.query = this.query.find(parsedQuery);
    return this;
}
}

export default ApiFilter;
