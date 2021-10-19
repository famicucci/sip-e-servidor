const axios = require('axios');
const accessToken = '5c4d34b857d27539a980f5c659b28a45ce0459d1';
const apiUrl = 'https://api.tiendanube.com';

const tiendaNubeAxios = axios.create({
	baseURL: apiUrl,
	headers: {
		Authentication: `bearer ${accessToken}`,
		'User-Agent': 'API para Sip (famicucci@email.com)',
	},
});

exports.traerProductos = async (req, res) => {
	try {
		const r = await tiendaNubeAxios.get('/v1/1894966/products');
		res.status(200).json(r.data);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.modificarStock = async (req, res) => {
	const product = req.params.ProductId;
	const variant = req.params.VariantId;
	const qty = req.body.qty;

	try {
		const r = await tiendaNubeAxios.put(
			`/v1/1894966/products/${product}/variants/${variant}`,
			{ stock: qty }
		);

		res.status(200).json(r.data);
	} catch (error) {
		res.status(400).json(error);
	}
};
