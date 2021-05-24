const {
	Stock,
	MovimientoStock,
	Producto,
	PtoStock,
	Usuario,
} = require('../models/index');
const { sequelize } = require('../models/index');

// modificar
exports.modificarStock = async (req, res) => {
	// si la cantidad es cero detiene la ejecución
	if (req.body.cantidad === 0) return;

	try {
		// si la cantidad resultante es negativa envia al catch (debido a atributo UNSIGNED)
		// si el producto no existe envía al catch
		const modificaStock = await Stock.increment('cantidad', {
			by: req.body.cantidad,
			where: {
				ProductoCodigo: req.body.ProductoCodigo,
				PtoStockId: req.body.PtoStockId,
			},
		});

		// insert en tabla movimientos
		const registraMovimiento = await MovimientoStock.create({
			cantidad: req.body.cantidad,
			motivo: req.body.motivo,
			ProductoCodigo: req.body.ProductoCodigo,
			PtoStockId: req.body.PtoStockId,
			UsuarioId: req.usuarioId,
		});
		res.json({
			msj: `Se ha modificado el stock en ${req.body.cantidad} unidades`,
		});
	} catch (error) {
		res.json({ msj: 'Ocurrió un error' });
	}
};

// traer stock por punto de stock
exports.traerStockTotal = async (req, res) => {
	try {
		// consulta a tabla stocks
		const stocks = await Stock.findAll({
			attributes: [
				'ProductoCodigo',
				[sequelize.fn('sum', sequelize.col('cantidad')), 'cantidad'],
			],
			group: ['ProductoCodigo'],
			include: {
				model: Producto,
				attributes: ['descripcion'],
				where: { EmpresaId: req.usuarioEmpresaId },
			},
			raw: true,
		});
		res.json(stocks);
	} catch (error) {
		res.json(error);
	}
};

// traer stock por punto de stock
exports.traerStockProducto = async (req, res) => {
	try {
		// consulta a tabla stocks
		const stocks = await Stock.findAll({
			attributes: ['id', 'cantidad', 'ProductoCodigo', 'PtoStockId'],
			where: { ProductoCodigo: req.params.codigo },
			include: [
				{
					model: Producto,
					attributes: ['descripcion'],
					where: { EmpresaId: req.usuarioEmpresaId },
				},
				{ model: PtoStock, attributes: ['descripcion'] },
			],

			raw: true,
		});
		res.json(stocks);
	} catch (error) {
		res.json(error);
	}
};

// traer movimientos de stock
exports.traerMovimientos = async (req, res) => {
	try {
		const movimientos = await MovimientoStock.findAll({
			attributes: [
				'id',
				'cantidad',
				'motivo',
				'createdAt',
				'ProductoCodigo',
				'PtoStockId',
				'UsuarioId',
			],
			include: [
				{
					model: Producto,
					attributes: ['descripcion'],
					where: { EmpresaId: req.usuarioEmpresaId },
				},
				{
					model: PtoStock,
					attributes: ['descripcion'],
					where: { EmpresaId: req.usuarioEmpresaId },
				},
				{
					model: Usuario,
					attributes: ['usuario'],
					where: { EmpresaId: req.usuarioEmpresaId },
				},
			],
		});
		res.json(movimientos);
	} catch (error) {
		res.json(error);
	}
};
