import Order from "../models/order";
export const getOrders = async (req, res) => {
  try {
    const queryCategories = ["sort", "postedBy"];
    // Проверка количества квери параметров
    const query = Object.keys(req.query);
    if (query.length > 1) {
      res.status(500).json("Too match queries");
      return;
    } else if (query.length === 0) {
      const orders = await Order.find({});
      res.status(200).json(orders);
      return;
    }
    // Проверка соответствия параметрам белого списка
    if (queryCategories.includes(query[0])) {
      // Особая проверка на текущий параметр
      if (query[0] === "postedBy") {
        // Если значение пустое
        if (req.query.postedBy.trim() == "") {
          res.status(500).json("path postedBy is required!");
          return;
        }
        try {
          // Успешный поиск документов по query ?postedBy=
          const orders = await Order.find({ postedBy: req.query.postedBy });
          res.status(200).json(orders);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    } else {
      res.status(500).json("Bad query");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};
