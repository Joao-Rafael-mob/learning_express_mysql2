

async function GET(req: any, res:any) {
  try {
    // Fetch all products from the database
    const products = await ProductOption.findAll();

    res.status(200).json({
      data: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).json({ message: "Bad Request", error: error.message });
  }
}

export { GET };
