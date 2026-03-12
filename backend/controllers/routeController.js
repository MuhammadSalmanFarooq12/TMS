exports.getAllRoutes = async (req, res) => {
  try {
    const { from, to } = req.query;

    // DEBUG: This will show up in your VS Code terminal
    console.log("DEBUG: Keys received ->", Object.keys(req.query));
    console.log("DEBUG: Value of 'from' ->", from);
    console.log("DEBUG: Value of 'to' ->", to);

    let query = {};

    // If both are present, we filter.
    if (from && to) {
      query = {
        from: { $regex: new RegExp(`^${from.trim()}$`, "i") },
        to: { $regex: new RegExp(`^${to.trim()}$`, "i") }
      };
    }

    const routes = await Route.find(query);
    res.json(routes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};