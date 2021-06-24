const {
	Orden,
	Factura,
	Cliente,
	Usuario,
	FacturaDetalle,
	OrdenDetalle,
	PtoStock,
	Pago,
	MetodoPago,
} = require('../models/index');
const { Op } = require('sequelize');

// traer stock total y precios
exports.traerOrdenes = async (req, res) => {
	try {
		const ordenes = await Orden.findAll({
			attributes: { exclude: ['ClienteId', 'UsuarioId'] },
			include: [
				{
					model: Factura,
					attributes: {
						exclude: ['OrdenId', 'UsuarioId', 'tipo', 'estado', 'ClienteId'],
					},
					include: [
						{
							model: Cliente,
							attributes: { exclude: ['EmpresaId', 'createdAt', 'updatedAt'] },
						},
						{
							model: FacturaDetalle,
							as: 'detalleFactura',
							attributes: { exclude: ['FacturaId'] },
						},
						{
							model: Pago,
							attributes: {
								exclude: ['FacturaId', 'UsuarioId', 'MetodoPagoId'],
							},
							include: { model: MetodoPago, attributes: ['id', 'descripcion'] },
						},
					],
				},
				{
					model: Cliente,
					attributes: { exclude: ['EmpresaId', 'createdAt', 'updatedAt'] },
				},
				{
					model: Usuario,
					attributes: ['usuario'],
				},
				{
					model: OrdenDetalle,
					attributes: {
						exclude: ['OrdenId', 'PtoStockId'],
					},
					include: { model: PtoStock, attributes: ['id', 'descripcion'] },
				},
			],
			where: { OrdenEstadoId: { [Op.not]: [5, 6] } },
		});
		res.status(200).json(ordenes);
	} catch (error) {
		res.json(error);
	}
};
