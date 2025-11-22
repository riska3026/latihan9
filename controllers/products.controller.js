const Product = require('../models/products.model');

// GET semua produk
exports.getAllProducts = (req, res) => {
	Product.getAll((err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(results);
	});
};

// GET produk berdasarkan ID
exports.getProductById = (req, res) => {
	const { id } = req.params;
	Product.getById(id, (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!results || results.length === 0) {
			return res.status(404).json({ message: 'Product tidak ditemukan' });
		}
		res.json(results[0]);
	});
};

// POST create produk
exports.createProduct = (req, res) => {
	const data = req.body || {};

	// Basic validation
	if (!data.name || typeof data.price === 'undefined') {
		return res.status(400).json({ message: 'Field `name` and `price` are required' });
	}

	Product.create(data, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		const returnedId = data.id || result.insertId;
		res.status(201).json({ id: returnedId, name: data.name, price: data.price, description: data.description || null });
	});
};

// PUT update produk
exports.updateProduct = (req, res) => {
	const { id } = req.params;
	const data = req.body || {};
	Product.update(id, data, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Product tidak ditemukan' });
		}
		res.json({ message: 'Product berhasil diupdate' });
	});
};

// DELETE produk
exports.deleteProduct = (req, res) => {
	const { id } = req.params;
	Product.delete(id, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Product tidak ditemukan' });
		}
		res.json({ message: 'Product berhasil dihapus' });
	});
};

