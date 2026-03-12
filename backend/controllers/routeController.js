const Route = require("../models/Route");

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

exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const { from, to, distanceKm, duration, baseFare } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const image = req.file.path || "uploads/" + req.file.filename;
    const route = new Route({
      from,
      to,
      distanceKm: Number(distanceKm),
      duration,
      baseFare: Number(baseFare),
      image,
    });
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};