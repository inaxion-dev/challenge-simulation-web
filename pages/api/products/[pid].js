import catalog from '../products.json';
export default function handler(req, res) {
  const { pid } = req.query;
  const product = catalog.products.find(p => p.id == pid);
  if (!product) {
    res.status(404).json({ success: false, message: 'no product' })
  } else {
    res.status(200).json(product);
  }
}
